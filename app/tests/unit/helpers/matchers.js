beforeEach(() => {
	var cssMatcher = (presentClasses, absentClasses) => {
		return () => {
			return {
				compare: (actual) => {
					var element = angular.element(actual);
					var present = true;
					var absent = false;

					angular.forEach(presentClasses.split(' '), function(className) {
						present = present && element.hasClass(className);
					});

					angular.forEach(absentClasses.split(' '), function(className) {
						absent = absent || element.hasClass(className);
					});

					var result = {};
					result.pass = present && !absent;

					result.message = function() {
						return `Expected to have ${presentClasses} ${absentClasses ? "and not have " + absentClasses : ""} but had ${element[0].className}.`;
					}

					return result;
				}
			}
		};
	};

	jasmine.addMatchers({
		toBeValid: cssMatcher('ng-valid', 'ng-invalid'),
		toBeInvalid: cssMatcher('ng-invalid', 'ng-valid'),
		hasClasses: () => {
			return {
				compare: (actual, ...className) => {
					var actualClass = actual.attr('class').split(' ');
					var result = {};
					result.pass = _.union(actualClass, className).length === actualClass.length;
					result.message = () => {
						return `Expected to have ${className} but had ${actual}`;
					};
					return result;
				}
			}
		}
	});
});