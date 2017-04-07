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
    InputElement = easy.InputElement;

var RichTextarea = function (_InputElement) {
  _inherits(RichTextarea, _InputElement);

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

      this.setValue(value);

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

      this.setSelectionStart(selectionStart);
      this.setSelectionEnd(selectionEnd);

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
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      var mouseDown = this.isMouseDown();

      if (mouseDown) {
        this.possibleChangeHandler();
      }
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

        if (changed) {
          var targetElement = this; ///

          this.changeHandler(content, selection, contentChanged, selectionChanged, targetElement);
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
      var onScroll = properties.onScroll,
          onFocus = properties.onFocus,
          onBlur = properties.onBlur,
          scrollHandler = onScroll,
          focusHandler = onFocus,
          blurHandler = onBlur; ///

      return InputElement.fromProperties(RichTextarea, properties, scrollHandler, focusHandler, blurHandler);
    }
  }]);

  return RichTextarea;
}(InputElement);

Object.assign(RichTextarea, {
  tagName: 'textarea',
  defaultProperties: {
    className: 'rich'
  },
  ignoredProperties: ['onScroll', 'onFocus', 'onBlur']
});

module.exports = RichTextarea;

function intermediateScrollHandler(scrollHandler) {
  var active = this.isActive();

  if (active) {
    var scrollTop = this.getScrollTop(),
        scrollLeft = this.getScrollLeft(),
        preventDefault = scrollHandler(scrollTop, scrollLeft);

    return preventDefault;
  }
}

