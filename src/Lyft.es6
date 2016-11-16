import RideTypes from './ride-types';
import CONFIG from './config';

class Lyft {
  constructor(){
    if (!CONFIG) {
      throw new Error('No config provided.');
    }
    this.config = CONFIG;

    this.addMethods();
  }

  addMethods() {
    this.rideTypes = new RideTypes(this);
  }
}

module.exports = Lyft;
