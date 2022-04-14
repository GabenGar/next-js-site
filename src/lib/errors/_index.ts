/**
 * Project-specific error. 
 * All procedures within this codebase throw this error 
 * or it derivatives
 * after they've handled all other errors,
 */
export class ProjectError extends Error {}
