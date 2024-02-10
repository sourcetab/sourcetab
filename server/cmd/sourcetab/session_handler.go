package main

import (
	"context"

	"github.com/google/uuid"
	"github.com/sourcetab/sourcetab/internal/models"
	"github.com/sourcetab/sourcetab/openapi"
)

type contextKey string

const sessionContextKey = contextKey("session")
const userContextKey = contextKey("user")

func (app *application) contextGetSession(ctx context.Context) *models.Session {
	session, ok := ctx.Value(sessionContextKey).(*models.Session)
	if !ok {
		panic("missing session value in request context")
	}

	return session
}

func (app *application) contextGetUser(ctx context.Context) *models.User {
	user, ok := ctx.Value(userContextKey).(*models.User)
	if !ok {
		panic("missing user value in request context")
	}

	return user
}

func (h securityHandlerService) HandleBearerAuth(ctx context.Context, operationName string, t openapi.BearerAuth) (context.Context, error) {
	sessionToken, err := uuid.Parse(t.Token)
	if err != nil {
		return ctx, err
	}

	session := &models.Session{
		ID: sessionToken,
	}
	user, err := h.app.models.User.GetWithSession(session)
	if err != nil {
		return ctx, err
	}

	ctx = context.WithValue(ctx, sessionContextKey, session)
	ctx = context.WithValue(ctx, userContextKey, user)

	return ctx, nil
}
