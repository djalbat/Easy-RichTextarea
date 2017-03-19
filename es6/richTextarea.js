'use strict';

require('setimmediate');

const defer = setImmediate; ///

const easyui = require('easyui'),
      window = easyui.window,
      Textarea = easyui.InputElement;

const Selection = require('./selection');

class RichTextarea extends Textarea {
  constructor(selector, changeHandler = function() {}, scrollHandler = function() {}, focusHandler = function() {}, blurHandler = function() {}) {
    super(selector);

    this.changeHandlers = [];

    this.onChange(changeHandler);

    scrollHandler.intermediateHandler = intermediateScrollHandler.bind(this);
    focusHandler.intermediateHandler = intermediateFocusHandler.bind(this);
    blurHandler.intermediateHandler = intermediateBlurHandler.bind(this);

    this.scrollHandler = scrollHandler;
    this.focusHandler = focusHandler;
    this.blurHandler = blurHandler;

    const content = this.getContent(),
          selection = this.getSelection();

    this.previousContent = content; ///
    this.previousSelection = selection; ///

    this.mouseDown = false;
  }

  clone(changeHandler, scrollHandler, focusHandler, blurHandler) { return RichTextarea.clone(this, changeHandler, scrollHandler, focusHandler, blurHandler); }

  isActive() {
    const active = this.hasClass('active');
    
    return active;
  }

  activate() {
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

  deactivate() {
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

  getContent() {
    const value = this.getValue(),
          content = value;  ///

    return content;
  }

  getSelection() {
    const selectionStart = this.getSelectionStart(),
          selectionEnd = this.getSelectionEnd(),
          startPosition = selectionStart, ///
          endPosition = selectionEnd,
          selection = new Selection(startPosition, endPosition);

    return selection;
  }

  setContent(content) {
    const value = content;  ///

    this.setValue(value);

    this.previousContent = content; ///
  }

  setSelection(selection) {
    const selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          selectionStart = selectionStartPosition,  ///
          selectionEnd = selectionEndPosition;  ///

    this.setSelectionStart(selectionStart);
    this.setSelectionEnd(selectionEnd);

    this.previousSelection = selection; ///
  }

  onChange(changeHandler) {
    this.changeHandlers.push(changeHandler);
  }

  offChange(changeHandler) {
    const index = this.changeHandlers.indexOf(changeHandler);

    if (index > -1) {
      const deleteCount = 1;

      this.changeHandlers.splice(index, deleteCount);
    }
  }

  mouseUpHandler() {
    this.mouseDown = false;
  };

  mouseMoveHandler() {
    const active = this.isActive();

    if (active) {
      if (this.mouseDown === true) {
        this.possibleChangeHandler();
      }
    }
  }

  mouseDownHandler() {
    this.mouseDown = true;
  }

  keyDownHandler() {
    defer(function() {
      const active = this.isActive();

      if (active) {
        this.possibleChangeHandler();
      }
    }.bind(this));
  }

  inputHandler() {
    const active = this.isActive();

    if (active) {
      this.possibleChangeHandler();
    }
  }

  possibleChangeHandler() {
    const content = this.getContent(),
          selection = this.getSelection(),
          contentDifferentToPreviousContent = (content !== this.previousContent),
          selectionDifferentToPreviousSelection = selection.isDifferentTo(this.previousSelection),
          contentChanged = contentDifferentToPreviousContent, ///
          selectionChanged = selectionDifferentToPreviousSelection, ///
          changed = contentChanged || selectionChanged;

    this.changeHandlers.forEach(function(changeHandler) {
      if (changed || changeHandler.regardless) {  ///
        changeHandler(content, selection, contentChanged, selectionChanged);
      }
    });

    this.previousContent = content;
    this.previousSelection = selection;
  }

  static clone(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
    return InputElement.clone(RichTextarea, selector, changeHandler, scrollHandler, focusHandler, blurHandler);
  }

  static fromProperties(properties) {
    const { onChange, onScroll, onFocus, onBlur } = properties,
        changeHandler = onChange, ///
        scrollHandler = onScroll, ///
        focusHandler = onFocus, ///
        blurHandler = onBlur; ///

    return InputElement.fromProperties(Textarea, properties, changeHandler, scrollHandler, focusHandler, blurHandler);
  }
}

Object.assign(RichTextarea, {
  tagName: 'textarea',
  ignoredProperties: [
    'onChange',
    'onScroll',
    'onFocus',
    'onBlur'
  ]
});

module.exports = RichTextarea;

function intermediateScrollHandler(scrollHandler, event) {
  const active = this.isActive();

  if (active) {
    const scrollTop = this.getScrollTop(),
          scrollLeft = this.getScrollLeft(),
          preventDefault = scrollHandler(scrollTop, scrollLeft);

    return preventDefault;
  }
}

function intermediateFocusHandler(focusHandler, event) {
  defer(function() {
    const active = this.isActive();

    if (active) {
      const content = this.getContent(),
            selection = this.getSelection(),
            preventDefault = focusHandler(content, selection);

      return preventDefault;
    }
  }.bind(this));
}

function intermediateBlurHandler(blurHandler, event) {
  const active = this.isActive();

  if (active) {
    const preventDefault = blurHandler();

    return preventDefault;
  }
}
