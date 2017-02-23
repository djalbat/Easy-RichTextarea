'use strict';

require('setimmediate');

var defer = setImmediate; ///

var easyui = require('easyui'),
    window = easyui.window,
    Element = easyui.Element,
    TextArea = easyui.TextArea;

var Selection = require('./selection');

const NAMESPACE = 'EasyUI_RichTextArea';

class RichTextArea extends TextArea {
  constructor(selector, changeHandler = function() {}, scrollHandler = function() {}, focusHandler = function() {}, blurHandler = function() {}) {
    super(selector);
    
    this.changeHandler = changeHandler;
    this.scrollHandler = scrollHandler;
    this.focusHandler = focusHandler;
    this.blurHandler = blurHandler;

    var content = this.getContent(),
        selection = this.getSelection();

    this.previousContent = content; ///
    this.previousSelection = selection; ///

    this.mouseDown = undefined; ///
  }

  clone(changeHandler, scrollHandler, focusHandler, blurHandler) { return RichTextArea.clone(this, changeHandler, scrollHandler, focusHandler, blurHandler); }

  isActive() {
    var active = this.hasClass('active');
    
    return active;
  }

  activate() {
    this.mouseDown = false;

    window.on('mouseup contextmenu', function() {  ///
      this.mouseDown = false;
    }.bind(this), NAMESPACE);

    this.on('mousedown', function() {
      this.mouseDown = true;
    }.bind(this), NAMESPACE);

    this.onChange(this.changeHandler);
    this.onScroll(this.scrollHandler);
    this.onFocus(this.focusHandler);
    this.onBlur(this.blurHandler);

    this.addClass('active');
  }

  deactivate() {
    this.mouseDown = false;

    window.off('mouseup contextmenu blur', NAMESPACE);  ///

    this.off('mousedown', NAMESPACE);

    this.offChange();
    this.offScroll();
    this.offFocus();
    this.offBlur();

    this.removeClass('active');
  }

  getContent() {
    var value = this.getValue(),
        content = value;  ///

    return content;
  }

  getSelection() {
    var selectionStart = this.getSelectionStart(),
        selectionEnd = this.getSelectionEnd(),
        startPosition = selectionStart, ///
        endPosition = selectionEnd,
        selection = new Selection(startPosition, endPosition);

    return selection;
  }

  setContent(content) {
    var value = content;  ///

    this.setValue(value);

    this.previousContent = content; ///
  }

  setSelection(selection) {
    var selectionStartPosition = selection.getStartPosition(),
        selectionEndPosition = selection.getEndPosition(),
        selectionStart = selectionStartPosition,  ///
        selectionEnd = selectionEndPosition;  ///

    this.setSelectionStart(selectionStart);
    this.setSelectionEnd(selectionEnd);

    this.previousSelection = selection; ///
  }

  onChange(changeHandler) {
    this.onInput(changeHandler);
    this.onKeyDown(changeHandler);
    this.onMouseMove(changeHandler);
  }

  onScroll(scrollHandler) {
    super.onScroll(function(scrollTop, scrollLeft) {
      var active = this.isActive();

      if (active) {
        scrollHandler(scrollTop, scrollLeft);
      }
    }.bind(this), NAMESPACE);
  }

  onFocus(focusHandler) {
    this.on('focus', function() {
      defer(function() {
        var active = this.isActive();

        if (active) {
          var content = this.getContent(),
              selection = this.getSelection();

          focusHandler(content, selection);
        }
      }.bind(this));
    }.bind(this), NAMESPACE);
  }

  onBlur(blurHandler) {
    this.on('blur', function() {
      var active = this.isActive();

      if (active) {
        blurHandler();
      }
    }.bind(this), NAMESPACE);
  }

  onInput(changeHandler) {
    this.on('input', function() {
      var active = this.isActive();

      if (active) {
        this.possibleChangeHandler(changeHandler);
      }
    }.bind(this), NAMESPACE);
  }

  onKeyDown(changeHandler) {
    this.on('keydown', function() {
      defer(function() {
        var active = this.isActive();

        if (active) {
          this.possibleChangeHandler(changeHandler);
        }
      }.bind(this));
    }.bind(this), NAMESPACE);
  }

  onMouseMove(changeHandler) {
    super.onMouseMove(function() {
      var active = this.isActive();

      if (active) {
        if (this.mouseDown === true) {
          this.possibleChangeHandler(changeHandler);
        }
      }
    }.bind(this), NAMESPACE);
  }

  offChange() {
    this.offInput();
    this.offKeyDown();
    this.offMouseMove();
  }

  offScroll() {
    super.offScroll(NAMESPACE);
  }

  offFocus() {
    this.off('focus', NAMESPACE);
  }

  offBlur() {
    this.off('blur', NAMESPACE);
  }

  offInput() {
    this.off('input', NAMESPACE);
  }

  offKeyDown() {
    this.off('keydown', NAMESPACE);
  }

  offMouseMove() {
    super.offMouseMove(NAMESPACE);
  }

  possibleChangeHandler(changeHandler) {
    var content = this.getContent(),
        selection = this.getSelection(),
        contentDifferentToPreviousContent = (content !== this.previousContent),
        selectionDifferentToPreviousSelection = selection.isDifferentTo(this.previousSelection),
        contentChanged = contentDifferentToPreviousContent, ///
        selectionChanged = selectionDifferentToPreviousSelection, ///
        changed = contentChanged || selectionChanged;

    if (changed) {
      changeHandler(content, selection, contentChanged, selectionChanged);

      this.previousContent = content;
      this.previousSelection = selection;
    }
  }

  static clone(selectorOrElement, changeHandler, scrollHandler, focusHandler, blurHandler) {
    return Element.clone(RichTextArea, selectorOrElement, changeHandler, scrollHandler, focusHandler, blurHandler);
  }
}

module.exports = RichTextArea;
