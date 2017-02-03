const app = require('../app');
const API_ROOT = process.env.API_ROOT;

app.constant('api', {
  'rootUrl': API_ROOT
});
