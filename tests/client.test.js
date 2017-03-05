import { uTu } from '../src/main';

const key = '7673f5d1298f4c6596458d8dca5a5968';

describe('uTu Client', function() {

  beforeEach(function () {
    this.client = new uTu(key, {
      platform: 'messenger',
      appId: "abc123",
    });
  });

  describe('set config from constructor', () => {
    it('should set the global conifg', function() {
      expect(this.client.config.platform).toBe('messenger');
      expect(this.client.config.appId).toBe('abc123');
    });
  })

  describe('setConfig', () => {
    it('should set the global conifg', function() {
      this.client.setConfig({
        platform: 'messenger',
        appId: "abc123",
      });

      expect(this.client.config.platform).toBe('messenger');
      expect(this.client.config.appId).toBe('abc123');
    });
  })

  describe('withContext', () => {
    it('should set the context to a new client', function() {

      const ctx = this.client.withContext({
        platformId: "abc",
        sessionId: "abc123",
      });

      expect(this.client.config.platform).toBe('messenger');
      expect(this.client.config.appId).toBe('abc123');
      expect(this.client.config.platformId).toBeUndefined();
      expect(this.client.config.sessionId).toBeUndefined();
      expect(ctx.config.platformId).toBe('abc');
      expect(ctx.config.sessionId).toBe('abc123');

    });

    describe('setValues', () => {
      it('should set the values of the new client', function() {
        const ctx = this.client.withContext({
          platformId: "abc",
          sessionId: "abc123",
        });

        ctx.setValues({
          firstName: 'john',
          lastName: 'doe',
        });

        expect(ctx.values.firstName).toBe('john');
        expect(ctx.values.lastName).toBe('doe');
      });

      it('should throw error if not context', function() {
        expect(() => {
          this.client.setValues({ firstName: "patrick" });
        }).toThrow();
      });
    });

    describe('setValue', () => {
      it('should set a value property on the client', function() {
        const ctx = this.client.withContext({
          platformId: "abc",
          sessionId: "abc123",
        });

        ctx.setValue('firstName', 'patrick');

        expect(ctx.values.firstName).toBe('patrick');
      });

      it('should throw error if no context', function() {
        expect(() => {
          this.client.setValue('firstName', 'patrick');
        }).toThrow();
      });
    });

    describe('getRequestObject', () => {
      it('should set a value property on the client', function() {
        const ctx = this.client.withContext({
          platformId: "abc",
          sessionId: "abc123",
        });

        ctx.setValue('firstName', 'patrick');

        const req = ctx.getRequestObject();

        expect(req.platform).toBe('messenger');
        expect(req.appId).toBe('abc123');
        expect(req.values.firstName).toBe('patrick');
        expect(req.platformId).toBe('abc');
        expect(req.sessionId).toBe('abc123');
      });
    });
  })
});
