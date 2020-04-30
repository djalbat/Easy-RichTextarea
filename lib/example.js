"use strict";

var _easy = require("easy");

var _view = _interopRequireDefault(require("./example/view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Object.assign(window, {
  React: _easy.React
});
var body = new _easy.Body();
body.prepend( /*#__PURE__*/_easy.React.createElement(_view["default"], null));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiYXNzaWduIiwid2luZG93IiwiUmVhY3QiLCJib2R5IiwiQm9keSIsInByZXBlbmQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUVBOzs7O0FBRUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxNQUFkLEVBQXNCO0FBQ3BCQyxFQUFBQSxLQUFLLEVBQUxBO0FBRG9CLENBQXRCO0FBSUEsSUFBTUMsSUFBSSxHQUFHLElBQUlDLFVBQUosRUFBYjtBQUVBRCxJQUFJLENBQUNFLE9BQUwsZUFFRSwwQkFBQyxnQkFBRCxPQUZGIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEJvZHksIFJlYWN0IH0gZnJvbSBcImVhc3lcIjtcblxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vZXhhbXBsZS92aWV3XCI7XG5cbk9iamVjdC5hc3NpZ24od2luZG93LCB7XG4gIFJlYWN0XG59KTtcblxuY29uc3QgYm9keSA9IG5ldyBCb2R5KCk7XG5cbmJvZHkucHJlcGVuZChcblxuICA8VmlldyAvPlxuXG4pO1xuIl19