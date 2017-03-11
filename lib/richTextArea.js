'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('setimmediate');

var defer = setImmediate; ///

var easyui = require('easyui'),
    window = easyui.window,
    Element = easyui.Element,
    TextArea = easyui.TextArea;

var Selection = require('./selection');

var RichTextArea = function (_TextArea) {
  _inherits(RichTextArea, _TextArea);

  function RichTextArea(selector) {
    var changeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var scrollHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var focusHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    var blurHandler = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    _classCallCheck(this, RichTextArea);

    var _this = _possibleConstructorReturn(this, (RichTextArea.__proto__ || Object.getPrototypeOf(RichTextArea)).call(this, selector));

    scrollHandler.intermediateHandler = intermediateScrollHandler.bind(_this);
    focusHandler.intermediateHandler = intermediateFocusHandler.bind(_this);
    blurHandler.intermediateHandler = intermediateBlurHandler.bind(_this);

    _this.changeHandler = changeHandler;
    _this.scrollHandler = scrollHandler;
    _this.focusHandler = focusHandler;
    _this.blurHandler = blurHandler;

    var content = _this.getContent(),
        selection = _this.getSelection();

    _this.previousContent = content; ///
    _this.previousSelection = selection; ///

    _this.mouseDown = false;
    return _this;
  }

  _createClass(RichTextArea, [{
    key: 'clone',
    value: function clone(changeHandler, scrollHandler, focusHandler, blurHandler) {
      return RichTextArea.clone(this, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }, {
    key: 'isActive',
    value: function isActive() {
      var active = this.hasClass('active');

      return active;
    }
  }, {
    key: 'activate',
    value: function activate() {
      this.mouseDown = false;

      window.on('mouseup contextmenu blur', this.mouseUpHandler.bind(this));

      this.on('mousemove', this.mouseMoveHandler.bind(this));
      this.on('mousedown', this.mouseDownHandler.bind(this));
      this.on('keydown', this.keyDownHandler.bind(this));
      this.on('input', this.inputHandler.bind(this));
      this.on('scroll', this.scrollHandler);
      this.on('focus', this.focusHandler);
      this.on('blur', this.blurHandler);

      this.addClass('active');
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.mouseDown = false;

      window.off('mouseup contextmenu blur', this.mouseUpHandler.bind(this));

      this.off('mousemove', this.mouseMoveHandler.bind(this));
      this.off('mousedown', this.mouseDownHandler.bind(this));
      this.off('keydown', this.keyDownHandler.bind(this));
      this.off('input', this.inputHandler.bind(this));
      this.off('scroll', this.scrollHandler);
      this.off('focus', this.focusHandler);
      this.off('blur', this.blurHandler);

      this.removeClass('active');
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      var value = this.getValue(),
          content = value; ///

      return content;
    }
  }, {
    key: 'getSelection',
    value: function getSelection() {
      var selectionStart = this.getSelectionStart(),
          selectionEnd = this.getSelectionEnd(),
          startPosition = selectionStart,
          ///
      endPosition = selectionEnd,
          selection = new Selection(startPosition, endPosition);

      return selection;
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      var value = content; ///

      this.setValue(value);

      this.previousContent = content; ///
    }
  }, {
    key: 'setSelection',
    value: function setSelection(selection) {
      var selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          selectionStart = selectionStartPosition,
          ///
      selectionEnd = selectionEndPosition; ///

      this.setSelectionStart(selectionStart);
      this.setSelectionEnd(selectionEnd);

      this.previousSelection = selection; ///
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler() {
      this.mouseDown = false;
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      var active = this.isActive();

      if (active) {
        if (this.mouseDown === true) {
          this.possibleChangeHandler();
        }
      }
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler() {
      this.mouseDown = true;
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler() {
      defer(function () {
        var active = this.isActive();

        if (active) {
          this.possibleChangeHandler();
        }
      }.bind(this));
    }
  }, {
    key: 'inputHandler',
    value: function inputHandler() {
      var active = this.isActive();

      if (active) {
        this.possibleChangeHandler();
      }
    }
  }, {
    key: 'possibleChangeHandler',
    value: function possibleChangeHandler() {
      var content = this.getContent(),
          selection = this.getSelection(),
          contentDifferentToPreviousContent = content !== this.previousContent,
          selectionDifferentToPreviousSelection = selection.isDifferentTo(this.previousSelection),
          contentChanged = contentDifferentToPreviousContent,
          ///
      selectionChanged = selectionDifferentToPreviousSelection,
          ///
      changed = contentChanged || selectionChanged;

      if (changed) {
        this.changeHandler(content, selection, contentChanged, selectionChanged);

        this.previousContent = content;
        this.previousSelection = selection;
      }
    }
  }], [{
    key: 'clone',
    value: function clone(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
      return Element.clone(RichTextArea, selector, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }]);

  return RichTextArea;
}(TextArea);

module.exports = RichTextArea;

function intermediateScrollHandler(scrollHandler, event) {
  var active = this.isActive();

  if (active) {
    var scrollTop = this.getScrollTop(),
        scrollLeft = this.getScrollLeft(),
        preventDefault = scrollHandler(scrollTop, scrollLeft);

    return preventDefault;
  }
}

function intermediateFocusHandler(focusHandler, event) {
  defer(function () {
    var active = this.isActive();

    if (active) {
      var content = this.getContent(),
          selection = this.getSelection(),
          preventDefault = focusHandler(content, selection);

      return preventDefault;
    }
  }.bind(this));
}

function intermediateBlurHandler(blurHandler, event) {
  var active = this.isActive();

  if (active) {
    var preventDefault = blurHandler();

    return preventDefault;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dEFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeXVpIiwid2luZG93IiwiRWxlbWVudCIsIlRleHRBcmVhIiwiU2VsZWN0aW9uIiwiUmljaFRleHRBcmVhIiwic2VsZWN0b3IiLCJjaGFuZ2VIYW5kbGVyIiwic2Nyb2xsSGFuZGxlciIsImZvY3VzSGFuZGxlciIsImJsdXJIYW5kbGVyIiwiaW50ZXJtZWRpYXRlSGFuZGxlciIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJiaW5kIiwiaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyIiwiaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIiLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsInByZXZpb3VzQ29udGVudCIsInByZXZpb3VzU2VsZWN0aW9uIiwibW91c2VEb3duIiwiY2xvbmUiLCJhY3RpdmUiLCJoYXNDbGFzcyIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJtb3VzZU1vdmVIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsImtleURvd25IYW5kbGVyIiwiaW5wdXRIYW5kbGVyIiwiYWRkQ2xhc3MiLCJvZmYiLCJyZW1vdmVDbGFzcyIsInZhbHVlIiwiZ2V0VmFsdWUiLCJzZWxlY3Rpb25TdGFydCIsImdldFNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiZ2V0U2VsZWN0aW9uRW5kIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic2V0VmFsdWUiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJzZXRTZWxlY3Rpb25TdGFydCIsInNldFNlbGVjdGlvbkVuZCIsImlzQWN0aXZlIiwicG9zc2libGVDaGFuZ2VIYW5kbGVyIiwiY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJjb250ZW50Q2hhbmdlZCIsInNlbGVjdGlvbkNoYW5nZWQiLCJjaGFuZ2VkIiwibW9kdWxlIiwiZXhwb3J0cyIsImV2ZW50Iiwic2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9wIiwic2Nyb2xsTGVmdCIsImdldFNjcm9sbExlZnQiLCJwcmV2ZW50RGVmYXVsdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxjQUFSOztBQUVBLElBQU1DLFFBQVFDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsU0FBU0gsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNSSxTQUFTRCxPQUFPQyxNQUR0QjtBQUFBLElBRU1DLFVBQVVGLE9BQU9FLE9BRnZCO0FBQUEsSUFHTUMsV0FBV0gsT0FBT0csUUFIeEI7O0FBS0EsSUFBTUMsWUFBWVAsUUFBUSxhQUFSLENBQWxCOztJQUVNUSxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUErSTtBQUFBLFFBQXpIQyxhQUF5SCx1RUFBekcsWUFBVyxDQUFFLENBQTRGO0FBQUEsUUFBMUZDLGFBQTBGLHVFQUExRSxZQUFXLENBQUUsQ0FBNkQ7QUFBQSxRQUEzREMsWUFBMkQsdUVBQTVDLFlBQVcsQ0FBRSxDQUErQjtBQUFBLFFBQTdCQyxXQUE2Qix1RUFBZixZQUFXLENBQUUsQ0FBRTs7QUFBQTs7QUFBQSw0SEFDdklKLFFBRHVJOztBQUc3SUUsa0JBQWNHLG1CQUFkLEdBQW9DQywwQkFBMEJDLElBQTFCLE9BQXBDO0FBQ0FKLGlCQUFhRSxtQkFBYixHQUFtQ0cseUJBQXlCRCxJQUF6QixPQUFuQztBQUNBSCxnQkFBWUMsbUJBQVosR0FBa0NJLHdCQUF3QkYsSUFBeEIsT0FBbEM7O0FBRUEsVUFBS04sYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0Es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QUFhLEtBQUtDLGFBQUwsRUFEbkI7QUFBQSxRQUVNQyxpQkFBaUJ6RCxjQUFjcUQsU0FBZCxFQUF5QkUsVUFBekIsQ0FGdkI7O0FBSUEsV0FBT0UsY0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBU25ELHdCQUFULENBQWtDTCxZQUFsQyxFQUFnRG1ELEtBQWhELEVBQXVEO0FBQ3JEOUQsUUFBTSxZQUFXO0FBQ2YsUUFBTTBCLFNBQVMsS0FBSzBCLFFBQUwsRUFBZjs7QUFFQSxRQUFJMUIsTUFBSixFQUFZO0FBQ1YsVUFBTVIsVUFBVSxLQUFLQyxVQUFMLEVBQWhCO0FBQUEsVUFDTUMsWUFBWSxLQUFLQyxZQUFMLEVBRGxCO0FBQUEsVUFFTThDLGlCQUFpQnhELGFBQWFPLE9BQWIsRUFBc0JFLFNBQXRCLENBRnZCOztBQUlBLGFBQU8rQyxjQUFQO0FBQ0Q7QUFDRixHQVZLLENBVUpwRCxJQVZJLENBVUMsSUFWRCxDQUFOO0FBV0Q7O0FBRUQsU0FBU0UsdUJBQVQsQ0FBaUNMLFdBQWpDLEVBQThDa0QsS0FBOUMsRUFBcUQ7QUFDbkQsTUFBTXBDLFNBQVMsS0FBSzBCLFFBQUwsRUFBZjs7QUFFQSxNQUFJMUIsTUFBSixFQUFZO0FBQ1YsUUFBTXlDLGlCQUFpQnZELGFBQXZCOztBQUVBLFdBQU91RCxjQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJyaWNoVGV4dEFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbmNvbnN0IGRlZmVyID0gc2V0SW1tZWRpYXRlOyAvLy9cclxuXHJcbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxyXG4gICAgICB3aW5kb3cgPSBlYXN5dWkud2luZG93LFxyXG4gICAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQsXHJcbiAgICAgIFRleHRBcmVhID0gZWFzeXVpLlRleHRBcmVhO1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZWxlY3Rpb24nKTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0QXJlYSBleHRlbmRzIFRleHRBcmVhIHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKCkge30sIHNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBmb2N1c0hhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBibHVySGFuZGxlciA9IGZ1bmN0aW9uKCkge30pIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICBzY3JvbGxIYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICBmb2N1c0hhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGludGVybWVkaWF0ZUZvY3VzSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgYmx1ckhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGludGVybWVkaWF0ZUJsdXJIYW5kbGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDsgLy8vXHJcbiAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAvLy9cclxuXHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikgeyByZXR1cm4gUmljaFRleHRBcmVhLmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpOyB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcbiAgICBcclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5vbignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMub24oJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XHJcbiAgICB0aGlzLm9uKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyKTtcclxuICAgIHRoaXMub24oJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLm9mZignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMub2ZmKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG4gICAgdGhpcy5vZmYoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIpO1xyXG4gICAgdGhpcy5vZmYoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmdldFNlbGVjdGlvblN0YXJ0KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSB0aGlzLmdldFNlbGVjdGlvbkVuZCgpLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvblN0YXJ0LCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50OyAgLy8vXHJcblxyXG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAvLy9cclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KHNlbGVjdGlvblN0YXJ0KTtcclxuICAgIHRoaXMuc2V0U2VsZWN0aW9uRW5kKHNlbGVjdGlvbkVuZCk7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgLy8vXHJcbiAgfVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vdXNlRG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBrZXlEb3duSGFuZGxlcigpIHtcclxuICAgIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NzaWJsZUNoYW5nZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHRoaXMucHJldmlvdXNDb250ZW50KSxcclxuICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyh0aGlzLnByZXZpb3VzU2VsZWN0aW9uKSxcclxuICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uLCAvLy9cclxuICAgICAgICAgIGNoYW5nZWQgPSBjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuXHJcbiAgICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDtcclxuICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjbG9uZShzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoUmljaFRleHRBcmVhLCBzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0QXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlciwgZXZlbnQpIHtcclxuICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gIGlmIChhY3RpdmUpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZ2V0U2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gdGhpcy5nZXRTY3JvbGxMZWZ0KCksXHJcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IHNjcm9sbEhhbmRsZXIoc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0KTtcclxuXHJcbiAgICByZXR1cm4gcHJldmVudERlZmF1bHQ7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIoZm9jdXNIYW5kbGVyLCBldmVudCkge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGZvY3VzSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24pO1xyXG5cclxuICAgICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gICAgfVxyXG4gIH0uYmluZCh0aGlzKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyKGJsdXJIYW5kbGVyLCBldmVudCkge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3QgcHJldmVudERlZmF1bHQgPSBibHVySGFuZGxlcigpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuIl19