'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intent = exports.event = exports.message = exports.user = undefined;

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = exports.user = function user(key, data) {
  return (0, _http2.default)()(key, Object.assign({ event: 'user' }, data));
};

var message = exports.message = function message(key, data) {
  return (0, _http2.default)()(key, Object.assign({ event: 'message' }, data));
};

var event = exports.event = function event(e, key, data) {
  return (0, _http2.default)()(key, Object.assign({ event: e }, data));
};

var intent = exports.intent = function intent(i, key, data) {
  var values = data.values || {};

  Object.assign(values, { intent: i });
  return (0, _http2.default)('/intent/v1')(key, Object.assign({}, data, { values: values }));
};