import http from 'http';

const apiBaseURL = 'https://api.utu.ai/api/v1';

/**
 * Creates an http endpoint object that we can then call
 * @param  {String} [endpoint='event']        the endpoint we should hit from the base url
 * @param  {String} [method='POST']           the type of request we should make
 * @return {Promise}
 */
export default (endpoint = 'event', method = 'POST') => (apikey, body) => {
  const request = new Request(`${apiBaseURL}/${endpoint}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      apikey,
    }),
    method,
    body: JSON.stringify(body),
  });

  return fetch(request).then(r => r.json());
};
