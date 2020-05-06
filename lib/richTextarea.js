"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _easy = require("easy");

var _selection = _interopRequireDefault(require("./selection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defer = function defer(func) {
  return setTimeout(func, 0);
}; ///


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

      _easy.window.on("mouseup contextmenu blur", this.mouseUpHandler, this); ///


      this.on("mousedown", this.mouseDownHandler, this);
      this.on("mousemove", this.mouseMoveHandler, this);
      this.on("keydown", this.keyDownHandler, this);
      this.on("input", this.inputHandler, this);
      this.scrollHandler && this.on("scroll", this.intermediateScrollHandler, this);
      this.focusHandler && this.on("focus", this.intermediateFocusHandler, this);
      this.blurHandler && this.on("blur", this.intermediateBlurHandler, this);
      this.addClass("active");
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      var mouseDown = false;
      this.setMouseDown(mouseDown);

      _easy.window.off("mouseup contextmenu blur", this.mouseUpHandler, this); ///


      this.off("mousedown", this.mouseDownHandler, this);
      this.off("mousemove", this.mouseMoveHandler, this);
      this.off("keydown", this.keyDownHandler, this);
      this.off("input", this.inputHandler, this);
      this.scrollHandler && this.off("scroll", this.intermediateScrollHandler, this);
      this.focusHandler && this.off("focus", this.intermediateFocusHandler, this);
      this.blurHandler && this.off("blur", this.intermediateBlurHandler, this);
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
          selection = _selection["default"].fromDOMElement(domElement);

      return selection;
    }
  }, {
    key: "setReadOnly",
    value: function setReadOnly(readOnly) {
      var domElement = this.getDOMElement();
      Object.assign(domElement, {
        readOnly: readOnly
      });
    }
  }, {
    key: "setContent",
    value: function setContent(content) {
      var value = content,
          ///
      previousContent = content,
          ///
      domElement = this.getDOMElement();
      Object.assign(domElement, {
        value: value
      });
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
      Object.assign(domElement, {
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
      });
      this.setPreviousSelection(previousSelection);
    }
  }, {
    key: "mouseUpHandler",
    value: function mouseUpHandler(event, element) {
      var mouseDown = false;
      this.setMouseDown(mouseDown);
    }
  }, {
    key: "mouseDownHandler",
    value: function mouseDownHandler(event, element) {
      var _this2 = this;

      var forced = false,
          mouseDown = true;
      this.setMouseDown(mouseDown);
      defer(function () {
        return _this2.intermediateHandler(event, element, _this2.changeHandler, forced);
      });
    }
  }, {
    key: "mouseMoveHandler",
    value: function mouseMoveHandler(event, element) {
      var forced = false,
          mouseDown = this.isMouseDown();

      if (mouseDown) {
        this.intermediateHandler(event, element, this.changeHandler, forced);
      }
    }
  }, {
    key: "keyDownHandler",
    value: function keyDownHandler(event, element) {
      var _this3 = this;

      var forced = false;
      defer(function () {
        return _this3.intermediateHandler(event, element, _this3.changeHandler, forced);
      });
    }
  }, {
    key: "inputHandler",
    value: function inputHandler(event, element) {
      var forced = false;
      this.intermediateHandler(event, element, this.changeHandler, forced);
    }
  }, {
    key: "intermediateScrollHandler",
    value: function intermediateScrollHandler(event, element) {
      var active = element.isActive();

      if (active) {
        this.scrollHandler.call(element, event, element);
      }
    }
  }, {
    key: "intermediateFocusHandler",
    value: function intermediateFocusHandler(event, element) {
      var _this4 = this;

      var forced = true;
      defer(function () {
        return _this4.intermediateHandler(event, element, _this4.focusHandler, forced);
      });
    }
  }, {
    key: "intermediateBlurHandler",
    value: function intermediateBlurHandler(event, element) {
      var forced = true;
      this.intermediateHandler(event, element, this.blurHandler, forced);
    }
  }, {
    key: "intermediateHandler",
    value: function intermediateHandler(event, element, handler, forced) {
      var active = this.isActive();

      if (active) {
        var changed = this.hasChanged();

        if (changed || forced) {
          handler.call(element, event, element);
        }

        var content = this.getContent(),
            selection = this.getSelection(),
            previousContent = content,
            ///
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
    key: "hasChanged",
    value: function hasChanged() {
      var contentChanged = this.hasContentChanged(),
          selectionChanged = this.hasSelectionChanged(),
          changed = contentChanged || selectionChanged;
      return changed;
    }
  }, {
    key: "hasContentChanged",
    value: function hasContentChanged() {
      var content = this.getContent(),
          previousContent = this.getPreviousContent(),
          contentDifferentToPreviousContent = content !== previousContent,
          contentChanged = contentDifferentToPreviousContent; ///

      return contentChanged;
    }
  }, {
    key: "hasSelectionChanged",
    value: function hasSelectionChanged() {
      var selection = this.getSelection(),
          previousSelection = this.getPreviousSelection(),
          selectionDifferentToPreviousSelection = selection.isDifferentTo(previousSelection),
          selectionChanged = selectionDifferentToPreviousSelection; ///

      return selectionChanged;
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
      var active = properties.active;
      this.setInitialState();

      if (active) {
        this.activate();
      }
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
          richTextarea = _easy.Element.fromClass(Class, properties, changeHandler, scrollHandler, focusHandler, blurHandler);

      richTextarea.initialise(properties);
      return richTextarea;
    }
  }]);

  return RichTextarea;
}(_easy.Element);