function intermediateFocusHandler(focusHandler) {
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

function intermediateBlurHandler(blurHandler) {
  var active = this.isActive();

  if (active) {
    var preventDefault = blurHandler();

    return preventDefault;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIklucHV0RWxlbWVudCIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsImNvbnRlbnQiLCJnZXRDb250ZW50Iiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0aW9uIiwicHJldmlvdXNDb250ZW50IiwicHJldmlvdXNTZWxlY3Rpb24iLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c1NlbGVjdGlvbiIsInNldE1vdXNlRG93biIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJtb3VzZURvd25IYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsImtleURvd25IYW5kbGVyIiwiaW5wdXRIYW5kbGVyIiwidW5kZWZpbmVkIiwiaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciIsImJpbmQiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJhY3RpdmUiLCJoYXNDbGFzcyIsInZhbHVlIiwiZ2V0VmFsdWUiLCJzZWxlY3Rpb25TdGFydCIsImdldFNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiZ2V0U2VsZWN0aW9uRW5kIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic2V0VmFsdWUiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJzZXRTZWxlY3Rpb25TdGFydCIsInNldFNlbGVjdGlvbkVuZCIsIm1vdXNlRG93biIsImZyb21TdGF0ZSIsInVwZGF0ZVN0YXRlIiwibmFtZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJ1cGRhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRTdGF0ZSIsImlzTW91c2VEb3duIiwicG9zc2libGVDaGFuZ2VIYW5kbGVyIiwiaXNBY3RpdmUiLCJnZXRQcmV2aW91c0NvbnRlbnQiLCJnZXRQcmV2aW91c1NlbGVjdGlvbiIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsInRhcmdldEVsZW1lbnQiLCJwcm9wZXJ0aWVzIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwiZnJvbVByb3BlcnRpZXMiLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsInByZXZlbnREZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBQSxRQUFRLGNBQVI7O0FBRUEsSUFBTUMsUUFBUUMsWUFBZCxDLENBQTRCOztBQUU1QixJQUFNQyxPQUFPSCxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNSSxZQUFZSixRQUFRLGFBQVIsQ0FBbEI7O0lBRVFLLE0sR0FBeUJGLEksQ0FBekJFLE07SUFBUUMsWSxHQUFpQkgsSSxDQUFqQkcsWTs7SUFFVkMsWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDQyxhQUFyQyxFQUFvREMsWUFBcEQsRUFBa0VDLFdBQWxFLEVBQStFO0FBQUE7O0FBQUEsNEhBQ3ZFSixRQUR1RTs7QUFHN0UsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVB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QUFDNUMsTUFBTXdCLFNBQVMsS0FBSzZCLFFBQUwsRUFBZjs7QUFFQSxNQUFJN0IsTUFBSixFQUFZO0FBQ1YsUUFBTXNELGlCQUFpQjlFLGFBQXZCOztBQUVBLFdBQU84RSxjQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJyaWNoVGV4dGFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbmNvbnN0IGRlZmVyID0gc2V0SW1tZWRpYXRlOyAvLy9cclxuXHJcbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XHJcblxyXG5jb25zdCBTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3NlbGVjdGlvbicpO1xyXG5cclxuY29uc3QgeyB3aW5kb3csIElucHV0RWxlbWVudCB9ID0gZWFzeTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIElucHV0RWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBjaGFuZ2VIYW5kbGVyO1xyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjtcclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyID0gZm9jdXNIYW5kbGVyO1xyXG4gICAgdGhpcy5ibHVySGFuZGxlciA9IGJsdXJIYW5kbGVyO1xyXG5cclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5zZXRNb3VzZURvd24oKTtcclxuXHJcbiAgICB3aW5kb3cub24oJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub24oJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5mb2N1c0hhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyLCBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYmx1ckhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uKCdibHVyJywgdGhpcy5ibHVySGFuZGxlciwgaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5zZXRNb3VzZURvd24oKTtcclxuXHJcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9jdXNIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmJsdXJIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmdldFNlbGVjdGlvblN0YXJ0KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSB0aGlzLmdldFNlbGVjdGlvbkVuZCgpLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvblN0YXJ0LCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudDsgIC8vL1xyXG5cclxuICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoc2VsZWN0aW9uU3RhcnQpO1xyXG4gICAgdGhpcy5zZXRTZWxlY3Rpb25FbmQoc2VsZWN0aW9uRW5kKTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGlzTW91c2VEb3duKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdGhpcy5mcm9tU3RhdGUoJ21vdXNlRG93bicpO1xyXG5cclxuICAgIHJldHVybiBtb3VzZURvd247XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2aW91c0NvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBwcmV2aW91c0NvbnRlbnQgPSB0aGlzLmZyb21TdGF0ZSgncHJldmlvdXNDb250ZW50Jyk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzQ29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzU2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3QgcHJldmlvdXNTZWxlY3Rpb24gPSB0aGlzLmZyb21TdGF0ZSgncHJldmlvdXNTZWxlY3Rpb24nKTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZURvd24obW91c2VEb3duKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgbW91c2VEb3duOiBtb3VzZURvd25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCkge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzQ29udGVudDogcHJldmlvdXNDb250ZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb246IHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZyb21TdGF0ZShuYW1lKSB7XHJcbiAgICBsZXQgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XHJcblxyXG4gICAgc3RhdGUgPSBzdGF0ZSB8fCB7fTsgIC8vL1xyXG5cclxuICAgIGNvbnN0IHZhbHVlID0gc3RhdGVbbmFtZV07XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU3RhdGUodXBkYXRlKSB7XHJcbiAgICBsZXQgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XHJcblxyXG4gICAgc3RhdGUgPSBzdGF0ZSB8fCB7fTsgIC8vL1xyXG5cclxuICAgIHN0YXRlID0gT2JqZWN0LmFzc2lnbihzdGF0ZSwgdXBkYXRlKTtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcclxuICB9XHJcblxyXG4gIG1vdXNlVXBIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuICB9O1xyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG4gIH1cclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IHRoaXMuaXNNb3VzZURvd24oKTtcclxuXHJcbiAgICBpZiAobW91c2VEb3duKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBrZXlEb3duSGFuZGxlcigpIHtcclxuICAgIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NzaWJsZUNoYW5nZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyhwcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgICBjaGFuZ2VkID0gY29udGVudENoYW5nZWQgfHwgc2VsZWN0aW9uQ2hhbmdlZDtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRoaXM7IC8vL1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uLCBjb250ZW50Q2hhbmdlZCwgc2VsZWN0aW9uQ2hhbmdlZCwgdGFyZ2V0RWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgIGJsdXJIYW5kbGVyID0gb25CbHVyOyAvLy9cclxuXHJcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFJpY2hUZXh0YXJlYSwgcHJvcGVydGllcywgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFJpY2hUZXh0YXJlYSwge1xyXG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXHJcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcclxuICAgIGNsYXNzTmFtZTogJ3JpY2gnXHJcbiAgfSxcclxuICBpZ25vcmVkUHJvcGVydGllczogW1xyXG4gICAgJ29uU2Nyb2xsJyxcclxuICAgICdvbkZvY3VzJyxcclxuICAgICdvbkJsdXInXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyKSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmdldFNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgc2Nyb2xsTGVmdCA9IHRoaXMuZ2V0U2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgcHJldmVudERlZmF1bHQgPSBzY3JvbGxIYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlcikge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGZvY3VzSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24pO1xyXG5cclxuICAgICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gICAgfVxyXG4gIH0uYmluZCh0aGlzKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyKGJsdXJIYW5kbGVyKSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBwcmV2ZW50RGVmYXVsdCA9IGJsdXJIYW5kbGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG4iXX0=