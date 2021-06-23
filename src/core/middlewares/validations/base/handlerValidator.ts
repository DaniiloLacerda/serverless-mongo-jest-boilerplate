import { CONTENT_TYPE_JSON, JOI_TRANSLATE_MESSAGES } from '@utils/constants';
import { StatusHandler } from '@utils/responseHandler';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { handlerValidatorParams } from './validationsTypes';

export const handlerValidator =
  (params: handlerValidatorParams) => async (event: APIGatewayProxyEvent, context: Context) => {
    const {
      validate: { requestValidation },
      handler
    } = params;

    if (!requestValidation) {
      return handler(event, context);
    }

    const { rules, argType } = requestValidation;
    const data =
      typeof event[argType] === 'string'
        ? JSON.parse(event[argType.toString()])
        : event[argType];

    const { value, isValid, errors } = validateEvent(data, argType, rules);
    if (isValid) {
      event[argType] = value;
      return handler(event, context);
    }

    return StatusHandler.handleError({
      statusCode: StatusCodes.BAD_REQUEST,
      contentType: CONTENT_TYPE_JSON,
      data: { errors }
    });
  };

const validateEvent = (e, path, schema) => {
  const { error, value } = schema.validate(e, {
    abortEarly: false,
    messages: JOI_TRANSLATE_MESSAGES,
    errors: { wrap: { label: '' } }
  });

  const isValid = !error;
  const errors = isValid
    ? null
    : error.details.map((detail: any) => {
        return { key: detail.context.key, path, message: detail.message };
      });

  return { value, isValid, errors };
};
