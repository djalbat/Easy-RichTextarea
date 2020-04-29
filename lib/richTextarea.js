"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

require("setimmediate");

var defer = setImmediate; ///

var easy = require("easy");

var Selection = require("./selection");

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
      window.on("mouseup contextmenu blur", this.mouseUpHandler, this); ///

      this.on("mousedown", this.mouseDownHandler, this);
      this.on("mousemove", this.mouseMoveHandler, this);
      this.on("keydown", this.keyDownHandler, this);
      this.on("input", this.inputHandler, this);
      this.scrollHandler && this.on("scroll", this.scrollHandler, this, intermediateScrollHandler);
      this.focusHandler && this.on("focus", this.focusHandler, this, intermediateFocusHandler);
      this.blurHandler && this.on("blur", this.blurHandler, this, intermediateBlurHandler);
      this.addClass("active");
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      var mouseDown = false;
      this.setMouseDown(mouseDown);
      window.off("mouseup contextmenu blur", this.mouseUpHandler, this); ///

      this.off("mousedown", this.mouseDownHandler, this);
      this.off("mousemove", this.mouseMoveHandler, this);
      this.off("keydown", this.keyDownHandler, this);
      this.off("input", this.inputHandler, this);
      this.scrollHandler && this.off("scroll", this.scrollHandler, this);
      this.focusHandler && this.off("focus", this.focusHandler, this);
      this.blurHandler && this.off("blur", this.blurHandler, this);
      this.removeClass("active");
    }
  }, {
    key: "isActive",
    value: function isActive() {
      var active = this.hasClass("active");
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
  tagName: "textarea",
  defaultProperties: {
    className: "rich"
  },
  ignoredProperties: ["onChange", "onScroll", "onFocus", "onBlur"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2hUZXh0YXJlYS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZGVmZXIiLCJzZXRJbW1lZGlhdGUiLCJlYXN5IiwiU2VsZWN0aW9uIiwid2luZG93IiwiRWxlbWVudCIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsInNldEluaXRpYWxTdGF0ZSIsIm1vdXNlRG93biIsInNldE1vdXNlRG93biIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJtb3VzZURvd25IYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsImtleURvd25IYW5kbGVyIiwiaW5wdXRIYW5kbGVyIiwiaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiYWRkQ2xhc3MiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImFjdGl2ZSIsImhhc0NsYXNzIiwiZG9tRWxlbWVudCIsImdldERPTUVsZW1lbnQiLCJyZWFkT25seSIsInZhbHVlIiwiY29udGVudCIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic2VsZWN0aW9uIiwiZnJvbVN0YXJ0UG9zaXRpb25BbmRFbmRQb3NpdGlvbiIsInByZXZpb3VzQ29udGVudCIsInNldFByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJpbnRlcm1lZGlhdGVIYW5kbGVyIiwiaXNNb3VzZURvd24iLCJoYW5kbGVyIiwiZm9yY2VkIiwiaXNBY3RpdmUiLCJnZXRDb250ZW50IiwiZ2V0U2VsZWN0aW9uIiwiZ2V0UHJldmlvdXNDb250ZW50IiwiZ2V0UHJldmlvdXNTZWxlY3Rpb24iLCJlbGVtZW50IiwiY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJjb250ZW50Q2hhbmdlZCIsInNlbGVjdGlvbkNoYW5nZWQiLCJjaGFuZ2VkIiwiY2FsbCIsInN0YXRlIiwiZ2V0U3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsIm9uQ2hhbmdlIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwicmljaFRleHRhcmVhIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJldmVudCIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUDs7QUFFQSxJQUFNQyxLQUFLLEdBQUdDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsSUFBSSxHQUFHSCxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFFQSxJQUFNSSxTQUFTLEdBQUdKLE9BQU8sQ0FBQyxhQUFELENBQXpCOztJQUVRSyxNLEdBQW9CRixJLENBQXBCRSxNO0lBQVFDLE8sR0FBWUgsSSxDQUFaRyxPOztJQUVWQyxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUNDLGFBQXJDLEVBQW9EQyxZQUFwRCxFQUFrRUMsV0FBbEUsRUFBK0U7QUFBQTs7QUFBQTs7QUFDN0Usc0ZBQU1KLFFBQU47QUFFQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLGFBQUwsR0FB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LENBQUNULG1CQUFSLENBQTRCckMsV0FBNUIsRUFBeUN3QyxNQUF6QztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xyXG5cclxuY29uc3QgZGVmZXIgPSBzZXRJbW1lZGlhdGU7IC8vL1xyXG5cclxuY29uc3QgZWFzeSA9IHJlcXVpcmUoXCJlYXN5XCIpO1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZShcIi4vc2VsZWN0aW9uXCIpO1xyXG5cclxuY29uc3QgeyB3aW5kb3csIEVsZW1lbnQgfSA9IGVhc3k7XHJcblxyXG5jbGFzcyBSaWNoVGV4dGFyZWEgZXh0ZW5kcyBFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgc3VwZXIoc2VsZWN0b3IpO1xyXG5cclxuICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IGNoYW5nZUhhbmRsZXI7XHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBzY3JvbGxIYW5kbGVyO1xyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgPSBmb2N1c0hhbmRsZXI7XHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyID0gYmx1ckhhbmRsZXI7XHJcblxyXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICBcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9uKFwibW91c2V1cCBjb250ZXh0bWVudSBibHVyXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cclxuXHJcbiAgICB0aGlzLm9uKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oXCJrZXlkb3duXCIsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oXCJpbnB1dFwiLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub24oXCJzY3JvbGxcIiwgdGhpcy5zY3JvbGxIYW5kbGVyLCB0aGlzLCBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciAmJiB0aGlzLm9uKFwiZm9jdXNcIiwgdGhpcy5mb2N1c0hhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9uKFwiYmx1clwiLCB0aGlzLmJsdXJIYW5kbGVyLCB0aGlzLCBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoXCJtb3VzZXVwIGNvbnRleHRtZW51IGJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cclxuXHJcbiAgICB0aGlzLm9mZihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoXCJrZXlkb3duXCIsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKFwiaW5wdXRcIiwgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9mZihcInNjcm9sbFwiLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub2ZmKFwiZm9jdXNcIiwgdGhpcy5mb2N1c0hhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgJiYgdGhpcy5vZmYoXCJibHVyXCIsIHRoaXMuYmx1ckhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBpc0FjdGl2ZSgpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaGFzQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGlzUmVhZE9ubHkoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICByZWFkT25seSA9IGRvbUVsZW1lbnQucmVhZE9ubHk7XHJcbiAgICBcclxuICAgIHJldHVybiByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgdmFsdWUgPSBkb21FbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBkb21FbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHNlbGVjdGlvbkVuZCwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBTZWxlY3Rpb24uZnJvbVN0YXJ0UG9zaXRpb25BbmRFbmRQb3NpdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbiwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVhZE9ubHkocmVhZE9ubHkpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuICAgIFxyXG4gICAgZG9tRWxlbWVudC5yZWFkT25seSA9IHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIG1vdXNlVXBIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuICB9O1xyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXIpKTtcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCk7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKCkge1xyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcikpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGZvcmNlZCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMsIC8vL1xyXG4gICAgICAgICAgICBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQgPSAoY29udGVudCAhPT0gcHJldmlvdXNDb250ZW50KSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbi5pc0RpZmZlcmVudFRvKHByZXZpb3VzU2VsZWN0aW9uKSxcclxuICAgICAgICAgICAgY29udGVudENoYW5nZWQgPSBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQsIC8vL1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiwgLy8vXHJcbiAgICAgICAgICAgIGNoYW5nZWQgPSBjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuICAgICAgaWYgKGNoYW5nZWQgfHwgZm9yY2VkKSB7XHJcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGNvbnRlbnQsIHNlbGVjdGlvbiwgY29udGVudENoYW5nZWQsIHNlbGVjdGlvbkNoYW5nZWQsIGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAgLy8vXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzTW91c2VEb3duKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IG1vdXNlRG93biB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIG1vdXNlRG93bjtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzQ29udGVudCgpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBwcmV2aW91c0NvbnRlbnQgfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBwcmV2aW91c0NvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2aW91c1NlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBwcmV2aW91c1NlbGVjdGlvbiB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0TW91c2VEb3duKG1vdXNlRG93bikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93blxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNDb250ZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2UsXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBudWxsLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb3VzZURvd24sXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCxcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsLCBvbkZvY3VzLCBvbkJsdXIgfSA9IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsLCAvLy9cclxuICAgICAgICAgIGZvY3VzSGFuZGxlciA9IG9uRm9jdXMsIC8vL1xyXG4gICAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXIsIC8vL1xyXG4gICAgICAgICAgcmljaFRleHRhcmVhID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSaWNoVGV4dGFyZWEsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHJldHVybiByaWNoVGV4dGFyZWE7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFJpY2hUZXh0YXJlYSwge1xyXG4gIHRhZ05hbWU6IFwidGV4dGFyZWFcIixcclxuICBkZWZhdWx0UHJvcGVydGllczoge1xyXG4gICAgY2xhc3NOYW1lOiBcInJpY2hcIlxyXG4gIH0sXHJcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcclxuICAgIFwib25DaGFuZ2VcIixcclxuICAgIFwib25TY3JvbGxcIixcclxuICAgIFwib25Gb2N1c1wiLFxyXG4gICAgXCJvbkJsdXJcIlxyXG4gIF1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0YXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcclxuICBjb25zdCBhY3RpdmUgPSBlbGVtZW50LmlzQWN0aXZlKCk7XHJcblxyXG4gIGlmIChhY3RpdmUpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IGVsZW1lbnQuZ2V0U2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gZWxlbWVudC5nZXRTY3JvbGxMZWZ0KCk7XHJcblxyXG4gICAgc2Nyb2xsSGFuZGxlci5jYWxsKGVsZW1lbnQsIHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgZXZlbnQsIGVsZW1lbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcclxuICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gICAgZWxlbWVudC5pbnRlcm1lZGlhdGVIYW5kbGVyKGZvY3VzSGFuZGxlciwgZm9yY2VkKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIoYmx1ckhhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgZWxlbWVudC5pbnRlcm1lZGlhdGVIYW5kbGVyKGJsdXJIYW5kbGVyLCBmb3JjZWQpO1xyXG59XHJcbiJdfQ==