var controllerControllers = angular.module('controllerControllers', [])

var colorThief = new ColorThief();
function updateAppsBackground(){
  $('.appContainer').each(function(i, appContainer){
    var img = $(appContainer).find('a > div > img');
    img.on('load', function(){
      var color = colorThief.getColor(img[0]);
      var fontColor = color.map(function(c){return c - 40});

      color = color.map(function(c){return c + 70});

      $(appContainer).css('background', 'rgb('+color[0]+','+color[1]+','+color[2]+')');
      $(appContainer)
        .find('a > div > span')
        .css('color', 'rgb('+fontColor[0]+','+fontColor[1]+','+fontColor[2]+')');
    })
  })
}

controllerControllers.controller('AppListController', ['$scope', '$http', '$location', '$route',
  function ($scope, $http, $location, $route) {
    $http({
      url: "/apps",
      method: "GET"
    })
    .error(function(){
      $scope.apps = [];
    })
    .success(function(res){
      $scope.apps = res;
      setTimeout(updateAppsBackground, 0);
    });

    $scope.switchToApp = function (app) {
      $location.path('/apps/'+app.name);
      return false;
    };

    $scope.reload = function(){
      $route.reload()
    }

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

    hackerDS.display.send('switchApp', appname);
  }
]);
