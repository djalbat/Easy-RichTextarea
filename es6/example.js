"use strict";

import { Body, React } from "easy";

import { RichTextarea } from "../index";

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
  debugger
}

function scrollHandler(event, element) {
  debugger
}

function focusHandler(event, element) {
  debugger
}

function blurHandler(event, element) {
  debugger
}
