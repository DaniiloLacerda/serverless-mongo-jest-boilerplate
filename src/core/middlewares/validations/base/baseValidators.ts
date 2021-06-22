import Joi from '@hapi/joi';
import { ArgTypes, validateRules } from './validationsTypes';

export const baseValidator: validateRules = {};

export const baseShowValidator: validateRules = {
  requestValidation: {
    argType: ArgTypes.PathParameters,
    rules: Joi.object({
      id: Joi.string().required()
    })
  }
};

export const baseDestroyValidator: validateRules = {
  requestValidation: {
    argType: ArgTypes.PathParameters,
    rules: Joi.object({
      id: Joi.string().required()
    })
  }
};
