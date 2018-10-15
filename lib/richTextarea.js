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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIkVsZW1lbnQiLCJSaWNoVGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJtb3VzZURvd24iLCJzZXRNb3VzZURvd24iLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VEb3duSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJhY3RpdmUiLCJoYXNDbGFzcyIsImRvbUVsZW1lbnQiLCJnZXRET01FbGVtZW50IiwicmVhZE9ubHkiLCJ2YWx1ZSIsImNvbnRlbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNlbGVjdGlvbiIsInByZXZpb3VzQ29udGVudCIsInNldFByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsInByZXZpb3VzU2VsZWN0aW9uIiwic2V0UHJldmlvdXNTZWxlY3Rpb24iLCJpbnRlcm1lZGlhdGVIYW5kbGVyIiwiaXNNb3VzZURvd24iLCJoYW5kbGVyIiwiZm9yY2VkIiwiaXNBY3RpdmUiLCJnZXRDb250ZW50IiwiZ2V0U2VsZWN0aW9uIiwiZ2V0UHJldmlvdXNDb250ZW50IiwiZ2V0UHJldmlvdXNTZWxlY3Rpb24iLCJjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uIiwiaXNEaWZmZXJlbnRUbyIsImNvbnRlbnRDaGFuZ2VkIiwic2VsZWN0aW9uQ2hhbmdlZCIsImNoYW5nZWQiLCJjYWxsIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsInVwZGF0ZVN0YXRlIiwic2V0U3RhdGUiLCJwcm9wZXJ0aWVzIiwib25DaGFuZ2UiLCJvblNjcm9sbCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJyaWNoVGV4dGFyZWEiLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJldmVudCIsImVsZW1lbnQiLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxjQUFSOztBQUVBLElBQU1DLFFBQVFDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsT0FBT0gsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUksWUFBWUosUUFBUSxhQUFSLENBQWxCOztJQUVRSyxNLEdBQW9CRixJLENBQXBCRSxNO0lBQVFDLE8sR0FBWUgsSSxDQUFaRyxPOztJQUVWQyxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUNDLGFBQXJDLEVBQW9EQyxZQUFwRCxFQUFrRUMsV0FBbEUsRUFBK0U7QUFBQTs7QUFBQSw0SEFDdkVKLFFBRHVFOztBQUc3RSxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxVQUFLQyxXQUFMLEdBQW1CQSxX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c0IsT0FBbkIsRUFBNEJDLFNBQTVCLEVBQXVDRSxVQUF2QyxFQUFtREosS0FBbkQ7QUFDRDtBQUNGOztBQUVELFNBQVM3RCx3QkFBVCxDQUFrQ1osWUFBbEMsRUFBZ0R5RSxLQUFoRCxFQUF1REMsT0FBdkQsRUFBZ0U7QUFDOURwRixRQUFNLFlBQVc7QUFDZixRQUFNa0QsU0FBUyxJQUFmOztBQUVBa0MsWUFBUXJDLG1CQUFSLENBQTRCckMsWUFBNUIsRUFBMEN3QyxNQUExQztBQUNELEdBSkQ7QUFLRDs7QUFFRCxTQUFTM0IsdUJBQVQsQ0FBaUNaLFdBQWpDLEVBQThDd0UsS0FBOUMsRUFBcURDLE9BQXJELEVBQThEO0FBQzVELE1BQU1sQyxTQUFTLElBQWY7O0FBRUFrQyxVQUFRckMsbUJBQVIsQ0FBNEJwQyxXQUE1QixFQUF5Q3VDLE1BQXpDO0FBQ0QiLCJmaWxlIjoicmljaFRleHRhcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxucmVxdWlyZSgnc2V0aW1tZWRpYXRlJyk7XHJcblxyXG5jb25zdCBkZWZlciA9IHNldEltbWVkaWF0ZTsgLy8vXHJcblxyXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZWxlY3Rpb24nKTtcclxuXHJcbmNvbnN0IHsgd2luZG93LCBFbGVtZW50IH0gPSBlYXN5O1xyXG5cclxuY2xhc3MgUmljaFRleHRhcmVhIGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBjaGFuZ2VIYW5kbGVyO1xyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjtcclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyID0gZm9jdXNIYW5kbGVyO1xyXG4gICAgdGhpcy5ibHVySGFuZGxlciA9IGJsdXJIYW5kbGVyO1xyXG5cclxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICB0aGlzLnNldE1vdXNlRG93bihtb3VzZURvd24pO1xyXG5cclxuICAgIHdpbmRvdy5vbignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub24oJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgdGhpcywgaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vbignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlciwgdGhpcywgaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmJsdXJIYW5kbGVyICYmIHRoaXMub24oJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCB0aGlzLCBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9mZignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciAmJiB0aGlzLm9mZignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9mZignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICByZXR1cm4gYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgaXNSZWFkT25seSgpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHJlYWRPbmx5ID0gZG9tRWxlbWVudC5yZWFkT25seTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICB2YWx1ZSA9IGRvbUVsZW1lbnQudmFsdWUsXHJcbiAgICAgICAgICBjb250ZW50ID0gdmFsdWU7ICAvLy9cclxuXHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IGRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvblN0YXJ0LCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIGRvbUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24sICAvLy9cclxuICAgICAgICAgIGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBkb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICBkb21FbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHNldFJlYWRPbmx5KHJlYWRPbmx5KSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcbiAgICBcclxuICAgIGRvbUVsZW1lbnQucmVhZE9ubHkgPSByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VEb3duSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyKSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZU1vdmVIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gdGhpcy5pc01vdXNlRG93bigpO1xyXG5cclxuICAgIGlmIChtb3VzZURvd24pIHtcclxuICAgICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBrZXlEb3duSGFuZGxlcigpIHtcclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXIpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJtZWRpYXRlSGFuZGxlcihoYW5kbGVyLCBmb3JjZWQgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgbGV0IHByZXZpb3VzQ29udGVudCA9IHRoaXMuZ2V0UHJldmlvdXNDb250ZW50KCksXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHRoaXMuZ2V0UHJldmlvdXNTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCA9IChjb250ZW50ICE9PSBwcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLmlzRGlmZmVyZW50VG8ocHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgICBjb250ZW50Q2hhbmdlZCA9IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCwgLy8vXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uLCAvLy9cclxuICAgICAgICAgICAgY2hhbmdlZCA9IGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gICAgICBpZiAoY2hhbmdlZCB8fCBmb3JjZWQpIHtcclxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgY29udGVudCwgc2VsZWN0aW9uLCBjb250ZW50Q2hhbmdlZCwgc2VsZWN0aW9uQ2hhbmdlZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNb3VzZURvd24oKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgbW91c2VEb3duIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gbW91c2VEb3duO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzQ29udGVudCB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzQ29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzU2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzU2VsZWN0aW9uIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZURvd24obW91c2VEb3duKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgbW91c2VEb3duXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c0NvbnRlbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IG51bGwsXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93bixcclxuICAgICAgcHJldmlvdXNDb250ZW50LFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXNlKCkge1xyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsLCBvbkZvY3VzLCBvbkJsdXIgfSA9IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsLCAvLy9cclxuICAgICAgICAgIGZvY3VzSGFuZGxlciA9IG9uRm9jdXMsIC8vL1xyXG4gICAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXIsIC8vL1xyXG4gICAgICAgICAgcmljaFRleHRhcmVhID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSaWNoVGV4dGFyZWEsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHJpY2hUZXh0YXJlYS5pbml0aWFsaXNlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJpY2hUZXh0YXJlYTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oUmljaFRleHRhcmVhLCB7XHJcbiAgdGFnTmFtZTogJ3RleHRhcmVhJyxcclxuICBkZWZhdWx0UHJvcGVydGllczoge1xyXG4gICAgY2xhc3NOYW1lOiAncmljaCdcclxuICB9LFxyXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXHJcbiAgICAnb25DaGFuZ2UnLFxyXG4gICAgJ29uU2Nyb2xsJyxcclxuICAgICdvbkZvY3VzJyxcclxuICAgICdvbkJsdXInXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IGVsZW1lbnQuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZWxlbWVudC5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSBlbGVtZW50LmdldFNjcm9sbExlZnQoKTtcclxuXHJcbiAgICBzY3JvbGxIYW5kbGVyLmNhbGwoZWxlbWVudCwgc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0LCBldmVudCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIoZm9jdXNIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gdHJ1ZTtcclxuXHJcbiAgICBlbGVtZW50LmludGVybWVkaWF0ZUhhbmRsZXIoZm9jdXNIYW5kbGVyLCBmb3JjZWQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcclxuICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICBlbGVtZW50LmludGVybWVkaWF0ZUhhbmRsZXIoYmx1ckhhbmRsZXIsIGZvcmNlZCk7XHJcbn1cclxuIl19