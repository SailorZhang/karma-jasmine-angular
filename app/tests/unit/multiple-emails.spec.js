xdescribe('Test validators -> multiple-emails', () => {
	var compile, rootScope, helper;

	beforeEach(module('myApp'));

	beforeEach(() => {
		helper = getInputCompileHelper(this);
	});

	afterEach(() => {
		helper.dealoc();
	});

	it('aaa@aaa.com should be valid.', () => {
		var inputEle = helper.compileInput('<input type="text" ng-model="value" multiple-emails >');
		helper.changeInputValueTo('aaa@aaa.com')
		expect(inputEle).toBeValid();

		helper.changeInputValueTo('aaa@.com');
		expect(inputEle).toBeInvalid();

		expect(inputEle).hasClasses('ng-invalid','ng-invalid-emails');
	});
});	