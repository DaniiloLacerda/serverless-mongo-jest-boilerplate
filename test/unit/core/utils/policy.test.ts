import { Policy } from '@utils/policy';

describe('Policy', () => {
  it('generate: should return policy', () => {
    const result = Policy.generate('principalId', 'effect', 'resource', { context: 'context' });
    expect(result.principalId).toEqual('principalId');
    expect(result.context).toEqual({ context: 'context' });
    expect(result.policyDocument).toEqual({
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'effect',
          Resource: 'resource'
        }
      ]
    });
  });
});
