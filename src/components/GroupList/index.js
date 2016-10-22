const app = require('../../app');

let $controller = ($scope, $http, api) => {
  $scope.isLoading = false;
  $scope.groups = [];

  var load = () => {
    $scope.isLoading = true;
    $http.get(api.rootUrl+'/groups/')
      .then((result) => {
        $scope.groups = result.data.result;
        $scope.isLoading = false;
      });
  };

  $scope.callGroup = (group) => {
    $http.post(api.rootUrl + '/groups/' + group.groupId + '/request')
      .then((result) => {
        console.log('requested');
      });
  };

  $scope.markGroupPresent = (group) => {
    $http.post(api.rootUrl + '/groups/' + group.groupId + '/markpresent')
      .then((result) => {
        console.log('marked present');
        group.isPresent = true;
      });
  };

  $scope.startGroup = (group) => {
    $http.post(api.rootUrl + '/groups/' + group.groupId + '/start')
      .then((result) => {
        console.log('group started');
        $scope.groups.splice($scope.groups.indexOf(group), 1);
      });
  };

  load();
};

app.component('groupList', {
  templateUrl: '/assets/views/GroupList/view.html',
  controller: $controller
});
