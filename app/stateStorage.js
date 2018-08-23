'use strict';

angular.module('myApp.state', [])

.provider('stateStorage', [function() {
    this.$get = [function(){
        var storage =  {};
        return storage;
    }];
}]);