"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("setimmediate");

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _easy = require("easy");

var _selection = _interopRequireDefault(require("./selection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  display: none;\n  \n  .active {\n    display: block;\n  }\n  \n"]);

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

var defer = setImmediate; ///

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

_defineProperty(RichTextarea, "ignoredProperties", ["onChange", "onScroll", "onFocus", "onBlur"]);

var _default = (0, _easyWithStyle["default"])(RichTextarea)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2hUZXh0YXJlYS5qcyJdLCJuYW1lcyI6WyJkZWZlciIsInNldEltbWVkaWF0ZSIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsIm1vdXNlRG93biIsInNldE1vdXNlRG93biIsIndpbmRvdyIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJtb3VzZURvd25IYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsImtleURvd25IYW5kbGVyIiwiaW5wdXRIYW5kbGVyIiwiaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiYWRkQ2xhc3MiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImFjdGl2ZSIsImhhc0NsYXNzIiwiZG9tRWxlbWVudCIsImdldERPTUVsZW1lbnQiLCJyZWFkT25seSIsInZhbHVlIiwiY29udGVudCIsInNlbGVjdGlvbiIsIlNlbGVjdGlvbiIsImZyb21ET01FbGVtZW50IiwiT2JqZWN0IiwiYXNzaWduIiwicHJldmlvdXNDb250ZW50Iiwic2V0UHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJwcmV2aW91c1NlbGVjdGlvbiIsInNldFByZXZpb3VzU2VsZWN0aW9uIiwiZXZlbnQiLCJlbGVtZW50IiwiZm9yY2VkIiwiaW50ZXJtZWRpYXRlSGFuZGxlciIsImlzTW91c2VEb3duIiwiaXNBY3RpdmUiLCJjYWxsIiwiaGFuZGxlciIsImNoYW5nZWQiLCJoYXNDaGFuZ2VkIiwiZ2V0Q29udGVudCIsImdldFNlbGVjdGlvbiIsInN0YXRlIiwiZ2V0U3RhdGUiLCJjb250ZW50Q2hhbmdlZCIsImhhc0NvbnRlbnRDaGFuZ2VkIiwic2VsZWN0aW9uQ2hhbmdlZCIsImhhc1NlbGVjdGlvbkNoYW5nZWQiLCJnZXRQcmV2aW91c0NvbnRlbnQiLCJjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQiLCJnZXRQcmV2aW91c1NlbGVjdGlvbiIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwidXBkYXRlU3RhdGUiLCJzZXRTdGF0ZSIsInByb3BlcnRpZXMiLCJzZXRJbml0aWFsU3RhdGUiLCJDbGFzcyIsIm9uQ2hhbmdlIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwicmljaFRleHRhcmVhIiwiRWxlbWVudCIsImZyb21DbGFzcyIsImluaXRpYWxpc2UiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLEtBQUssR0FBR0MsWUFBZCxDLENBQTRCOztJQUV0QkMsWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDQyxhQUFyQyxFQUFvREMsWUFBcEQsRUFBa0VDLFdBQWxFLEVBQStFO0FBQUE7O0FBQUE7O0FBQzdFLHNGQUFNSixRQUFOO0FBRUEsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFONkU7QUFPOUU7Ozs7K0JBRVU7QUFDVCxVQUFNQyxTQUFTLEdBQUcsS0FBbEI7QUFFQSxXQUFLQyxZQUFMLENBQWtCRCxTQUFsQjs7QUFFQUUsbUJBQU9DLEVBQVAsQ0FBVSwwQkFBVixFQUFzQyxLQUFLQyxjQUEzQyxFQUEyRCxJQUEzRCxFQUxTLENBS3lEOzs7QUFFbEUsV0FBS0QsRUFBTCxDQUFR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QUFVQSxZQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCBcInNldGltbWVkaWF0ZVwiO1xyXG5cclxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cclxuXHJcbmltcG9ydCB7IHdpbmRvdywgRWxlbWVudCB9IGZyb20gXCJlYXN5XCI7XHJcblxyXG5pbXBvcnQgU2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvblwiXHJcblxyXG5jb25zdCBkZWZlciA9IHNldEltbWVkaWF0ZTsgLy8vXHJcblxyXG5jbGFzcyBSaWNoVGV4dGFyZWEgZXh0ZW5kcyBFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgc3VwZXIoc2VsZWN0b3IpO1xyXG5cclxuICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IGNoYW5nZUhhbmRsZXI7XHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBzY3JvbGxIYW5kbGVyO1xyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgPSBmb2N1c0hhbmRsZXI7XHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyID0gYmx1ckhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIHdpbmRvdy5vbihcIm1vdXNldXAgY29udGV4dG1lbnUgYmx1clwiLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXHJcblxyXG4gICAgdGhpcy5vbihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKFwia2V5ZG93blwiLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKFwiaW5wdXRcIiwgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9uKFwic2Nyb2xsXCIsIHRoaXMuaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vbihcImZvY3VzXCIsIHRoaXMuaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub24oXCJibHVyXCIsIHRoaXMuaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub2ZmKFwibW91c2V1cCBjb250ZXh0bWVudSBibHVyXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXHJcblxyXG4gICAgdGhpcy5vZmYoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKFwia2V5ZG93blwiLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZihcImlucHV0XCIsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vZmYoXCJzY3JvbGxcIiwgdGhpcy5pbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciAmJiB0aGlzLm9mZihcImZvY3VzXCIsIHRoaXMuaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub2ZmKFwiYmx1clwiLCB0aGlzLmludGVybWVkaWF0ZUJsdXJIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBpc1JlYWRPbmx5KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgeyByZWFkT25seSB9ID0gZG9tRWxlbWVudDtcclxuICAgIFxyXG4gICAgcmV0dXJuIHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICB7IHZhbHVlIH0gPSBkb21FbGVtZW50LFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBTZWxlY3Rpb24uZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldFJlYWRPbmx5KHJlYWRPbmx5KSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihkb21FbGVtZW50LCB7XHJcbiAgICAgIHJlYWRPbmx5XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihkb21FbGVtZW50LCB7XHJcbiAgICAgIHZhbHVlXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24sICAvLy9cclxuICAgICAgICAgIGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKGRvbUVsZW1lbnQsIHtcclxuICAgICAgc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIHNlbGVjdGlvbkVuZFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuICB9O1xyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSBmYWxzZSxcclxuICAgICAgICAgIG1vdXNlRG93biA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkKSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZU1vdmVIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSBmYWxzZSxcclxuICAgICAgICAgIG1vdXNlRG93biA9IHRoaXMuaXNNb3VzZURvd24oKTtcclxuXHJcbiAgICBpZiAobW91c2VEb3duKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgdGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgdGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCB0aGlzLmNoYW5nZUhhbmRsZXIsIGZvcmNlZCk7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSBlbGVtZW50LmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuY2FsbChlbGVtZW50LCBldmVudCwgZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCB0aGlzLmZvY3VzSGFuZGxlciwgZm9yY2VkKSk7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHRoaXMuYmx1ckhhbmRsZXIsIGZvcmNlZCk7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCBoYW5kbGVyLCBmb3JjZWQpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNoYW5nZWQgPSB0aGlzLmhhc0NoYW5nZWQoKTtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkIHx8IGZvcmNlZCkge1xyXG4gICAgICAgIGhhbmRsZXIuY2FsbChlbGVtZW50LCBldmVudCwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc01vdXNlRG93bigpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBtb3VzZURvd24gfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBtb3VzZURvd247XHJcbiAgfVxyXG5cclxuICBoYXNDaGFuZ2VkKCkge1xyXG4gICAgY29uc3QgY29udGVudENoYW5nZWQgPSB0aGlzLmhhc0NvbnRlbnRDaGFuZ2VkKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gdGhpcy5oYXNTZWxlY3Rpb25DaGFuZ2VkKCksXHJcbiAgICAgICAgICBjaGFuZ2VkID0gKGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQpO1xyXG5cclxuICAgIHJldHVybiBjaGFuZ2VkO1xyXG4gIH1cclxuXHJcbiAgaGFzQ29udGVudENoYW5nZWQoKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSB0aGlzLmdldFByZXZpb3VzQ29udGVudCgpLFxyXG4gICAgICAgICAgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICBjb250ZW50Q2hhbmdlZCA9IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudDsgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnRDaGFuZ2VkO1xyXG4gIH1cclxuXHJcbiAgaGFzU2VsZWN0aW9uQ2hhbmdlZCgpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHRoaXMuZ2V0UHJldmlvdXNTZWxlY3Rpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyhwcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbjsgLy8vXHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbkNoYW5nZWQ7XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2aW91c0NvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgcHJldmlvdXNDb250ZW50IH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNDb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgcHJldmlvdXNTZWxlY3Rpb24gfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBwcmV2aW91c1NlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldE1vdXNlRG93bihtb3VzZURvd24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBtb3VzZURvd25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCkge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzQ29udGVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gbnVsbCxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW91c2VEb3duLFxyXG4gICAgICBwcmV2aW91c0NvbnRlbnQsXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpc2UocHJvcGVydGllcykge1xyXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJ0ZXh0YXJlYVwiO1xyXG5cclxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XHJcbiAgICBjbGFzc05hbWU6IFwicmljaFwiXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xyXG4gICAgXCJvbkNoYW5nZVwiLFxyXG4gICAgXCJvblNjcm9sbFwiLFxyXG4gICAgXCJvbkZvY3VzXCIsXHJcbiAgICBcIm9uQmx1clwiXHJcbiAgXTtcclxuXHJcbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1ciwgLy8vXHJcbiAgICAgICAgICByaWNoVGV4dGFyZWEgPSBFbGVtZW50LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcblxyXG4gICAgcmljaFRleHRhcmVhLmluaXRpYWxpc2UocHJvcGVydGllcyk7XHJcblxyXG4gICAgcmV0dXJuIHJpY2hUZXh0YXJlYTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShSaWNoVGV4dGFyZWEpYFxyXG5cclxuICBkaXNwbGF5OiBub25lO1xyXG4gIFxyXG4gIC5hY3RpdmUge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG4gIFxyXG5gXHJcbiJdfQ==