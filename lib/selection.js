'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Selection = function () {
  function Selection(startPosition, endPosition) {
    _classCallCheck(this, Selection);

    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  _createClass(Selection, [{
    key: 'getStartPosition',
    value: function getStartPosition() {
      return this.startPosition;
    }
  }, {
    key: 'getEndPosition',
    value: function getEndPosition() {
      return this.endPosition;
    }
  }, {
    key: 'setStartPosition',
    value: function setStartPosition(startPosition) {
      this.startPosition = startPosition;
    }
  }, {
    key: 'setEndPosition',
    value: function setEndPosition(endPosition) {
      this.endPosition = endPosition;
    }
  }, {
    key: 'isEqualTo',
    value: function isEqualTo(selection) {
      var selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          startPositionsEqual = this.startPosition === selectionStartPosition,
          endPositionsEqual = this.endPosition === selectionEndPosition,
          equalTo = startPositionsEqual && endPositionsEqual;

      return equalTo;
    }
  }, {
    key: 'isDifferentTo',
    value: function isDifferentTo(selection) {
      var equalTo = this.isEqualTo(selection),
          differentTo = !equalTo;

      return differentTo;
    }
  }], [{
    key: 'fromNothing',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9zZWxlY3Rpb24uanMiXSwibmFtZXMiOlsiU2VsZWN0aW9uIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic2VsZWN0aW9uIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwic3RhcnRQb3NpdGlvbnNFcXVhbCIsImVuZFBvc2l0aW9uc0VxdWFsIiwiZXF1YWxUbyIsImlzRXF1YWxUbyIsImRpZmZlcmVudFRvIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztJQUVNQSxTO0FBQ0oscUJBQVlDLGFBQVosRUFBMkJDLFdBQTNCLEVBQXdDO0FBQUE7O0FBQ3RDLFNBQUtELGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFDRDs7Ozt1Q0FFa0I7QUFDakIsYUFBTyxLQUFLRCxhQUFaO0FBQ0Q7OztxQ0FFZ0I7QUFDZixhQUFPLEtBQUtDLFdBQVo7QUFDRDs7O3FDQUVnQkQsYSxFQUFlO0FBQzlCLFdBQUtBLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0Q7OzttQ0FFY0MsVyxFQUFhO0FBQzFCLFdBQUtBLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0Q7Ozs4QkFFU0MsUyxFQUFXO0FBQ25CLFVBQUlDLHlCQUF5QkQsVUFBVUUsZ0JBQVYsRUFBN0I7QUFBQSxVQUNJQyx1QkFBdUJILFVBQVVJLGNBQVYsRUFEM0I7QUFBQSxVQUVJQyxzQkFBdUIsS0FBS1AsYUFBTCxLQUF1Qkcsc0JBRmxEO0FBQUEsVUFHSUssb0JBQXFCLEtBQUtQLFdBQUwsS0FBcUJJLG9CQUg5QztBQUFBLFVBSUlJLFVBQVdGLHVCQUF1QkMsaUJBSnRDOztBQU1BLGFBQU9DLE9BQVA7QUFDRDs7O2tDQUVhUCxTLEVBQVc7QUFDdkIsVUFBSU8sVUFBVSxLQUFLQyxTQUFMLENBQWVSLFNBQWYsQ0FBZDtBQUFBLFVBQ0lTLGNBQWMsQ0FBQ0YsT0FEbkI7O0FBR0EsYUFBT0UsV0FBUDtBQUNEOzs7a0NBRW9CO0FBQ25CLFVBQUlYLGdCQUFnQixDQUFwQjtBQUFBLFVBQ0lDLGNBQWMsQ0FEbEI7QUFBQSxVQUVJQyxZQUFZLElBQUlILFNBQUosQ0FBY0MsYUFBZCxFQUE2QkMsV0FBN0IsQ0FGaEI7O0FBSUEsYUFBT0MsU0FBUDtBQUNEOzs7Ozs7QUFHSFUsT0FBT0MsT0FBUCxHQUFpQmQsU0FBakIiLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBTZWxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbikge1xuICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XG4gICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0U3RhcnRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydFBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0RW5kUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5kUG9zaXRpb247XG4gIH1cblxuICBzZXRTdGFydFBvc2l0aW9uKHN0YXJ0UG9zaXRpb24pIHtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xuICB9XG5cbiAgc2V0RW5kUG9zaXRpb24oZW5kUG9zaXRpb24pIHtcbiAgICB0aGlzLmVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XG4gIH1cblxuICBpc0VxdWFsVG8oc2VsZWN0aW9uKSB7XG4gICAgdmFyIHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxuICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxuICAgICAgICBzdGFydFBvc2l0aW9uc0VxdWFsID0gKHRoaXMuc3RhcnRQb3NpdGlvbiA9PT0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiksXG4gICAgICAgIGVuZFBvc2l0aW9uc0VxdWFsID0gKHRoaXMuZW5kUG9zaXRpb24gPT09IHNlbGVjdGlvbkVuZFBvc2l0aW9uKSxcbiAgICAgICAgZXF1YWxUbyA9IChzdGFydFBvc2l0aW9uc0VxdWFsICYmIGVuZFBvc2l0aW9uc0VxdWFsKTtcblxuICAgIHJldHVybiBlcXVhbFRvO1xuICB9XG5cbiAgaXNEaWZmZXJlbnRUbyhzZWxlY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxUbyA9IHRoaXMuaXNFcXVhbFRvKHNlbGVjdGlvbiksXG4gICAgICAgIGRpZmZlcmVudFRvID0gIWVxdWFsVG87XG5cbiAgICByZXR1cm4gZGlmZmVyZW50VG87XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgdmFyIHN0YXJ0UG9zaXRpb24gPSAwLFxuICAgICAgICBlbmRQb3NpdGlvbiA9IDAsXG4gICAgICAgIHNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xuXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdGlvbjtcbiJdfQ==