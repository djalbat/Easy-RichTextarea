"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _easy = require("easy");

var _selection = _interopRequireDefault(require("./selection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  display: none;\n\n  .active {\n    display: block;\n  }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

var _default = (0, _easyWithStyle["default"])(RichTextarea)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2hUZXh0YXJlYS5qcyJdLCJuYW1lcyI6WyJkZWZlciIsImZ1bmMiLCJzZXRUaW1lb3V0IiwiUmljaFRleHRhcmVhIiwic2VsZWN0b3IiLCJjaGFuZ2VIYW5kbGVyIiwic2Nyb2xsSGFuZGxlciIsImZvY3VzSGFuZGxlciIsImJsdXJIYW5kbGVyIiwibW91c2VEb3duIiwic2V0TW91c2VEb3duIiwid2luZG93Iiwib24iLCJtb3VzZVVwSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJtb3VzZU1vdmVIYW5kbGVyIiwia2V5RG93bkhhbmRsZXIiLCJpbnB1dEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyIiwiaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyIiwiaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIiLCJhZGRDbGFzcyIsIm9mZiIsInJlbW92ZUNsYXNzIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJkb21FbGVtZW50IiwiZ2V0RE9NRWxlbWVudCIsInJlYWRPbmx5IiwidmFsdWUiLCJjb250ZW50Iiwic2VsZWN0aW9uIiwiU2VsZWN0aW9uIiwiZnJvbURPTUVsZW1lbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJwcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJldmVudCIsImVsZW1lbnQiLCJmb3JjZWQiLCJpbnRlcm1lZGlhdGVIYW5kbGVyIiwiaXNNb3VzZURvd24iLCJpc0FjdGl2ZSIsImNhbGwiLCJoYW5kbGVyIiwiY2hhbmdlZCIsImhhc0NoYW5nZWQiLCJnZXRDb250ZW50IiwiZ2V0U2VsZWN0aW9uIiwic3RhdGUiLCJnZXRTdGF0ZSIsImNvbnRlbnRDaGFuZ2VkIiwiaGFzQ29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiaGFzU2VsZWN0aW9uQ2hhbmdlZCIsImdldFByZXZpb3VzQ29udGVudCIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsImdldFByZXZpb3VzU2VsZWN0aW9uIiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsInNldEluaXRpYWxTdGF0ZSIsImFjdGl2YXRlIiwiQ2xhc3MiLCJvbkNoYW5nZSIsIm9uU2Nyb2xsIiwib25Gb2N1cyIsIm9uQmx1ciIsInJpY2hUZXh0YXJlYSIsIkVsZW1lbnQiLCJmcm9tQ2xhc3MiLCJpbml0aWFsaXNlIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFDQyxJQUFEO0FBQUEsU0FBVUMsVUFBVSxDQUFDRCxJQUFELEVBQU8sQ0FBUCxDQUFwQjtBQUFBLENBQWQsQyxDQUE2Qzs7O0lBRXZDRSxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUNDLGFBQXJDLEVBQW9EQyxZQUFwRCxFQUFrRUMsV0FBbEUsRUFBK0U7QUFBQTs7QUFBQTs7QUFDN0Usc0ZBQU1KLFFBQU47QUFFQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQU42RTtBQU85RTs7OzsrQkFFVTtBQUNULFVBQU1DLFNBQVMsR0FBRyxLQUFsQjtBQUVBLFdBQUtDLFlBQUwsQ0FBa0JELFNBQWxCOztBQUVBRSxtQkFBT0Ms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QUFDRDs7OztFQXRUd0JDLGE7O2dCQUFyQjdFLFksYUE2UmEsVTs7Z0JBN1JiQSxZLHVCQStSdUI7QUFDekJnRixFQUFBQSxTQUFTLEVBQUU7QUFEYyxDOztnQkEvUnZCaEYsWSx1QkFtU3VCLENBQ3pCLFVBRHlCLEVBRXpCLFVBRnlCLEVBR3pCLFNBSHlCLEVBSXpCLFFBSnlCLEVBS3pCLFFBTHlCLEM7O2VBc0JkLCtCQUFVQSxZQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXHJcblxyXG5pbXBvcnQgeyB3aW5kb3csIEVsZW1lbnQgfSBmcm9tIFwiZWFzeVwiO1xyXG5cclxuaW1wb3J0IFNlbGVjdGlvbiBmcm9tIFwiLi9zZWxlY3Rpb25cIlxyXG5cclxuY29uc3QgZGVmZXIgPSAoZnVuYykgPT4gc2V0VGltZW91dChmdW5jLCAwKTsgLy8vXHJcblxyXG5jbGFzcyBSaWNoVGV4dGFyZWEgZXh0ZW5kcyBFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgc3VwZXIoc2VsZWN0b3IpO1xyXG5cclxuICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IGNoYW5nZUhhbmRsZXI7XHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBzY3JvbGxIYW5kbGVyO1xyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgPSBmb2N1c0hhbmRsZXI7XHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyID0gYmx1ckhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIHdpbmRvdy5vbihcIm1vdXNldXAgY29udGV4dG1lbnUgYmx1clwiLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXHJcblxyXG4gICAgdGhpcy5vbihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKFwia2V5ZG93blwiLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKFwiaW5wdXRcIiwgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9uKFwic2Nyb2xsXCIsIHRoaXMuaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vbihcImZvY3VzXCIsIHRoaXMuaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub24oXCJibHVyXCIsIHRoaXMuaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub2ZmKFwibW91c2V1cCBjb250ZXh0bWVudSBibHVyXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXHJcblxyXG4gICAgdGhpcy5vZmYoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKFwia2V5ZG93blwiLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZihcImlucHV0XCIsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vZmYoXCJzY3JvbGxcIiwgdGhpcy5pbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciAmJiB0aGlzLm9mZihcImZvY3VzXCIsIHRoaXMuaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub2ZmKFwiYmx1clwiLCB0aGlzLmludGVybWVkaWF0ZUJsdXJIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBpc1JlYWRPbmx5KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgeyByZWFkT25seSB9ID0gZG9tRWxlbWVudDtcclxuICAgIFxyXG4gICAgcmV0dXJuIHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICB7IHZhbHVlIH0gPSBkb21FbGVtZW50LFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBTZWxlY3Rpb24uZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldFJlYWRPbmx5KHJlYWRPbmx5KSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihkb21FbGVtZW50LCB7XHJcbiAgICAgIHJlYWRPbmx5XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihkb21FbGVtZW50LCB7XHJcbiAgICAgIHZhbHVlXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24sICAvLy9cclxuICAgICAgICAgIGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKGRvbUVsZW1lbnQsIHtcclxuICAgICAgc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIHNlbGVjdGlvbkVuZFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuICB9O1xyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSBmYWxzZSxcclxuICAgICAgICAgIG1vdXNlRG93biA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkKSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZU1vdmVIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSBmYWxzZSxcclxuICAgICAgICAgIG1vdXNlRG93biA9IHRoaXMuaXNNb3VzZURvd24oKTtcclxuXHJcbiAgICBpZiAobW91c2VEb3duKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgdGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgdGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCB0aGlzLmNoYW5nZUhhbmRsZXIsIGZvcmNlZCk7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSBlbGVtZW50LmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuY2FsbChlbGVtZW50LCBldmVudCwgZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCB0aGlzLmZvY3VzSGFuZGxlciwgZm9yY2VkKSk7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHRoaXMuYmx1ckhhbmRsZXIsIGZvcmNlZCk7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCBoYW5kbGVyLCBmb3JjZWQpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNoYW5nZWQgPSB0aGlzLmhhc0NoYW5nZWQoKTtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkIHx8IGZvcmNlZCkge1xyXG4gICAgICAgIGhhbmRsZXIuY2FsbChlbGVtZW50LCBldmVudCwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc01vdXNlRG93bigpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBtb3VzZURvd24gfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBtb3VzZURvd247XHJcbiAgfVxyXG5cclxuICBoYXNDaGFuZ2VkKCkge1xyXG4gICAgY29uc3QgY29udGVudENoYW5nZWQgPSB0aGlzLmhhc0NvbnRlbnRDaGFuZ2VkKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gdGhpcy5oYXNTZWxlY3Rpb25DaGFuZ2VkKCksXHJcbiAgICAgICAgICBjaGFuZ2VkID0gKGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQpO1xyXG5cclxuICAgIHJldHVybiBjaGFuZ2VkO1xyXG4gIH1cclxuXHJcbiAgaGFzQ29udGVudENoYW5nZWQoKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSB0aGlzLmdldFByZXZpb3VzQ29udGVudCgpLFxyXG4gICAgICAgICAgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICBjb250ZW50Q2hhbmdlZCA9IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudDsgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnRDaGFuZ2VkO1xyXG4gIH1cclxuXHJcbiAgaGFzU2VsZWN0aW9uQ2hhbmdlZCgpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHRoaXMuZ2V0UHJldmlvdXNTZWxlY3Rpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyhwcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbjsgLy8vXHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbkNoYW5nZWQ7XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2aW91c0NvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgcHJldmlvdXNDb250ZW50IH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNDb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgcHJldmlvdXNTZWxlY3Rpb24gfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBwcmV2aW91c1NlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldE1vdXNlRG93bihtb3VzZURvd24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBtb3VzZURvd25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCkge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzQ29udGVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gbnVsbCxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW91c2VEb3duLFxyXG4gICAgICBwcmV2aW91c0NvbnRlbnQsXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpc2UocHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBhY3RpdmUgfSA9ICBwcm9wZXJ0aWVzO1xyXG5cclxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICB0aGlzLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdGFnTmFtZSA9IFwidGV4dGFyZWFcIjtcclxuXHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xyXG4gICAgY2xhc3NOYW1lOiBcInJpY2hcIlxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcclxuICAgIFwib25DaGFuZ2VcIixcclxuICAgIFwib25TY3JvbGxcIixcclxuICAgIFwib25Gb2N1c1wiLFxyXG4gICAgXCJvbkJsdXJcIixcclxuICAgIFwiYWN0aXZlXCJcclxuICBdO1xyXG5cclxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XHJcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCBvblNjcm9sbCwgb25Gb2N1cywgb25CbHVyIH0gPSBwcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cclxuICAgICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgIGJsdXJIYW5kbGVyID0gb25CbHVyLCAvLy9cclxuICAgICAgICAgIHJpY2hUZXh0YXJlYSA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICByaWNoVGV4dGFyZWEuaW5pdGlhbGlzZShwcm9wZXJ0aWVzKTtcclxuXHJcbiAgICByZXR1cm4gcmljaFRleHRhcmVhO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKFJpY2hUZXh0YXJlYSlgXHJcblxyXG4gIGRpc3BsYXk6IG5vbmU7XHJcblxyXG4gIC5hY3RpdmUge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG5cclxuYFxyXG4iXX0=