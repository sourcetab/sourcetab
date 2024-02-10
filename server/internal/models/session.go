package models

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type (
	SessionModel struct {
		DB *pgxpool.Pool
	}

	Session struct {
		ID      uuid.UUID `json:"-"`
		UserID  int64     `json:"-"`
		Expires time.Time `json:"expires"`
	}
)

var AnonymousSession = &Session{}

func (session *Session) IsAnonymous() bool {
	return session == AnonymousSession
}

func (m SessionModel) New(userID int64) (*Session, error) {
	sessionToken, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	session := Session{
		ID:      sessionToken,
		UserID:  userID,
		Expires: time.Now().Add(2160 * time.Hour /* 90 days */),
	}

	err = m.Insert(&session)
	if err != nil {
		return nil, err
	}

	return &session, err
}

func (m SessionModel) Insert(session *Session) error {
	const query = `
		INSERT INTO session (id, user_id, expires)
		VALUES ($1, $2, $3)
	`

	args := []interface{}{session.ID, session.UserID, session.Expires}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	_, err := m.DB.Exec(ctx, query, args...)
	return err
}

func (m SessionModel) Delete(session *Session) error {
	const query = `
		DELETE FROM session
		WHERE id = $1
	`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	_, err := m.DB.Exec(ctx, query, session.ID)
	return err
}

func (m SessionModel) DeleteAllForUser(userID int64) error {
	const query = `
		DELETE FROM session
		WHERE user_id = $1
	`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	_, err := m.DB.Exec(ctx, query, userID)
	return err
}
