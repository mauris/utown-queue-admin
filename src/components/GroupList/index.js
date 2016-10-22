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
  load();
};

app.component('groupList', {
  templateUrl: '/assets/views/GroupList/view.html',
  controller: $controller
});
