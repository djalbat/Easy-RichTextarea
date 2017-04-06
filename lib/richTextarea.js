'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('setimmediate');

var defer = setImmediate; ///

var easy = require('easy'),
    window = easy.window,
    InputElement = easy.InputElement;

var Selection = require('./selection');

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
        selection = _this.getSelection();

    _this.previousContent = content; ///
    _this.previousSelection = selection; ///

    _this.mouseDown = false;
    return _this;
  }

  _createClass(RichTextarea, [{
    key: 'activate',
    value: function activate() {
      this.mouseDown = false;

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
      this.mouseDown = false;

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
    key: 'mouseDownHandler',
    value: function mouseDownHandler() {
      this.mouseDown = true;
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      if (this.mouseDown) {
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
            selection = this.getSelection(),
            contentDifferentToPreviousContent = content !== this.previousContent,
            selectionDifferentToPreviousSelection = selection.isDifferentTo(this.previousSelection),
            contentChanged = contentDifferentToPreviousContent,
            ///
        selectionChanged = selectionDifferentToPreviousSelection,
            ///
        changed = contentChanged || selectionChanged;

        if (changed) {
          var targetElement = this; ///

          this.changeHandler(content, selection, contentChanged, selectionChanged, targetElement);
        }

        this.previousContent = content;
        this.previousSelection = selection;
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

      return InputElement.fromProperties(RichTextarea, properties, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }]);

  return RichTextarea;
}(InputElement);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIndpbmRvdyIsIklucHV0RWxlbWVudCIsIlNlbGVjdGlvbiIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsImNvbnRlbnQiLCJnZXRDb250ZW50Iiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0aW9uIiwicHJldmlvdXNDb250ZW50IiwicHJldmlvdXNTZWxlY3Rpb24iLCJtb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsInVuZGVmaW5lZCIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJiaW5kIiwiaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyIiwiaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIiLCJhZGRDbGFzcyIsIm9mZiIsInJlbW92ZUNsYXNzIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJ2YWx1ZSIsImRvbUVsZW1lbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsInJlc2l6ZUhhbmRsZXIiLCJwb3NzaWJsZUNoYW5nZUhhbmRsZXIiLCJpc0FjdGl2ZSIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsInRhcmdldEVsZW1lbnQiLCJwcm9wZXJ0aWVzIiwib25DaGFuZ2UiLCJvblNjcm9sbCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0IiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUFBLFFBQVEsY0FBUjs7QUFFQSxJQUFNQyxRQUFRQyxZQUFkLEMsQ0FBNEI7O0FBRTVCLElBQU1DLE9BQU9ILFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUksU0FBU0QsS0FBS0MsTUFEcEI7QUFBQSxJQUVNQyxlQUFlRixLQUFLRSxZQUYxQjs7QUFJQSxJQUFNQyxZQUFZTixRQUFRLGFBQVIsQ0FBbEI7O0lBRU1PLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQ0MsYUFBckMsRUFBb0RDLFlBQXBELEVBQWtFQyxXQUFsRSxFQUErRTtBQUFBOztBQUFBLDRIQUN2RUosUUFEdUU7O0FBRzdFLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFFBQU1DLFVBQVUsTUFBS0MsVUFBTCxFQUFoQjtBQUFBLFFBQ01DLFlBQVksTUFBS0MsWUFBTCxFQURsQjs7QUFHQSxVQUFLQyxlQUFMLEdBQXVCSixPQUF2QixDQVg2RSxDQVc3QztBQUNoQyxVQUFLSyxpQkFBTCxHQUF5QkgsU0FBekIsQ0FaNkUsQ0FZekM7O0FBRXBDLFVBQUtJLFNBQUwsR0FBaUIsS0FBakI7QUFkNkU7QUFl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clxucmVxdWlyZSgnc2V0aW1tZWRpYXRlJyk7XHJcblxyXG5jb25zdCBkZWZlciA9IHNldEltbWVkaWF0ZTsgLy8vXHJcblxyXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxyXG4gICAgICB3aW5kb3cgPSBlYXN5LndpbmRvdyxcclxuICAgICAgSW5wdXRFbGVtZW50ID0gZWFzeS5JbnB1dEVsZW1lbnQ7XHJcblxyXG5jb25zdCBTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3NlbGVjdGlvbicpO1xyXG5cclxuY2xhc3MgUmljaFRleHRhcmVhIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgc3VwZXIoc2VsZWN0b3IpO1xyXG5cclxuICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IGNoYW5nZUhhbmRsZXI7XHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBzY3JvbGxIYW5kbGVyO1xyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgPSBmb2N1c0hhbmRsZXI7XHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyID0gYmx1ckhhbmRsZXI7XHJcblxyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICB0aGlzLnByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7IC8vL1xyXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgLy8vXHJcblxyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB3aW5kb3cub24oJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub24oJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5mb2N1c0hhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyLCBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYmx1ckhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uKCdibHVyJywgdGhpcy5ibHVySGFuZGxlciwgaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9jdXNIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmJsdXJIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZG9tRWxlbWVudC52YWx1ZSxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvblN0YXJ0LCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gY29udGVudDsgIC8vL1xyXG5cclxuICAgIHRoaXMuZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDsgLy8vXHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uOyAgLy8vXHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247IC8vL1xyXG4gIH1cclxuXHJcbiAgb25SZXNpemUocmVzaXplSGFuZGxlcikge31cclxuXHJcbiAgb2ZmUmVzaXplKHJlc2l6ZUhhbmRsZXIpIHt9XHJcblxyXG4gIG1vdXNlVXBIYW5kbGVyKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuICB9O1xyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcigpIHtcclxuICAgIGlmICh0aGlzLm1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9zc2libGVDaGFuZ2VIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgICBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQgPSAoY29udGVudCAhPT0gdGhpcy5wcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLmlzRGlmZmVyZW50VG8odGhpcy5wcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgICBjaGFuZ2VkID0gY29udGVudENoYW5nZWQgfHwgc2VsZWN0aW9uQ2hhbmdlZDtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRoaXM7IC8vL1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uLCBjb250ZW50Q2hhbmdlZCwgc2VsZWN0aW9uQ2hhbmdlZCwgdGFyZ2V0RWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDtcclxuICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCBvblNjcm9sbCwgb25Gb2N1cywgb25CbHVyIH0gPSBwcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cclxuICAgICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgIGJsdXJIYW5kbGVyID0gb25CbHVyOyAvLy9cclxuXHJcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFJpY2hUZXh0YXJlYSwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFJpY2hUZXh0YXJlYSwge1xyXG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXHJcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcclxuICAgIGNsYXNzTmFtZTogJ3JpY2gnXHJcbiAgfSxcclxuICBpZ25vcmVkUHJvcGVydGllczogW1xyXG4gICAgJ29uQ2hhbmdlJyxcclxuICAgICdvblNjcm9sbCcsXHJcbiAgICAnb25Gb2N1cycsXHJcbiAgICAnb25CbHVyJ1xyXG4gIF1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0YXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlcikge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSB0aGlzLmdldFNjcm9sbExlZnQoKSxcclxuICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gc2Nyb2xsSGFuZGxlcihzY3JvbGxUb3AsIHNjcm9sbExlZnQpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihmb2N1c0hhbmRsZXIpIHtcclxuICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSBmb2N1c0hhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uKTtcclxuXHJcbiAgICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICAgIH1cclxuICB9LmJpbmQodGhpcykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlcikge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3QgcHJldmVudERlZmF1bHQgPSBibHVySGFuZGxlcigpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuIl19