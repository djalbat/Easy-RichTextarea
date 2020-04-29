"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = Selection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb24iLCJlcXVhbFRvIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwic3RhcnRQb3NpdGlvbnNFcXVhbCIsImVuZFBvc2l0aW9uc0VxdWFsIiwiaXNFcXVhbFRvIiwiZGlmZmVyZW50VG8iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0lBRXFCQSxTO0FBQ25CLHFCQUFZQyxhQUFaLEVBQTJCQyxXQUEzQixFQUF3QztBQUFBOztBQUN0QyxTQUFLRCxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0Q7Ozs7dUNBRWtCO0FBQ2pCLGFBQU8sS0FBS0QsYUFBWjtBQUNEOzs7cUNBRWdCO0FBQ2YsYUFBTyxLQUFLQyxXQUFaO0FBQ0Q7OztxQ0FFZ0JELGEsRUFBZTtBQUM5QixXQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNEOzs7bUNBRWNDLFcsRUFBYTtBQUMxQixXQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNEOzs7OEJBRVNDLFMsRUFBVztBQUNuQixVQUFJQyxPQUFPLEdBQUcsS0FBZDs7QUFFQSxVQUFJRCxTQUFTLEtBQUssSUFBbEIsRUFBd0I7QUFDdEIsWUFBTUUsc0JBQXNCLEdBQUdGLFNBQVMsQ0FBQ0csZ0JBQVYsRUFBL0I7QUFBQSxZQUNNQyxvQkFBb0IsR0FBR0osU0FBUyxDQUFDSyxjQUFWLEVBRDdCO0FBQUEsWUFFTUMsbUJBQW1CLEdBQUksS0FBS1IsYUFBTCxLQUF1Qkksc0JBRnBEO0FBQUEsWUFHTUssaUJBQWlCLEdBQUksS0FBS1IsV0FBTCxLQUFxQkssb0JBSGhEO0FBS0FILFFBQUFBLE9BQU8sR0FBSUssbUJBQW1CLElBQUlDLGlCQUFsQztBQUNEOztBQUVELGFBQU9OLE9BQVA7QUFDRDs7O2tDQUVhRCxTLEVBQVc7QUFDdkIsVUFBTUMsT0FBTyxHQUFHLEtBQUtPLFNBQUwsQ0FBZVIsU0FBZixDQUFoQjtBQUFBLFVBQ01TLFdBQVcsR0FBRyxDQUFDUixPQURyQjtBQUdBLGFBQU9RLFdBQVA7QUFDRDs7O29EQUVzQ1gsYSxFQUFlQyxXLEVBQWE7QUFDakUsVUFBTUMsU0FBUyxHQUFHLElBQUlILFNBQUosQ0FBY0MsYUFBZCxFQUE2QkMsV0FBN0IsQ0FBbEI7QUFFQSxhQUFPQyxTQUFQO0FBQ0Q7OztrQ0FFb0I7QUFDbkIsVUFBTUYsYUFBYSxHQUFHLENBQXRCO0FBQUEsVUFDTUMsV0FBVyxHQUFHLENBRHBCO0FBQUEsVUFFTUMsU0FBUyxHQUFHLElBQUlILFNBQUosQ0FBY0MsYUFBZCxFQUE2QkMsV0FBN0IsQ0FGbEI7QUFJQSxhQUFPQyxTQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0aW9uIHtcbiAgY29uc3RydWN0b3Ioc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pIHtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xuICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcbiAgfVxuXG4gIGdldFN0YXJ0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnRQb3NpdGlvbjtcbiAgfVxuXG4gIGdldEVuZFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVuZFBvc2l0aW9uO1xuICB9XG5cbiAgc2V0U3RhcnRQb3NpdGlvbihzdGFydFBvc2l0aW9uKSB7XG4gICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcbiAgfVxuXG4gIHNldEVuZFBvc2l0aW9uKGVuZFBvc2l0aW9uKSB7XG4gICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xuICB9XG5cbiAgaXNFcXVhbFRvKHNlbGVjdGlvbikge1xuICAgIGxldCBlcXVhbFRvID0gZmFsc2U7XG5cbiAgICBpZiAoc2VsZWN0aW9uICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcbiAgICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXG4gICAgICAgICAgICBzdGFydFBvc2l0aW9uc0VxdWFsID0gKHRoaXMuc3RhcnRQb3NpdGlvbiA9PT0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiksXG4gICAgICAgICAgICBlbmRQb3NpdGlvbnNFcXVhbCA9ICh0aGlzLmVuZFBvc2l0aW9uID09PSBzZWxlY3Rpb25FbmRQb3NpdGlvbik7XG5cbiAgICAgIGVxdWFsVG8gPSAoc3RhcnRQb3NpdGlvbnNFcXVhbCAmJiBlbmRQb3NpdGlvbnNFcXVhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVxdWFsVG87XG4gIH1cblxuICBpc0RpZmZlcmVudFRvKHNlbGVjdGlvbikge1xuICAgIGNvbnN0IGVxdWFsVG8gPSB0aGlzLmlzRXF1YWxUbyhzZWxlY3Rpb24pLFxuICAgICAgICAgIGRpZmZlcmVudFRvID0gIWVxdWFsVG87XG5cbiAgICByZXR1cm4gZGlmZmVyZW50VG87XG4gIH1cblxuICBzdGF0aWMgZnJvbVN0YXJ0UG9zaXRpb25BbmRFbmRQb3NpdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbikge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xuXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBzdGFydFBvc2l0aW9uID0gMCxcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IDAsXG4gICAgICAgICAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uO1xuICB9XG59XG4iXX0=