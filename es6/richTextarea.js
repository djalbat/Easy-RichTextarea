'use strict';

require('setimmediate');

const defer = setImmediate; ///

const easy = require('easy'),
      window = easy.window,
      InputElement = easy.InputElement;

const Selection = require('./selection');

class RichTextarea extends InputElement {
  constructor(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
    super(selector);

    this.changeHandlers = [];

    if (changeHandler !== undefined) {
      this.onChange(changeHandler);
    }

    this.scrollHandler = scrollHandler;
    this.focusHandler = focusHandler;
    this.blurHandler = blurHandler;

    const content = this.getContent(),
          selection = this.getSelection();

    this.previousContent = content; ///
    this.previousSelection = selection; ///

    this.mouseDown = false;
  }

  activate() {
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

  deactivate() {
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

  isActive() {
    const active = this.hasClass('active');

    return active;
  }

  getContent() {
    const value = this.domElement.value,
          content = value;  ///

    return content;
  }

  getSelection() {
    const selectionStart = this.domElement.selectionStart,
          selectionEnd = this.domElement.selectionEnd,
          startPosition = selectionStart, ///
          endPosition = selectionEnd, ///
          selection = new Selection(startPosition, endPosition);

    return selection;
  }

  setContent(content) {
    const value = content;  ///

    this.domElement.value = value;

    this.previousContent = content; ///
  }

  setSelection(selection) {
    const selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          selectionStart = selectionStartPosition,  ///
          selectionEnd = selectionEndPosition;  ///

    this.domElement.selectionStart = selectionStart;
    this.domElement.selectionEnd = selectionEnd;

    this.previousSelection = selection; ///
  }

  onChange(changeHandler, regardless = false) {
    Object.assign({
      regardless: regardless
    });

    this.changeHandlers.push(changeHandler);
  }

  offChange(changeHandler) {
    const index = this.changeHandlers.indexOf(changeHandler);

    if (index > -1) {
      const deleteCount = 1;

      this.changeHandlers.splice(index, deleteCount);
    }
  }

  onResize(resizeHandler) {}

  offResize(resizeHandler) {}

  mouseUpHandler() {
    this.mouseDown = false;
  };

  mouseDownHandler() {
    this.mouseDown = true;
  }

  mouseMoveHandler() {
    if (this.mouseDown) {
      this.possibleChangeHandler();
    }
  }

  keyDownHandler() {
    defer(function() {
      this.possibleChangeHandler();
    }.bind(this));
  }

  inputHandler() {
    const active = this.isActive();

    if (active) {
      this.possibleChangeHandler();
    }
  }

  possibleChangeHandler() {
    const active = this.isActive(),
          content = this.getContent(),
          selection = this.getSelection(),
          contentDifferentToPreviousContent = (content !== this.previousContent),
          selectionDifferentToPreviousSelection = selection.isDifferentTo(this.previousSelection),
          contentChanged = contentDifferentToPreviousContent, ///
          selectionChanged = selectionDifferentToPreviousSelection, ///
          changed = contentChanged || selectionChanged;

    if (changed) {
      this.changeHandlers.forEach(function(changeHandler) {
        if (active || changeHandler.regardless) {  ///
          changeHandler(content, selection, contentChanged, selectionChanged);
        }
      });
    }

    this.previousContent = content;
    this.previousSelection = selection;
  }

  static fromProperties(properties) {
    const { onChange, onScroll, onFocus, onBlur } = properties,
          changeHandler = onChange, ///
          scrollHandler = onScroll, ///
          focusHandler = onFocus, ///
          blurHandler = onBlur; ///

    return InputElement.fromProperties(RichTextarea, properties, changeHandler, scrollHandler, focusHandler, blurHandler);
  }
}

Object.assign(RichTextarea, {
  tagName: 'textarea',
  defaultProperties: {
    className: 'rich'
  },
  ignoredProperties: [
    'onChange',
    'onScroll',
    'onFocus',
    'onBlur'
  ]
});

module.exports = RichTextarea;

function intermediateScrollHandler(scrollHandler) {
  const active = this.isActive();

  if (active) {
    const scrollTop = this.getScrollTop(),
          scrollLeft = this.getScrollLeft(),
          preventDefault = scrollHandler(scrollTop, scrollLeft);

    return preventDefault;
  }
}

function intermediateFocusHandler(focusHandler) {
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

function intermediateBlurHandler(blurHandler) {
  const active = this.isActive();

  if (active) {
    const preventDefault = blurHandler();

    return preventDefault;
  }
}
