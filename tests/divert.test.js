import { divert, isDiverted } from '../src/main';

describe('uTu Client', function() {

  describe('divert true', () => {
    it('should set the user to diverted', function() {
      divert('messenger', 'abc123');
      expect(isDiverted('messenger', 'abc123')).toBe(true);
    });
  });

  describe('divert false', () => {
    it('should set the user to not me diverted', function() {
      divert('messenger', 'abc123', true);
      divert('messenger', 'abc123', false);

      expect(isDiverted('messenger', 'abc123')).toBe(false);
    });
  });
});
