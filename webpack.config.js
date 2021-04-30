/* eslint-disable */
'use strict'

const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
  /* eslint-disable global-require */
  module.exports = require('./config/webpack.config.dev');
} else {
  /* eslint-disable global-require */
  module.exports = require('./config/webpack.config.prod');
}
