const variables = require('./variables');

module.exports = Object.assign(variables, {
  NODE_ENV: 'development',
  API_ENDPOINT: 'https://api.bfh.dev.zdbx.net/api/v1/',
});
