const app = require('../app');

app.factory('api', () => {
  return {
    'rootUrl': 'http://localhost:3000/v1'
  };
});
