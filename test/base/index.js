import nock from 'nock';

import SHARED from '../shared';
import BASE_REQUEST_SETTINGS from '../../src/base';

const {
  CONFIG,
  CONSTANTS,
  lyft,
  expect
} = SHARED;

const {
  LYFT_API_URI
} = CONFIG;

const {
  ACCESS_TOKEN_PATH,
  RIDE_TYPES_PATH
} = CONSTANTS;

const tokenResponseStub = {
  token_type: 'Bearer',
  access_token: 'SANDBOX-gAAAAABYKse3wWeUNs8u5pEaXQ5P6oinw92ndfVVezd1hduMWj_agwsclqcB43RmcG_XswQBLgPGtGT84oQ66jHqCL1TC7r23py4jpK-k5Lor-wUuuwe1h3t15RGL3Wpu_RDiKuwpFygkE3mxcl1UTQ93Nk0vC-w2S1VmfU3dsKv98DM0IilT5L6EzzSc6IH6PJb9Y0GOjkOwg59lZsDzkskvLcFRl_o_tUVwlL1T-kWFbJckIWy87l3ZIx_raNAJXVPyRCa7d8__vAndX6bOKPZX544qMjgAl0rJrdUZ3tbB46NxfwxlCsDhTThIhD4iqmW0CQSw8_E',
  expires_in: 3600,
  scope: 'profile offline rides.read public rides.request'
};

const requestOptionsStub = {
  method: 'GET',
  uri: LYFT_API_URI + RIDE_TYPES_PATH,
  json: true,
  qs: {
    lat: 34.0881110,
    lng: -118.2738850
  }
};

const rideTypesResponseStub = {
  ride_types: [
    { ride_type: 'lyft_line',
    display_name: 'Lyft Line',
    image_url: 'https://s3.amazonaws.com/api.lyft.com/assets/car_standard.png',
    pricing_details: {},
    seats: 2 }
  ]
};

import BaseClass from '../../lib/base';
describe('Base Class', () => {

  before(() => {
    lyft.baseClass = new BaseClass(lyft);
  });

  it('properly passes down the context', () => {
    expect(lyft.baseClass._lyft).to.exist;
  });

  // describe('#getBearerToken', () => {
  //
  //   before(() => {
  //     nock(LYFT_API_URI)
  //     .post(ACCESS_TOKEN_PATH)
  //     .reply(200, tokenResponseStub);
  //   });
  //
  //   it('returns a token', (done) => {
  //     lyft.baseClass.getBearerToken().then((body) => {
  //       console.log('body', body);
  //       expect(body.token_type).to.equal(tokenResponseStub.token_type);
  //       expect(body.access_token).to.equal(tokenResponseStub.access_token);
  //       done();
  //     });
  //   });
  //
  //   it('submits a request with the token', (done) => {
  //     lyft.baseClass.makeAuthRequest(tokenResponseStub, requestOptionsStub).then((body) => {
  //       console.log('body', body);
  //       done();
  //     });
  //   });
  //
  //
  // });

  after(() => {
    delete lyft.baseClass;
  });

});
