package models

import "github.com/jackc/pgx/v5/pgxpool"

type Models struct {
	User    UserModel
	Session SessionModel
	Project ProjectModel
}

func NewModels(db *pgxpool.Pool) Models {
	return Models{
		User:    UserModel{DB: db},
		Session: SessionModel{DB: db},
		Project: ProjectModel{DB: db},
	}
}
