'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('setimmediate');

var defer = setImmediate,
    ///
repeat = setInterval; ///

var easyui = require('easyui'),
    window = easyui.window,
    Element = easyui.Element,
    TextArea = easyui.TextArea;

var NAMESPACE = 'EasyUI_RichTextArea';

var RichTextArea = function (_TextArea) {
  _inherits(RichTextArea, _TextArea);

  function RichTextArea(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
    _classCallCheck(this, RichTextArea);

    var _this = _possibleConstructorReturn(this, (RichTextArea.__proto__ || Object.getPrototypeOf(RichTextArea)).call(this, selector));

    _this.changeHandler = changeHandler;
    _this.scrollHandler = scrollHandler;
    _this.focusHandler = focusHandler;
    _this.blurHandler = blurHandler;

    _this.interval = null;

    _this.previousContent = null;
    _this.previousSelection = null;
    return _this;
  }

  _createClass(RichTextArea, [{
    key: 'clone',
    value: function clone(changeHandler, scrollHandler, focusHandler, blurHandler) {
      return RichTextArea.clone(this, changeHandler, scrollHandler, focusHandler, blurHandler);
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
      window.on('mouseup blur', this.windowMouseUpHandler.bind(this), NAMESPACE); ///

      this.onBlur(this.blurHandler, NAMESPACE);
      this.onFocus(this.focusHandler, NAMESPACE);
      this.onScroll(this.scrollHandler, NAMESPACE);
      this.on('input', this.inputHandler.bind(this), NAMESPACE);
      this.on('keydown', this.keyDownHandler.bind(this), NAMESPACE);
      this.on('contextmenu', this.contextMenuHandler.bind(this), NAMESPACE);

      this.onMouseDown(this.mouseDownHandler.bind(this), NAMESPACE);

      this.addClass('active');
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      window.off('mouseup blur', NAMESPACE);

      this.offBlur(NAMESPACE);
      this.offFocus(NAMESPACE);
      this.offScroll(NAMESPACE);
      this.off('input', NAMESPACE);
      this.off('keydown', NAMESPACE);
      this.off('contextmenu', NAMESPACE);

      this.offMouseDown(NAMESPACE);

      this.removeClass('active');

      this.clearInterval(); ///
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      var value = this.getValue(),
          content = value; ///

      return content;
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      var value = content; ///

      this.setValue(value);
    }
  }, {
    key: 'getSelection',
    value: function getSelection() {
      var selection = this.previousSelection,
          ///
      focus = this.hasFocus();

      if (focus) {
        var selectionStart = this.getSelectionStart(),
            ///
        selectionEnd = this.getSelectionEnd(),
            ///
        startPosition = selectionStart,
            ///
        endPosition = selectionEnd;

        selection = new Selection(startPosition, endPosition);
      }

      return selection;
    }
  }, {
    key: 'setSelection',
    value: function setSelection(selection) {
      if (selection !== null) {
        var selectionStartPosition = selection.getStartPosition(),
            selectionEndPosition = selection.getEndPosition(),
            selectionStart = selectionStartPosition,
            ///
        selectionEnd = selectionEndPosition; ///

        this.setSelectionStart(selectionStart);
        this.setSelectionEnd(selectionEnd);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var content = this.extendedEditableDocument.getContent(),
          selection = this.extendedEditableDocument.getSelection();

      this.setContent(content);
      this.setSelection(selection);

      this.previousContent = content; ///
      this.previousSelection = selection; ///
    }
  }, {
    key: 'change',
    value: function change(callback) {
      var content = this.getContent(),
          selection = this.getSelection(),
          contentChanged = content !== this.previousContent,
          selectionChanged = !selection.isEqualTo(this.previousSelection),
          changed = contentChanged || selectionChanged;

      if (changed) {
        this.previousContent = content;
        this.previousSelection = selection;

        this.changeHandler(content, selection, contentChanged, selectionChanged);
      }

      if (callback) {
        callback();
      }
    }
  }, {
    key: 'deferChange',
    value: function deferChange(callback) {
      defer(function () {
        this.change(callback);
      }.bind(this));
    }
  }, {
    key: 'onFocus',
    value: function onFocus(focusHandler, namespace) {
      this.on('focus', function () {
        this.deferChange(function () {
          this.focusHandler();
        }.bind(this));
      }.bind(this), namespace);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(blurHandler, namespace) {
      this.on('blur', blurHandler, namespace);
    }
  }, {
    key: 'offFocus',
    value: function offFocus(namespace) {
      this.off('focus', namespace);
    }
  }, {
    key: 'offBlur',
    value: function offBlur(namespace) {
      this.off('blur', namespace);
    }
  }, {
    key: 'inputHandler',
    value: function inputHandler() {
      this.change();
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler() {
      this.deferChange();
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler() {
      this.clearInterval();

      this.setInterval();

      this.deferChange();
    }
  }, {
    key: 'contextMenuHandler',
    value: function contextMenuHandler() {
      this.clearInterval();
    }
  }, {
    key: 'windowMouseUpHandler',
    value: function windowMouseUpHandler() {
      this.clearInterval();
    }
  }, {
    key: 'setInterval',
    value: function setInterval() {
      var change = this.change.bind(this);

      this.interval = repeat(change, RICH_TEXT_AREA_CHANGE_REPEAT_INTERVAL);
    }
  }, {
    key: 'clearInterval',
    value: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      if (this.interval !== null) {
        clearInterval(this.interval);

        this.interval = null;
      }
    })
  }], [{
    key: 'clone',
    value: function clone(selectorOrElement, changeHandler, scrollHandler, focusHandler, blurHandler) {
      var richTextArea = Element.clone(RichTextArea, selectorOrElement, changeHandler, scrollHandler, focusHandler, blurHandler);

      richTextArea.removeAttribute('id');

      return richTextArea;
    }
  }]);

  return RichTextArea;
}(TextArea);

module.exports = RichTextArea;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9yaWNoVGV4dEFyZWEuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmVyIiwic2V0SW1tZWRpYXRlIiwicmVwZWF0Iiwic2V0SW50ZXJ2YWwiLCJlYXN5dWkiLCJ3aW5kb3ciLCJFbGVtZW50IiwiVGV4dEFyZWEiLCJOQU1FU1BBQ0UiLCJSaWNoVGV4dEFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzY3JvbGxIYW5kbGVyIiwiZm9jdXNIYW5kbGVyIiwiYmx1ckhhbmRsZXIiLCJpbnRlcnZhbCIsInByZXZpb3VzQ29udGVudCIsInByZXZpb3VzU2VsZWN0aW9uIiwiY2xvbmUiLCJhY3RpdmUiLCJoYXNDbGFzcyIsIm9uIiwid2luZG93TW91c2VVcEhhbmRsZXIiLCJiaW5kIiwib25CbHVyIiwib25Gb2N1cyIsIm9uU2Nyb2xsIiwiaW5wdXRIYW5kbGVyIiwia2V5RG93bkhhbmRsZXIiLCJjb250ZXh0TWVudUhhbmRsZXIiLCJvbk1vdXNlRG93biIsIm1vdXNlRG93bkhhbmRsZXIiLCJhZGRDbGFzcyIsIm9mZiIsIm9mZkJsdXIiLCJvZmZGb2N1cyIsIm9mZlNjcm9sbCIsIm9mZk1vdXNlRG93biIsInJlbW92ZUNsYXNzIiwiY2xlYXJJbnRlcnZhbCIsInZhbHVlIiwiZ2V0VmFsdWUiLCJjb250ZW50Iiwic2V0VmFsdWUiLCJzZWxlY3Rpb24iLCJmb2N1cyIsImhhc0ZvY3VzIiwic2VsZWN0aW9uU3RhcnQiLCJnZXRTZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsImdldFNlbGVjdGlvbkVuZCIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsIlNlbGVjdGlvbiIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsInNldFNlbGVjdGlvblN0YXJ0Iiwic2V0U2VsZWN0aW9uRW5kIiwiZXh0ZW5kZWRFZGl0YWJsZURvY3VtZW50IiwiZ2V0Q29udGVudCIsImdldFNlbGVjdGlvbiIsInNldENvbnRlbnQiLCJzZXRTZWxlY3Rpb24iLCJjYWxsYmFjayIsImNvbnRlbnRDaGFuZ2VkIiwic2VsZWN0aW9uQ2hhbmdlZCIsImlzRXF1YWxUbyIsImNoYW5nZWQiLCJjaGFuZ2UiLCJuYW1lc3BhY2UiLCJkZWZlckNoYW5nZSIsIlJJQ0hfVEVYVF9BUkVBX0NIQU5HRV9SRVBFQVRfSU5URVJWQUwiLCJzZWxlY3Rvck9yRWxlbWVudCIsInJpY2hUZXh0QXJlYSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUFBLFFBQVEsY0FBUjs7QUFFQSxJQUFJQyxRQUFRQyxZQUFaO0FBQUEsSUFBMEI7QUFDdEJDLFNBQVNDLFdBRGIsQyxDQUMwQjs7QUFFMUIsSUFBSUMsU0FBU0wsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJTSxTQUFTRCxPQUFPQyxNQURwQjtBQUFBLElBRUlDLFVBQVVGLE9BQU9FLE9BRnJCO0FBQUEsSUFHSUMsV0FBV0gsT0FBT0csUUFIdEI7O0FBS0EsSUFBTUMsWUFBWSxxQkFBbEI7O0lBRU1DLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQ0MsYUFBckMsRUFBb0RDLFlBQXBELEVBQWtFQyxXQUFsRSxFQUErRTtBQUFBOztBQUFBLDRIQUN2RUosUUFEdUU7O0FBRzdFLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7O0FBRUEsVUFBS0MsZUFBTCxHQUF1QixJQUF2QjtBQUNBLFVBQUtDLGlCQUFMLEdBQXlCLElBQXpCO0FBWDZFO0FBWTlFOzs7OzBCQUVLTixhLEVBQWVDLGEsRUFBZUMsWSxFQUFjQyxXLEVBQWE7QUFB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RUFBYTtBQUN2RixVQUFJNkQsZUFBZXJFLFFBQVFZLEtBQVIsQ0FBY1QsWUFBZCxFQUE0QmlFLGlCQUE1QixFQUErQy9ELGFBQS9DLEVBQThEQyxhQUE5RCxFQUE2RUMsWUFBN0UsRUFBMkZDLFdBQTNGLENBQW5COztBQUVBNkQsbUJBQWFDLGVBQWIsQ0FBNkIsSUFBN0I7O0FBRUEsYUFBT0QsWUFBUDtBQUNEOzs7O0VBaE13QnBFLFE7O0FBbU0zQnNFLE9BQU9DLE9BQVAsR0FBaUJyRSxZQUFqQiIsImZpbGUiOiJyaWNoVGV4dEFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdzZXRpbW1lZGlhdGUnKTtcclxuXHJcbnZhciBkZWZlciA9IHNldEltbWVkaWF0ZSwgLy8vXHJcbiAgICByZXBlYXQgPSBzZXRJbnRlcnZhbDsgLy8vXHJcblxyXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXHJcbiAgICB3aW5kb3cgPSBlYXN5dWkud2luZG93LFxyXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50LFxyXG4gICAgVGV4dEFyZWEgPSBlYXN5dWkuVGV4dEFyZWE7XHJcblxyXG5jb25zdCBOQU1FU1BBQ0UgPSAnRWFzeVVJX1JpY2hUZXh0QXJlYSc7XHJcblxyXG5jbGFzcyBSaWNoVGV4dEFyZWEgZXh0ZW5kcyBUZXh0QXJlYSB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuICAgIFxyXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7XHJcbiAgICB0aGlzLmZvY3VzSGFuZGxlciA9IGZvY3VzSGFuZGxlcjtcclxuICAgIHRoaXMuYmx1ckhhbmRsZXIgPSBibHVySGFuZGxlcjtcclxuXHJcbiAgICB0aGlzLmludGVydmFsID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnByZXZpb3VzQ29udGVudCA9IG51bGw7XHJcbiAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGNsb25lKGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHsgcmV0dXJuIFJpY2hUZXh0QXJlYS5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTsgfVxyXG5cclxuICBpc0FjdGl2ZSgpIHtcclxuICAgIHZhciBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGFjdGl2ZTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGJsdXInLCB0aGlzLndpbmRvd01vdXNlVXBIYW5kbGVyLmJpbmQodGhpcyksIE5BTUVTUEFDRSk7IC8vL1xyXG5cclxuICAgIHRoaXMub25CbHVyKHRoaXMuYmx1ckhhbmRsZXIsIE5BTUVTUEFDRSk7XHJcbiAgICB0aGlzLm9uRm9jdXModGhpcy5mb2N1c0hhbmRsZXIsIE5BTUVTUEFDRSk7XHJcbiAgICB0aGlzLm9uU2Nyb2xsKHRoaXMuc2Nyb2xsSGFuZGxlciwgTkFNRVNQQUNFKTtcclxuICAgIHRoaXMub24oJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcclxuICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyksIE5BTUVTUEFDRSk7XHJcbiAgICB0aGlzLm9uKCdjb250ZXh0bWVudScsIHRoaXMuY29udGV4dE1lbnVIYW5kbGVyLmJpbmQodGhpcyksIE5BTUVTUEFDRSk7XHJcblxyXG4gICAgdGhpcy5vbk1vdXNlRG93bih0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9XHJcbiAgXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgYmx1cicsIE5BTUVTUEFDRSk7XHJcblxyXG4gICAgdGhpcy5vZmZCbHVyKE5BTUVTUEFDRSk7XHJcbiAgICB0aGlzLm9mZkZvY3VzKE5BTUVTUEFDRSk7XHJcbiAgICB0aGlzLm9mZlNjcm9sbChOQU1FU1BBQ0UpO1xyXG4gICAgdGhpcy5vZmYoJ2lucHV0JywgTkFNRVNQQUNFKTtcclxuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgTkFNRVNQQUNFKTtcclxuICAgIHRoaXMub2ZmKCdjb250ZXh0bWVudScsIE5BTUVTUEFDRSk7XHJcblxyXG4gICAgdGhpcy5vZmZNb3VzZURvd24oTkFNRVNQQUNFKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICB0aGlzLmNsZWFySW50ZXJ2YWwoKTsgIC8vL1xyXG4gIH1cclxuICBcclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgdmFyIHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpLFxyXG4gICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgc2V0Q29udGVudChjb250ZW50KSB7XHJcbiAgICB2YXIgdmFsdWUgPSBjb250ZW50OyAgLy8vXHJcblxyXG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZWN0aW9uID0gdGhpcy5wcmV2aW91c1NlbGVjdGlvbiwgLy8vXHJcbiAgICAgICAgZm9jdXMgPSB0aGlzLmhhc0ZvY3VzKCk7XHJcblxyXG4gICAgaWYgKGZvY3VzKSB7XHJcbiAgICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IHRoaXMuZ2V0U2VsZWN0aW9uU3RhcnQoKSwgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSB0aGlzLmdldFNlbGVjdGlvbkVuZCgpLCAvLy9cclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHNlbGVjdGlvbkVuZDtcclxuXHJcbiAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBpZiAoc2VsZWN0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgIHZhciBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZFBvc2l0aW9uOyAgLy8vXHJcblxyXG4gICAgICB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KHNlbGVjdGlvblN0YXJ0KTtcclxuICAgICAgdGhpcy5zZXRTZWxlY3Rpb25FbmQoc2VsZWN0aW9uRW5kKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHZhciBjb250ZW50ID0gdGhpcy5leHRlbmRlZEVkaXRhYmxlRG9jdW1lbnQuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZXh0ZW5kZWRFZGl0YWJsZURvY3VtZW50LmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgIHRoaXMuc2V0Q29udGVudChjb250ZW50KTtcclxuICAgIHRoaXMuc2V0U2VsZWN0aW9uKHNlbGVjdGlvbik7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAvLy9cclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247IC8vL1xyXG4gIH1cclxuICBcclxuICBjaGFuZ2UoY2FsbGJhY2spIHtcclxuICAgIHZhciBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICBjb250ZW50Q2hhbmdlZCA9IChjb250ZW50ICE9PSB0aGlzLnByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9ICFzZWxlY3Rpb24uaXNFcXVhbFRvKHRoaXMucHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgIGNoYW5nZWQgPSBjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgIHRoaXMucHJldmlvdXNDb250ZW50ID0gY29udGVudDtcclxuICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcclxuXHJcbiAgICAgIHRoaXMuY2hhbmdlSGFuZGxlcihjb250ZW50LCBzZWxlY3Rpb24sIGNvbnRlbnRDaGFuZ2VkLCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgY2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlZmVyQ2hhbmdlKGNhbGxiYWNrKSB7XHJcbiAgICBkZWZlcihmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5jaGFuZ2UoY2FsbGJhY2spO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIG9uRm9jdXMoZm9jdXNIYW5kbGVyLCBuYW1lc3BhY2UpIHtcclxuICAgIHRoaXMub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuZGVmZXJDaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1c0hhbmRsZXIoKTtcclxuICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgfS5iaW5kKHRoaXMpLCBuYW1lc3BhY2UpO1xyXG4gIH1cclxuXHJcbiAgb25CbHVyKGJsdXJIYW5kbGVyLCBuYW1lc3BhY2UpIHtcclxuICAgIHRoaXMub24oJ2JsdXInLCBibHVySGFuZGxlciwgbmFtZXNwYWNlKTtcclxuICB9XHJcblxyXG4gIG9mZkZvY3VzKG5hbWVzcGFjZSkgeyB0aGlzLm9mZignZm9jdXMnLCBuYW1lc3BhY2UpOyB9XHJcblxyXG4gIG9mZkJsdXIobmFtZXNwYWNlKSB7IHRoaXMub2ZmKCdibHVyJywgbmFtZXNwYWNlKTsgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLmNoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAga2V5RG93bkhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLmRlZmVyQ2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBtb3VzZURvd25IYW5kbGVyKCkge1xyXG4gICAgdGhpcy5jbGVhckludGVydmFsKCk7XHJcblxyXG4gICAgdGhpcy5zZXRJbnRlcnZhbCgpO1xyXG5cclxuICAgIHRoaXMuZGVmZXJDaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIGNvbnRleHRNZW51SGFuZGxlcigpIHtcclxuICAgIHRoaXMuY2xlYXJJbnRlcnZhbCgpO1xyXG4gIH1cclxuICBcclxuICB3aW5kb3dNb3VzZVVwSGFuZGxlcigpIHtcclxuICAgIHRoaXMuY2xlYXJJbnRlcnZhbCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0SW50ZXJ2YWwoKSB7XHJcbiAgICB2YXIgY2hhbmdlID0gdGhpcy5jaGFuZ2UuYmluZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmludGVydmFsID0gcmVwZWF0KGNoYW5nZSwgUklDSF9URVhUX0FSRUFfQ0hBTkdFX1JFUEVBVF9JTlRFUlZBTCk7XHJcbiAgfVxyXG5cclxuICBjbGVhckludGVydmFsKCkge1xyXG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwgIT09IG51bGwpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuXHJcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yT3JFbGVtZW50LCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKSB7XHJcbiAgICB2YXIgcmljaFRleHRBcmVhID0gRWxlbWVudC5jbG9uZShSaWNoVGV4dEFyZWEsIHNlbGVjdG9yT3JFbGVtZW50LCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyLCBmb2N1c0hhbmRsZXIsIGJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICByaWNoVGV4dEFyZWEucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xyXG5cclxuICAgIHJldHVybiByaWNoVGV4dEFyZWE7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0QXJlYTtcclxuIl19