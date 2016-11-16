import nock from 'nock';

import SHARED from '../shared';

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
  RIDE_TYPES_PATH
} = CONSTANTS;

const rideTypesStub = {
  ride_types: [
    { ride_type: 'lyft_line',
    display_name: 'Lyft Line',
    image_url: 'https://s3.amazonaws.com/api.lyft.com/assets/car_standard.png',
    pricing_details: {},
    seats: 2 }
  ]
};

describe('Ride Types', () => {

  before(() => {
    nock(LYFT_API_URI)
    .get(RIDE_TYPES_PATH)
    .times(1)
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

    // it('provides a response', () => {
    //   expect(lyft.rideTypes.get(34.0881110,-118.2738850)).to.equal(rideTypesStub);
    // });

  });

  after(() => {
    nock.cleanAll();
  });


});
