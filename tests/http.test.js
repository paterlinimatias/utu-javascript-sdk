import createEndpoint from '../src/http';

describe('createEndpoint', function() {
  it('should create a function', function() {
    const func = createEndpoint();

    expect(typeof func).toBe('function')
  });

  it('should return a failure', async function() {
    const func = createEndpoint('failing-test-check');

    expect(typeof func).toBe('function');
    try {
      const req = await func({});
    } catch(e) {
      expect(e).toBeDefined();
    }
  });
});
