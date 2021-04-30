const variables = require('./variables');

module.exports = Object.assign(variables, {
  NODE_ENV: 'staging',
  API_ENDPOINT: 'https://api.bfh.staging.zdbx.net/api/v1/',
});
