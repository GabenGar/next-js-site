export type {
  IYaDiskCommentIDs as ICommentIDs,
  IYaDiskDisk as IDisk,
  IYaDiskError as IError,
  IYaDiskExif as IExif,
  IYaDiskResourceList as IResourceList,
  IYaDiskResource as IResource,
  IYaDiskShareInfo as IShareInfo,
  IYaDiskSystemFolders as ISystemFolders,
  IYaDiskUser as IUser,
  IYaDiskLink as ILink,
  IYaDiskOperationStatus as IOperationStatus,
} from "#codegen/schema/interfaces";
import type { IYaDiskOperationStatus } from "#codegen/schema/interfaces";

export type IStatus = IYaDiskOperationStatus["status"];
export type YaDiskPath = string;
