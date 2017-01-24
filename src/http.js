import http from 'https';

/**
 * Creates an http endpoint object that we can then call
 * @param  {String} [endpoint='event']        the endpoint we should hit from the base url
 * @param  {String} [method='POST']           the type of request we should make
 * @return {Promise}
 */
export default (endpoint = 'event', method = 'POST') => (apikey, bod) => (
  new Promise((resolve, reject) => {
    const options = {
      host: 'api.utu.ai',
      path: `/api/v1/${endpoint}`,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        apikey,
      },
    };

    const request = http.request(options, (res) => {
      let error = false;
      // handle http errors
      if (res.statusCode < 200 || res.statusCode > 299) {
        error = true;
      }

      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      res.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      res.on('end', () => {
        const b = JSON.parse(body.join(''));
        if (error) {
          reject(b);
        } else {
          resolve(b);
        }
      });
    });

    request.on('socket', (socket) => {
      socket.setTimeout(4500);
      socket.on('timeout', () => {
        request.abort();
      });
    });

    // handle connection errors of the request
    request.on('error', (err) => reject(err));
    request.write(JSON.stringify(bod));
    request.end();
  })
);
