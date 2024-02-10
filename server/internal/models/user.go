package models

import (
	"context"
	"time"

	"github.com/alexedwards/argon2id"
	"github.com/jackc/pgx/v5/pgxpool"
)

type (
	UserModel struct {
		DB *pgxpool.Pool
	}

	User struct {
		ID           int64     `json:"id"`
		CreatedAt    time.Time `json:"createdAt"`
		UpdatedAt    time.Time `json:"updatedAt"`
		Username     string    `json:"username"`
		Email        string    `json:"-"`
		PasswordHash string    `json:"-"`
	}
)

var AnonymousUser = &User{}

func (user *User) IsAnonymous() bool {
	return user == AnonymousUser
}

func (user *User) SetPassword(password string) error {
	passwordHash, err := argon2id.CreateHash(password, argon2id.DefaultParams)
	if err != nil {
		return err
	}

	user.PasswordHash = passwordHash
	return nil
}

func (user *User) ComparePassword(password string) (bool, error) {
	match, err := argon2id.ComparePasswordAndHash(password, user.PasswordHash)
	if err != nil {
		return false, err
	}

	return match, nil
}

func (m UserModel) Insert(user *User) error {
	const query = `
		INSERT INTO user_ (username, email, password_hash)
		VALUES ($1, $2, $3)
		RETURNING id, created_at, updated_at
	`

	args := []interface{}{user.Username, user.Email, user.PasswordHash}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRow(ctx, query, args...).Scan(&user.ID, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return err
	}

	return nil
}

func (m UserModel) Get(id int64) (*User, error) {
	const query = `
		SELECT id, created_at, updated_at, username, email, password_hash
		FROM user_
		WHERE id = $1
	`

	var user User

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRow(ctx, query, id).Scan(
		&user.ID,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.Username,
		&user.Email,
		&user.PasswordHash,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m UserModel) GetByUsername(username string) (*User, error) {
	const query = `
		SELECT id, created_at, updated_at, username, email, password_hash
		FROM user_
		WHERE username = $1
	`

	var user User

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRow(ctx, query, username).Scan(
		&user.ID,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.Username,
		&user.Email,
		&user.PasswordHash,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m UserModel) GetByEmail(email string) (*User, error) {
	const query = `
		SELECT id, created_at, updated_at, username, email, password_hash
		FROM user_
		WHERE email = $1
	`

	var user User

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRow(ctx, query, email).Scan(
		&user.ID,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.Username,
		&user.Email,
		&user.PasswordHash,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m UserModel) Update(user *User) error {
	const query = `
		UPDATE user_
		SET updated_at = now(), email = $2, password_hash = $3
		WHERE id = $1
		RETURNING updated_at
	`

	args := []interface{}{
		user.ID,
		user.Email,
		user.PasswordHash,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRow(ctx, query, args...).Scan(&user.UpdatedAt)
	if err != nil {
		return err
	}

	return nil
}

func (m UserModel) GetWithSession(session *Session) (*User, error) {
	query := `
		SELECT 
			user_.id, user_.created_at, user_.updated_at, user_.username, user_.email, user_.password_hash,
			session.expires
		FROM session JOIN user_ ON session.user_id=user_.id
    WHERE session.id = $1
			AND session.expires > $2
	`

	args := []interface{}{session.ID, time.Now()}

	var user User

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRow(ctx, query, args...).Scan(
		&user.ID,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.Username,
		&user.Email,
		&user.PasswordHash,
		&session.Expires,
	)
	if err != nil {
		return nil, err
	}

	session.UserID = user.ID

	return &user, nil
}

func (m UserModel) List() ([]User, error) {
	const query = `
		SELECT id, created_at, updated_at, username, email, password_hash
		FROM user_
	`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	rows, err := m.DB.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []User
	for rows.Next() {
		var project User
		if err := rows.Scan(
			&project.ID,
			&project.CreatedAt,
			&project.UpdatedAt,
			&project.Username,
			&project.Email,
			&project.PasswordHash,
		); err != nil {
			return nil, err
		}
		items = append(items, project)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return items, nil
}
