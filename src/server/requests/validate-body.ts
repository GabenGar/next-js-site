import { UNPROCESSABLE_ENTITY } from "#environment/constants/http";
import type { ValidationResult } from "#lib/json/schema";
import type { APIRequest } from "#types/api";
import type { OperationResult } from "#types/util";

type ValidatorFunction<SchemaInterface> = (
  inputData: unknown
) => Promise<ValidationResult<SchemaInterface>>;

type ReqValidationResult<SchemaInterface> =
  | ReqValidationSuccess<SchemaInterface>
  | ReqValidationFailure;

interface ReqValidationSuccess<SchemaInterface> extends OperationResult<true> {
  data: SchemaInterface;
}
interface ReqValidationFailure extends OperationResult<false> {
  response: {
    status: number;
    errors: string[];
  };
}

export async function validateBody<SchemaInterface>(
  reqBody: APIRequest<SchemaInterface>,
  validatorFunc: ValidatorFunction<SchemaInterface>
): Promise<ReqValidationResult<SchemaInterface>> {
  const isDataPresent = reqBody !== undefined && "data" in reqBody;

  if (!isDataPresent) {
    return {
      is_successful: false,
      response: {
        status: UNPROCESSABLE_ENTITY,
        errors: ["Invalid request body."],
      },
    };
  }

  const validationResult = await validatorFunc(reqBody.data);

  if (!validationResult.is_successful) {
    const errors = validationResult.errors.map((errorObj) =>
      JSON.stringify(errorObj)
    );

    return {
      is_successful: false,
      response: {
        status: UNPROCESSABLE_ENTITY,
        errors: errors,
      },
    };
  }

  return {
    is_successful: true,
    data: validationResult.data,
  };
}
