'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

require('setimmediate');

var defer = setImmediate; ///

var easy = require('easy');

var Selection = require('./selection');

var window = easy.window,
    Element = easy.Element;

var RichTextarea = /*#__PURE__*/function (_Element) {
  _inherits(RichTextarea, _Element);

  function RichTextarea(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
    var _this;

    _classCallCheck(this, RichTextarea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RichTextarea).call(this, selector));
    _this.changeHandler = changeHandler;
    _this.scrollHandler = scrollHandler;
    _this.focusHandler = focusHandler;
    _this.blurHandler = blurHandler;

    _this.setInitialState();

    return _this;
  }

  _createClass(RichTextarea, [{
    key: "activate",
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
    key: "deactivate",
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
    key: "isActive",
    value: function isActive() {
      var active = this.hasClass('active');
      return active;
    }
  }, {
    key: "isReadOnly",
    value: function isReadOnly() {
      var domElement = this.getDOMElement(),
          readOnly = domElement.readOnly;
      return readOnly;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var domElement = this.getDOMElement(),
          value = domElement.value,
          content = value; ///

      return content;
    }
  }, {
    key: "getSelection",
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
    key: "setContent",
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
    key: "setSelection",
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
    key: "setReadOnly",
    value: function setReadOnly(readOnly) {
      var domElement = this.getDOMElement();
      domElement.readOnly = readOnly;
    }
  }, {
    key: "mouseUpHandler",
    value: function mouseUpHandler() {
      var mouseDown = false;
      this.setMouseDown(mouseDown);
    }
  }, {
    key: "mouseDownHandler",
    value: function mouseDownHandler() {
      var _this2 = this;

      var mouseDown = true;
      this.setMouseDown(mouseDown);
      defer(function () {
        return _this2.intermediateHandler(_this2.changeHandler);
      });
    }
  }, {
    key: "mouseMoveHandler",
    value: function mouseMoveHandler() {
      var mouseDown = this.isMouseDown();

      if (mouseDown) {
        this.intermediateHandler(this.changeHandler);
      }
    }
  }, {
    key: "keyDownHandler",
    value: function keyDownHandler() {
      var _this3 = this;

      defer(function () {
        return _this3.intermediateHandler(_this3.changeHandler);
      });
    }
  }, {
    key: "inputHandler",
    value: function inputHandler() {
      this.intermediateHandler(this.changeHandler);
    }
  }, {
    key: "intermediateHandler",
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
    key: "isMouseDown",
    value: function isMouseDown() {
      var state = this.getState(),
          mouseDown = state.mouseDown;
      return mouseDown;
    }
  }, {
    key: "getPreviousContent",
    value: function getPreviousContent() {
      var state = this.getState(),
          previousContent = state.previousContent;
      return previousContent;
    }
  }, {
    key: "getPreviousSelection",
    value: function getPreviousSelection() {
      var state = this.getState(),
          previousSelection = state.previousSelection;
      return previousSelection;
    }
  }, {
    key: "setMouseDown",
    value: function setMouseDown(mouseDown) {
      this.updateState({
        mouseDown: mouseDown
      });
    }
  }, {
    key: "setPreviousContent",
    value: function setPreviousContent(previousContent) {
      this.updateState({
        previousContent: previousContent
      });
    }
  }, {
    key: "setPreviousSelection",
    value: function setPreviousSelection(previousSelection) {
      this.updateState({
        previousSelection: previousSelection
      });
    }
  }, {
    key: "setInitialState",
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
    key: "fromProperties",
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
    scrollHandler.call(element, scrollTop, scrollLeft, event, element);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2hUZXh0YXJlYS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZGVmZXIiLCJzZXRJbW1lZGlhdGUiLCJlYXN5IiwiU2VsZWN0aW9uIiwid2luZG93IiwiRWxlbWVudCIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsInNldEluaXRpYWxTdGF0ZSIsIm1vdXNlRG93biIsInNldE1vdXNlRG93biIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJtb3VzZURvd25IYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsImtleURvd25IYW5kbGVyIiwiaW5wdXRIYW5kbGVyIiwiaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiYWRkQ2xhc3MiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImFjdGl2ZSIsImhhc0NsYXNzIiwiZG9tRWxlbWVudCIsImdldERPTUVsZW1lbnQiLCJyZWFkT25seSIsInZhbHVlIiwiY29udGVudCIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic2VsZWN0aW9uIiwiZnJvbVN0YXJ0UG9zaXRpb25BbmRFbmRQb3NpdGlvbiIsInByZXZpb3VzQ29udGVudCIsInNldFByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJpbnRlcm1lZGlhdGVIYW5kbGVyIiwiaXNNb3VzZURvd24iLCJoYW5kbGVyIiwiZm9yY2VkIiwiaXNBY3RpdmUiLCJnZXRDb250ZW50IiwiZ2V0U2VsZWN0aW9uIiwiZ2V0UHJldmlvdXNDb250ZW50IiwiZ2V0UHJldmlvdXNTZWxlY3Rpb24iLCJlbGVtZW50IiwiY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJjb250ZW50Q2hhbmdlZCIsInNlbGVjdGlvbkNoYW5nZWQiLCJjaGFuZ2VkIiwiY2FsbCIsInN0YXRlIiwiZ2V0U3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsIm9uQ2hhbmdlIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwicmljaFRleHRhcmVhIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJldmVudCIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUDs7QUFFQSxJQUFNQyxLQUFLLEdBQUdDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsSUFBSSxHQUFHSCxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFFQSxJQUFNSSxTQUFTLEdBQUdKLE9BQU8sQ0FBQyxhQUFELENBQXpCOztJQUVRSyxNLEdBQW9CRixJLENBQXBCRSxNO0lBQVFDLE8sR0FBWUgsSSxDQUFaRyxPOztJQUVWQyxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUNDLGFBQXJDLEVBQW9EQyxZQUFwRCxFQUFrRUMsV0FBbEUsRUFBK0U7QUFBQTs7QUFBQTs7QUFDN0Usc0ZBQU1KLFFBQU47QUFFQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLGFBQUwsR0FB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LENBQUNULG1CQUFSLENBQTRCckMsV0FBNUIsRUFBeUN3QyxNQUF6QztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxucmVxdWlyZSgnc2V0aW1tZWRpYXRlJyk7XHJcblxyXG5jb25zdCBkZWZlciA9IHNldEltbWVkaWF0ZTsgLy8vXHJcblxyXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZWxlY3Rpb24nKTtcclxuXHJcbmNvbnN0IHsgd2luZG93LCBFbGVtZW50IH0gPSBlYXN5O1xyXG5cclxuY2xhc3MgUmljaFRleHRhcmVhIGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBjaGFuZ2VIYW5kbGVyO1xyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjtcclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyID0gZm9jdXNIYW5kbGVyO1xyXG4gICAgdGhpcy5ibHVySGFuZGxlciA9IGJsdXJIYW5kbGVyO1xyXG5cclxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIHdpbmRvdy5vbignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub24oJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgdGhpcywgaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vbignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlciwgdGhpcywgaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub24oJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCB0aGlzLCBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9mZignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciAmJiB0aGlzLm9mZignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9mZignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICByZXR1cm4gYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgaXNSZWFkT25seSgpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHJlYWRPbmx5ID0gZG9tRWxlbWVudC5yZWFkT25seTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICB2YWx1ZSA9IGRvbUVsZW1lbnQudmFsdWUsXHJcbiAgICAgICAgICBjb250ZW50ID0gdmFsdWU7ICAvLy9cclxuXHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IGRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvblN0YXJ0LCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbiA9IFNlbGVjdGlvbi5mcm9tU3RhcnRQb3NpdGlvbkFuZEVuZFBvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29udGVudChjb250ZW50KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBkb21FbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xyXG4gICAgZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBzZXRSZWFkT25seShyZWFkT25seSkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG4gICAgXHJcbiAgICBkb21FbGVtZW50LnJlYWRPbmx5ID0gcmVhZE9ubHk7IFxyXG4gIH1cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcikpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IHRoaXMuaXNNb3VzZURvd24oKTtcclxuXHJcbiAgICBpZiAobW91c2VEb3duKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyKSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIGludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZm9yY2VkID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgIGxldCBwcmV2aW91c0NvbnRlbnQgPSB0aGlzLmdldFByZXZpb3VzQ29udGVudCgpLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSB0aGlzLmdldFByZXZpb3VzU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcywgLy8vXHJcbiAgICAgICAgICAgIGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCA9IChjb250ZW50ICE9PSBwcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLmlzRGlmZmVyZW50VG8ocHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgICBjb250ZW50Q2hhbmdlZCA9IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCwgLy8vXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uLCAvLy9cclxuICAgICAgICAgICAgY2hhbmdlZCA9IGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gICAgICBpZiAoY2hhbmdlZCB8fCBmb3JjZWQpIHtcclxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgY29udGVudCwgc2VsZWN0aW9uLCBjb250ZW50Q2hhbmdlZCwgc2VsZWN0aW9uQ2hhbmdlZCwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNb3VzZURvd24oKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgbW91c2VEb3duIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gbW91c2VEb3duO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzQ29udGVudCB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzQ29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzU2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzU2VsZWN0aW9uIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZURvd24obW91c2VEb3duKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgbW91c2VEb3duXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c0NvbnRlbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IG51bGwsXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93bixcclxuICAgICAgcHJldmlvdXNDb250ZW50LFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1ciwgLy8vXHJcbiAgICAgICAgICByaWNoVGV4dGFyZWEgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFJpY2hUZXh0YXJlYSwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcblxyXG4gICAgcmV0dXJuIHJpY2hUZXh0YXJlYTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oUmljaFRleHRhcmVhLCB7XHJcbiAgdGFnTmFtZTogJ3RleHRhcmVhJyxcclxuICBkZWZhdWx0UHJvcGVydGllczoge1xyXG4gICAgY2xhc3NOYW1lOiAncmljaCdcclxuICB9LFxyXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXHJcbiAgICAnb25DaGFuZ2UnLFxyXG4gICAgJ29uU2Nyb2xsJyxcclxuICAgICdvbkZvY3VzJyxcclxuICAgICdvbkJsdXInXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IGVsZW1lbnQuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZWxlbWVudC5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSBlbGVtZW50LmdldFNjcm9sbExlZnQoKTtcclxuXHJcbiAgICBzY3JvbGxIYW5kbGVyLmNhbGwoZWxlbWVudCwgc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0LCBldmVudCwgZWxlbWVudCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIoZm9jdXNIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgICBlbGVtZW50LmludGVybWVkaWF0ZUhhbmRsZXIoZm9jdXNIYW5kbGVyLCBmb3JjZWQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcclxuICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICBlbGVtZW50LmludGVybWVkaWF0ZUhhbmRsZXIoYmx1ckhhbmRsZXIsIGZvcmNlZCk7XHJcbn1cclxuIl19