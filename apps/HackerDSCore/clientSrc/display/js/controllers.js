function DisplayCtrl($scope, $http, $sce) {

  hackerDS.on('switchApp', function (appname) {
    var newUrl = "/apps/"+appname+"/display";
    $scope.$apply(function () {
      $scope.frameUrl = $sce.trustAsResourceUrl(newUrl);
    });
  });
  
  function switchToHome(){
    $scope.frameUrl = $sce.trustAsResourceUrl("/apps/HackerDSCore/display/home.html");
  }
  
  hackerDS.on('switchToHome', function () {
    $scope.$apply(function () {
      switchToHome();
    });
  });
  
  switchToHome();
}

DisplayCtrl.$inject = ["$scope", "$http", "$sce"];