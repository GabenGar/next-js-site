-- Up Migration
-- `updated_at` commented out for the time being
-- since they require triggers set up
CREATE TABLE templates (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- updated_at NOT NULL DEFAULT CURRENT_TIMESTAMP TIMESTAMPTZ
)
;

CREATE INDEX ON templates (created_at);
CREATE INDEX ON templates (created_at);
-- CREATE INDEX ON templates (updated_at);
-- Down Migration
