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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defer = function defer(func) {
  return setTimeout(func, 0);
}; ///


var RichTextarea = /*#__PURE__*/function (_Element) {
  _inherits(RichTextarea, _Element);

  var _super = _createSuper(RichTextarea);

  function RichTextarea(selectorOrDOMElement, changeHandler, scrollHandler, focusHandler, blurHandler) {
    var _this;

    _classCallCheck(this, RichTextarea);

    _this = _super.call(this, selectorOrDOMElement);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2hUZXh0YXJlYS5qcyJdLCJuYW1lcyI6WyJkZWZlciIsImZ1bmMiLCJzZXRUaW1lb3V0IiwiUmljaFRleHRhcmVhIiwic2VsZWN0b3JPckRPTUVsZW1lbnQiLCJjaGFuZ2VIYW5kbGVyIiwic2Nyb2xsSGFuZGxlciIsImZvY3VzSGFuZGxlciIsImJsdXJIYW5kbGVyIiwibW91c2VEb3duIiwic2V0TW91c2VEb3duIiwid2luZG93Iiwib24iLCJtb3VzZVVwSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJtb3VzZU1vdmVIYW5kbGVyIiwia2V5RG93bkhhbmRsZXIiLCJpbnB1dEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyIiwiaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyIiwiaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIiLCJhZGRDbGFzcyIsIm9mZiIsInJlbW92ZUNsYXNzIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJkb21FbGVtZW50IiwiZ2V0RE9NRWxlbWVudCIsInJlYWRPbmx5IiwidmFsdWUiLCJjb250ZW50Iiwic2VsZWN0aW9uIiwiU2VsZWN0aW9uIiwiZnJvbURPTUVsZW1lbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJwcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJldmVudCIsImVsZW1lbnQiLCJmb3JjZWQiLCJpbnRlcm1lZGlhdGVIYW5kbGVyIiwiaXNNb3VzZURvd24iLCJpc0FjdGl2ZSIsImNhbGwiLCJoYW5kbGVyIiwiY2hhbmdlZCIsImhhc0NoYW5nZWQiLCJnZXRDb250ZW50IiwiZ2V0U2VsZWN0aW9uIiwic3RhdGUiLCJnZXRTdGF0ZSIsImNvbnRlbnRDaGFuZ2VkIiwiaGFzQ29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiaGFzU2VsZWN0aW9uQ2hhbmdlZCIsImdldFByZXZpb3VzQ29udGVudCIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsImdldFByZXZpb3VzU2VsZWN0aW9uIiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsInNldEluaXRpYWxTdGF0ZSIsImFjdGl2YXRlIiwiQ2xhc3MiLCJvbkNoYW5nZSIsIm9uU2Nyb2xsIiwib25Gb2N1cyIsIm9uQmx1ciIsInJpY2hUZXh0YXJlYSIsIkVsZW1lbnQiLCJmcm9tQ2xhc3MiLCJpbml0aWFsaXNlIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQ0MsSUFBRDtBQUFBLFNBQVVDLFVBQVUsQ0FBQ0QsSUFBRCxFQUFPLENBQVAsQ0FBcEI7QUFBQSxDQUFkLEMsQ0FBNkM7OztJQUV2Q0UsWTs7Ozs7QUFDSix3QkFBWUMsb0JBQVosRUFBa0NDLGFBQWxDLEVBQWlEQyxhQUFqRCxFQUFnRUMsWUFBaEUsRUFBOEVDLFdBQTlFLEVBQTJGO0FBQUE7O0FBQUE7O0FBQ3pGLDhCQUFNSixvQkFBTjtBQUVBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBTnlGO0FBTzFGOzs7OytCQUVVO0FBQ1QsVUFBTUMsU0FBUyxHQUFHLEtBQWxCO0FBRUEsV0FBS0MsWUFBTCxDQUFrQkQs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QXhCO0FBRUEsYUFBT1EsWUFBUDtBQUNEOzs7O0VBdFR3QkMsYTs7Z0JBQXJCN0UsWSxhQTZSYSxVOztnQkE3UmJBLFksdUJBK1J1QjtBQUN6QmdGLEVBQUFBLFNBQVMsRUFBRTtBQURjLEM7O2dCQS9SdkJoRixZLHVCQW1TdUIsQ0FDekIsVUFEeUIsRUFFekIsVUFGeUIsRUFHekIsU0FIeUIsRUFJekIsUUFKeUIsRUFLekIsUUFMeUIsQzs7ZUFzQmQsK0JBQVVBLFlBQVYsQyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cclxuXHJcbmltcG9ydCB7IHdpbmRvdywgRWxlbWVudCB9IGZyb20gXCJlYXN5XCI7XHJcblxyXG5pbXBvcnQgU2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvblwiXHJcblxyXG5jb25zdCBkZWZlciA9IChmdW5jKSA9PiBzZXRUaW1lb3V0KGZ1bmMsIDApOyAvLy9cclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yT3JET01FbGVtZW50LCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvck9yRE9NRWxlbWVudCk7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICBcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9uKFwibW91c2V1cCBjb250ZXh0bWVudSBibHVyXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cclxuXHJcbiAgICB0aGlzLm9uKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oXCJrZXlkb3duXCIsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oXCJpbnB1dFwiLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub24oXCJzY3JvbGxcIiwgdGhpcy5pbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciAmJiB0aGlzLm9uKFwiZm9jdXNcIiwgdGhpcy5pbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgJiYgdGhpcy5vbihcImJsdXJcIiwgdGhpcy5pbnRlcm1lZGlhdGVCbHVySGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoXCJtb3VzZXVwIGNvbnRleHRtZW51IGJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cclxuXHJcbiAgICB0aGlzLm9mZihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoXCJrZXlkb3duXCIsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKFwiaW5wdXRcIiwgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9mZihcInNjcm9sbFwiLCB0aGlzLmludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub2ZmKFwiZm9jdXNcIiwgdGhpcy5pbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgJiYgdGhpcy5vZmYoXCJibHVyXCIsIHRoaXMuaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBpc0FjdGl2ZSgpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaGFzQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGlzUmVhZE9ubHkoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICB7IHJlYWRPbmx5IH0gPSBkb21FbGVtZW50O1xyXG4gICAgXHJcbiAgICByZXR1cm4gcmVhZE9ubHk7IFxyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCgpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHsgdmFsdWUgfSA9IGRvbUVsZW1lbnQsXHJcbiAgICAgICAgICBjb250ZW50ID0gdmFsdWU7ICAvLy9cclxuXHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IFNlbGVjdGlvbi5mcm9tRE9NRWxlbWVudChkb21FbGVtZW50KTtcclxuXHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVhZE9ubHkocmVhZE9ubHkpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKGRvbUVsZW1lbnQsIHtcclxuICAgICAgcmVhZE9ubHlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29udGVudChjb250ZW50KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKGRvbUVsZW1lbnQsIHtcclxuICAgICAgdmFsdWVcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbiwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oZG9tRWxlbWVudCwge1xyXG4gICAgICBzZWxlY3Rpb25TdGFydCxcclxuICAgICAgc2VsZWN0aW9uRW5kXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIG1vdXNlVXBIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IGZhbHNlLFxyXG4gICAgICAgICAgbW91c2VEb3duID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgdGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpKTtcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IGZhbHNlLFxyXG4gICAgICAgICAgbW91c2VEb3duID0gdGhpcy5pc01vdXNlRG93bigpO1xyXG5cclxuICAgIGlmIChtb3VzZURvd24pIHtcclxuICAgICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCB0aGlzLmNoYW5nZUhhbmRsZXIsIGZvcmNlZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBrZXlEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gZmFsc2U7XHJcblxyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCB0aGlzLmNoYW5nZUhhbmRsZXIsIGZvcmNlZCkpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkKTtcclxuICB9XHJcblxyXG4gIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IGVsZW1lbnQuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5jYWxsKGVsZW1lbnQsIGV2ZW50LCBlbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHRoaXMuZm9jdXNIYW5kbGVyLCBmb3JjZWQpKTtcclxuICB9XHJcblxyXG4gIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgdGhpcy5ibHVySGFuZGxlciwgZm9yY2VkKTtcclxuICB9XHJcblxyXG4gIGludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIGhhbmRsZXIsIGZvcmNlZCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY2hhbmdlZCA9IHRoaXMuaGFzQ2hhbmdlZCgpO1xyXG5cclxuICAgICAgaWYgKGNoYW5nZWQgfHwgZm9yY2VkKSB7XHJcbiAgICAgICAgaGFuZGxlci5jYWxsKGVsZW1lbnQsIGV2ZW50LCBlbGVtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzTW91c2VEb3duKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IG1vdXNlRG93biB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIG1vdXNlRG93bjtcclxuICB9XHJcblxyXG4gIGhhc0NoYW5nZWQoKSB7XHJcbiAgICBjb25zdCBjb250ZW50Q2hhbmdlZCA9IHRoaXMuaGFzQ29udGVudENoYW5nZWQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSB0aGlzLmhhc1NlbGVjdGlvbkNoYW5nZWQoKSxcclxuICAgICAgICAgIGNoYW5nZWQgPSAoY29udGVudENoYW5nZWQgfHwgc2VsZWN0aW9uQ2hhbmdlZCk7XHJcblxyXG4gICAgcmV0dXJuIGNoYW5nZWQ7XHJcbiAgfVxyXG5cclxuICBoYXNDb250ZW50Q2hhbmdlZCgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IHRoaXMuZ2V0UHJldmlvdXNDb250ZW50KCksXHJcbiAgICAgICAgICBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQgPSAoY29udGVudCAhPT0gcHJldmlvdXNDb250ZW50KSxcclxuICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50OyAvLy9cclxuXHJcbiAgICByZXR1cm4gY29udGVudENoYW5nZWQ7XHJcbiAgfVxyXG5cclxuICBoYXNTZWxlY3Rpb25DaGFuZ2VkKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbi5pc0RpZmZlcmVudFRvKHByZXZpb3VzU2VsZWN0aW9uKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uOyAvLy9cclxuXHJcbiAgICByZXR1cm4gc2VsZWN0aW9uQ2hhbmdlZDtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzQ29udGVudCgpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBwcmV2aW91c0NvbnRlbnQgfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBwcmV2aW91c0NvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2aW91c1NlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBwcmV2aW91c1NlbGVjdGlvbiB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0TW91c2VEb3duKG1vdXNlRG93bikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93blxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNDb250ZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2UsXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBudWxsLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb3VzZURvd24sXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCxcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGlzZShwcm9wZXJ0aWVzKSB7XHJcbiAgICBjb25zdCB7IGFjdGl2ZSB9ID0gIHByb3BlcnRpZXM7XHJcblxyXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJ0ZXh0YXJlYVwiO1xyXG5cclxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XHJcbiAgICBjbGFzc05hbWU6IFwicmljaFwiXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xyXG4gICAgXCJvbkNoYW5nZVwiLFxyXG4gICAgXCJvblNjcm9sbFwiLFxyXG4gICAgXCJvbkZvY3VzXCIsXHJcbiAgICBcIm9uQmx1clwiLFxyXG4gICAgXCJhY3RpdmVcIlxyXG4gIF07XHJcblxyXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsLCBvbkZvY3VzLCBvbkJsdXIgfSA9IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsLCAvLy9cclxuICAgICAgICAgIGZvY3VzSGFuZGxlciA9IG9uRm9jdXMsIC8vL1xyXG4gICAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXIsIC8vL1xyXG4gICAgICAgICAgcmljaFRleHRhcmVhID0gRWxlbWVudC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHJpY2hUZXh0YXJlYS5pbml0aWFsaXNlKHByb3BlcnRpZXMpO1xyXG5cclxuICAgIHJldHVybiByaWNoVGV4dGFyZWE7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoUmljaFRleHRhcmVhKWBcclxuXHJcbiAgZGlzcGxheTogbm9uZTtcclxuXHJcbiAgLmFjdGl2ZSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcblxyXG5gXHJcbiJdfQ==