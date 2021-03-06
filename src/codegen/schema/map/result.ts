import { SchemaObject } from "ajv";

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
  yaDiskLinkSchema,
  yaDiskOperationStatusSchema,
  yaDiskPublicResourceListSchema,
  yaDiskPublicResourceSchema,
  yaDiskResourceListSchema,
  yaDiskResourceSchema,
  yaDiskShareInfoSchema,
  yaDiskSystemFoldersSchema,
  yaDiskUserPublicInformationSchema,
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
  formFileObjectSchema,
  serialIntegerSchema,
} from "#codegen/schema/assets";

export const schemaMap: Record<string, SchemaObject> = {
  "http://schemas.com/account/base.schema.json": accountSchema,
  "http://schemas.com/account/client.schema.json": accountClientSchema,
  "http://schemas.com/account/comment/base.schema.json": commentSchema,
  "http://schemas.com/account/comment/client.schema.json": commentClientSchema,
  "http://schemas.com/account/comment/init.schema.json": commentInitSchema,
  "http://schemas.com/account/init.schema.json": accountInitSchema,
  "http://schemas.com/account/invite/base.schema.json": inviteSchema,
  "http://schemas.com/account/invite/client.schema.json": inviteClientSchema,
  "http://schemas.com/account/invite/init.schema.json": inviteInitSchema,
  "http://schemas.com/account/profile/base.schema.json": accountProfileSchema,
  "http://schemas.com/account/profile/client.schema.json":
    accountProfileClientSchema,
  "http://schemas.com/account/profile/init.schema.json":
    accountProfileInitSchema,
  "http://schemas.com/api/ya-disk/comment-ids.schema.json":
    yaDiskCommentIDsSchema,
  "http://schemas.com/api/ya-disk/disk.schema.json": yaDiskDiskSchema,
  "http://schemas.com/api/ya-disk/error.schema.json": yaDiskErrorSchema,
  "http://schemas.com/api/ya-disk/exif.schema.json": yaDiskExifSchema,
  "http://schemas.com/api/ya-disk/link.schema.json": yaDiskLinkSchema,
  "http://schemas.com/api/ya-disk/operation-status.schema.json":
    yaDiskOperationStatusSchema,
  "http://schemas.com/api/ya-disk/public-resource-list.schema.json":
    yaDiskPublicResourceListSchema,
  "http://schemas.com/api/ya-disk/public-resource.schema.json":
    yaDiskPublicResourceSchema,
  "http://schemas.com/api/ya-disk/resource-list.schema.json":
    yaDiskResourceListSchema,
  "http://schemas.com/api/ya-disk/resource.schema.json": yaDiskResourceSchema,
  "http://schemas.com/api/ya-disk/share-info.schema.json":
    yaDiskShareInfoSchema,
  "http://schemas.com/api/ya-disk/system-folders.schema.json":
    yaDiskSystemFoldersSchema,
  "http://schemas.com/api/ya-disk/user-public-information.schema.json":
    yaDiskUserPublicInformationSchema,
  "http://schemas.com/api/ya-disk/user.schema.json": yaDiskUserSchema,
  "http://schemas.com/blog-post.schema.json": blogPostSchema,
  "http://schemas.com/calendar-note/base.schema.json": calendarNoteSchema,
  "http://schemas.com/calendar-note/client.schema.json":
    calendarNoteClientSchema,
  "http://schemas.com/calendar-note/init.schema.json": calendarNoteInitSchema,
  "http://schemas.com/config.schema.json": projectConfigSchema,
  "http://schemas.com/database.schema.json": projectDatabaseSchema,
  "http://schemas.com/email-confirmation.schema.json": emailConfirmationSchema,
  "http://schemas.com/frontend-mentor/comment.schema.json": fMCommentSchema,
  "http://schemas.com/localization/account.schema.json":
    accountLocalizationSchema,
  "http://schemas.com/localization/admin.schema.json": adminLocalizationSchema,
  "http://schemas.com/localization/auth.schema.json": authLocalizationSchema,
  "http://schemas.com/localization/blog.schema.json": blogLocalizationSchema,
  "http://schemas.com/localization/common.schema.json":
    commonLocalizationSchema,
  "http://schemas.com/localization/components.schema.json":
    componentLocalizationSchema,
  "http://schemas.com/localization/fm-comments.schema.json":
    fMCommentsLocalizationSchema,
  "http://schemas.com/localization/frontend-mentor.schema.json":
    frontendMentorLocalizationSchema,
  "http://schemas.com/localization/layout.schema.json":
    layoutLocalizationSchema,
  "http://schemas.com/types/code.schema.json": codeStringSchema,
  "http://schemas.com/types/dates/iso-date.schema.json": iSODateSchema,
  "http://schemas.com/types/dates/iso-datetime.schema.json": iSODateTimeSchema,
  "http://schemas.com/types/dates/iso-time.schema.json": iSOTimeSchema,
  "http://schemas.com/types/email.schema.json": emailStringSchema,
  "http://schemas.com/types/file.schema.json": formFileObjectSchema,
  "http://schemas.com/types/serial.schema.json": serialIntegerSchema,
};