_defineProperty(RichTextarea, "tagName", "textarea");

_defineProperty(RichTextarea, "defaultProperties", {
  className: "rich"
});

_defineProperty(RichTextarea, "ignoredProperties", ["onChange", "onScroll", "onFocus", "onBlur", "active"]);

var _default = RichTextarea; // export default withStyle(RichTextarea)`
//
//   display: none;
//
//   .active {
//     display: block;
//   }
//
// `

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2hUZXh0YXJlYS5qcyJdLCJuYW1lcyI6WyJkZWZlciIsImZ1bmMiLCJzZXRUaW1lb3V0IiwiUmljaFRleHRhcmVhIiwic2VsZWN0b3IiLCJjaGFuZ2VIYW5kbGVyIiwic2Nyb2xsSGFuZGxlciIsImZvY3VzSGFuZGxlciIsImJsdXJIYW5kbGVyIiwibW91c2VEb3duIiwic2V0TW91c2VEb3duIiwid2luZG93Iiwib24iLCJtb3VzZVVwSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJtb3VzZU1vdmVIYW5kbGVyIiwia2V5RG93bkhhbmRsZXIiLCJpbnB1dEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyIiwiaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyIiwiaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIiLCJhZGRDbGFzcyIsIm9mZiIsInJlbW92ZUNsYXNzIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJkb21FbGVtZW50IiwiZ2V0RE9NRWxlbWVudCIsInJlYWRPbmx5IiwidmFsdWUiLCJjb250ZW50Iiwic2VsZWN0aW9uIiwiU2VsZWN0aW9uIiwiZnJvbURPTUVsZW1lbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJwcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJldmVudCIsImVsZW1lbnQiLCJmb3JjZWQiLCJpbnRlcm1lZGlhdGVIYW5kbGVyIiwiaXNNb3VzZURvd24iLCJpc0FjdGl2ZSIsImNhbGwiLCJoYW5kbGVyIiwiY2hhbmdlZCIsImhhc0NoYW5nZWQiLCJnZXRDb250ZW50IiwiZ2V0U2VsZWN0aW9uIiwic3RhdGUiLCJnZXRTdGF0ZSIsImNvbnRlbnRDaGFuZ2VkIiwiaGFzQ29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiaGFzU2VsZWN0aW9uQ2hhbmdlZCIsImdldFByZXZpb3VzQ29udGVudCIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsImdldFByZXZpb3VzU2VsZWN0aW9uIiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsInNldEluaXRpYWxTdGF0ZSIsImFjdGl2YXRlIiwiQ2xhc3MiLCJvbkNoYW5nZSIsIm9uU2Nyb2xsIiwib25Gb2N1cyIsIm9uQmx1ciIsInJpY2hUZXh0YXJlYSIsIkVsZW1lbnQiLCJmcm9tQ2xhc3MiLCJpbml0aWFsaXNlIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFDQyxJQUFEO0FBQUEsU0FBVUMsVUFBVSxDQUFDRCxJQUFELEVBQU8sQ0FBUCxDQUFwQjtBQUFBLENBQWQsQyxDQUE2Qzs7O0lBRXZDRSxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUNDLGFBQXJDLEVBQW9EQyxZQUFwRCxFQUFrRUMsV0FBbEUsRUFBK0U7QUFBQTs7QUFBQTs7QUFDN0Usc0ZBQU1KLFFBQU47QUFFQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQU42RTtBQU85RTs7OzsrQkFFVTtBQUNULFVBQU1DLFNBQVMsR0FBRyxLQUFsQjtBQUVBLFdBQUtDLFlBQUwsQ0FBa0JELFNBQWxCOztBQUVBRSxtQkFBT0MsRUFBUCxDQUFVLDBC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d0JDLGE7O2dCQUFyQjdFLFksYUE2UmEsVTs7Z0JBN1JiQSxZLHVCQStSdUI7QUFDekJnRixFQUFBQSxTQUFTLEVBQUU7QUFEYyxDOztnQkEvUnZCaEYsWSx1QkFtU3VCLENBQ3pCLFVBRHlCLEVBRXpCLFVBRnlCLEVBR3pCLFNBSHlCLEVBSXpCLFFBSnlCLEVBS3pCLFFBTHlCLEM7O2VBc0JkQSxZLEVBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xyXG5cclxuaW1wb3J0IHsgd2luZG93LCBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcclxuXHJcbmltcG9ydCBTZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9uXCJcclxuXHJcbmNvbnN0IGRlZmVyID0gKGZ1bmMpID0+IHNldFRpbWVvdXQoZnVuYywgMCk7IC8vL1xyXG5cclxuY2xhc3MgUmljaFRleHRhcmVhIGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBjaGFuZ2VIYW5kbGVyO1xyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjtcclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyID0gZm9jdXNIYW5kbGVyO1xyXG4gICAgdGhpcy5ibHVySGFuZGxlciA9IGJsdXJIYW5kbGVyO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub24oXCJtb3VzZXVwIGNvbnRleHRtZW51IGJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xyXG5cclxuICAgIHRoaXMub24oXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbihcImtleWRvd25cIiwgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbihcImlucHV0XCIsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vbihcInNjcm9sbFwiLCB0aGlzLmludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub24oXCJmb2N1c1wiLCB0aGlzLmludGVybWVkaWF0ZUZvY3VzSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9uKFwiYmx1clwiLCB0aGlzLmludGVybWVkaWF0ZUJsdXJIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9mZihcIm1vdXNldXAgY29udGV4dG1lbnUgYmx1clwiLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xyXG5cclxuICAgIHRoaXMub2ZmKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZihcImtleWRvd25cIiwgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoXCJpbnB1dFwiLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub2ZmKFwic2Nyb2xsXCIsIHRoaXMuaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vZmYoXCJmb2N1c1wiLCB0aGlzLmludGVybWVkaWF0ZUZvY3VzSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9mZihcImJsdXJcIiwgdGhpcy5pbnRlcm1lZGlhdGVCbHVySGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbiAgICByZXR1cm4gYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgaXNSZWFkT25seSgpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHsgcmVhZE9ubHkgfSA9IGRvbUVsZW1lbnQ7XHJcbiAgICBcclxuICAgIHJldHVybiByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgeyB2YWx1ZSB9ID0gZG9tRWxlbWVudCxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gU2VsZWN0aW9uLmZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRSZWFkT25seShyZWFkT25seSkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oZG9tRWxlbWVudCwge1xyXG4gICAgICByZWFkT25seVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oZG9tRWxlbWVudCwge1xyXG4gICAgICB2YWx1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihkb21FbGVtZW50LCB7XHJcbiAgICAgIHNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBzZWxlY3Rpb25FbmRcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gZmFsc2UsXHJcbiAgICAgICAgICBtb3VzZURvd24gPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCB0aGlzLmNoYW5nZUhhbmRsZXIsIGZvcmNlZCkpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gZmFsc2UsXHJcbiAgICAgICAgICBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCk7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSBmYWxzZTtcclxuXHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkKSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgdGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gZWxlbWVudC5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmNhbGwoZWxlbWVudCwgZXZlbnQsIGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgdGhpcy5mb2N1c0hhbmRsZXIsIGZvcmNlZCkpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCB0aGlzLmJsdXJIYW5kbGVyLCBmb3JjZWQpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgaGFuZGxlciwgZm9yY2VkKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjaGFuZ2VkID0gdGhpcy5oYXNDaGFuZ2VkKCk7XHJcblxyXG4gICAgICBpZiAoY2hhbmdlZCB8fCBmb3JjZWQpIHtcclxuICAgICAgICBoYW5kbGVyLmNhbGwoZWxlbWVudCwgZXZlbnQsIGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNb3VzZURvd24oKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgbW91c2VEb3duIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gbW91c2VEb3duO1xyXG4gIH1cclxuXHJcbiAgaGFzQ2hhbmdlZCgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnRDaGFuZ2VkID0gdGhpcy5oYXNDb250ZW50Q2hhbmdlZCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHRoaXMuaGFzU2VsZWN0aW9uQ2hhbmdlZCgpLFxyXG4gICAgICAgICAgY2hhbmdlZCA9IChjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuXHJcbiAgICByZXR1cm4gY2hhbmdlZDtcclxuICB9XHJcblxyXG4gIGhhc0NvbnRlbnRDaGFuZ2VkKCkge1xyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCA9IChjb250ZW50ICE9PSBwcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgY29udGVudENoYW5nZWQgPSBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQ7IC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50Q2hhbmdlZDtcclxuICB9XHJcblxyXG4gIGhhc1NlbGVjdGlvbkNoYW5nZWQoKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSB0aGlzLmdldFByZXZpb3VzU2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLmlzRGlmZmVyZW50VG8ocHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb247IC8vL1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb25DaGFuZ2VkO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzQ29udGVudCB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzQ29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzU2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzU2VsZWN0aW9uIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZURvd24obW91c2VEb3duKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgbW91c2VEb3duXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c0NvbnRlbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IG51bGwsXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93bixcclxuICAgICAgcHJldmlvdXNDb250ZW50LFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXNlKHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgYWN0aXZlIH0gPSAgcHJvcGVydGllcztcclxuXHJcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHRhZ05hbWUgPSBcInRleHRhcmVhXCI7XHJcblxyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcclxuICAgIGNsYXNzTmFtZTogXCJyaWNoXCJcclxuICB9O1xyXG5cclxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXHJcbiAgICBcIm9uQ2hhbmdlXCIsXHJcbiAgICBcIm9uU2Nyb2xsXCIsXHJcbiAgICBcIm9uRm9jdXNcIixcclxuICAgIFwib25CbHVyXCIsXHJcbiAgICBcImFjdGl2ZVwiXHJcbiAgXTtcclxuXHJcbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1ciwgLy8vXHJcbiAgICAgICAgICByaWNoVGV4dGFyZWEgPSBFbGVtZW50LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcblxyXG4gICAgcmljaFRleHRhcmVhLmluaXRpYWxpc2UocHJvcGVydGllcyk7XHJcblxyXG4gICAgcmV0dXJuIHJpY2hUZXh0YXJlYTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJpY2hUZXh0YXJlYTtcclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShSaWNoVGV4dGFyZWEpYFxyXG4vL1xyXG4vLyAgIGRpc3BsYXk6IG5vbmU7XHJcbi8vXHJcbi8vICAgLmFjdGl2ZSB7XHJcbi8vICAgICBkaXNwbGF5OiBibG9jaztcclxuLy8gICB9XHJcbi8vXHJcbi8vIGBcclxuIl19