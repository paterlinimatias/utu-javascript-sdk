import { uTu } from '../src/main';

const key = 'd76921203ffe4b9d8b961ecc35e27f0b';

describe('Request Calls', () => {

  beforeEach(function () {
    this.client = new uTu(key, {
      platform: "messenger",
      platformId: "abc123",
      sessionId: 'testing',
    });
  });

  describe('user', function() {
    it('should return success', async function() {
      const result = await this.client.user({
        values: {
          firstName: "patrick",
        },
      });
      expect(result.success).toBe(true)
    });
  });

  describe('message', function() {
    it('should return success', async function() {
      const result = await this.client.message({
        values: {
          botMessage: false,
          message: "abc123",
          rawMessage: {},
        },
      });

      expect(result.success).toBe(true)
    });

    it('should return 422 and errors', async function() {
      await this.client.message({
        values: {},
      }).catch((res) => (
        expect(res.status).toBe(422)
      ));
    });
  });

  describe('event', function() {
    it('should return success', async function() {
      const result = await this.client.event("Custom Event", {
        values: {
          foo: "bar",
        },
      });
      expect(result.success).toBe(true)
    });
  });

  describe('intent', function() {
    it('should return success', async function() {
      const result = await this.client.intent("GetHoroscope");
      expect(result.platform).toBe("messenger");
      expect(result.content).not.toBe(undefined);
    });
  });

})
