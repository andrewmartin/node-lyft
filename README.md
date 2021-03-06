Lyft + Node.js
=========

This is a WIP wrapper written in node for the [Lyft](https://www.lyft.com/developers) API. It's meant to be used alongside your existing application to quickly and easily facilitate calls to the API.

For a sample application using this wrapper, check out our [Node Lyft Starter](https://github.com/andrewmartin/node-lyft-starter) project.

Installation
------------

First, you need to register your app in the [Lyft Developer Portal](https://www.lyft.com/developers), and take note of the `CLIENT_ID` and `CLIENT_SECRET` provided.

Next, copy `.env.sample` to `.env` and place in the root of your project, updating it with your information. Alternatively, add environment variables to your startup script. This project uses [.env](https://www.npmjs.com/package/dotenv) to manage these variables.

#### ./.env

```sh
CONFIG_LYFT_API_URI=https://api.lyft.com
CONFIG_LYFT_WWW_URI=https://www.lyft.com
CONFIG_LYFT_CLIENT_ID=YOUR_ID
CONFIG_LYFT_CLIENT_SECRET=YOUR_SECRET
CONFIG_PORT=8080
CONFIG_SESSION_SECRET=secret
CONFIG_USE_SANDBOX=true
```

After registering your application, install this module in your Node.js project:

```sh
$ npm i node-lyft -S
```

### Initialization
-----
In order to use this module, you have to import it in your application first.

```es6
var Lyft = require('node-lyft');
lyft = new Lyft();
```

It's recommended to substantiate without using the `var` keyword to make your instance available within imported files:

#### `./app.js:`

```js
lyft = new Lyft();

var apiLyftController   = require('./controllers/api/lyft');
app.post('/api/lyft/ridetypes', apiLyftController.getRideTypes);
```

#### `./controllers/api/lyft.js:`

```js

const queryObject = (body) => {
  var qs = {};
  Object.keys(body).forEach((key) => {
    qs[key] = body[key]
  });
  return qs;
};

module.exports = {
  getRideTypes(req, res, next) {
    var qs = queryObject(req.body);

    // qs = { lat: 37.774929, lng: -122.419416 };
    lyft.rideTypes.get(qs).then((data) => {
      res.json(data);
      next();
    }).catch((err) => {
      res.json(err);
      next();
    });
  },
};

```

### Usage

This project uses [rsvp.js](https://github.com/tildeio/rsvp.js/) promises to facilitate calls; all calls are `Promises`. In your controllers, chain onto these promises like so:

#### ./controllers/api/lyft/index.js

```js
module.exports = {
  getRideTypes: function(req, res, next) {
    lyft.rideTypes.get(req.body.lat, req.body.lng)
    .then(function(data) {
      res.json(data);
      next();
    })
    .catch(function(err) {
      res.json(err);
      next();
    });
  }
}
```

#### Building

```sh
$ gulp build
```

#### Tests

```sh
$ gulp test
```

#### Build, Test, and Watch for changes:

```sh
$ gulp
```
