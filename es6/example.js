"use strict";

import { Body, React } from "easy";

import View from "./example/view";

Object.assign(window, {
  React
});

const body = new Body();

body.prepend(

  <View />

);
