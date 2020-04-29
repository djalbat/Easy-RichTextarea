"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Selection = /*#__PURE__*/function () {
  function Selection(startPosition, endPosition) {
    _classCallCheck(this, Selection);

    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  _createClass(Selection, [{
    key: "getStartPosition",
    value: function getStartPosition() {
      return this.startPosition;
    }
  }, {
    key: "getEndPosition",
    value: function getEndPosition() {
      return this.endPosition;
    }
  }, {
    key: "setStartPosition",
    value: function setStartPosition(startPosition) {
      this.startPosition = startPosition;
    }
  }, {
    key: "setEndPosition",
    value: function setEndPosition(endPosition) {
      this.endPosition = endPosition;
    }
  }, {
    key: "isEqualTo",
    value: function isEqualTo(selection) {
      var equalTo = false;

      if (selection !== null) {
        var selectionStartPosition = selection.getStartPosition(),
            selectionEndPosition = selection.getEndPosition(),
            startPositionsEqual = this.startPosition === selectionStartPosition,
            endPositionsEqual = this.endPosition === selectionEndPosition;
        equalTo = startPositionsEqual && endPositionsEqual;
      }

      return equalTo;
    }
  }, {
    key: "isDifferentTo",
    value: function isDifferentTo(selection) {
      var equalTo = this.isEqualTo(selection),
          differentTo = !equalTo;
      return differentTo;
    }
  }], [{
    key: "fromStartPositionAndEndPosition",
    value: function fromStartPositionAndEndPosition(startPosition, endPosition) {
      var selection = new Selection(startPosition, endPosition);
      return selection;
    }
  }, {
    key: "fromNothing",
    value: function fromNothing() {
      var startPosition = 0,
          endPosition = 0,
          selection = new Selection(startPosition, endPosition);
      return selection;
    }
  }]);

  return Selection;
}();

module.exports = Selection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb24iLCJlcXVhbFRvIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwic3RhcnRQb3NpdGlvbnNFcXVhbCIsImVuZFBvc2l0aW9uc0VxdWFsIiwiaXNFcXVhbFRvIiwiZGlmZmVyZW50VG8iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7SUFFTUEsUztBQUNKLHFCQUFZQyxhQUFaLEVBQTJCQyxXQUEzQixFQUF3QztBQUFBOztBQUN0QyxTQUFLRCxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0Q7Ozs7dUNBRWtCO0FBQ2pCLGFBQU8sS0FBS0QsYUFBWjtBQUNEOzs7cUNBRWdCO0FBQ2YsYUFBTyxLQUFLQyxXQUFaO0FBQ0Q7OztxQ0FFZ0JELGEsRUFBZTtBQUM5QixXQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNEOzs7bUNBRWNDLFcsRUFBYTtBQUMxQixXQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNEOzs7OEJBRVNDLFMsRUFBVztBQUNuQixVQUFJQyxPQUFPLEdBQUcsS0FBZDs7QUFFQSxVQUFJRCxTQUFTLEtBQUssSUFBbEIsRUFBd0I7QUFDdEIsWUFBTUUsc0JBQXNCLEdBQUdGLFNBQVMsQ0FBQ0csZ0JBQVYsRUFBL0I7QUFBQSxZQUNNQyxvQkFBb0IsR0FBR0osU0FBUyxDQUFDSyxjQUFWLEVBRDdCO0FBQUEsWUFFTUMsbUJBQW1CLEdBQUksS0FBS1IsYUFBTCxLQUF1Qkksc0JBRnBEO0FBQUEsWUFHTUssaUJBQWlCLEdBQUksS0FBS1IsV0FBTCxLQUFxQkssb0JBSGhEO0FBS0FILFFBQUFBLE9BQU8sR0FBSUssbUJBQW1CLElBQUlDLGlCQUFsQztBQUNEOztBQUVELGFBQU9OLE9BQVA7QUFDRDs7O2tDQUVhRCxTLEVBQVc7QUFDdkIsVUFBTUMsT0FBTyxHQUFHLEtBQUtPLFNBQUwsQ0FBZVIsU0FBZixDQUFoQjtBQUFBLFVBQ01TLFdBQVcsR0FBRyxDQUFDUixPQURyQjtBQUdBLGFBQU9RLFdBQVA7QUFDRDs7O29EQUVzQ1gsYSxFQUFlQyxXLEVBQWE7QUFDakUsVUFBTUMsU0FBUyxHQUFHLElBQUlILFNBQUosQ0FBY0MsYUFBZCxFQUE2QkMsV0FBN0IsQ0FBbEI7QUFFQSxhQUFPQyxTQUFQO0FBQ0Q7OztrQ0FFb0I7QUFDbkIsVUFBTUYsYUFBYSxHQUFHLENBQXRCO0FBQUEsVUFDTUMsV0FBVyxHQUFHLENBRHBCO0FBQUEsVUFFTUMsU0FBUyxHQUFHLElBQUlILFNBQUosQ0FBY0MsYUFBZCxFQUE2QkMsV0FBN0IsQ0FGbEI7QUFJQSxhQUFPQyxTQUFQO0FBQ0Q7Ozs7OztBQUdIVSxNQUFNLENBQUNDLE9BQVAsR0FBaUJkLFNBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIFNlbGVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSB7XG4gICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcbiAgICB0aGlzLmVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XG4gIH1cblxuICBnZXRTdGFydFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0UG9zaXRpb247XG4gIH1cblxuICBnZXRFbmRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbmRQb3NpdGlvbjtcbiAgfVxuXG4gIHNldFN0YXJ0UG9zaXRpb24oc3RhcnRQb3NpdGlvbikge1xuICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XG4gIH1cblxuICBzZXRFbmRQb3NpdGlvbihlbmRQb3NpdGlvbikge1xuICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcbiAgfVxuXG4gIGlzRXF1YWxUbyhzZWxlY3Rpb24pIHtcbiAgICBsZXQgZXF1YWxUbyA9IGZhbHNlO1xuXG4gICAgaWYgKHNlbGVjdGlvbiAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXG4gICAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxuICAgICAgICAgICAgc3RhcnRQb3NpdGlvbnNFcXVhbCA9ICh0aGlzLnN0YXJ0UG9zaXRpb24gPT09IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24pLFxuICAgICAgICAgICAgZW5kUG9zaXRpb25zRXF1YWwgPSAodGhpcy5lbmRQb3NpdGlvbiA9PT0gc2VsZWN0aW9uRW5kUG9zaXRpb24pO1xuXG4gICAgICBlcXVhbFRvID0gKHN0YXJ0UG9zaXRpb25zRXF1YWwgJiYgZW5kUG9zaXRpb25zRXF1YWwpO1xuICAgIH1cblxuICAgIHJldHVybiBlcXVhbFRvO1xuICB9XG5cbiAgaXNEaWZmZXJlbnRUbyhzZWxlY3Rpb24pIHtcbiAgICBjb25zdCBlcXVhbFRvID0gdGhpcy5pc0VxdWFsVG8oc2VsZWN0aW9uKSxcbiAgICAgICAgICBkaWZmZXJlbnRUbyA9ICFlcXVhbFRvO1xuXG4gICAgcmV0dXJuIGRpZmZlcmVudFRvO1xuICB9XG5cbiAgc3RhdGljIGZyb21TdGFydFBvc2l0aW9uQW5kRW5kUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcblxuICAgIHJldHVybiBzZWxlY3Rpb247XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IDAsXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSAwLFxuICAgICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xuXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdGlvbjtcbiJdfQ==