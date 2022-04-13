-- Up Migration
CREATE TABLE comments (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  account_id int NOT NULL REFERENCES accounts,
  parent_id int REFERENCES comments,
  blog_slug text NOT NULL,
  content text,
  is_public boolean NOT NULL DEFAULT FALSE
);

CREATE INDEX ON comments (created_at);
CREATE INDEX ON comments (blog_slug);
CREATE INDEX ON comments (parent_id);
CREATE INDEX ON comments (is_public);
-- Down Migration
