const app = require('../../app');

let $controller = ($scope, $interval) => {
  var messages = [
    'Hello!',
    'Ol\u00E1!',
    '\u4F60\u597D!',
    'Salut!',
    '\uC548\uB155!',
    'Ciao!',
    'Aloha!',
    'Hallo!',
    'Haai!',
    '\u05E9\u05DC\u05D5\u05DD',
    '\u3053\u3093\u306B\u3061\u306F!',
    '48454C4C4F21'
  ];
  var i = Math.floor(Math.random() * messages.length);
  $scope.message = messages[i];
  $interval(() => {
    i = (i + 1) % messages.length;
    $scope.message = messages[i];
  }, 3000);
};

app.component('welcomeBox', {
  templateUrl: '/assets/views/WelcomeBox/view.html',
  controller: $controller
});
