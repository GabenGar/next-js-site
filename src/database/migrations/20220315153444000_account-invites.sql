-- Up Migration
CREATE TABLE invites (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  account_id INT REFERENCES accounts,
  code TEXT UNIQUE NOT NULL
  expires_at TIMESTAMPTZ,
  max_uses INT,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX ON invites (created_at);
CREATE INDEX ON invites (is_active);
CREATE INDEX ON invites (expires_at);
-- Down Migration