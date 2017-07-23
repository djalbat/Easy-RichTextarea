'use strict';

require('setimmediate');

const defer = setImmediate; ///

const easy = require('easy');

const Selection = require('./selection');

const { window, Element } = easy;

class RichTextarea extends Element {
  constructor(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
    super(selector);

    this.changeHandler = changeHandler;
    this.scrollHandler = scrollHandler;
    this.focusHandler = focusHandler;
    this.blurHandler = blurHandler;

    this.setInitialState();
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

  isReadOnly() {
    const domElement = this.getDOMElement(),
          readOnly = domElement.readOnly;
    
    return readOnly; 
  }

  getContent() {
    const domElement = this.getDOMElement(),
          value = domElement.value,
          content = value;  ///

    return content;
  }

  getSelection() {
    const domElement = this.getDOMElement(),
          selectionStart = domElement.selectionStart,
          selectionEnd = domElement.selectionEnd,
          startPosition = selectionStart, ///
          endPosition = selectionEnd, ///
          selection = new Selection(startPosition, endPosition);

    return selection;
  }

  setContent(content) {
    const value = content,  ///
          previousContent = content,  ///
          domElement = this.getDOMElement();

    domElement.value = value;

    this.setPreviousContent(previousContent);
  }

  setSelection(selection) {
    const selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          selectionStart = selectionStartPosition,  ///
          selectionEnd = selectionEndPosition,  ///
          previousSelection = selection,  ///
          domElement = this.getDOMElement();

    domElement.selectionStart = selectionStart;
    domElement.selectionEnd = selectionEnd;

    this.setPreviousSelection(previousSelection);
  }

  setReadOnly(readOnly) {
    const domElement = this.getDOMElement();
    
    domElement.readOnly = readOnly; 
  }

  mouseUpHandler() {
    const mouseDown = false;

    this.setMouseDown(mouseDown);
  };

  mouseDownHandler() {
    const mouseDown = true;

    this.setMouseDown(mouseDown);

    defer(function() {
      this.callHandler();
    }.bind(this));
  }

  mouseMoveHandler() {
    const mouseDown = this.isMouseDown();

    if (mouseDown) {
      this.callHandler();
    }
  }

  keyDownHandler() {
    defer(function() {
      this.callHandler();
    }.bind(this));
  }

  inputHandler() {
    this.callHandler();
  }

  callHandler(handler = this.changeHandler, forced = false) {
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

      if (changed || forced) {
        const targetElement = this; ///

        handler(content, selection, contentChanged, selectionChanged, targetElement);
      }

      previousContent = content;  ///
      previousSelection = selection;  ///

      this.setPreviousContent(previousContent);
      this.setPreviousSelection(previousSelection);
    }
  }

  isMouseDown() { return this.fromState('mouseDown'); }

  getPreviousContent() { return this.fromState('previousContent'); }

  getPreviousSelection() { return this.fromState('previousSelection'); }

  setMouseDown(mouseDown) {
    this.updateState({
      mouseDown: mouseDown
    });
  }

  setPreviousContent(previousContent) {
    this.updateState({
      previousContent: previousContent
    });
  }

  setPreviousSelection(previousSelection) {
    this.updateState({
      previousSelection: previousSelection
    });
  }

  setInitialState() {
    const mouseDown = false,
          previousContent = null,
          previousSelection = null;

    this.setState({
      mouseDown: mouseDown,
      previousContent: previousContent,
      previousSelection: previousSelection
    });
  }

  initialise() {
    const content = this.getContent(),
          selection = this.getSelection(),
          previousContent = content,  ///
          previousSelection = selection;  ///

    this.setPreviousContent(previousContent);
    this.setPreviousSelection(previousSelection);
  }

  static fromProperties(properties) {
    const { onChange, onScroll, onFocus, onBlur } = properties,
          changeHandler = onChange, ///
          scrollHandler = onScroll, ///
          focusHandler = onFocus, ///
          blurHandler = onBlur, ///
          richTextarea = Element.fromProperties(RichTextarea, properties, changeHandler, scrollHandler, focusHandler, blurHandler);

    richTextarea.initialise();

    return richTextarea;
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
          targetElement = this, ///
          preventDefault = scrollHandler(scrollTop, scrollLeft, targetElement);

    return preventDefault;
  }
}

function intermediateFocusHandler(focusHandler) {
  defer(function() {
    const forced = true;

    this.callHandler(focusHandler, forced);
  }.bind(this));
}

function intermediateBlurHandler(blurHandler) {
  const forced = true;

  this.callHandler(blurHandler, forced);
}
