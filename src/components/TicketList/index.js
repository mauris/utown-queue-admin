const app = require('../../app');

let $controller = ($scope, $http, api, $interval) => {
  $scope.isLoading = false;
  $scope.tickets = [];

  var load = () => {
    $scope.isLoading = true;
    $http.get(api.rootUrl+'/tickets/', { headers: { 'Content-Type': 'text/plain' } })
      .then((result) => {
        $scope.tickets = result.data.result;
        $scope.isLoading = false;
      });
  };
  load();
  $interval(load, 15000);
};

app.component('ticketList', {
  templateUrl: '/assets/views/TicketList/view.html',
  controller: $controller
});
