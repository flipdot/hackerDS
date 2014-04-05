function ControllerCtrl($scope, $http) {
  $http({
    url: "/apps",
    method: "GET"
  })
  .error(console.log)
  .success(function(res){
    $scope.apps = res;
  });
  
  
}

ControllerCtrl.$inject = ["$scope", "$http"];