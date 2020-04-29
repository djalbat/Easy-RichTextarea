"use strict";

import { Body, React } from "easy";

import { RichTextarea } from "../index";

Object.assign(window, {
  React
});

const body = new Body();

body.prepend(

  <RichTextarea/>

);
