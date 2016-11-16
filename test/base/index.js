import nock from 'nock';

import SHARED from '../shared';
import BASE_REQUEST_SETTINGS from '../../src/base';

const {
  CONFIG: {
    LYFT_API_URI
  },
  CONSTANTS: {
    ACCESS_TOKEN_PATH,
    RIDE_TYPES_PATH
  },
  lyft,
  expect
} = SHARED;

const STUB = {
  tokenResponse: {
    statusCode: 200,
    body: {
      token_type: 'Bearer',
      access_token: 'SANDBOX-gAAAAABYKse3wWeUNs8u5pEaXQ5P6oinw92ndfVVezd1hduMWj_agwsclqcB43RmcG_XswQBLgPGtGT84oQ66jHqCL1TC7r23py4jpK-k5Lor-wUuuwe1h3t15RGL3Wpu_RDiKuwpFygkE3mxcl1UTQ93Nk0vC-w2S1VmfU3dsKv98DM0IilT5L6EzzSc6IH6PJb9Y0GOjkOwg59lZsDzkskvLcFRl_o_tUVwlL1T-kWFbJckIWy87l3ZIx_raNAJXVPyRCa7d8__vAndX6bOKPZX544qMjgAl0rJrdUZ3tbB46NxfwxlCsDhTThIhD4iqmW0CQSw8_E',
      expires_in: 3600,
      scope: 'profile offline rides.read public rides.request'
    }
  },
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

const tokenResponseStub = STUB.tokenResponse;
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
      .reply(200, tokenResponseStub)
      .get(RIDE_TYPES_PATH)
      .query(requestOptionsStub.qs)
      .reply(200, rideTypesResponseStub);
    });

    it('returns a token', (done) => {
      lyft.baseClass.getBearerToken().then((body) => {
        expect(body.token_type).to.equal(tokenResponseStub.token_type);
        expect(body.access_token).to.equal(tokenResponseStub.access_token);
        done();
      });
    });

    it('sucessfully submits a request with the token', (done) => {
      lyft.baseClass.makeAuthRequest(tokenResponseStub.body, requestOptionsStub).then((resp) => {
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
