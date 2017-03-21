'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('setimmediate');

var defer = setImmediate; ///

var easy = require('easy'),
    window = easy.window,
    InputElement = easy.InputElement;

var Selection = require('./selection');

var RichTextarea = function (_InputElement) {
  _inherits(RichTextarea, _InputElement);

  function RichTextarea(selector) {
    var changeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var scrollHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var focusHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    var blurHandler = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    _classCallCheck(this, RichTextarea);

    var _this = _possibleConstructorReturn(this, (RichTextarea.__proto__ || Object.getPrototypeOf(RichTextarea)).call(this, selector));

    _this.changeHandlers = [];

    _this.onChange(changeHandler);

    scrollHandler.intermediateHandler = intermediateScrollHandler.bind(_this);
    focusHandler.intermediateHandler = intermediateFocusHandler.bind(_this);
    blurHandler.intermediateHandler = intermediateBlurHandler.bind(_this);

    _this.scrollHandler = scrollHandler;
    _this.focusHandler = focusHandler;
    _this.blurHandler = blurHandler;

    var content = _this.getContent(),
        selection = _this.getSelection();

    _this.previousContent = content; ///
    _this.previousSelection = selection; ///

    _this.mouseDown = false;
    return _this;
  }

  _createClass(RichTextarea, [{
    key: 'clone',
    value: function clone(changeHandler, scrollHandler, focusHandler, blurHandler) {
      return RichTextarea.clone(this, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }, {
    key: 'isActive',
    value: function isActive() {
      var active = this.hasClass('active');

      return active;
    }
  }, {
    key: 'activate',
    value: function activate() {
      this.mouseDown = false;

      window.on('mouseup contextmenu blur', this.mouseUpHandler.bind(this));

      this.on('mousemove', this.mouseMoveHandler.bind(this));

      this.on('mousedown', this.mouseDownHandler.bind(this));

      this.on('keydown', this.keyDownHandler.bind(this));

      this.on('input', this.inputHandler.bind(this));

      this.on('scroll', this.scrollHandler);

      this.on('focus', this.focusHandler);

      this.on('blur', this.blurHandler);

      this.addClass('active');
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.mouseDown = false;

      window.off('mouseup contextmenu blur', this.mouseUpHandler.bind(this));

      this.off('mousemove', this.mouseMoveHandler.bind(this));

      this.off('mousedown', this.mouseDownHandler.bind(this));

      this.off('keydown', this.keyDownHandler.bind(this));

      this.off('input', this.inputHandler.bind(this));

      this.off('scroll', this.scrollHandler);

      this.off('focus', this.focusHandler);

      this.off('blur', this.blurHandler);

      this.removeClass('active');
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      var value = this.domElement.value,
          content = value; ///

      return content;
    }
  }, {
    key: 'getSelection',
    value: function getSelection() {
      var selectionStart = this.domElement.selectionStart,
          selectionEnd = this.domElement.selectionEnd,
          startPosition = selectionStart,
          ///
      endPosition = selectionEnd,
          ///
      selection = new Selection(startPosition, endPosition);

      return selection;
    }
  }, {
    key: 'getScrollTop',
    value: function getScrollTop() {
      return this.domElement.scrollTop;
    }
  }, {
    key: 'getScrollLeft',
    value: function getScrollLeft() {
      return this.domElement.scrollLeft;
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      var value = content; ///

      this.domElement.value = value;

      this.previousContent = content; ///
    }
  }, {
    key: 'setSelection',
    value: function setSelection(selection) {
      var selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          selectionStart = selectionStartPosition,
          ///
      selectionEnd = selectionEndPosition; ///

      this.domElement.selectionStart = selectionStart;
      this.domElement.selectionEnd = selectionEnd;

      this.previousSelection = selection; ///
    }
  }, {
    key: 'setScrollTop',
    value: function setScrollTop(scrollTop) {
      this.domElement.scrollTop = scrollTop;
    }
  }, {
    key: 'setScrollLeft',
    value: function setScrollLeft(scrollLeft) {
      this.domElement.scrollLeft = scrollLeft;
    }
  }, {
    key: 'onChange',
    value: function onChange(changeHandler) {
      var regardless = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      changeHandler.regardless = regardless; ///

      this.changeHandlers.push(changeHandler);
    }
  }, {
    key: 'offChange',
    value: function offChange(changeHandler) {
      var index = this.changeHandlers.indexOf(changeHandler);

      if (index > -1) {
        var deleteCount = 1;

        this.changeHandlers.splice(index, deleteCount);
      }
    }
  }, {
    key: 'onResize',
    value: function onResize(resizeHandler) {}
  }, {
    key: 'offResize',
    value: function offResize(resizeHandler) {}
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler() {
      this.mouseDown = false;
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      if (this.mouseDown === true) {
        this.possibleChangeHandler();
      }
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler() {
      this.mouseDown = true;
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler() {
      defer(function () {
        this.possibleChangeHandler();
      }.bind(this));
    }
  }, {
    key: 'inputHandler',
    value: function inputHandler() {
      var active = this.isActive();

      if (active) {
        this.possibleChangeHandler();
      }
    }
  }, {
    key: 'possibleChangeHandler',
    value: function possibleChangeHandler() {
      var active = this.isActive(),
          content = this.getContent(),
          selection = this.getSelection(),
          contentDifferentToPreviousContent = content !== this.previousContent,
          selectionDifferentToPreviousSelection = selection.isDifferentTo(this.previousSelection),
          contentChanged = contentDifferentToPreviousContent,
          ///
      selectionChanged = selectionDifferentToPreviousSelection,
          ///
      changed = contentChanged || selectionChanged;

      if (changed) {
        this.changeHandlers.forEach(function (changeHandler) {
          if (active || changeHandler.regardless) {
            ///
            changeHandler(content, selection, contentChanged, selectionChanged);
          }
        });
      }

      this.previousContent = content;
      this.previousSelection = selection;
    }
  }], [{
    key: 'clone',
    value: function clone(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
      return InputElement.clone(RichTextarea, selector, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          onScroll = properties.onScroll,
          onFocus = properties.onFocus,
          onBlur = properties.onBlur,
          changeHandler = onChange,
          scrollHandler = onScroll,
          focusHandler = onFocus,
          blurHandler = onBlur; ///

      return InputElement.fromProperties(RichTextarea, properties, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }]);

  return RichTextarea;
}(InputElement);

Object.assign(RichTextarea, {
  tagName: 'textarea',
  ignoredProperties: ['onChange', 'onScroll', 'onFocus', 'onBlur']
});

module.exports = RichTextarea;

function intermediateScrollHandler(scrollHandler, event) {
  var active = this.isActive();

  if (active) {
    var scrollTop = this.getScrollTop(),
        scrollLeft = this.getScrollLeft(),
        preventDefault = scrollHandler(scrollTop, scrollLeft);

    return preventDefault;
  }
}

function intermediateFocusHandler(focusHandler, event) {
  defer(function () {
    var active = this.isActive();

    if (active) {
      var content = this.getContent(),
          selection = this.getSelection(),
          preventDefault = focusHandler(content, selection);

      return preventDefault;
    }
  }.bind(this));
}

function intermediateBlurHandler(blurHandler, event) {
  var active = this.isActive();

  if (active) {
    var preventDefault = blurHandler();

    return preventDefault;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIndpbmRvdyIsIklucHV0RWxlbWVudCIsIlNlbGVjdGlvbiIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsImNoYW5nZUhhbmRsZXJzIiwib25DaGFuZ2UiLCJpbnRlcm1lZGlhdGVIYW5kbGVyIiwiaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciIsImJpbmQiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImNvbnRlbnQiLCJnZXRDb250ZW50Iiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0aW9uIiwicHJldmlvdXNDb250ZW50IiwicHJldmlvdXNTZWxlY3Rpb24iLCJtb3VzZURvd24iLCJjbG9uZSIsImFjdGl2ZSIsImhhc0NsYXNzIiwib24iLCJtb3VzZVVwSGFuZGxlciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJtb3VzZURvd25IYW5kbGVyIiwia2V5RG93bkhhbmRsZXIiLCJpbnB1dEhhbmRsZXIiLCJhZGRDbGFzcyIsIm9mZiIsInJlbW92ZUNsYXNzIiwidmFsdWUiLCJkb21FbGVtZW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzY3JvbGxUb3AiLCJzY3JvbGxMZWZ0Iiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwicmVnYXJkbGVzcyIsInB1c2giLCJpbmRleCIsImluZGV4T2YiLCJkZWxldGVDb3VudCIsInNwbGljZSIsInJlc2l6ZUhhbmRsZXIiLCJwb3NzaWJsZUNoYW5nZUhhbmRsZXIiLCJpc0FjdGl2ZSIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsImZvckVhY2giLCJwcm9wZXJ0aWVzIiwib25TY3JvbGwiLCJvbkZvY3VzIiwib25CbHVyIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXZlbnQiLCJnZXRTY3JvbGxUb3AiLCJnZXRTY3JvbGxMZWZ0IiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUFBLFFBQVEsY0FBUjs7QUFFQSxJQUFNQyxRQUFRQyxZQUFkLEMsQ0FBNEI7O0FBRTVCLElBQU1DLE9BQU9ILFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUksU0FBU0QsS0FBS0MsTUFEcEI7QUFBQSxJQUVNQyxlQUFlRixLQUFLRSxZQUYxQjs7QUFJQSxJQUFNQyxZQUFZTixRQUFRLGFBQVIsQ0FBbEI7O0lBRU1PLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQStJO0FBQUEsUUFBekhDLGFBQXlILHVFQUF6RyxZQUFXLENBQUUsQ0FBNEY7QUFBQSxRQUExRkMsYUFBMEYsdUVBQTFFLFlBQVcsQ0FBRSxDQUE2RDtBQUFBLFFBQTNEQyxZQUEyRCx1RUFBNUMsWUFBVyxDQUFFLENBQStCO0FBQUEsUUFBN0JDLFdBQTZCLHVFQUFmLFlBQVcsQ0FBRSxDQUFFOztBQUFBOztBQUFBLDRIQUN2SUosUUFEdUk7O0FBRzdJLFVBQUtLLGNBQUwsR0FBc0IsRUFBdEI7O0FBRUEsVUFBS0MsUUFBTCxDQUFjTCxhQUFkOztBQUVBQyxrQkFBY0ssbUJBQWQsR0FBb0NDLDBCQUEwQkMsSUFBMUIsT0FBcEM7QUFDQU4saUJBQWFJLG1CQUFiLEdBQW1DRyx5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SUFWSSxDQVVDLElBVkQsQ0FBTjtBQVdEOztBQUVELFNBQVNFLHVCQUFULENBQWlDUCxXQUFqQyxFQUE4Q2tFLEtBQTlDLEVBQXFEO0FBQ25ELE1BQU1sRCxTQUFTLEtBQUsrQixRQUFMLEVBQWY7O0FBRUEsTUFBSS9CLE1BQUosRUFBWTtBQUNWLFFBQU1xRCxpQkFBaUJyRSxhQUF2Qjs7QUFFQSxXQUFPcUUsY0FBUDtBQUNEO0FBQ0YiLCJmaWxlIjoicmljaFRleHRhcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxucmVxdWlyZSgnc2V0aW1tZWRpYXRlJyk7XHJcblxyXG5jb25zdCBkZWZlciA9IHNldEltbWVkaWF0ZTsgLy8vXHJcblxyXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxyXG4gICAgICB3aW5kb3cgPSBlYXN5LndpbmRvdyxcclxuICAgICAgSW5wdXRFbGVtZW50ID0gZWFzeS5JbnB1dEVsZW1lbnQ7XHJcblxyXG5jb25zdCBTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3NlbGVjdGlvbicpO1xyXG5cclxuY2xhc3MgUmljaFRleHRhcmVhIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKCkge30sIHNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBmb2N1c0hhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBibHVySGFuZGxlciA9IGZ1bmN0aW9uKCkge30pIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJzID0gW107XHJcblxyXG4gICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcclxuXHJcbiAgICBzY3JvbGxIYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICBmb2N1c0hhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGludGVybWVkaWF0ZUZvY3VzSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgYmx1ckhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGludGVybWVkaWF0ZUJsdXJIYW5kbGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjtcclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyID0gZm9jdXNIYW5kbGVyO1xyXG4gICAgdGhpcy5ibHVySGFuZGxlciA9IGJsdXJIYW5kbGVyO1xyXG5cclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAvLy9cclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247IC8vL1xyXG5cclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjbG9uZShjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7IHJldHVybiBSaWNoVGV4dGFyZWEuY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7IH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB3aW5kb3cub24oJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub24oJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vbignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vbignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCgpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kb21FbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQsXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uU3RhcnQsIC8vL1xyXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBzZWxlY3Rpb25FbmQsIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIGdldFNjcm9sbFRvcCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zY3JvbGxUb3A7IH1cclxuXHJcbiAgZ2V0U2Nyb2xsTGVmdCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zY3JvbGxMZWZ0OyB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50OyAgLy8vXHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAvLy9cclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcclxuICAgIHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgLy8vXHJcbiAgfVxyXG5cclxuICBzZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wKSB7IHRoaXMuZG9tRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7IH1cclxuXHJcbiAgc2V0U2Nyb2xsTGVmdChzY3JvbGxMZWZ0KSB7IHRoaXMuZG9tRWxlbWVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDsgfVxyXG5cclxuICBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyLCByZWdhcmRsZXNzID0gZmFsc2UpIHtcclxuICAgIGNoYW5nZUhhbmRsZXIucmVnYXJkbGVzcyA9IHJlZ2FyZGxlc3M7ICAvLy9cclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJzLnB1c2goY2hhbmdlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBvZmZDaGFuZ2UoY2hhbmdlSGFuZGxlcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNoYW5nZUhhbmRsZXJzLmluZGV4T2YoY2hhbmdlSGFuZGxlcik7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgY29uc3QgZGVsZXRlQ291bnQgPSAxO1xyXG5cclxuICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVycy5zcGxpY2UoaW5kZXgsIGRlbGV0ZUNvdW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUmVzaXplKHJlc2l6ZUhhbmRsZXIpIHt9XHJcblxyXG4gIG9mZlJlc2l6ZShyZXNpemVIYW5kbGVyKSB7fVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcigpIHtcclxuICAgIGlmICh0aGlzLm1vdXNlRG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW91c2VEb3duSGFuZGxlcigpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKCkge1xyXG4gICAgZGVmZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKSxcclxuICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQgPSAoY29udGVudCAhPT0gdGhpcy5wcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbi5pc0RpZmZlcmVudFRvKHRoaXMucHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgY29udGVudENoYW5nZWQgPSBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQsIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgY2hhbmdlZCA9IGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5nZUhhbmRsZXIpIHtcclxuICAgICAgICBpZiAoYWN0aXZlIHx8IGNoYW5nZUhhbmRsZXIucmVnYXJkbGVzcykgeyAgLy8vXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyKGNvbnRlbnQsIHNlbGVjdGlvbiwgY29udGVudENoYW5nZWQsIHNlbGVjdGlvbkNoYW5nZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjbG9uZShzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5jbG9uZShSaWNoVGV4dGFyZWEsIHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCBvblNjcm9sbCwgb25Gb2N1cywgb25CbHVyIH0gPSBwcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cclxuICAgICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgIGJsdXJIYW5kbGVyID0gb25CbHVyOyAvLy9cclxuXHJcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFJpY2hUZXh0YXJlYSwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFJpY2hUZXh0YXJlYSwge1xyXG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXHJcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcclxuICAgICdvbkNoYW5nZScsXHJcbiAgICAnb25TY3JvbGwnLFxyXG4gICAgJ29uRm9jdXMnLFxyXG4gICAgJ29uQmx1cidcclxuICBdXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSaWNoVGV4dGFyZWE7XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKHNjcm9sbEhhbmRsZXIsIGV2ZW50KSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmdldFNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgc2Nyb2xsTGVmdCA9IHRoaXMuZ2V0U2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgcHJldmVudERlZmF1bHQgPSBzY3JvbGxIYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlciwgZXZlbnQpIHtcclxuICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSBmb2N1c0hhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uKTtcclxuXHJcbiAgICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICAgIH1cclxuICB9LmJpbmQodGhpcykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlciwgZXZlbnQpIHtcclxuICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gIGlmIChhY3RpdmUpIHtcclxuICAgIGNvbnN0IHByZXZlbnREZWZhdWx0ID0gYmx1ckhhbmRsZXIoKTtcclxuXHJcbiAgICByZXR1cm4gcHJldmVudERlZmF1bHQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==