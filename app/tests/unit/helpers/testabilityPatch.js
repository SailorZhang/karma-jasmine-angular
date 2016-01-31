
var getInputCompileHelper = (currentSpec) => {

  var helper = {};

  module(($compileProvider) => {
    $compileProvider.directive('attrCapture', () => {
      return (scope, element, $attrs) => {
        helper.attrs = $attrs;
      };
    });
  });

  inject(($compile, $rootScope, $sniffer) => {

    helper.compileInput = (inputHtml, mockValidity, scope) => {

      scope = helper.scope = scope || $rootScope;

      // Create the input element and dealoc when done
      helper.inputElm = angular.element(inputHtml);

      // Set up mock validation if necessary
      if (angular.isObject(mockValidity)) {
        VALIDITY_STATE_PROPERTY = 'ngMockValidity';
        helper.inputElm.prop(VALIDITY_STATE_PROPERTY, mockValidity);
        currentSpec.afterAll(() => {
          VALIDITY_STATE_PROPERTY = 'validity';
        });
      }

      // Create the form element and dealoc when done
      helper.formElm = angular.element('<form name="form"></form>');
      helper.formElm.append(helper.inputElm);

      // Compile the lot and return the input element
      $compile(helper.formElm)(scope);

      spyOn(scope.form, '$addControl').and.callThrough();
      spyOn(scope.form, '$$renameControl').and.callThrough();

      scope.$digest();

      return helper.inputElm;
    };

    helper.changeInputValueTo = (value) => {
      helper.inputElm.val(value);
      browserTrigger(helper.inputElm, $sniffer.hasEvent('input') ? 'input' : 'change');
    };

    helper.changeGivenInputTo = (inputElm, value) => {
      inputElm.val(value);
      // browserTrigger(inputElm, $sniffer.hasEvent('input') ? 'input' : 'change');
    };

    helper.dealoc = () => {
      dealoc(helper.inputElm);
      dealoc(helper.formElm);
    };
  });

  return helper;
}

var dealoc = (obj) => {
  var jqCache = angular.element.cache;
  if (obj) {
    if (angular.isElement(obj)) {
      cleanup(angular.element(obj));
    } else if (!window.jQuery) {
      // jQuery 2.x doesn't expose the cache storage.
      for (var key in jqCache) {
        var value = jqCache[key];
        if (value.data && value.data.$scope == obj) {
          delete jqCache[key];
        }
      }
    }
  }

  function cleanup(element){
    element.off().removeData();
    if (window.jQuery) {
      // jQuery 2.x doesn't expose the cache storage; ensure all element data
      // is removed during its cleanup.
      jQuery.cleanData([element]);
    }
    // Note:  We aren't using element.contents() here.  Under jQuery, element.contents() can fail
    // for IFRAME elements.  jQuery explicitly uses (element.contentDocument ||
    // element.contentWindow.document) and both properties are null for IFRAMES that aren't attached
    // to a document.
    var children = element[0].childNodes || [];
    for (var i = 0; i < children.length; i++) {
      cleanup(angular.element(children[i]));
    }
  }
}