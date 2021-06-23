import { IHandlerReturn } from '@interfaces/responses/handlerSuccess.interface';
import { handlerValidator } from '@middlewares/validations/base/handlerValidator';
import { movieValidator } from '@middlewares/validations/movieValidator';
import { StatusHandler } from '@utils/responseHandler';
import { StatusCodes } from 'http-status-codes';

describe('Handler validator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handlerValidator: when body is invalid', async () => {
    const functionsHandler = handlerValidator({
      validate: movieValidator,
      handler: () =>
        StatusHandler.handlerSuccess({
          statusCode: StatusCodes.CREATED,
          data: 'test'
        })
    });

    const event = { body: { name: 'test' } };
    const result = (await functionsHandler(event as any, 'context' as any)) as IHandlerReturn;
    expect(result.statusCode).toEqual(400);
  });
});
