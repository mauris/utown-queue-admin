const app = require('../../app');

let $controller = ($scope, $http, api, $interval, toastr) => {
  $scope.isLoading = false;
  $scope.tickets = [];
  $scope.isRevokeTicketLoading = false;

  var load = () => {
    $scope.isLoading = true;
    $http.get(api.rootUrl+'/tickets/', { headers: { 'Content-Type': 'text/plain' } })
      .then((result) => {
        $scope.tickets = result.data.result;
        $scope.isLoading = false;
      });
  };

  $scope.revokeTicket = (ticket) => {
    $scope.isRevokeTicketLoading = true;
    $http.delete(api.rootUrl + '/tickets/' + ticket.ticketId)
      .then((res) => {
        $scope.tickets.splice($scope.tickets.indexOf(ticket), 1);
        toastr.success('Ticket #' + ticket.ticketId + ' has been cancelled. ');
        $scope.isRevokeTicketLoading = false;
      });
  };

  load();
  $interval(load, 15000);
};

app.component('ticketList', {
  templateUrl: '/assets/views/TicketList/view.html',
  controller: $controller
});
