const variables = require('./variables');

module.exports = Object.assign(variables, {
  NODE_ENV: 'production',
  API_ENDPOINT: 'http://10.193.4.53:8283/api/v1/',
});
