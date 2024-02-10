package main

import (
	"context"
	"encoding/json"

	"github.com/sourcetab/sourcetab/internal/models"
	"github.com/sourcetab/sourcetab/openapi"
)

// ListProjects implements listProjects operation.
//
// List projects.
//
// GET /api/v1/projects
func (h handlerService) ListProjects(ctx context.Context) (openapi.ListProjectsRes, error) {
	user := h.app.contextGetUser(ctx)

	var (
		projects []models.Project
		err      error
	)
	if user.IsAnonymous() {
		projects, err = h.app.models.Project.ListPublic()
	} else {
		projects, err = h.app.models.Project.ListPublicAndUser(user.ID)
	}
	if err != nil {
		return &openapi.ServerError{}, err
	}

	projectsRes := make(openapi.ListProjectsOKApplicationJSON, len(projects))
	for i, project := range projects {
		projectsRes[i] = openapi.Project{
			ID:         openapi.ID(project.ID),
			CreatedAt:  project.CreatedAt,
			UpdatedAt:  project.UpdatedAt,
			Type:       openapi.ProjectType(project.Type),
			UserID:     openapi.ID(project.UserID),
			Visibility: openapi.ProjectVisibility(project.Visibility),
			Name:       project.Name,
			Data:       string(project.Data),
		}
	}

	return &projectsRes, nil
}

// CreateProject implements createProject operation.
//
// Create project.
//
// POST /api/v1/projects
func (h handlerService) CreateProject(ctx context.Context, req *openapi.CreateProjectReq) (openapi.CreateProjectRes, error) {
	user := h.app.contextGetUser(ctx)

	if user.IsAnonymous() {
		return &openapi.CreateProjectUnauthorized{}, nil
	}

	project := models.Project{
		Type:       string(req.Type),
		UserID:     user.ID,
		Visibility: string(req.Visibility),
		Name:       req.Name,
		Data:       json.RawMessage(req.Data),
	}
	err := h.app.models.Project.Insert(&project)
	if err != nil {
		return &openapi.ServerError{}, err
	}

	return &openapi.Project{
		ID:         openapi.ID(project.ID),
		CreatedAt:  project.CreatedAt,
		UpdatedAt:  project.UpdatedAt,
		Type:       openapi.ProjectType(project.Type),
		UserID:     openapi.ID(project.UserID),
		Visibility: openapi.ProjectVisibility(project.Visibility),
		Name:       project.Name,
		Data:       string(project.Data),
	}, nil
}

// GetProjectById implements getProjectById operation.
//
// Find project by ID.
//
// GET /api/v1/projects/{projectID}
func (h handlerService) GetProjectById(ctx context.Context, params openapi.GetProjectByIdParams) (openapi.GetProjectByIdRes, error) {
	user := h.app.contextGetUser(ctx)

	var project *models.Project
	var err error
	if user.IsAnonymous() {
		project, err = h.app.models.Project.GetPublic(int64(params.ProjectID))
	} else {
		project, err = h.app.models.Project.GetPublicAndUser(int64(params.ProjectID), user.ID)
	}
	if err != nil {
		return &openapi.GetProjectByIdNotFound{}, err
	}

	return &openapi.Project{
		ID:         openapi.ID(project.ID),
		CreatedAt:  project.CreatedAt,
		UpdatedAt:  project.UpdatedAt,
		Type:       openapi.ProjectType(project.Type),
		UserID:     openapi.ID(project.UserID),
		Visibility: openapi.ProjectVisibility(project.Visibility),
		Name:       project.Name,
		Data:       string(project.Data),
	}, nil
}
