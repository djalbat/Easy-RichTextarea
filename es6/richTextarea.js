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

    this.changeHandler = changeHandler;
    this.scrollHandler = scrollHandler;
    this.focusHandler = focusHandler;
    this.blurHandler = blurHandler;

    const content = this.getContent(),
          selection = this.getSelection(),
          previousContent = content,  ///
          previousSelection = selection;  ///

    this.setPreviousContent(previousContent);
    this.setPreviousSelection(previousSelection);
  }

  activate() {
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

  deactivate() {
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

  isActive() {
    const active = this.hasClass('active');

    return active;
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
          endPosition = selectionEnd, ///
          selection = new Selection(startPosition, endPosition);

    return selection;
  }

  getPreviousContent() {
    const state = this.getState(),
          { previousContent } = state;

    return previousContent;
  }

  getPreviousSelection() {
    const state = this.getState(),
          { previousSelection } = state;

    return previousSelection;
  }

  isMouseDown() {
    const state = this.getState(),
          { mouseDown } = state;

    return mouseDown;
  }

  setMouseUp() {
    const mouseDown = false;

    let state = this.getState();

    state = Object.assign(state, {
      mouseDown: mouseDown
    });

    this.setState(state);
  }

  setMouseDown() {
    const mouseDown = true;

    let state = this.getState();

    state = Object.assign(state, {
      mouseDown: mouseDown
    });

    this.setState(state);
  }

  setContent(content) {
    const value = content,  ///
          previousContent = content;  ///

    this.setValue(value);

    this.setPreviousContent(previousContent);
  }

  setSelection(selection) {
    const selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          selectionStart = selectionStartPosition,  ///
          selectionEnd = selectionEndPosition,  ///
          previousSelection = selection;  ///

    this.setSelectionStart(selectionStart);
    this.setSelectionEnd(selectionEnd);

    this.setPreviousSelection(previousSelection);
  }

  setPreviousContent(previousContent) {
    let state = this.getState();

    state = Object.assign(state, {
      previousContent: previousContent
    });

    this.setState(state);
  }

  setPreviousSelection(previousSelection) {
    let state = this.getState();

    state = Object.assign(state, {
      previousSelection: previousSelection
    });

    this.setState(state);
  }

  mouseUpHandler() {
    this.setMouseUp();
  };

  mouseDownHandler() {
    this.setMouseDown();
  }

  mouseMoveHandler() {
    const mouseDown = this.isMouseDown();

    if (mouseDown) {
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
    const active = this.isActive();

    if (active) {
      const content = this.getContent(),
            selection = this.getSelection();

      let previousContent = this.getPreviousContent(),
          previousSelection = this.getPreviousSelection();

      const contentDifferentToPreviousContent = (content !== previousContent),
            selectionDifferentToPreviousSelection = selection.isDifferentTo(previousSelection),
            contentChanged = contentDifferentToPreviousContent, ///
            selectionChanged = selectionDifferentToPreviousSelection, ///
            changed = contentChanged || selectionChanged;

      if (changed) {
        const targetElement = this; ///

        this.changeHandler(content, selection, contentChanged, selectionChanged, targetElement);
      }

      previousContent = content;  ///
      previousSelection = selection;  ///

      this.setPreviousContent(previousContent);
      this.setPreviousSelection(previousSelection);
    }
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
