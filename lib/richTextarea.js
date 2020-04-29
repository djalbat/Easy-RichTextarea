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

      _easy.window.off("mouseup contextmenu blur", this.mouseUpHandler, this); ///


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
          selection = _selection["default"].fromDOMElement(domElement);

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
    key: "setReadOnly",
    value: function setReadOnly(readOnly) {
      var domElement = this.getDOMElement();
      Object.assign(domElement, {
        readOnly: readOnly
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2hUZXh0YXJlYS5qcyJdLCJuYW1lcyI6WyJkZWZlciIsInNldEltbWVkaWF0ZSIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsIm1vdXNlRG93biIsInNldE1vdXNlRG93biIsIndpbmRvdyIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJtb3VzZURvd25IYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsImtleURvd25IYW5kbGVyIiwiaW5wdXRIYW5kbGVyIiwiaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiYWRkQ2xhc3MiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImFjdGl2ZSIsImhhc0NsYXNzIiwiZG9tRWxlbWVudCIsImdldERPTUVsZW1lbnQiLCJyZWFkT25seSIsInZhbHVlIiwiY29udGVudCIsInNlbGVjdGlvbiIsIlNlbGVjdGlvbiIsImZyb21ET01FbGVtZW50IiwicHJldmlvdXNDb250ZW50IiwiT2JqZWN0IiwiYXNzaWduIiwic2V0UHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJwcmV2aW91c1NlbGVjdGlvbiIsInNldFByZXZpb3VzU2VsZWN0aW9uIiwiaW50ZXJtZWRpYXRlSGFuZGxlciIsImlzTW91c2VEb3duIiwiaGFuZGxlciIsImZvcmNlZCIsImlzQWN0aXZlIiwiZ2V0Q29udGVudCIsImdldFNlbGVjdGlvbiIsImdldFByZXZpb3VzQ29udGVudCIsImdldFByZXZpb3VzU2VsZWN0aW9uIiwiZWxlbWVudCIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsImNhbGwiLCJzdGF0ZSIsImdldFN0YXRlIiwidXBkYXRlU3RhdGUiLCJzZXRTdGF0ZSIsInByb3BlcnRpZXMiLCJzZXRJbml0aWFsU3RhdGUiLCJDbGFzcyIsIm9uQ2hhbmdlIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwicmljaFRleHRhcmVhIiwiRWxlbWVudCIsImZyb21DbGFzcyIsImluaXRpYWxpc2UiLCJjbGFzc05hbWUiLCJldmVudCIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLFlBQWQsQyxDQUE0Qjs7SUFFdEJDLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQ0MsYUFBckMsRUFBb0RDLFlBQXBELEVBQWtFQyxXQUFsRSxFQUErRTtBQUFBOztBQUFBOztBQUM3RSxzRkFBTUosUUFBTjtBQUVBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBTjZFO0FBTzlFOzs7OytCQUVVO0FBQ1QsVUFBTUMsU0FBUyxHQUFHLEtBQWxCO0FBRUEsV0FBS0MsWUFBTCxDQUFrQkQsU0FBbEI7O0FBRUFFLG1CQUFPQyxFQUFQLENBQVUsMEJBQVYsRUFBc0MsS0FBS0MsY0FBM0MsRUFBMkQsSUFBM0QsRUFMUyxDQUt5RDs7O0FBRWxFLFdBQUtELEVBQUwsQ0FBUSxXQUFSLEVBQXFCLEtBQUtFLGdCQUExQixFQUE0QyxJQUE1QztBQUVBLFdBQUtGLEVBQUwsQ0FBUSxXQUFSLEVBQXFCLEtBQUtHLGdCQUExQixFQUE0QyxJQUE1QztBQUVBLFdBQUtILEVBQUwsQ0FBUSxTQUFSLEVBQW1CLEtBQUtJLGNBQXhCLEVBQXdDLElBQXhDO0FBRUEsV0FBS0osRUFBTCxDQUFRLE9BQVIsRUFBaUIsS0FBS0ssWUFBdEIsRUFBb0MsSUFBcEM7QUFFQSxXQUFLWCxhQUFMLElBQXNCLEtBQUtNLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLEtBQUtOLGFBQXZCLEVBQXNDLElBQXRDLEVBQTRDWSx5QkFBNUMsQ0FBdEI7QUFFQSxXQUFLWCxZQUFMLElBQXFCLEtBQUtLLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLEtBQUtMLFlBQXRCLEVBQW9DLElBQXBDLEVBQTBDWSx3QkFBMUMsQ0FBckI7QUFFQSxXQUFLWCxXQUFMLElBQW9CLEtBQUtJLEVBQUwsQ0FBUSxNQUFSLEVBQWdCLEtBQUtKLFdBQXJCLEVBQWtDLElBQWxDLEVBQXdDWSx1QkFBeEMsQ0FBcEI7QUFFQSxXQUFLQyxRQUFMLENBQWMsUUFBZDtBQUNEOzs7aUNBRVk7QUFDWCxVQUFNWixTQUFTLEdBQUcsS0FBbEI7QUFFQSxXQUFLQyxZQUFMLENBQWtCRCxTQUFsQjs7QUFFQUUsbUJBQU9XLEdBQVAsQ0FBVywwQkFBWCxFQUF1QyxLQUFLVCxjQUE1QyxFQUE0RCxJQUE1RCxFQUxXLENBS3lEOzs7QUFFcEUsV0FBS1MsR0FBTCxDQUFTLFdBQVQsRUFBc0IsS0FBS1IsZ0JBQTNCLEVBQTZDLElBQTdDO0FBRUEsV0FBS1EsR0FBTCxDQUFTLFdBQVQsRUFBc0IsS0FBS1AsZ0JBQTNCLEVBQTZDLElBQTdDO0FBRUEsV0FBS08sR0FBTCxDQUFTLFNBQVQsRUFBb0IsS0FBS04sY0FBekIsRUFBeUMsSUFBekM7QUFFQSxXQUFLTSxHQUFMLENBQVMsT0FBVCxFQUFrQixLQUFLTCxZQUF2QixFQUFxQyxJQUFyQztBQUVBLFdBQUtYLGFBQUwsSUFBc0IsS0FBS2dCLEdBQUwsQ0FBUyxRQUFULEVBQW1CLEtBQUtoQixhQUF4QixFQUF1QyxJQUF2QyxDQUF0QjtBQUVBLFdBQUtDLFlBQUwsSUFBcUIsS0FBS2UsR0FBTCxDQUFTLE9BQVQsRUFBa0IsS0FBS2YsWUFBdkIsRUFBcUMsSUFBckMsQ0FBckI7QUFFQSxXQUFLQyxXQUFMLElBQW9CLEtBQUtjLEdBQUwsQ0FBUyxNQUFULEVBQWlCLEtBQUtkLFdBQXRCLEVBQW1DLElBQW5DLENBQXBCO0FBRUEsV0FBS2UsV0FBTCxDQUFpQixRQUFqQjtBQUNEOzs7K0JBRVU7QUFDVCxVQUFNQyxNQUFNLEdBQUcsS0FBS0MsUUFBTCxDQUFjLFFBQWQsQ0FBZjtBQUVBLGFBQU9ELE1BQVA7QUFDRDs7O2lDQUVZO0FBQ0wsVUFBQUUsVUFBVSxHQUFHLEtBQUtDLGFBQUwsRUFBYjtBQUFBLFVBQ0VDLFFBREYsR0FDZUYsVUFEZixDQUNFRSxRQURGO0FBR04sYUFBT0EsUUFBUDtBQUNEOzs7aUNBRVk7QUFDTCxVQUFBRixVQUFVLEdBQUcsS0FBS0MsYUFBTCxFQUFiO0FBQUEsVUFDRUUsS0FERixHQUNZSCxVQURaLENBQ0VHLEtBREY7QUFBQSxVQUVBQyxPQUZBLEdBRVVELEtBRlYsQ0FESyxDQUdhOztBQUV4QixhQUFPQyxPQUFQO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQU1KLFVBQVUsR0FBRyxLQUFLQyxhQUFMLEVBQW5CO0FBQUEsVUFDTUksU0FBUyxHQUFHQyxzQkFBVUMsY0FBVixDQUF5QlAsVUFBekIsQ0FEbEI7O0FBR0EsYUFBT0ssU0FBUDtBQUNEOzs7K0JBRVVELE8sRUFBUztBQUNsQixVQUFNRCxLQUFLLEdBQUdDLE9BQWQ7QUFBQSxVQUF3QjtBQUNsQkksTUFBQUEsZUFBZSxHQUFHSixPQUR4QjtBQUFBLFVBQ2tDO0FBQzVCSixNQUFBQSxVQUFVLEdBQUcsS0FBS0MsYUFBTCxFQUZuQjtBQUlBUSxNQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY1YsVUFBZCxFQUEwQjtBQUN4QkcsUUFBQUEsS0FBSyxFQUFMQTtBQUR3QixPQUExQjtBQUlBLFdBQUtRLGtCQUFMLENBQXdCSCxlQUF4QjtBQUNEOzs7aUNBRVlILFMsRUFBVztBQUN0QixVQUFNTyxzQkFBc0IsR0FBR1AsU0FBUyxDQUFDUSxnQkFBVixFQUEvQjtBQUFBLFVBQ01DLG9CQUFvQixHQUFHVCxTQUFTLENBQUNVLGNBQVYsRUFEN0I7QUFBQSxVQUVNQyxjQUFjLEdBQUdKLHNCQUZ2QjtBQUFBLFVBRWdEO0FBQzFDSyxNQUFBQSxZQUFZLEdBQUdILG9CQUhyQjtBQUFBLFVBRzRDO0FBQ3RDSSxNQUFBQSxpQkFBaUIsR0FBR2IsU0FKMUI7QUFBQSxVQUlzQztBQUNoQ0wsTUFBQUEsVUFBVSxHQUFHLEtBQUtDLGFBQUwsRUFMbkI7QUFPQVEsTUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNWLFVBQWQsRUFBMEI7QUFDeEJnQixRQUFBQSxjQUFjLEVBQWRBLGNBRHdCO0FBRXhCQyxRQUFBQSxZQUFZLEVBQVpBO0FBRndCLE9BQTFCO0FBS0EsV0FBS0Usb0JBQUwsQ0FBMEJELGlCQUExQjtBQUNEOzs7Z0NBRVdoQixRLEVBQVU7QUFDcEIsVUFBTUYsVUFBVSxHQUFHLEtBQUtDLGFBQUwsRUFBbkI7QUFFQVEsTUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNWLFVBQWQsRUFBMEI7QUFDeEJFLFFBQUFBLFFBQVEsRUFBUkE7QUFEd0IsT0FBMUI7QUFHRDs7O3FDQUVnQjtBQUNmLFVBQU1uQixTQUFTLEdBQUcsS0FBbEI7QUFFQSxXQUFLQyxZQUFMLENBQWtCRCxTQUFsQjtBQUNEOzs7dUNBRWtCO0FBQUE7O0FBQ2pCLFVBQU1BLFNBQVMsR0FBRyxJQUFsQjtBQUVBLFdBQUtDLFlBQUwsQ0FBa0JELFNBQWxCO0FBRUFSLE1BQUFBLEtBQUssQ0FBQztBQUFBLGVBQU0sTUFBSSxDQUFDNkMsbUJBQUwsQ0FBeUIsTUFBSSxDQUFDekMsYUFBOUIsQ0FBTjtBQUFBLE9BQUQsQ0FBTDtBQUNEOzs7dUNBRWtCO0FBQ2pCLFVBQU1JLFNBQVMsR0FBRyxLQUFLc0MsV0FBTCxFQUFsQjs7QUFFQSxVQUFJdEMsU0FBSixFQUFlO0FBQ2IsYUFBS3FDLG1CQUFMLENBQXlCLEtBQUt6QyxhQUE5QjtBQUNEO0FBQ0Y7OztxQ0FFZ0I7QUFBQTs7QUFDZkosTUFBQUEsS0FBSyxDQUFDO0FBQUEsZUFBTSxNQUFJLENBQUM2QyxtQkFBTCxDQUF5QixNQUFJLENBQUN6QyxhQUE5QixDQUFOO0FBQUEsT0FBRCxDQUFMO0FBQ0Q7OzttQ0FFYztBQUNiLFdBQUt5QyxtQkFBTCxDQUF5QixLQUFLekMsYUFBOUI7QUFDRDs7O3dDQUVtQjJDLE8sRUFBeUI7QUFBQSxVQUFoQkMsTUFBZ0IsdUVBQVAsS0FBTztBQUMzQyxVQUFNekIsTUFBTSxHQUFHLEtBQUswQixRQUFMLEVBQWY7O0FBRUEsVUFBSTFCLE1BQUosRUFBWTtBQUNWLFlBQU1NLE9BQU8sR0FBRyxLQUFLcUIsVUFBTCxFQUFoQjtBQUFBLFlBQ01wQixTQUFTLEdBQUcsS0FBS3FCLFlBQUwsRUFEbEI7QUFHQSxZQUFJbEIsZUFBZSxHQUFHLEtBQUttQixrQkFBTCxFQUF0QjtBQUFBLFlBQ0lULGlCQUFpQixHQUFHLEtBQUtVLG9CQUFMLEVBRHhCO0FBR0EsWUFBTUMsT0FBTyxHQUFHLElBQWhCO0FBQUEsWUFBc0I7QUFDaEJDLFFBQUFBLGlDQUFpQyxHQUFJMUIsT0FBTyxLQUFLSSxlQUR2RDtBQUFBLFlBRU11QixxQ0FBcUMsR0FBRzFCLFNBQVMsQ0FBQzJCLGFBQVYsQ0FBd0JkLGlCQUF4QixDQUY5QztBQUFBLFlBR01lLGNBQWMsR0FBR0gsaUNBSHZCO0FBQUEsWUFHMEQ7QUFDcERJLFFBQUFBLGdCQUFnQixHQUFHSCxxQ0FKekI7QUFBQSxZQUlnRTtBQUMxREksUUFBQUEsT0FBTyxHQUFHRixjQUFjLElBQUlDLGdCQUxsQzs7QUFPQSxZQUFJQyxPQUFPLElBQUlaLE1BQWYsRUFBdUI7QUFDckJELFVBQUFBLE9BQU8sQ0FBQ2MsSUFBUixDQUFhLElBQWIsRUFBbUJoQyxPQUFuQixFQUE0QkMsU0FBNUIsRUFBdUM0QixjQUF2QyxFQUF1REMsZ0JBQXZELEVBQXlFTCxPQUF6RTtBQUNEOztBQUVEckIsUUFBQUEsZUFBZSxHQUFHSixPQUFsQixDQWxCVSxDQWtCa0I7O0FBQzVCYyxRQUFBQSxpQkFBaUIsR0FBR2IsU0FBcEIsQ0FuQlUsQ0FtQnNCOztBQUVoQyxhQUFLTSxrQkFBTCxDQUF3QkgsZUFBeEI7QUFDQSxhQUFLVyxvQkFBTCxDQUEwQkQsaUJBQTFCO0FBQ0Q7QUFDRjs7O2tDQUVhO0FBQ04sVUFBQW1CLEtBQUssR0FBRyxLQUFLQyxRQUFMLEVBQVI7QUFBQSxVQUNFdkQsU0FERixHQUNnQnNELEtBRGhCLENBQ0V0RCxTQURGO0FBR04sYUFBT0EsU0FBUDtBQUNEOzs7eUNBRW9CO0FBQ2IsVUFBQXNELEtBQUssR0FBRyxLQUFLQyxRQUFMLEVBQVI7QUFBQSxVQUNFOUIsZUFERixHQUNzQjZCLEtBRHRCLENBQ0U3QixlQURGO0FBR04sYUFBT0EsZUFBUDtBQUNEOzs7MkNBRXNCO0FBQ2YsVUFBQTZCLEtBQUssR0FBRyxLQUFLQyxRQUFMLEVBQVI7QUFBQSxVQUNFcEIsaUJBREYsR0FDd0JtQixLQUR4QixDQUNFbkIsaUJBREY7QUFHTixhQUFPQSxpQkFBUDtBQUNEOzs7aUNBRVluQyxTLEVBQVc7QUFDdEIsV0FBS3dELFdBQUwsQ0FBaUI7QUFDZnhELFFBQUFBLFNBQVMsRUFBVEE7QUFEZSxPQUFqQjtBQUdEOzs7dUNBRWtCeUIsZSxFQUFpQjtBQUNsQyxXQUFLK0IsV0FBTCxDQUFpQjtBQUNmL0IsUUFBQUEsZUFBZSxFQUFmQTtBQURlLE9BQWpCO0FBR0Q7Ozt5Q0FFb0JVLGlCLEVBQW1CO0FBQ3RDLFdBQUtxQixXQUFMLENBQWlCO0FBQ2ZyQixRQUFBQSxpQkFBaUIsRUFBakJBO0FBRGUsT0FBakI7QUFHRDs7O3NDQUVpQjtBQUNoQixVQUFNbkMsU0FBUyxHQUFHLEtBQWxCO0FBQUEsVUFDTXlCLGVBQWUsR0FBRyxJQUR4QjtBQUFBLFVBRU1VLGlCQUFpQixHQUFHLElBRjFCO0FBSUEsV0FBS3NCLFFBQUwsQ0FBYztBQUNaekQsUUFBQUEsU0FBUyxFQUFUQSxTQURZO0FBRVp5QixRQUFBQSxlQUFlLEVBQWZBLGVBRlk7QUFHWlUsUUFBQUEsaUJBQWlCLEVBQWpCQTtBQUhZLE9BQWQ7QUFLRDs7OytCQUVVdUIsVSxFQUFZO0FBQ3JCLFdBQUtDLGVBQUw7QUFDRDs7OzhCQWVnQkMsSyxFQUFPRixVLEVBQVk7QUFBQSxVQUMxQkcsUUFEMEIsR0FDY0gsVUFEZCxDQUMxQkcsUUFEMEI7QUFBQSxVQUNoQkMsUUFEZ0IsR0FDY0osVUFEZCxDQUNoQkksUUFEZ0I7QUFBQSxVQUNOQyxPQURNLEdBQ2NMLFVBRGQsQ0FDTkssT0FETTtBQUFBLFVBQ0dDLE1BREgsR0FDY04sVUFEZCxDQUNHTSxNQURIO0FBQUEsVUFFNUJwRSxhQUY0QixHQUVaaUUsUUFGWTtBQUFBLFVBRzVCaEUsYUFINEIsR0FHWmlFLFFBSFk7QUFBQSxVQUk1QmhFLFlBSjRCLEdBSWJpRSxPQUphO0FBQUEsVUFLNUJoRSxXQUw0QixHQUtkaUUsTUFMYztBQUFBLFVBTTVCQyxZQU40QixHQU1iQyxjQUFRQyxTQUFSLENBQWtCUCxLQUFsQixFQUF5QkYsVUFBekIsRUFBcUM5RCxhQUFyQyxFQUFvREMsYUFBcEQsRUFBbUVDLFlBQW5FLEVBQWlGQyxXQUFqRixDQU5hOztBQVFsQ2tFLE1BQUFBLFlBQVksQ0FBQ0csVUFBYixDQUF3QlYsVUFBeEI7QUFFQSxhQUFPTyxZQUFQO0FBQ0Q7Ozs7RUFwUXdCQyxhOztnQkFBckJ4RSxZLGFBNE9hLFU7O2dCQTVPYkEsWSx1QkE4T3VCO0FBQ3pCMkUsRUFBQUEsU0FBUyxFQUFFO0FBRGMsQzs7Z0JBOU92QjNFLFksdUJBa1B1QixDQUN6QixVQUR5QixFQUV6QixVQUZ5QixFQUd6QixTQUh5QixFQUl6QixRQUp5QixDOztlQXFCZCwrQkFBVUEsWUFBVixDOzs7O0FBVWYsU0FBU2UseUJBQVQsQ0FBbUNaLGFBQW5DLEVBQWtEeUUsS0FBbEQsRUFBeUR4QixPQUF6RCxFQUFrRTtBQUNoRSxNQUFNL0IsTUFBTSxHQUFHK0IsT0FBTyxDQUFDTCxRQUFSLEVBQWY7O0FBRUEsTUFBSTFCLE1BQUosRUFBWTtBQUNWLFFBQU13RCxTQUFTLEdBQUd6QixPQUFPLENBQUMwQixZQUFSLEVBQWxCO0FBQUEsUUFDTUMsVUFBVSxHQUFHM0IsT0FBTyxDQUFDNEIsYUFBUixFQURuQjtBQUdBN0UsSUFBQUEsYUFBYSxDQUFDd0QsSUFBZCxDQUFtQlAsT0FBbkIsRUFBNEJ5QixTQUE1QixFQUF1Q0UsVUFBdkMsRUFBbURILEtBQW5ELEVBQTBEeEIsT0FBMUQ7QUFDRDtBQUNGOztBQUVELFNBQVNwQyx3QkFBVCxDQUFrQ1osWUFBbEMsRUFBZ0R3RSxLQUFoRCxFQUF1RHhCLE9BQXZELEVBQWdFO0FBQzlEdEQsRUFBQUEsS0FBSyxDQUFDLFlBQU07QUFDVixRQUFNZ0QsTUFBTSxHQUFHLElBQWY7QUFFQU0sSUFBQUEsT0FBTyxDQUFDVCxtQkFBUixDQUE0QnZDLFlBQTVCLEVBQTBDMEMsTUFBMUM7QUFDRCxHQUpJLENBQUw7QUFLRDs7QUFFRCxTQUFTN0IsdUJBQVQsQ0FBaUNaLFdBQWpDLEVBQThDdUUsS0FBOUMsRUFBcUR4QixPQUFyRCxFQUE4RDtBQUM1RCxNQUFNTixNQUFNLEdBQUcsSUFBZjtBQUVBTSxFQUFBQSxPQUFPLENBQUNULG1CQUFSLENBQTRCdEMsV0FBNUIsRUFBeUN5QyxNQUF6QztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgXCJzZXRpbW1lZGlhdGVcIjtcclxuXHJcbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXHJcblxyXG5pbXBvcnQgeyB3aW5kb3csIEVsZW1lbnQgfSBmcm9tIFwiZWFzeVwiO1xyXG5cclxuaW1wb3J0IFNlbGVjdGlvbiBmcm9tIFwiLi9zZWxlY3Rpb25cIlxyXG5cclxuY29uc3QgZGVmZXIgPSBzZXRJbW1lZGlhdGU7IC8vL1xyXG5cclxuY2xhc3MgUmljaFRleHRhcmVhIGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBjaGFuZ2VIYW5kbGVyO1xyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjtcclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyID0gZm9jdXNIYW5kbGVyO1xyXG4gICAgdGhpcy5ibHVySGFuZGxlciA9IGJsdXJIYW5kbGVyO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub24oXCJtb3VzZXVwIGNvbnRleHRtZW51IGJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xyXG5cclxuICAgIHRoaXMub24oXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbihcImtleWRvd25cIiwgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbihcImlucHV0XCIsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vbihcInNjcm9sbFwiLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub24oXCJmb2N1c1wiLCB0aGlzLmZvY3VzSGFuZGxlciwgdGhpcywgaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub24oXCJibHVyXCIsIHRoaXMuYmx1ckhhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9mZihcIm1vdXNldXAgY29udGV4dG1lbnUgYmx1clwiLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xyXG5cclxuICAgIHRoaXMub2ZmKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZihcImtleWRvd25cIiwgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoXCJpbnB1dFwiLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub2ZmKFwic2Nyb2xsXCIsIHRoaXMuc2Nyb2xsSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vZmYoXCJmb2N1c1wiLCB0aGlzLmZvY3VzSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9mZihcImJsdXJcIiwgdGhpcy5ibHVySGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbiAgICByZXR1cm4gYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgaXNSZWFkT25seSgpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHsgcmVhZE9ubHkgfSA9IGRvbUVsZW1lbnQ7XHJcbiAgICBcclxuICAgIHJldHVybiByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgeyB2YWx1ZSB9ID0gZG9tRWxlbWVudCxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gU2VsZWN0aW9uLmZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oZG9tRWxlbWVudCwge1xyXG4gICAgICB2YWx1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihkb21FbGVtZW50LCB7XHJcbiAgICAgIHNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBzZWxlY3Rpb25FbmRcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVhZE9ubHkocmVhZE9ubHkpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKGRvbUVsZW1lbnQsIHtcclxuICAgICAgcmVhZE9ubHlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcikpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IHRoaXMuaXNNb3VzZURvd24oKTtcclxuXHJcbiAgICBpZiAobW91c2VEb3duKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyKSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIGludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZm9yY2VkID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgIGxldCBwcmV2aW91c0NvbnRlbnQgPSB0aGlzLmdldFByZXZpb3VzQ29udGVudCgpLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSB0aGlzLmdldFByZXZpb3VzU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcywgLy8vXHJcbiAgICAgICAgICAgIGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCA9IChjb250ZW50ICE9PSBwcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLmlzRGlmZmVyZW50VG8ocHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgICBjb250ZW50Q2hhbmdlZCA9IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCwgLy8vXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uLCAvLy9cclxuICAgICAgICAgICAgY2hhbmdlZCA9IGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gICAgICBpZiAoY2hhbmdlZCB8fCBmb3JjZWQpIHtcclxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgY29udGVudCwgc2VsZWN0aW9uLCBjb250ZW50Q2hhbmdlZCwgc2VsZWN0aW9uQ2hhbmdlZCwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNb3VzZURvd24oKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgbW91c2VEb3duIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gbW91c2VEb3duO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzQ29udGVudCB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzQ29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzU2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzU2VsZWN0aW9uIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZURvd24obW91c2VEb3duKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgbW91c2VEb3duXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c0NvbnRlbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IG51bGwsXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93bixcclxuICAgICAgcHJldmlvdXNDb250ZW50LFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXNlKHByb3BlcnRpZXMpIHtcclxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdGFnTmFtZSA9IFwidGV4dGFyZWFcIjtcclxuXHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xyXG4gICAgY2xhc3NOYW1lOiBcInJpY2hcIlxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcclxuICAgIFwib25DaGFuZ2VcIixcclxuICAgIFwib25TY3JvbGxcIixcclxuICAgIFwib25Gb2N1c1wiLFxyXG4gICAgXCJvbkJsdXJcIlxyXG4gIF07XHJcblxyXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsLCBvbkZvY3VzLCBvbkJsdXIgfSA9IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsLCAvLy9cclxuICAgICAgICAgIGZvY3VzSGFuZGxlciA9IG9uRm9jdXMsIC8vL1xyXG4gICAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXIsIC8vL1xyXG4gICAgICAgICAgcmljaFRleHRhcmVhID0gRWxlbWVudC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHJpY2hUZXh0YXJlYS5pbml0aWFsaXNlKHByb3BlcnRpZXMpO1xyXG5cclxuICAgIHJldHVybiByaWNoVGV4dGFyZWE7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoUmljaFRleHRhcmVhKWBcclxuXHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBcclxuICAuYWN0aXZlIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuICBcclxuYFxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IGVsZW1lbnQuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZWxlbWVudC5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSBlbGVtZW50LmdldFNjcm9sbExlZnQoKTtcclxuXHJcbiAgICBzY3JvbGxIYW5kbGVyLmNhbGwoZWxlbWVudCwgc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0LCBldmVudCwgZWxlbWVudCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIoZm9jdXNIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xyXG4gIGRlZmVyKCgpID0+IHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gICAgZWxlbWVudC5pbnRlcm1lZGlhdGVIYW5kbGVyKGZvY3VzSGFuZGxlciwgZm9yY2VkKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIoYmx1ckhhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgZWxlbWVudC5pbnRlcm1lZGlhdGVIYW5kbGVyKGJsdXJIYW5kbGVyLCBmb3JjZWQpO1xyXG59XHJcbiJdfQ==