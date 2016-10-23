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

  $scope.revokeTicket = (ticket) => {
    $http.delete(api.rootUrl + '/tickets/' + ticket.ticketId)
      .then((res) => {
        $scope.tickets.splice($scope.tickets.indexOf(ticket), 1);
      });
  };

  load();
  $interval(load, 15000);
};

app.component('ticketList', {
  templateUrl: '/assets/views/TicketList/view.html',
  controller: $controller
});