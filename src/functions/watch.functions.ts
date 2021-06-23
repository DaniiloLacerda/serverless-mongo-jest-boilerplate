import { Database } from '@config/db';
import { UserFactory } from '@factories/user.factory';
import { WatchFactory } from '@factories/watch.factory';
import { baseValidator } from '@middlewares/validations/base/baseValidators';
import { handlerValidator } from '@middlewares/validations/base/handlerValidator';
import { watchValidator } from '@middlewares/validations/watchValidator';
import { ITEM_DELETED, ITEM_UPDATED } from '@utils/constants';
import { JWTHelper } from '@utils/jwtHelper';
import { StatusHandler } from '@utils/responseHandler';
import { StatusCodes } from 'http-status-codes';

export const create = handlerValidator({
  validate: watchValidator,
  handler: async event => {
    try {
      const database = new Database();
      await database.createConnection();
      const service = WatchFactory.createInstance();
      const data = await service.create(event);

      return StatusHandler.handlerSuccess({
        statusCode: StatusCodes.OK,
        data
      });
    } catch (error) {
      return StatusHandler.handleError({ data: error });
    }
  }
});

export const find = handlerValidator({
  validate: baseValidator,
  handler: async event => {
    try {
      const database = new Database();
      await database.createConnection();
      const service = WatchFactory.createInstance();
      const data = await service.find({
        active: true,
        userId: JWTHelper.getUserId(event)
      });

      return StatusHandler.handlerSuccess({
        statusCode: StatusCodes.OK,
        data
      });
    } catch (error) {
      return StatusHandler.handleError({ data: error });
    }
  }
});

export const destroy = handlerValidator({
  validate: baseValidator,
  handler: async event => {
    try {
      const database = new Database();
      await database.createConnection();
      const service = WatchFactory.createInstance();
      const { id } = event.pathParameters;
      await service.deactivate(id);

      return StatusHandler.handlerSuccess({
        statusCode: StatusCodes.OK,
        data: { message: ITEM_DELETED }
      });
    } catch (error) {
      return StatusHandler.handleError({ data: error });
    }
  }
});

export const update = handlerValidator({
  validate: watchValidator,
  handler: async event => {
    try {
      const database = new Database();
      await database.createConnection();
      const service = WatchFactory.createInstance();
      const { id } = event.pathParameters;
      await service.updateById(id, event.body);

      return StatusHandler.handlerSuccess({
        statusCode: StatusCodes.OK,
        data: { message: ITEM_UPDATED }
      });
    } catch (error) {
      return StatusHandler.handleError({ data: error }, 'Product');
    }
  }
});
