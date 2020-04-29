"use strict";

import { Body, React } from "easy";

import { RichTextarea } from "./index";

Object.assign(window, {
  React
});

const body = new Body(),
      richTextarea =

        <RichTextarea onChange={changeHandler}
                      onScroll={scrollHandler}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
        />

;

richTextarea.activate();

body.prepend(richTextarea);

function changeHandler(event, element) {
  const contentChanged = element.hasContentChanged(),
        selectionChanged = element.hasSelectionChanged();

  console.log(contentChanged, selectionChanged)
}

function scrollHandler(event, element) {
  const scrollTop = element.getScrollTop(),
        scrollLeft = element.getScrollLeft();

  console.log(scrollTop, scrollLeft)
}

function focusHandler(event, element) {
  console.log("focus")
}

function blurHandler(event, element) {
  console.log("blur")
}
