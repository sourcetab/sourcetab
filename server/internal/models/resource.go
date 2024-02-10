package models

import (
	"context"
	"encoding/json"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type (
	ProjectModel struct {
		DB *pgxpool.Pool
	}

	Project struct {
		ID         int64           `json:"id"`
		CreatedAt  time.Time       `json:"createdAt"`
		UpdatedAt  time.Time       `json:"updatedAt"`
		Type       string          `json:"type"`
		UserID     int64           `json:"userID"`
		Visibility string          `json:"visibility"`
		Name       string          `json:"name"`
		Data       json.RawMessage `json:"data"`
	}
)

func (m ProjectModel) Insert(project *Project) error {
	const query = `
		INSERT INTO project (type, user_id, visibility, name, data)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, created_at, updated_at
	`

	args := []interface{}{project.Type, project.UserID, project.Visibility, project.Name, project.Data}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRow(ctx, query, args...).Scan(&project.ID, &project.CreatedAt, &project.UpdatedAt)
	if err != nil {
		return err
	}

	return nil
}

func (m ProjectModel) GetPublic(id int64) (*Project, error) {
	const query = `
		SELECT id, created_at, updated_at, type, user_id, visibility, name, data
		FROM project
		WHERE id = $1 AND visibility = 'public'
	`

	var project Project

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRow(ctx, query, id).Scan(
		&project.ID,
		&project.CreatedAt,
		&project.UpdatedAt,
		&project.Type,
		&project.UserID,
		&project.Visibility,
		&project.Name,
		&project.Data,
	)

	if err != nil {
		return nil, err
	}

	return &project, nil
}

func (m ProjectModel) GetPublicAndUser(id int64, userID int64) (*Project, error) {
	const query = `
		SELECT id, created_at, updated_at, type, user_id, visibility, name, data
		FROM project
		WHERE id = $1 AND (visibility = 'public' OR user_id = $2)
	`

	var project Project

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRow(ctx, query, id, userID).Scan(
		&project.ID,
		&project.CreatedAt,
		&project.UpdatedAt,
		&project.Type,
		&project.UserID,
		&project.Visibility,
		&project.Name,
		&project.Data,
	)

	if err != nil {
		return nil, err
	}

	return &project, nil
}

func (m ProjectModel) Update(project *Project, userID int64) error {
	const query = `
		UPDATE project
		SET updated_at = now(), visibility = $3, name = $4, data = $5
		WHERE id = $1 AND user_id = $2
		RETURNING updated_at
	`

	args := []interface{}{
		project.ID,
		userID,
		project.Visibility,
		project.Name,
		project.Data,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRow(ctx, query, args...).Scan(&project.UpdatedAt)
	if err != nil {
		return err
	}

	return nil
}

func (m ProjectModel) ListPublic() ([]Project, error) {
	const query = `
		SELECT id, created_at, updated_at, type, user_id, visibility, name, data
		FROM project
		WHERE visibility = 'public'
	`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	rows, err := m.DB.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []Project
	for rows.Next() {
		var project Project
		if err := rows.Scan(
			&project.ID,
			&project.CreatedAt,
			&project.UpdatedAt,
			&project.Type,
			&project.UserID,
			&project.Visibility,
			&project.Name,
			&project.Data,
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

func (m ProjectModel) ListPublicAndUser(userID int64) ([]Project, error) {
	const query = `
		SELECT id, created_at, updated_at, type, user_id, visibility, name, data
		FROM project
		WHERE visibility = 'public' OR user_id = $1
	`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	rows, err := m.DB.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []Project
	for rows.Next() {
		var project Project
		if err := rows.Scan(
			&project.ID,
			&project.CreatedAt,
			&project.UpdatedAt,
			&project.Type,
			&project.UserID,
			&project.Visibility,
			&project.Name,
			&project.Data,
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
