package main

import (
	"context"

	"github.com/sourcetab/sourcetab/openapi"
)

// ListUsers implements listUsers operation.
//
// List users.
//
// GET /api/v1/users
func (h handlerService) ListUsers(ctx context.Context) (openapi.ListUsersRes, error) {
	users, err := h.app.models.User.List()
	if err != nil {
		return &openapi.ServerError{}, nil
	}

	usersRes := make(openapi.ListUsersOKApplicationJSON, len(users))
	for i, user := range users {
		usersRes[i] = openapi.User{
			ID:        openapi.ID(user.ID),
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
			Username:  openapi.Username(user.Username),
		}
	}

	return &usersRes, nil
}

// GetUserById implements getUserById operation.
//
// Find user by ID.
//
// GET /api/v1/users/{userID}
func (h handlerService) GetUserById(ctx context.Context, params openapi.GetUserByIdParams) (openapi.GetUserByIdRes, error) {
	user, err := h.app.models.User.Get(int64(params.UserID))
	if err != nil {
		return &openapi.GetUserByIdNotFound{}, nil
	}

	return &openapi.User{
		ID:        openapi.ID(user.ID),
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		Username:  openapi.Username(user.Username),
	}, nil
}

// GetUserByName implements getUserByName operation.
//
// Find user by username.
//
// GET /api/v1/users/name/{username}
func (h handlerService) GetUserByName(ctx context.Context, params openapi.GetUserByNameParams) (openapi.GetUserByNameRes, error) {
	user, err := h.app.models.User.GetByUsername(string(params.Username))
	if err != nil {
		return &openapi.GetUserByNameNotFound{}, nil
	}

	return &openapi.User{
		ID:        openapi.ID(user.ID),
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		Username:  openapi.Username(user.Username),
	}, nil
}
