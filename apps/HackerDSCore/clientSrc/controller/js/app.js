var controllerApp = angular.module('controllerApp', [
  'ngRoute',
  
  'controllerControllers'
]);


controllerApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'appList.html',
        controller: 'AppListController'
      }).
      when('/apps/:appname',{
        templateUrl: 'appControlPanel.html',
        controller: 'AppControlPanelController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);