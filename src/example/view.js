"use strict";

import RichTextarea from "./richTextarea";

const View = (properties) =>

  <div className="view">
    <RichTextarea onChange={changeHandler}
                  onScroll={scrollHandler}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                  active
    />
  </div>

;

export default View;

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
