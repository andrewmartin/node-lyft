import SHARED from './shared';

const {
  lyft,
  CONFIG,
  CONSTANTS,
  expect
} = SHARED;

describe('Lyft class substantiation', () => {

  it('loads the proper config from .env', () => {
    expect(CONFIG).to.have.keys(CONSTANTS.REQUIRED_CONFIG_KEYS);
  });

  it('substantiates with proper config', () => {
    expect(lyft.config).to.exist;
    expect(lyft.config.LYFT_API_URI).to.equal(CONFIG.LYFT_API_URI);
  });

});
