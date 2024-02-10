package main

import (
	"flag"
	"log/slog"
	"os"
	"time"

	"github.com/lmittmann/tint"
	"github.com/sourcetab/sourcetab/internal/models"
	migration "github.com/sourcetab/sourcetab/migrations"
)

func main() {
	slog.SetDefault(slog.New(
		tint.NewHandler(os.Stdout, &tint.Options{
			Level:      slog.LevelDebug,
			TimeFormat: time.DateTime,
		}),
	))

	var app application

	flag.IntVar(&app.config.port, "port", 3333, "API server port")

	flag.StringVar(&app.config.db.dsn, "db-dsn",
		"postgres://sourcetab:sourcetab@/sourcetab?sslmode=disable", "PostgreSQL DSN")

	flag.BoolVar(&app.config.limiter.enabled, "limiter-enabled", true, "Enable rate limiter")
	flag.StringVar(&app.config.limiter.ipHeader, "limiter-ipheader", "", "Real IP address header")
	flag.Float64Var(&app.config.limiter.rate, "limiter-rate", 4, "Rate limiter maximum requests per second")
	flag.IntVar(&app.config.limiter.burst, "limiter-burst", 16, "Rate limiter maximum burst")

	flag.StringVar(&app.config.smtp.host, "smtp-host", "", "SMTP host")
	flag.IntVar(&app.config.smtp.port, "smtp-port", 2525, "SMTP port")
	flag.StringVar(&app.config.smtp.username, "smtp-username", "", "SMTP username")
	flag.StringVar(&app.config.smtp.password, "smtp-password", "", "SMTP password")
	flag.StringVar(&app.config.smtp.sender, "smtp-sender", "", "SMTP sender")

	flag.Parse()

	dbpool, err := openDB(app.config)
	if err != nil {
		slog.Error(err.Error())
		os.Exit(1)
	}
	defer dbpool.Close()

	err = migration.DatabaseMigrationUp(dbpool)
	if err != nil {
		slog.Error(err.Error())
		os.Exit(1)
	}

	app.models = models.NewModels(dbpool)

	err = app.serve()
	if err != nil {
		slog.Error(err.Error())
	}
}
