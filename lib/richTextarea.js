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

      var mouseDown = true,
          forced = false;
      this.setMouseDown(mouseDown);

      defer(function () {
        return _this2.callHandler(_this2.changeHandler, forced);
      });
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      var mouseDown = this.isMouseDown(),
          forced = false;

      if (mouseDown) {
        this.callHandler(this.changeHandler, forced);
      }
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler() {
      var _this3 = this;

      var forced = false;

      defer(function () {
        return _this3.callHandler(_this3.changeHandler, forced);
      });
    }
  }, {
    key: 'inputHandler',
    value: function inputHandler() {
      var forced = false;

      this.callHandler(this.changeHandler, forced);
    }
  }, {
    key: 'callHandler',
    value: function callHandler(handler, forced) {
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
          handler.apply(this, content, selection, contentChanged, selectionChanged);
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

    scrollHandler.apply(element, scrollTop, scrollLeft, event);
  }
}

function intermediateFocusHandler(focusHandler, element) {
  defer(function () {
    var forced = true;

    element.callHandler(focusHandler, forced);
  });
}

function intermediateBlurHandler(blurHandler, element) {
  var forced = true;

  element.callHandler(blurHandler, forced);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIkVsZW1lbnQiLCJSaWNoVGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJtb3VzZURvd24iLCJzZXRNb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJhY3RpdmUiLCJoYXNDbGFzcyIsImRvbUVsZW1lbnQiLCJnZXRET01FbGVtZW50IiwicmVhZE9ubHkiLCJ2YWx1ZSIsImNvbnRlbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNlbGVjdGlvbiIsInByZXZpb3VzQ29udGVudCIsInNldFByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJmb3JjZWQiLCJjYWxsSGFuZGxlciIsImlzTW91c2VEb3duIiwiaGFuZGxlciIsImlzQWN0aXZlIiwiZ2V0Q29udGVudCIsImdldFNlbGVjdGlvbiIsImdldFByZXZpb3VzQ29udGVudCIsImdldFByZXZpb3VzU2VsZWN0aW9uIiwiY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJjb250ZW50Q2hhbmdlZCIsInNlbGVjdGlvbkNoYW5nZWQiLCJjaGFuZ2VkIiwiYXBwbHkiLCJmcm9tU3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsIm9uQ2hhbmdlIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwicmljaFRleHRhcmVhIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXZlbnQiLCJlbGVtZW50Iiwic2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9wIiwic2Nyb2xsTGVmdCIsImdldFNjcm9sbExlZnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUFBLFFBQVEsY0FBUjs7QUFFQSxJQUFNQyxRQUFRQyxZQUFkLEMsQ0FBNEI7O0FBRTVCLElBQU1DLE9BQU9ILFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1JLFlBQVlKLFFBQVEsYUFBUixDQUFsQjs7SUFFUUssTSxHQUFvQkYsSSxDQUFwQkUsTTtJQUFRQyxPLEdBQVlILEksQ0FBWkcsTzs7SUFFVkMsWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDQyxhQUFyQyxFQUFvREMsWUFBcEQsRUFBa0VDLFdBQWxFLEVBQStFO0FBQUE7O0FBQUEsNEhBQ3ZFSixRQUR1RTs7QUFHN0UsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7O0FBRUEsVUFB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QkMsU0FBN0IsRUFBd0NFLFVBQXhDLEVBQW9ESixLQUFwRDtBQUNEO0FBQ0Y7O0FBRUQsU0FBUzVELHdCQUFULENBQWtDWixZQUFsQyxFQUFnRHlFLE9BQWhELEVBQXlEO0FBQ3ZEbkYsUUFBTSxZQUFXO0FBQ2YsUUFBTStDLFNBQVMsSUFBZjs7QUFFQW9DLFlBQVFuQyxXQUFSLENBQW9CdEMsWUFBcEIsRUFBa0NxQyxNQUFsQztBQUNELEdBSkQ7QUFLRDs7QUFFRCxTQUFTeEIsdUJBQVQsQ0FBaUNaLFdBQWpDLEVBQThDd0UsT0FBOUMsRUFBdUQ7QUFDckQsTUFBTXBDLFNBQVMsSUFBZjs7QUFFQW9DLFVBQVFuQyxXQUFSLENBQW9CckMsV0FBcEIsRUFBaUNvQyxNQUFqQztBQUNEIiwiZmlsZSI6InJpY2hUZXh0YXJlYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJ3NldGltbWVkaWF0ZScpO1xyXG5cclxuY29uc3QgZGVmZXIgPSBzZXRJbW1lZGlhdGU7IC8vL1xyXG5cclxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcclxuXHJcbmNvbnN0IFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2VsZWN0aW9uJyk7XHJcblxyXG5jb25zdCB7IHdpbmRvdywgRWxlbWVudCB9ID0gZWFzeTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub24oJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9uKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9uKCdibHVyJywgdGhpcy5ibHVySGFuZGxlciwgdGhpcywgaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vZmYoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vZmYoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgJiYgdGhpcy5vZmYoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGlzUmVhZE9ubHkoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICByZWFkT25seSA9IGRvbUVsZW1lbnQucmVhZE9ubHk7XHJcbiAgICBcclxuICAgIHJldHVybiByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgdmFsdWUgPSBkb21FbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBkb21FbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHNlbGVjdGlvbkVuZCwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29udGVudChjb250ZW50KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBkb21FbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xyXG4gICAgZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBzZXRSZWFkT25seShyZWFkT25seSkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG4gICAgXHJcbiAgICBkb21FbGVtZW50LnJlYWRPbmx5ID0gcmVhZE9ubHk7IFxyXG4gIH1cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0cnVlLFxyXG5cdFx0XHRcdFx0Zm9yY2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuY2FsbEhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpKTtcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCksXHJcblx0XHRcdFx0XHRmb3JjZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAobW91c2VEb3duKSB7XHJcbiAgICAgIHRoaXMuY2FsbEhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgXHRjb25zdCBmb3JjZWQgPSBmYWxzZTtcclxuXHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmNhbGxIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkKSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIoKSB7XHJcbiAgXHRjb25zdCBmb3JjZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmNhbGxIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkKTtcclxuICB9XHJcblxyXG4gIGNhbGxIYW5kbGVyKGhhbmRsZXIsIGZvcmNlZCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgbGV0IHByZXZpb3VzQ29udGVudCA9IHRoaXMuZ2V0UHJldmlvdXNDb250ZW50KCksXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHRoaXMuZ2V0UHJldmlvdXNTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCA9IChjb250ZW50ICE9PSBwcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLmlzRGlmZmVyZW50VG8ocHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgICBjb250ZW50Q2hhbmdlZCA9IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCwgLy8vXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uLCAvLy9cclxuICAgICAgICAgICAgY2hhbmdlZCA9IGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gICAgICBpZiAoY2hhbmdlZCB8fCBmb3JjZWQpIHtcclxuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGNvbnRlbnQsIHNlbGVjdGlvbiwgY29udGVudENoYW5nZWQsIHNlbGVjdGlvbkNoYW5nZWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAgLy8vXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzTW91c2VEb3duKCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ21vdXNlRG93bicpOyB9XHJcblxyXG4gIGdldFByZXZpb3VzQ29udGVudCgpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCdwcmV2aW91c0NvbnRlbnQnKTsgfVxyXG5cclxuICBnZXRQcmV2aW91c1NlbGVjdGlvbigpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCdwcmV2aW91c1NlbGVjdGlvbicpOyB9XHJcblxyXG4gIHNldE1vdXNlRG93bihtb3VzZURvd24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBtb3VzZURvd246IG1vdXNlRG93blxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgcHJldmlvdXNDb250ZW50OiBwcmV2aW91c0NvbnRlbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbjogcHJldmlvdXNTZWxlY3Rpb25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2UsXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBudWxsLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBtb3VzZURvd246IG1vdXNlRG93bixcclxuICAgICAgcHJldmlvdXNDb250ZW50OiBwcmV2aW91c0NvbnRlbnQsXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uOiBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXNlKCkge1xyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsLCBvbkZvY3VzLCBvbkJsdXIgfSA9IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsLCAvLy9cclxuICAgICAgICAgIGZvY3VzSGFuZGxlciA9IG9uRm9jdXMsIC8vL1xyXG4gICAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXIsIC8vL1xyXG4gICAgICAgICAgcmljaFRleHRhcmVhID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSaWNoVGV4dGFyZWEsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHJpY2hUZXh0YXJlYS5pbml0aWFsaXNlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJpY2hUZXh0YXJlYTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oUmljaFRleHRhcmVhLCB7XHJcbiAgdGFnTmFtZTogJ3RleHRhcmVhJyxcclxuICBkZWZhdWx0UHJvcGVydGllczoge1xyXG4gICAgY2xhc3NOYW1lOiAncmljaCdcclxuICB9LFxyXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXHJcbiAgICAnb25DaGFuZ2UnLFxyXG4gICAgJ29uU2Nyb2xsJyxcclxuICAgICdvbkZvY3VzJyxcclxuICAgICdvbkJsdXInXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSB0aGlzLmdldFNjcm9sbExlZnQoKTtcclxuXHJcbiAgICBzY3JvbGxIYW5kbGVyLmFwcGx5KGVsZW1lbnQsIHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgZXZlbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlciwgZWxlbWVudCkge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgICBlbGVtZW50LmNhbGxIYW5kbGVyKGZvY3VzSGFuZGxlciwgZm9yY2VkKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIoYmx1ckhhbmRsZXIsIGVsZW1lbnQpIHtcclxuICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICBlbGVtZW50LmNhbGxIYW5kbGVyKGJsdXJIYW5kbGVyLCBmb3JjZWQpO1xyXG59XHJcbiJdfQ==