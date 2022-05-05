-- Up Migration
CREATE SCHEMA accounts;

ALTER TABLE accounts SET SCHEMA accounts;

ALTER TABLE invites SET SCHEMA accounts;

ALTER TABLE email_confirmations SET SCHEMA accounts;

ALTER TABLE calendar_notes SET SCHEMA accounts;

ALTER TABLE accounts.accounts RENAME TO entries;

CREATE TABLE accounts.profiles (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  account_id int UNIQUE REFERENCES accounts.entries,
  full_name text UNIQUE,
  avatar_url text
);

CREATE INDEX ON accounts.profiles (created_at);

CREATE INDEX ON accounts.profiles (updated_at);

CREATE INDEX ON accounts.profiles (account_id);

-- Down Migration
