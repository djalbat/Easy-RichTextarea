"use strict";

export default class Selection {
  constructor(startPosition, endPosition) {
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  getStartPosition() {
    return this.startPosition;
  }

  getEndPosition() {
    return this.endPosition;
  }

  setStartPosition(startPosition) {
    this.startPosition = startPosition;
  }

  setEndPosition(endPosition) {
    this.endPosition = endPosition;
  }

  isEqualTo(selection) {
    let equalTo = false;

    if (selection !== null) {
      const selectionStartPosition = selection.getStartPosition(),
            selectionEndPosition = selection.getEndPosition(),
            startPositionsEqual = (this.startPosition === selectionStartPosition),
            endPositionsEqual = (this.endPosition === selectionEndPosition);

      equalTo = (startPositionsEqual && endPositionsEqual);
    }

    return equalTo;
  }

  isDifferentTo(selection) {
    const equalTo = this.isEqualTo(selection),
          differentTo = !equalTo;

    return differentTo;
  }

  static fromNothing() {
    const startPosition = 0,
          endPosition = 0,
          selection = new Selection(startPosition, endPosition);

    return selection;
  }

  static fromDOMElement(domElement) {
    const { selectionStart, selectionEnd } = domElement,
          startPosition = selectionStart, ///
          endPosition = selectionEnd, ///
          selection = new Selection(startPosition, endPosition);

    return selection;

  }

  static fromStartPositionAndEndPosition(startPosition, endPosition) {
    const selection = new Selection(startPosition, endPosition);

    return selection;
  }
}
