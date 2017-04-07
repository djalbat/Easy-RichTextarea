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
        targetElement = this,
        ///
    preventDefault = scrollHandler(scrollTop, scrollLeft, targetElement);

    return preventDefault;
  }
}

function intermediateFocusHandler(focusHandler) {
  defer(function () {
    var active = this.isActive();

    if (active) {
      var content = this.getContent(),
          selection = this.getSelection(),
          targetElement = this,
          ///
      preventDefault = focusHandler(content, selection, targetElement);

      return preventDefault;
    }
  }.bind(this));
}

function intermediateBlurHandler(blurHandler) {
  var active = this.isActive();

  if (active) {
    var targetElement = this,
        ///
    preventDefault = blurHandler(targetElement);

    return preventDefault;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIklucHV0RWxlbWVudCIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsImNvbnRlbnQiLCJnZXRDb250ZW50Iiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0aW9uIiwicHJldmlvdXNDb250ZW50IiwicHJldmlvdXNTZWxlY3Rpb24iLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c1NlbGVjdGlvbiIsInNldE1vdXNlRG93biIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJtb3VzZURvd25IYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsImtleURvd25IYW5kbGVyIiwiaW5wdXRIYW5kbGVyIiwidW5kZWZpbmVkIiwiaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciIsImJpbmQiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJhY3RpdmUiLCJoYXNDbGFzcyIsInZhbHVlIiwiZ2V0VmFsdWUiLCJzZWxlY3Rpb25TdGFydCIsImdldFNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiZ2V0U2VsZWN0aW9uRW5kIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic2V0VmFsdWUiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJzZXRTZWxlY3Rpb25TdGFydCIsInNldFNlbGVjdGlvbkVuZCIsIm1vdXNlRG93biIsImZyb21TdGF0ZSIsInVwZGF0ZVN0YXRlIiwibmFtZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJ1cGRhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRTdGF0ZSIsImlzTW91c2VEb3duIiwicG9zc2libGVDaGFuZ2VIYW5kbGVyIiwiaXNBY3RpdmUiLCJnZXRQcmV2aW91c0NvbnRlbnQiLCJnZXRQcmV2aW91c1NlbGVjdGlvbiIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsInRhcmdldEVsZW1lbnQiLCJwcm9wZXJ0aWVzIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwiZnJvbVByb3BlcnRpZXMiLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsInByZXZlbnREZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBQSxRQUFRLGNBQVI7O0FBRUEsSUFBTUMsUUFBUUMsWUFBZCxDLENBQTRCOztBQUU1QixJQUFNQyxPQUFPSCxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNSSxZQUFZSixRQUFRLGFBQVIsQ0FBbEI7O0lBRVFLLE0sR0FBeUJGLEksQ0FBekJFLE07SUFBUUMsWSxHQUFpQkgsSSxDQUFqQkcsWTs7SUFFVkMsWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDQyxhQUFyQyxFQUFvREMsWUFBcEQsRUFBa0VDLFdBQWxFLEVBQStFO0FBQUE7O0FBQUEsNEhBQ3ZFSixRQUR1RTs7QUFHN0UsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVB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QixjQUFQO0FBQ0Q7QUFDRixHQVhLLENBV0o1RCxJQVhJLENBV0MsSUFYRCxDQUFOO0FBWUQ7O0FBRUQsU0FBU0UsdUJBQVQsQ0FBaUNwQixXQUFqQyxFQUE4QztBQUM1QyxNQUFNd0IsU0FBUyxLQUFLNkIsUUFBTCxFQUFmOztBQUVBLE1BQUk3QixNQUFKLEVBQVk7QUFDVixRQUFNc0MsZ0JBQWdCLElBQXRCO0FBQUEsUUFBNEI7QUFDdEJnQixxQkFBaUI5RSxZQUFZOEQsYUFBWixDQUR2Qjs7QUFHQSxXQUFPZ0IsY0FBUDtBQUNEO0FBQ0YiLCJmaWxlIjoicmljaFRleHRhcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxucmVxdWlyZSgnc2V0aW1tZWRpYXRlJyk7XHJcblxyXG5jb25zdCBkZWZlciA9IHNldEltbWVkaWF0ZTsgLy8vXHJcblxyXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZWxlY3Rpb24nKTtcclxuXHJcbmNvbnN0IHsgd2luZG93LCBJbnB1dEVsZW1lbnQgfSA9IGVhc3k7XHJcblxyXG5jbGFzcyBSaWNoVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKCk7XHJcblxyXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIsIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9jdXNIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlciwgaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmJsdXJIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIsIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKCk7XHJcblxyXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlcik7XHJcblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2ZmKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZvY3VzSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2ZmKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ibHVySGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2ZmKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBpc0FjdGl2ZSgpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCksXHJcbiAgICAgICAgICBjb250ZW50ID0gdmFsdWU7ICAvLy9cclxuXHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5nZXRTZWxlY3Rpb25TdGFydCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gdGhpcy5nZXRTZWxlY3Rpb25FbmQoKSxcclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHNlbGVjdGlvbkVuZCwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29udGVudChjb250ZW50KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KHNlbGVjdGlvblN0YXJ0KTtcclxuICAgIHRoaXMuc2V0U2VsZWN0aW9uRW5kKHNlbGVjdGlvbkVuZCk7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBpc01vdXNlRG93bigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IHRoaXMuZnJvbVN0YXRlKCdtb3VzZURvd24nKTtcclxuXHJcbiAgICByZXR1cm4gbW91c2VEb3duO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xyXG4gICAgY29uc3QgcHJldmlvdXNDb250ZW50ID0gdGhpcy5mcm9tU3RhdGUoJ3ByZXZpb3VzQ29udGVudCcpO1xyXG5cclxuICAgIHJldHVybiBwcmV2aW91c0NvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2aW91c1NlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5mcm9tU3RhdGUoJ3ByZXZpb3VzU2VsZWN0aW9uJyk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0TW91c2VEb3duKG1vdXNlRG93bikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93bjogbW91c2VEb3duXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c0NvbnRlbnQ6IHByZXZpb3VzQ29udGVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uOiBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmcm9tU3RhdGUobmFtZSkge1xyXG4gICAgbGV0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xyXG5cclxuICAgIHN0YXRlID0gc3RhdGUgfHwge307ICAvLy9cclxuXHJcbiAgICBjb25zdCB2YWx1ZSA9IHN0YXRlW25hbWVdO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVN0YXRlKHVwZGF0ZSkge1xyXG4gICAgbGV0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xyXG5cclxuICAgIHN0YXRlID0gc3RhdGUgfHwge307ICAvLy9cclxuXHJcbiAgICBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oc3RhdGUsIHVwZGF0ZSk7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VEb3duSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCk7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9zc2libGVDaGFuZ2VIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgbGV0IHByZXZpb3VzQ29udGVudCA9IHRoaXMuZ2V0UHJldmlvdXNDb250ZW50KCksXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHRoaXMuZ2V0UHJldmlvdXNTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCA9IChjb250ZW50ICE9PSBwcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLmlzRGlmZmVyZW50VG8ocHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgICBjb250ZW50Q2hhbmdlZCA9IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCwgLy8vXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uLCAvLy9cclxuICAgICAgICAgICAgY2hhbmdlZCA9IGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSB0aGlzOyAvLy9cclxuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyKGNvbnRlbnQsIHNlbGVjdGlvbiwgY29udGVudENoYW5nZWQsIHNlbGVjdGlvbkNoYW5nZWQsIHRhcmdldEVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAgLy8vXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICBjb25zdCB7IG9uU2Nyb2xsLCBvbkZvY3VzLCBvbkJsdXIgfSA9IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1cjsgLy8vXHJcblxyXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhSaWNoVGV4dGFyZWEsIHByb3BlcnRpZXMsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihSaWNoVGV4dGFyZWEsIHtcclxuICB0YWdOYW1lOiAndGV4dGFyZWEnLFxyXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XHJcbiAgICBjbGFzc05hbWU6ICdyaWNoJ1xyXG4gIH0sXHJcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcclxuICAgICdvblNjcm9sbCcsXHJcbiAgICAnb25Gb2N1cycsXHJcbiAgICAnb25CbHVyJ1xyXG4gIF1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0YXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlcikge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSB0aGlzLmdldFNjcm9sbExlZnQoKSxcclxuICAgICAgICAgIHRhcmdldEVsZW1lbnQgPSB0aGlzLCAvLy9cclxuICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gc2Nyb2xsSGFuZGxlcihzY3JvbGxUb3AsIHNjcm9sbExlZnQsIHRhcmdldEVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihmb2N1c0hhbmRsZXIpIHtcclxuICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgICAgdGFyZ2V0RWxlbWVudCA9IHRoaXMsIC8vL1xyXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGZvY3VzSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24sIHRhcmdldEVsZW1lbnQpO1xyXG5cclxuICAgICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gICAgfVxyXG4gIH0uYmluZCh0aGlzKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyKGJsdXJIYW5kbGVyKSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gdGhpcywgLy8vXHJcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGJsdXJIYW5kbGVyKHRhcmdldEVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuIl19