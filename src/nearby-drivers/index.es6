/**
 *  Lyft API: Nearby Drivers
 *  @link https://developer.lyft.com/docs/nearby-drivers
 *  @keys lat, lng
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
  get(qs) {
    if (!qs || !qs.lat || !qs.lng) {
      throw new Error('must provide a latitude and a longitude');
    }
    const requestOptions = {
      method: 'GET',
      json: true,
      uri: LYFT_API_URI + NEARBY_DRIVERS_PATH,
      qs
    };
    return this.authenticatedRequest(requestOptions);
  }
}

module.exports = NearbyDrivers;
