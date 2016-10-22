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

  load();
};

app.component('groupList', {
  templateUrl: '/assets/views/GroupList/view.html',
  controller: $controller
});
