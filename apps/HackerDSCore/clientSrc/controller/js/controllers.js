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
  }
]);

controllerControllers.controller('AppControlPanelController', ['$scope', '$sce', '$routeParams',
  function ($scope, $sce, $routeParams) {
    var appname = $routeParams.appname;
    var newUrl = "/apps/"+appname+"/controller";
    $scope.frameUrl = $sce.trustAsResourceUrl(newUrl);
  }
]);