package main

import (
	"context"
	"net"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"log/slog"

	"github.com/ogen-go/ogen/middleware"
	"golang.org/x/time/rate"

	"github.com/sourcetab/sourcetab/internal/models"
	"github.com/sourcetab/sourcetab/internal/utils"
)

func (app *application) corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		next.ServeHTTP(w, r)
	})
}

func (app *application) rateLimit(next http.Handler) http.Handler {
	type client struct {
		limiter  *rate.Limiter
		lastSeen time.Time
	}

	var (
		mu      sync.Mutex
		clients = make(map[string]*client)
	)

	// Remove old entries every minute
	if app.config.limiter.enabled {
		go func() {
			for {
				time.Sleep(time.Minute)

				mu.Lock()

				for ip, client := range clients {
					if time.Since(client.lastSeen) > 3*time.Minute {
						delete(clients, ip)
					}
				}

				mu.Unlock()
			}
		}()
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if app.config.limiter.enabled {
			var ip string

			if app.config.limiter.ipHeader == "" {
				// Remove port number if present
				if strings.ContainsRune(r.RemoteAddr, ':') {
					ip, _, _ = net.SplitHostPort(r.RemoteAddr)
				} else {
					ip = r.RemoteAddr
				}
			} else {
				ip = r.Header.Get(app.config.limiter.ipHeader)
			}

			mu.Lock()

			if _, found := clients[ip]; !found {
				clients[ip] = &client{
					limiter: rate.NewLimiter(rate.Limit(app.config.limiter.rate), app.config.limiter.burst),
				}
			}

			clients[ip].lastSeen = time.Now()

			if !clients[ip].limiter.Allow() {
				mu.Unlock()
				utils.ClientError(w, 429)
				return
			}

			mu.Unlock()
		}

		next.ServeHTTP(w, r)
	})
}

func LoggingMiddleware() middleware.Middleware {
	return func(
		req middleware.Request,
		next func(req middleware.Request) (middleware.Response, error),
	) (middleware.Response, error) {
		resp, err := next(req)
		slog.Warn(req.Raw.Method + " " + req.Raw.Host + req.Raw.RequestURI + " " + req.Raw.Proto + " from " + req.Raw.RemoteAddr)
		if tresp, ok := resp.Type.(interface{ GetStatusCode() int }); ok {
			slog.Warn("Status " + strconv.FormatInt(int64(tresp.GetStatusCode()), 10))
		}
		if err != nil {
			slog.Error(err.Error())
		}
		return resp, err
	}
}

func (app *application) logMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		slog.Debug(r.Method + " " + r.Host + r.RequestURI + " " + r.Proto + " from " + r.RemoteAddr)

		next.ServeHTTP(w, r)
	})
}

func (app *application) noAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		session := models.AnonymousSession
		user := models.AnonymousUser

		r = r.WithContext(context.WithValue(r.Context(), sessionContextKey, session))
		r = r.WithContext(context.WithValue(r.Context(), userContextKey, user))

		next.ServeHTTP(w, r)
	})
}
