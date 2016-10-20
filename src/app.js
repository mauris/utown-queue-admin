const APP_NAME = process.env.APP_NAME || 'app';
let app = angular.module(APP_NAME, [
  'ngRoute',
  'ui.bootstrap'
]);

app.config(['$locationProvider', ($locationProvider) => {
  $locationProvider.html5Mode(true);
}]);

app.filter('encodeUri', () => {
  return window.encodeURIComponent;
});

module.exports = app;
