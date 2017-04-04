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

  function RichTextarea(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
    _classCallCheck(this, RichTextarea);

    var _this = _possibleConstructorReturn(this, (RichTextarea.__proto__ || Object.getPrototypeOf(RichTextarea)).call(this, selector));

    _this.changeHandlers = [];

    if (changeHandler !== undefined) {
      _this.onChange(changeHandler);
    }

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
    key: 'activate',
    value: function activate() {
      this.mouseDown = false;

      window.on('mouseup contextmenu blur', this.mouseUpHandler, this);

      this.on('mousedown', this.mouseDownHandler, this);

      this.on('mousemove', this.mouseMoveHandler, this);

      this.on('keydown', this.keyDownHandler, this);

      this.on('input', this.inputHandler, this);

      if (this.scrollHandler !== undefined) {
        this.on('scroll', this.scrollHandler, intermediateScrollHandler.bind(this));
      }

      if (this.focusHandler !== undefined) {
        this.on('focus', this.focusHandler, intermediateFocusHandler.bind(this));
      }

      if (this.blurHandler !== undefined) {
        this.on('blur', this.blurHandler, intermediateBlurHandler.bind(this));
      }

      this.addClass('active');
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.mouseDown = false;

      window.off('mouseup contextmenu blur', this.mouseUpHandler);

      this.off('mousedown', this.mouseDownHandler);

      this.off('mousemove', this.mouseMoveHandler);

      this.off('keydown', this.keyDownHandler);

      this.off('input', this.inputHandler);

      if (this.scrollHandler !== undefined) {
        this.off('scroll', this.scrollHandler);
      }

      if (this.focusHandler !== undefined) {
        this.off('focus', this.focusHandler);
      }

      if (this.blurHandler !== undefined) {
        this.off('blur', this.blurHandler);
      }

      this.removeClass('active');
    }
  }, {
    key: 'isActive',
    value: function isActive() {
      var active = this.hasClass('active');

      return active;
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
    key: 'onChange',
    value: function onChange(changeHandler) {
      var regardless = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      Object.assign({
        regardless: regardless
      });

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
    key: 'mouseDownHandler',
    value: function mouseDownHandler() {
      this.mouseDown = true;
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      if (this.mouseDown) {
        this.possibleChangeHandler();
      }
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
  defaultProperties: {
    className: 'rich'
  },
  ignoredProperties: ['onChange', 'onScroll', 'onFocus', 'onBlur']
});

module.exports = RichTextarea;

function intermediateScrollHandler(scrollHandler) {
  var active = this.isActive();

  if (active) {
    var scrollTop = this.getScrollTop(),
        scrollLeft = this.getScrollLeft(),
        preventDefault = scrollHandler(scrollTop, scrollLeft);

    return preventDefault;
  }
}

function intermediateFocusHandler(focusHandler) {
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

function intermediateBlurHandler(blurHandler) {
  var active = this.isActive();

  if (active) {
    var preventDefault = blurHandler();

    return preventDefault;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIndpbmRvdyIsIklucHV0RWxlbWVudCIsIlNlbGVjdGlvbiIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsImNoYW5nZUhhbmRsZXJzIiwidW5kZWZpbmVkIiwib25DaGFuZ2UiLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsInByZXZpb3VzQ29udGVudCIsInByZXZpb3VzU2VsZWN0aW9uIiwibW91c2VEb3duIiwib24iLCJtb3VzZVVwSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJtb3VzZU1vdmVIYW5kbGVyIiwia2V5RG93bkhhbmRsZXIiLCJpbnB1dEhhbmRsZXIiLCJpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyIiwiYmluZCIsImludGVybWVkaWF0ZUZvY3VzSGFuZGxlciIsImludGVybWVkaWF0ZUJsdXJIYW5kbGVyIiwiYWRkQ2xhc3MiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImFjdGl2ZSIsImhhc0NsYXNzIiwidmFsdWUiLCJkb21FbGVtZW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJyZWdhcmRsZXNzIiwiT2JqZWN0IiwiYXNzaWduIiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImRlbGV0ZUNvdW50Iiwic3BsaWNlIiwicmVzaXplSGFuZGxlciIsInBvc3NpYmxlQ2hhbmdlSGFuZGxlciIsImlzQWN0aXZlIiwiY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50Iiwic2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiIsImlzRGlmZmVyZW50VG8iLCJjb250ZW50Q2hhbmdlZCIsInNlbGVjdGlvbkNoYW5nZWQiLCJjaGFuZ2VkIiwiZm9yRWFjaCIsInByb3BlcnRpZXMiLCJvblNjcm9sbCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJmcm9tUHJvcGVydGllcyIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0IiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUFBLFFBQVEsY0FBUjs7QUFFQSxJQUFNQyxRQUFRQyxZQUFkLEMsQ0FBNEI7O0FBRTVCLElBQU1DLE9BQU9ILFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUksU0FBU0QsS0FBS0MsTUFEcEI7QUFBQSxJQUVNQyxlQUFlRixLQUFLRSxZQUYxQjs7QUFJQSxJQUFNQyxZQUFZTixRQUFRLGFBQVIsQ0FBbEI7O0lBRU1PLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQ0MsYUFBckMsRUFBb0RDLFlBQXBELEVBQWtFQyxXQUFsRSxFQUErRTtBQUFBOztBQUFBLDRIQUN2RUosUUFEdUU7O0FBRzdFLFVBQUtLLGNBQUwsR0FBc0IsRUFBdEI7O0FBRUEsUUFBSUosa0JBQWtCSyxTQUF0QixFQUFpQztBQUMvQixZQUFLQyxRQUFMLENBQWNOLGFBQWQ7QUFDRDs7QUFFRCxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7O0FBRUEsUUFBTUksVUFBVSxNQUFLQyxVQUFMLEVBQWhCO0FBQUEsUUFDTUMsWUFBWSxNQUFL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QUlBLFdBQU9FLGNBQVA7QUFDRDtBQUNGOztBQUVELFNBQVNsRCx3QkFBVCxDQUFrQ3BCLFlBQWxDLEVBQWdEO0FBQzlDVixRQUFNLFlBQVc7QUFDZixRQUFNbUMsU0FBUyxLQUFLc0IsUUFBTCxFQUFmOztBQUVBLFFBQUl0QixNQUFKLEVBQVk7QUFDVixVQUFNcEIsVUFBVSxLQUFLQyxVQUFMLEVBQWhCO0FBQUEsVUFDTUMsWUFBWSxLQUFLQyxZQUFMLEVBRGxCO0FBQUEsVUFFTThELGlCQUFpQnRFLGFBQWFLLE9BQWIsRUFBc0JFLFNBQXRCLENBRnZCOztBQUlBLGFBQU8rRCxjQUFQO0FBQ0Q7QUFDRixHQVZLLENBVUpuRCxJQVZJLENBVUMsSUFWRCxDQUFOO0FBV0Q7O0FBRUQsU0FBU0UsdUJBQVQsQ0FBaUNwQixXQUFqQyxFQUE4QztBQUM1QyxNQUFNd0IsU0FBUyxLQUFLc0IsUUFBTCxFQUFmOztBQUVBLE1BQUl0QixNQUFKLEVBQVk7QUFDVixRQUFNNkMsaUJBQWlCckUsYUFBdkI7O0FBRUEsV0FBT3FFLGNBQVA7QUFDRDtBQUNGIiwiZmlsZSI6InJpY2hUZXh0YXJlYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJ3NldGltbWVkaWF0ZScpO1xyXG5cclxuY29uc3QgZGVmZXIgPSBzZXRJbW1lZGlhdGU7IC8vL1xyXG5cclxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcclxuICAgICAgd2luZG93ID0gZWFzeS53aW5kb3csXHJcbiAgICAgIElucHV0RWxlbWVudCA9IGVhc3kuSW5wdXRFbGVtZW50O1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZWxlY3Rpb24nKTtcclxuXHJcbmNsYXNzIFJpY2hUZXh0YXJlYSBleHRlbmRzIElucHV0RWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJzID0gW107XHJcblxyXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDsgLy8vXHJcbiAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAvLy9cclxuXHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHdpbmRvdy5vbignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCBpbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZvY3VzSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXIsIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ibHVySGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub24oJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyLCBpbnRlcm1lZGlhdGVCbHVySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgY29udGV4dG1lbnUgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9mZignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5mb2N1c0hhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9mZignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYmx1ckhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9mZignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICByZXR1cm4gYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCgpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kb21FbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQsXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uU3RhcnQsIC8vL1xyXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBzZWxlY3Rpb25FbmQsIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50OyAgLy8vXHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAvLy9cclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcclxuICAgIHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjsgLy8vXHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyLCByZWdhcmRsZXNzID0gZmFsc2UpIHtcclxuICAgIE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICByZWdhcmRsZXNzOiByZWdhcmRsZXNzXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJzLnB1c2goY2hhbmdlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBvZmZDaGFuZ2UoY2hhbmdlSGFuZGxlcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNoYW5nZUhhbmRsZXJzLmluZGV4T2YoY2hhbmdlSGFuZGxlcik7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgY29uc3QgZGVsZXRlQ291bnQgPSAxO1xyXG5cclxuICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVycy5zcGxpY2UoaW5kZXgsIGRlbGV0ZUNvdW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUmVzaXplKHJlc2l6ZUhhbmRsZXIpIHt9XHJcblxyXG4gIG9mZlJlc2l6ZShyZXNpemVIYW5kbGVyKSB7fVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VEb3duSGFuZGxlcigpIHtcclxuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZUhhbmRsZXIoKSB7XHJcbiAgICBpZiAodGhpcy5tb3VzZURvd24pIHtcclxuICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKCkge1xyXG4gICAgZGVmZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgdGhpcy5wb3NzaWJsZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKSxcclxuICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQgPSAoY29udGVudCAhPT0gdGhpcy5wcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbi5pc0RpZmZlcmVudFRvKHRoaXMucHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgY29udGVudENoYW5nZWQgPSBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQsIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgY2hhbmdlZCA9IGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5nZUhhbmRsZXIpIHtcclxuICAgICAgICBpZiAoYWN0aXZlIHx8IGNoYW5nZUhhbmRsZXIucmVnYXJkbGVzcykgeyAgLy8vXHJcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyKGNvbnRlbnQsIHNlbGVjdGlvbiwgY29udGVudENoYW5nZWQsIHNlbGVjdGlvbkNoYW5nZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCBvblNjcm9sbCwgb25Gb2N1cywgb25CbHVyIH0gPSBwcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cclxuICAgICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgIGJsdXJIYW5kbGVyID0gb25CbHVyOyAvLy9cclxuXHJcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFJpY2hUZXh0YXJlYSwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKFJpY2hUZXh0YXJlYSwge1xyXG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXHJcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcclxuICAgIGNsYXNzTmFtZTogJ3JpY2gnXHJcbiAgfSxcclxuICBpZ25vcmVkUHJvcGVydGllczogW1xyXG4gICAgJ29uQ2hhbmdlJyxcclxuICAgICdvblNjcm9sbCcsXHJcbiAgICAnb25Gb2N1cycsXHJcbiAgICAnb25CbHVyJ1xyXG4gIF1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0YXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlcikge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSB0aGlzLmdldFNjcm9sbExlZnQoKSxcclxuICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gc2Nyb2xsSGFuZGxlcihzY3JvbGxUb3AsIHNjcm9sbExlZnQpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihmb2N1c0hhbmRsZXIpIHtcclxuICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSBmb2N1c0hhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uKTtcclxuXHJcbiAgICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICAgIH1cclxuICB9LmJpbmQodGhpcykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlcikge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3QgcHJldmVudERlZmF1bHQgPSBibHVySGFuZGxlcigpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuIl19