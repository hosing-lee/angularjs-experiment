'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['stateStorage', '$scope', function(stateStorage, $scope) {
    $scope.value = "hoi";

    $scope.setValue = function() {
      stateStorage.randomVariable = $scope.value;
    };
}]);