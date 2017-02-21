'use strict';

require('setimmediate');

var defer = setImmediate, ///
    repeat = setInterval; ///

var easyui = require('easyui'),
    window = easyui.window,
    Element = easyui.Element,
    TextArea = easyui.TextArea;

const NAMESPACE = 'EasyUI_RichTextArea';

class RichTextArea extends TextArea {
  constructor(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
    super(selector);
    
    this.changeHandler = changeHandler;
    this.scrollHandler = scrollHandler;
    this.focusHandler = focusHandler;
    this.blurHandler = blurHandler;

    this.interval = null;

    this.previousContent = null;
    this.previousSelection = null;
  }

  clone(changeHandler, scrollHandler, focusHandler, blurHandler) { return RichTextArea.clone(this, changeHandler, scrollHandler, focusHandler, blurHandler); }

  isActive() {
    var active = this.hasClass('active');
    
    return active;
  }

  activate() {
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
  
  deactivate() {
    window.off('mouseup blur', NAMESPACE);

    this.offBlur(NAMESPACE);
    this.offFocus(NAMESPACE);
    this.offScroll(NAMESPACE);
    this.off('input', NAMESPACE);
    this.off('keydown', NAMESPACE);
    this.off('contextmenu', NAMESPACE);

    this.offMouseDown(NAMESPACE);

    this.removeClass('active');

    this.clearInterval();  ///
  }
  
  getContent() {
    var value = this.getValue(),
        content = value;  ///

    return content;
  }

  setContent(content) {
    var value = content;  ///

    this.setValue(value);
  }

  getSelection() {
    var selection = this.previousSelection, ///
        focus = this.hasFocus();

    if (focus) {
      var selectionStart = this.getSelectionStart(), ///
          selectionEnd = this.getSelectionEnd(), ///
          startPosition = selectionStart, ///
          endPosition = selectionEnd;

      selection = new Selection(startPosition, endPosition);
    }

    return selection;
  }

  setSelection(selection) {
    if (selection !== null) {
      var selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          selectionStart = selectionStartPosition,  ///
          selectionEnd = selectionEndPosition;  ///

      this.setSelectionStart(selectionStart);
      this.setSelectionEnd(selectionEnd);
    }
  }

  update() {
    var content = this.extendedEditableDocument.getContent(),
        selection = this.extendedEditableDocument.getSelection();

    this.setContent(content);
    this.setSelection(selection);

    this.previousContent = content; ///
    this.previousSelection = selection; ///
  }
  
  change(callback) {
    var content = this.getContent(),
        selection = this.getSelection(),
        contentChanged = (content !== this.previousContent),
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

  deferChange(callback) {
    defer(function() {
      this.change(callback);
    }.bind(this));
  }

  onFocus(focusHandler, namespace) {
    this.on('focus', function() {
      this.deferChange(function() {
        this.focusHandler();
      }.bind(this))
    }.bind(this), namespace);
  }

  onBlur(blurHandler, namespace) {
    this.on('blur', blurHandler, namespace);
  }

  offFocus(namespace) { this.off('focus', namespace); }

  offBlur(namespace) { this.off('blur', namespace); }

  inputHandler() {
    this.change();
  }

  keyDownHandler() {
    this.deferChange();
  }

  mouseDownHandler() {
    this.clearInterval();

    this.setInterval();

    this.deferChange();
  }

  contextMenuHandler() {
    this.clearInterval();
  }
  
  windowMouseUpHandler() {
    this.clearInterval();
  }

  setInterval() {
    var change = this.change.bind(this);

    this.interval = repeat(change, RICH_TEXT_AREA_CHANGE_REPEAT_INTERVAL);
  }

  clearInterval() {
    if (this.interval !== null) {
      clearInterval(this.interval);

      this.interval = null;
    }
  }

  static clone(selectorOrElement, changeHandler, scrollHandler, focusHandler, blurHandler) {
    return Element.clone(RichTextArea, selectorOrElement, changeHandler, scrollHandler, focusHandler, blurHandler);
  }
}

module.exports = RichTextArea;
