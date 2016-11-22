import RideTypes from './ride-types';
import ETA from './eta';
import Cost from './cost';
import NearbyDrivers from './nearby-drivers';
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
    this.eta = new ETA(this);
    this.cost = new Cost(this);
    this.nearbyDrivers = new NearbyDrivers(this);
  }
}

module.exports = Lyft;
