import { VALUE_NOT_FOUND } from '@utils/constants';

describe('Constants', () => {
  it('VALUE_NOT_FOUND', () => {
    const result = VALUE_NOT_FOUND('field');
    expect(result).toEqual('field não encontrada(o).');
  });
});
