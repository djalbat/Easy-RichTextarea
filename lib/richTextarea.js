'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('setimmediate');

var defer = setImmediate; ///

var easy = require('easy');

var Selection = require('./selection');

var window = easy.window,
    Element = easy.Element;

var RichTextarea = function (_Element) {
  _inherits(RichTextarea, _Element);

  function RichTextarea(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
    _classCallCheck(this, RichTextarea);

    var _this = _possibleConstructorReturn(this, (RichTextarea.__proto__ || Object.getPrototypeOf(RichTextarea)).call(this, selector));

    _this.changeHandler = changeHandler;
    _this.scrollHandler = scrollHandler;
    _this.focusHandler = focusHandler;
    _this.blurHandler = blurHandler;

    var content = _this.getContent(),
        selection = _this.getSelection(),
        previousContent = content,
        ///
    previousSelection = selection; ///

    _this.setPreviousContent(previousContent);
    _this.setPreviousSelection(previousSelection);
    return _this;
  }

  _createClass(RichTextarea, [{
    key: 'activate',
    value: function activate() {
      this.setMouseDown();

      window.on('mouseup contextmenu blur', this.mouseUpHandler, this);

      this.on('mousedown', this.mouseDownHandler, this);

      this.on('mousemove', this.mouseMoveHandler, this);

      this.on('keydown', this.keyDownHandler, this);

      this.on('input', this.inputHandler, this);

      if (this.scrollHandler !== undefined) {
        this.on('scroll', this.scrollHandler, intermediateScrollHandler.bind(this));
      }

      if (this.focusHandler !== undefined) {
        this.on('focus', this.focusHandler, intermediateFocusHandler.bind(this));
      }

      if (this.blurHandler !== undefined) {
        this.on('blur', this.blurHandler, intermediateBlurHandler.bind(this));
      }

      this.addClass('active');
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.setMouseDown();

      window.off('mouseup contextmenu blur', this.mouseUpHandler);

      this.off('mousedown', this.mouseDownHandler);

      this.off('mousemove', this.mouseMoveHandler);

      this.off('keydown', this.keyDownHandler);

      this.off('input', this.inputHandler);

      if (this.scrollHandler !== undefined) {
        this.off('scroll', this.scrollHandler);
      }

      if (this.focusHandler !== undefined) {
        this.off('focus', this.focusHandler);
      }

      if (this.blurHandler !== undefined) {
        this.off('blur', this.blurHandler);
      }

      this.removeClass('active');
    }
  }, {
    key: 'isActive',
    value: function isActive() {
      var active = this.hasClass('active');

      return active;
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      var value = this.domElement.value,
          content = value; ///

      return content;
    }
  }, {
    key: 'getSelection',
    value: function getSelection() {
      var selectionStart = this.domElement.selectionStart,
          selectionEnd = this.domElement.selectionEnd,
          startPosition = selectionStart,
          ///
      endPosition = selectionEnd,
          ///
      selection = new Selection(startPosition, endPosition);

      return selection;
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      var value = content,
          ///
      previousContent = content; ///

      this.domElement.value = value;

      this.setPreviousContent(previousContent);
    }
  }, {
    key: 'setSelection',
    value: function setSelection(selection) {
      var selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          selectionStart = selectionStartPosition,
          ///
      selectionEnd = selectionEndPosition,
          ///
      previousSelection = selection; ///

      this.domElement.selectionStart = selectionStart;
      this.domElement.selectionEnd = selectionEnd;

      this.setPreviousSelection(previousSelection);
    }
  }, {
    key: 'isMouseDown',
    value: function isMouseDown() {
      var mouseDown = this.fromState('mouseDown');

      return mouseDown;
    }
  }, {
    key: 'getPreviousContent',
    value: function getPreviousContent() {
      var previousContent = this.fromState('previousContent');

      return previousContent;
    }
  }, {
    key: 'getPreviousSelection',
    value: function getPreviousSelection() {
      var previousSelection = this.fromState('previousSelection');

      return previousSelection;
    }
  }, {
    key: 'setMouseDown',
    value: function setMouseDown(mouseDown) {
      this.updateState({
        mouseDown: mouseDown
      });
    }
  }, {
    key: 'setPreviousContent',
    value: function setPreviousContent(previousContent) {
      this.updateState({
        previousContent: previousContent
      });
    }
  }, {
    key: 'setPreviousSelection',
    value: function setPreviousSelection(previousSelection) {
      this.updateState({
        previousSelection: previousSelection
      });
    }
  }, {
    key: 'fromState',
    value: function fromState(name) {
      var state = this.getState();

      state = state || {}; ///

      var value = state[name];

      return value;
    }
  }, {
    key: 'updateState',
    value: function updateState(update) {
      var state = this.getState();

      state = state || {}; ///

      state = Object.assign(state, update);

      this.setState(state);
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler() {
      var mouseDown = false;

      this.setMouseDown(mouseDown);
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler() {
      var mouseDown = true;

      this.setMouseDown(mouseDown);

      defer(function () {
        this.callHandler();
      }.bind(this));
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      var mouseDown = this.isMouseDown();

      if (mouseDown) {
        this.callHandler();
      }
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler() {
      defer(function () {
        this.callHandler();
      }.bind(this));
    }
  }, {
    key: 'inputHandler',
    value: function inputHandler() {
      this.callHandler();
    }
  }, {
    key: 'callHandler',
    value: function callHandler() {
      var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.changeHandler;
      var forced = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var active = this.isActive();

      if (active) {
        var content = this.getContent(),
            selection = this.getSelection();

        var previousContent = this.getPreviousContent(),
            previousSelection = this.getPreviousSelection();

        var contentDifferentToPreviousContent = content !== previousContent,
            selectionDifferentToPreviousSelection = selection.isDifferentTo(previousSelection),
            contentChanged = contentDifferentToPreviousContent,
            ///
        selectionChanged = selectionDifferentToPreviousSelection,
            ///
        changed = contentChanged || selectionChanged;

        if (changed || forced) {
          var targetElement = this; ///

          handler(content, selection, contentChanged, selectionChanged, targetElement);
        }

        previousContent = content; ///
        previousSelection = selection; ///

        this.setPreviousContent(previousContent);
        this.setPreviousSelection(previousSelection);
      }
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          onScroll = properties.onScroll,
          onFocus = properties.onFocus,
          onBlur = properties.onBlur,
          changeHandler = onChange,
          scrollHandler = onScroll,
          focusHandler = onFocus,
          blurHandler = onBlur; ///

      return Element.fromProperties(RichTextarea, properties, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }]);

  return RichTextarea;
}(Element);

Object.assign(RichTextarea, {
  tagName: 'textarea',
  defaultProperties: {
    className: 'rich'
  },
  ignoredProperties: ['onChange', 'onScroll', 'onFocus', 'onBlur']
});

module.exports = RichTextarea;

function intermediateScrollHandler(scrollHandler) {
  var active = this.isActive();

  if (active) {
    var scrollTop = this.getScrollTop(),
        scrollLeft = this.getScrollLeft(),
        targetElement = this,
        ///
    preventDefault = scrollHandler(scrollTop, scrollLeft, targetElement);

    return preventDefault;
  }
}

function intermediateFocusHandler(focusHandler) {
  defer(function () {
    var forced = true;

    this.callHandler(focusHandler, forced);
  }.bind(this));
}

function intermediateBlurHandler(blurHandler) {
  var forced = true;

  this.callHandler(blurHandler, forced);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIkVsZW1lbnQiLCJSaWNoVGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsInByZXZpb3VzQ29udGVudCIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNDb250ZW50Iiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJzZXRNb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsInVuZGVmaW5lZCIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJiaW5kIiwiaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyIiwiaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIiLCJhZGRDbGFzcyIsIm9mZiIsInJlbW92ZUNsYXNzIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJ2YWx1ZSIsImRvbUVsZW1lbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsIm1vdXNlRG93biIsImZyb21TdGF0ZSIsInVwZGF0ZVN0YXRlIiwibmFtZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJ1cGRhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRTdGF0ZSIsImNhbGxIYW5kbGVyIiwiaXNNb3VzZURvd24iLCJoYW5kbGVyIiwiZm9yY2VkIiwiaXNBY3RpdmUiLCJnZXRQcmV2aW91c0NvbnRlbnQiLCJnZXRQcmV2aW91c1NlbGVjdGlvbiIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsInRhcmdldEVsZW1lbnQiLCJwcm9wZXJ0aWVzIiwib25DaGFuZ2UiLCJvblNjcm9sbCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJmcm9tUHJvcGVydGllcyIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0IiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUFBLFFBQVEsY0FBUjs7QUFFQSxJQUFNQyxRQUFRQyxZQUFkLEMsQ0FBNEI7O0FBRTVCLElBQU1DLE9BQU9ILFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1JLFlBQVlKLFFBQVEsYUFBUixDQUFsQjs7SUFFUUssTSxHQUFvQkYsSSxDQUFwQkUsTTtJQUFRQyxPLEdBQVlILEksQ0FBWkcsTzs7SUFFVkMsWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDQyxhQUFyQyxFQUFvREMsWUFBcEQsRUFBa0VDLFdBQWxFLEVBQStFO0FBQUE7O0FBQUEsNEhBQ3ZFSixRQUR1RTs7QUFHN0UsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7O0FBRUEsUUFBTUMsVUFBVSxNQUFLQyxVQUFMLEVBQWhCO0FBQUEsUUFDTUMsWUFBWSxNQUFLQyxZQUFMLEVBRGxCO0FBQUEsUUFFTUMsa0JBQWtCSixPQUZ4QjtBQUFBLFFBRWtDO0FBQzVCSyx3QkFBb0JILFNBSDFCLENBUjZFLENBV3ZDOztBQUV0QyxVQUFLSSxrQkFBTCxDQUF3QkYsZUFBeEI7QUFDQSxVQUFLRyxvQkFBTCxDQUEwQkYsaUJBQTFCO0FBZDZFO0FBZTlFOzs7OytCQUVVO0FBQ1QsV0FBS0csWUFBTDs7QUFFQWhCLGFBQU9pQixFQUFQLENBQVUsMEJBQVYsRUFBc0MsS0FBS0MsY0FBM0MsRUFBMkQsSUFBM0Q7O0FBRUEsV0FBS0QsRUFBTCxDQUFRLFdBQVIsRUFBcUIsS0FBS0UsZ0JBQTFCLEVBQTRDLElBQTVDOztBQUVBLFdBQUtGLEVBQUwsQ0FBUSxXQUFSLEVBQXFCLEtBQUtHLGdCQUExQixFQUE0QyxJQUE1Qzs7QUFFQSxXQUFLSCxFQUFMLENBQVEsU0FBUixFQUFtQixLQUFLSSxjQUF4QixFQUF3QyxJQUF4Qzs7QUFFQSxXQUFLSixFQUFMLENBQVEsT0FBUixFQUFpQixLQUFLSyxZQUF0QixFQUFvQyxJQUFwQzs7QUFFQSxVQUFJLEtBQUtqQixhQUFMLEtBQXVCa0IsU0FBM0IsRUFBc0M7QUFDcEMsYUFBS04sRUFBTCxDQUFRLFFBQVIsRUFBa0IsS0FBS1osYUFBdkIsRUFBc0NtQiwwQkFBMEJDLElBQTFCLENBQStCLElBQS9CLENBQXRDO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLbkIsWUFBTCxLQUFzQmlCLFNBQTFCLEVBQXFDO0FBQ25DLGFBQUtOLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLEtBQUtYLFlBQXRCLEVBQW9Db0IseUJBQXlCRCxJQUF6QixDQUE4QixJQUE5QixDQUFwQztBQUNEOztBQUVELFVBQUksS0FBS2xCLFdBQUwsS0FBcUJnQixTQUF6QixFQUFvQztBQUNsQyxhQUFLTixFQUFMLENBQVEsTUFBUixFQUFnQixLQUFLVixXQUFyQixFQUFrQ29CLHdCQUF3QkYsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FBbEM7QUFDRDs7QUFFRCxXQUFLRyxRQUFMLENBQWMsUUFBZDtBQUNEOzs7aUNBRVk7QUFDWCxXQUFLWixZQUFMOztBQUVBaEIsYUFBTzZCLEdBQVAsQ0FBVywwQkFBWCxFQUF1QyxLQUFLWCxjQUE1Qzs7QUFFQSxXQUFLVyxHQUFMLENBQVMsV0FBVCxFQUFzQixLQUFLVixnQkFBM0I7O0FBRUEsV0FBS1UsR0FBTCxDQUFTLFdBQVQsRUFBc0IsS0FBS1QsZ0JBQTNCOztBQUVBLFdBQUtTLEdBQUwsQ0FBUyxTQUFULEVBQW9CLEtBQUtSLGNBQXpCOztBQUVBLFdBQUtRLEdBQUwsQ0FBUyxPQUFULEVBQWtCLEtBQUtQLFlBQXZCOztBQUVBLFVBQUksS0FBS2pCLGFBQUwsS0FBdUJrQixTQUEzQixFQUFzQztBQUNwQyxhQUFLTSxHQUFMLENBQVMsUUFBVCxFQUFtQixLQUFLeEIsYUFBeEI7QUFDRDs7QUFFRCxVQUFJLEtBQUtDLFlBQUwsS0FBc0JpQixTQUExQixFQUFxQztBQUNuQyxhQUFLTSxHQUFMLENBQVMsT0FBVCxFQUFrQixLQUFLdkIsWUFBdkI7QUFDRDs7QUFFRCxVQUFJLEtBQUtDLFdBQUwsS0FBcUJnQixTQUF6QixFQUFvQztBQUNsQyxhQUFLTSxHQUFMLENBQVMsTUFBVCxFQUFpQixLQUFLdEIsV0FBdEI7QUFDRDs7QUFFRCxXQUFLdUIsV0FBTCxDQUFpQixRQUFqQjtBQUNEOzs7K0JBRVU7QUFDVCxVQUFNQyxTQUFTLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLENBQWY7O0FBRUEsYUFBT0QsTUFBUDtBQUNEOzs7aUNBRVk7QUFDWCxVQUFNRSxRQUFRLEtBQUtDLFVBQUwsQ0FBZ0JELEtBQTlCO0FBQUEsVUFDTXpCLFVBQVV5QixLQURoQixDQURXLENBRWE7O0FBRXhCLGFBQU96QixPQUFQO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQU0yQixpQkFBaUIsS0FBS0QsVUFBTCxDQUFnQkMsY0FBdkM7QUFBQSxVQUNNQyxlQUFlLEtBQUtGLFVBQUwsQ0FBZ0JFLFlBRHJDO0FBQUEsVUFFTUMsZ0JBQWdCRixjQUZ0QjtBQUFBLFVBRXNDO0FBQ2hDRyxvQkFBY0YsWUFIcEI7QUFBQSxVQUdrQztBQUM1QjFCLGtCQUFZLElBQUlYLFNBQUosQ0FBY3NDLGFBQWQsRUFBNkJDLFdBQTdCLENBSmxCOztBQU1BLGFBQU81QixTQUFQO0FBQ0Q7OzsrQkFFVUYsTyxFQUFTO0FBQ2xCLFVBQU15QixRQUFRekIsT0FBZDtBQUFBLFVBQXdCO0FBQ2xCSSx3QkFBa0JKLE9BRHhCLENBRGtCLENBRWdCOztBQUVsQyxXQUFLMEIsVUFBTCxDQUFnQkQsS0FBaEIsR0FBd0JBLEtBQXhCOztBQUVBLFdBQUtuQixrQkFBTCxDQUF3QkYsZUFBeEI7QUFDRDs7O2lDQUVZRixTLEVBQVc7QUFDdEIsVUFBTTZCLHlCQUF5QjdCLFVBQVU4QixnQkFBVixFQUEvQjtBQUFBLFVBQ01DLHVCQUF1Qi9CLFVBQVVnQyxjQUFWLEVBRDdCO0FBQUEsVUFFTVAsaUJBQWlCSSxzQkFGdkI7QUFBQSxVQUVnRDtBQUMxQ0gscUJBQWVLLG9CQUhyQjtBQUFBLFVBRzRDO0FBQ3RDNUIsMEJBQW9CSCxTQUoxQixDQURzQixDQUtnQjs7QUFFdEMsV0FBS3dCLFVBQUwsQ0FBZ0JDLGNBQWhCLEdBQWlDQSxjQUFqQztBQUNBLFdBQUtELFVBQUwsQ0FBZ0JFLFlBQWhCLEdBQStCQSxZQUEvQjs7QUFFQSxXQUFLckIsb0JBQUwsQ0FBMEJGLGlCQUExQjtBQUNEOzs7a0NBRWE7QUFDWixVQUFNOEIsWUFBWSxLQUFLQyxTQUFMLENBQWUsV0FBZixDQUFsQjs7QUFFQSxhQUFPRCxTQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTS9CLGtCQUFrQixLQUFLZ0MsU0FBTCxDQUFlLGlCQUFmLENBQXhCOztBQUVBLGFBQU9oQyxlQUFQO0FBQ0Q7OzsyQ0FFc0I7QUFDckIsVUFBTUMsb0JBQW9CLEtBQUsrQixTQUFMLENBQWUsbUJBQWYsQ0FBMUI7O0FBRUEsYUFBTy9CLGlCQUFQO0FBQ0Q7OztpQ0FFWThCLFMsRUFBVztBQUN0QixXQUFLRSxXQUFMLENBQWlCO0FBQ2ZGLG1CQUFXQTtBQURJLE9BQWpCO0FBR0Q7Ozt1Q0FFa0IvQixlLEVBQWlCO0FBQ2xDLFdBQUtpQyxXQUFMLENBQWlCO0FBQ2ZqQyx5QkFBaUJBO0FBREYsT0FBakI7QUFHRDs7O3lDQUVvQkMsaUIsRUFBbUI7QUFDdEMsV0FBS2dDLFdBQUwsQ0FBaUI7QUFDZmhDLDJCQUFtQkE7QUFESixPQUFqQjtBQUdEOzs7OEJBRVNpQyxJLEVBQU07QUFDZCxVQUFJQyxRQUFRLEtBQUtDLFFBQUwsRUFBWjs7QUFFQUQsY0FBUUEsU0FBUyxFQUFqQixDQUhjLENBR1E7O0FBRXRCLFVBQU1kLFFBQVFjLE1BQU1ELElBQU4sQ0FBZDs7QUFFQSxhQUFPYixLQUFQO0FBQ0Q7OztnQ0FFV2dCLE0sRUFBUTtBQUNsQixVQUFJRixRQUFRLEtBQUtDLFFBQUwsRUFBWjs7QUFFQUQsY0FBUUEsU0FBUyxFQUFqQixDQUhrQixDQUdJOztBQUV0QkEsY0FBUUcsT0FBT0MsTUFBUCxDQUFjSixLQUFkLEVBQXFCRSxNQUFyQixDQUFSOztBQUVBLFdBQUtHLFFBQUwsQ0FBY0wsS0FBZDtBQUNEOzs7cUNBRWdCO0FBQ2YsVUFBTUosWUFBWSxLQUFsQjs7QUFFQSxXQUFLM0IsWUFBTCxDQUFrQjJCLFNBQWxCO0FBQ0Q7Ozt1Q0FFa0I7QUFDakIsVUFBTUEsWUFBWSxJQUFsQjs7QUFFQSxXQUFLM0IsWUFBTCxDQUFrQjJCLFNBQWxCOztBQUVBL0MsWUFBTSxZQUFXO0FBQ2YsYUFBS3lELFdBQUw7QUFDRCxPQUZLLENBRUo1QixJQUZJLENBRUMsSUFGRCxDQUFOO0FBR0Q7Ozt1Q0FFa0I7QUFDakIsVUFBTWtCLFlBQVksS0FBS1csV0FBTCxFQUFsQjs7QUFFQSxVQUFJWCxTQUFKLEVBQWU7QUFDYixhQUFLVSxXQUFMO0FBQ0Q7QUFDRjs7O3FDQUVnQjtBQUNmekQsWUFBTSxZQUFXO0FBQ2YsYUFBS3lELFdBQUw7QUFDRCxPQUZLLENBRUo1QixJQUZJLENBRUMsSUFGRCxDQUFOO0FBR0Q7OzttQ0FFYztBQUNiLFdBQUs0QixXQUFMO0FBQ0Q7OztrQ0FFeUQ7QUFBQSxVQUE5Q0UsT0FBOEMsdUVBQXBDLEtBQUtuRCxhQUErQjtBQUFBLFVBQWhCb0QsTUFBZ0IsdUVBQVAsS0FBTzs7QUFDeEQsVUFBTXpCLFNBQVMsS0FBSzBCLFFBQUwsRUFBZjs7QUFFQSxVQUFJMUIsTUFBSixFQUFZO0FBQ1YsWUFBTXZCLFVBQVUsS0FBS0MsVUFBTCxFQUFoQjtBQUFBLFlBQ01DLFlBQVksS0FBS0MsWUFBTCxFQURsQjs7QUFHQSxZQUFJQyxrQkFBa0IsS0FBSzhDLGtCQUFMLEVBQXRCO0FBQUEsWUFDSTdDLG9CQUFvQixLQUFLOEMsb0JBQUwsRUFEeEI7O0FBR0EsWUFBTUMsb0NBQXFDcEQsWUFBWUksZUFBdkQ7QUFBQSxZQUNNaUQsd0NBQXdDbkQsVUFBVW9ELGFBQVYsQ0FBd0JqRCxpQkFBeEIsQ0FEOUM7QUFBQSxZQUVNa0QsaUJBQWlCSCxpQ0FGdkI7QUFBQSxZQUUwRDtBQUNwREksMkJBQW1CSCxxQ0FIekI7QUFBQSxZQUdnRTtBQUMxREksa0JBQVVGLGtCQUFrQkMsZ0JBSmxDOztBQU1BLFlBQUlDLFdBQVdULE1BQWYsRUFBdUI7QUFDckIsY0FBTVUsZ0JBQWdCLElBQXRCLENBRHFCLENBQ087O0FBRTVCWCxrQkFBUS9DLE9BQVIsRUFBaUJFLFNBQWpCLEVBQTRCcUQsY0FBNUIsRUFBNENDLGdCQUE1QyxFQUE4REUsYUFBOUQ7QUFDRDs7QUFFRHRELDBCQUFrQkosT0FBbEIsQ0FuQlUsQ0FtQmtCO0FBQzVCSyw0QkFBb0JILFNBQXBCLENBcEJVLENBb0JzQjs7QUFFaEMsYUFBS0ksa0JBQUwsQ0FBd0JGLGVBQXhCO0FBQ0EsYUFBS0csb0JBQUwsQ0FBMEJGLGlCQUExQjtBQUNEO0FBQ0Y7OzttQ0FFcUJzRCxVLEVBQVk7QUFBQSxVQUN4QkMsUUFEd0IsR0FDZ0JELFVBRGhCLENBQ3hCQyxRQUR3QjtBQUFBLFVBQ2RDLFFBRGMsR0FDZ0JGLFVBRGhCLENBQ2RFLFFBRGM7QUFBQSxVQUNKQyxPQURJLEdBQ2dCSCxVQURoQixDQUNKRyxPQURJO0FBQUEsVUFDS0MsTUFETCxHQUNnQkosVUFEaEIsQ0FDS0ksTUFETDtBQUFBLFVBRTFCbkUsYUFGMEIsR0FFVmdFLFFBRlU7QUFBQSxVQUcxQi9ELGFBSDBCLEdBR1ZnRSxRQUhVO0FBQUEsVUFJMUIvRCxZQUowQixHQUlYZ0UsT0FKVztBQUFBLFVBSzFCL0QsV0FMMEIsR0FLWmdFLE1BTFksRUFLSjs7QUFFNUIsYUFBT3RFLFFBQVF1RSxjQUFSLENBQXVCdEUsWUFBdkIsRUFBcUNpRSxVQUFyQyxFQUFpRC9ELGFBQWpELEVBQWdFQyxhQUFoRSxFQUErRUMsWUFBL0UsRUFBNkZDLFdBQTdGLENBQVA7QUFDRDs7OztFQXZQd0JOLE87O0FBMFAzQmlELE9BQU9DLE1BQVAsQ0FBY2pELFlBQWQsRUFBNEI7QUFDMUJ1RSxXQUFTLFVBRGlCO0FBRTFCQyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETSxHQUZPO0FBSzFCQyxxQkFBbUIsQ0FDakIsVUFEaUIsRUFFakIsVUFGaUIsRUFHakIsU0FIaUIsRUFJakIsUUFKaUI7QUFMTyxDQUE1Qjs7QUFhQUMsT0FBT0MsT0FBUCxHQUFpQjVFLFlBQWpCOztBQUVBLFNBQVNzQix5QkFBVCxDQUFtQ25CLGFBQW5DLEVBQWtEO0FBQ2hELE1BQU0wQixTQUFTLEtBQUswQixRQUFMLEVBQWY7O0FBRUEsTUFBSTFCLE1BQUosRUFBWTtBQUNWLFFBQU1nRCxZQUFZLEtBQUtDLFlBQUwsRUFBbEI7QUFBQSxRQUNNQyxhQUFhLEtBQUtDLGFBQUwsRUFEbkI7QUFBQSxRQUVNaEIsZ0JBQWdCLElBRnRCO0FBQUEsUUFFNEI7QUFDdEJpQixxQkFBaUI5RSxjQUFjMEUsU0FBZCxFQUF5QkUsVUFBekIsRUFBcUNmLGFBQXJDLENBSHZCOztBQUtBLFdBQU9pQixjQUFQO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTekQsd0JBQVQsQ0FBa0NwQixZQUFsQyxFQUFnRDtBQUM5Q1YsUUFBTSxZQUFXO0FBQ2YsUUFBTTRELFNBQVMsSUFBZjs7QUFFQSxTQUFLSCxXQUFMLENBQWlCL0MsWUFBakIsRUFBK0JrRCxNQUEvQjtBQUNELEdBSkssQ0FJSi9CLElBSkksQ0FJQyxJQUpELENBQU47QUFLRDs7QUFFRCxTQUFTRSx1QkFBVCxDQUFpQ3BCLFdBQWpDLEVBQThDO0FBQzVDLE1BQU1pRCxTQUFTLElBQWY7O0FBRUEsT0FBS0gsV0FBTCxDQUFpQjlDLFdBQWpCLEVBQThCaUQsTUFBOUI7QUFDRCIsImZpbGUiOiJyaWNoVGV4dGFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbmNvbnN0IGRlZmVyID0gc2V0SW1tZWRpYXRlOyAvLy9cclxuXHJcbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XHJcblxyXG5jb25zdCBTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3NlbGVjdGlvbicpO1xyXG5cclxuY29uc3QgeyB3aW5kb3csIEVsZW1lbnQgfSA9IGVhc3k7XHJcblxyXG5jbGFzcyBSaWNoVGV4dGFyZWEgZXh0ZW5kcyBFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgc3VwZXIoc2VsZWN0b3IpO1xyXG5cclxuICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IGNoYW5nZUhhbmRsZXI7XHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBzY3JvbGxIYW5kbGVyO1xyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgPSBmb2N1c0hhbmRsZXI7XHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyID0gYmx1ckhhbmRsZXI7XHJcblxyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLnNldE1vdXNlRG93bigpO1xyXG5cclxuICAgIHdpbmRvdy5vbignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZvY3VzSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ibHVySGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub24oJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCBpbnRlcm1lZGlhdGVCbHVySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLnNldE1vdXNlRG93bigpO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9mZignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5mb2N1c0hhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9mZignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYmx1ckhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9mZignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICByZXR1cm4gYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCgpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kb21FbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQsXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uU3RhcnQsIC8vL1xyXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBzZWxlY3Rpb25FbmQsIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAgLy8vXHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgaXNNb3VzZURvd24oKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0aGlzLmZyb21TdGF0ZSgnbW91c2VEb3duJyk7XHJcblxyXG4gICAgcmV0dXJuIG1vdXNlRG93bjtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzQ29udGVudCgpIHtcclxuICAgIGNvbnN0IHByZXZpb3VzQ29udGVudCA9IHRoaXMuZnJvbVN0YXRlKCdwcmV2aW91c0NvbnRlbnQnKTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNDb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwcmV2aW91c1NlbGVjdGlvbiA9IHRoaXMuZnJvbVN0YXRlKCdwcmV2aW91c1NlbGVjdGlvbicpO1xyXG5cclxuICAgIHJldHVybiBwcmV2aW91c1NlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldE1vdXNlRG93bihtb3VzZURvd24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBtb3VzZURvd246IG1vdXNlRG93blxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNDb250ZW50OiBwcmV2aW91c0NvbnRlbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbjogcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnJvbVN0YXRlKG5hbWUpIHtcclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcclxuXHJcbiAgICBzdGF0ZSA9IHN0YXRlIHx8IHt9OyAgLy8vXHJcblxyXG4gICAgY29uc3QgdmFsdWUgPSBzdGF0ZVtuYW1lXTtcclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTdGF0ZSh1cGRhdGUpIHtcclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcclxuXHJcbiAgICBzdGF0ZSA9IHN0YXRlIHx8IHt9OyAgLy8vXHJcblxyXG4gICAgc3RhdGUgPSBPYmplY3QuYXNzaWduKHN0YXRlLCB1cGRhdGUpO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgZGVmZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuY2FsbEhhbmRsZXIoKTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZU1vdmVIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdGhpcy5pc01vdXNlRG93bigpO1xyXG5cclxuICAgIGlmIChtb3VzZURvd24pIHtcclxuICAgICAgdGhpcy5jYWxsSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5jYWxsSGFuZGxlcigpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICAgIHRoaXMuY2FsbEhhbmRsZXIoKTtcclxuICB9XHJcblxyXG4gIGNhbGxIYW5kbGVyKGhhbmRsZXIgPSB0aGlzLmNoYW5nZUhhbmRsZXIsIGZvcmNlZCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyhwcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgICBjaGFuZ2VkID0gY29udGVudENoYW5nZWQgfHwgc2VsZWN0aW9uQ2hhbmdlZDtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkIHx8IGZvcmNlZCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSB0aGlzOyAvLy9cclxuXHJcbiAgICAgICAgaGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkLCB0YXJnZXRFbGVtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudDsgIC8vL1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1cjsgLy8vXHJcblxyXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoUmljaFRleHRhcmVhLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oUmljaFRleHRhcmVhLCB7XHJcbiAgdGFnTmFtZTogJ3RleHRhcmVhJyxcclxuICBkZWZhdWx0UHJvcGVydGllczoge1xyXG4gICAgY2xhc3NOYW1lOiAncmljaCdcclxuICB9LFxyXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXHJcbiAgICAnb25DaGFuZ2UnLFxyXG4gICAgJ29uU2Nyb2xsJyxcclxuICAgICdvbkZvY3VzJyxcclxuICAgICdvbkJsdXInXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyKSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmdldFNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgc2Nyb2xsTGVmdCA9IHRoaXMuZ2V0U2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgdGFyZ2V0RWxlbWVudCA9IHRoaXMsIC8vL1xyXG4gICAgICAgICAgcHJldmVudERlZmF1bHQgPSBzY3JvbGxIYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgdGFyZ2V0RWxlbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlcikge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmNhbGxIYW5kbGVyKGZvY3VzSGFuZGxlciwgZm9yY2VkKTtcclxuICB9LmJpbmQodGhpcykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlcikge1xyXG4gIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gIHRoaXMuY2FsbEhhbmRsZXIoYmx1ckhhbmRsZXIsIGZvcmNlZCk7XHJcbn1cclxuIl19