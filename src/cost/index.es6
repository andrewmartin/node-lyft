/**
 *  Lyft API: Cost
 *  @link https://developer.lyft.com/docs/availability-cost
 *  @keys start_lat, start_lng, end_lat (opt), end_lng (opt), ride_type (opt)
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
  get(qs) {
  if (!qs.start_lat || !qs.start_lng) {
      throw new Error('must provide a start latitude and a start longitude');
    }
    const requestOptions = {
      method: 'GET',
      json: true,
      uri: LYFT_API_URI + COST_PATH,
      qs
    };
    return this.authenticatedRequest(requestOptions);
  }
}

module.exports = COST;
