const app = require('../../app');

let $controller = ($scope, $window, $http, $routeParams) => {
  $scope.eventCode = '';
  $scope.secret = '';
  $scope.authenticate = () => {

  }
};

app.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl : '/assets/views/AuthPage/view.html',
      controller: $controller
    });
});
