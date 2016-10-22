const app = require('../../app');

let $controller = ($scope, $window, $http, $routeParams, $location, api) => {
  $scope.eventCode = '';
  $scope.secret = '';
  $scope.isLoading = false;

  $scope.authenticate = () => {
    $scope.isLoading = true;
    $http
      .post(
        api.rootUrl + '/auth/request',
        { code: $scope.eventCode, secret: $scope.secret }
      )
      .then((result) => {
        var token = result.data.token;
        $window.sessionStorage.token = token;
        $location.url('/dashboard');
      });
  }
};

app.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl : '/assets/views/AuthPage/view.html',
      controller: $controller
    });
});
