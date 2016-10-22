const app = require('../../app');

let $controller = ($scope, $window, $http, $routeParams, api) => {
  $scope.event = {};
  let loadEvent = () => {
    $http.get(api.rootUrl + '/event')
      .then((res) => {
        $scope.event = res.data.result;
      });
  };
  loadEvent();
};

app.config(($routeProvider) => {
  $routeProvider
    .when('/dashboard', {
      templateUrl : '/assets/views/DashboardPage/view.html',
      controller: $controller
    });
});
