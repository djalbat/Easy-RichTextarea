'use strict';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb24iLCJlcXVhbFRvIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwic3RhcnRQb3NpdGlvbnNFcXVhbCIsImVuZFBvc2l0aW9uc0VxdWFsIiwiaXNFcXVhbFRvIiwiZGlmZmVyZW50VG8iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7SUFFTUEsUztBQUNKLHFCQUFZQyxhQUFaLEVBQTJCQyxXQUEzQixFQUF3QztBQUFBOztBQUN0QyxTQUFLRCxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0Q7Ozs7dUNBRWtCO0FBQ2pCLGFBQU8sS0FBS0QsYUFBWjtBQUNEOzs7cUNBRWdCO0FBQ2YsYUFBTyxLQUFLQyxXQUFaO0FBQ0Q7OztxQ0FFZ0JELGEsRUFBZTtBQUM5QixXQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNEOzs7bUNBRWNDLFcsRUFBYTtBQUMxQixXQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNEOzs7OEJBRVNDLFMsRUFBVztBQUNuQixVQUFJQyxPQUFPLEdBQUcsS0FBZDs7QUFFQSxVQUFJRCxTQUFTLEtBQUssSUFBbEIsRUFBd0I7QUFDdEIsWUFBTUUsc0JBQXNCLEdBQUdGLFNBQVMsQ0FBQ0csZ0JBQVYsRUFBL0I7QUFBQSxZQUNNQyxvQkFBb0IsR0FBR0osU0FBUyxDQUFDSyxjQUFWLEVBRDdCO0FBQUEsWUFFTUMsbUJBQW1CLEdBQUksS0FBS1IsYUFBTCxLQUF1Qkksc0JBRnBEO0FBQUEsWUFHTUssaUJBQWlCLEdBQUksS0FBS1IsV0FBTCxLQUFxQkssb0JBSGhEO0FBS0FILFFBQUFBLE9BQU8sR0FBSUssbUJBQW1CLElBQUlDLGlCQUFsQztBQUNEOztBQUVELGFBQU9OLE9BQVA7QUFDRDs7O2tDQUVhRCxTLEVBQVc7QUFDdkIsVUFBTUMsT0FBTyxHQUFHLEtBQUtPLFNBQUwsQ0FBZVIsU0FBZixDQUFoQjtBQUFBLFVBQ01TLFdBQVcsR0FBRyxDQUFDUixPQURyQjtBQUdBLGFBQU9RLFdBQVA7QUFDRDs7O29EQUVzQ1gsYSxFQUFlQyxXLEVBQWE7QUFDakUsVUFBTUMsU0FBUyxHQUFHLElBQUlILFNBQUosQ0FBY0MsYUFBZCxFQUE2QkMsV0FBN0IsQ0FBbEI7QUFFQSxhQUFPQyxTQUFQO0FBQ0Q7OztrQ0FFb0I7QUFDbkIsVUFBTUYsYUFBYSxHQUFHLENBQXRCO0FBQUEsVUFDTUMsV0FBVyxHQUFHLENBRHBCO0FBQUEsVUFFTUMsU0FBUyxHQUFHLElBQUlILFNBQUosQ0FBY0MsYUFBZCxFQUE2QkMsV0FBN0IsQ0FGbEI7QUFJQSxhQUFPQyxTQUFQO0FBQ0Q7Ozs7OztBQUdIVSxNQUFNLENBQUNDLE9BQVAsR0FBaUJkLFNBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBTZWxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbikge1xuICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XG4gICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0U3RhcnRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydFBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0RW5kUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5kUG9zaXRpb247XG4gIH1cblxuICBzZXRTdGFydFBvc2l0aW9uKHN0YXJ0UG9zaXRpb24pIHtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xuICB9XG5cbiAgc2V0RW5kUG9zaXRpb24oZW5kUG9zaXRpb24pIHtcbiAgICB0aGlzLmVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XG4gIH1cblxuICBpc0VxdWFsVG8oc2VsZWN0aW9uKSB7XG4gICAgbGV0IGVxdWFsVG8gPSBmYWxzZTtcblxuICAgIGlmIChzZWxlY3Rpb24gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxuICAgICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcbiAgICAgICAgICAgIHN0YXJ0UG9zaXRpb25zRXF1YWwgPSAodGhpcy5zdGFydFBvc2l0aW9uID09PSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uKSxcbiAgICAgICAgICAgIGVuZFBvc2l0aW9uc0VxdWFsID0gKHRoaXMuZW5kUG9zaXRpb24gPT09IHNlbGVjdGlvbkVuZFBvc2l0aW9uKTtcblxuICAgICAgZXF1YWxUbyA9IChzdGFydFBvc2l0aW9uc0VxdWFsICYmIGVuZFBvc2l0aW9uc0VxdWFsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXF1YWxUbztcbiAgfVxuXG4gIGlzRGlmZmVyZW50VG8oc2VsZWN0aW9uKSB7XG4gICAgY29uc3QgZXF1YWxUbyA9IHRoaXMuaXNFcXVhbFRvKHNlbGVjdGlvbiksXG4gICAgICAgICAgZGlmZmVyZW50VG8gPSAhZXF1YWxUbztcblxuICAgIHJldHVybiBkaWZmZXJlbnRUbztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU3RhcnRQb3NpdGlvbkFuZEVuZFBvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHN0YXJ0UG9zaXRpb24gPSAwLFxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gMCxcbiAgICAgICAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcblxuICAgIHJldHVybiBzZWxlY3Rpb247XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3Rpb247XG4iXX0=