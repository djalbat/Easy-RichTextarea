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
  }, {
    key: "initialise",
    value: function initialise(properties) {
      this.setInitialState();
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var onChange = properties.onChange,
          onScroll = properties.onScroll,
          onFocus = properties.onFocus,
          onBlur = properties.onBlur,
          changeHandler = onChange,
          scrollHandler = onScroll,
          focusHandler = onFocus,
          blurHandler = onBlur,
          richTextarea = Element.fromClass(Class, properties, changeHandler, scrollHandler, focusHandler, blurHandler);
      richTextarea.initialise(properties);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2hUZXh0YXJlYS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZGVmZXIiLCJzZXRJbW1lZGlhdGUiLCJlYXN5IiwiU2VsZWN0aW9uIiwid2luZG93IiwiRWxlbWVudCIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsIm1vdXNlRG93biIsInNldE1vdXNlRG93biIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJtb3VzZURvd25IYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsImtleURvd25IYW5kbGVyIiwiaW5wdXRIYW5kbGVyIiwiaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiYWRkQ2xhc3MiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImFjdGl2ZSIsImhhc0NsYXNzIiwiZG9tRWxlbWVudCIsImdldERPTUVsZW1lbnQiLCJyZWFkT25seSIsInZhbHVlIiwiY29udGVudCIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic2VsZWN0aW9uIiwiZnJvbVN0YXJ0UG9zaXRpb25BbmRFbmRQb3NpdGlvbiIsInByZXZpb3VzQ29udGVudCIsInNldFByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJpbnRlcm1lZGlhdGVIYW5kbGVyIiwiaXNNb3VzZURvd24iLCJoYW5kbGVyIiwiZm9yY2VkIiwiaXNBY3RpdmUiLCJnZXRDb250ZW50IiwiZ2V0U2VsZWN0aW9uIiwiZ2V0UHJldmlvdXNDb250ZW50IiwiZ2V0UHJldmlvdXNTZWxlY3Rpb24iLCJlbGVtZW50IiwiY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJjb250ZW50Q2hhbmdlZCIsInNlbGVjdGlvbkNoYW5nZWQiLCJjaGFuZ2VkIiwiY2FsbCIsInN0YXRlIiwiZ2V0U3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsInNldEluaXRpYWxTdGF0ZSIsIkNsYXNzIiwib25DaGFuZ2UiLCJvblNjcm9sbCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJyaWNoVGV4dGFyZWEiLCJmcm9tQ2xhc3MiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXZlbnQiLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUFBLE9BQU8sQ0FBQyxjQUFELENBQVA7O0FBRUEsSUFBTUMsS0FBSyxHQUFHQyxZQUFkLEMsQ0FBNEI7O0FBRTVCLElBQU1DLElBQUksR0FBR0gsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBRUEsSUFBTUksU0FBUyxHQUFHSixPQUFPLENBQUMsYUFBRCxDQUF6Qjs7SUFFUUssTSxHQUFvQkYsSSxDQUFwQkUsTTtJQUFRQyxPLEdBQVlILEksQ0FBWkcsTzs7SUFFVkMsWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDQyxhQUFyQyxFQUFvREMsWUFBcEQsRUFBa0VDLFdBQWxFLEVBQStFO0FBQUE7O0FBQUE7O0FBQzdFLHNGQUFNSixRQUFOO0FBRUEsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFD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RUFBOEMyRSxLQUE5QyxFQUFxRDlCLE9BQXJELEVBQThEO0FBQzVELE1BQU1OLE1BQU0sR0FBRyxJQUFmO0FBRUFNLEVBQUFBLE9BQU8sQ0FBQ1QsbUJBQVIsQ0FBNEJwQyxXQUE1QixFQUF5Q3VDLE1BQXpDO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XHJcblxyXG5jb25zdCBkZWZlciA9IHNldEltbWVkaWF0ZTsgLy8vXHJcblxyXG5jb25zdCBlYXN5ID0gcmVxdWlyZShcImVhc3lcIik7XHJcblxyXG5jb25zdCBTZWxlY3Rpb24gPSByZXF1aXJlKFwiLi9zZWxlY3Rpb25cIik7XHJcblxyXG5jb25zdCB7IHdpbmRvdywgRWxlbWVudCB9ID0gZWFzeTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICBcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9uKFwibW91c2V1cCBjb250ZXh0bWVudSBibHVyXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cclxuXHJcbiAgICB0aGlzLm9uKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oXCJrZXlkb3duXCIsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oXCJpbnB1dFwiLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub24oXCJzY3JvbGxcIiwgdGhpcy5zY3JvbGxIYW5kbGVyLCB0aGlzLCBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciAmJiB0aGlzLm9uKFwiZm9jdXNcIiwgdGhpcy5mb2N1c0hhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9uKFwiYmx1clwiLCB0aGlzLmJsdXJIYW5kbGVyLCB0aGlzLCBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoXCJtb3VzZXVwIGNvbnRleHRtZW51IGJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cclxuXHJcbiAgICB0aGlzLm9mZihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoXCJrZXlkb3duXCIsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKFwiaW5wdXRcIiwgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9mZihcInNjcm9sbFwiLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub2ZmKFwiZm9jdXNcIiwgdGhpcy5mb2N1c0hhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgJiYgdGhpcy5vZmYoXCJibHVyXCIsIHRoaXMuYmx1ckhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBpc0FjdGl2ZSgpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaGFzQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGlzUmVhZE9ubHkoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICByZWFkT25seSA9IGRvbUVsZW1lbnQucmVhZE9ubHk7XHJcbiAgICBcclxuICAgIHJldHVybiByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgdmFsdWUgPSBkb21FbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBkb21FbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHNlbGVjdGlvbkVuZCwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBTZWxlY3Rpb24uZnJvbVN0YXJ0UG9zaXRpb25BbmRFbmRQb3NpdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbiwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVhZE9ubHkocmVhZE9ubHkpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuICAgIFxyXG4gICAgZG9tRWxlbWVudC5yZWFkT25seSA9IHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIG1vdXNlVXBIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuICB9O1xyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXIpKTtcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCk7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKCkge1xyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcikpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGZvcmNlZCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMsIC8vL1xyXG4gICAgICAgICAgICBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQgPSAoY29udGVudCAhPT0gcHJldmlvdXNDb250ZW50KSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbi5pc0RpZmZlcmVudFRvKHByZXZpb3VzU2VsZWN0aW9uKSxcclxuICAgICAgICAgICAgY29udGVudENoYW5nZWQgPSBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQsIC8vL1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiwgLy8vXHJcbiAgICAgICAgICAgIGNoYW5nZWQgPSBjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuICAgICAgaWYgKGNoYW5nZWQgfHwgZm9yY2VkKSB7XHJcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGNvbnRlbnQsIHNlbGVjdGlvbiwgY29udGVudENoYW5nZWQsIHNlbGVjdGlvbkNoYW5nZWQsIGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAgLy8vXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzTW91c2VEb3duKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IG1vdXNlRG93biB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIG1vdXNlRG93bjtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzQ29udGVudCgpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBwcmV2aW91c0NvbnRlbnQgfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBwcmV2aW91c0NvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2aW91c1NlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBwcmV2aW91c1NlbGVjdGlvbiB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0TW91c2VEb3duKG1vdXNlRG93bikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93blxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNDb250ZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2UsXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBudWxsLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb3VzZURvd24sXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCxcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGlzZShwcm9wZXJ0aWVzKSB7XHJcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1ciwgLy8vXHJcbiAgICAgICAgICByaWNoVGV4dGFyZWEgPSBFbGVtZW50LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcblxyXG4gICAgcmljaFRleHRhcmVhLmluaXRpYWxpc2UocHJvcGVydGllcyk7XHJcblxyXG4gICAgcmV0dXJuIHJpY2hUZXh0YXJlYTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oUmljaFRleHRhcmVhLCB7XHJcbiAgdGFnTmFtZTogXCJ0ZXh0YXJlYVwiLFxyXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XHJcbiAgICBjbGFzc05hbWU6IFwicmljaFwiXHJcbiAgfSxcclxuICBpZ25vcmVkUHJvcGVydGllczogW1xyXG4gICAgXCJvbkNoYW5nZVwiLFxyXG4gICAgXCJvblNjcm9sbFwiLFxyXG4gICAgXCJvbkZvY3VzXCIsXHJcbiAgICBcIm9uQmx1clwiXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IGVsZW1lbnQuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZWxlbWVudC5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSBlbGVtZW50LmdldFNjcm9sbExlZnQoKTtcclxuXHJcbiAgICBzY3JvbGxIYW5kbGVyLmNhbGwoZWxlbWVudCwgc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0LCBldmVudCwgZWxlbWVudCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIoZm9jdXNIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgICBlbGVtZW50LmludGVybWVkaWF0ZUhhbmRsZXIoZm9jdXNIYW5kbGVyLCBmb3JjZWQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcclxuICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICBlbGVtZW50LmludGVybWVkaWF0ZUhhbmRsZXIoYmx1ckhhbmRsZXIsIGZvcmNlZCk7XHJcbn1cclxuIl19