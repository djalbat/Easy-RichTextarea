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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIkVsZW1lbnQiLCJSaWNoVGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJzZXRNb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsInVuZGVmaW5lZCIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJiaW5kIiwiaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyIiwiaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIiLCJhZGRDbGFzcyIsIm9mZiIsInJlbW92ZUNsYXNzIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJkb21FbGVtZW50IiwiZ2V0RE9NRWxlbWVudCIsInJlYWRPbmx5IiwidmFsdWUiLCJjb250ZW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb24iLCJwcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJwcmV2aW91c1NlbGVjdGlvbiIsInNldFByZXZpb3VzU2VsZWN0aW9uIiwibW91c2VEb3duIiwiY2FsbEhhbmRsZXIiLCJpc01vdXNlRG93biIsImhhbmRsZXIiLCJmb3JjZWQiLCJpc0FjdGl2ZSIsImdldENvbnRlbnQiLCJnZXRTZWxlY3Rpb24iLCJnZXRQcmV2aW91c0NvbnRlbnQiLCJnZXRQcmV2aW91c1NlbGVjdGlvbiIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsInRhcmdldEVsZW1lbnQiLCJmcm9tU3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsIm9uQ2hhbmdlIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwicmljaFRleHRhcmVhIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXZlbnQiLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxjQUFSOztBQUVBLElBQU1DLFFBQVFDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsT0FBT0gsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUksWUFBWUosUUFBUSxhQUFSLENBQWxCOztJQUVRSyxNLEdBQW9CRixJLENBQXBCRSxNO0lBQVFDLE8sR0FBWUgsSSxDQUFaRyxPOztJQUVWQyxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUNDLGFBQXJDLEVBQW9EQyxZQUFwRCxFQUFrRUMsV0FBbEUsRUFBK0U7QUFBQTs7QUFBQSw0SEFDdkVKLFFBRHVFOztBQUc3RSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxVQUFLQyxXQUFMLEdBQW1C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QVMsSUFBZjs7QUFFQSxTQUFLSCxXQUFMLENBQWlCdkMsWUFBakIsRUFBK0IwQyxNQUEvQjtBQUNELEdBSkssQ0FJSjlCLElBSkksQ0FJQyxJQUpELENBQU47QUFLRDs7QUFFRCxTQUFTRSx1QkFBVCxDQUFpQ2IsV0FBakMsRUFBOEM7QUFDNUMsTUFBTXlDLFNBQVMsSUFBZjs7QUFFQSxPQUFLSCxXQUFMLENBQWlCdEMsV0FBakIsRUFBOEJ5QyxNQUE5QjtBQUNEIiwiZmlsZSI6InJpY2hUZXh0YXJlYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJ3NldGltbWVkaWF0ZScpO1xyXG5cclxuY29uc3QgZGVmZXIgPSBzZXRJbW1lZGlhdGU7IC8vL1xyXG5cclxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcclxuXHJcbmNvbnN0IFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2VsZWN0aW9uJyk7XHJcblxyXG5jb25zdCB7IHdpbmRvdywgRWxlbWVudCB9ID0gZWFzeTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLnNldE1vdXNlRG93bigpO1xyXG5cclxuICAgIHdpbmRvdy5vbignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZvY3VzSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ibHVySGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub24oJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCBpbnRlcm1lZGlhdGVCbHVySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLnNldE1vdXNlRG93bigpO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9mZignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5mb2N1c0hhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9mZignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYmx1ckhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9mZignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICByZXR1cm4gYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgaXNSZWFkT25seSgpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHJlYWRPbmx5ID0gZG9tRWxlbWVudC5yZWFkT25seTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICB2YWx1ZSA9IGRvbUVsZW1lbnQudmFsdWUsXHJcbiAgICAgICAgICBjb250ZW50ID0gdmFsdWU7ICAvLy9cclxuXHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IGRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvblN0YXJ0LCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIGRvbUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24sICAvLy9cclxuICAgICAgICAgIGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBkb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICBkb21FbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHNldFJlYWRPbmx5KHJlYWRPbmx5KSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcbiAgICBcclxuICAgIGRvbUVsZW1lbnQucmVhZE9ubHkgPSByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VEb3duSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5jYWxsSGFuZGxlcigpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCk7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLmNhbGxIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBrZXlEb3duSGFuZGxlcigpIHtcclxuICAgIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLmNhbGxIYW5kbGVyKCk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgdGhpcy5jYWxsSGFuZGxlcigpO1xyXG4gIH1cclxuXHJcbiAgY2FsbEhhbmRsZXIoaGFuZGxlciA9IHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgIGxldCBwcmV2aW91c0NvbnRlbnQgPSB0aGlzLmdldFByZXZpb3VzQ29udGVudCgpLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSB0aGlzLmdldFByZXZpb3VzU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBjb25zdCBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQgPSAoY29udGVudCAhPT0gcHJldmlvdXNDb250ZW50KSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbi5pc0RpZmZlcmVudFRvKHByZXZpb3VzU2VsZWN0aW9uKSxcclxuICAgICAgICAgICAgY29udGVudENoYW5nZWQgPSBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQsIC8vL1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiwgLy8vXHJcbiAgICAgICAgICAgIGNoYW5nZWQgPSBjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuICAgICAgaWYgKGNoYW5nZWQgfHwgZm9yY2VkKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRoaXM7IC8vL1xyXG5cclxuICAgICAgICBoYW5kbGVyKGNvbnRlbnQsIHNlbGVjdGlvbiwgY29udGVudENoYW5nZWQsIHNlbGVjdGlvbkNoYW5nZWQsIHRhcmdldEVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAgLy8vXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzTW91c2VEb3duKCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ21vdXNlRG93bicpOyB9XHJcblxyXG4gIGdldFByZXZpb3VzQ29udGVudCgpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCdwcmV2aW91c0NvbnRlbnQnKTsgfVxyXG5cclxuICBnZXRQcmV2aW91c1NlbGVjdGlvbigpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCdwcmV2aW91c1NlbGVjdGlvbicpOyB9XHJcblxyXG4gIHNldE1vdXNlRG93bihtb3VzZURvd24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBtb3VzZURvd246IG1vdXNlRG93blxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNDb250ZW50OiBwcmV2aW91c0NvbnRlbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbjogcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2UsXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBudWxsLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb3VzZURvd246IG1vdXNlRG93bixcclxuICAgICAgcHJldmlvdXNDb250ZW50OiBwcmV2aW91c0NvbnRlbnQsXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uOiBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXNlKCkge1xyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsLCBvbkZvY3VzLCBvbkJsdXIgfSA9IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsLCAvLy9cclxuICAgICAgICAgIGZvY3VzSGFuZGxlciA9IG9uRm9jdXMsIC8vL1xyXG4gICAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXIsIC8vL1xyXG4gICAgICAgICAgcmljaFRleHRhcmVhID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSaWNoVGV4dGFyZWEsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHJpY2hUZXh0YXJlYS5pbml0aWFsaXNlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJpY2hUZXh0YXJlYTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oUmljaFRleHRhcmVhLCB7XHJcbiAgdGFnTmFtZTogJ3RleHRhcmVhJyxcclxuICBkZWZhdWx0UHJvcGVydGllczoge1xyXG4gICAgY2xhc3NOYW1lOiAncmljaCdcclxuICB9LFxyXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXHJcbiAgICAnb25DaGFuZ2UnLFxyXG4gICAgJ29uU2Nyb2xsJyxcclxuICAgICdvbkZvY3VzJyxcclxuICAgICdvbkJsdXInXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSB0aGlzLmdldFNjcm9sbExlZnQoKTtcclxuXHJcbiAgICBzY3JvbGxIYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgZXZlbnQsIHRhcmdldEVsZW1lbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlcikge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmNhbGxIYW5kbGVyKGZvY3VzSGFuZGxlciwgZm9yY2VkKTtcclxuICB9LmJpbmQodGhpcykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlcikge1xyXG4gIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gIHRoaXMuY2FsbEhhbmRsZXIoYmx1ckhhbmRsZXIsIGZvcmNlZCk7XHJcbn1cclxuIl19