import nock from 'nock';
import SHARED from '../shared';

const {
  CONFIG: {
    LYFT_API_URI
  },
  CONSTANTS: {
    ACCESS_TOKEN_PATH,
    RIDE_TYPES_PATH,
    TOKEN_RESPONSE_STUB
  },
  lyft,
  expect
} = SHARED;

const STUB = {
  requestOptions: {
    method: 'GET',
    uri: LYFT_API_URI + RIDE_TYPES_PATH,
    json: true,
    qs: {
      lat: 34.0881110,
      lng: -118.2738850
    }
  }
};

const requestOptionsStub = STUB.requestOptions;

const rideTypesResponseStub = {
  statusCode: 200,
  body: {
    ride_types: [{
      ride_type: 'lyft_line',
      display_name: 'Lyft Line',
      image_url: 'https://s3.amazonaws.com/api.lyft.com/assets/car_standard.png',
      pricing_details: {},
      seats: 2
    }]
  }
};

import BaseClass from '../../lib/base';
describe('Base Class', () => {

  before(() => {
    lyft.baseClass = new BaseClass(lyft);
  });

  it('properly passes down the context', () => {
    expect(lyft.baseClass._lyft).to.exist;
  });

  describe('#getBearerToken', () => {

    before(() => {
      nock(LYFT_API_URI)
      .post(ACCESS_TOKEN_PATH)
      .reply(200, TOKEN_RESPONSE_STUB)
      .get(RIDE_TYPES_PATH)
      .query(requestOptionsStub.qs)
      .reply(200, rideTypesResponseStub);
    });

    it('returns a token', (done) => {
      lyft.baseClass.getBearerToken().then((body) => {
        expect(body.token_type).to.equal(TOKEN_RESPONSE_STUB.token_type);
        expect(body.access_token).to.equal(TOKEN_RESPONSE_STUB.access_token);
        done();
      });
    });

    it('sucessfully submits a request with the token', (done) => {
      lyft.baseClass.makeAuthRequest(TOKEN_RESPONSE_STUB.body, requestOptionsStub).then((resp) => {
        expect(resp.body).to.deep.equal(rideTypesResponseStub.body);
        done();
      });
    });

  });

  after(() => {
    delete lyft.baseClass;
    nock.cleanAll();
  });

});
