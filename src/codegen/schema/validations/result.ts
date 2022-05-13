import { createValidator } from "#lib/json/schema";

import {
  accountSchema,
  accountClientSchema,
  commentSchema,
  commentClientSchema,
  commentInitSchema,
  accountInitSchema,
  inviteSchema,
  inviteClientSchema,
  inviteInitSchema,
  accountProfileSchema,
  accountProfileClientSchema,
  accountProfileInitSchema,
  yaDiskCommentIDsSchema,
  yaDiskDiskSchema,
  yaDiskErrorSchema,
  yaDiskExifSchema,
  yaDiskResourceListSchema,
  yaDiskResourceSchema,
  yaDiskShareInfoSchema,
  yaDiskSystemFoldersSchema,
  yaDiskUserSchema,
  blogPostSchema,
  calendarNoteSchema,
  calendarNoteClientSchema,
  calendarNoteInitSchema,
  projectConfigSchema,
  projectDatabaseSchema,
  emailConfirmationSchema,
  fMCommentSchema,
  accountLocalizationSchema,
  adminLocalizationSchema,
  authLocalizationSchema,
  blogLocalizationSchema,
  commonLocalizationSchema,
  componentLocalizationSchema,
  fMCommentsLocalizationSchema,
  frontendMentorLocalizationSchema,
  layoutLocalizationSchema,
  codeStringSchema,
  iSODateSchema,
  iSODateTimeSchema,
  iSOTimeSchema,
  emailStringSchema,
  serialIntegerSchema,
} from "#codegen/schema/assets";

import type {
  IAccount,
  IAccountClient,
  IComment,
  ICommentClient,
  ICommentInit,
  IAccountInit,
  IInvite,
  IInviteClient,
  IInviteInit,
  IAccountProfile,
  IAccountProfileClient,
  IAccountProfileInit,
  IYaDiskCommentIDs,
  IYaDiskDisk,
  IYaDiskError,
  IYaDiskExif,
  IYaDiskResourceList,
  IYaDiskResource,
  IYaDiskShareInfo,
  IYaDiskSystemFolders,
  IYaDiskUser,
  IBlogPost,
  ICalendarNote,
  ICalendarNoteClient,
  ICalendarNoteInit,
  IProjectConfig,
  IProjectDatabase,
  IEmailConfirmation,
  IFMComment,
  IAccountLocalization,
  IAdminLocalization,
  IAuthLocalization,
  IBlogLocalization,
  ICommonLocalization,
  IComponentLocalization,
  IFMCommentsLocalization,
  IFrontendMentorLocalization,
  ILayoutLocalization,
  ICodeString,
  IISODate,
  IISODateTime,
  IISOTime,
  IEmailString,
  ISerialInteger,
} from "#codegen/schema/interfaces";

export const validateAccountFields = createValidator<IAccount>(accountSchema);
export const validateAccountClientFields =
  createValidator<IAccountClient>(accountClientSchema);
export const validateCommentFields = createValidator<IComment>(commentSchema);
export const validateCommentClientFields =
  createValidator<ICommentClient>(commentClientSchema);
export const validateCommentInitFields =
  createValidator<ICommentInit>(commentInitSchema);
export const validateAccountInitFields =
  createValidator<IAccountInit>(accountInitSchema);
export const validateInviteFields = createValidator<IInvite>(inviteSchema);
export const validateInviteClientFields =
  createValidator<IInviteClient>(inviteClientSchema);
export const validateInviteInitFields =
  createValidator<IInviteInit>(inviteInitSchema);
export const validateAccountProfileFields =
  createValidator<IAccountProfile>(accountProfileSchema);
export const validateAccountProfileClientFields =
  createValidator<IAccountProfileClient>(accountProfileClientSchema);
export const validateAccountProfileInitFields =
  createValidator<IAccountProfileInit>(accountProfileInitSchema);
export const validateYaDiskCommentIDsFields =
  createValidator<IYaDiskCommentIDs>(yaDiskCommentIDsSchema);
export const validateYaDiskDiskFields =
  createValidator<IYaDiskDisk>(yaDiskDiskSchema);
export const validateYaDiskErrorFields =
  createValidator<IYaDiskError>(yaDiskErrorSchema);
export const validateYaDiskExifFields =
  createValidator<IYaDiskExif>(yaDiskExifSchema);
export const validateYaDiskResourceListFields =
  createValidator<IYaDiskResourceList>(yaDiskResourceListSchema);
export const validateYaDiskResourceFields =
  createValidator<IYaDiskResource>(yaDiskResourceSchema);
export const validateYaDiskShareInfoFields = createValidator<IYaDiskShareInfo>(
  yaDiskShareInfoSchema
);
export const validateYaDiskSystemFoldersFields =
  createValidator<IYaDiskSystemFolders>(yaDiskSystemFoldersSchema);
export const validateYaDiskUserFields =
  createValidator<IYaDiskUser>(yaDiskUserSchema);
export const validateBlogPostFields =
  createValidator<IBlogPost>(blogPostSchema);
export const validateCalendarNoteFields =
  createValidator<ICalendarNote>(calendarNoteSchema);
export const validateCalendarNoteClientFields =
  createValidator<ICalendarNoteClient>(calendarNoteClientSchema);
export const validateCalendarNoteInitFields =
  createValidator<ICalendarNoteInit>(calendarNoteInitSchema);
export const validateProjectConfigFields =
  createValidator<IProjectConfig>(projectConfigSchema);
export const validateProjectDatabaseFields = createValidator<IProjectDatabase>(
  projectDatabaseSchema
);
export const validateEmailConfirmationFields =
  createValidator<IEmailConfirmation>(emailConfirmationSchema);
export const validateFMCommentFields =
  createValidator<IFMComment>(fMCommentSchema);
export const validateAccountLocalizationFields =
  createValidator<IAccountLocalization>(accountLocalizationSchema);
export const validateAdminLocalizationFields =
  createValidator<IAdminLocalization>(adminLocalizationSchema);
export const validateAuthLocalizationFields =
  createValidator<IAuthLocalization>(authLocalizationSchema);
export const validateBlogLocalizationFields =
  createValidator<IBlogLocalization>(blogLocalizationSchema);
export const validateCommonLocalizationFields =
  createValidator<ICommonLocalization>(commonLocalizationSchema);
export const validateComponentLocalizationFields =
  createValidator<IComponentLocalization>(componentLocalizationSchema);
export const validateFMCommentsLocalizationFields =
  createValidator<IFMCommentsLocalization>(fMCommentsLocalizationSchema);
export const validateFrontendMentorLocalizationFields =
  createValidator<IFrontendMentorLocalization>(
    frontendMentorLocalizationSchema
  );
export const validateLayoutLocalizationFields =
  createValidator<ILayoutLocalization>(layoutLocalizationSchema);
export const validateCodeStringFields =
  createValidator<ICodeString>(codeStringSchema);
export const validateISODateFields = createValidator<IISODate>(iSODateSchema);
export const validateISODateTimeFields =
  createValidator<IISODateTime>(iSODateTimeSchema);
export const validateISOTimeFields = createValidator<IISOTime>(iSOTimeSchema);
export const validateEmailStringFields =
  createValidator<IEmailString>(emailStringSchema);
export const validateSerialIntegerFields =
  createValidator<ISerialInteger>(serialIntegerSchema);
