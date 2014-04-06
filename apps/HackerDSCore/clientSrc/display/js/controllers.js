function DisplayCtrl($scope, $http, $sce) {

  hackerDS.on('switchApp', function (appname) {
    var newUrl = "/apps/"+appname+"/display";
    $scope.$apply(function () {
      $scope.frameUrl = $sce.trustAsResourceUrl(newUrl);
    });
  });
}

DisplayCtrl.$inject = ["$scope", "$http", "$sce"];