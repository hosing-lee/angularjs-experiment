'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.data = [{ title: 'title 1', text: 'text 1'} , { title: 'title 2', text: 'text 2'}];

  $scope.action = function(value) {
    alert(value);
  };

  $scope.someText = 'some text';
}]);
