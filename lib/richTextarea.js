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

        var contentDifferentToPreviousContent = content !== previousContent,
            selectionDifferentToPreviousSelection = selection.isDifferentTo(previousSelection),
            contentChanged = contentDifferentToPreviousContent,
            ///
        selectionChanged = selectionDifferentToPreviousSelection,
            ///
        changed = contentChanged || selectionChanged;

        if (changed || forced) {
          handler.call(this, content, selection, contentChanged, selectionChanged);
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

function intermediateScrollHandler(scrollHandler, event, element) {
  var active = this.isActive();

  if (active) {
    var scrollTop = this.getScrollTop(),
        scrollLeft = this.getScrollLeft();

    scrollHandler.call(element, scrollTop, scrollLeft, event);
  }
}

function intermediateFocusHandler(focusHandler, element) {
  defer(function () {
    var forced = true;

    element.intermediateHandler(focusHandler, forced);
  });
}

function intermediateBlurHandler(blurHandler, element) {
  var forced = true;

  element.intermediateHandler(blurHandler, forced);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIkVsZW1lbnQiLCJSaWNoVGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJtb3VzZURvd24iLCJzZXRNb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJhY3RpdmUiLCJoYXNDbGFzcyIsImRvbUVsZW1lbnQiLCJnZXRET01FbGVtZW50IiwicmVhZE9ubHkiLCJ2YWx1ZSIsImNvbnRlbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNlbGVjdGlvbiIsInByZXZpb3VzQ29udGVudCIsInNldFByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJpbnRlcm1lZGlhdGVIYW5kbGVyIiwiaXNNb3VzZURvd24iLCJoYW5kbGVyIiwiZm9yY2VkIiwiaXNBY3RpdmUiLCJnZXRDb250ZW50IiwiZ2V0U2VsZWN0aW9uIiwiZ2V0UHJldmlvdXNDb250ZW50IiwiZ2V0UHJldmlvdXNTZWxlY3Rpb24iLCJjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uIiwiaXNEaWZmZXJlbnRUbyIsImNvbnRlbnRDaGFuZ2VkIiwic2VsZWN0aW9uQ2hhbmdlZCIsImNoYW5nZWQiLCJjYWxsIiwiZnJvbVN0YXRlIiwidXBkYXRlU3RhdGUiLCJzZXRTdGF0ZSIsInByb3BlcnRpZXMiLCJvbkNoYW5nZSIsIm9uU2Nyb2xsIiwib25Gb2N1cyIsIm9uQmx1ciIsInJpY2hUZXh0YXJlYSIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImV2ZW50IiwiZWxlbWVudCIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBQSxRQUFRLGNBQVI7O0FBRUEsSUFBTUMsUUFBUUMsWUFBZCxDLENBQTRCOztBQUU1QixJQUFNQyxPQUFPSCxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNSSxZQUFZSixRQUFRLGFBQVIsQ0FBbEI7O0lBRVFLLE0sR0FBb0JGLEksQ0FBcEJFLE07SUFBUUMsTyxHQUFZSCxJLENBQVpHLE87O0lBRVZDLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQ0MsYUFBckMsRUFBb0RDLFlBQXBELEVBQWtFQyxXQUFsRSxFQUErRTtBQUFBOztBQUFBLDRIQUN2RUosUUFEdUU7O0FBRzdFLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztB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LFlBQVc7QUFDZixRQUFNa0QsU0FBUyxJQUFmOztBQUVBaUMsWUFBUXBDLG1CQUFSLENBQTRCckMsWUFBNUIsRUFBMEN3QyxNQUExQztBQUNELEdBSkQ7QUFLRDs7QUFFRCxTQUFTM0IsdUJBQVQsQ0FBaUNaLFdBQWpDLEVBQThDd0UsT0FBOUMsRUFBdUQ7QUFDckQsTUFBTWpDLFNBQVMsSUFBZjs7QUFFQWlDLFVBQVFwQyxtQkFBUixDQUE0QnBDLFdBQTVCLEVBQXlDdUMsTUFBekM7QUFDRCIsImZpbGUiOiJyaWNoVGV4dGFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbmNvbnN0IGRlZmVyID0gc2V0SW1tZWRpYXRlOyAvLy9cclxuXHJcbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XHJcblxyXG5jb25zdCBTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3NlbGVjdGlvbicpO1xyXG5cclxuY29uc3QgeyB3aW5kb3csIEVsZW1lbnQgfSA9IGVhc3k7XHJcblxyXG5jbGFzcyBSaWNoVGV4dGFyZWEgZXh0ZW5kcyBFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgc3VwZXIoc2VsZWN0b3IpO1xyXG5cclxuICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IGNoYW5nZUhhbmRsZXI7XHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBzY3JvbGxIYW5kbGVyO1xyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgPSBmb2N1c0hhbmRsZXI7XHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyID0gYmx1ckhhbmRsZXI7XHJcblxyXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICBcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vbignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCB0aGlzLCBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciAmJiB0aGlzLm9uKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyLCB0aGlzLCBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgJiYgdGhpcy5vbignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub2ZmKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub2ZmKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub2ZmKCdibHVyJywgdGhpcy5ibHVySGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBpc0FjdGl2ZSgpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBpc1JlYWRPbmx5KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgcmVhZE9ubHkgPSBkb21FbGVtZW50LnJlYWRPbmx5O1xyXG4gICAgXHJcbiAgICByZXR1cm4gcmVhZE9ubHk7IFxyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCgpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHZhbHVlID0gZG9tRWxlbWVudC52YWx1ZSxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBkb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQsXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uU3RhcnQsIC8vL1xyXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBzZWxlY3Rpb25FbmQsIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbiwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVhZE9ubHkocmVhZE9ubHkpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuICAgIFxyXG4gICAgZG9tRWxlbWVudC5yZWFkT25seSA9IHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIG1vdXNlVXBIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuICB9O1xyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXIpKTtcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCk7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKCkge1xyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcikpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGZvcmNlZCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyhwcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgICBjaGFuZ2VkID0gY29udGVudENoYW5nZWQgfHwgc2VsZWN0aW9uQ2hhbmdlZDtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkIHx8IGZvcmNlZCkge1xyXG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudDsgIC8vL1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc01vdXNlRG93bigpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCdtb3VzZURvd24nKTsgfVxyXG5cclxuICBnZXRQcmV2aW91c0NvbnRlbnQoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgncHJldmlvdXNDb250ZW50Jyk7IH1cclxuXHJcbiAgZ2V0UHJldmlvdXNTZWxlY3Rpb24oKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgncHJldmlvdXNTZWxlY3Rpb24nKTsgfVxyXG5cclxuICBzZXRNb3VzZURvd24obW91c2VEb3duKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgbW91c2VEb3duOiBtb3VzZURvd25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCkge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzQ29udGVudDogcHJldmlvdXNDb250ZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb246IHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gbnVsbCxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW91c2VEb3duOiBtb3VzZURvd24sXHJcbiAgICAgIHByZXZpb3VzQ29udGVudDogcHJldmlvdXNDb250ZW50LFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbjogcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGlzZSgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCBvblNjcm9sbCwgb25Gb2N1cywgb25CbHVyIH0gPSBwcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cclxuICAgICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgIGJsdXJIYW5kbGVyID0gb25CbHVyLCAvLy9cclxuICAgICAgICAgIHJpY2hUZXh0YXJlYSA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoUmljaFRleHRhcmVhLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICByaWNoVGV4dGFyZWEuaW5pdGlhbGlzZSgpO1xyXG5cclxuICAgIHJldHVybiByaWNoVGV4dGFyZWE7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFJpY2hUZXh0YXJlYSwge1xyXG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXHJcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcclxuICAgIGNsYXNzTmFtZTogJ3JpY2gnXHJcbiAgfSxcclxuICBpZ25vcmVkUHJvcGVydGllczogW1xyXG4gICAgJ29uQ2hhbmdlJyxcclxuICAgICdvblNjcm9sbCcsXHJcbiAgICAnb25Gb2N1cycsXHJcbiAgICAnb25CbHVyJ1xyXG4gIF1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0YXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcclxuICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gIGlmIChhY3RpdmUpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZ2V0U2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gdGhpcy5nZXRTY3JvbGxMZWZ0KCk7XHJcblxyXG4gICAgc2Nyb2xsSGFuZGxlci5jYWxsKGVsZW1lbnQsIHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgZXZlbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlciwgZWxlbWVudCkge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgICBlbGVtZW50LmludGVybWVkaWF0ZUhhbmRsZXIoZm9jdXNIYW5kbGVyLCBmb3JjZWQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlciwgZWxlbWVudCkge1xyXG4gIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gIGVsZW1lbnQuaW50ZXJtZWRpYXRlSGFuZGxlcihibHVySGFuZGxlciwgZm9yY2VkKTtcclxufVxyXG4iXX0=