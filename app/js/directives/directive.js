app.directive('broadEvent', function($rootScope) {
    return {
        scope: {
            val: '=searchName'
        },
        // compile: function(tElement, tAttrs) {
        //     // console.log(tAttrs);
        //     tAttrs.$set('ngClick', 'brostEvent()');
        //     // tElement.attr('ng-click', 'brostEvent()');
        //     return function postLink(scope, ele, attrs) {
        //         console.log(attrs);
        //         // ele.on('click',scope.ngClick);
        //     }
        // },
        // controller: function($scope) {
        //     $scope.$parent.brostEvent = function() {
        //         $rootScope.$broadcast('Test');
        //     }
        // },
        link: function(scope, ele, attrs) {
            ele.on('click', function() {
                $rootScope.$broadcast('Test');
                return false;
            });
        }
    };
});
