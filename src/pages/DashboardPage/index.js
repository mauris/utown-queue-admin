const app = require('../../app');

let $controller = ($scope, $window, $http, $routeParams) => {

};

app.config(($routeProvider) => {
  $routeProvider
    .when('/dashboard', {
      templateUrl : '/assets/views/DashboardPage/view.html',
      controller: $controller
    });
});
