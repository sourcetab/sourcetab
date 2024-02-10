package migration

import (
	"embed"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
)

//go:embed sql
var migrationsFS embed.FS

func DatabaseMigrationUp(dbpool *pgxpool.Pool) error {
	db := stdlib.OpenDBFromPool(dbpool)

	goose.SetBaseFS(migrationsFS)

	if err := goose.SetDialect("postgres"); err != nil {
		return err
	}

	if err := goose.Up(db, "sql"); err != nil {
		return err
	}

	return nil
}
