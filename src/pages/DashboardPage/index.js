const app = require('../../app');
const moment = require('moment');

let $controller = ($scope, $window, $http, $routeParams, api, $timeout) => {
  $scope.groupCount = 0;
  $scope.onGroupListUpdated = (groups) => {
    $scope.groupCount = groups.length;
  }
  $scope.event = {};
  $scope.loadEvent = () => {
    $http.get(api.rootUrl + '/event')
      .then((res) => {
        $scope.event = res.data.result;
        $timeout($scope.loadEvent, 61000 + moment($scope.event.datetimeCodeLastUpdated).diff(moment()));
      });
  };
  $scope.loadEvent();
  $scope.Math = window.Math;
};

app.config(($routeProvider) => {
  $routeProvider
    .when('/dashboard', {
      templateUrl : '/assets/views/DashboardPage/view.html',
      controller: $controller
    });
});
