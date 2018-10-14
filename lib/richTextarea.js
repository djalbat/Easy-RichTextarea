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

      this.scrollHandler && this.on('scroll', this.scrollHandler, null, intermediateScrollHandler.bind(this));

      this.focusHandler && this.on('focus', this.focusHandler, null, intermediateFocusHandler.bind(this));

      this.blurHandler && this.on('blur', this.blurHandler, null, intermediateBlurHandler.bind(this));

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

      this.scrollHandler && this.off('scroll', this.scrollHandler, null);

      this.focusHandler && this.off('focus', this.focusHandler, null);

      this.blurHandler && this.off('blur', this.blurHandler, null);

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
      var _this2 = this;

      var mouseDown = true;

      this.setMouseDown(mouseDown);

      defer(function () {
        return _this2.callHandler();
      });
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
      var _this3 = this;

      defer(function () {
        return _this3.callHandler();
      });
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
          handler(content, selection, contentChanged, selectionChanged);
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

function intermediateScrollHandler(scrollHandler, event) {
  var active = this.isActive();

  if (active) {
    var scrollTop = this.getScrollTop(),
        scrollLeft = this.getScrollLeft();

    scrollHandler(scrollTop, scrollLeft, event);
  }
}

function intermediateFocusHandler(focusHandler) {
  var _this4 = this;

  defer(function () {
    var forced = true;

    _this4.callHandler(focusHandler, forced);
  });
}

