import createEndpoint from './http';

/**
 * Creates or updates a new user in the system
 * @param  {String} key  the agents api key
 * @param  {Object} data the data that should be sent with the request
 * @return {Promise}
 */
export const user = (key, data) => (
  createEndpoint()(key, Object.assign({ event: 'user' }, data))
);

/**
 * Logs a message into the system
 * @param  {String} key  the agents api key
 * @param  {Object} data the data that should be sent with the request
 * @return {Promise}
 */
export const message = (key, data) => (
  createEndpoint()(key, Object.assign({ event: 'message' }, data))
);

/**
 * Logs a custom event
 * @param  {String} e    the name of the custom event
 * @param  {String} key  the agents api key
 * @param  {Object} data the data that should be sent with the request
 * @return {Promise}
 */
export const event = (e, key, data) => (
  createEndpoint()(key, Object.assign({ event: e }, data))
);
