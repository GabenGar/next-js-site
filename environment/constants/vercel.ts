import { SIZES } from "#environment/constants";
import { SECOND } from "./durations";

/**
 * @link https://vercel.com/docs/concepts/limits/overview#reserved-variables
 */
export const RESERVED_VARIABLES = new Set([
  "AWS_REGION",
  "AWS_DEFAULT_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_KEY",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_EXECUTION_ENV",
  "AWS_LAMBDA_LOG_GROUP_NAME",
  "AWS_LAMBDA_LOG_STREAM_NAME",
  "AWS_LAMBDA_FUNCTION_NAME",
  "AWS_LAMBDA_FUNCTION_MEMORY_SIZE",
  "AWS_LAMBDA_FUNCTION_VERSION",
  "AWS_SESSION_TOKEN",
  "NOW_REGION",
  "TZ",
  "LAMBDA_TASK_ROOT",
  "LAMBDA_RUNTIME_DIR",
]);

/**
 * @link https://vercel.com/docs/concepts/limits/overview#serverless-function-payload-size-limit
 */
export const REQUEST_PAYLOAD_LIMIT = 5 * SIZES.MEGABYTE;

/**
 * The maximum execution timeout is 10 seconds when deployed on a Personal Account (Hobby plan). 
 * 
 * For Teams, the execution timeout is 60 seconds (Pro plan) or 900 seconds (Enterprise plan).
 * @link https://vercel.com/docs/concepts/limits/overview#serverless-function-execution-timeout
 */
export const MAX_REQUEST_DURATION = 10 * SECOND;
