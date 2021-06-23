import Joi from '@hapi/joi';
import { WatchTypeEnum } from '@interfaces/models/watch.interface';
import { ArgTypes, validateRules } from './base/validationsTypes';

export const watchValidator: validateRules = {
  requestValidation: {
    argType: ArgTypes.Body,
    rules: Joi.object({
      name: Joi.string().required(),
      gender: Joi.string().required(),
      producer: Joi.string().required(),
      type: Joi.string().valid(...Object.values(WatchTypeEnum))
    })
  }
};
