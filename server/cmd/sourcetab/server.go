package main

import (
	"context"
	"embed"
	"errors"
	"fmt"
	"io/fs"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/sourcetab/sourcetab/openapi"
)

type handlerService struct {
	app *application
}
type securityHandlerService struct {
	app *application
}

//go:embed "public"
var publicFS embed.FS

func (app *application) serve() error {
	openapiHandler, err := openapi.NewServer(handlerService{
		app,
	}, securityHandlerService{
		app,
	})
	if err != nil {
		return err
	}
	publicClientFSRoot, err := fs.Sub(publicFS, "public/client")
	if err != nil {
		slog.Error(err.Error())
		os.Exit(1)
	}
	publicSwaggerFSRoot, err := fs.Sub(publicFS, "public/swagger")
	if err != nil {
		slog.Error(err.Error())
		os.Exit(1)
	}

	mux := http.NewServeMux()
	mux.Handle("/api/v1/", app.noAuthMiddleware(openapiHandler))
	mux.Handle("/api/docs/", http.StripPrefix("/api/docs", http.FileServer(http.FS(publicSwaggerFSRoot))))
	mux.Handle("/", http.FileServer(http.FS(publicClientFSRoot)))

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", app.config.port),
		Handler:      app.corsMiddleware(app.rateLimit(app.logMiddleware(mux))),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	shutdownError := make(chan error)

	go func() {
		quit := make(chan os.Signal, 1)

		signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

		s := <-quit

		slog.Info(fmt.Sprintf("Signal %s", s.String()))

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		err := srv.Shutdown(ctx)
		if err != nil {
			shutdownError <- err
		}

		slog.Info("Stopping server")

		app.wg.Wait()
		shutdownError <- nil
	}()

	slog.Info(fmt.Sprintf("Starting server: listening on http://localhost%s", srv.Addr))

	err = srv.ListenAndServe()
	if !errors.Is(err, http.ErrServerClosed) {
		return err
	}
	err = <-shutdownError
	if err != nil {
		return err
	}

	return nil
}
