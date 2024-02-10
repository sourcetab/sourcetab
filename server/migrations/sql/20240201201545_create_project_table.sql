-- +goose Up
-- +goose StatementBegin
CREATE TABLE project (
  id bigserial PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  type text NOT NULL,
  user_id bigint NOT NULL REFERENCES user_(id) ON DELETE CASCADE,
  visibility text NOT NULL,
  name text NOT NULL,
  data jsonb NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE project;
-- +goose StatementEnd
