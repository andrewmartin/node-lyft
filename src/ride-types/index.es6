'use strict';

import BaseClass from '../base';
import CONSTANTS from '../constants';
import CONFIG from '../config';

const {
  LYFT_API_URI
} = CONFIG;

const {
  RIDE_TYPES_PATH
} = CONSTANTS;

class RideTypes extends BaseClass {

  get(lat, lng, ride_type) {
    if (!lat || !lng) {
      throw new Error('must provide a latitude and a longitude');
    }
    const requestOptions = {
      method: 'GET',
      json: true,
      uri: LYFT_API_URI + RIDE_TYPES_PATH,
      qs: {
        lat,
        lng,
        ride_type
      }
    };
    return this.authenticatedRequest(requestOptions);
  }
}

module.exports = RideTypes;