function intermediateBlurHandler(blurHandler) {
  var forced = true;

  this.callHandler(blurHandler, forced);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIkVsZW1lbnQiLCJSaWNoVGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJtb3VzZURvd24iLCJzZXRNb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJiaW5kIiwiaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyIiwiaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIiLCJhZGRDbGFzcyIsIm9mZiIsInJlbW92ZUNsYXNzIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJkb21FbGVtZW50IiwiZ2V0RE9NRWxlbWVudCIsInJlYWRPbmx5IiwidmFsdWUiLCJjb250ZW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb24iLCJwcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJwcmV2aW91c1NlbGVjdGlvbiIsInNldFByZXZpb3VzU2VsZWN0aW9uIiwiY2FsbEhhbmRsZXIiLCJpc01vdXNlRG93biIsImhhbmRsZXIiLCJmb3JjZWQiLCJpc0FjdGl2ZSIsImdldENvbnRlbnQiLCJnZXRTZWxlY3Rpb24iLCJnZXRQcmV2aW91c0NvbnRlbnQiLCJnZXRQcmV2aW91c1NlbGVjdGlvbiIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsImZyb21TdGF0ZSIsInVwZGF0ZVN0YXRlIiwic2V0U3RhdGUiLCJwcm9wZXJ0aWVzIiwib25DaGFuZ2UiLCJvblNjcm9sbCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJyaWNoVGV4dGFyZWEiLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJldmVudCIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBQSxRQUFRLGNBQVI7O0FBRUEsSUFBTUMsUUFBUUMsWUFBZCxDLENBQTRCOztBQUU1QixJQUFNQyxPQUFPSCxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNSSxZQUFZSixRQUFRLGFBQVIsQ0FBbEI7O0lBRVFLLE0sR0FBb0JGLEksQ0FBcEJFLE07SUFBUUMsTyxHQUFZSCxJLENBQVpHLE87O0lBRVZDLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQ0MsYUFBckMsRUFBb0RDLFlBQXBELEVBQWtFQyxXQUFsRSxFQUErRTtBQUFBOztBQUFBLDRIQUN2RUosUUFEdUU7O0FBRzdFLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtDLGVBQUw7QUFS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K0J5QyxNQUEvQjtBQUNELEdBSkQ7QUFLRDs7QUFFRCxTQUFTM0IsdUJBQVQsQ0FBaUNiLFdBQWpDLEVBQThDO0FBQzVDLE1BQU13QyxTQUFTLElBQWY7O0FBRUEsT0FBS0gsV0FBTCxDQUFpQnJDLFdBQWpCLEVBQThCd0MsTUFBOUI7QUFDRCIsImZpbGUiOiJyaWNoVGV4dGFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbmNvbnN0IGRlZmVyID0gc2V0SW1tZWRpYXRlOyAvLy9cclxuXHJcbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XHJcblxyXG5jb25zdCBTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3NlbGVjdGlvbicpO1xyXG5cclxuY29uc3QgeyB3aW5kb3csIEVsZW1lbnQgfSA9IGVhc3k7XHJcblxyXG5jbGFzcyBSaWNoVGV4dGFyZWEgZXh0ZW5kcyBFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgc3VwZXIoc2VsZWN0b3IpO1xyXG5cclxuICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IGNoYW5nZUhhbmRsZXI7XHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBzY3JvbGxIYW5kbGVyO1xyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgPSBmb2N1c0hhbmRsZXI7XHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyID0gYmx1ckhhbmRsZXI7XHJcblxyXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICBcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vbignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCBudWxsLCBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIG51bGwsIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub24oJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCBudWxsLCBpbnRlcm1lZGlhdGVCbHVySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub2ZmKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIsIG51bGwpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub2ZmKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyLCBudWxsKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub2ZmKCdibHVyJywgdGhpcy5ibHVySGFuZGxlciwgbnVsbCk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBpc0FjdGl2ZSgpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBpc1JlYWRPbmx5KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgcmVhZE9ubHkgPSBkb21FbGVtZW50LnJlYWRPbmx5O1xyXG4gICAgXHJcbiAgICByZXR1cm4gcmVhZE9ubHk7IFxyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCgpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHZhbHVlID0gZG9tRWxlbWVudC52YWx1ZSxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBkb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQsXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uU3RhcnQsIC8vL1xyXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBzZWxlY3Rpb25FbmQsIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbiwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVhZE9ubHkocmVhZE9ubHkpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuICAgIFxyXG4gICAgZG9tRWxlbWVudC5yZWFkT25seSA9IHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIG1vdXNlVXBIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuICB9O1xyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuY2FsbEhhbmRsZXIoKSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZU1vdmVIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdGhpcy5pc01vdXNlRG93bigpO1xyXG5cclxuICAgIGlmIChtb3VzZURvd24pIHtcclxuICAgICAgdGhpcy5jYWxsSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmNhbGxIYW5kbGVyKCkpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgdGhpcy5jYWxsSGFuZGxlcigpO1xyXG4gIH1cclxuXHJcbiAgY2FsbEhhbmRsZXIoaGFuZGxlciA9IHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgIGxldCBwcmV2aW91c0NvbnRlbnQgPSB0aGlzLmdldFByZXZpb3VzQ29udGVudCgpLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSB0aGlzLmdldFByZXZpb3VzU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBjb25zdCBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQgPSAoY29udGVudCAhPT0gcHJldmlvdXNDb250ZW50KSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbi5pc0RpZmZlcmVudFRvKHByZXZpb3VzU2VsZWN0aW9uKSxcclxuICAgICAgICAgICAgY29udGVudENoYW5nZWQgPSBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQsIC8vL1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiwgLy8vXHJcbiAgICAgICAgICAgIGNoYW5nZWQgPSBjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuICAgICAgaWYgKGNoYW5nZWQgfHwgZm9yY2VkKSB7XHJcbiAgICAgICAgaGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudDsgIC8vL1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc01vdXNlRG93bigpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCdtb3VzZURvd24nKTsgfVxyXG5cclxuICBnZXRQcmV2aW91c0NvbnRlbnQoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgncHJldmlvdXNDb250ZW50Jyk7IH1cclxuXHJcbiAgZ2V0UHJldmlvdXNTZWxlY3Rpb24oKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgncHJldmlvdXNTZWxlY3Rpb24nKTsgfVxyXG5cclxuICBzZXRNb3VzZURvd24obW91c2VEb3duKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgbW91c2VEb3duOiBtb3VzZURvd25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCkge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzQ29udGVudDogcHJldmlvdXNDb250ZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb246IHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gbnVsbCxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW91c2VEb3duOiBtb3VzZURvd24sXHJcbiAgICAgIHByZXZpb3VzQ29udGVudDogcHJldmlvdXNDb250ZW50LFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbjogcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGlzZSgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCBvblNjcm9sbCwgb25Gb2N1cywgb25CbHVyIH0gPSBwcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cclxuICAgICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgIGJsdXJIYW5kbGVyID0gb25CbHVyLCAvLy9cclxuICAgICAgICAgIHJpY2hUZXh0YXJlYSA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoUmljaFRleHRhcmVhLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICByaWNoVGV4dGFyZWEuaW5pdGlhbGlzZSgpO1xyXG5cclxuICAgIHJldHVybiByaWNoVGV4dGFyZWE7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFJpY2hUZXh0YXJlYSwge1xyXG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXHJcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcclxuICAgIGNsYXNzTmFtZTogJ3JpY2gnXHJcbiAgfSxcclxuICBpZ25vcmVkUHJvcGVydGllczogW1xyXG4gICAgJ29uQ2hhbmdlJyxcclxuICAgICdvblNjcm9sbCcsXHJcbiAgICAnb25Gb2N1cycsXHJcbiAgICAnb25CbHVyJ1xyXG4gIF1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0YXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlciwgZXZlbnQpIHtcclxuICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gIGlmIChhY3RpdmUpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZ2V0U2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gdGhpcy5nZXRTY3JvbGxMZWZ0KCk7XHJcblxyXG4gICAgc2Nyb2xsSGFuZGxlcihzY3JvbGxUb3AsIHNjcm9sbExlZnQsIGV2ZW50KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihmb2N1c0hhbmRsZXIpIHtcclxuICBkZWZlcigoKSA9PiB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuY2FsbEhhbmRsZXIoZm9jdXNIYW5kbGVyLCBmb3JjZWQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlcikge1xyXG4gIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gIHRoaXMuY2FsbEhhbmRsZXIoYmx1ckhhbmRsZXIsIGZvcmNlZCk7XHJcbn1cclxuIl19