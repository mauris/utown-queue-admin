const app = require('../../app');

let $controller = function ($scope, $http, api, $interval, toastr) {
  let $ctrl = this;
  $scope.isLoading = false;
  $scope.groups = [];
  $scope.isRevokeTicketLoading = false;
  $scope.isStartGroupLoading = false;
  $scope.isCallGroupLoading = false;
  $scope.isMarkPresentLoading = false;

  var load = () => {
    $scope.isLoading = true;
    $http.get(api.rootUrl+'/groups/', { headers: { 'Content-Type': 'text/plain' } })
      .then((result) => {
        $scope.groups = result.data.result;
        !$ctrl.onUpdate || $ctrl.onUpdate({ groups: $scope.groups });
        $scope.isLoading = false;
      });
  };

  let removeGroupFromList = (group) => {
    $scope.groups.splice($scope.groups.indexOf(group), 1);
    !$ctrl.onUpdate || $ctrl.onUpdate({ groups: $scope.groups });
  };

  $scope.callGroup = (group) => {
    $scope.isCallGroupLoading = true;
    $http.post(api.rootUrl + '/groups/' + group.groupId + '/call', '', { headers: { 'Content-Type': 'text/plain' } })
      .then((result) => {
        ++group.callCount;
        group.datetimeLastCalled = new Date();
        $scope.isCallGroupLoading = false;
        toastr.success('A message calling for group ' + group.groupId + ' was sent.');
      });
  };

  $scope.markGroupPresent = (group) => {
    $scope.isMarkPresentLoading = true;
    $http.post(api.rootUrl + '/groups/' + group.groupId + '/markpresent', '', { headers: { 'Content-Type': 'text/plain' } })
      .then((result) => {
        group.isPresent = true;
        toastr.success('Group ' + group.groupId + ' was marked present. At your discretion you may let the group in.');
        $scope.isMarkPresentLoading = false;
      });
  };

  $scope.startGroup = (group) => {
    $scope.isStartGroupLoading = true;
    $http.post(api.rootUrl + '/groups/' + group.groupId + '/start', '', { headers: { 'Content-Type': 'text/plain' } })
      .then((result) => {
        removeGroupFromList(group);
        toastr.success('Group ' + group.groupId + ' has started. You may send more groups to the entrance using the Call function.');
        $scope.isStartGroupLoading = false;
      });
  };

  $scope.revokeTicket = (group, ticket) => {
    $scope.isRevokeTicketLoading = true;
    $http.delete(api.rootUrl + '/tickets/' + ticket.ticketId)
      .then((res) => {
        group.totalNoOfPeople -= ticket.noOfPeople;
        group.tickets.splice(group.tickets.indexOf(ticket), 1);
        if (group.tickets.length === 0) {
          // no more tickets left in group. so we assume
          // server has deleted the group as well.
          removeGroupFromList(group);
        }
        toastr.success('Ticket #' + ticket.ticketId + " from Group" + group.groupId + ' has been cancelled. ');
        $scope.isRevokeTicketLoading = false;
      });
  };

  load();
  $interval(load, 20000);
};

app.component('groupList', {
  bindings: {
    'onUpdate': '&'
  },
  templateUrl: '/assets/views/GroupList/view.html',
  controller: $controller
});
