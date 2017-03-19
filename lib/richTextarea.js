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
      var value = this.getValue(),
          content = value; ///

      return content;
    }
  }, {
    key: 'getSelection',
    value: function getSelection() {
      var selectionStart = this.getSelectionStart(),
          selectionEnd = this.getSelectionEnd(),
          startPosition = selectionStart,
          ///
      endPosition = selectionEnd,
          selection = new Selection(startPosition, endPosition);

      return selection;
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      var value = content; ///

      this.setValue(value);

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

      this.setSelectionStart(selectionStart);
      this.setSelectionEnd(selectionEnd);

      this.previousSelection = selection; ///
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeXVpIiwid2luZG93IiwiSW5wdXRFbGVtZW50IiwiU2VsZWN0aW9uIiwiUmljaFRleHRhcmVhIiwic2VsZWN0b3IiLCJjaGFuZ2VIYW5kbGVyIiwic2Nyb2xsSGFuZGxlciIsImZvY3VzSGFuZGxlciIsImJsdXJIYW5kbGVyIiwiY2hhbmdlSGFuZGxlcnMiLCJvbkNoYW5nZSIsImludGVybWVkaWF0ZUhhbmRsZXIiLCJpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyIiwiYmluZCIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiY29udGVudCIsImdldENvbnRlbnQiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJwcmV2aW91c0NvbnRlbnQiLCJwcmV2aW91c1NlbGVjdGlvbiIsIm1vdXNlRG93biIsImNsb25lIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJ2YWx1ZSIsImdldFZhbHVlIiwic2VsZWN0aW9uU3RhcnQiLCJnZXRTZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsImdldFNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNldFZhbHVlIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwic2V0U2VsZWN0aW9uU3RhcnQiLCJzZXRTZWxlY3Rpb25FbmQiLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJpc0FjdGl2ZSIsInBvc3NpYmxlQ2hhbmdlSGFuZGxlciIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsImZvckVhY2giLCJyZWdhcmRsZXNzIiwicHJvcGVydGllcyIsIm9uU2Nyb2xsIiwib25Gb2N1cyIsIm9uQmx1ciIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImV2ZW50Iiwic2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9wIiwic2Nyb2xsTGVmdCIsImdldFNjcm9sbExlZnQiLCJwcmV2ZW50RGVmYXVsdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxjQUFSOztBQUVBLElBQU1DLFFBQVFDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsU0FBU0gsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNSSxTQUFTRCxPQUFPQyxNQUR0QjtBQUFBLElBRU1DLGVBQWVGLE9BQU9FLFlBRjVCOztBQUlBLElBQU1DLFlBQVlOLFFBQVEsYUFBUixDQUFsQjs7SUFFTU8sWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBK0k7QUFBQSxRQUF6SEMsYUFBeUgsdUVBQXpHLFlBQVcsQ0FBRSxDQUE0RjtBQUFBLFFBQTFGQyxhQUEwRix1RUFBMUUsWUFBVyxDQUFFLENBQTZEO0FBQUEsUUFBM0RDLFlBQTJELHVFQUE1QyxZQUFXLENBQUUsQ0FBK0I7QUFBQSxRQUE3QkMsV0FBNkIsdUVBQWYsWUFBVyxDQUFFLENBQUU7O0FBQUE7O0FBQUEsNEhBQ3ZJSixRQUR1STs7QUFHN0ksVUFBS0ssY0FBTCxHQUFzQixFQUF0Qjs7QUFFQSxVQUFLQyxRQUFMLENBQWNMLGFBQWQ7O0FB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aUIsRUFHakIsU0FIaUIsRUFJakIsUUFKaUI7QUFGTyxDQUE1Qjs7QUFVQUMsT0FBT0MsT0FBUCxHQUFpQnhFLFlBQWpCOztBQUVBLFNBQVNTLHlCQUFULENBQW1DTixhQUFuQyxFQUFrRHNFLEtBQWxELEVBQXlEO0FBQ3ZELE1BQU1wRCxTQUFTLEtBQUsrQixRQUFMLEVBQWY7O0FBRUEsTUFBSS9CLE1BQUosRUFBWTtBQUNWLFFBQU1xRCxZQUFZLEtBQUtDLFlBQUwsRUFBbEI7QUFBQSxRQUNNQyxhQUFhLEtBQUtDLGFBQUwsRUFEbkI7QUFBQSxRQUVNQyxpQkFBaUIzRSxjQUFjdUUsU0FBZCxFQUF5QkUsVUFBekIsQ0FGdkI7O0FBSUEsV0FBT0UsY0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBU25FLHdCQUFULENBQWtDUCxZQUFsQyxFQUFnRHFFLEtBQWhELEVBQXVEO0FBQ3JEL0UsUUFBTSxZQUFXO0FBQ2YsUUFBTTJCLFNBQVMsS0FBSytCLFFBQUwsRUFBZjs7QUFFQSxRQUFJL0IsTUFBSixFQUFZO0FBQ1YsVUFBTVIsVUFBVSxLQUFLQyxVQUFMLEVBQWhCO0FBQUEsVUFDTUMsWUFBWSxLQUFLQyxZQUFMLEVBRGxCO0FBQUEsVUFFTThELGlCQUFpQjFFLGFBQWFTLE9BQWIsRUFBc0JFLFNBQXRCLENBRnZCOztBQUlBLGFBQU8rRCxjQUFQO0FBQ0Q7QUFDRixHQVZLLENBVUpwRSxJQVZJLENBVUMsSUFWRCxDQUFOO0FBV0Q7O0FBRUQsU0FBU0UsdUJBQVQsQ0FBaUNQLFdBQWpDLEVBQThDb0UsS0FBOUMsRUFBcUQ7QUFDbkQsTUFBTXBELFNBQVMsS0FBSytCLFFBQUwsRUFBZjs7QUFFQSxNQUFJL0IsTUFBSixFQUFZO0FBQ1YsUUFBTXlELGlCQUFpQnpFLGFBQXZCOztBQUVBLFdBQU95RSxjQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJyaWNoVGV4dGFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbmNvbnN0IGRlZmVyID0gc2V0SW1tZWRpYXRlOyAvLy9cclxuXHJcbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxyXG4gICAgICB3aW5kb3cgPSBlYXN5dWkud2luZG93LFxyXG4gICAgICBJbnB1dEVsZW1lbnQgPSBlYXN5dWkuSW5wdXRFbGVtZW50O1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZWxlY3Rpb24nKTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIElucHV0RWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBzY3JvbGxIYW5kbGVyID0gZnVuY3Rpb24oKSB7fSwgZm9jdXNIYW5kbGVyID0gZnVuY3Rpb24oKSB7fSwgYmx1ckhhbmRsZXIgPSBmdW5jdGlvbigpIHt9KSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVycyA9IFtdO1xyXG5cclxuICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XHJcblxyXG4gICAgc2Nyb2xsSGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgZm9jdXNIYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIGJsdXJIYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBpbnRlcm1lZGlhdGVCbHVySGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDsgLy8vXHJcbiAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAvLy9cclxuXHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcikgeyByZXR1cm4gUmljaFRleHRhcmVhLmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpOyB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcygnYWN0aXZlJyk7XHJcbiAgICBcclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vbignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub24oJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9mZignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9mZignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmdldFNlbGVjdGlvblN0YXJ0KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSB0aGlzLmdldFNlbGVjdGlvbkVuZCgpLFxyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvblN0YXJ0LCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50OyAgLy8vXHJcblxyXG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAvLy9cclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KHNlbGVjdGlvblN0YXJ0KTtcclxuICAgIHRoaXMuc2V0U2VsZWN0aW9uRW5kKHNlbGVjdGlvbkVuZCk7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgLy8vXHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyKSB7XHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJzLnB1c2goY2hhbmdlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBvZmZDaGFuZ2UoY2hhbmdlSGFuZGxlcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNoYW5nZUhhbmRsZXJzLmluZGV4T2YoY2hhbmdlSGFuZGxlcik7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgY29uc3QgZGVsZXRlQ291bnQgPSAxO1xyXG5cclxuICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVycy5zcGxpY2UoaW5kZXgsIGRlbGV0ZUNvdW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdXNlVXBIYW5kbGVyKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuICB9O1xyXG5cclxuICBtb3VzZU1vdmVIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgaWYgKHRoaXMubW91c2VEb3duID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW91c2VEb3duSGFuZGxlcigpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKCkge1xyXG4gICAgZGVmZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgICB9XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQgPSAoY29udGVudCAhPT0gdGhpcy5wcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbi5pc0RpZmZlcmVudFRvKHRoaXMucHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgY29udGVudENoYW5nZWQgPSBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQsIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgY2hhbmdlZCA9IGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5nZUhhbmRsZXIpIHtcclxuICAgICAgaWYgKGNoYW5nZWQgfHwgY2hhbmdlSGFuZGxlci5yZWdhcmRsZXNzKSB7ICAvLy9cclxuICAgICAgICBjaGFuZ2VIYW5kbGVyKGNvbnRlbnQsIHNlbGVjdGlvbiwgY29udGVudENoYW5nZWQsIHNlbGVjdGlvbkNoYW5nZWQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKFJpY2hUZXh0YXJlYSwgc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsLCBvbkZvY3VzLCBvbkJsdXIgfSA9IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsLCAvLy9cclxuICAgICAgICAgIGZvY3VzSGFuZGxlciA9IG9uRm9jdXMsIC8vL1xyXG4gICAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXI7IC8vL1xyXG5cclxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoUmljaFRleHRhcmVhLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oUmljaFRleHRhcmVhLCB7XHJcbiAgdGFnTmFtZTogJ3RleHRhcmVhJyxcclxuICBpZ25vcmVkUHJvcGVydGllczogW1xyXG4gICAgJ29uQ2hhbmdlJyxcclxuICAgICdvblNjcm9sbCcsXHJcbiAgICAnb25Gb2N1cycsXHJcbiAgICAnb25CbHVyJ1xyXG4gIF1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0YXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlciwgZXZlbnQpIHtcclxuICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gIGlmIChhY3RpdmUpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZ2V0U2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gdGhpcy5nZXRTY3JvbGxMZWZ0KCksXHJcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IHNjcm9sbEhhbmRsZXIoc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0KTtcclxuXHJcbiAgICByZXR1cm4gcHJldmVudERlZmF1bHQ7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIoZm9jdXNIYW5kbGVyLCBldmVudCkge1xyXG4gIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGZvY3VzSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24pO1xyXG5cclxuICAgICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gICAgfVxyXG4gIH0uYmluZCh0aGlzKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyKGJsdXJIYW5kbGVyLCBldmVudCkge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3QgcHJldmVudERlZmF1bHQgPSBibHVySGFuZGxlcigpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuIl19