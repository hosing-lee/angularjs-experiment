'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['stateStorage', '$scope', function(stateStorage, $scope) {
  $scope.someValueFromState = 'nothing';

  $scope.getValue = function() {
    $scope.someValueFromState = stateStorage.randomVariable;
  };
}]);