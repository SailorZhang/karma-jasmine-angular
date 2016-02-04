app.directive('broadEvent', function($rootScope) {
    return {
        link: function(scope, ele, attrs) {
            ele.on('click', function() {
                $rootScope.$broadcast('Test');
                return false;
            });
        }
    };
});
