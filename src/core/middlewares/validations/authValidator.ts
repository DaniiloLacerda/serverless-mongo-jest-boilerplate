import Joi from '@hapi/joi';
import { ArgTypes, validateRules } from './base/validationsTypes';

export const authValidator: validateRules = {
  requestValidation: {
    argType: ArgTypes.Body,
    rules: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }
};
