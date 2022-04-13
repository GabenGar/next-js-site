-- Up Migration
CREATE TABLE comments (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  account_id int NOT NULL REFERENCES accounts,
  parent_id INT REFERENCES comments,
  blog_slug TEXT UNIQUE NOT NULL,
  content TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false
)
-- Down Migration
