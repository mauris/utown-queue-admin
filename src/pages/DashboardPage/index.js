const app = require('../../app');

let $controller = ($scope, $window, $http, $routeParams, api, $interval) => {
  $scope.event = {};
  $scope.loadEvent = () => {
    $http.get(api.rootUrl + '/event')
      .then((res) => {
        $scope.event = res.data.result;
      });
  };
  $scope.loadEvent();
  $interval($scope.loadEvent, 10000)
};

app.config(($routeProvider) => {
  $routeProvider
    .when('/dashboard', {
      templateUrl : '/assets/views/DashboardPage/view.html',
      controller: $controller
    });
});
