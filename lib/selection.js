"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var Selection1 = /*#__PURE__*/ function() {
    function Selection1(startPosition, endPosition) {
        _classCallCheck(this, Selection1);
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }
    _createClass(Selection1, [
        {
            key: "getStartPosition",
            value: function getStartPosition() {
                return this.startPosition;
            }
        },
        {
            key: "getEndPosition",
            value: function getEndPosition() {
                return this.endPosition;
            }
        },
        {
            key: "setStartPosition",
            value: function setStartPosition(startPosition) {
                this.startPosition = startPosition;
            }
        },
        {
            key: "setEndPosition",
            value: function setEndPosition(endPosition) {
                this.endPosition = endPosition;
            }
        },
        {
            key: "isEqualTo",
            value: function isEqualTo(selection) {
                var equalTo = false;
                if (selection !== null) {
                    var selectionStartPosition = selection.getStartPosition(), selectionEndPosition = selection.getEndPosition(), startPositionsEqual = this.startPosition === selectionStartPosition, endPositionsEqual = this.endPosition === selectionEndPosition;
                    equalTo = startPositionsEqual && endPositionsEqual;
                }
                return equalTo;
            }
        },
        {
            key: "isDifferentTo",
            value: function isDifferentTo(selection) {
                var equalTo = this.isEqualTo(selection), differentTo = !equalTo;
                return differentTo;
            }
        }
    ], [
        {
            key: "fromNothing",
            value: function fromNothing() {
                var startPosition = 0, endPosition = 0, selection = new Selection1(startPosition, endPosition);
                return selection;
            }
        },
        {
            key: "fromDOMElement",
            value: function fromDOMElement(domElement) {
                var selectionStart = domElement.selectionStart, selectionEnd = domElement.selectionEnd, startPosition = selectionStart, endPosition = selectionEnd, selection = new Selection1(startPosition, endPosition);
                return selection;
            }
        },
        {
            key: "fromStartPositionAndEndPosition",
            value: function fromStartPositionAndEndPosition(startPosition, endPosition) {
                var selection = new Selection1(startPosition, endPosition);
                return selection;
            }
        }
    ]);
    return Selection1;
}();
exports.default = Selection1;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxlY3Rpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSB7XG4gICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcbiAgICB0aGlzLmVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XG4gIH1cblxuICBnZXRTdGFydFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0UG9zaXRpb247XG4gIH1cblxuICBnZXRFbmRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbmRQb3NpdGlvbjtcbiAgfVxuXG4gIHNldFN0YXJ0UG9zaXRpb24oc3RhcnRQb3NpdGlvbikge1xuICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XG4gIH1cblxuICBzZXRFbmRQb3NpdGlvbihlbmRQb3NpdGlvbikge1xuICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcbiAgfVxuXG4gIGlzRXF1YWxUbyhzZWxlY3Rpb24pIHtcbiAgICBsZXQgZXF1YWxUbyA9IGZhbHNlO1xuXG4gICAgaWYgKHNlbGVjdGlvbiAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXG4gICAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxuICAgICAgICAgICAgc3RhcnRQb3NpdGlvbnNFcXVhbCA9ICh0aGlzLnN0YXJ0UG9zaXRpb24gPT09IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24pLFxuICAgICAgICAgICAgZW5kUG9zaXRpb25zRXF1YWwgPSAodGhpcy5lbmRQb3NpdGlvbiA9PT0gc2VsZWN0aW9uRW5kUG9zaXRpb24pO1xuXG4gICAgICBlcXVhbFRvID0gKHN0YXJ0UG9zaXRpb25zRXF1YWwgJiYgZW5kUG9zaXRpb25zRXF1YWwpO1xuICAgIH1cblxuICAgIHJldHVybiBlcXVhbFRvO1xuICB9XG5cbiAgaXNEaWZmZXJlbnRUbyhzZWxlY3Rpb24pIHtcbiAgICBjb25zdCBlcXVhbFRvID0gdGhpcy5pc0VxdWFsVG8oc2VsZWN0aW9uKSxcbiAgICAgICAgICBkaWZmZXJlbnRUbyA9ICFlcXVhbFRvO1xuXG4gICAgcmV0dXJuIGRpZmZlcmVudFRvO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHN0YXJ0UG9zaXRpb24gPSAwLFxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gMCxcbiAgICAgICAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcblxuICAgIHJldHVybiBzZWxlY3Rpb247XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCkge1xuICAgIGNvbnN0IHsgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCB9ID0gZG9tRWxlbWVudCxcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uU3RhcnQsIC8vL1xuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc2VsZWN0aW9uRW5kLCAvLy9cbiAgICAgICAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcblxuICAgIHJldHVybiBzZWxlY3Rpb247XG5cbiAgfVxuXG4gIHN0YXRpYyBmcm9tU3RhcnRQb3NpdGlvbkFuZEVuZFBvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uO1xuICB9XG59XG4i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