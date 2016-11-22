import nock from 'nock';
import SHARED from '../shared';

const {
  CONFIG: {
    LYFT_API_URI
  },
  CONSTANTS: {
    ACCESS_TOKEN_PATH,
    ETA_PATH,
    TOKEN_RESPONSE_STUB
  },
  lyft,
  expect
} = SHARED;

const etaStub = {
 "eta_estimates": [
   {
     "display_name": "Lyft Line",
     "ride_type": "lyft_line",
     "eta_seconds": 120,
     "is_valid_estimate": true
   },
   {
     "display_name": "Lyft",
     "ride_type": "lyft",
     "eta_seconds": 120,
     "is_valid_estimate": true
   },
   {
     "display_name": "Lyft Plus",
     "ride_type": "lyft_plus",
     "eta_seconds": 660,
     "is_valid_estimate": true
   }
 ]
};

const qs = {
  lat: 34.0881110,
  lng: -118.2738850
};

describe('Ride Types', () => {

  before(() => {
    nock(LYFT_API_URI)
    .post(ACCESS_TOKEN_PATH)
    .reply(200, TOKEN_RESPONSE_STUB)
    .get(ETA_PATH)
    .query(qs)
    .reply(200, etaStub);
  });

  it('adds the proper method to the base class', () => {
    expect(lyft.eta).to.exist;
  });

  describe('#get', () => {

    it('has the method', () => {
      expect(lyft.eta.get).to.exist;
    });

    it('throws an error with no lat or long', () => {
      expect(() => lyft.eta.get()).to.throw(Error, 'must provide a latitude and a longitude');
    });

    // TODO: get promise working with tests
    // it('provides a response', (done) => {
    //   lyft.eta.get(qs.lat, qs.lng).then((resp) => {
    //     expect(resp).to.equal(etaStub);
    //     done();
    //   }).catch((err) => {
    //     console.log('ERROR', err);
    //   });
    // });

  });

  after(() => {
    nock.cleanAll();
  });


});
