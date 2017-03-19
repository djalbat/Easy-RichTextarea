'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('setimmediate');

var defer = setImmediate; ///

var easyui = require('easyui'),
    window = easyui.window,
    InputElement = easyui.InputElement;

var Selection = require('./selection');

var RichTextarea = function (_InputElement) {
  _inherits(RichTextarea, _InputElement);

  function RichTextarea(selector) {
    var changeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var scrollHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var focusHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    var blurHandler = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    _classCallCheck(this, RichTextarea);

    var _this = _possibleConstructorReturn(this, (RichTextarea.__proto__ || Object.getPrototypeOf(RichTextarea)).call(this, selector));

    _this.changeHandlers = [];

    _this.onChange(changeHandler);

    scrollHandler.intermediateHandler = intermediateScrollHandler.bind(_this);
    focusHandler.intermediateHandler = intermediateFocusHandler.bind(_this);
    blurHandler.intermediateHandler = intermediateBlurHandler.bind(_this);

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

  _createClass(RichTextarea, [{
    key: 'clone',
    value: function clone(changeHandler, scrollHandler, focusHandler, blurHandler) {
      return RichTextarea.clone(this, changeHandler, scrollHandler, focusHandler, blurHandler);
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
    key: 'getScrollTop',
    value: function getScrollTop() {
      return this.domElement.scrollTop;
    }
  }, {
    key: 'getScrollLeft',
    value: function getScrollLeft() {
      return this.domElement.scrollLeft;
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      var value = content; ///

      this.domElement.value = value;

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

      this.domElement.selectionStart = selectionStart;
      this.domElement.selectionEnd = selectionEnd;

      this.previousSelection = selection; ///
    }
  }, {
    key: 'setScrollTop',
    value: function setScrollTop(scrollTop) {
      this.domElement.scrollTop = scrollTop;
    }
  }, {
    key: 'setScrollLeft',
    value: function setScrollLeft(scrollLeft) {
      this.domElement.scrollLeft = scrollLeft;
    }
  }, {
    key: 'onChange',
    value: function onChange(changeHandler) {
      var regardless = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      changeHandler.regardless = regardless; ///

      this.changeHandlers.push(changeHandler);
    }
  }, {
    key: 'offChange',
    value: function offChange(changeHandler) {
      var index = this.changeHandlers.indexOf(changeHandler);

      if (index > -1) {
        var deleteCount = 1;

        this.changeHandlers.splice(index, deleteCount);
      }
    }
  }, {
    key: 'onResize',
    value: function onResize(resizeHandler) {}
  }, {
    key: 'offResize',
    value: function offResize(resizeHandler) {}
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler() {
      this.mouseDown = false;
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      if (this.mouseDown === true) {
        this.possibleChangeHandler();
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
        this.possibleChangeHandler();
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
      var active = this.isActive(),
          content = this.getContent(),
          selection = this.getSelection(),
          contentDifferentToPreviousContent = content !== this.previousContent,
          selectionDifferentToPreviousSelection = selection.isDifferentTo(this.previousSelection),
          contentChanged = contentDifferentToPreviousContent,
          ///
      selectionChanged = selectionDifferentToPreviousSelection,
          ///
      changed = contentChanged || selectionChanged;

      if (changed) {
        this.changeHandlers.forEach(function (changeHandler) {
          if (active || changeHandler.regardless) {
            ///
            changeHandler(content, selection, contentChanged, selectionChanged);
          }
        });
      }

      this.previousContent = content;
      this.previousSelection = selection;
    }
  }], [{
    key: 'clone',
    value: function clone(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
      return InputElement.clone(RichTextarea, selector, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }, {
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

      return InputElement.fromProperties(RichTextarea, properties, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }]);

  return RichTextarea;
}(InputElement);

Object.assign(RichTextarea, {
  tagName: 'textarea',
  ignoredProperties: ['onChange', 'onScroll', 'onFocus', 'onBlur']
});

module.exports = RichTextarea;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeXVpIiwid2luZG93IiwiSW5wdXRFbGVtZW50IiwiU2VsZWN0aW9uIiwiUmljaFRleHRhcmVhIiwic2VsZWN0b3IiLCJjaGFuZ2VIYW5kbGVyIiwic2Nyb2xsSGFuZGxlciIsImZvY3VzSGFuZGxlciIsImJsdXJIYW5kbGVyIiwiY2hhbmdlSGFuZGxlcnMiLCJvbkNoYW5nZSIsImludGVybWVkaWF0ZUhhbmRsZXIiLCJpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyIiwiYmluZCIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiY29udGVudCIsImdldENvbnRlbnQiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJwcmV2aW91c0NvbnRlbnQiLCJwcmV2aW91c1NlbGVjdGlvbiIsIm1vdXNlRG93biIsImNsb25lIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJ2YWx1ZSIsImRvbUVsZW1lbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJyZWdhcmRsZXNzIiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImRlbGV0ZUNvdW50Iiwic3BsaWNlIiwicmVzaXplSGFuZGxlciIsInBvc3NpYmxlQ2hhbmdlSGFuZGxlciIsImlzQWN0aXZlIiwiY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJjb250ZW50Q2hhbmdlZCIsInNlbGVjdGlvbkNoYW5nZWQiLCJjaGFuZ2VkIiwiZm9yRWFjaCIsInByb3BlcnRpZXMiLCJvblNjcm9sbCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJldmVudCIsImdldFNjcm9sbFRvcCIsImdldFNjcm9sbExlZnQiLCJwcmV2ZW50RGVmYXVsdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxjQUFSOztBQUVBLElBQU1DLFFBQVFDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsU0FBU0gsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNSSxTQUFTRCxPQUFPQyxNQUR0QjtBQUFBLElBRU1DLGVBQWVGLE9BQU9FLFlBRjVCOztBQUlBLElBQU1DLFlBQVlOLFFBQVEsYUFBUixDQUFsQjs7SUFFTU8sWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBK0k7QUFBQSxRQUF6SEMsYUFBeUgsdUVBQXpHLFlBQVcsQ0FBRSxDQUE0RjtBQUFBLFFBQTFGQyxhQUEwRix1RUFBMUUsWUFBVyxDQUFFLENBQTZEO0FBQUEsUUFBM0RDLFlBQTJELHVFQUE1QyxZQUFXLENBQUUsQ0FBK0I7QUFBQSxRQUE3QkMsV0FBNkIsdUVBQWYsWUFBVyxDQUFFLENBQUU7O0FBQUE7O0FBQUEsNEhBQ3ZJSixRQUR1STs7QUFHN0ksVUFBS0ssY0FBTCxHQUFzQixFQUF0Qjs7QUFFQSxVQUFLQyxRQUFMLENBQWNMLGFBQWQ7O0FBRUFDLGtCQUFjSyxtQkFBZCxHQUFvQ0MsMEJBQTBCQyxJQUExQixPQUFwQztBQUNBTixpQkFBYUksbUJBQWIsR0FBbUNH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RSxJQVZJLENBVUMsSUFWRCxDQUFOO0FBV0Q7O0FBRUQsU0FBU0UsdUJBQVQsQ0FBaUNQLFdBQWpDLEVBQThDa0UsS0FBOUMsRUFBcUQ7QUFDbkQsTUFBTWxELFNBQVMsS0FBSytCLFFBQUwsRUFBZjs7QUFFQSxNQUFJL0IsTUFBSixFQUFZO0FBQ1YsUUFBTXFELGlCQUFpQnJFLGFBQXZCOztBQUVBLFdBQU9xRSxjQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJyaWNoVGV4dGFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbmNvbnN0IGRlZmVyID0gc2V0SW1tZWRpYXRlOyAvLy9cclxuXHJcbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxyXG4gICAgICB3aW5kb3cgPSBlYXN5dWkud2luZG93LFxyXG4gICAgICBJbnB1dEVsZW1lbnQgPSBlYXN5dWkuSW5wdXRFbGVtZW50O1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZWxlY3Rpb24nKTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIElucHV0RWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBzY3JvbGxIYW5kbGVyID0gZnVuY3Rpb24oKSB7fSwgZm9jdXNIYW5kbGVyID0gZnVuY3Rpb24oKSB7fSwgYmx1ckhhbmRsZXIgPSBmdW5jdGlvbigpIHt9KSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVycyA9IFtdO1xyXG5cclxuICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XHJcblxyXG4gICAgc2Nyb2xsSGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgZm9jdXNIYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIGJsdXJIYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBpbnRlcm1lZGlhdGVCbHVySGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDsgLy8vXHJcbiAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAvLy9cclxuXHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikgeyByZXR1cm4gUmljaFRleHRhcmVhLmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpOyB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcbiAgICBcclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vbignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub24oJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9mZignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9mZignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZG9tRWxlbWVudC52YWx1ZSxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvblN0YXJ0LCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBnZXRTY3JvbGxUb3AoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wOyB9XHJcblxyXG4gIGdldFNjcm9sbExlZnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsTGVmdDsgfVxyXG5cclxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gY29udGVudDsgIC8vL1xyXG5cclxuICAgIHRoaXMuZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDsgLy8vXHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uOyAgLy8vXHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247IC8vL1xyXG4gIH1cclxuXHJcbiAgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcCkgeyB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wOyB9XHJcblxyXG4gIHNldFNjcm9sbExlZnQoc2Nyb2xsTGVmdCkgeyB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7IH1cclxuXHJcbiAgb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgcmVnYXJkbGVzcyA9IGZhbHNlKSB7XHJcbiAgICBjaGFuZ2VIYW5kbGVyLnJlZ2FyZGxlc3MgPSByZWdhcmRsZXNzOyAgLy8vXHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVycy5wdXNoKGNoYW5nZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgb2ZmQ2hhbmdlKGNoYW5nZUhhbmRsZXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGFuZ2VIYW5kbGVycy5pbmRleE9mKGNoYW5nZUhhbmRsZXIpO1xyXG5cclxuICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgIGNvbnN0IGRlbGV0ZUNvdW50ID0gMTtcclxuXHJcbiAgICAgIHRoaXMuY2hhbmdlSGFuZGxlcnMuc3BsaWNlKGluZGV4LCBkZWxldGVDb3VudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJlc2l6ZShyZXNpemVIYW5kbGVyKSB7fVxyXG5cclxuICBvZmZSZXNpemUocmVzaXplSGFuZGxlcikge31cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBpZiAodGhpcy5tb3VzZURvd24gPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBrZXlEb3duSGFuZGxlcigpIHtcclxuICAgIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NzaWJsZUNoYW5nZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCksXHJcbiAgICAgICAgICBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHRoaXMucHJldmlvdXNDb250ZW50KSxcclxuICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyh0aGlzLnByZXZpb3VzU2VsZWN0aW9uKSxcclxuICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uLCAvLy9cclxuICAgICAgICAgIGNoYW5nZWQgPSBjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlSGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihjaGFuZ2VIYW5kbGVyKSB7XHJcbiAgICAgICAgaWYgKGFjdGl2ZSB8fCBjaGFuZ2VIYW5kbGVyLnJlZ2FyZGxlc3MpIHsgIC8vL1xyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDtcclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoUmljaFRleHRhcmVhLCBzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1cjsgLy8vXHJcblxyXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhSaWNoVGV4dGFyZWEsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihSaWNoVGV4dGFyZWEsIHtcclxuICB0YWdOYW1lOiAndGV4dGFyZWEnLFxyXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXHJcbiAgICAnb25DaGFuZ2UnLFxyXG4gICAgJ29uU2Nyb2xsJyxcclxuICAgICdvbkZvY3VzJyxcclxuICAgICdvbkJsdXInXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyLCBldmVudCkge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSB0aGlzLmdldFNjcm9sbExlZnQoKSxcclxuICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gc2Nyb2xsSGFuZGxlcihzY3JvbGxUb3AsIHNjcm9sbExlZnQpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihmb2N1c0hhbmRsZXIsIGV2ZW50KSB7XHJcbiAgZGVmZXIoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gZm9jdXNIYW5kbGVyKGNvbnRlbnQsIHNlbGVjdGlvbik7XHJcblxyXG4gICAgICByZXR1cm4gcHJldmVudERlZmF1bHQ7XHJcbiAgICB9XHJcbiAgfS5iaW5kKHRoaXMpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIoYmx1ckhhbmRsZXIsIGV2ZW50KSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBwcmV2ZW50RGVmYXVsdCA9IGJsdXJIYW5kbGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG4iXX0=