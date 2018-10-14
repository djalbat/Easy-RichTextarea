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
        return _this2.intermediateHandler(_this2.changeHandler, forced);
      });
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      var mouseDown = this.isMouseDown(),
          forced = false;

      if (mouseDown) {
        this.intermediateHandler(this.changeHandler, forced);
      }
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler() {
      var _this3 = this;

      var forced = false;

      defer(function () {
        return _this3.intermediateHandler(_this3.changeHandler, forced);
      });
    }
  }, {
    key: 'inputHandler',
    value: function inputHandler() {
      var forced = false;

      this.intermediateHandler(this.changeHandler, forced);
    }
  }, {
    key: 'intermediateHandler',
    value: function intermediateHandler(handler, forced) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIkVsZW1lbnQiLCJSaWNoVGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJtb3VzZURvd24iLCJzZXRNb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJhY3RpdmUiLCJoYXNDbGFzcyIsImRvbUVsZW1lbnQiLCJnZXRET01FbGVtZW50IiwicmVhZE9ubHkiLCJ2YWx1ZSIsImNvbnRlbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNlbGVjdGlvbiIsInByZXZpb3VzQ29udGVudCIsInNldFByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJmb3JjZWQiLCJpbnRlcm1lZGlhdGVIYW5kbGVyIiwiaXNNb3VzZURvd24iLCJoYW5kbGVyIiwiaXNBY3RpdmUiLCJnZXRDb250ZW50IiwiZ2V0U2VsZWN0aW9uIiwiZ2V0UHJldmlvdXNDb250ZW50IiwiZ2V0UHJldmlvdXNTZWxlY3Rpb24iLCJjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uIiwiaXNEaWZmZXJlbnRUbyIsImNvbnRlbnRDaGFuZ2VkIiwic2VsZWN0aW9uQ2hhbmdlZCIsImNoYW5nZWQiLCJjYWxsIiwiZnJvbVN0YXRlIiwidXBkYXRlU3RhdGUiLCJzZXRTdGF0ZSIsInByb3BlcnRpZXMiLCJvbkNoYW5nZSIsIm9uU2Nyb2xsIiwib25Gb2N1cyIsIm9uQmx1ciIsInJpY2hUZXh0YXJlYSIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImV2ZW50IiwiZWxlbWVudCIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBQSxRQUFRLGNBQVI7O0FBRUEsSUFBTUMsUUFBUUMsWUFBZCxDLENBQTRCOztBQUU1QixJQUFNQyxPQUFPSCxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNSSxZQUFZSixRQUFRLGFBQVIsQ0FBbEI7O0lBRVFLLE0sR0FBb0JGLEksQ0FBcEJFLE07SUFBUUMsTyxHQUFZSCxJLENBQVpHLE87O0lBRVZDLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQ0MsYUFBckMsRUFBb0RDLFlBQXBELEVBQWtFQyxXQUFsRSxFQUErRTtBQUFBOztBQUFBLDRIQUN2RUosUUFEdUU7O0FBRzdFLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztB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QixPQUFuQixFQUE0QkMsU0FBNUIsRUFBdUNFLFVBQXZDLEVBQW1ESixLQUFuRDtBQUNEO0FBQ0Y7O0FBRUQsU0FBUzVELHdCQUFULENBQWtDWixZQUFsQyxFQUFnRHlFLE9BQWhELEVBQXlEO0FBQ3ZEbkYsUUFBTSxZQUFXO0FBQ2YsUUFBTStDLFNBQVMsSUFBZjs7QUFFQW9DLFlBQVFuQyxtQkFBUixDQUE0QnRDLFlBQTVCLEVBQTBDcUMsTUFBMUM7QUFDRCxHQUpEO0FBS0Q7O0FBRUQsU0FBU3hCLHVCQUFULENBQWlDWixXQUFqQyxFQUE4Q3dFLE9BQTlDLEVBQXVEO0FBQ3JELE1BQU1wQyxTQUFTLElBQWY7O0FBRUFvQyxVQUFRbkMsbUJBQVIsQ0FBNEJyQyxXQUE1QixFQUF5Q29DLE1BQXpDO0FBQ0QiLCJmaWxlIjoicmljaFRleHRhcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxucmVxdWlyZSgnc2V0aW1tZWRpYXRlJyk7XHJcblxyXG5jb25zdCBkZWZlciA9IHNldEltbWVkaWF0ZTsgLy8vXHJcblxyXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZWxlY3Rpb24nKTtcclxuXHJcbmNvbnN0IHsgd2luZG93LCBFbGVtZW50IH0gPSBlYXN5O1xyXG5cclxuY2xhc3MgUmljaFRleHRhcmVhIGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBjaGFuZ2VIYW5kbGVyO1xyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjtcclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyID0gZm9jdXNIYW5kbGVyO1xyXG4gICAgdGhpcy5ibHVySGFuZGxlciA9IGJsdXJIYW5kbGVyO1xyXG5cclxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIHdpbmRvdy5vbignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub24oJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgdGhpcywgaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vbignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlciwgdGhpcywgaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub24oJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCB0aGlzLCBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9mZignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciAmJiB0aGlzLm9mZignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9mZignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICByZXR1cm4gYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgaXNSZWFkT25seSgpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHJlYWRPbmx5ID0gZG9tRWxlbWVudC5yZWFkT25seTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICB2YWx1ZSA9IGRvbUVsZW1lbnQudmFsdWUsXHJcbiAgICAgICAgICBjb250ZW50ID0gdmFsdWU7ICAvLy9cclxuXHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IGRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvblN0YXJ0LCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIGRvbUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24sICAvLy9cclxuICAgICAgICAgIGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBkb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICBkb21FbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHNldFJlYWRPbmx5KHJlYWRPbmx5KSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcbiAgICBcclxuICAgIGRvbUVsZW1lbnQucmVhZE9ubHkgPSByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VEb3duSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IHRydWUsXHJcblx0XHRcdFx0XHRmb3JjZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkKSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZU1vdmVIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdGhpcy5pc01vdXNlRG93bigpLFxyXG5cdFx0XHRcdFx0Zm9yY2VkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgXHRjb25zdCBmb3JjZWQgPSBmYWxzZTtcclxuXHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICBcdGNvbnN0IGZvcmNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXIsIGZvcmNlZCk7XHJcbiAgfVxyXG5cclxuICBpbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGZvcmNlZCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgbGV0IHByZXZpb3VzQ29udGVudCA9IHRoaXMuZ2V0UHJldmlvdXNDb250ZW50KCksXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHRoaXMuZ2V0UHJldmlvdXNTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCA9IChjb250ZW50ICE9PSBwcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLmlzRGlmZmVyZW50VG8ocHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgICBjb250ZW50Q2hhbmdlZCA9IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCwgLy8vXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uLCAvLy9cclxuICAgICAgICAgICAgY2hhbmdlZCA9IGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gICAgICBpZiAoY2hhbmdlZCB8fCBmb3JjZWQpIHtcclxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgY29udGVudCwgc2VsZWN0aW9uLCBjb250ZW50Q2hhbmdlZCwgc2VsZWN0aW9uQ2hhbmdlZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNb3VzZURvd24oKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgnbW91c2VEb3duJyk7IH1cclxuXHJcbiAgZ2V0UHJldmlvdXNDb250ZW50KCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ3ByZXZpb3VzQ29udGVudCcpOyB9XHJcblxyXG4gIGdldFByZXZpb3VzU2VsZWN0aW9uKCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ3ByZXZpb3VzU2VsZWN0aW9uJyk7IH1cclxuXHJcbiAgc2V0TW91c2VEb3duKG1vdXNlRG93bikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93bjogbW91c2VEb3duXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c0NvbnRlbnQ6IHByZXZpb3VzQ29udGVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbikge1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uOiBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IG51bGwsXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93bjogbW91c2VEb3duLFxyXG4gICAgICBwcmV2aW91c0NvbnRlbnQ6IHByZXZpb3VzQ29udGVudCxcclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb246IHByZXZpb3VzU2VsZWN0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpc2UoKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1ciwgLy8vXHJcbiAgICAgICAgICByaWNoVGV4dGFyZWEgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFJpY2hUZXh0YXJlYSwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcblxyXG4gICAgcmljaFRleHRhcmVhLmluaXRpYWxpc2UoKTtcclxuXHJcbiAgICByZXR1cm4gcmljaFRleHRhcmVhO1xyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihSaWNoVGV4dGFyZWEsIHtcclxuICB0YWdOYW1lOiAndGV4dGFyZWEnLFxyXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XHJcbiAgICBjbGFzc05hbWU6ICdyaWNoJ1xyXG4gIH0sXHJcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcclxuICAgICdvbkNoYW5nZScsXHJcbiAgICAnb25TY3JvbGwnLFxyXG4gICAgJ29uRm9jdXMnLFxyXG4gICAgJ29uQmx1cidcclxuICBdXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSaWNoVGV4dGFyZWE7XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKHNjcm9sbEhhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmdldFNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgc2Nyb2xsTGVmdCA9IHRoaXMuZ2V0U2Nyb2xsTGVmdCgpO1xyXG5cclxuICAgIHNjcm9sbEhhbmRsZXIuY2FsbChlbGVtZW50LCBzY3JvbGxUb3AsIHNjcm9sbExlZnQsIGV2ZW50KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihmb2N1c0hhbmRsZXIsIGVsZW1lbnQpIHtcclxuICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gICAgZWxlbWVudC5pbnRlcm1lZGlhdGVIYW5kbGVyKGZvY3VzSGFuZGxlciwgZm9yY2VkKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIoYmx1ckhhbmRsZXIsIGVsZW1lbnQpIHtcclxuICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICBlbGVtZW50LmludGVybWVkaWF0ZUhhbmRsZXIoYmx1ckhhbmRsZXIsIGZvcmNlZCk7XHJcbn1cclxuIl19