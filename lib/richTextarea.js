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

    _this.setInitialState();
    return _this;
  }

  _createClass(RichTextarea, [{
    key: 'activate',
    value: function activate() {
      var mouseDown = false;

      this.setMouseDown(mouseDown);

      window.on('mouseup contextmenu blur', this.mouseUpHandler, this); ///

      this.on('mousedown', this.mouseDownHandler, this);

      this.on('mousemove', this.mouseMoveHandler, this);

      this.on('keydown', this.keyDownHandler, this);

      this.on('input', this.inputHandler, this);

      if (this.scrollHandler !== undefined) {
        this.on('scroll', this.scrollHandler, null, intermediateScrollHandler.bind(this));
      }

      if (this.focusHandler !== undefined) {
        this.on('focus', this.focusHandler, null, intermediateFocusHandler.bind(this));
      }

      if (this.blurHandler !== undefined) {
        this.on('blur', this.blurHandler, null, intermediateBlurHandler.bind(this));
      }

      this.addClass('active');
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      var mouseDown = false;

      this.setMouseDown(mouseDown);

      window.off('mouseup contextmenu blur', this.mouseUpHandler, this); ///

      this.off('mousedown', this.mouseDownHandler, this);

      this.off('mousemove', this.mouseMoveHandler, this);

      this.off('keydown', this.keyDownHandler, this);

      this.off('input', this.inputHandler, this);

      if (this.scrollHandler !== undefined) {
        this.off('scroll', this.scrollHandler, null);
      }

      if (this.focusHandler !== undefined) {
        this.off('focus', this.focusHandler, null);
      }

      if (this.blurHandler !== undefined) {
        this.off('blur', this.blurHandler, null);
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
    key: 'isReadOnly',
    value: function isReadOnly() {
      var domElement = this.getDOMElement(),
          readOnly = domElement.readOnly;

      return readOnly;
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      var domElement = this.getDOMElement(),
          value = domElement.value,
          content = value; ///

      return content;
    }
  }, {
    key: 'getSelection',
    value: function getSelection() {
      var domElement = this.getDOMElement(),
          selectionStart = domElement.selectionStart,
          selectionEnd = domElement.selectionEnd,
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
      previousContent = content,
          ///
      domElement = this.getDOMElement();

      domElement.value = value;

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
      previousSelection = selection,
          ///
      domElement = this.getDOMElement();

      domElement.selectionStart = selectionStart;
      domElement.selectionEnd = selectionEnd;

      this.setPreviousSelection(previousSelection);
    }
  }, {
    key: 'setReadOnly',
    value: function setReadOnly(readOnly) {
      var domElement = this.getDOMElement();

      domElement.readOnly = readOnly;
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
  }, {
    key: 'isMouseDown',
    value: function isMouseDown() {
      return this.fromState('mouseDown');
    }
  }, {
    key: 'getPreviousContent',
    value: function getPreviousContent() {
      return this.fromState('previousContent');
    }
  }, {
    key: 'getPreviousSelection',
    value: function getPreviousSelection() {
      return this.fromState('previousSelection');
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
    key: 'setInitialState',
    value: function setInitialState() {
      var mouseDown = false,
          previousContent = null,
          previousSelection = null;

      this.setState({
        mouseDown: mouseDown,
        previousContent: previousContent,
        previousSelection: previousSelection
      });
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      var content = this.getContent(),
          selection = this.getSelection(),
          previousContent = content,
          ///
      previousSelection = selection; ///

      this.setPreviousContent(previousContent);
      this.setPreviousSelection(previousSelection);
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
          blurHandler = onBlur,
          richTextarea = Element.fromProperties(RichTextarea, properties, changeHandler, scrollHandler, focusHandler, blurHandler);


      richTextarea.initialise();

      return richTextarea;
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

function intermediateScrollHandler(scrollHandler, event, targetElement) {
  var active = this.isActive();

  if (active) {
    var scrollTop = this.getScrollTop(),
        scrollLeft = this.getScrollLeft();

    scrollHandler(scrollTop, scrollLeft, event, targetElement);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIkVsZW1lbnQiLCJSaWNoVGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJtb3VzZURvd24iLCJzZXRNb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsInVuZGVmaW5lZCIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJiaW5kIiwiaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyIiwiaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIiLCJhZGRDbGFzcyIsIm9mZiIsInJlbW92ZUNsYXNzIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJkb21FbGVtZW50IiwiZ2V0RE9NRWxlbWVudCIsInJlYWRPbmx5IiwidmFsdWUiLCJjb250ZW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb24iLCJwcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJwcmV2aW91c1NlbGVjdGlvbiIsInNldFByZXZpb3VzU2VsZWN0aW9uIiwiY2FsbEhhbmRsZXIiLCJpc01vdXNlRG93biIsImhhbmRsZXIiLCJmb3JjZWQiLCJpc0FjdGl2ZSIsImdldENvbnRlbnQiLCJnZXRTZWxlY3Rpb24iLCJnZXRQcmV2aW91c0NvbnRlbnQiLCJnZXRQcmV2aW91c1NlbGVjdGlvbiIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsInRhcmdldEVsZW1lbnQiLCJmcm9tU3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsIm9uQ2hhbmdlIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwicmljaFRleHRhcmVhIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXZlbnQiLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxjQUFSOztBQUVBLElBQU1DLFFBQVFDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsT0FBT0gsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUksWUFBWUosUUFBUSxhQUFSLENBQWxCOztJQUVRSyxNLEdBQW9CRixJLENBQXBCRSxNO0lBQVFDLE8sR0FBWUgsSSxDQUFaRyxPOztJQUVWQyxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUNDLGFBQXJDLEVBQW9EQyxZQUFwRCxFQUFrRUMsV0FBbEUsRUFBK0U7QUFBQTs7QUFBQSw0SEFDdkVKLFFBRHVFOztBQUc3RSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxVQUFLQyxXQUFMLEdBQW1C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QUVBLE1BQUl4QixNQUFKLEVBQVk7QUFDVixRQUFNd0QsWUFBWSxLQUFLQyxZQUFMLEVBQWxCO0FBQUEsUUFDTUMsYUFBYSxLQUFLQyxhQUFMLEVBRG5COztBQUdBL0Usa0JBQWM0RSxTQUFkLEVBQXlCRSxVQUF6QixFQUFxQ0gsS0FBckMsRUFBNENwQixhQUE1QztBQUNEO0FBQ0Y7O0FBRUQsU0FBU3hDLHdCQUFULENBQWtDZCxZQUFsQyxFQUFnRDtBQUM5Q1YsUUFBTSxZQUFXO0FBQ2YsUUFBTW9ELFNBQVMsSUFBZjs7QUFFQSxTQUFLSCxXQUFMLENBQWlCdkMsWUFBakIsRUFBK0IwQyxNQUEvQjtBQUNELEdBSkssQ0FJSjdCLElBSkksQ0FJQyxJQUpELENBQU47QUFLRDs7QUFFRCxTQUFTRSx1QkFBVCxDQUFpQ2QsV0FBakMsRUFBOEM7QUFDNUMsTUFBTXlDLFNBQVMsSUFBZjs7QUFFQSxPQUFLSCxXQUFMLENBQWlCdEMsV0FBakIsRUFBOEJ5QyxNQUE5QjtBQUNEIiwiZmlsZSI6InJpY2hUZXh0YXJlYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJ3NldGltbWVkaWF0ZScpO1xyXG5cclxuY29uc3QgZGVmZXIgPSBzZXRJbW1lZGlhdGU7IC8vL1xyXG5cclxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcclxuXHJcbmNvbnN0IFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2VsZWN0aW9uJyk7XHJcblxyXG5jb25zdCB7IHdpbmRvdywgRWxlbWVudCB9ID0gZWFzeTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub24oJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIsIG51bGwsIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9jdXNIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlciwgbnVsbCwgaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmJsdXJIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIsIG51bGwsIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9jdXNIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmJsdXJIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vZmYoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGlzUmVhZE9ubHkoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICByZWFkT25seSA9IGRvbUVsZW1lbnQucmVhZE9ubHk7XHJcbiAgICBcclxuICAgIHJldHVybiByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgdmFsdWUgPSBkb21FbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBkb21FbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHNlbGVjdGlvbkVuZCwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29udGVudChjb250ZW50KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBkb21FbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xyXG4gICAgZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBzZXRSZWFkT25seShyZWFkT25seSkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG4gICAgXHJcbiAgICBkb21FbGVtZW50LnJlYWRPbmx5ID0gcmVhZE9ubHk7IFxyXG4gIH1cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgZGVmZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuY2FsbEhhbmRsZXIoKTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZU1vdmVIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdGhpcy5pc01vdXNlRG93bigpO1xyXG5cclxuICAgIGlmIChtb3VzZURvd24pIHtcclxuICAgICAgdGhpcy5jYWxsSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5jYWxsSGFuZGxlcigpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICAgIHRoaXMuY2FsbEhhbmRsZXIoKTtcclxuICB9XHJcblxyXG4gIGNhbGxIYW5kbGVyKGhhbmRsZXIgPSB0aGlzLmNoYW5nZUhhbmRsZXIsIGZvcmNlZCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyhwcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgICBjaGFuZ2VkID0gY29udGVudENoYW5nZWQgfHwgc2VsZWN0aW9uQ2hhbmdlZDtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkIHx8IGZvcmNlZCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSB0aGlzOyAvLy9cclxuXHJcbiAgICAgICAgaGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkLCB0YXJnZXRFbGVtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudDsgIC8vL1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc01vdXNlRG93bigpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCdtb3VzZURvd24nKTsgfVxyXG5cclxuICBnZXRQcmV2aW91c0NvbnRlbnQoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgncHJldmlvdXNDb250ZW50Jyk7IH1cclxuXHJcbiAgZ2V0UHJldmlvdXNTZWxlY3Rpb24oKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgncHJldmlvdXNTZWxlY3Rpb24nKTsgfVxyXG5cclxuICBzZXRNb3VzZURvd24obW91c2VEb3duKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgbW91c2VEb3duOiBtb3VzZURvd25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCkge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzQ29udGVudDogcHJldmlvdXNDb250ZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb246IHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gbnVsbCxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW91c2VEb3duOiBtb3VzZURvd24sXHJcbiAgICAgIHByZXZpb3VzQ29udGVudDogcHJldmlvdXNDb250ZW50LFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbjogcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGlzZSgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCBvblNjcm9sbCwgb25Gb2N1cywgb25CbHVyIH0gPSBwcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cclxuICAgICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgIGJsdXJIYW5kbGVyID0gb25CbHVyLCAvLy9cclxuICAgICAgICAgIHJpY2hUZXh0YXJlYSA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoUmljaFRleHRhcmVhLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICByaWNoVGV4dGFyZWEuaW5pdGlhbGlzZSgpO1xyXG5cclxuICAgIHJldHVybiByaWNoVGV4dGFyZWE7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFJpY2hUZXh0YXJlYSwge1xyXG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXHJcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcclxuICAgIGNsYXNzTmFtZTogJ3JpY2gnXHJcbiAgfSxcclxuICBpZ25vcmVkUHJvcGVydGllczogW1xyXG4gICAgJ29uQ2hhbmdlJyxcclxuICAgICdvblNjcm9sbCcsXHJcbiAgICAnb25Gb2N1cycsXHJcbiAgICAnb25CbHVyJ1xyXG4gIF1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0YXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcclxuICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gIGlmIChhY3RpdmUpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZ2V0U2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gdGhpcy5nZXRTY3JvbGxMZWZ0KCk7XHJcblxyXG4gICAgc2Nyb2xsSGFuZGxlcihzY3JvbGxUb3AsIHNjcm9sbExlZnQsIGV2ZW50LCB0YXJnZXRFbGVtZW50KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihmb2N1c0hhbmRsZXIpIHtcclxuICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5jYWxsSGFuZGxlcihmb2N1c0hhbmRsZXIsIGZvcmNlZCk7XHJcbiAgfS5iaW5kKHRoaXMpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIoYmx1ckhhbmRsZXIpIHtcclxuICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICB0aGlzLmNhbGxIYW5kbGVyKGJsdXJIYW5kbGVyLCBmb3JjZWQpO1xyXG59XHJcbiJdfQ==