"use strict";

import withStyle from "easy-with-style";  ///

import { window, Element } from "easy";

import Selection from "./selection"

import { BLUR,
         INPUT,
         FOCUS,
         CHANGE,
         SCROLL,
         KEYDOWN,
         MOUSEDOWN,
         MOUSEMOVE,
         MOUSEUP_CONTEXTMENU_BLUR } from "./constants";

const defer = (func) => setTimeout(func, 0); ///

class RichTextarea extends Element {
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

  activate() {
    const mouseDown = false;

    this.setMouseDown(mouseDown);

    window.on(MOUSEUP_CONTEXTMENU_BLUR, this.mouseUpHandler, this); ///

    this.on(MOUSEDOWN, this.mouseDownHandler, this);

    this.on(MOUSEMOVE, this.mouseMoveHandler, this);

    this.on(KEYDOWN, this.keyDownHandler, this);

    this.on(INPUT, this.inputHandler, this);

    this.on(SCROLL, this.scrollHandler, this);

    this.on(FOCUS, this.focusHandler, this);

    this.on(BLUR, this.blurHandler, this);

    this.addClass("active");
  }

  deactivate() {
    const mouseDown = false;

    this.setMouseDown(mouseDown);

    window.off(MOUSEUP_CONTEXTMENU_BLUR, this.mouseUpHandler, this);  ///

    this.off(MOUSEDOWN, this.mouseDownHandler, this);

    this.off(MOUSEMOVE, this.mouseMoveHandler, this);

    this.off(KEYDOWN, this.keyDownHandler, this);

    this.off(INPUT, this.inputHandler, this);

    this.off(SCROLL, this.scrollHandler, this);

    this.off(FOCUS, this.focusHandler, this);

    this.off(BLUR, this.blurHandler, this);

    this.removeClass("active");
  }

  onBlur(blurHandler, element) {
    const eventType = BLUR,
          handler = blurHandler;  ///

    this.addEventListener(eventType, handler, element);
  }

  offBlur(blurHandler, element) {
    const eventType = BLUR,
          handler = blurHandler;  ///

    this.removeEventListener(eventType, handler, element);
  }

  onFocus(blurHandler, element) {
    const eventType = FOCUS,
          handler = blurHandler;  ///

    this.addEventListener(eventType, handler, element);
  }

  offFocus(blurHandler, element) {
    const eventType = FOCUS,
          handler = blurHandler;  ///

    this.removeEventListener(eventType, handler, element);
  }

  onScroll(scrollHandler, element) {
    const eventType = SCROLL,
          handler = scrollHandler;  ///

    this.addEventListener(eventType, handler, element);
  }

  offScroll(scrollHandler, element) {
    const eventType = SCROLL,
          handler = scrollHandler;  ///

    this.removeEventListener(eventType, handler, element);
  }

  onChange(changeHandler, element) {
    const eventType = CHANGE,
          handler = changeHandler;  ///

    this.addEventListener(eventType, handler, element);
  }

  offChange(changeHandler, element) {
    const eventType = CHANGE,
          handler = changeHandler;  ///

    this.removeEventListener(eventType, handler, element);
  }

  mouseUpHandler(event, element) {
    const mouseDown = false;

    this.setMouseDown(mouseDown);
  };

  mouseDownHandler(event, element) {
    const forced = false,
          mouseDown = true,
          eventType = CHANGE;

    this.setMouseDown(mouseDown);

    defer(() => this.intermediateHandler(event, element, eventType, forced));
  }

  mouseMoveHandler(event, element) {
    const forced = false,
          mouseDown = this.isMouseDown(),
          eventTYpe = CHANGE;

    if (mouseDown) {
      this.intermediateHandler(event, element, eventTYpe, forced);
    }
  }

  keyDownHandler(event, element) {
    const forced = false,
          eventType = CHANGE;

    defer(() => this.intermediateHandler(event, element, eventType, forced));
  }

  inputHandler(event, element) {
    const forced = false,
          eventType = CHANGE;

    this.intermediateHandler(event, element, eventType, forced);
  }

  scrollHandler(event, element) {
    const eventType = SCROLL;

    this.callHandlers(eventType, event, element);
  }

  focusHandler(event, element) {
    const forced = true,
          eventType = FOCUS;

    defer(() => this.intermediateHandler(event, element, eventType, forced));
  }

  blurHandler(event, element) {
    const forced = true,
          eventType = BLUR;

    this.intermediateHandler(event, element, eventType, forced);
  }

  intermediateHandler(event, element, eventType, forced) {
    const changed = this.hasChanged();

    if (changed || forced) {
      this.callHandlers(eventType, event, element);
    }

    const content = this.getContent(),
          selection = this.getSelection(),
          previousContent = content,  ///
          previousSelection = selection;  ///

    this.setPreviousContent(previousContent);
    this.setPreviousSelection(previousSelection);
  }

  callHandlers(eventType, ...remainingArguments) {
    const eventListeners = this.findEventListeners(eventType);

    eventListeners.forEach((eventListener) => {
      const { handler, element } = eventListener;

      if ( (handler !== this.blurHandler) &&
           (handler !== this.focusHandler) &&
           (handler !== this.scrollHandler) ) {

        handler.call(element, ...remainingArguments);
      }
    });
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

  didMount() {
    const { active, onChange, onScroll, onFocus, onBlur } = this.properties,
            changeHandler = onChange, ///
            scrollHandler = onScroll, ///
            focusHandler = onFocus, ///
            blurHandler = onBlur; ///

    changeHandler && this.onChange(changeHandler, this);
    scrollHandler && this.onScroll(scrollHandler, this);
    focusHandler && this.onFocus(focusHandler, this);
    blurHandler && this.onBlur(blurHandler, this);

    if (active) {
      this.activate();
    }
  }

  willUnmount() {
    const { onChange, onScroll, onFocus, onBlur } = this.properties,
          changeHandler = onChange, ///
          scrollHandler = onScroll, ///
          focusHandler = onFocus, ///
          blurHandler = onBlur; ///

    changeHandler && this.offChange(changeHandler, this);
    scrollHandler && this.offScroll(scrollHandler, this);
    focusHandler && this.offFocus(focusHandler, this);
    blurHandler && this.offBlur(blurHandler, this);
  }

  initialise() {
    this.setInitialState();
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
}

export default withStyle(RichTextarea)`

  display: none;

  .active {
    display: block;
  }

`
