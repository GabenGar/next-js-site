export const accountSchema =  {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/account.schema.json',
	title: 'Account',
	description: 'Account on the resource.',
	type: 'object',
	required: [
		'id',
		'created_at',
		'name',
		'password',
		'role',
		'is_verified'
	],
	properties: {
		id: {
			type: 'integer'
		},
		created_at: {
			type: 'string',
			format: 'date-time'
		},
		updated_at: {
			type: 'string',
			format: 'date-time'
		},
		name: {
			type: 'string',
			minLength: 5
		},
		password: {
			type: 'string',
			minLength: 8
		},
		email: {
			type: 'string',
			format: 'email'
		},
		role: {
			type: 'string'
		},
		is_verified: {
			type: 'boolean',
			default: false,
			description: 'Is `true` after account confirms its email.'
		}
	},
	additionalProperties: false
} as const;

export type AccountSchema = typeof accountSchema;


export const blogPostSchema =  {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/blog-post.schema.json',
	title: 'BlogPost',
	description: 'The post of the blog.',
	type: 'object',
	required: [
		'slug',
		'title',
		'created_at',
		'content'
	],
	properties: {
		slug: {
			type: 'string'
		},
		title: {
			type: 'string'
		},
		excerpt: {
			type: 'string'
		},
		content: {
			type: 'string'
		},
		author: {
			type: 'string'
		},
		created_at: {
			type: 'string',
			format: 'date-time'
		},
		edited_at: {
			type: 'string',
			format: 'date-time'
		},
		next_slug: {
			type: 'string',
			description: 'The slug of the next article of the series.'
		}
	},
	additionalProperties: false
} as const;

export type BlogPostSchema = typeof blogPostSchema;


export const calendarNoteSchema =  {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/calendar-note.schema.json',
	title: 'CalendarNote',
	description: 'A note in the calendar.',
	type: 'object',
	properties: {
		id: {
			type: 'integer'
		},
		created_at: {
			type: 'string',
			format: 'date-time'
		},
		account_id: {
			type: 'integer',
			description: 'ID of the account making the note.'
		},
		date: {
			type: 'string',
			format: 'date-time',
			description: 'The timestamp of the note.'
		},
		note: {
			type: 'string',
			description: 'The content of the note.'
		},
		additionalProperties: false
	}
} as const;

export type CalendarNoteSchema = typeof calendarNoteSchema;


export const projectConfigSchema =  {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/config.schema.json',
	title: 'ProjectConfig',
	description: 'Config for the project.',
	type: 'object',
	properties: {
		NEXT_PUBLIC_SITE_ORIGIN: {
			type: 'string',
			format: 'uri',
			default: 'http://localhost:3000',
			description: 'The origin of the site.'
		},
		NEXT_PUBLIC_SITE_NAME: {
			type: 'string',
			default: 'Localhost'
		},
		NEXT_PUBLIC_REPOSITORY: {
			type: 'string',
			format: 'uri',
			default: 'https://github.com/GabenGar/next-js-site'
		},
		NEXT_PUBLIC_EMAIL_ADDRESS: {
			type: 'string',
			format: 'email',
			default: 'FLYING POLAR BUFFALO ERROR'
		},
		SECRET_KEY: {
			type: 'string',
			default: 'FLYING POLAR BUFFALO ERROR'
		},
		DATABASE_HOSTNAME: {
			type: 'string',
			default: 'localhost'
		},
		DATABASE_PORT: {
			type: 'integer',
			default: 5432
		},
		DATABASE_NAME: {
			type: 'string',
			default: 'FLYING POLAR BUFFALLO ERROR'
		},
		DATABASE_USER: {
			type: 'string',
			default: 'FLYING POLAR BUFFALLO ERROR'
		},
		DATABASE_PASSWORD: {
			type: 'string',
			default: 'FLYING POLAR BUFFALLO ERROR'
		},
		DATABASE_URL: {
			type: 'string',
			default: 'FLYING POLAR BUFFALLO ERROR',
			description: 'Full url for migrations script.'
		},
		PGSSLMODE: {
			type: 'string',
			default: 'no-verify',
			description: 'Required for migrations to work on heroku-deployed DB.'
		},
		EMAIL_SMTP_HOSTNAME: {
			type: 'string',
			default: 'FLYING POLAR BUFFALO ERROR'
		},
		EMAIL_PORT: {
			type: 'integer',
			default: 465
		},
		EMAIL_USERNAME: {
			type: 'string',
			default: 'FLYING POLAR BUFFALO ERROR'
		},
		EMAIL_PASSWORD: {
			type: 'string',
			default: 'FLYING POLAR BUFFALO ERROR'
		}
	},
	additionalProperties: false
} as const;

export type ProjectConfigSchema = typeof projectConfigSchema;


export const projectDatabaseSchema =  {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/database.schema.json',
	title: 'ProjectDatabase',
	description: 'Various database details.',
	type: 'object',
	properties: {
		pgmigrations: {
			type: 'object',
			description: 'Migrations.'
		},
		accounts: {
			type: 'object',
			description: 'Accounts.'
		},
		email_confirmations: {
			type: 'object',
			description: 'Pending email confirmations for accounts.'
		},
		calendar_notes: {
			type: 'object',
			description: 'Account notes for calendar.'
		}
	},
	additionalProperties: false
} as const;

export type ProjectDatabaseSchema = typeof projectDatabaseSchema;


export const emailConfimationSchema =  {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/email-confirmation.schema.json',
	title: 'EmailConfimation',
	description: 'Confirmation data for email.',
	type: 'object',
	properties: {
		id: {
			type: 'integer'
		},
		account_id: {
			type: 'integer'
		},
		confirmation_key: {
			type: 'string'
		},
		email: {
			type: 'string',
			format: 'email'
		},
		created_at: {
			type: 'string',
			format: 'date-time'
		},
		expires_at: {
			type: 'string',
			format: 'date-time'
		}
	},
	additionalProperties: false
} as const;

export type EmailConfimationSchema = typeof emailConfimationSchema;


export const iSODateSchema =  {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/types/dates/iso-date.schema.json',
	title: 'ISODate',
	description: 'ISO string representing date.',
	type: 'string',
	format: 'date'
} as const;

export type ISODateSchema = typeof iSODateSchema;


export const iSODateTimeSchema =  {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/types/dates/iso-datetime.schema.json',
	title: 'ISODateTime',
	description: 'ISO string representing datetime.',
	type: 'string',
	format: 'date-time'
} as const;

export type ISODateTimeSchema = typeof iSODateTimeSchema;


export const iSOTimeSchema =  {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/types/dates/iso-time.schema.json',
	title: 'ISOTime',
	description: 'ISO string representing time.',
	type: 'string',
	format: 'time'
} as const;

export type ISOTimeSchema = typeof iSOTimeSchema;

