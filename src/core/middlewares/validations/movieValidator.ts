import Joi from '@hapi/joi';
import { MovieTypeEnum } from '@interfaces/models/movie.interface';
import { ArgTypes, validateRules } from './base/validationsTypes';

export const movieValidator: validateRules = {
  requestValidation: {
    argType: ArgTypes.Body,
    rules: Joi.object({
      name: Joi.string().required(),
      gender: Joi.string().required(),
      producer: Joi.string().required(),
      type: Joi.string().valid(...Object.values(MovieTypeEnum))
    })
  }
};
