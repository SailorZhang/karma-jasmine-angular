app.directive('multipleEmails', [function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, ele, attrs, ctrl) {
			if (!ctrl) return;

			ctrl.$validators.emails = function(modelValue, viewValue) {
				var reg = /[a-zA-Z]+@[a-zA-Z]+\.com/;
				return reg.test(viewValue);
			}

			attrs.$observe('multipleEmails', function(value) {
				ctrl.$validate();
			});
		}
	};
}]);