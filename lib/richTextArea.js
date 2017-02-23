'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

var NAMESPACE = 'EasyUI_RichTextArea';

var RichTextArea = function (_TextArea) {
  _inherits(RichTextArea, _TextArea);

  function RichTextArea(selector) {
    var changeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var scrollHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var focusHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    var blurHandler = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    _classCallCheck(this, RichTextArea);

    var _this = _possibleConstructorReturn(this, (RichTextArea.__proto__ || Object.getPrototypeOf(RichTextArea)).call(this, selector));

    _this.changeHandler = changeHandler;
    _this.scrollHandler = scrollHandler;
    _this.focusHandler = focusHandler;
    _this.blurHandler = blurHandler;

    var content = _this.getContent(),
        selection = _this.getSelection();

    _this.previousContent = content; ///
    _this.previousSelection = selection; ///

    _this.mouseDown = undefined; ///
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

      window.on('mouseup contextmenu', function () {
        ///
        this.mouseDown = false;
      }.bind(this), NAMESPACE);

      this.on('mousedown', function () {
        this.mouseDown = true;
      }.bind(this), NAMESPACE);

      this.onChange(this.changeHandler);
      this.onScroll(this.scrollHandler);
      this.onFocus(this.focusHandler);
      this.onBlur(this.blurHandler);

      this.addClass('active');
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.mouseDown = false;

      window.off('mouseup contextmenu blur', NAMESPACE); ///

      this.off('mousedown', NAMESPACE);

      this.offChange();
      this.offScroll();
      this.offFocus();
      this.offBlur();

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
    key: 'onChange',
    value: function onChange(changeHandler) {
      this.onInput(changeHandler);
      this.onKeyDown(changeHandler);
      this.onMouseMove(changeHandler);
    }
  }, {
    key: 'onScroll',
    value: function onScroll(scrollHandler) {
      _get(RichTextArea.prototype.__proto__ || Object.getPrototypeOf(RichTextArea.prototype), 'onScroll', this).call(this, function (scrollTop, scrollLeft) {
        var active = this.isActive();

        if (active) {
          scrollHandler(scrollTop, scrollLeft);
        }
      }.bind(this), NAMESPACE);
    }
  }, {
    key: 'onFocus',
    value: function onFocus(focusHandler) {
      this.on('focus', function () {
        defer(function () {
          var active = this.isActive();

          if (active) {
            var content = this.getContent(),
                selection = this.getSelection();

            focusHandler(content, selection);
          }
        }.bind(this));
      }.bind(this), NAMESPACE);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(blurHandler) {
      this.on('blur', function () {
        var active = this.isActive();

        if (active) {
          blurHandler();
        }
      }.bind(this), NAMESPACE);
    }
  }, {
    key: 'onInput',
    value: function onInput(changeHandler) {
      this.on('input', function () {
        var active = this.isActive();

        if (active) {
          this.possibleChangeHandler(changeHandler);
        }
      }.bind(this), NAMESPACE);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(changeHandler) {
      this.on('keydown', function () {
        defer(function () {
          var active = this.isActive();

          if (active) {
            this.possibleChangeHandler(changeHandler);
          }
        }.bind(this));
      }.bind(this), NAMESPACE);
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(changeHandler) {
      _get(RichTextArea.prototype.__proto__ || Object.getPrototypeOf(RichTextArea.prototype), 'onMouseMove', this).call(this, function () {
        var active = this.isActive();

        if (active) {
          if (this.mouseDown === true) {
            this.possibleChangeHandler(changeHandler);
          }
        }
      }.bind(this), NAMESPACE);
    }
  }, {
    key: 'offChange',
    value: function offChange() {
      this.offInput();
      this.offKeyDown();
      this.offMouseMove();
    }
  }, {
    key: 'offScroll',
    value: function offScroll() {
      _get(RichTextArea.prototype.__proto__ || Object.getPrototypeOf(RichTextArea.prototype), 'offScroll', this).call(this, NAMESPACE);
    }
  }, {
    key: 'offFocus',
    value: function offFocus() {
      this.off('focus', NAMESPACE);
    }
  }, {
    key: 'offBlur',
    value: function offBlur() {
      this.off('blur', NAMESPACE);
    }
  }, {
    key: 'offInput',
    value: function offInput() {
      this.off('input', NAMESPACE);
    }
  }, {
    key: 'offKeyDown',
    value: function offKeyDown() {
      this.off('keydown', NAMESPACE);
    }
  }, {
    key: 'offMouseMove',
    value: function offMouseMove() {
      _get(RichTextArea.prototype.__proto__ || Object.getPrototypeOf(RichTextArea.prototype), 'offMouseMove', this).call(this, NAMESPACE);
    }
  }, {
    key: 'possibleChangeHandler',
    value: function possibleChangeHandler(changeHandler) {
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
        changeHandler(content, selection, contentChanged, selectionChanged);

        this.previousContent = content;
        this.previousSelection = selection;
      }
    }
  }], [{
    key: 'clone',
    value: function clone(selectorOrElement, changeHandler, scrollHandler, focusHandler, blurHandler) {
      return Element.clone(RichTextArea, selectorOrElement, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }]);

  return RichTextArea;
}(TextArea);

module.exports = RichTextArea;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dEFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeXVpIiwid2luZG93IiwiRWxlbWVudCIsIlRleHRBcmVhIiwiU2VsZWN0aW9uIiwiTkFNRVNQQUNFIiwiUmljaFRleHRBcmVhIiwic2VsZWN0b3IiLCJjaGFuZ2VIYW5kbGVyIiwic2Nyb2xsSGFuZGxlciIsImZvY3VzSGFuZGxlciIsImJsdXJIYW5kbGVyIiwiY29udGVudCIsImdldENvbnRlbnQiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJwcmV2aW91c0NvbnRlbnQiLCJwcmV2aW91c1NlbGVjdGlvbiIsIm1vdXNlRG93biIsInVuZGVmaW5lZCIsImNsb25lIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJvbiIsImJpbmQiLCJvbkNoYW5nZSIsIm9uU2Nyb2xsIiwib25Gb2N1cyIsIm9uQmx1ciIsImFkZENsYXNzIiwib2ZmIiwib2ZmQ2hhbmdlIiwib2ZmU2Nyb2xsIiwib2ZmRm9jdXMiLCJvZmZCbHVyIiwicmVtb3ZlQ2xhc3MiLCJ2YWx1ZSIsImdldFZhbHVlIiwic2VsZWN0aW9uU3RhcnQiLCJnZXRTZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsImdldFNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNldFZhbHVlIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwic2V0U2VsZWN0aW9uU3RhcnQiLCJzZXRTZWxlY3Rpb25FbmQiLCJvbklucHV0Iiwib25LZXlEb3duIiwib25Nb3VzZU1vdmUiLCJzY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiaXNBY3RpdmUiLCJwb3NzaWJsZUNoYW5nZUhhbmRsZXIiLCJvZmZJbnB1dCIsIm9mZktleURvd24iLCJvZmZNb3VzZU1vdmUiLCJjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uIiwiaXNEaWZmZXJlbnRUbyIsImNvbnRlbnRDaGFuZ2VkIiwic2VsZWN0aW9uQ2hhbmdlZCIsImNoYW5nZWQiLCJzZWxlY3Rvck9yRWxlbWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxjQUFSOztBQUVBLElBQUlDLFFBQVFDLFlBQVosQyxDQUEwQjs7QUFFMUIsSUFBSUMsU0FBU0gsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJSSxTQUFTRCxPQUFPQyxNQURwQjtBQUFBLElBRUlDLFVBQVVGLE9BQU9FLE9BRnJCO0FBQUEsSUFHSUMsV0FBV0gsT0FBT0csUUFIdEI7O0FBS0EsSUFBSUMsWUFBWVAsUUFBUSxhQUFSLENBQWhCOztBQUVBLElBQU1RLFlBQVkscUJBQWxCOztJQUVNQyxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUErSTtBQUFBLFFBQXpIQyxhQUF5SCx1RUFBekcsWUFBVyxDQUFFLENBQTRGO0FBQUEsUUFBMUZDLGFBQTBGLHVFQUExRSxZQUFXLENBQUUsQ0FBNkQ7QUFBQSxRQUEzREMsWUFBMkQsdUVBQTVDLFlBQVcsQ0FBRSxDQUErQjtBQUFBLFFBQTdCQyxXQUE2Qix1RUFBZixZQUFXLENBQUUsQ0FBRTs7QUFBQTs7QUFBQSw0SEFDdklKLFFBRHVJOztBQUc3SSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxRQUFJQyxVQUFVLE1BQUtDLFVBQUwsRUFBZDtBQUFBLFFBQ0lDLFlBQVksTUFBS0MsWUFBTCxFQURoQjs7QUFHQSxVQUFLQyxlQUFMLEdBQXVCSixPQUF2QixDQVg2SSxDQVc3RztBQUNoQyxVQUFLSyxpQkFBTCxHQUF5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VUFBTCxFQUFkO0FBQUEsVUFDSUMsWUFBWSxLQUFLQyxZQUFMLEVBRGhCO0FBQUEsVUFFSThDLG9DQUFxQ2pELFlBQVksS0FBS0ksZUFGMUQ7QUFBQSxVQUdJOEMsd0NBQXdDaEQsVUFBVWlELGFBQVYsQ0FBd0IsS0FBSzlDLGlCQUE3QixDQUg1QztBQUFBLFVBSUkrQyxpQkFBaUJILGlDQUpyQjtBQUFBLFVBSXdEO0FBQ3BESSx5QkFBbUJILHFDQUx2QjtBQUFBLFVBSzhEO0FBQzFESSxnQkFBVUYsa0JBQWtCQyxnQkFOaEM7O0FBUUEsVUFBSUMsT0FBSixFQUFhO0FBQ1gxRCxzQkFBY0ksT0FBZCxFQUF1QkUsU0FBdkIsRUFBa0NrRCxjQUFsQyxFQUFrREMsZ0JBQWxEOztBQUVBLGFBQUtqRCxlQUFMLEdBQXVCSixPQUF2QjtBQUNBLGFBQUtLLGlCQUFMLEdBQXlCSCxTQUF6QjtBQUNEO0FBQ0Y7OzswQkFFWXFELGlCLEVBQW1CM0QsYSxFQUFlQyxhLEVBQWVDLFksRUFBY0MsVyxFQUFhO0FBQ3ZGLGFBQU9ULFFBQVFrQixLQUFSLENBQWNkLFlBQWQsRUFBNEI2RCxpQkFBNUIsRUFBK0MzRCxhQUEvQyxFQUE4REMsYUFBOUQsRUFBNkVDLFlBQTdFLEVBQTJGQyxXQUEzRixDQUFQO0FBQ0Q7Ozs7RUE3TndCUixROztBQWdPM0JpRSxPQUFPQyxPQUFQLEdBQWlCL0QsWUFBakIiLCJmaWxlIjoicmljaFRleHRBcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxucmVxdWlyZSgnc2V0aW1tZWRpYXRlJyk7XHJcblxyXG52YXIgZGVmZXIgPSBzZXRJbW1lZGlhdGU7IC8vL1xyXG5cclxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxyXG4gICAgd2luZG93ID0gZWFzeXVpLndpbmRvdyxcclxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudCxcclxuICAgIFRleHRBcmVhID0gZWFzeXVpLlRleHRBcmVhO1xyXG5cclxudmFyIFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2VsZWN0aW9uJyk7XHJcblxyXG5jb25zdCBOQU1FU1BBQ0UgPSAnRWFzeVVJX1JpY2hUZXh0QXJlYSc7XHJcblxyXG5jbGFzcyBSaWNoVGV4dEFyZWEgZXh0ZW5kcyBUZXh0QXJlYSB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBzY3JvbGxIYW5kbGVyID0gZnVuY3Rpb24oKSB7fSwgZm9jdXNIYW5kbGVyID0gZnVuY3Rpb24oKSB7fSwgYmx1ckhhbmRsZXIgPSBmdW5jdGlvbigpIHt9KSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcbiAgICBcclxuICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IGNoYW5nZUhhbmRsZXI7XHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBzY3JvbGxIYW5kbGVyO1xyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgPSBmb2N1c0hhbmRsZXI7XHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyID0gYmx1ckhhbmRsZXI7XHJcblxyXG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDsgLy8vXHJcbiAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAvLy9cclxuXHJcbiAgICB0aGlzLm1vdXNlRG93biA9IHVuZGVmaW5lZDsgLy8vXHJcbiAgfVxyXG5cclxuICBjbG9uZShjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7IHJldHVybiBSaWNoVGV4dEFyZWEuY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7IH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICB2YXIgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcbiAgICBcclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGNvbnRleHRtZW51JywgZnVuY3Rpb24oKSB7ICAvLy9cclxuICAgICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuICAgIH0uYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xyXG4gICAgfS5iaW5kKHRoaXMpLCBOQU1FU1BBQ0UpO1xyXG5cclxuICAgIHRoaXMub25DaGFuZ2UodGhpcy5jaGFuZ2VIYW5kbGVyKTtcclxuICAgIHRoaXMub25TY3JvbGwodGhpcy5zY3JvbGxIYW5kbGVyKTtcclxuICAgIHRoaXMub25Gb2N1cyh0aGlzLmZvY3VzSGFuZGxlcik7XHJcbiAgICB0aGlzLm9uQmx1cih0aGlzLmJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIE5BTUVTUEFDRSk7ICAvLy9cclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vkb3duJywgTkFNRVNQQUNFKTtcclxuXHJcbiAgICB0aGlzLm9mZkNoYW5nZSgpO1xyXG4gICAgdGhpcy5vZmZTY3JvbGwoKTtcclxuICAgIHRoaXMub2ZmRm9jdXMoKTtcclxuICAgIHRoaXMub2ZmQmx1cigpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCgpIHtcclxuICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcclxuICAgICAgICBjb250ZW50ID0gdmFsdWU7ICAvLy9cclxuXHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGlvbigpIHtcclxuICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IHRoaXMuZ2V0U2VsZWN0aW9uU3RhcnQoKSxcclxuICAgICAgICBzZWxlY3Rpb25FbmQgPSB0aGlzLmdldFNlbGVjdGlvbkVuZCgpLFxyXG4gICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgZW5kUG9zaXRpb24gPSBzZWxlY3Rpb25FbmQsXHJcbiAgICAgICAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgdmFyIHZhbHVlID0gY29udGVudDsgIC8vL1xyXG5cclxuICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDsgLy8vXHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICB2YXIgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbjsgIC8vL1xyXG5cclxuICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoc2VsZWN0aW9uU3RhcnQpO1xyXG4gICAgdGhpcy5zZXRTZWxlY3Rpb25FbmQoc2VsZWN0aW9uRW5kKTtcclxuXHJcbiAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAvLy9cclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpIHtcclxuICAgIHRoaXMub25JbnB1dChjaGFuZ2VIYW5kbGVyKTtcclxuICAgIHRoaXMub25LZXlEb3duKGNoYW5nZUhhbmRsZXIpO1xyXG4gICAgdGhpcy5vbk1vdXNlTW92ZShjaGFuZ2VIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIG9uU2Nyb2xsKHNjcm9sbEhhbmRsZXIpIHtcclxuICAgIHN1cGVyLm9uU2Nyb2xsKGZ1bmN0aW9uKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCkge1xyXG4gICAgICB2YXIgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICAgIHNjcm9sbEhhbmRsZXIoc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0KTtcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpLCBOQU1FU1BBQ0UpO1xyXG4gIH1cclxuXHJcbiAgb25Gb2N1cyhmb2N1c0hhbmRsZXIpIHtcclxuICAgIHRoaXMub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9LmJpbmQodGhpcyksIE5BTUVTUEFDRSk7XHJcbiAgfVxyXG5cclxuICBvbkJsdXIoYmx1ckhhbmRsZXIpIHtcclxuICAgIHRoaXMub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICBibHVySGFuZGxlcigpO1xyXG4gICAgICB9XHJcbiAgICB9LmJpbmQodGhpcyksIE5BTUVTUEFDRSk7XHJcbiAgfVxyXG5cclxuICBvbklucHV0KGNoYW5nZUhhbmRsZXIpIHtcclxuICAgIHRoaXMub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoY2hhbmdlSGFuZGxlcik7XHJcbiAgICAgIH1cclxuICAgIH0uYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcclxuICB9XHJcblxyXG4gIG9uS2V5RG93bihjaGFuZ2VIYW5kbGVyKSB7XHJcbiAgICB0aGlzLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKGNoYW5nZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0uYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcclxuICB9XHJcblxyXG4gIG9uTW91c2VNb3ZlKGNoYW5nZUhhbmRsZXIpIHtcclxuICAgIHN1cGVyLm9uTW91c2VNb3ZlKGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vdXNlRG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoY2hhbmdlSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LmJpbmQodGhpcyksIE5BTUVTUEFDRSk7XHJcbiAgfVxyXG5cclxuICBvZmZDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLm9mZklucHV0KCk7XHJcbiAgICB0aGlzLm9mZktleURvd24oKTtcclxuICAgIHRoaXMub2ZmTW91c2VNb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBvZmZTY3JvbGwoKSB7XHJcbiAgICBzdXBlci5vZmZTY3JvbGwoTkFNRVNQQUNFKTtcclxuICB9XHJcblxyXG4gIG9mZkZvY3VzKCkge1xyXG4gICAgdGhpcy5vZmYoJ2ZvY3VzJywgTkFNRVNQQUNFKTtcclxuICB9XHJcblxyXG4gIG9mZkJsdXIoKSB7XHJcbiAgICB0aGlzLm9mZignYmx1cicsIE5BTUVTUEFDRSk7XHJcbiAgfVxyXG5cclxuICBvZmZJbnB1dCgpIHtcclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIE5BTUVTUEFDRSk7XHJcbiAgfVxyXG5cclxuICBvZmZLZXlEb3duKCkge1xyXG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCBOQU1FU1BBQ0UpO1xyXG4gIH1cclxuXHJcbiAgb2ZmTW91c2VNb3ZlKCkge1xyXG4gICAgc3VwZXIub2ZmTW91c2VNb3ZlKE5BTUVTUEFDRSk7XHJcbiAgfVxyXG5cclxuICBwb3NzaWJsZUNoYW5nZUhhbmRsZXIoY2hhbmdlSGFuZGxlcikge1xyXG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgIGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCA9IChjb250ZW50ICE9PSB0aGlzLnByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbi5pc0RpZmZlcmVudFRvKHRoaXMucHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiwgLy8vXHJcbiAgICAgICAgY2hhbmdlZCA9IGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgY2hhbmdlSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuXHJcbiAgICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDtcclxuICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjbG9uZShzZWxlY3Rvck9yRWxlbWVudCwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoUmljaFRleHRBcmVhLCBzZWxlY3Rvck9yRWxlbWVudCwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0QXJlYTtcclxuIl19