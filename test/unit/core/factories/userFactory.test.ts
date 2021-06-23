import { UserFactory } from '@factories/user.factory';

describe('Category Factory', () => {
  it('Create Instance ', () => {
    const service = UserFactory.createInstance();
    expect(service).toBeDefined();
  });
});
