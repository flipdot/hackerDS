function ControllerCtrl($scope, $http) {
  $http({
    url: "/core/apps",
    method: "GET"
  })
  .error(console.log)
  .success(function(res){
    $scope.apps = res;
  });
}

ControllerCtrl.$inject = ["$scope", "$http"];