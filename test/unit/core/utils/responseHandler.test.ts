import { ErrorParams, SuccessParams } from '@interfaces/requests/params.interface';
import { StatusHandler } from '@utils/responseHandler';
import { StatusCodes } from 'http-status-codes';

describe('responde handler', () => {
  it('handlerSuccess: params without data ', () => {
    const params: SuccessParams = {
      statusCode: StatusCodes.OK
    };

    const result = StatusHandler.handlerSuccess(params);

    expect(result.statusCode).toEqual(StatusCodes.OK);
    expect(result.headers).toEqual({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization'
    });
    expect(result.body).toEqual('{}');
  });

  it('handleError: params with isJson false', () => {
    const params: ErrorParams = {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      contentType: 'foo'
    };

    const result = StatusHandler.handleError(params, 'entity');
    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toEqual('Internal Server Error');
  });
});
