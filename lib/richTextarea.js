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

      this.scrollHandler && this.on('scroll', this.scrollHandler, this, intermediateScrollHandler);

      this.focusHandler && this.on('focus', this.focusHandler, this, intermediateFocusHandler);

      this.blurHandler && this.on('blur', this.blurHandler, this, intermediateBlurHandler);

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

      this.scrollHandler && this.off('scroll', this.scrollHandler, this);

      this.focusHandler && this.off('focus', this.focusHandler, this);

      this.blurHandler && this.off('blur', this.blurHandler, this);

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
      selection = Selection.fromStartPositionAndEndPosition(startPosition, endPosition);

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
      var _this2 = this;

      var mouseDown = true;

      this.setMouseDown(mouseDown);

      defer(function () {
        return _this2.intermediateHandler(_this2.changeHandler);
      });
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      var mouseDown = this.isMouseDown();

      if (mouseDown) {
        this.intermediateHandler(this.changeHandler);
      }
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler() {
      var _this3 = this;

      defer(function () {
        return _this3.intermediateHandler(_this3.changeHandler);
      });
    }
  }, {
    key: 'inputHandler',
    value: function inputHandler() {
      this.intermediateHandler(this.changeHandler);
    }
  }, {
    key: 'intermediateHandler',
    value: function intermediateHandler(handler) {
      var forced = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var active = this.isActive();

      if (active) {
        var content = this.getContent(),
            selection = this.getSelection();

        var previousContent = this.getPreviousContent(),
            previousSelection = this.getPreviousSelection();

        var element = this,
            ///
        contentDifferentToPreviousContent = content !== previousContent,
            selectionDifferentToPreviousSelection = selection.isDifferentTo(previousSelection),
            contentChanged = contentDifferentToPreviousContent,
            ///
        selectionChanged = selectionDifferentToPreviousSelection,
            ///
        changed = contentChanged || selectionChanged;

        if (changed || forced) {
          handler.call(this, content, selection, contentChanged, selectionChanged, element);
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
      var state = this.getState(),
          mouseDown = state.mouseDown;


      return mouseDown;
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

function intermediateScrollHandler(scrollHandler, event, element) {
  var active = element.isActive();

  if (active) {
    var scrollTop = element.getScrollTop(),
        scrollLeft = element.getScrollLeft();

    scrollHandler.call(element, scrollTop, scrollLeft, event);
  }
}

function intermediateFocusHandler(focusHandler, event, element) {
  defer(function () {
    var forced = true;

    element.intermediateHandler(focusHandler, forced);
  });
}

function intermediateBlurHandler(blurHandler, event, element) {
  var forced = true;

  element.intermediateHandler(blurHandler, forced);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIkVsZW1lbnQiLCJSaWNoVGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJtb3VzZURvd24iLCJzZXRNb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJhY3RpdmUiLCJoYXNDbGFzcyIsImRvbUVsZW1lbnQiLCJnZXRET01FbGVtZW50IiwicmVhZE9ubHkiLCJ2YWx1ZSIsImNvbnRlbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNlbGVjdGlvbiIsImZyb21TdGFydFBvc2l0aW9uQW5kRW5kUG9zaXRpb24iLCJwcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJwcmV2aW91c1NlbGVjdGlvbiIsInNldFByZXZpb3VzU2VsZWN0aW9uIiwiaW50ZXJtZWRpYXRlSGFuZGxlciIsImlzTW91c2VEb3duIiwiaGFuZGxlciIsImZvcmNlZCIsImlzQWN0aXZlIiwiZ2V0Q29udGVudCIsImdldFNlbGVjdGlvbiIsImdldFByZXZpb3VzQ29udGVudCIsImdldFByZXZpb3VzU2VsZWN0aW9uIiwiZWxlbWVudCIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsImNhbGwiLCJnZXRTdGF0ZSIsInN0YXRlIiwidXBkYXRlU3RhdGUiLCJzZXRTdGF0ZSIsInByb3BlcnRpZXMiLCJvbkNoYW5nZSIsIm9uU2Nyb2xsIiwib25Gb2N1cyIsIm9uQmx1ciIsInJpY2hUZXh0YXJlYSIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXZlbnQiLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxjQUFSOztBQUVBLElBQU1DLFFBQVFDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsT0FBT0gsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUksWUFBWUosUUFBUSxhQUFSLENBQWxCOztJQUVRSyxNLEdBQW9CRixJLENBQXBCRSxNO0lBQVFDLE8sR0FBWUgsSSxDQUFaRyxPOztJQUVWQyxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUNDLGFBQXJDLEVBQW9EQyxZQUFwRCxFQUFrRUMsV0FBbEUsRUFBK0U7QUFBQTs7QUFBQSw0SEFDdkVKLFFBRHVFOztBQUc3RSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFD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LElBQWY7O0FBRUFNLFlBQVFULG1CQUFSLENBQTRCdEMsWUFBNUIsRUFBMEN5QyxNQUExQztBQUNELEdBSkQ7QUFLRDs7QUFFRCxTQUFTNUIsdUJBQVQsQ0FBaUNaLFdBQWpDLEVBQThDeUUsS0FBOUMsRUFBcUQzQixPQUFyRCxFQUE4RDtBQUM1RCxNQUFNTixTQUFTLElBQWY7O0FBRUFNLFVBQVFULG1CQUFSLENBQTRCckMsV0FBNUIsRUFBeUN3QyxNQUF6QztBQUNEIiwiZmlsZSI6InJpY2hUZXh0YXJlYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJ3NldGltbWVkaWF0ZScpO1xyXG5cclxuY29uc3QgZGVmZXIgPSBzZXRJbW1lZGlhdGU7IC8vL1xyXG5cclxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcclxuXHJcbmNvbnN0IFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2VsZWN0aW9uJyk7XHJcblxyXG5jb25zdCB7IHdpbmRvdywgRWxlbWVudCB9ID0gZWFzeTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub24oJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9uKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9uKCdibHVyJywgdGhpcy5ibHVySGFuZGxlciwgdGhpcywgaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vZmYoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vZmYoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgJiYgdGhpcy5vZmYoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGlzUmVhZE9ubHkoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICByZWFkT25seSA9IGRvbUVsZW1lbnQucmVhZE9ubHk7XHJcbiAgICBcclxuICAgIHJldHVybiByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgdmFsdWUgPSBkb21FbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBkb21FbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHNlbGVjdGlvbkVuZCwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBTZWxlY3Rpb24uZnJvbVN0YXJ0UG9zaXRpb25BbmRFbmRQb3NpdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbiwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVhZE9ubHkocmVhZE9ubHkpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuICAgIFxyXG4gICAgZG9tRWxlbWVudC5yZWFkT25seSA9IHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIG1vdXNlVXBIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuICB9O1xyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXIpKTtcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCk7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKCkge1xyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcikpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGZvcmNlZCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMsIC8vL1xyXG4gICAgICAgICAgICBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQgPSAoY29udGVudCAhPT0gcHJldmlvdXNDb250ZW50KSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbi5pc0RpZmZlcmVudFRvKHByZXZpb3VzU2VsZWN0aW9uKSxcclxuICAgICAgICAgICAgY29udGVudENoYW5nZWQgPSBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQsIC8vL1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiwgLy8vXHJcbiAgICAgICAgICAgIGNoYW5nZWQgPSBjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuICAgICAgaWYgKGNoYW5nZWQgfHwgZm9yY2VkKSB7XHJcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGNvbnRlbnQsIHNlbGVjdGlvbiwgY29udGVudENoYW5nZWQsIHNlbGVjdGlvbkNoYW5nZWQsIGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAgLy8vXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzTW91c2VEb3duKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IG1vdXNlRG93biB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIG1vdXNlRG93bjtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzQ29udGVudCgpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBwcmV2aW91c0NvbnRlbnQgfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBwcmV2aW91c0NvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2aW91c1NlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBwcmV2aW91c1NlbGVjdGlvbiB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0TW91c2VEb3duKG1vdXNlRG93bikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93blxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNDb250ZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2UsXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBudWxsLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb3VzZURvd24sXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCxcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsLCBvbkZvY3VzLCBvbkJsdXIgfSA9IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsLCAvLy9cclxuICAgICAgICAgIGZvY3VzSGFuZGxlciA9IG9uRm9jdXMsIC8vL1xyXG4gICAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXIsIC8vL1xyXG4gICAgICAgICAgcmljaFRleHRhcmVhID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSaWNoVGV4dGFyZWEsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHJldHVybiByaWNoVGV4dGFyZWE7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFJpY2hUZXh0YXJlYSwge1xyXG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXHJcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcclxuICAgIGNsYXNzTmFtZTogJ3JpY2gnXHJcbiAgfSxcclxuICBpZ25vcmVkUHJvcGVydGllczogW1xyXG4gICAgJ29uQ2hhbmdlJyxcclxuICAgICdvblNjcm9sbCcsXHJcbiAgICAnb25Gb2N1cycsXHJcbiAgICAnb25CbHVyJ1xyXG4gIF1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0YXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcclxuICBjb25zdCBhY3RpdmUgPSBlbGVtZW50LmlzQWN0aXZlKCk7XHJcblxyXG4gIGlmIChhY3RpdmUpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IGVsZW1lbnQuZ2V0U2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gZWxlbWVudC5nZXRTY3JvbGxMZWZ0KCk7XHJcblxyXG4gICAgc2Nyb2xsSGFuZGxlci5jYWxsKGVsZW1lbnQsIHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgZXZlbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcclxuICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gICAgZWxlbWVudC5pbnRlcm1lZGlhdGVIYW5kbGVyKGZvY3VzSGFuZGxlciwgZm9yY2VkKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIoYmx1ckhhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgZWxlbWVudC5pbnRlcm1lZGlhdGVIYW5kbGVyKGJsdXJIYW5kbGVyLCBmb3JjZWQpO1xyXG59XHJcbiJdfQ==