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

    _this.changeHandlers = [];

    if (changeHandler !== undefined) {
      _this.onChange(changeHandler);
    }

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
    key: 'onChange',
    value: function onChange(changeHandler) {
      var regardless = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      Object.assign({
        regardless: regardless
      });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIndpbmRvdyIsIklucHV0RWxlbWVudCIsIlNlbGVjdGlvbiIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsImNoYW5nZUhhbmRsZXJzIiwidW5kZWZpbmVkIiwib25DaGFuZ2UiLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsInByZXZpb3VzQ29udGVudCIsInByZXZpb3VzU2VsZWN0aW9uIiwibW91c2VEb3duIiwib24iLCJtb3VzZVVwSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJtb3VzZU1vdmVIYW5kbGVyIiwia2V5RG93bkhhbmRsZXIiLCJpbnB1dEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyIiwiYmluZCIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiYWRkQ2xhc3MiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImFjdGl2ZSIsImhhc0NsYXNzIiwidmFsdWUiLCJkb21FbGVtZW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJyZWdhcmRsZXNzIiwiT2JqZWN0IiwiYXNzaWduIiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImRlbGV0ZUNvdW50Iiwic3BsaWNlIiwicmVzaXplSGFuZGxlciIsInBvc3NpYmxlQ2hhbmdlSGFuZGxlciIsImlzQWN0aXZlIiwiY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJjb250ZW50Q2hhbmdlZCIsInNlbGVjdGlvbkNoYW5nZWQiLCJjaGFuZ2VkIiwiZm9yRWFjaCIsInByb3BlcnRpZXMiLCJvblNjcm9sbCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJmcm9tUHJvcGVydGllcyIsInRhZ05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsInByZXZlbnREZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBQSxRQUFRLGNBQVI7O0FBRUEsSUFBTUMsUUFBUUMsWUFBZCxDLENBQTRCOztBQUU1QixJQUFNQyxPQUFPSCxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01JLFNBQVNELEtBQUtDLE1BRHBCO0FBQUEsSUFFTUMsZUFBZUYsS0FBS0UsWUFGMUI7O0FBSUEsSUFBTUMsWUFBWU4sUUFBUSxhQUFSLENBQWxCOztJQUVNTyxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUNDLGFBQXJDLEVBQW9EQyxZQUFwRCxFQUFrRUMsV0FBbEUsRUFBK0U7QUFBQTs7QUFBQSw0SEFDdkVKLFFBRHVFOztBQUc3RSxVQUFLSyxjQUFMLEdBQXNCLEVBQXRCOztBQUVBLFFBQUlKLGtCQUFrQkssU0FBdEIsRUFBaUM7QUFDL0IsWUFBS0MsUUFBTCxDQUFjTixhQUFkO0FBQ0Q7O0FBRUQsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFFBQU1JLFVBQVUsTUFBS0MsVUFBTCxFQUFoQjtBQUFBLFFBQ01DLFlBQVksTUFBS0MsWUFBTCxFQURsQjs7QUFHQSxVQUFLQyxlQUFMLEdB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Q1YsUUFBTSxZQUFXO0FBQ2YsUUFBTW1DLFNBQVMsS0FBS3NCLFFBQUwsRUFBZjs7QUFFQSxRQUFJdEIsTUFBSixFQUFZO0FBQ1YsVUFBTXBCLFVBQVUsS0FBS0MsVUFBTCxFQUFoQjtBQUFBLFVBQ01DLFlBQVksS0FBS0MsWUFBTCxFQURsQjtBQUFBLFVBRU00RCxpQkFBaUJwRSxhQUFhSyxPQUFiLEVBQXNCRSxTQUF0QixDQUZ2Qjs7QUFJQSxhQUFPNkQsY0FBUDtBQUNEO0FBQ0YsR0FWSyxDQVVKakQsSUFWSSxDQVVDLElBVkQsQ0FBTjtBQVdEOztBQUVELFNBQVNFLHVCQUFULENBQWlDcEIsV0FBakMsRUFBOEM7QUFDNUMsTUFBTXdCLFNBQVMsS0FBS3NCLFFBQUwsRUFBZjs7QUFFQSxNQUFJdEIsTUFBSixFQUFZO0FBQ1YsUUFBTTJDLGlCQUFpQm5FLGFBQXZCOztBQUVBLFdBQU9tRSxjQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJyaWNoVGV4dGFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbmNvbnN0IGRlZmVyID0gc2V0SW1tZWRpYXRlOyAvLy9cclxuXHJcbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXHJcbiAgICAgIHdpbmRvdyA9IGVhc3kud2luZG93LFxyXG4gICAgICBJbnB1dEVsZW1lbnQgPSBlYXN5LklucHV0RWxlbWVudDtcclxuXHJcbmNvbnN0IFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2VsZWN0aW9uJyk7XHJcblxyXG5jbGFzcyBSaWNoVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVycyA9IFtdO1xyXG5cclxuICAgIGlmIChjaGFuZ2VIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBzY3JvbGxIYW5kbGVyO1xyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgPSBmb2N1c0hhbmRsZXI7XHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyID0gYmx1ckhhbmRsZXI7XHJcblxyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICB0aGlzLnByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7IC8vL1xyXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgLy8vXHJcblxyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB3aW5kb3cub24oJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub24oJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5mb2N1c0hhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyLCBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYmx1ckhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uKCdibHVyJywgdGhpcy5ibHVySGFuZGxlciwgaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9jdXNIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmJsdXJIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZG9tRWxlbWVudC52YWx1ZSxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvblN0YXJ0LCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gY29udGVudDsgIC8vL1xyXG5cclxuICAgIHRoaXMuZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDsgLy8vXHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uOyAgLy8vXHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247IC8vL1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgcmVnYXJkbGVzcyA9IGZhbHNlKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHtcclxuICAgICAgcmVnYXJkbGVzczogcmVnYXJkbGVzc1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVycy5wdXNoKGNoYW5nZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgb2ZmQ2hhbmdlKGNoYW5nZUhhbmRsZXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGFuZ2VIYW5kbGVycy5pbmRleE9mKGNoYW5nZUhhbmRsZXIpO1xyXG5cclxuICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgIGNvbnN0IGRlbGV0ZUNvdW50ID0gMTtcclxuXHJcbiAgICAgIHRoaXMuY2hhbmdlSGFuZGxlcnMuc3BsaWNlKGluZGV4LCBkZWxldGVDb3VudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJlc2l6ZShyZXNpemVIYW5kbGVyKSB7fVxyXG5cclxuICBvZmZSZXNpemUocmVzaXplSGFuZGxlcikge31cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBtb3VzZU1vdmVIYW5kbGVyKCkge1xyXG4gICAgaWYgKHRoaXMubW91c2VEb3duKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBrZXlEb3duSGFuZGxlcigpIHtcclxuICAgIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NzaWJsZUNoYW5nZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCksXHJcbiAgICAgICAgICBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHRoaXMucHJldmlvdXNDb250ZW50KSxcclxuICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyh0aGlzLnByZXZpb3VzU2VsZWN0aW9uKSxcclxuICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uLCAvLy9cclxuICAgICAgICAgIGNoYW5nZWQgPSBjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlSGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihjaGFuZ2VIYW5kbGVyKSB7XHJcbiAgICAgICAgaWYgKGFjdGl2ZSB8fCBjaGFuZ2VIYW5kbGVyLnJlZ2FyZGxlc3MpIHsgIC8vL1xyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDtcclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1cjsgLy8vXHJcblxyXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhSaWNoVGV4dGFyZWEsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihSaWNoVGV4dGFyZWEsIHtcclxuICB0YWdOYW1lOiAndGV4dGFyZWEnLFxyXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXHJcbiAgICAnb25DaGFuZ2UnLFxyXG4gICAgJ29uU2Nyb2xsJyxcclxuICAgICdvbkZvY3VzJyxcclxuICAgICdvbkJsdXInXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyKSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmdldFNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgc2Nyb2xsTGVmdCA9IHRoaXMuZ2V0U2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgcHJldmVudERlZmF1bHQgPSBzY3JvbGxIYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlcikge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGZvY3VzSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24pO1xyXG5cclxuICAgICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gICAgfVxyXG4gIH0uYmluZCh0aGlzKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyKGJsdXJIYW5kbGVyKSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBwcmV2ZW50RGVmYXVsdCA9IGJsdXJIYW5kbGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG4iXX0=