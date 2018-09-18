'use strict';

angular.module('directives', [])
.directive('tableDirective', function() {
  return {
    scope: {
      data: '=data'
    },
    transclude: true,
    templateUrl: 'directive/table-directive.html'
  };
})
.directive('scopeTransclude', function() {
  return {
    restrict: 'EAC',
    link: function ($scope, $element, $attrs, controller, $transclude) {
      if (!$transclude) {
        throw minErr('ngTransclude')('orphan',
            'Illegal use of ngTransclude directive in the template! ' +
            'No parent directive that requires a transclusion found. ' +
            'Element: {0}',
            startingTag($element));
      }
      var innerScope = $scope.$new();
      innerScope.customScope = $scope.$parent;
      $transclude(innerScope, function (clone) {
        $element.empty();
        $element.append(clone);
        $element.on('$destroy', function () {
          innerScope.$destroy();
        });
      });
    }
  };
});
