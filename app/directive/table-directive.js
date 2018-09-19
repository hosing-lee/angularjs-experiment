'use strict';

angular.module('directives', [])
.directive('tableDirective', function () {
  return {
    scope: {
      data: '=data'
    },
    transclude: {
      'header': '?header',
      'buttons': 'buttons'
    },
    templateUrl: 'directive/table-directive.html'
  };
})
.directive('scopeTransclude', ['$compile',function ($compile) {
      return {
        restrict: 'EAC',
        terminal: true,
        compile: function ngTranscludeCompile(tElement) {

          // Remove and cache any original content to act as a fallback
          var fallbackLinkFn = $compile(tElement.contents());
          tElement.empty();

          return function ngTranscludePostLink($scope, $element, $attrs, controller,
              $transclude) {

            if (!$transclude) {
              throw ngTranscludeMinErr('orphan',
                  'Illegal use of ngTransclude directive in the template! ' +
                  'No parent directive that requires a transclusion found. ' +
                  'Element: {0}',
                  startingTag($element));
            }

            // If the attribute is of the form: `ng-transclude="ng-transclude"` then treat it like the default
            if ($attrs.scopeTransclude === $attrs.$attr.scopeTransclude) {
              $attrs.scopeTransclude = '';
            }
            var slotName = $attrs.scopeTransclude || $attrs.scopeTranscludeSlot;

            var innerScope = $scope.$new();
            innerScope.customScope = $scope.$parent;
            // If the slot is required and no transclusion content is provided then this call will throw an error
            $transclude(innerScope, ngTranscludeCloneAttachFn, null, slotName);

            // If the slot is optional and no transclusion content is provided then use the fallback content
            if (slotName && !$transclude.isSlotFilled(slotName)) {
              useFallbackContent();
            }

            function ngTranscludeCloneAttachFn(clone, transcludedScope) {
              if (clone.length) {
                $element.append(clone);
              } else {
                useFallbackContent();
                // There is nothing linked against the transcluded scope since no content was available,
                // so it should be safe to clean up the generated scope.
                transcludedScope.$destroy();
              }
            }

            function useFallbackContent() {
              // Since this is the fallback content rather than the transcluded content,
              // we link against the scope of this directive rather than the transcluded scope
              fallbackLinkFn($scope, function (clone) {
                $element.append(clone);
              });
            }
          };
        }
      };
    }]
);
