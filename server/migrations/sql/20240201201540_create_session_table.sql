-- +goose Up
-- +goose StatementBegin
CREATE TABLE session (
  id uuid PRIMARY KEY,
  user_id bigint NOT NULL REFERENCES user_(id) ON DELETE CASCADE,
  expires timestamp with time zone NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE session;
-- +goose StatementEnd
