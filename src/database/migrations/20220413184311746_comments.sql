-- Up Migration
CREATE SCHEMA comments;

CREATE TABLE comments.entries (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  account_id int NOT NULL REFERENCES accounts,
  parent_id int REFERENCES comments.entries,
  content text,
  is_public boolean NOT NULL DEFAULT FALSE
);

CREATE INDEX ON comments.entries (created_at);

CREATE INDEX ON comments.entries (created_at);

CREATE INDEX ON comments.entries (parent_id);

CREATE INDEX ON comments.entries (is_public);

CREATE TABLE comments.blog (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  comment_id int NOT NULL REFERENCES comments.entries,
  blog_slug text NOT NULL
);

CREATE INDEX ON comments.blog (created_at);

CREATE INDEX ON comments.blog (comment_id);

CREATE INDEX ON comments.blog (blog_slug);

-- Down Migration
