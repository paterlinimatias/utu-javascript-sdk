import { user, message, event } from './methods';

export default class Client {
  constructor(apikey) {
    this.apikey = apikey;
  }

  /**
   * Creates or updates a new user in the system
   * @param  {Object} data the data that should be sent with the request
   * @return {Promise}
   */
  user(data) {
    return user(this.apikey, data);
  }

  /**
   * Logs a message into the system
   * @param  {Object} data the data that should be sent with the request
   * @return {Promise}
   */
  message(data) {
    return message(this.apikey, data);
  }

  /**
   * Logs a custom event
   * @param  {String} e    the name of the custom event
   * @param  {Object} data the data that should be sent with the request
   * @return {Promise}
   */
  event(e, data) {
    return event(e, this.apikey, data);
  }
}
