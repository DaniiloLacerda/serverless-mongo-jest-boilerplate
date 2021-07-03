import { Database } from '@config/db';
import { MovieFactory } from '@factories/movie.factory';
import { baseShowValidator, baseValidator } from '@middlewares/validations/base/baseValidators';
import { handlerValidator } from '@middlewares/validations/base/handlerValidator';
import { movieValidator } from '@middlewares/validations/movieValidator';
import { ITEM_DELETED, ITEM_UPDATED } from '@utils/constants';
import { JWTHelper } from '@utils/jwtHelper';
import { StatusHandler } from '@utils/responseHandler';
import { StatusCodes } from 'http-status-codes';

export const create = handlerValidator({
  validate: movieValidator,
  handler: async event => {
    try {
      const database = new Database();
      await database.createConnection();
      const service = MovieFactory.createInstance();
      const data = await service.create(event);

      return StatusHandler.handlerSuccess({
        statusCode: StatusCodes.CREATED,
        data
      });
    } catch (error) {
      return StatusHandler.handleError({ data: error });
    }
  }
});

export const index = handlerValidator({
  validate: baseValidator,
  handler: async event => {
    try {
      const database = new Database();
      await database.createConnection();
      const service = MovieFactory.createInstance();
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
      const service = MovieFactory.createInstance();
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
  validate: movieValidator,
  handler: async event => {
    try {
      const database = new Database();
      await database.createConnection();
      const service = MovieFactory.createInstance();
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

export const find = handlerValidator({
  validate: baseShowValidator,
  handler: async event => {
    try {
      const database = new Database();
      await database.createConnection();
      const service = MovieFactory.createInstance();
      const { id } = event.pathParameters;

      const data = await service.findOne({
        _id: id,
        active: true,
        userId: JWTHelper.getUserId(event)
      });

      return StatusHandler.handlerSuccess({
        statusCode: StatusCodes.OK,
        data
      });
    } catch (error) {
      return StatusHandler.handleError({ data: error }, 'Movie');
    }
  }
});
