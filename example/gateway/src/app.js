const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const socketio = require('@feathersjs/socketio');
const distribution = require('../lib');
const serviceInfo       = require('./docs-info')

const handler = require('@feathersjs/express/errors');
// const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const { authenticate } = require('@feathersjs/authentication').hooks;
const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

app.configure(express.rest());
app.configure(socketio());
app.configure(
  distribution({
    hooks: {
      before: {
        all: [authenticate('jwt')],
      },
    },
  })
);

app.configure(serviceInfo)
// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up channels
app.configure(channels);
// Configure a middleware for 404s and the error handler
// FIXME: this does not allow to declare remote services after the app has been launched
// Indeed this middleware is hit first...
//app.use(notFound());
app.use(handler());

app.hooks(appHooks);

setInterval(getMessages, 2500);
function getMessages() { console.log(Object.keys(app.services)) }



module.exports = app;
