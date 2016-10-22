const app = require('../app');

app.factory('authInterceptor', ($rootScope, $q, $window, $location) => {
  return {
    request: (config) => {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['x-access-token'] = $window.sessionStorage.token;
      }
      return config;
    },
    response: (response) => {
      return response || $q.when(response);
    },
    responseError: (response) => {
      if (response.status === 401 || response.status === 403) {
        delete $window.sessionStorage.token;
        $location.url('/');
      }
      return $q.reject(response);
    }
  };
});

app.config(($httpProvider) => {
  $httpProvider.interceptors.push('authInterceptor');
});
