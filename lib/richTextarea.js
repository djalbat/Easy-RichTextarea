'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('setimmediate');

var defer = setImmediate; ///

var easyui = require('easyui'),
    window = easyui.window,
    InputElement = easyui.InputElement;

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
      var active = this.isActive();

      if (active) {
        if (this.mouseDown === true) {
          this.possibleChangeHandler();
        }
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
        var active = this.isActive();

        if (active) {
          this.possibleChangeHandler();
        }
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
      var content = this.getContent(),
          selection = this.getSelection(),
          contentDifferentToPreviousContent = content !== this.previousContent,
          selectionDifferentToPreviousSelection = selection.isDifferentTo(this.previousSelection),
          contentChanged = contentDifferentToPreviousContent,
          ///
      selectionChanged = selectionDifferentToPreviousSelection,
          ///
      changed = contentChanged || selectionChanged;

      this.changeHandlers.forEach(function (changeHandler) {
        if (changed || changeHandler.regardless) {
          ///
          changeHandler(content, selection, contentChanged, selectionChanged);
        }
      });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeXVpIiwid2luZG93IiwiSW5wdXRFbGVtZW50IiwiU2VsZWN0aW9uIiwiUmljaFRleHRhcmVhIiwic2VsZWN0b3IiLCJjaGFuZ2VIYW5kbGVyIiwic2Nyb2xsSGFuZGxlciIsImZvY3VzSGFuZGxlciIsImJsdXJIYW5kbGVyIiwiY2hhbmdlSGFuZGxlcnMiLCJvbkNoYW5nZSIsImludGVybWVkaWF0ZUhhbmRsZXIiLCJpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyIiwiYmluZCIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiY29udGVudCIsImdldENvbnRlbnQiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJwcmV2aW91c0NvbnRlbnQiLCJwcmV2aW91c1NlbGVjdGlvbiIsIm1vdXNlRG93biIsImNsb25lIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJ2YWx1ZSIsImRvbUVsZW1lbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJyZXNpemVIYW5kbGVyIiwiaXNBY3RpdmUiLCJwb3NzaWJsZUNoYW5nZUhhbmRsZXIiLCJjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uIiwiaXNEaWZmZXJlbnRUbyIsImNvbnRlbnRDaGFuZ2VkIiwic2VsZWN0aW9uQ2hhbmdlZCIsImNoYW5nZWQiLCJmb3JFYWNoIiwicmVnYXJkbGVzcyIsInByb3BlcnRpZXMiLCJvblNjcm9sbCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJldmVudCIsImdldFNjcm9sbFRvcCIsImdldFNjcm9sbExlZnQiLCJwcmV2ZW50RGVmYXVsdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxjQUFSOztBQUVBLElBQU1DLFFBQVFDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsU0FBU0gsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNSSxTQUFTRCxPQUFPQyxNQUR0QjtBQUFBLElBRU1DLGVBQWVGLE9BQU9FLFlBRjVCOztBQUlBLElBQU1DLFlBQVlOLFFBQVEsYUFBUixDQUFsQjs7SUFFTU8sWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBK0k7QUFBQSxRQUF6SEMsYUFBeUgsdUVBQXpHLFlBQVcsQ0FBRSxDQUE0RjtBQUFBLFFBQTFGQyxhQUEwRix1RUFBMUUsWUFBVyxDQUFFLENBQTZEO0FBQUEsUUFBM0RDLFlBQTJELHVFQUE1QyxZQUFXLENBQUUsQ0FBK0I7QUFBQSxRQUE3QkMsV0FBNkIsdUVBQWYsWUFBVyxDQUFFLENBQUU7O0FBQUE7O0FBQUEsNEhBQ3ZJSixRQUR1STs7QUFHN0ksVUFBS0ssY0FBTCxHQUFzQixFQUF0Qjs7QUFFQSxVQUFLQyxRQUFMLENBQWNMLGFBQWQ7O0FBRUFDLGtCQUFjSyxtQkFBZCxHQUFvQ0MsMEJBQTBCQyxJQUExQixPQUFwQztBQUNBTixpQkFBYUksbUJBQWIsR0FBbUNH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LENBQU47QUFXRDs7QUFFRCxTQUFTRSx1QkFBVCxDQUFpQ1AsV0FBakMsRUFBOENrRSxLQUE5QyxFQUFxRDtBQUNuRCxNQUFNbEQsU0FBUyxLQUFLNkIsUUFBTCxFQUFmOztBQUVBLE1BQUk3QixNQUFKLEVBQVk7QUFDVixRQUFNcUQsaUJBQWlCckUsYUFBdkI7O0FBRUEsV0FBT3FFLGNBQVA7QUFDRDtBQUNGIiwiZmlsZSI6InJpY2hUZXh0YXJlYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJ3NldGltbWVkaWF0ZScpO1xyXG5cclxuY29uc3QgZGVmZXIgPSBzZXRJbW1lZGlhdGU7IC8vL1xyXG5cclxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXHJcbiAgICAgIHdpbmRvdyA9IGVhc3l1aS53aW5kb3csXHJcbiAgICAgIElucHV0RWxlbWVudCA9IGVhc3l1aS5JbnB1dEVsZW1lbnQ7XHJcblxyXG5jb25zdCBTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3NlbGVjdGlvbicpO1xyXG5cclxuY2xhc3MgUmljaFRleHRhcmVhIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKCkge30sIHNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBmb2N1c0hhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBibHVySGFuZGxlciA9IGZ1bmN0aW9uKCkge30pIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJzID0gW107XHJcblxyXG4gICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcclxuXHJcbiAgICBzY3JvbGxIYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICBmb2N1c0hhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGludGVybWVkaWF0ZUZvY3VzSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgYmx1ckhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGludGVybWVkaWF0ZUJsdXJIYW5kbGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjtcclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyID0gZm9jdXNIYW5kbGVyO1xyXG4gICAgdGhpcy5ibHVySGFuZGxlciA9IGJsdXJIYW5kbGVyO1xyXG5cclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAvLy9cclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247IC8vL1xyXG5cclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjbG9uZShjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7IHJldHVybiBSaWNoVGV4dGFyZWEuY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7IH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB3aW5kb3cub24oJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub24oJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vbignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vbignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCgpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kb21FbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQsXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uU3RhcnQsIC8vL1xyXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBzZWxlY3Rpb25FbmQsIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIGdldFNjcm9sbFRvcCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zY3JvbGxUb3A7IH1cclxuXHJcbiAgZ2V0U2Nyb2xsTGVmdCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zY3JvbGxMZWZ0OyB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50OyAgLy8vXHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAvLy9cclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcclxuICAgIHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgLy8vXHJcbiAgfVxyXG5cclxuICBzZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wKSB7IHRoaXMuZG9tRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7IH1cclxuXHJcbiAgc2V0U2Nyb2xsTGVmdChzY3JvbGxMZWZ0KSB7IHRoaXMuZG9tRWxlbWVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDsgfVxyXG5cclxuICBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyKSB7XHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJzLnB1c2goY2hhbmdlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBvZmZDaGFuZ2UoY2hhbmdlSGFuZGxlcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNoYW5nZUhhbmRsZXJzLmluZGV4T2YoY2hhbmdlSGFuZGxlcik7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgY29uc3QgZGVsZXRlQ291bnQgPSAxO1xyXG5cclxuICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVycy5zcGxpY2UoaW5kZXgsIGRlbGV0ZUNvdW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUmVzaXplKHJlc2l6ZUhhbmRsZXIpIHt9XHJcblxyXG4gIG9mZlJlc2l6ZShyZXNpemVIYW5kbGVyKSB7fVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vdXNlRG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBrZXlEb3duSGFuZGxlcigpIHtcclxuICAgIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NzaWJsZUNoYW5nZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHRoaXMucHJldmlvdXNDb250ZW50KSxcclxuICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyh0aGlzLnByZXZpb3VzU2VsZWN0aW9uKSxcclxuICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkNoYW5nZWQgPSBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uLCAvLy9cclxuICAgICAgICAgIGNoYW5nZWQgPSBjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuICAgIHRoaXMuY2hhbmdlSGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihjaGFuZ2VIYW5kbGVyKSB7XHJcbiAgICAgIGlmIChjaGFuZ2VkIHx8IGNoYW5nZUhhbmRsZXIucmVnYXJkbGVzcykgeyAgLy8vXHJcbiAgICAgICAgY2hhbmdlSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjbG9uZShzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikge1xyXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5jbG9uZShSaWNoVGV4dGFyZWEsIHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCBvblNjcm9sbCwgb25Gb2N1cywgb25CbHVyIH0gPSBwcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cclxuICAgICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgIGJsdXJIYW5kbGVyID0gb25CbHVyOyAvLy9cclxuXHJcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFJpY2hUZXh0YXJlYSwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFJpY2hUZXh0YXJlYSwge1xyXG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXHJcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcclxuICAgICdvbkNoYW5nZScsXHJcbiAgICAnb25TY3JvbGwnLFxyXG4gICAgJ29uRm9jdXMnLFxyXG4gICAgJ29uQmx1cidcclxuICBdXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSaWNoVGV4dGFyZWE7XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKHNjcm9sbEhhbmRsZXIsIGV2ZW50KSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmdldFNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgc2Nyb2xsTGVmdCA9IHRoaXMuZ2V0U2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgcHJldmVudERlZmF1bHQgPSBzY3JvbGxIYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGZvY3VzSGFuZGxlciwgZXZlbnQpIHtcclxuICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSBmb2N1c0hhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uKTtcclxuXHJcbiAgICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICAgIH1cclxuICB9LmJpbmQodGhpcykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlciwgZXZlbnQpIHtcclxuICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gIGlmIChhY3RpdmUpIHtcclxuICAgIGNvbnN0IHByZXZlbnREZWZhdWx0ID0gYmx1ckhhbmRsZXIoKTtcclxuXHJcbiAgICByZXR1cm4gcHJldmVudERlZmF1bHQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==