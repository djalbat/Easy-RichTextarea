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
    key: 'getPreviousContent',
    value: function getPreviousContent() {
      var state = this.getState(),
          previousContent = state.previousContent;


      return previousContent;
    }
  }, {
    key: 'getPreviousSelection',
    value: function getPreviousSelection() {
      var state = this.getState(),
          previousSelection = state.previousSelection;


      return previousSelection;
    }
  }, {
    key: 'isMouseDown',
    value: function isMouseDown() {
      var state = this.getState(),
          mouseDown = state.mouseDown;


      return mouseDown;
    }
  }, {
    key: 'setMouseUp',
    value: function setMouseUp() {
      var mouseDown = false;

      var state = this.getState();

      state = Object.assign(state, {
        mouseDown: mouseDown
      });

      this.setState(state);
    }
  }, {
    key: 'setMouseDown',
    value: function setMouseDown() {
      var mouseDown = true;

      var state = this.getState();

      state = Object.assign(state, {
        mouseDown: mouseDown
      });

      this.setState(state);
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
    key: 'setPreviousContent',
    value: function setPreviousContent(previousContent) {
      var state = this.getState();

      state = Object.assign(state, {
        previousContent: previousContent
      });

      this.setState(state);
    }
  }, {
    key: 'setPreviousSelection',
    value: function setPreviousSelection(previousSelection) {
      var state = this.getState();

      state = Object.assign(state, {
        previousSelection: previousSelection
      });

      this.setState(state);
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler() {
      this.setMouseUp();
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler() {
      this.setMouseDown();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIndpbmRvdyIsIklucHV0RWxlbWVudCIsIlNlbGVjdGlvbiIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsImNvbnRlbnQiLCJnZXRDb250ZW50Iiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0aW9uIiwicHJldmlvdXNDb250ZW50IiwicHJldmlvdXNTZWxlY3Rpb24iLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c1NlbGVjdGlvbiIsInNldE1vdXNlRG93biIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJtb3VzZURvd25IYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsImtleURvd25IYW5kbGVyIiwiaW5wdXRIYW5kbGVyIiwidW5kZWZpbmVkIiwiaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciIsImJpbmQiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJhY3RpdmUiLCJoYXNDbGFzcyIsInZhbHVlIiwiZ2V0VmFsdWUiLCJzZWxlY3Rpb25TdGFydCIsImdldFNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiZ2V0U2VsZWN0aW9uRW5kIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsIm1vdXNlRG93biIsIk9iamVjdCIsImFzc2lnbiIsInNldFN0YXRlIiwic2V0VmFsdWUiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJzZXRTZWxlY3Rpb25TdGFydCIsInNldFNlbGVjdGlvbkVuZCIsInNldE1vdXNlVXAiLCJpc01vdXNlRG93biIsInBvc3NpYmxlQ2hhbmdlSGFuZGxlciIsImlzQWN0aXZlIiwiZ2V0UHJldmlvdXNDb250ZW50IiwiZ2V0UHJldmlvdXNTZWxlY3Rpb24iLCJjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uIiwiaXNEaWZmZXJlbnRUbyIsImNvbnRlbnRDaGFuZ2VkIiwic2VsZWN0aW9uQ2hhbmdlZCIsImNoYW5nZWQiLCJ0YXJnZXRFbGVtZW50IiwicHJvcGVydGllcyIsIm9uQ2hhbmdlIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwiZnJvbVByb3BlcnRpZXMiLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsInByZXZlbnREZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBQSxRQUFRLGNBQVI7O0FBRUEsSUFBTUMsUUFBUUMsWUFBZCxDLENBQTRCOztBQUU1QixJQUFNQyxPQUFPSCxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01JLFNBQVNELEtBQUtDLE1BRHBCO0FBQUEsSUFFTUMsZUFBZUYsS0FBS0UsWUFGMUI7O0FBSUEsSUFBTUMsWUFBWU4sUUFBUSxhQUFSLENBQWxCOztJQUVNTyxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUNDLGFBQXJDLEVBQW9EQyxZQUFwRCxFQUFrRUMsV0FBbEUsRUFBK0U7QUFBQTs7QUFBQSw0SEFDdkVKLFFBRHVFOztBQUc3RSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsWUFBTCxHQUFv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VUFBTXZCLFVBQVUsS0FBS0MsVUFBTCxFQUFoQjtBQUFBLFVBQ01DLFlBQVksS0FBS0MsWUFBTCxFQURsQjtBQUFBLFVBRU13RSxpQkFBaUI3RSxhQUFhRSxPQUFiLEVBQXNCRSxTQUF0QixDQUZ2Qjs7QUFJQSxhQUFPeUUsY0FBUDtBQUNEO0FBQ0YsR0FWSyxDQVVKMUQsSUFWSSxDQVVDLElBVkQsQ0FBTjtBQVdEOztBQUVELFNBQVNFLHVCQUFULENBQWlDcEIsV0FBakMsRUFBOEM7QUFDNUMsTUFBTXdCLFNBQVMsS0FBSzBCLFFBQUwsRUFBZjs7QUFFQSxNQUFJMUIsTUFBSixFQUFZO0FBQ1YsUUFBTW9ELGlCQUFpQjVFLGFBQXZCOztBQUVBLFdBQU80RSxjQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJyaWNoVGV4dGFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbmNvbnN0IGRlZmVyID0gc2V0SW1tZWRpYXRlOyAvLy9cclxuXHJcbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXHJcbiAgICAgIHdpbmRvdyA9IGVhc3kud2luZG93LFxyXG4gICAgICBJbnB1dEVsZW1lbnQgPSBlYXN5LklucHV0RWxlbWVudDtcclxuXHJcbmNvbnN0IFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2VsZWN0aW9uJyk7XHJcblxyXG5jbGFzcyBSaWNoVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKCk7XHJcblxyXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIsIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9jdXNIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlciwgaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmJsdXJIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIsIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKCk7XHJcblxyXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlcik7XHJcblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2ZmKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZvY3VzSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2ZmKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ibHVySGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2ZmKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBpc0FjdGl2ZSgpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCksXHJcbiAgICAgICAgICBjb250ZW50ID0gdmFsdWU7ICAvLy9cclxuXHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5nZXRTZWxlY3Rpb25TdGFydCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gdGhpcy5nZXRTZWxlY3Rpb25FbmQoKSxcclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHNlbGVjdGlvbkVuZCwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzQ29udGVudCB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzQ29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzU2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzU2VsZWN0aW9uIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBpc01vdXNlRG93bigpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBtb3VzZURvd24gfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBtb3VzZURvd247XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZVVwKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xyXG5cclxuICAgIHN0YXRlID0gT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xyXG4gICAgICBtb3VzZURvd246IG1vdXNlRG93blxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZURvd24oKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0cnVlO1xyXG5cclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcclxuXHJcbiAgICBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcclxuICAgICAgbW91c2VEb3duOiBtb3VzZURvd25cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29udGVudChjb250ZW50KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KHNlbGVjdGlvblN0YXJ0KTtcclxuICAgIHRoaXMuc2V0U2VsZWN0aW9uRW5kKHNlbGVjdGlvbkVuZCk7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XHJcbiAgICBsZXQgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XHJcblxyXG4gICAgc3RhdGUgPSBPYmplY3QuYXNzaWduKHN0YXRlLCB7XHJcbiAgICAgIHByZXZpb3VzQ29udGVudDogcHJldmlvdXNDb250ZW50XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKSB7XHJcbiAgICBsZXQgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XHJcblxyXG4gICAgc3RhdGUgPSBPYmplY3QuYXNzaWduKHN0YXRlLCB7XHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uOiBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIHRoaXMuc2V0TW91c2VVcCgpO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLnNldE1vdXNlRG93bigpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IHRoaXMuaXNNb3VzZURvd24oKTtcclxuXHJcbiAgICBpZiAobW91c2VEb3duKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBrZXlEb3duSGFuZGxlcigpIHtcclxuICAgIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NzaWJsZUNoYW5nZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyhwcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgICBjaGFuZ2VkID0gY29udGVudENoYW5nZWQgfHwgc2VsZWN0aW9uQ2hhbmdlZDtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRoaXM7IC8vL1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uLCBjb250ZW50Q2hhbmdlZCwgc2VsZWN0aW9uQ2hhbmdlZCwgdGFyZ2V0RWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsLCBvbkZvY3VzLCBvbkJsdXIgfSA9IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsLCAvLy9cclxuICAgICAgICAgIGZvY3VzSGFuZGxlciA9IG9uRm9jdXMsIC8vL1xyXG4gICAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXI7IC8vL1xyXG5cclxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoUmljaFRleHRhcmVhLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oUmljaFRleHRhcmVhLCB7XHJcbiAgdGFnTmFtZTogJ3RleHRhcmVhJyxcclxuICBkZWZhdWx0UHJvcGVydGllczoge1xyXG4gICAgY2xhc3NOYW1lOiAncmljaCdcclxuICB9LFxyXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXHJcbiAgICAnb25DaGFuZ2UnLFxyXG4gICAgJ29uU2Nyb2xsJyxcclxuICAgICdvbkZvY3VzJyxcclxuICAgICdvbkJsdXInXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyKSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmdldFNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgc2Nyb2xsTGVmdCA9IHRoaXMuZ2V0U2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgcHJldmVudERlZmF1bHQgPSBzY3JvbGxIYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlcikge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGZvY3VzSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24pO1xyXG5cclxuICAgICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gICAgfVxyXG4gIH0uYmluZCh0aGlzKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyKGJsdXJIYW5kbGVyKSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBwcmV2ZW50RGVmYXVsdCA9IGJsdXJIYW5kbGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG4iXX0=