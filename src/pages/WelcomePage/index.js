const app = require('../../app');

let $controller = ($scope, $window, $http, $routeParams) => {

};

app.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl : '/assets/views/WelcomePage/view.html',
      controller: $controller
    });
});
