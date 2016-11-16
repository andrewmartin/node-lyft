import request from 'request';
import RSVP from 'rsvp';

import CONSTANTS from '../constants';
import CONFIG from '../config';

const {
  ACCESS_TOKEN_PATH
} = CONSTANTS;

const {
  LYFT_API_URI,
  LYFT_CLIENT_ID,
  LYFT_CLIENT_SECRET,
  USE_SANDBOX
} = CONFIG;

export const BASE_REQUEST_SETTINGS = {
  method: 'POST',
  uri: `${LYFT_API_URI}${ACCESS_TOKEN_PATH}`,
  auth: {
    username: LYFT_CLIENT_ID,
    password: (USE_SANDBOX ? 'SANDBOX-' : '') + LYFT_CLIENT_SECRET
  },
  json: {
    grant_type: 'client_credentials',
    scope: 'offline public profile rides.read rides.request'
  }
};

export default class BaseClass {
  constructor(instance) {
    this._lyft = instance;
  }

  authenticatedRequest(requestOptions) {
    return new RSVP.Promise((resolve, reject) => {
      this.getBearerToken().then((tokenBody) => this.makeAuthRequest(tokenBody, requestOptions)).then((resp) => resolve(resp)).catch((err) => reject(err));
    });
  }

  getBearerToken() {
    return new RSVP.Promise((resolve, reject) =>
      request(BASE_REQUEST_SETTINGS, (err, resp, body) => {
        resp.statusCode === 200 ? resolve(body) : reject(body);
      })
    );
  }

  makeAuthRequest(tokenBody, requestOptions) {
    let req = Object.assign(requestOptions, {
      auth: {
        bearer: tokenBody.access_token
      }
    });
    return new RSVP.Promise((resolve, reject) =>
      request(req, (err, resp, body) => {
        resp.statusCode === 200 ? resolve(body) : reject(body);
      })
    );
  }
}
