import { user, message, event } from './methods';

export default class uTu {
  constructor(apikey, config = {}, hasContext = false) {
    this.apikey = apikey;
    this.config = config;
    this.values = {};
    this.hasContext = hasContext;
  }

  /**
   * Returns the request object that will be sent
   * @param  {Object} obj an optional object you'd like to merge into the final request object
   * @return {Object}
   */
  getRequestObject(obj = {}) {
    return Object.assign({}, this.config, {
      values: this.values,
    }, obj);
  }

  /**
   * Sets the global config so you can short hand some of your requests
   * @param {Object} config the config that will be globally set
   */
  setConfig(config = {}) {
    this.config = config;
  }

  /**
   * Returns a new instance of the class so that we can contain context
   * think of context such as platformId. We may want to send multiple requests
   * be we don't want to put the users platformId in each request
   *
   * @param {Object} ctx the context you would like to pass with each request
   * @return {uTu} a new instance of uTu
   */
  withContext(ctx = {}) {
    return new uTu(this.apikey, this.getRequestObject(ctx), true);
  }

  /**
   * Sets the values that should be sent with the request
   * @params {Object} values sets the values object within the context
   * @return {uTu}
   */
  setValues(values = {}) {
    if (!this.hasContext) {
      throw new Error('You can only set values when using context, please see withContext()');
    }

    this.values = values;
    return this;
  }

  /**
   * Sets a single value
   * @param {Object} key the key to set
   * @param {Object} value this can be any value type
   * @return {uTu}
   */
  setValue(key, value) {
    if (!this.hasContext) {
      throw new Error('You can only add values when using context, please see withContext()');
    }

    Object.assign(this.values, { [key]: value });
    return this;
  }

  /**
   * Queues a message to be sent with an intent
   * @param  {Object} data the data that should be sent with the request
   */
  queueMessageForIntent(data = {}) {
    if (!this.hasContext) {
      throw new Error('You can only add que when using context, please see withContext()');
    }

    this.queuedMessage = data;
  }

  /**
   * Sends a queued message
   * @param {String} intent the intent to send with the message
   */
  sendMessageWithIntent(intent) {
    if (!this.hasContext) {
      throw new Error('You can only send the que when using context, please see withContext()');
    }

    if (!this.queuedMessage) {
      throw new Error('There isn\'t a queued message');
    }
    // copy the message
    const msg = this.queuedMessage;

    // remove the queued message
    delete this.queuedMessage;

    return this.message(Object.assign({ intent }, msg));
  }

  /**
   * Creates or updates a new user in the system
   * @param  {Object} data the data that should be sent with the request
   * @return {Promise}
   */
  user(data = {}) {
    return user(this.apikey, this.getRequestObject(data));
  }

  /**
   * Logs a message into the system
   * @param  {Object} data the data that should be sent with the request
   * @return {Promise}
   */
  message(data = {}) {
    return message(this.apikey, this.getRequestObject(data));
  }

  /**
   * Logs a custom event
   * @param  {String} e    the name of the custom event
   * @param  {Object} data the data that should be sent with the request
   * @return {Promise}
   */
  event(e, data = {}) {
    return event(e, this.apikey, this.getRequestObject(data));
  }

}
