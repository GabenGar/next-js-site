export const Account = {
  title: "Account",
  description: "Account on the resource.",
  type: "object",
  required: ["id", "created_at", "name", "password", "role", "is_verified"],
  properties: {
    id: {
      type: "integer",
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    updated_at: {
      type: "string",
      format: "date-time",
    },
    name: {
      type: "string",
      minLength: 5,
    },
    password: {
      type: "string",
      minLength: 8,
    },
    email: {
      type: "string",
      format: "email",
    },
    role: {
      type: "string",
    },
    is_verified: {
      type: "boolean",
      default: false,
      description: "Is `true` after account confirms its email.",
    },
  },
};

export const BlogPost = {
  title: "BlogPost",
  description: "The post of the blog.",
  required: ["slug", "title", "created_at", "content"],
  properties: {
    slug: {
      type: "string",
    },
    title: {
      type: "string",
    },
    excerpt: {
      type: "string",
    },
    content: {
      type: "string",
    },
    author: {
      type: "string",
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    edited_at: {
      type: "string",
      format: "date-time",
    },
    next_slug: {
      type: "string",
      description: "The slug of the next article of the series.",
    },
  },
};

export const CalendarNote = {
  title: "CalendarNote",
  description: "A note in the calendar.",
  properties: {
    id: {
      type: "integer",
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    account_id: {
      type: "integer",
      description: "ID of the account making the note.",
    },
    date: {
      type: "string",
      format: "date-time",
      description: "The timestamp of the note.",
    },
    note: {
      type: "string",
      description: "The content of the note.",
    },
  },
};

export const ProjectConfig = {
  title: "ProjectConfig",
  description: "Config for the project.",
  properties: {
    NEXT_PUBLIC_SITE_ORIGIN: {
      type: "string",
      format: "uri",
      default: "http://localhost:3000",
      description: "The origin of the site.",
    },
    NEXT_PUBLIC_SITE_NAME: {
      type: "string",
      default: "Localhost",
    },
    NEXT_PUBLIC_REPOSITORY: {
      type: "string",
      format: "uri",
      default: "https://github.com/GabenGar/next-js-site",
    },
    NEXT_PUBLIC_EMAIL_ADDRESS: {
      type: "string",
      format: "email",
      default: "FLYING POLAR BUFFALO ERROR",
    },
    SECRET_KEY: {
      type: "string",
      default: "FLYING POLAR BUFFALO ERROR",
    },
    DATABASE_HOSTNAME: {
      type: "string",
      default: "localhost",
    },
    DATABASE_PORT: {
      type: "integer",
      default: 5432,
    },
    DATABASE_NAME: {
      type: "string",
      default: "FLYING POLAR BUFFALLO ERROR",
    },
    DATABASE_USER: {
      type: "string",
      default: "FLYING POLAR BUFFALLO ERROR",
    },
    DATABASE_PASSWORD: {
      type: "string",
      default: "FLYING POLAR BUFFALLO ERROR",
    },
    DATABASE_URL: {
      type: "string",
      default: "FLYING POLAR BUFFALLO ERROR",
      description: "Full url for migrations script.",
    },
    PGSSLMODE: {
      type: "string",
      default: "no-verify",
      description: "Required for migrations to work on heroku-deployed DB.",
    },
    EMAIL_SMTP_HOSTNAME: {
      type: "string",
      default: "FLYING POLAR BUFFALO ERROR",
    },
    EMAIL_PORT: {
      type: "integer",
      default: 465,
    },
    EMAIL_USERNAME: {
      type: "string",
      default: "FLYING POLAR BUFFALO ERROR",
    },
    EMAIL_PASSWORD: {
      type: "string",
      default: "FLYING POLAR BUFFALO ERROR",
    },
  },
};

export const ProjectDatabase = {
  title: "ProjectDatabase",
  description: "Various database details.",
  properties: {
    pgmigrations: {
      description: "Migrations.",
    },
    accounts: {
      description: "Accounts.",
    },
    email_confirmations: {
      description: "Pending email confirmations for accounts.",
    },
    calendar_notes: {
      description: "Account notes for calendar.",
    },
  },
};

export const EmailConfimation = {
  title: "EmailConfimation",
  description: "Confirmation data for email.",
  properties: {
    id: {
      type: "integer",
    },
    account_id: {
      type: "integer",
    },
    confirmation_key: {
      type: "string",
    },
    email: {
      type: "string",
      format: "email",
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    expires_at: {
      type: "string",
      format: "date-time",
    },
  },
};

export const ISODate = {
  title: "ISODate",
  description: "ISO string representing date.",
  type: "string",
  format: "date",
};

export const ISODateTime = {
  title: "ISODateTime",
  description: "ISO string representing datetime.",
  type: "string",
  format: "date-time",
};

export const ISOTime = {
  title: "ISOTime",
  description: "ISO string representing time.",
  type: "string",
  format: "time",
};

export const MetaSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://json-schema.org/draft-07/schema#",
  title: "MetaSchema",
  description: "Slightly extended base schema.",
  definitions: {
    schemaArray: {
      type: "array",
      minItems: 1,
      items: {
        $ref: "#",
      },
    },
    nonNegativeInteger: {
      type: "integer",
      minimum: 0,
    },
    nonNegativeIntegerDefault0: {
      allOf: [
        {
          $ref: "#/definitions/nonNegativeInteger",
        },
        {
          default: 0,
        },
      ],
    },
    simpleTypes: {
      enum: [
        "array",
        "boolean",
        "integer",
        "null",
        "number",
        "object",
        "string",
      ],
    },
    stringArray: {
      type: "array",
      items: {
        type: "string",
      },
      uniqueItems: true,
      default: [],
    },
  },
  type: ["object", "boolean"],
  properties: {
    $id: {
      type: "string",
      format: "uri-reference",
    },
    $schema: {
      type: "string",
      format: "uri",
    },
    $ref: {
      type: "string",
      format: "uri-reference",
    },
    $comment: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    default: true,
    readOnly: {
      type: "boolean",
      default: false,
    },
    writeOnly: {
      type: "boolean",
      default: false,
    },
    examples: {
      type: "array",
      items: true,
    },
    multipleOf: {
      type: "number",
      exclusiveMinimum: 0,
    },
    maximum: {
      type: "number",
    },
    exclusiveMaximum: {
      type: "number",
    },
    minimum: {
      type: "number",
    },
    exclusiveMinimum: {
      type: "number",
    },
    maxLength: {
      $ref: "#/definitions/nonNegativeInteger",
    },
    minLength: {
      $ref: "#/definitions/nonNegativeIntegerDefault0",
    },
    pattern: {
      type: "string",
      format: "regex",
    },
    additionalItems: {
      $ref: "#",
    },
    items: {
      anyOf: [
        {
          $ref: "#",
        },
        {
          $ref: "#/definitions/schemaArray",
        },
      ],
      default: true,
    },
    maxItems: {
      $ref: "#/definitions/nonNegativeInteger",
    },
    minItems: {
      $ref: "#/definitions/nonNegativeIntegerDefault0",
    },
    uniqueItems: {
      type: "boolean",
      default: false,
    },
    contains: {
      $ref: "#",
    },
    maxProperties: {
      $ref: "#/definitions/nonNegativeInteger",
    },
    minProperties: {
      $ref: "#/definitions/nonNegativeIntegerDefault0",
    },
    required: {
      $ref: "#/definitions/stringArray",
    },
    additionalProperties: {
      $ref: "#",
    },
    definitions: {
      type: "object",
      additionalProperties: {
        $ref: "#",
      },
      default: {},
    },
    properties: {
      type: "object",
      additionalProperties: {
        $ref: "#",
      },
      default: {},
    },
    patternProperties: {
      type: "object",
      additionalProperties: {
        $ref: "#",
      },
      propertyNames: {
        format: "regex",
      },
      default: {},
    },
    dependencies: {
      type: "object",
      additionalProperties: {
        anyOf: [
          {
            $ref: "#",
          },
          {
            $ref: "#/definitions/stringArray",
          },
        ],
      },
    },
    propertyNames: {
      $ref: "#",
    },
    const: true,
    enum: {
      type: "array",
      items: true,
      minItems: 1,
      uniqueItems: true,
    },
    type: {
      anyOf: [
        {
          $ref: "#/definitions/simpleTypes",
        },
        {
          type: "array",
          items: {
            $ref: "#/definitions/simpleTypes",
          },
          minItems: 1,
          uniqueItems: true,
        },
      ],
    },
    format: {
      type: "string",
      default: "plain",
      enum: [
        "plain",
        "date-time",
        "time",
        "date",
        "email",
        "idn-email",
        "hostname",
        "idn-hostname",
        "ipv4",
        "ipv6",
        "uri",
        "uri-reference",
        "iri",
        "iri-reference",
        "uri-template",
        "json-pointer",
        "relative-json-pointer",
        "regex",
      ],
      $comment:
        "https://json-schema.org/understanding-json-schema/reference/string.html#format",
    },
    contentMediaType: {
      type: "string",
    },
    contentEncoding: {
      type: "string",
    },
    if: {
      $ref: "#",
    },
    then: {
      $ref: "#",
    },
    else: {
      $ref: "#",
    },
    allOf: {
      $ref: "#/definitions/schemaArray",
    },
    anyOf: {
      $ref: "#/definitions/schemaArray",
    },
    oneOf: {
      $ref: "#/definitions/schemaArray",
    },
    not: {
      $ref: "#",
    },
  },
  default: true,
};
