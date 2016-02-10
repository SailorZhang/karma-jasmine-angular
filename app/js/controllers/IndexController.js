'use strict';
app.controller('IndexController', ['$scope', '_', function($scope, _) {

    var _load = function() {
        $scope.$apply(function() {
            $scope.username = "SailorZhang";
        });
    };
    $scope.$on('Test', _load);

    $scope.username = "Sailor";
}]);
