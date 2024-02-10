package main

import (
	"context"

	"github.com/sourcetab/sourcetab/internal/models"
	"github.com/sourcetab/sourcetab/openapi"
)

// AccountStatus implements accountStatus operation.
//
// Retrieve account status.
//
// GET /api/v1/auth/status
func (h handlerService) AccountStatus(ctx context.Context) (openapi.AccountStatusRes, error) {
	user := h.app.contextGetUser(ctx)

	return &openapi.AccountStatusOK{
		User: openapi.User{
			ID:        openapi.ID(user.ID),
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
			Username:  openapi.Username(user.Username),
		},
	}, nil
}

// RegisterAccount implements registerAccount operation.
//
// Register a new account.
//
// POST /api/v1/auth/register
func (h handlerService) RegisterAccount(ctx context.Context, req *openapi.RegisterAccountReq) (openapi.RegisterAccountRes, error) {
	user := models.User{
		Username: string(req.Username),
		Email:    string(req.Email),
	}
	err := user.SetPassword(string(req.Password))
	if err != nil {
		return &openapi.ServerError{}, err
	}

	err = h.app.models.User.Insert(&user)
	if err != nil {
		return &openapi.ServerError{}, err
	}

	return &openapi.RegisterAccountOK{
		User: openapi.User{
			ID:        openapi.ID(user.ID),
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
			Username:  openapi.Username(user.Username),
		},
	}, nil
}

// LoginAccount implements loginAccount operation.
//
// Generate and fetch auth token.
//
// POST /api/v1/auth/login
func (h handlerService) LoginAccount(ctx context.Context, req *openapi.LoginAccountReq) (openapi.LoginAccountRes, error) {
	user, err := h.app.models.User.GetByUsername(string(req.Username))
	// Username does not exist
	if err != nil {
		return &openapi.LoginAccountUnauthorized{}, err
	}

	// Password does not match
	passwordMatches, err := user.ComparePassword(string(req.Password))
	if err != nil || !passwordMatches {
		return &openapi.LoginAccountUnauthorized{}, err
	}

	session, err := h.app.models.Session.New(user.ID)
	if err != nil {
		return &openapi.ServerError{}, err
	}

	return &openapi.LoginAccountOK{
		Session: openapi.Session{
			Token:   session.ID,
			Expires: session.Expires,
		},
		User: openapi.User{
			ID:        openapi.ID(user.ID),
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
			Username:  openapi.Username(user.Username),
		},
	}, nil
}

// RefreshToken implements refreshToken operation.
//
// Refresh authentication token.
//
// POST /api/v1/auth/refresh
func (h handlerService) RefreshToken(ctx context.Context) (openapi.RefreshTokenRes, error) {
	oldSession := h.app.contextGetSession(ctx)

	if oldSession.IsAnonymous() {
		return &openapi.RefreshTokenUnauthorized{}, nil
	}

	user := h.app.contextGetUser(ctx)

	session, err := h.app.models.Session.New(user.ID)
	if err != nil {
		return &openapi.ServerError{}, err
	}

	h.app.models.Session.Delete(oldSession)

	return &openapi.Session{
		Token:   session.ID,
		Expires: session.Expires,
	}, nil
}

// LogoutAccount implements logoutAccount operation.
//
// Revoke authentication token.
//
// POST /api/v1/auth/logout
func (h handlerService) LogoutAccount(ctx context.Context) (openapi.LogoutAccountRes, error) {
	oldSession := h.app.contextGetSession(ctx)

	if oldSession.IsAnonymous() {
		return &openapi.LogoutAccountUnauthorized{}, nil
	}

	err := h.app.models.Session.Delete(oldSession)
	if err != nil {
		return &openapi.ServerError{}, err
	}

	return &openapi.LogoutAccountOK{}, nil
}

// DeleteAccount implements deleteAccount operation.
//
// Delete the authenticated account and it's data.
//
// DELETE /api/v1/auth/delete
func (h handlerService) DeleteAccount(ctx context.Context) (openapi.DeleteAccountRes, error) {
	return &openapi.ServerError{}, nil
}
