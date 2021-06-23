import { APIGatewayProxyEvent, Context } from 'aws-lambda';

export enum ArgTypes {
  Body = 'body',
  QueryString = 'queryStringParameters',
  PathParameters = 'pathParameters'
}

export interface requestValidation {
  argType: string;
  rules: {};
}

export interface validateRules {
  requestValidation?: requestValidation;
}

export interface handlerValidatorParams {
  validate: validateRules;
  handler: (event, context: Context) => {};
}
