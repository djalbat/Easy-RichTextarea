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
  }]);

  return Selection;
}();

module.exports = Selection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9zZWxlY3Rpb24uanMiXSwibmFtZXMiOlsiU2VsZWN0aW9uIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic2VsZWN0aW9uIiwiZXF1YWxUbyIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsInN0YXJ0UG9zaXRpb25zRXF1YWwiLCJlbmRQb3NpdGlvbnNFcXVhbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7SUFFTUEsUztBQUNKLHFCQUFZQyxhQUFaLEVBQTJCQyxXQUEzQixFQUF3QztBQUFBOztBQUN0QyxTQUFLRCxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0Q7Ozs7dUNBRWtCO0FBQ2pCLGFBQU8sS0FBS0QsYUFBWjtBQUNEOzs7cUNBRWdCO0FBQ2YsYUFBTyxLQUFLQyxXQUFaO0FBQ0Q7OztxQ0FFZ0JELGEsRUFBZTtBQUM5QixXQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNEOzs7bUNBRWNDLFcsRUFBYTtBQUMxQixXQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNEOzs7OEJBRVNDLFMsRUFBVztBQUNuQixVQUFJQyxVQUFVLEtBQWQ7O0FBRUEsVUFBSUQsY0FBYyxJQUFsQixFQUF3QjtBQUN0QixZQUFJRSx5QkFBeUJGLFVBQVVHLGdCQUFWLEVBQTdCO0FBQUEsWUFDSUMsdUJBQXVCSixVQUFVSyxjQUFWLEVBRDNCO0FBQUEsWUFFSUMsc0JBQXVCLEtBQUtSLGFBQUwsS0FBdUJJLHNCQUZsRDtBQUFBLFlBR0lLLG9CQUFxQixLQUFLUixXQUFMLEtBQXFCSyxvQkFIOUM7O0FBS0FILGtCQUFXSyx1QkFBdUJDLGlCQUFsQztBQUNEOztBQUVELGFBQU9OLE9BQVA7QUFDRDs7Ozs7O0FBR0hPLE9BQU9DLE9BQVAsR0FBaUJaLFNBQWpCIiwiZmlsZSI6InNlbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgU2VsZWN0aW9uIHtcbiAgY29uc3RydWN0b3Ioc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pIHtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xuICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcbiAgfVxuXG4gIGdldFN0YXJ0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnRQb3NpdGlvbjtcbiAgfVxuXG4gIGdldEVuZFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVuZFBvc2l0aW9uO1xuICB9XG5cbiAgc2V0U3RhcnRQb3NpdGlvbihzdGFydFBvc2l0aW9uKSB7XG4gICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcbiAgfVxuXG4gIHNldEVuZFBvc2l0aW9uKGVuZFBvc2l0aW9uKSB7XG4gICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xuICB9XG5cbiAgaXNFcXVhbFRvKHNlbGVjdGlvbikge1xuICAgIHZhciBlcXVhbFRvID0gZmFsc2U7XG5cbiAgICBpZiAoc2VsZWN0aW9uICE9PSBudWxsKSB7XG4gICAgICB2YXIgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcbiAgICAgICAgICBzdGFydFBvc2l0aW9uc0VxdWFsID0gKHRoaXMuc3RhcnRQb3NpdGlvbiA9PT0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiksXG4gICAgICAgICAgZW5kUG9zaXRpb25zRXF1YWwgPSAodGhpcy5lbmRQb3NpdGlvbiA9PT0gc2VsZWN0aW9uRW5kUG9zaXRpb24pO1xuXG4gICAgICBlcXVhbFRvID0gKHN0YXJ0UG9zaXRpb25zRXF1YWwgJiYgZW5kUG9zaXRpb25zRXF1YWwpO1xuICAgIH1cblxuICAgIHJldHVybiBlcXVhbFRvO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0aW9uO1xuIl19