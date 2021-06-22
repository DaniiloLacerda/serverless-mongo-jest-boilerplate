import { APIGatewayAuthorizerResult } from 'aws-lambda';

export class Policy {
  static generate(principalId, effect, resource, context): APIGatewayAuthorizerResult {
    return {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        }],
      },
      context,
    };
  }
}
