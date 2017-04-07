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
    InputElement = easy.InputElement;

var RichTextarea = function (_InputElement) {
  _inherits(RichTextarea, _InputElement);

  function RichTextarea(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
    _classCallCheck(this, RichTextarea);

    var _this = _possibleConstructorReturn(this, (RichTextarea.__proto__ || Object.getPrototypeOf(RichTextarea)).call(this, selector));

    _this.changeHandler = changeHandler;
    _this.scrollHandler = scrollHandler;
    _this.focusHandler = focusHandler;
    _this.blurHandler = blurHandler;

    var content = _this.getContent(),
        selection = _this.getSelection(),
        previousContent = content,
        ///
    previousSelection = selection; ///

    _this.setPreviousContent(previousContent);
    _this.setPreviousSelection(previousSelection);
    return _this;
  }

  _createClass(RichTextarea, [{
    key: 'activate',
    value: function activate() {
      this.setMouseDown();

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
      this.setMouseDown();

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
          ///
      selection = new Selection(startPosition, endPosition);

      return selection;
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
    key: 'isMouseDown',
    value: function isMouseDown() {
      var state = this.getState(),
          mouseDown = state.mouseDown;


      return mouseDown;
    }
  }, {
    key: 'setMouseUp',
    value: function setMouseUp() {
      var mouseDown = false;

      var state = this.getState();

      state = Object.assign(state, {
        mouseDown: mouseDown
      });

      this.setState(state);
    }
  }, {
    key: 'setMouseDown',
    value: function setMouseDown() {
      var mouseDown = true;

      var state = this.getState();

      state = Object.assign(state, {
        mouseDown: mouseDown
      });

      this.setState(state);
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      var value = content,
          ///
      previousContent = content; ///

      this.setValue(value);

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
      previousSelection = selection; ///

      this.setSelectionStart(selectionStart);
      this.setSelectionEnd(selectionEnd);

      this.setPreviousSelection(previousSelection);
    }
  }, {
    key: 'setPreviousContent',
    value: function setPreviousContent(previousContent) {
      var state = this.getState();

      state = Object.assign(state, {
        previousContent: previousContent
      });

      this.setState(state);
    }
  }, {
    key: 'setPreviousSelection',
    value: function setPreviousSelection(previousSelection) {
      var state = this.getState();

      state = Object.assign(state, {
        previousSelection: previousSelection
      });

      this.setState(state);
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler() {
      this.setMouseUp();
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler() {
      this.setMouseDown();
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler() {
      var mouseDown = this.isMouseDown();

      if (mouseDown) {
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

        if (changed) {
          var targetElement = this; ///

          this.changeHandler(content, selection, contentChanged, selectionChanged, targetElement);
        }

        previousContent = content; ///
        previousSelection = selection; ///

        this.setPreviousContent(previousContent);
        this.setPreviousSelection(previousSelection);
      }
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onScroll = properties.onScroll,
          onFocus = properties.onFocus,
          onBlur = properties.onBlur,
          scrollHandler = onScroll,
          focusHandler = onFocus,
          blurHandler = onBlur; ///

      return InputElement.fromProperties(RichTextarea, properties, scrollHandler, focusHandler, blurHandler);
    }
  }]);

  return RichTextarea;
}(InputElement);

Object.assign(RichTextarea, {
  tagName: 'textarea',
  defaultProperties: {
    className: 'rich'
  },
  ignoredProperties: ['onScroll', 'onFocus', 'onBlur']
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dGFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwiZWFzeSIsIlNlbGVjdGlvbiIsIndpbmRvdyIsIklucHV0RWxlbWVudCIsIlJpY2hUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNjcm9sbEhhbmRsZXIiLCJmb2N1c0hhbmRsZXIiLCJibHVySGFuZGxlciIsImNvbnRlbnQiLCJnZXRDb250ZW50Iiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0aW9uIiwicHJldmlvdXNDb250ZW50IiwicHJldmlvdXNTZWxlY3Rpb24iLCJzZXRQcmV2aW91c0NvbnRlbnQiLCJzZXRQcmV2aW91c1NlbGVjdGlvbiIsInNldE1vdXNlRG93biIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJtb3VzZURvd25IYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsImtleURvd25IYW5kbGVyIiwiaW5wdXRIYW5kbGVyIiwidW5kZWZpbmVkIiwiaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciIsImJpbmQiLCJpbnRlcm1lZGlhdGVGb2N1c0hhbmRsZXIiLCJpbnRlcm1lZGlhdGVCbHVySGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJhY3RpdmUiLCJoYXNDbGFzcyIsInZhbHVlIiwiZ2V0VmFsdWUiLCJzZWxlY3Rpb25TdGFydCIsImdldFNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiZ2V0U2VsZWN0aW9uRW5kIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsIm1vdXNlRG93biIsIk9iamVjdCIsImFzc2lnbiIsInNldFN0YXRlIiwic2V0VmFsdWUiLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJzZXRTZWxlY3Rpb25TdGFydCIsInNldFNlbGVjdGlvbkVuZCIsInNldE1vdXNlVXAiLCJpc01vdXNlRG93biIsInBvc3NpYmxlQ2hhbmdlSGFuZGxlciIsImlzQWN0aXZlIiwiZ2V0UHJldmlvdXNDb250ZW50IiwiZ2V0UHJldmlvdXNTZWxlY3Rpb24iLCJjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQiLCJzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uIiwiaXNEaWZmZXJlbnRUbyIsImNvbnRlbnRDaGFuZ2VkIiwic2VsZWN0aW9uQ2hhbmdlZCIsImNoYW5nZWQiLCJ0YXJnZXRFbGVtZW50IiwicHJvcGVydGllcyIsIm9uU2Nyb2xsIiwib25Gb2N1cyIsIm9uQmx1ciIsImZyb21Qcm9wZXJ0aWVzIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwic2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9wIiwic2Nyb2xsTGVmdCIsImdldFNjcm9sbExlZnQiLCJwcmV2ZW50RGVmYXVsdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxjQUFSOztBQUVBLElBQU1DLFFBQVFDLFlBQWQsQyxDQUE0Qjs7QUFFNUIsSUFBTUMsT0FBT0gsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUksWUFBWUosUUFBUSxhQUFSLENBQWxCOztJQUVRSyxNLEdBQXlCRixJLENBQXpCRSxNO0lBQVFDLFksR0FBaUJILEksQ0FBakJHLFk7O0lBRVZDLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQ0MsYUFBckMsRUFBb0RDLFlBQXBELEVBQWtFQyxXQUFsRSxFQUErRTtBQUFBOztBQUFBLDRIQUN2RUosUUFEdUU7O0FBRzdFLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFFBQU1DLFVBQVUsTUFBS0MsVUFBTCxFQUFoQjtBQUFBLFFBQ01DLFlBQVksTUFBS0MsWUFBTCxFQURsQjtBQUFBLFFBRU1DLGtCQUFrQkosT0FGeEI7QUFBQSxRQUVrQztBQUM1Qkssd0JBQW9CSCxTQUgxQixDQVI2RSxDQVd2Qzs7QUFFdEMsVUFBS0ksa0JBQUwsQ0FBd0JGLGVBQXhCO0FBQ0EsVUFBS0csb0JBQUwsQ0FBMEJGLGlCQUExQjtBQWQ2RTtBQWU5RTs7OzsrQkFFVTtBQUNULFdBQUtHLFlBQUw7O0FBRUFoQixhQUFPaUIsRUFBUCxDQUFVLDBCQUFWLEVBQXNDLEtBQUtDLGNBQTNDLEVBQTJELElBQTNEOztBQUVBLFdBQUtELEVBQUwsQ0FBUSxXQUFSLEVBQXFCLEtBQUtFLGdCQUExQixFQUE0QyxJQUE1Qzs7QUFFQSxXQUFLRixFQUFMLENBQVEsV0FBUixFQUFxQixLQUFLRyxnQkFBMUIsRUFBNEMsSUFBNUM7O0FBRUEsV0FBS0gsRUFBTCxDQUFRLFNBQVIsRUFBbUIsS0FBS0ksY0FBeEIsRUFBd0MsSUFBeEM7O0FBRUEsV0FBS0osRUFBTCxDQUFRLE9BQVIsRUFBaUIsS0FBS0ssWUFBdEIsRUFBb0MsSUFBcEM7O0FBRUEsVUFBSSxLQUFLakIsYUFBTCxLQUF1QmtCLFNBQTNCLEVBQXNDO0FBQ3BDLGFBQUtOLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLEtBQUtaLGFBQXZCLEVBQXNDbUIsMEJBQTBCQyxJQUExQixDQUErQixJQUEvQixDQUF0QztBQUNEOztBQUVELFVBQUksS0FBS25CLFlBQUwsS0FBc0JpQixTQUExQixFQUFxQztBQUNuQyxhQUFLTixFQUFMLENBQVEsT0FBUixFQUFpQixLQUFLWCxZQUF0QixFQUFvQ29CLHlCQUF5QkQsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBcEM7QUFDRDs7QUFFRCxVQUFJLEtBQUtsQixXQUFMLEtBQXFCZ0IsU0FBekIsRUFBb0M7QUFDbEMsYUFBS04sRUFBTCxDQUFRLE1BQVIsRUFBZ0IsS0FBS1YsV0FBckIsRUFBa0NvQix3QkFBd0JGLElBQXhCLENBQTZCLElBQTdCLENBQWxDO0FBQ0Q7O0FBRUQsV0FBS0csUUFBTCxDQUFjLFFBQWQ7QUFDRDs7O2lDQUVZO0FBQ1gsV0FBS1osWUFBTDs7QUFFQWhCLGFBQU82QixHQUFQLENBQVcsMEJBQVgsRUFBdUMsS0FBS1gsY0FBNUM7O0FBRUEsV0FBS1csR0FBTCxDQUFTLFdBQVQsRUFBc0IsS0FBS1YsZ0JBQTNCOztBQUVBLFdBQUtVLEdBQUwsQ0FBUyxXQUFULEVBQXNCLEtBQUtULGdCQUEzQjs7QUFFQSxXQUFLUyxHQUFMLENBQVMsU0FBVCxFQUFvQixLQUFLUixjQUF6Qjs7QUFFQSxXQUFLUSxHQUFMLENBQVMsT0FBVCxFQUFrQixLQUFLUCxZQUF2Qjs7QUFFQSxVQUFJLEtBQUtqQixhQUFMLEtBQXVCa0IsU0FBM0IsRUFBc0M7QUFDcEMsYUFBS00sR0FBTCxDQUFTLFFBQVQsRUFBbUIsS0FBS3hCLGFBQXhCO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLQyxZQUFMLEtBQXNCaUIsU0FBMUIsRUFBcUM7QUFDbkMsYUFBS00sR0FBTCxDQUFTLE9BQVQsRUFBa0IsS0FBS3ZCLFlBQXZCO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLQyxXQUFMLEtBQXFCZ0IsU0FBekIsRUFBb0M7QUFDbEMsYUFBS00sR0FBTCxDQUFTLE1BQVQsRUFBaUIsS0FBS3RCLFdBQXRCO0FBQ0Q7O0FBRUQsV0FBS3VCLFdBQUwsQ0FBaUIsUUFBakI7QUFDRDs7OytCQUVVO0FBQ1QsVUFBTUMsU0FBUyxLQUFLQyxRQUFMLENBQWMsUUFBZCxDQUFmOztBQUVBLGFBQU9ELE1BQVA7QUFDRDs7O2lDQUVZO0FBQ1gsVUFBTUUsUUFBUSxLQUFLQyxRQUFMLEVBQWQ7QUFBQSxVQUNNMUIsVUFBVXlCLEtBRGhCLENBRFcsQ0FFYTs7QUFFeEIsYUFBT3pCLE9BQVA7QUFDRDs7O21DQUVjO0FBQ2IsVUFBTTJCLGlCQUFpQixLQUFLQyxpQkFBTCxFQUF2QjtBQUFBLFVBQ01DLGVBQWUsS0FBS0MsZUFBTCxFQURyQjtBQUFBLFVBRU1DLGdCQUFnQkosY0FGdEI7QUFBQSxVQUVzQztBQUNoQ0ssb0JBQWNILFlBSHBCO0FBQUEsVUFHa0M7QUFDNUIzQixrQkFBWSxJQUFJWCxTQUFKLENBQWN3QyxhQUFkLEVBQTZCQyxXQUE3QixDQUpsQjs7QUFNQSxhQUFPOUIsU0FBUDtBQUNEOzs7eUNBRW9CO0FBQ2Isa0JBQVEsS0FBSytCLFFBQUwsRUFBUjtBQUFBLFVBQ0U3QixlQURGLEdBQ3NCOEIsS0FEdEIsQ0FDRTlCLGVBREY7OztBQUdOLGFBQU9BLGVBQVA7QUFDRDs7OzJDQUVzQjtBQUNmLGtCQUFRLEtBQUs2QixRQUFMLEVBQVI7QUFBQSxVQUNFNUIsaUJBREYsR0FDd0I2QixLQUR4QixDQUNFN0IsaUJBREY7OztBQUdOLGFBQU9BLGlCQUFQO0FBQ0Q7OztrQ0FFYTtBQUNOLGtCQUFRLEtBQUs0QixRQUFMLEVBQVI7QUFBQSxVQUNFRSxTQURGLEdBQ2dCRCxLQURoQixDQUNFQyxTQURGOzs7QUFHTixhQUFPQSxTQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQU1BLFlBQVksS0FBbEI7O0FBRUEsVUFBSUQsUUFBUSxLQUFLRCxRQUFMLEVBQVo7O0FBRUFDLGNBQVFFLE9BQU9DLE1BQVAsQ0FBY0gsS0FBZCxFQUFxQjtBQUMzQkMsbUJBQVdBO0FBRGdCLE9BQXJCLENBQVI7O0FBSUEsV0FBS0csUUFBTCxDQUFjSixLQUFkO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQU1DLFlBQVksSUFBbEI7O0FBRUEsVUFBSUQsUUFBUSxLQUFLRCxRQUFMLEVBQVo7O0FBRUFDLGNBQVFFLE9BQU9DLE1BQVAsQ0FBY0gsS0FBZCxFQUFxQjtBQUMzQkMsbUJBQVdBO0FBRGdCLE9BQXJCLENBQVI7O0FBSUEsV0FBS0csUUFBTCxDQUFjSixLQUFkO0FBQ0Q7OzsrQkFFVWxDLE8sRUFBUztBQUNsQixVQUFNeUIsUUFBUXpCLE9BQWQ7QUFBQSxVQUF3QjtBQUNsQkksd0JBQWtCSixPQUR4QixDQURrQixDQUVnQjs7QUFFbEMsV0FBS3VDLFFBQUwsQ0FBY2QsS0FBZDs7QUFFQSxXQUFLbkIsa0JBQUwsQ0FBd0JGLGVBQXhCO0FBQ0Q7OztpQ0FFWUYsUyxFQUFXO0FBQ3RCLFVBQU1zQyx5QkFBeUJ0QyxVQUFVdUMsZ0JBQVYsRUFBL0I7QUFBQSxVQUNNQyx1QkFBdUJ4QyxVQUFVeUMsY0FBVixFQUQ3QjtBQUFBLFVBRU1oQixpQkFBaUJhLHNCQUZ2QjtBQUFBLFVBRWdEO0FBQzFDWCxxQkFBZWEsb0JBSHJCO0FBQUEsVUFHNEM7QUFDdENyQywwQkFBb0JILFNBSjFCLENBRHNCLENBS2dCOztBQUV0QyxXQUFLMEMsaUJBQUwsQ0FBdUJqQixjQUF2QjtBQUNBLFdBQUtrQixlQUFMLENBQXFCaEIsWUFBckI7O0FBRUEsV0FBS3RCLG9CQUFMLENBQTBCRixpQkFBMUI7QUFDRDs7O3VDQUVrQkQsZSxFQUFpQjtBQUNsQyxVQUFJOEIsUUFBUSxLQUFLRCxRQUFMLEVBQVo7O0FBRUFDLGNBQVFFLE9BQU9DLE1BQVAsQ0FBY0gsS0FBZCxFQUFxQjtBQUMzQjlCLHlCQUFpQkE7QUFEVSxPQUFyQixDQUFSOztBQUlBLFdBQUtrQyxRQUFMLENBQWNKLEtBQWQ7QUFDRDs7O3lDQUVvQjdCLGlCLEVBQW1CO0FBQ3RDLFVBQUk2QixRQUFRLEtBQUtELFFBQUwsRUFBWjs7QUFFQUMsY0FBUUUsT0FBT0MsTUFBUCxDQUFjSCxLQUFkLEVBQXFCO0FBQzNCN0IsMkJBQW1CQTtBQURRLE9BQXJCLENBQVI7O0FBSUEsV0FBS2lDLFFBQUwsQ0FBY0osS0FBZDtBQUNEOzs7cUNBRWdCO0FBQ2YsV0FBS1ksVUFBTDtBQUNEOzs7dUNBRWtCO0FBQ2pCLFdBQUt0QyxZQUFMO0FBQ0Q7Ozt1Q0FFa0I7QUFDakIsVUFBTTJCLFlBQVksS0FBS1ksV0FBTCxFQUFsQjs7QUFFQSxVQUFJWixTQUFKLEVBQWU7QUFDYixhQUFLYSxxQkFBTDtBQUNEO0FBQ0Y7OztxQ0FFZ0I7QUFDZjVELFlBQU0sWUFBVztBQUNmLGFBQUs0RCxxQkFBTDtBQUNELE9BRkssQ0FFSi9CLElBRkksQ0FFQyxJQUZELENBQU47QUFHRDs7O21DQUVjO0FBQ2IsVUFBTU0sU0FBUyxLQUFLMEIsUUFBTCxFQUFmOztBQUVBLFVBQUkxQixNQUFKLEVBQVk7QUFDVixhQUFLeUIscUJBQUw7QUFDRDtBQUNGOzs7NENBRXVCO0FBQ3RCLFVBQU16QixTQUFTLEtBQUswQixRQUFMLEVBQWY7O0FBRUEsVUFBSTFCLE1BQUosRUFBWTtBQUNWLFlBQU12QixVQUFVLEtBQUtDLFVBQUwsRUFBaEI7QUFBQSxZQUNNQyxZQUFZLEtBQUtDLFlBQUwsRUFEbEI7O0FBR0EsWUFBSUMsa0JBQWtCLEtBQUs4QyxrQkFBTCxFQUF0QjtBQUFBLFlBQ0k3QyxvQkFBb0IsS0FBSzhDLG9CQUFMLEVBRHhCOztBQUdBLFlBQU1DLG9DQUFxQ3BELFlBQVlJLGVBQXZEO0FBQUEsWUFDTWlELHdDQUF3Q25ELFVBQVVvRCxhQUFWLENBQXdCakQsaUJBQXhCLENBRDlDO0FBQUEsWUFFTWtELGlCQUFpQkgsaUNBRnZCO0FBQUEsWUFFMEQ7QUFDcERJLDJCQUFtQkgscUNBSHpCO0FBQUEsWUFHZ0U7QUFDMURJLGtCQUFVRixrQkFBa0JDLGdCQUpsQzs7QUFNQSxZQUFJQyxPQUFKLEVBQWE7QUFDWCxjQUFNQyxnQkFBZ0IsSUFBdEIsQ0FEVyxDQUNpQjs7QUFFNUIsZUFBSzlELGFBQUwsQ0FBbUJJLE9BQW5CLEVBQTRCRSxTQUE1QixFQUF1Q3FELGNBQXZDLEVBQXVEQyxnQkFBdkQsRUFBeUVFLGFBQXpFO0FBQ0Q7O0FBRUR0RCwwQkFBa0JKLE9BQWxCLENBbkJVLENBbUJrQjtBQUM1QkssNEJBQW9CSCxTQUFwQixDQXBCVSxDQW9Cc0I7O0FBRWhDLGFBQUtJLGtCQUFMLENBQXdCRixlQUF4QjtBQUNBLGFBQUtHLG9CQUFMLENBQTBCRixpQkFBMUI7QUFDRDtBQUNGOzs7bUNBRXFCc0QsVSxFQUFZO0FBQUEsVUFDeEJDLFFBRHdCLEdBQ01ELFVBRE4sQ0FDeEJDLFFBRHdCO0FBQUEsVUFDZEMsT0FEYyxHQUNNRixVQUROLENBQ2RFLE9BRGM7QUFBQSxVQUNMQyxNQURLLEdBQ01ILFVBRE4sQ0FDTEcsTUFESztBQUFBLFVBQzBCakUsYUFEMUIsR0FDMEMrRCxRQUQxQztBQUFBLFVBRTFCOUQsWUFGMEIsR0FFWCtELE9BRlc7QUFBQSxVQUcxQjlELFdBSDBCLEdBR1orRCxNQUhZLEVBR0o7O0FBRTVCLGFBQU9yRSxhQUFhc0UsY0FBYixDQUE0QnJFLFlBQTVCLEVBQTBDaUUsVUFBMUMsRUFBc0Q5RCxhQUF0RCxFQUFxRUMsWUFBckUsRUFBbUZDLFdBQW5GLENBQVA7QUFDRDs7OztFQTFQd0JOLFk7O0FBNlAzQjJDLE9BQU9DLE1BQVAsQ0FBYzNDLFlBQWQsRUFBNEI7QUFDMUJzRSxXQUFTLFVBRGlCO0FBRTFCQyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETSxHQUZPO0FBSzFCQyxxQkFBbUIsQ0FDakIsVUFEaUIsRUFFakIsU0FGaUIsRUFHakIsUUFIaUI7QUFMTyxDQUE1Qjs7QUFZQUMsT0FBT0MsT0FBUCxHQUFpQjNFLFlBQWpCOztBQUVBLFNBQVNzQix5QkFBVCxDQUFtQ25CLGFBQW5DLEVBQWtEO0FBQ2hELE1BQU0wQixTQUFTLEtBQUswQixRQUFMLEVBQWY7O0FBRUEsTUFBSTFCLE1BQUosRUFBWTtBQUNWLFFBQU0rQyxZQUFZLEtBQUtDLFlBQUwsRUFBbEI7QUFBQSxRQUNNQyxhQUFhLEtBQUtDLGFBQUwsRUFEbkI7QUFBQSxRQUVNQyxpQkFBaUI3RSxjQUFjeUUsU0FBZCxFQUF5QkUsVUFBekIsQ0FGdkI7O0FBSUEsV0FBT0UsY0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBU3hELHdCQUFULENBQWtDcEIsWUFBbEMsRUFBZ0Q7QUFDOUNWLFFBQU0sWUFBVztBQUNmLFFBQU1tQyxTQUFTLEtBQUswQixRQUFMLEVBQWY7O0FBRUEsUUFBSTFCLE1BQUosRUFBWTtBQUNWLFVBQU12QixVQUFVLEtBQUtDLFVBQUwsRUFBaEI7QUFBQSxVQUNNQyxZQUFZLEtBQUtDLFlBQUwsRUFEbEI7QUFBQSxVQUVNdUUsaUJBQWlCNUUsYUFBYUUsT0FBYixFQUFzQkUsU0FBdEIsQ0FGdkI7O0FBSUEsYUFBT3dFLGNBQVA7QUFDRDtBQUNGLEdBVkssQ0FVSnpELElBVkksQ0FVQyxJQVZELENBQU47QUFXRDs7QUFFRCxTQUFTRSx1QkFBVCxDQUFpQ3BCLFdBQWpDLEVBQThDO0FBQzVDLE1BQU13QixTQUFTLEtBQUswQixRQUFMLEVBQWY7O0FBRUEsTUFBSTFCLE1BQUosRUFBWTtBQUNWLFFBQU1tRCxpQkFBaUIzRSxhQUF2Qjs7QUFFQSxXQUFPMkUsY0FBUDtBQUNEO0FBQ0YiLCJmaWxlIjoicmljaFRleHRhcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxucmVxdWlyZSgnc2V0aW1tZWRpYXRlJyk7XHJcblxyXG5jb25zdCBkZWZlciA9IHNldEltbWVkaWF0ZTsgLy8vXHJcblxyXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xyXG5cclxuY29uc3QgU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZWxlY3Rpb24nKTtcclxuXHJcbmNvbnN0IHsgd2luZG93LCBJbnB1dEVsZW1lbnQgfSA9IGVhc3k7XHJcblxyXG5jbGFzcyBSaWNoVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICBzdXBlcihzZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKCk7XHJcblxyXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGNvbnRleHRtZW51IGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm9uKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIsIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9jdXNIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlciwgaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmJsdXJIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vbignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXIsIGludGVybWVkaWF0ZUJsdXJIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuc2V0TW91c2VEb3duKCk7XHJcblxyXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBjb250ZXh0bWVudSBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLm9mZignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlcik7XHJcblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2ZmKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZvY3VzSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2ZmKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ibHVySGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub2ZmKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBpc0FjdGl2ZSgpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCksXHJcbiAgICAgICAgICBjb250ZW50ID0gdmFsdWU7ICAvLy9cclxuXHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5nZXRTZWxlY3Rpb25TdGFydCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gdGhpcy5nZXRTZWxlY3Rpb25FbmQoKSxcclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHNlbGVjdGlvbkVuZCwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzQ29udGVudCB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzQ29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzU2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzU2VsZWN0aW9uIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBpc01vdXNlRG93bigpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBtb3VzZURvd24gfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBtb3VzZURvd247XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZVVwKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xyXG5cclxuICAgIHN0YXRlID0gT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xyXG4gICAgICBtb3VzZURvd246IG1vdXNlRG93blxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZURvd24oKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSB0cnVlO1xyXG5cclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcclxuXHJcbiAgICBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcclxuICAgICAgbW91c2VEb3duOiBtb3VzZURvd25cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29udGVudChjb250ZW50KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KHNlbGVjdGlvblN0YXJ0KTtcclxuICAgIHRoaXMuc2V0U2VsZWN0aW9uRW5kKHNlbGVjdGlvbkVuZCk7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XHJcbiAgICBsZXQgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XHJcblxyXG4gICAgc3RhdGUgPSBPYmplY3QuYXNzaWduKHN0YXRlLCB7XHJcbiAgICAgIHByZXZpb3VzQ29udGVudDogcHJldmlvdXNDb250ZW50XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzU2VsZWN0aW9uKHByZXZpb3VzU2VsZWN0aW9uKSB7XHJcbiAgICBsZXQgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XHJcblxyXG4gICAgc3RhdGUgPSBPYmplY3QuYXNzaWduKHN0YXRlLCB7XHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uOiBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIHRoaXMuc2V0TW91c2VVcCgpO1xyXG4gIH07XHJcblxyXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLnNldE1vdXNlRG93bigpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcigpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IHRoaXMuaXNNb3VzZURvd24oKTtcclxuXHJcbiAgICBpZiAobW91c2VEb3duKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBrZXlEb3duSGFuZGxlcigpIHtcclxuICAgIGRlZmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGlucHV0SGFuZGxlcigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NzaWJsZUNoYW5nZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gdGhpcy5nZXRQcmV2aW91c1NlbGVjdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyhwcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICAgIGNvbnRlbnRDaGFuZ2VkID0gY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50LCAvLy9cclxuICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24sIC8vL1xyXG4gICAgICAgICAgICBjaGFuZ2VkID0gY29udGVudENoYW5nZWQgfHwgc2VsZWN0aW9uQ2hhbmdlZDtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRoaXM7IC8vL1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uLCBjb250ZW50Q2hhbmdlZCwgc2VsZWN0aW9uQ2hhbmdlZCwgdGFyZ2V0RWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cclxuICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcclxuICAgIGNvbnN0IHsgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcywgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1cjsgLy8vXHJcblxyXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhSaWNoVGV4dGFyZWEsIHByb3BlcnRpZXMsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpO1xyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihSaWNoVGV4dGFyZWEsIHtcclxuICB0YWdOYW1lOiAndGV4dGFyZWEnLFxyXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XHJcbiAgICBjbGFzc05hbWU6ICdyaWNoJ1xyXG4gIH0sXHJcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcclxuICAgICdvblNjcm9sbCcsXHJcbiAgICAnb25Gb2N1cycsXHJcbiAgICAnb25CbHVyJ1xyXG4gIF1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0YXJlYTtcclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIoc2Nyb2xsSGFuZGxlcikge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5nZXRTY3JvbGxUb3AoKSxcclxuICAgICAgICAgIHNjcm9sbExlZnQgPSB0aGlzLmdldFNjcm9sbExlZnQoKSxcclxuICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gc2Nyb2xsSGFuZGxlcihzY3JvbGxUb3AsIHNjcm9sbExlZnQpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVybWVkaWF0ZUZvY3VzSGFuZGxlcihmb2N1c0hhbmRsZXIpIHtcclxuICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSBmb2N1c0hhbmRsZXIoY29udGVudCwgc2VsZWN0aW9uKTtcclxuXHJcbiAgICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICAgIH1cclxuICB9LmJpbmQodGhpcykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcm1lZGlhdGVCbHVySGFuZGxlcihibHVySGFuZGxlcikge1xyXG4gIGNvbnN0IGFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUoKTtcclxuXHJcbiAgaWYgKGFjdGl2ZSkge1xyXG4gICAgY29uc3QgcHJldmVudERlZmF1bHQgPSBibHVySGFuZGxlcigpO1xyXG5cclxuICAgIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcclxuICB9XHJcbn1cclxuIl19