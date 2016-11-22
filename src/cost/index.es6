/**
 *  Lyft API: Cost
 *  @link https://developer.lyft.com/docs/availability-cost
 */

'use strict';

import BaseClass from '../base';
import CONSTANTS from '../constants';
import CONFIG from '../config';

const {
  LYFT_API_URI
} = CONFIG;

const {
  COST_PATH
} = CONSTANTS;

class COST extends BaseClass {
  get(start_lat, start_lng, end_lat = null, end_lng = null, ride_type) {
    if (!start_lat || !start_lng) {
      throw new Error('must provide a start latitude and a start longitude');
    }
    const requestOptions = {
      method: 'GET',
      json: true,
      uri: LYFT_API_URI + COST_PATH,
      qs: {
        start_lat,
        start_lng,
        end_lat,
        end_lng,
        ride_type
      }
    };
    console.log('requestOptions', requestOptions);
    return this.authenticatedRequest(requestOptions);
  }
}

module.exports = COST;
