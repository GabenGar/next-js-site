-- Up Migration
CREATE TABLE invites (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  account_id INT NOT NULL REFERENCES accounts,
  code TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ,
  max_uses INT,
  is_active BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE accounts 
  ADD COLUMN invite_id INT REFERENCES invites;

CREATE INDEX ON invites (created_at);
CREATE INDEX ON invites (is_active);
CREATE INDEX ON invites (expires_at);
CREATE INDEX ON invites (code);
CREATE INDEX ON accounts (invite_id);
-- Down Migration