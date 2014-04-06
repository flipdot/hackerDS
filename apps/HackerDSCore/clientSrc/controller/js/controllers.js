var controllerControllers = angular.module('controllerControllers', [])

controllerControllers.controller('AppListController', ['$scope', '$http', '$location',
  function ($scope, $http, $location) {
    $http({
      url: "/apps",
      method: "GET"
    })
    .error(console.log)
    .success(function(res){
      $scope.apps = res;
    });
    
    $scope.switchToApp = function (app) {
      $location.path('/apps/'+app.name);
      hackerDS.display.send('switchApp', app.name);
      return false;
    };
    
    hackerDS.display.send("switchToHome");
  }
]);

controllerControllers.controller('AppControlPanelController',
  ['$scope', '$sce', '$routeParams', '$location',
  function ($scope, $sce, $routeParams, $location) {
    var appname = $routeParams.appname;
    var newUrl = "/apps/"+appname+"/controller";
    $scope.frameUrl = $sce.trustAsResourceUrl(newUrl);
    
    $scope.backToAppList = function () {
      $location.path('/');
      return false;
    };
  }
]);