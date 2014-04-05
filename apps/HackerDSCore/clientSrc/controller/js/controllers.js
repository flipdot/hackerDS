function ControllerCtrl($scope, $http) {
  $http({
    url: "/apps",
    method: "GET"
  })
  .error(console.log)
  .success(function(res){
    $scope.apps = res;
  });
  
  hackerDS.register(function () {
  });
}

ControllerCtrl.$inject = ["$scope", "$http"];