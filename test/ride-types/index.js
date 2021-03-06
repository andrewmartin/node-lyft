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

const rideTypesStub = {
  ride_types: [
    { ride_type: 'lyft_line',
    display_name: 'Lyft Line',
    image_url: 'https://s3.amazonaws.com/api.lyft.com/assets/car_standard.png',
    pricing_details: {},
    seats: 2 }
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
    .get(RIDE_TYPES_PATH)
    .times(2)
    .query(qs)
    .reply(200, rideTypesStub);
  });

  it('adds the proper method to the base class', () => {
    expect(lyft.rideTypes).to.exist;
  });

  describe('#get', () => {

    it('has the method', () => {
      expect(lyft.rideTypes.get).to.exist;
    });

    it('throws an error with no lat or long', () => {
      expect(() => lyft.rideTypes.get()).to.throw(Error, 'must provide a latitude and a longitude');
    });

    // TODO: Add working tests
    // it('provides a response', (done) => {
    //   lyft.rideTypes.get(qs.lat, qs.lng).then((resp) => {
    //     expect(resp).to.equal(rideTypesStub);
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
