export const Account =  {
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
	}
} as const;

export type IAccount = typeof Account;
export const BlogPost =  {
	title: 'BlogPost',
	description: 'The post of the blog.',
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
	}
} as const;

export type IBlogPost = typeof BlogPost;
export const CalendarNote =  {
	title: 'CalendarNote',
	description: 'A note in the calendar.',
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
		}
	}
} as const;

export type ICalendarNote = typeof CalendarNote;
export const ProjectConfig =  {
	title: 'ProjectConfig',
	description: 'Config for the project.',
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
	}
} as const;

export type IProjectConfig = typeof ProjectConfig;
export const ProjectDatabase =  {
	title: 'ProjectDatabase',
	description: 'Various database details.',
	properties: {
		pgmigrations: {
			description: 'Migrations.'
		},
		accounts: {
			description: 'Accounts.'
		},
		email_confirmations: {
			description: 'Pending email confirmations for accounts.'
		},
		calendar_notes: {
			description: 'Account notes for calendar.'
		}
	}
} as const;

export type IProjectDatabase = typeof ProjectDatabase;
export const EmailConfimation =  {
	title: 'EmailConfimation',
	description: 'Confirmation data for email.',
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
	}
} as const;

export type IEmailConfimation = typeof EmailConfimation;
export const ISODate =  {
	title: 'ISODate',
	description: 'ISO string representing date.',
	type: 'string',
	format: 'date'
} as const;

export type IISODate = typeof ISODate;
export const ISODateTime =  {
	title: 'ISODateTime',
	description: 'ISO string representing datetime.',
	type: 'string',
	format: 'date-time'
} as const;

export type IISODateTime = typeof ISODateTime;
export const ISOTime =  {
	title: 'ISOTime',
	description: 'ISO string representing time.',
	type: 'string',
	format: 'time'
} as const;

export type IISOTime = typeof ISOTime;