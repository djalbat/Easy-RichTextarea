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
    key: "fromNothing",
    value: function fromNothing() {
      var startPosition = 0,
          endPosition = 0,
          selection = new Selection(startPosition, endPosition);
      return selection;
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(domElement) {
      var selectionStart = domElement.selectionStart,
          selectionEnd = domElement.selectionEnd,
          startPosition = selectionStart,
          endPosition = selectionEnd,
          selection = new Selection(startPosition, endPosition);
      return selection;
    }
  }, {
    key: "fromStartPositionAndEndPosition",
    value: function fromStartPositionAndEndPosition(startPosition, endPosition) {
      var selection = new Selection(startPosition, endPosition);
      return selection;
    }
  }]);

  return Selection;
}();

exports["default"] = Selection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb24iLCJlcXVhbFRvIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwic3RhcnRQb3NpdGlvbnNFcXVhbCIsImVuZFBvc2l0aW9uc0VxdWFsIiwiaXNFcXVhbFRvIiwiZGlmZmVyZW50VG8iLCJkb21FbGVtZW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0lBRXFCQSxTO0FBQ25CLHFCQUFZQyxhQUFaLEVBQTJCQyxXQUEzQixFQUF3QztBQUFBOztBQUN0QyxTQUFLRCxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0Q7Ozs7dUNBRWtCO0FBQ2pCLGFBQU8sS0FBS0QsYUFBWjtBQUNEOzs7cUNBRWdCO0FBQ2YsYUFBTyxLQUFLQyxXQUFaO0FBQ0Q7OztxQ0FFZ0JELGEsRUFBZTtBQUM5QixXQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNEOzs7bUNBRWNDLFcsRUFBYTtBQUMxQixXQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNEOzs7OEJBRVNDLFMsRUFBVztBQUNuQixVQUFJQyxPQUFPLEdBQUcsS0FBZDs7QUFFQSxVQUFJRCxTQUFTLEtBQUssSUFBbEIsRUFBd0I7QUFDdEIsWUFBTUUsc0JBQXNCLEdBQUdGLFNBQVMsQ0FBQ0csZ0JBQVYsRUFBL0I7QUFBQSxZQUNNQyxvQkFBb0IsR0FBR0osU0FBUyxDQUFDSyxjQUFWLEVBRDdCO0FBQUEsWUFFTUMsbUJBQW1CLEdBQUksS0FBS1IsYUFBTCxLQUF1Qkksc0JBRnBEO0FBQUEsWUFHTUssaUJBQWlCLEdBQUksS0FBS1IsV0FBTCxLQUFxQkssb0JBSGhEO0FBS0FILFFBQUFBLE9BQU8sR0FBSUssbUJBQW1CLElBQUlDLGlCQUFsQztBQUNEOztBQUVELGFBQU9OLE9BQVA7QUFDRDs7O2tDQUVhRCxTLEVBQVc7QUFDdkIsVUFBTUMsT0FBTyxHQUFHLEtBQUtPLFNBQUwsQ0FBZVIsU0FBZixDQUFoQjtBQUFBLFVBQ01TLFdBQVcsR0FBRyxDQUFDUixPQURyQjtBQUdBLGFBQU9RLFdBQVA7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFNWCxhQUFhLEdBQUcsQ0FBdEI7QUFBQSxVQUNNQyxXQUFXLEdBQUcsQ0FEcEI7QUFBQSxVQUVNQyxTQUFTLEdBQUcsSUFBSUgsU0FBSixDQUFjQyxhQUFkLEVBQTZCQyxXQUE3QixDQUZsQjtBQUlBLGFBQU9DLFNBQVA7QUFDRDs7O21DQUVxQlUsVSxFQUFZO0FBQUEsVUFDeEJDLGNBRHdCLEdBQ1NELFVBRFQsQ0FDeEJDLGNBRHdCO0FBQUEsVUFDUkMsWUFEUSxHQUNTRixVQURULENBQ1JFLFlBRFE7QUFBQSxVQUUxQmQsYUFGMEIsR0FFVmEsY0FGVTtBQUFBLFVBRzFCWixXQUgwQixHQUdaYSxZQUhZO0FBQUEsVUFJMUJaLFNBSjBCLEdBSWQsSUFBSUgsU0FBSixDQUFjQyxhQUFkLEVBQTZCQyxXQUE3QixDQUpjO0FBTWhDLGFBQU9DLFNBQVA7QUFFRDs7O29EQUVzQ0YsYSxFQUFlQyxXLEVBQWE7QUFDakUsVUFBTUMsU0FBUyxHQUFHLElBQUlILFNBQUosQ0FBY0MsYUFBZCxFQUE2QkMsV0FBN0IsQ0FBbEI7QUFFQSxhQUFPQyxTQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0aW9uIHtcbiAgY29uc3RydWN0b3Ioc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pIHtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xuICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcbiAgfVxuXG4gIGdldFN0YXJ0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnRQb3NpdGlvbjtcbiAgfVxuXG4gIGdldEVuZFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVuZFBvc2l0aW9uO1xuICB9XG5cbiAgc2V0U3RhcnRQb3NpdGlvbihzdGFydFBvc2l0aW9uKSB7XG4gICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcbiAgfVxuXG4gIHNldEVuZFBvc2l0aW9uKGVuZFBvc2l0aW9uKSB7XG4gICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xuICB9XG5cbiAgaXNFcXVhbFRvKHNlbGVjdGlvbikge1xuICAgIGxldCBlcXVhbFRvID0gZmFsc2U7XG5cbiAgICBpZiAoc2VsZWN0aW9uICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcbiAgICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXG4gICAgICAgICAgICBzdGFydFBvc2l0aW9uc0VxdWFsID0gKHRoaXMuc3RhcnRQb3NpdGlvbiA9PT0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiksXG4gICAgICAgICAgICBlbmRQb3NpdGlvbnNFcXVhbCA9ICh0aGlzLmVuZFBvc2l0aW9uID09PSBzZWxlY3Rpb25FbmRQb3NpdGlvbik7XG5cbiAgICAgIGVxdWFsVG8gPSAoc3RhcnRQb3NpdGlvbnNFcXVhbCAmJiBlbmRQb3NpdGlvbnNFcXVhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVxdWFsVG87XG4gIH1cblxuICBpc0RpZmZlcmVudFRvKHNlbGVjdGlvbikge1xuICAgIGNvbnN0IGVxdWFsVG8gPSB0aGlzLmlzRXF1YWxUbyhzZWxlY3Rpb24pLFxuICAgICAgICAgIGRpZmZlcmVudFRvID0gIWVxdWFsVG87XG5cbiAgICByZXR1cm4gZGlmZmVyZW50VG87XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IDAsXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSAwLFxuICAgICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xuXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50KSB7XG4gICAgY29uc3QgeyBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kIH0gPSBkb21FbGVtZW50LFxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCwgLy8vXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBzZWxlY3Rpb25FbmQsIC8vL1xuICAgICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xuXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcblxuICB9XG5cbiAgc3RhdGljIGZyb21TdGFydFBvc2l0aW9uQW5kRW5kUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcblxuICAgIHJldHVybiBzZWxlY3Rpb247XG4gIH1cbn1cbiJdfQ==