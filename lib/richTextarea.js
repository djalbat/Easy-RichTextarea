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

var RichTextarea = function (_Textarea) {
  _inherits(RichTextarea, _Textarea);

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

      return InputElement.fromProperties(Textarea, properties, changeHandler, scrollHandler, focusHandler, blurHandler);
    }
  }]);

  return RichTextarea;
}(Textarea);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeXVpIiwid2luZG93IiwiSW5wdXRFbGVtZW50IiwiU2VsZWN0aW9uIiwiUmljaFRleHRhcmVhIiwic2VsZWN0b3IiLCJjaGFuZ2VIYW5kbGVyIiwic2Nyb2xsSGFuZGxlciIsImZvY3VzSGFuZGxlciIsImJsdXJIYW5kbGVyIiwiY2hhbmdlSGFuZGxlcnMiLCJvbkNoYW5nZSIsImludGVybWVkaWF0ZUhhbmRsZXIiLCJpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyIiwiYmluZCIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiY29udGVudCIsImdldENvbnRlbnQiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJwcmV2aW91c0NvbnRlbnQiLCJwcmV2aW91c1NlbGVjdGlvbiIsIm1vdXNlRG93biIsImNsb25lIiwiYWN0aXZlIiwiaGFzQ2xhc3MiLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJrZXlEb3duSGFuZGxlciIsImlucHV0SGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJ2YWx1ZSIsImdldFZhbHVlIiwic2VsZWN0aW9uU3RhcnQiLCJnZXRTZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsImdldFNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsInNldFZhbHVlIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwic2V0U2VsZWN0aW9uU3RhcnQiLCJzZXRTZWxlY3Rpb25FbmQiLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJpc0FjdGl2ZSIsInBvc3NpYmxlQ2hhbmdlSGFuZGxlciIsImNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCIsInNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24iLCJpc0RpZmZlcmVudFRvIiwiY29udGVudENoYW5nZWQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwiY2hhbmdlZCIsImZvckVhY2giLCJyZWdhcmRsZXNzIiwicHJvcGVydGllcyIsIm9uU2Nyb2xsIiwib25Gb2N1cyIsIm9uQmx1ciIsImZyb21Qcm9wZXJ0aWVzIiwiVGV4dGFyZWEiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXZlbnQiLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsInByZXZlbnREZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBQSxRQUFRLGNBQVI7O0FBRUEsSUFBTUMsUUFBUUMsWUFBZCxDLENBQTRCOztBQUU1QixJQUFNQyxTQUFTSCxRQUFRLFFBQVIsQ0FBZjtBQUFBLElBQ01JLFNBQVNELE9BQU9DLE1BRHRCO0FBQUEsSUFFTUMsZUFBZUYsT0FBT0UsWUFGNUI7O0FBSUEsSUFBTUMsWUFBWU4sUUFBUSxhQUFSLENBQWxCOztJQUVNTyxZOzs7QUFDSix3QkFBWUMsUUFBWixFQUErSTtBQUFBLFFBQXpIQyxhQUF5SCx1RUFBekcsWUFBVyxDQUFFLENBQTRGO0FBQUEsUUFBMUZDLGFBQTBGLHVFQUExRSxZQUFXLENBQUUsQ0FBNkQ7QUFBQSxRQUEzREMsWUFBMkQsdUVBQTVDLFlBQVcsQ0FBRSxDQUErQjtBQUFBLFFBQTdCQyxXQUE2Qix1RUFBZixZQUFXLENBQUUsQ0FBRTs7QUFBQTs7QUFBQSw0SEFDdklKLFFBRHVJOztBQUc3SSxVQUFLSyxjQUFMLEdBQXNCLEVBQXRCOztBQUVBLFVBQUtDLFFBQUwsQ0FB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RUFFakIsVUFGaUIsRUFHakIsU0FIaUIsRUFJakIsUUFKaUI7QUFGTyxDQUE1Qjs7QUFVQUMsT0FBT0MsT0FBUCxHQUFpQnpFLFlBQWpCOztBQUVBLFNBQVNTLHlCQUFULENBQW1DTixhQUFuQyxFQUFrRHVFLEtBQWxELEVBQXlEO0FBQ3ZELE1BQU1yRCxTQUFTLEtBQUsrQixRQUFMLEVBQWY7O0FBRUEsTUFBSS9CLE1BQUosRUFBWTtBQUNWLFFBQU1zRCxZQUFZLEtBQUtDLFlBQUwsRUFBbEI7QUFBQSxRQUNNQyxhQUFhLEtBQUtDLGFBQUwsRUFEbkI7QUFBQSxRQUVNQyxpQkFBaUI1RSxjQUFjd0UsU0FBZCxFQUF5QkUsVUFBekIsQ0FGdkI7O0FBSUEsV0FBT0UsY0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBU3BFLHdCQUFULENBQWtDUCxZQUFsQyxFQUFnRHNFLEtBQWhELEVBQXVEO0FBQ3JEaEYsUUFBTSxZQUFXO0FBQ2YsUUFBTTJCLFNBQVMsS0FBSytCLFFBQUwsRUFBZjs7QUFFQSxRQUFJL0IsTUFBSixFQUFZO0FBQ1YsVUFBTVIsVUFBVSxLQUFLQyxVQUFMLEVBQWhCO0FBQUEsVUFDTUMsWUFBWSxLQUFLQyxZQUFMLEVBRGxCO0FBQUEsVUFFTStELGlCQUFpQjNFLGFBQWFTLE9BQWIsRUFBc0JFLFNBQXRCLENBRnZCOztBQUlBLGFBQU9nRSxjQUFQO0FBQ0Q7QUFDRixHQVZLLENBVUpyRSxJQVZJLENBVUMsSUFWRCxDQUFOO0FBV0Q7O0FBRUQsU0FBU0UsdUJBQVQsQ0FBaUNQLFdBQWpDLEVBQThDcUUsS0FBOUMsRUFBcUQ7QUFDbkQsTUFBTXJELFNBQVMsS0FBSytCLFFBQUwsRUFBZjs7QUFFQSxNQUFJL0IsTUFBSixFQUFZO0FBQ1YsUUFBTTBELGlCQUFpQjFFLGFBQXZCOztBQUVBLFdBQU8wRSxjQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJyaWNoVGV4dGFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbmNvbnN0IGRlZmVyID0gc2V0SW1tZWRpYXRlOyAvLy9cclxuXHJcbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxyXG4gICAgICB3aW5kb3cgPSBlYXN5dWkud2luZG93LFxyXG4gICAgICBJbnB1dEVsZW1lbnQgPSBlYXN5dWkuSW5wdXRFbGVtZW50O1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZWxlY3Rpb24nKTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIFRleHRhcmVhIHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKCkge30sIHNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBmb2N1c0hhbmRsZXIgPSBmdW5jdGlvbigpIHt9LCBibHVySGFuZGxlciA9IGZ1bmN0aW9uKCkge30pIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJzID0gW107XHJcblxyXG4gICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcclxuXHJcbiAgICBzY3JvbGxIYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICBmb2N1c0hhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGludGVybWVkaWF0ZUZvY3VzSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgYmx1ckhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGludGVybWVkaWF0ZUJsdXJIYW5kbGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjtcclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyID0gZm9jdXNIYW5kbGVyO1xyXG4gICAgdGhpcy5ibHVySGFuZGxlciA9IGJsdXJIYW5kbGVyO1xyXG5cclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAvLy9cclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247IC8vL1xyXG5cclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjbG9uZShjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7IHJldHVybiBSaWNoVGV4dGFyZWEuY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7IH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICB3aW5kb3cub24oJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub24oJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vbignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vbignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLm9mZignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCgpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuZ2V0U2VsZWN0aW9uU3RhcnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHRoaXMuZ2V0U2VsZWN0aW9uRW5kKCksXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uU3RhcnQsIC8vL1xyXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBzZWxlY3Rpb25FbmQsXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29udGVudChjb250ZW50KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRlbnQ7ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICB0aGlzLnByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7IC8vL1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbjsgIC8vL1xyXG5cclxuICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoc2VsZWN0aW9uU3RhcnQpO1xyXG4gICAgdGhpcy5zZXRTZWxlY3Rpb25FbmQoc2VsZWN0aW9uRW5kKTtcclxuXHJcbiAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAvLy9cclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpIHtcclxuICAgIHRoaXMuY2hhbmdlSGFuZGxlcnMucHVzaChjaGFuZ2VIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIG9mZkNoYW5nZShjaGFuZ2VIYW5kbGVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hhbmdlSGFuZGxlcnMuaW5kZXhPZihjaGFuZ2VIYW5kbGVyKTtcclxuXHJcbiAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICBjb25zdCBkZWxldGVDb3VudCA9IDE7XHJcblxyXG4gICAgICB0aGlzLmNoYW5nZUhhbmRsZXJzLnNwbGljZShpbmRleCwgZGVsZXRlQ291bnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBpZiAodGhpcy5tb3VzZURvd24gPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKCkge1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9zc2libGVDaGFuZ2VIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgIGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCA9IChjb250ZW50ICE9PSB0aGlzLnByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLmlzRGlmZmVyZW50VG8odGhpcy5wcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICBjb250ZW50Q2hhbmdlZCA9IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiwgLy8vXHJcbiAgICAgICAgICBjaGFuZ2VkID0gY29udGVudENoYW5nZWQgfHwgc2VsZWN0aW9uQ2hhbmdlZDtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24oY2hhbmdlSGFuZGxlcikge1xyXG4gICAgICBpZiAoY2hhbmdlZCB8fCBjaGFuZ2VIYW5kbGVyLnJlZ2FyZGxlc3MpIHsgIC8vL1xyXG4gICAgICAgIGNoYW5nZUhhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uLCBjb250ZW50Q2hhbmdlZCwgc2VsZWN0aW9uQ2hhbmdlZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDtcclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoUmljaFRleHRhcmVhLCBzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXI7IC8vL1xyXG5cclxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoVGV4dGFyZWEsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihSaWNoVGV4dGFyZWEsIHtcclxuICB0YWdOYW1lOiAndGV4dGFyZWEnLFxyXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXHJcbiAgICAnb25DaGFuZ2UnLFxyXG4gICAgJ29uU2Nyb2xsJyxcclxuICAgICdvbkZvY3VzJyxcclxuICAgICdvbkJsdXInXHJcbiAgXVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmljaFRleHRhcmVhO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihzY3JvbGxIYW5kbGVyLCBldmVudCkge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSB0aGlzLmdldFNjcm9sbExlZnQoKSxcclxuICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gc2Nyb2xsSGFuZGxlcihzY3JvbGxUb3AsIHNjcm9sbExlZnQpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihmb2N1c0hhbmRsZXIsIGV2ZW50KSB7XHJcbiAgZGVmZXIoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gZm9jdXNIYW5kbGVyKGNvbnRlbnQsIHNlbGVjdGlvbik7XHJcblxyXG4gICAgICByZXR1cm4gcHJldmVudERlZmF1bHQ7XHJcbiAgICB9XHJcbiAgfS5iaW5kKHRoaXMpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIoYmx1ckhhbmRsZXIsIGV2ZW50KSB7XHJcbiAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICBpZiAoYWN0aXZlKSB7XHJcbiAgICBjb25zdCBwcmV2ZW50RGVmYXVsdCA9IGJsdXJIYW5kbGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xyXG4gIH1cclxufVxyXG4iXX0=