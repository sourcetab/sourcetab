-- +goose Up
-- +goose StatementBegin
CREATE EXTENSION citext;
CREATE TABLE user_ (
  id bigserial PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  username citext NOT NULL UNIQUE,
  email citext NOT NULL UNIQUE,
  password_hash text NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE user_;
DROP EXTENSION citext;
-- +goose StatementEnd
