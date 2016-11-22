/**
 *  Lyft API: Nearby Drivers
 *  @link https://developer.lyft.com/docs/nearby-drivers
 */

'use strict';

import BaseClass from '../base';
import CONSTANTS from '../constants';
import CONFIG from '../config';

const {
  LYFT_API_URI
} = CONFIG;

const {
  NEARBY_DRIVERS_PATH
} = CONSTANTS;

class NearbyDrivers extends BaseClass {
  get(lat, lng) {
    if (!lat || !lng) {
      throw new Error('must provide a latitude and a longitude');
    }
    const requestOptions = {
      method: 'GET',
      json: true,
      uri: LYFT_API_URI + NEARBY_DRIVERS_PATH,
      qs: {
        lat,
        lng
      }
    };
    return this.authenticatedRequest(requestOptions);
  }
}

module.exports = NearbyDrivers;
