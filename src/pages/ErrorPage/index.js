const app = require('../../app');

let $controller = ($scope) => {
  $scope.errorMessage = 'The page you requested was not found.';
};

app.config(($routeProvider) => {
  $routeProvider.otherwise({
    templateUrl : '/assets/views/ErrorPage/view.html',
    controller: $controller
  });
});
