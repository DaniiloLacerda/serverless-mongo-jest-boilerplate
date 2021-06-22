import { ErrorParams, SuccessParams } from '@interfaces/requests/params.interface';
import { IHandlerReturn } from '@interfaces/responses/handlerSuccess.interface';
import { StatusCodes } from 'http-status-codes';
import { CONTENT_TYPE_JSON } from './constants';

export class StatusHandler {
  static handlerSuccess(params: SuccessParams): IHandlerReturn {
    const response = {
      headers: defaultHeaders(''),
      statusCode: params.statusCode,
      body: JSON.stringify(params.data || {})
    };
    return response;
  }

  static handleError(params: ErrorParams, entity = '') {
    const isJson = (params.contentType || CONTENT_TYPE_JSON) === CONTENT_TYPE_JSON;

    return {
      statusCode: params.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      headers: defaultHeaders(params.contentType),
      body: isJson ? JSON.stringify(params.data) : params.data || 'Internal Server Error'
    };
  }
}

const defaultHeaders = (contentType: string) => {
  return {
    'Content-Type': contentType || CONTENT_TYPE_JSON,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization'
  };
};
