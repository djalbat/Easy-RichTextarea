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
      selection = Selection.fromStartPositionAndEndPosition(startPosition, endPosition);

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
      var state = this.getState(),
          mouseDown = state.mouseDown;


      return mouseDown;
    }
  }, {
    key: 'getPreviousContent',
    value: function getPreviousContent() {
      var state = this.getState(),
          previousContent = state.previousContent;


      return previousContent;
    }
  }, {
    key: 'getPreviousSelection',
    value: function getPreviousSelection() {
      var state = this.getState(),
          previousSelection = state.previousSelection;


      return previousSelection;
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
  var active = element.isActive();

  if (active) {
    var scrollTop = element.getScrollTop(),
        scrollLeft = element.getScrollLeft();

    scrollHandler.call(element, scrollTop, scrollLeft, event);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIkVsZW1lbnQiLCJSaWNoVGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJtb3VzZURvd24iLCJzZXRNb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJhY3RpdmUiLCJoYXNDbGFzcyIsImRvbUVsZW1lbnQiLCJnZXRET01FbGVtZW50IiwicmVhZE9ubHkiLCJ2YWx1ZSIsImNvbnRlbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNlbGVjdGlvbiIsImZyb21TdGFydFBvc2l0aW9uQW5kRW5kUG9zaXRpb24iLCJwcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJwcmV2aW91c1NlbGVjdGlvbiIsInNldFByZXZpb3VzU2VsZWN0aW9uIiwiaW50ZXJtZWRpYXRlSGFuZGxlciIsImlzTW91c2VEb3duIiwiaGFuZGxlciIsImZvcmNlZCIsImlzQWN0aXZlIiwiZ2V0Q29udGVudCIsImdldFNlbGVjdGlvbiIsImdldFByZXZpb3VzQ29udGVudCIsImdldFByZXZpb3VzU2VsZWN0aW9uIiwiY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJjb250ZW50Q2hhbmdlZCIsInNlbGVjdGlvbkNoYW5nZWQiLCJjaGFuZ2VkIiwiY2FsbCIsImdldFN0YXRlIiwic3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsIm9uQ2hhbmdlIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwicmljaFRleHRhcmVhIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXZlbnQiLCJlbGVtZW50Iiwic2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9wIiwic2Nyb2xsTGVmdCIsImdldFNjcm9sbExlZnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUFBLFFBQVEsY0FBUjs7QUFFQSxJQUFNQyxRQUFRQyxZQUFkLEMsQ0FBNEI7O0FBRTVCLElBQU1DLE9BQU9ILFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1JLFlBQVlKLFFBQVEsYUFBUixDQUFsQjs7SUFFUUssTSxHQUFvQkYsSSxDQUFwQkUsTTtJQUFRQyxPLEdBQVlILEksQ0FBWkcsTzs7SUFFVkMsWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDQyxhQUFyQyxFQUFvREMsWUFBcEQsRUFBa0VDLFdBQWxFLEVBQStFO0FBQUE7O0FBQUEsNEhBQ3ZFSixRQUR1RTs7QUFHN0UsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLFlBQUwsR0FB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UUksYUFBUixFQURuQjs7QUFHQWhGLGtCQUFjc0QsSUFBZCxDQUFtQnNCLE9BQW5CLEVBQTRCQyxTQUE1QixFQUF1Q0UsVUFBdkMsRUFBbURKLEtBQW5EO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTOUQsd0JBQVQsQ0FBa0NaLFlBQWxDLEVBQWdEMEUsS0FBaEQsRUFBdURDLE9BQXZELEVBQWdFO0FBQzlEckYsUUFBTSxZQUFXO0FBQ2YsUUFBTW1ELFNBQVMsSUFBZjs7QUFFQWtDLFlBQVFyQyxtQkFBUixDQUE0QnRDLFlBQTVCLEVBQTBDeUMsTUFBMUM7QUFDRCxHQUpEO0FBS0Q7O0FBRUQsU0FBUzVCLHVCQUFULENBQWlDWixXQUFqQyxFQUE4Q3lFLEtBQTlDLEVBQXFEQyxPQUFyRCxFQUE4RDtBQUM1RCxNQUFNbEMsU0FBUyxJQUFmOztBQUVBa0MsVUFBUXJDLG1CQUFSLENBQTRCckMsV0FBNUIsRUFBeUN3QyxNQUF6QztBQUNEIiwiZmlsZSI6InJpY2hUZXh0YXJlYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJ3NldGltbWVkaWF0ZScpO1xyXG5cclxuY29uc3QgZGVmZXIgPSBzZXRJbW1lZGlhdGU7IC8vL1xyXG5cclxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcclxuXHJcbmNvbnN0IFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2VsZWN0aW9uJyk7XHJcblxyXG5jb25zdCB7IHdpbmRvdywgRWxlbWVudCB9ID0gZWFzeTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub24oJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9uKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIHRoaXMsIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9uKCdibHVyJywgdGhpcy5ibHVySGFuZGxlciwgdGhpcywgaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vZmYoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vZmYoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgJiYgdGhpcy5vZmYoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGlzUmVhZE9ubHkoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICByZWFkT25seSA9IGRvbUVsZW1lbnQucmVhZE9ubHk7XHJcbiAgICBcclxuICAgIHJldHVybiByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgdmFsdWUgPSBkb21FbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBkb21FbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHNlbGVjdGlvbkVuZCwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBTZWxlY3Rpb24uZnJvbVN0YXJ0UG9zaXRpb25BbmRFbmRQb3NpdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbiwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcclxuICAgIGRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVhZE9ubHkocmVhZE9ubHkpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuICAgIFxyXG4gICAgZG9tRWxlbWVudC5yZWFkT25seSA9IHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIG1vdXNlVXBIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuICB9O1xyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXIpKTtcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCk7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKCkge1xyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcikpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGZvcmNlZCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyhwcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgICBjaGFuZ2VkID0gY29udGVudENoYW5nZWQgfHwgc2VsZWN0aW9uQ2hhbmdlZDtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkIHx8IGZvcmNlZCkge1xyXG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudDsgIC8vL1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgIC8vL1xyXG5cclxuICAgICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc01vdXNlRG93bigpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBtb3VzZURvd24gfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBtb3VzZURvd247XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2aW91c0NvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgcHJldmlvdXNDb250ZW50IH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNDb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgcHJldmlvdXNTZWxlY3Rpb24gfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBwcmV2aW91c1NlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldE1vdXNlRG93bihtb3VzZURvd24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBtb3VzZURvd25cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCkge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzQ29udGVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gbnVsbCxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbW91c2VEb3duLFxyXG4gICAgICBwcmV2aW91c0NvbnRlbnQsXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpc2UoKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1ciwgLy8vXHJcbiAgICAgICAgICByaWNoVGV4dGFyZWEgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFJpY2hUZXh0YXJlYSwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcblxyXG4gICAgcmljaFRleHRhcmVhLmluaXRpYWxpc2UoKTtcclxuXHJcbiAgICByZXR1cm4gcmljaFRleHRhcmVhO1xyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihSaWNoVGV4dGFyZWEsIHtcclxuICB0YWdOYW1lOiAndGV4dGFyZWEnLFxyXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XHJcbiAgICBjbGFzc05hbWU6ICdyaWNoJ1xyXG4gIH0sXHJcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcclxuICAgICdvbkNoYW5nZScsXHJcbiAgICAnb25TY3JvbGwnLFxyXG4gICAgJ29uRm9jdXMnLFxyXG4gICAgJ29uQmx1cidcclxuICBdXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSaWNoVGV4dGFyZWE7XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKHNjcm9sbEhhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgY29uc3QgYWN0aXZlID0gZWxlbWVudC5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSBlbGVtZW50LmdldFNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgc2Nyb2xsTGVmdCA9IGVsZW1lbnQuZ2V0U2Nyb2xsTGVmdCgpO1xyXG5cclxuICAgIHNjcm9sbEhhbmRsZXIuY2FsbChlbGVtZW50LCBzY3JvbGxUb3AsIHNjcm9sbExlZnQsIGV2ZW50KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihmb2N1c0hhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgZGVmZXIoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICAgIGVsZW1lbnQuaW50ZXJtZWRpYXRlSGFuZGxlcihmb2N1c0hhbmRsZXIsIGZvcmNlZCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyKGJsdXJIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xyXG4gIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gIGVsZW1lbnQuaW50ZXJtZWRpYXRlSGFuZGxlcihibHVySGFuZGxlciwgZm9yY2VkKTtcclxufVxyXG4iXX0=