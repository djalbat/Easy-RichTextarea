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
    const mouseDown = false;
    
    this.setMouseDown(mouseDown);

    window.on('mouseup contextmenu blur', this.mouseUpHandler, this); ///

    this.on('mousedown', this.mouseDownHandler, this);

    this.on('mousemove', this.mouseMoveHandler, this);

    this.on('keydown', this.keyDownHandler, this);

    this.on('input', this.inputHandler, this);

    this.scrollHandler && this.on('scroll', this.scrollHandler, this, intermediateScrollHandler);

    this.focusHandler && this.on('focus', this.focusHandler, this, intermediateFocusHandler);

    this.blurHandler && this.on('blur', this.blurHandler, this, intermediateBlurHandler);

    this.addClass('active');
  }

  deactivate() {
    const mouseDown = false;

    this.setMouseDown(mouseDown);

    window.off('mouseup contextmenu blur', this.mouseUpHandler, this);  ///

    this.off('mousedown', this.mouseDownHandler, this);

    this.off('mousemove', this.mouseMoveHandler, this);

    this.off('keydown', this.keyDownHandler, this);

    this.off('input', this.inputHandler, this);

    this.scrollHandler && this.off('scroll', this.scrollHandler, this);

    this.focusHandler && this.off('focus', this.focusHandler, this);

    this.blurHandler && this.off('blur', this.blurHandler, this);

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

    defer(() => this.intermediateHandler(this.changeHandler));
  }

  mouseMoveHandler() {
    const mouseDown = this.isMouseDown();

    if (mouseDown) {
      this.intermediateHandler(this.changeHandler);
    }
  }

  keyDownHandler() {
    defer(() => this.intermediateHandler(this.changeHandler));
  }

  inputHandler() {
    this.intermediateHandler(this.changeHandler);
  }

  intermediateHandler(handler, forced = false) {
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
        handler.call(this, content, selection, contentChanged, selectionChanged);
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

function intermediateScrollHandler(scrollHandler, event, element) {
  const active = element.isActive();

  if (active) {
    const scrollTop = element.getScrollTop(),
          scrollLeft = element.getScrollLeft();

    scrollHandler.call(element, scrollTop, scrollLeft, event);
  }
}

function intermediateFocusHandler(focusHandler, event, element) {
  defer(function() {
    const forced = true;

    element.intermediateHandler(focusHandler, forced);
  });
}

function intermediateBlurHandler(blurHandler, event, element) {
  const forced = true;

  element.intermediateHandler(blurHandler, forced);
}
