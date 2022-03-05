import Ajv from "ajv";
import addFormats from "ajv-formats";
const ajv = new Ajv();
addFormats(ajv);

import { IAccount } from "#codegen/schema/interfaces";
export const validateAccountFields = ajv.compile<IAccount>({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/account/base.schema.json',
	title: 'Account',
	description: 'Account on the resource.',
	type: 'object',
	required: [
		'id',
		'created_at',
		'name',
		'role',
		'is_verified'
	],
	properties: {
		id: {
			type: 'integer',
			description: 'Is not shown to clients.'
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
			minLength: 5,
			maxLength: 15
		},
		password: {
			type: 'string',
			description: 'Is not shown to clients.',
			minLength: 8,
			maxLength: 256
		},
		email: {
			type: 'string',
			format: 'email',
			maxLength: 512
		},
		role: {
			type: 'string',
			enum: [
				'user'
			]
		},
		is_verified: {
			type: 'boolean',
			default: false,
			description: 'Is `true` after account confirms its email.'
		}
	},
	additionalProperties: false
})

import { IAccountClient } from "#codegen/schema/interfaces";
export const validateAccountClientFields = ajv.compile<IAccountClient>({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/account/client.schema.json',
	title: 'AccountClient',
	description: 'Account representation for client.',
	type: 'object',
	required: [
		'created_at',
		'name',
		'role',
		'is_verified'
	],
	properties: {
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
			minLength: 5,
			maxLength: 15
		},
		email: {
			type: 'string',
			format: 'email',
			maxLength: 512
		},
		role: {
			type: 'string',
			enum: [
				'user'
			]
		},
		is_verified: {
			type: 'boolean',
			default: false,
			description: 'Is `true` after account confirms its email.'
		}
	},
	additionalProperties: false
})

import { IAccountInit } from "#codegen/schema/interfaces";
export const validateAccountInitFields = ajv.compile<IAccountInit>({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/account/init.schema.json',
	title: 'AccountInit',
	description: 'Initializer for account.',
	type: 'object',
	required: [
		'name',
		'password'
	],
	properties: {
		name: {
			type: 'string',
			minLength: 5,
			maxLength: 15
		},
		password: {
			type: 'string',
			minLength: 8,
			maxLength: 256
		}
	},
	additionalProperties: false
})

import { IBlogPost } from "#codegen/schema/interfaces";
export const validateBlogPostFields = ajv.compile<IBlogPost>({
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
})

import { ICalendarNote } from "#codegen/schema/interfaces";
export const validateCalendarNoteFields = ajv.compile<ICalendarNote>({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/calendar-note/base.schema.json',
	title: 'CalendarNote',
	description: 'A note in the calendar.',
	type: 'object',
	required: [
		'id',
		'created_at',
		'date',
		'note'
	],
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
			description: 'The timestamp of the note.',
			maxLength: 1024
		},
		note: {
			type: 'string',
			description: 'The content of the note.',
			minLength: 5,
			maxLength: 1024
		},
		additionalProperties: false
	}
})

import { ICalendarNoteClient } from "#codegen/schema/interfaces";
export const validateCalendarNoteClientFields = ajv.compile<ICalendarNoteClient>({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/calendar-note/client.schema.json',
	title: 'CalendarNoteClient',
	description: 'A note in the calendar as shown to client.',
	type: 'object',
	required: [
		'id',
		'created_at',
		'date',
		'note'
	],
	properties: {
		id: {
			type: 'integer'
		},
		created_at: {
			type: 'string',
			format: 'date-time'
		},
		date: {
			type: 'string',
			format: 'date-time',
			description: 'The timestamp of the note.',
			maxLength: 1024
		},
		note: {
			type: 'string',
			description: 'The content of the note.',
			minLength: 5,
			maxLength: 1024
		},
		additionalProperties: false
	}
})

import { ICalendarNoteInit } from "#codegen/schema/interfaces";
export const validateCalendarNoteInitFields = ajv.compile<ICalendarNoteInit>({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/calendar-note/init.schema.json',
	title: 'CalendarNoteInit',
	description: 'Init for the note in calendar.',
	type: 'object',
	required: [
		'date',
		'note'
	],
	properties: {
		date: {
			type: 'string',
			format: 'date-time',
			description: 'The timestamp of the note.',
			maxLength: 1024
		},
		note: {
			type: 'string',
			description: 'The content of the note.',
			minLength: 5,
			maxLength: 1024
		},
		additionalProperties: false
	}
})

import { IProjectConfig } from "#codegen/schema/interfaces";
export const validateProjectConfigFields = ajv.compile<IProjectConfig>({
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
})

import { IProjectDatabase } from "#codegen/schema/interfaces";
export const validateProjectDatabaseFields = ajv.compile<IProjectDatabase>({
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
})

import { IEmailConfimation } from "#codegen/schema/interfaces";
export const validateEmailConfimationFields = ajv.compile<IEmailConfimation>({
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
})

import { IISODate } from "#codegen/schema/interfaces";
export const validateISODateFields = ajv.compile<IISODate>({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/types/dates/iso-date.schema.json',
	title: 'ISODate',
	description: 'ISO string representing date.',
	type: 'string',
	format: 'date'
})

import { IISODateTime } from "#codegen/schema/interfaces";
export const validateISODateTimeFields = ajv.compile<IISODateTime>({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/types/dates/iso-datetime.schema.json',
	title: 'ISODateTime',
	description: 'ISO string representing datetime.',
	type: 'string',
	format: 'date-time'
})

import { IISOTime } from "#codegen/schema/interfaces";
export const validateISOTimeFields = ajv.compile<IISOTime>({
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: '/types/dates/iso-time.schema.json',
	title: 'ISOTime',
	description: 'ISO string representing time.',
	type: 'string',
	format: 'time'
})