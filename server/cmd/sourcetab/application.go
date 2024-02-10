package main

import (
	"context"
	"log/slog"
	"sync"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/sourcetab/sourcetab/internal/models"
)

type jsonWrap map[string]interface{}

type config struct {
	port int
	env  string
	db   struct {
		dsn string
	}
	limiter struct {
		ipHeader string
		rate     float64
		burst    int
		enabled  bool
	}
	smtp struct {
		host     string
		port     int
		username string
		password string
		sender   string
	}
}

type application struct {
	config config
	models models.Models
	// mailer mailer.Mailer
	wg sync.WaitGroup
}

func openDB(cfg config) (*pgxpool.Pool, error) {
	slog.Info("Connecting to database")

	dbpool, err := pgxpool.New(context.Background(), cfg.db.dsn)
	if err != nil {
		return nil, err
	}

	// Create a context with a 5-second timeout deadline.
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = dbpool.Ping(ctx)
	if err != nil {
		return nil, err
	}

	// Return the sql.DB connection pool.
	return dbpool, nil
}
