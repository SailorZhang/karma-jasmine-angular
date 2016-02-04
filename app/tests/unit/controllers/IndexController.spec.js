describe('Unit test controller -> IndexController', () => {

    var $scope, $rootScope, createController, $httpBackend;
    beforeEach(module('myApp'));

    beforeEach(inject((_$rootScope_, _$controller_, _$httpBackend_) => {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
        var $controller = _$controller_;
        createController = () => {
            return $controller('IndexController', {
                '$scope': $scope
            });
        };
    }));

    it('should scope.username is Sailor', function() {
        createController();
        expect($scope.username).toEqual('Sailor');

        $rootScope.$broadcast('Test');

        expect($scope.username).toEqual('SailorZhang');
    });
});
