"use strict";

import withStyle from "easy-with-style";  ///

import { window, Element } from "easy";

import Selection from "./selection"

const defer = (func) => setTimeout(func, 0); ///

class RichTextarea extends Element {
  constructor(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
    super(selector);

    this.changeHandler = changeHandler;
    this.scrollHandler = scrollHandler;
    this.focusHandler = focusHandler;
    this.blurHandler = blurHandler;
  }

  activate() {
    const mouseDown = false;
    
    this.setMouseDown(mouseDown);

    window.on("mouseup contextmenu blur", this.mouseUpHandler, this); ///

    this.on("mousedown", this.mouseDownHandler, this);

    this.on("mousemove", this.mouseMoveHandler, this);

    this.on("keydown", this.keyDownHandler, this);

    this.on("input", this.inputHandler, this);

    this.scrollHandler && this.on("scroll", this.intermediateScrollHandler, this);

    this.focusHandler && this.on("focus", this.intermediateFocusHandler, this);

    this.blurHandler && this.on("blur", this.intermediateBlurHandler, this);

    this.addClass("active");
  }

  deactivate() {
    const mouseDown = false;

    this.setMouseDown(mouseDown);

    window.off("mouseup contextmenu blur", this.mouseUpHandler, this);  ///

    this.off("mousedown", this.mouseDownHandler, this);

    this.off("mousemove", this.mouseMoveHandler, this);

    this.off("keydown", this.keyDownHandler, this);

    this.off("input", this.inputHandler, this);

    this.scrollHandler && this.off("scroll", this.intermediateScrollHandler, this);

    this.focusHandler && this.off("focus", this.intermediateFocusHandler, this);

    this.blurHandler && this.off("blur", this.intermediateBlurHandler, this);

    this.removeClass("active");
  }

  isActive() {
    const active = this.hasClass("active");

    return active;
  }

  isReadOnly() {
    const domElement = this.getDOMElement(),
          { readOnly } = domElement;
    
    return readOnly; 
  }

  getContent() {
    const domElement = this.getDOMElement(),
          { value } = domElement,
          content = value;  ///

    return content;
  }

  getSelection() {
    const domElement = this.getDOMElement(),
          selection = Selection.fromDOMElement(domElement);

    return selection;
  }

  setReadOnly(readOnly) {
    const domElement = this.getDOMElement();

    Object.assign(domElement, {
      readOnly
    });
  }

  setContent(content) {
    const value = content,  ///
          previousContent = content,  ///
          domElement = this.getDOMElement();

    Object.assign(domElement, {
      value
    });

    this.setPreviousContent(previousContent);
  }

  setSelection(selection) {
    const selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          selectionStart = selectionStartPosition,  ///
          selectionEnd = selectionEndPosition,  ///
          previousSelection = selection,  ///
          domElement = this.getDOMElement();

    Object.assign(domElement, {
      selectionStart,
      selectionEnd
    });

    this.setPreviousSelection(previousSelection);
  }

  mouseUpHandler(event, element) {
    const mouseDown = false;

    this.setMouseDown(mouseDown);
  };

  mouseDownHandler(event, element) {
    const forced = false,
          mouseDown = true;

    this.setMouseDown(mouseDown);

    defer(() => this.intermediateHandler(event, element, this.changeHandler, forced));
  }

  mouseMoveHandler(event, element) {
    const forced = false,
          mouseDown = this.isMouseDown();

    if (mouseDown) {
      this.intermediateHandler(event, element, this.changeHandler, forced);
    }
  }

  keyDownHandler(event, element) {
    const forced = false;

    defer(() => this.intermediateHandler(event, element, this.changeHandler, forced));
  }

  inputHandler(event, element) {
    const forced = false;

    this.intermediateHandler(event, element, this.changeHandler, forced);
  }

  intermediateScrollHandler(event, element) {
    const active = element.isActive();

    if (active) {
      this.scrollHandler.call(element, event, element);
    }
  }

  intermediateFocusHandler(event, element) {
    const forced = true;

    defer(() => this.intermediateHandler(event, element, this.focusHandler, forced));
  }

  intermediateBlurHandler(event, element) {
    const forced = true;

    this.intermediateHandler(event, element, this.blurHandler, forced);
  }

  intermediateHandler(event, element, handler, forced) {
    const active = this.isActive();

    if (active) {
      const changed = this.hasChanged();

      if (changed || forced) {
        handler.call(element, event, element);
      }

      const content = this.getContent(),
            selection = this.getSelection(),
            previousContent = content,  ///
            previousSelection = selection;  ///

      this.setPreviousContent(previousContent);
      this.setPreviousSelection(previousSelection);
    }
  }

  isMouseDown() {
    const state = this.getState(),
          { mouseDown } = state;

    return mouseDown;
  }

  hasChanged() {
    const contentChanged = this.hasContentChanged(),
          selectionChanged = this.hasSelectionChanged(),
          changed = (contentChanged || selectionChanged);

    return changed;
  }

  hasContentChanged() {
    const content = this.getContent(),
          previousContent = this.getPreviousContent(),
          contentDifferentToPreviousContent = (content !== previousContent),
          contentChanged = contentDifferentToPreviousContent; ///

    return contentChanged;
  }

  hasSelectionChanged() {
    const selection = this.getSelection(),
          previousSelection = this.getPreviousSelection(),
          selectionDifferentToPreviousSelection = selection.isDifferentTo(previousSelection),
          selectionChanged = selectionDifferentToPreviousSelection; ///

    return selectionChanged;
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

  setMouseDown(mouseDown) {
    this.updateState({
      mouseDown
    });
  }

  setPreviousContent(previousContent) {
    this.updateState({
      previousContent
    });
  }

  setPreviousSelection(previousSelection) {
    this.updateState({
      previousSelection
    });
  }

  setInitialState() {
    const mouseDown = false,
          previousContent = null,
          previousSelection = null;

    this.setState({
      mouseDown,
      previousContent,
      previousSelection
    });
  }

  initialise(properties) {
    const { active } =  properties;

    this.setInitialState();

    if (active) {
      this.activate();
    }
  }

  static tagName = "textarea";

  static defaultProperties = {
    className: "rich"
  };

  static ignoredProperties = [
    "onChange",
    "onScroll",
    "onFocus",
    "onBlur",
    "active"
  ];

  static fromClass(Class, properties) {
    const { onChange, onScroll, onFocus, onBlur } = properties,
          changeHandler = onChange, ///
          scrollHandler = onScroll, ///
          focusHandler = onFocus, ///
          blurHandler = onBlur, ///
          richTextarea = Element.fromClass(Class, properties, changeHandler, scrollHandler, focusHandler, blurHandler);

    richTextarea.initialise(properties);

    return richTextarea;
  }
}

export default RichTextarea;

// export default withStyle(RichTextarea)`
//
//   display: none;
//
//   .active {
//     display: block;
//   }
//
// `
