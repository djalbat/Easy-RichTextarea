"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _easy = require("easy");
var _selection = _interopRequireDefault(require("./selection"));
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
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
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
}
function _templateObject() {
    var data = _taggedTemplateLiteral([
        "\n\n  display: none;\n\n  .active {\n    display: block;\n  }\n\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var defer = function(func) {
    return setTimeout(func, 0);
}; ///
var RichTextarea = function(Element1) {
    _inherits(RichTextarea, _easy.Element);
    function RichTextarea(selector, changeHandler, scrollHandler, focusHandler, blurHandler) {
        _classCallCheck(this, RichTextarea);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(RichTextarea).call(this, selector));
        _this.changeHandler = changeHandler;
        _this.scrollHandler = scrollHandler;
        _this.focusHandler = focusHandler;
        _this.blurHandler = blurHandler;
        return _this;
    }
    _createClass(RichTextarea, [
        {
            key: "activate",
            value: function activate() {
                var mouseDown = false;
                this.setMouseDown(mouseDown);
                _easy.window.on("mouseup contextmenu blur", this.mouseUpHandler, this); ///
                this.on("mousedown", this.mouseDownHandler, this);
                this.on("mousemove", this.mouseMoveHandler, this);
                this.on("keydown", this.keyDownHandler, this);
                this.on("input", this.inputHandler, this);
                this.scrollHandler && this.on("scroll", this.intermediateScrollHandler, this);
                this.focusHandler && this.on("focus", this.intermediateFocusHandler, this);
                this.blurHandler && this.on("blur", this.intermediateBlurHandler, this);
                this.addClass("active");
            }
        },
        {
            key: "deactivate",
            value: function deactivate() {
                var mouseDown = false;
                this.setMouseDown(mouseDown);
                _easy.window.off("mouseup contextmenu blur", this.mouseUpHandler, this); ///
                this.off("mousedown", this.mouseDownHandler, this);
                this.off("mousemove", this.mouseMoveHandler, this);
                this.off("keydown", this.keyDownHandler, this);
                this.off("input", this.inputHandler, this);
                this.scrollHandler && this.off("scroll", this.intermediateScrollHandler, this);
                this.focusHandler && this.off("focus", this.intermediateFocusHandler, this);
                this.blurHandler && this.off("blur", this.intermediateBlurHandler, this);
                this.removeClass("active");
            }
        },
        {
            key: "isActive",
            value: function isActive() {
                var active = this.hasClass("active");
                return active;
            }
        },
        {
            key: "isReadOnly",
            value: function isReadOnly() {
                var domElement = this.getDOMElement(), readOnly = domElement.readOnly;
                return readOnly;
            }
        },
        {
            key: "getContent",
            value: function getContent() {
                var domElement = this.getDOMElement(), value = domElement.value, content = value; ///
                return content;
            }
        },
        {
            key: "getSelection",
            value: function getSelection() {
                var domElement = this.getDOMElement(), selection = _selection.default.fromDOMElement(domElement);
                return selection;
            }
        },
        {
            key: "setReadOnly",
            value: function setReadOnly(readOnly) {
                var domElement = this.getDOMElement();
                Object.assign(domElement, {
                    readOnly: readOnly
                });
            }
        },
        {
            key: "setContent",
            value: function setContent(content) {
                var value = content, previousContent = content, domElement = this.getDOMElement();
                Object.assign(domElement, {
                    value: value
                });
                this.setPreviousContent(previousContent);
            }
        },
        {
            key: "setSelection",
            value: function setSelection(selection) {
                var selectionStartPosition = selection.getStartPosition(), selectionEndPosition = selection.getEndPosition(), selectionStart = selectionStartPosition, selectionEnd = selectionEndPosition, previousSelection = selection, domElement = this.getDOMElement();
                Object.assign(domElement, {
                    selectionStart: selectionStart,
                    selectionEnd: selectionEnd
                });
                this.setPreviousSelection(previousSelection);
            }
        },
        {
            key: "mouseUpHandler",
            value: function mouseUpHandler(event, element) {
                var mouseDown = false;
                this.setMouseDown(mouseDown);
            }
        },
        {
            key: "mouseDownHandler",
            value: function mouseDownHandler(event, element) {
                var forced = false, mouseDown = true;
                this.setMouseDown(mouseDown);
                defer((function() {
                    return this.intermediateHandler(event, element, this.changeHandler, forced);
                }).bind(this));
            }
        },
        {
            key: "mouseMoveHandler",
            value: function mouseMoveHandler(event, element) {
                var forced = false, mouseDown = this.isMouseDown();
                if (mouseDown) {
                    this.intermediateHandler(event, element, this.changeHandler, forced);
                }
            }
        },
        {
            key: "keyDownHandler",
            value: function keyDownHandler(event, element) {
                var forced = false;
                defer((function() {
                    return this.intermediateHandler(event, element, this.changeHandler, forced);
                }).bind(this));
            }
        },
        {
            key: "inputHandler",
            value: function inputHandler(event, element) {
                var forced = false;
                this.intermediateHandler(event, element, this.changeHandler, forced);
            }
        },
        {
            key: "intermediateScrollHandler",
            value: function intermediateScrollHandler(event, element) {
                var active = element.isActive();
                if (active) {
                    this.scrollHandler.call(element, event, element);
                }
            }
        },
        {
            key: "intermediateFocusHandler",
            value: function intermediateFocusHandler(event, element) {
                var forced = true;
                defer((function() {
                    return this.intermediateHandler(event, element, this.focusHandler, forced);
                }).bind(this));
            }
        },
        {
            key: "intermediateBlurHandler",
            value: function intermediateBlurHandler(event, element) {
                var forced = true;
                this.intermediateHandler(event, element, this.blurHandler, forced);
            }
        },
        {
            key: "intermediateHandler",
            value: function intermediateHandler(event, element, handler, forced) {
                var active = this.isActive();
                if (active) {
                    var changed = this.hasChanged();
                    if (changed || forced) {
                        handler.call(element, event, element);
                    }
                    var content = this.getContent(), selection = this.getSelection(), previousContent = content, previousSelection = selection; ///
                    this.setPreviousContent(previousContent);
                    this.setPreviousSelection(previousSelection);
                }
            }
        },
        {
            key: "isMouseDown",
            value: function isMouseDown() {
                var state = this.getState(), mouseDown = state.mouseDown;
                return mouseDown;
            }
        },
        {
            key: "hasChanged",
            value: function hasChanged() {
                var contentChanged = this.hasContentChanged(), selectionChanged = this.hasSelectionChanged(), changed = contentChanged || selectionChanged;
                return changed;
            }
        },
        {
            key: "hasContentChanged",
            value: function hasContentChanged() {
                var content = this.getContent(), previousContent = this.getPreviousContent(), contentDifferentToPreviousContent = content !== previousContent, contentChanged = contentDifferentToPreviousContent; ///
                return contentChanged;
            }
        },
        {
            key: "hasSelectionChanged",
            value: function hasSelectionChanged() {
                var selection = this.getSelection(), previousSelection = this.getPreviousSelection(), selectionDifferentToPreviousSelection = selection.isDifferentTo(previousSelection), selectionChanged = selectionDifferentToPreviousSelection; ///
                return selectionChanged;
            }
        },
        {
            key: "getPreviousContent",
            value: function getPreviousContent() {
                var state = this.getState(), previousContent = state.previousContent;
                return previousContent;
            }
        },
        {
            key: "getPreviousSelection",
            value: function getPreviousSelection() {
                var state = this.getState(), previousSelection = state.previousSelection;
                return previousSelection;
            }
        },
        {
            key: "setMouseDown",
            value: function setMouseDown(mouseDown) {
                this.updateState({
                    mouseDown: mouseDown
                });
            }
        },
        {
            key: "setPreviousContent",
            value: function setPreviousContent(previousContent) {
                this.updateState({
                    previousContent: previousContent
                });
            }
        },
        {
            key: "setPreviousSelection",
            value: function setPreviousSelection(previousSelection) {
                this.updateState({
                    previousSelection: previousSelection
                });
            }
        },
        {
            key: "setInitialState",
            value: function setInitialState() {
                var mouseDown = false, previousContent = null, previousSelection = null;
                this.setState({
                    mouseDown: mouseDown,
                    previousContent: previousContent,
                    previousSelection: previousSelection
                });
            }
        },
        {
            key: "initialise",
            value: function initialise() {
                var _properties = this.properties, active = _properties.active;
                this.setInitialState();
                if (active) {
                    this.activate();
                }
            }
        }
    ], [
        {
            key: "fromClass",
            value: function fromClass(Class, properties) {
                var onChange = properties.onChange, onScroll = properties.onScroll, onFocus = properties.onFocus, onBlur = properties.onBlur, changeHandler = onChange, scrollHandler = onScroll, focusHandler = onFocus, blurHandler = onBlur, richTextarea = _easy.Element.fromClass(Class, properties, changeHandler, scrollHandler, focusHandler, blurHandler);
                richTextarea.initialise();
                return richTextarea;
            }
        }
    ]);
    return RichTextarea;
}(_wrapNativeSuper(_easy.Element));
_defineProperty(RichTextarea, "tagName", "textarea");
_defineProperty(RichTextarea, "defaultProperties", {
    className: "rich"
});
_defineProperty(RichTextarea, "ignoredProperties", [
    "onChange",
    "onScroll",
    "onFocus",
    "onBlur",
    "active"
]);
var _default = _easyWithStyle.default(RichTextarea)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yaWNoVGV4dGFyZWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xyXG5cclxuaW1wb3J0IHsgd2luZG93LCBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcclxuXHJcbmltcG9ydCBTZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9uXCJcclxuXHJcbmNvbnN0IGRlZmVyID0gKGZ1bmMpID0+IHNldFRpbWVvdXQoZnVuYywgMCk7IC8vL1xyXG5cclxuY2xhc3MgUmljaFRleHRhcmVhIGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIsIGZvY3VzSGFuZGxlciwgYmx1ckhhbmRsZXIpIHtcclxuICAgIHN1cGVyKHNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBjaGFuZ2VIYW5kbGVyO1xyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjtcclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyID0gZm9jdXNIYW5kbGVyO1xyXG4gICAgdGhpcy5ibHVySGFuZGxlciA9IGJsdXJIYW5kbGVyO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub24oXCJtb3VzZXVwIGNvbnRleHRtZW51IGJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xyXG5cclxuICAgIHRoaXMub24oXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbihcImtleWRvd25cIiwgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbihcImlucHV0XCIsIHRoaXMuaW5wdXRIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vbihcInNjcm9sbFwiLCB0aGlzLmludGVybWVkaWF0ZVNjcm9sbEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZm9jdXNIYW5kbGVyICYmIHRoaXMub24oXCJmb2N1c1wiLCB0aGlzLmludGVybWVkaWF0ZUZvY3VzSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9uKFwiYmx1clwiLCB0aGlzLmludGVybWVkaWF0ZUJsdXJIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9mZihcIm1vdXNldXAgY29udGV4dG1lbnUgYmx1clwiLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xyXG5cclxuICAgIHRoaXMub2ZmKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9mZihcImtleWRvd25cIiwgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoXCJpbnB1dFwiLCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyICYmIHRoaXMub2ZmKFwic2Nyb2xsXCIsIHRoaXMuaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgJiYgdGhpcy5vZmYoXCJmb2N1c1wiLCB0aGlzLmludGVybWVkaWF0ZUZvY3VzSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5ibHVySGFuZGxlciAmJiB0aGlzLm9mZihcImJsdXJcIiwgdGhpcy5pbnRlcm1lZGlhdGVCbHVySGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5oYXNDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbiAgICByZXR1cm4gYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgaXNSZWFkT25seSgpIHtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcclxuICAgICAgICAgIHsgcmVhZE9ubHkgfSA9IGRvbUVsZW1lbnQ7XHJcbiAgICBcclxuICAgIHJldHVybiByZWFkT25seTsgXHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgeyB2YWx1ZSB9ID0gZG9tRWxlbWVudCxcclxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgIC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gU2VsZWN0aW9uLmZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRSZWFkT25seShyZWFkT25seSkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oZG9tRWxlbWVudCwge1xyXG4gICAgICByZWFkT25seVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudCwgIC8vL1xyXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oZG9tRWxlbWVudCwge1xyXG4gICAgICB2YWx1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kUG9zaXRpb24sICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihkb21FbGVtZW50LCB7XHJcbiAgICAgIHNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBzZWxlY3Rpb25FbmRcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gZmFsc2UsXHJcbiAgICAgICAgICBtb3VzZURvd24gPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCB0aGlzLmNoYW5nZUhhbmRsZXIsIGZvcmNlZCkpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gZmFsc2UsXHJcbiAgICAgICAgICBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCk7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSBmYWxzZTtcclxuXHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIHRoaXMuY2hhbmdlSGFuZGxlciwgZm9yY2VkKSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgdGhpcy5jaGFuZ2VIYW5kbGVyLCBmb3JjZWQpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJtZWRpYXRlU2Nyb2xsSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gZWxlbWVudC5pc0FjdGl2ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmNhbGwoZWxlbWVudCwgZXZlbnQsIGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW50ZXJtZWRpYXRlRm9jdXNIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSB0cnVlO1xyXG5cclxuICAgIGRlZmVyKCgpID0+IHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgdGhpcy5mb2N1c0hhbmRsZXIsIGZvcmNlZCkpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJtZWRpYXRlQmx1ckhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCB0aGlzLmJsdXJIYW5kbGVyLCBmb3JjZWQpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgaGFuZGxlciwgZm9yY2VkKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBjb25zdCBjaGFuZ2VkID0gdGhpcy5oYXNDaGFuZ2VkKCk7XHJcblxyXG4gICAgICBpZiAoY2hhbmdlZCB8fCBmb3JjZWQpIHtcclxuICAgICAgICBoYW5kbGVyLmNhbGwoZWxlbWVudCwgZXZlbnQsIGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb247ICAvLy9cclxuXHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XHJcbiAgICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNb3VzZURvd24oKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgIHsgbW91c2VEb3duIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gbW91c2VEb3duO1xyXG4gIH1cclxuXHJcbiAgaGFzQ2hhbmdlZCgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnRDaGFuZ2VkID0gdGhpcy5oYXNDb250ZW50Q2hhbmdlZCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHRoaXMuaGFzU2VsZWN0aW9uQ2hhbmdlZCgpLFxyXG4gICAgICAgICAgY2hhbmdlZCA9IChjb250ZW50Q2hhbmdlZCB8fCBzZWxlY3Rpb25DaGFuZ2VkKTtcclxuXHJcbiAgICByZXR1cm4gY2hhbmdlZDtcclxuICB9XHJcblxyXG4gIGhhc0NvbnRlbnRDaGFuZ2VkKCkge1xyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKSxcclxuICAgICAgICAgIGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudCA9IChjb250ZW50ICE9PSBwcmV2aW91c0NvbnRlbnQpLFxyXG4gICAgICAgICAgY29udGVudENoYW5nZWQgPSBjb250ZW50RGlmZmVyZW50VG9QcmV2aW91c0NvbnRlbnQ7IC8vL1xyXG5cclxuICAgIHJldHVybiBjb250ZW50Q2hhbmdlZDtcclxuICB9XHJcblxyXG4gIGhhc1NlbGVjdGlvbkNoYW5nZWQoKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpLFxyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSB0aGlzLmdldFByZXZpb3VzU2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25EaWZmZXJlbnRUb1ByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uLmlzRGlmZmVyZW50VG8ocHJldmlvdXNTZWxlY3Rpb24pLFxyXG4gICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb247IC8vL1xyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb25DaGFuZ2VkO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzQ29udGVudCB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzQ29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzU2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzU2VsZWN0aW9uIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZURvd24obW91c2VEb3duKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgbW91c2VEb3duXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c0NvbnRlbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IG51bGwsXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93bixcclxuICAgICAgcHJldmlvdXNDb250ZW50LFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXNlKCkge1xyXG4gICAgY29uc3QgeyBhY3RpdmUgfSA9IHRoaXMucHJvcGVydGllcztcclxuXHJcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xyXG5cclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHRhZ05hbWUgPSBcInRleHRhcmVhXCI7XHJcblxyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcclxuICAgIGNsYXNzTmFtZTogXCJyaWNoXCJcclxuICB9O1xyXG5cclxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXHJcbiAgICBcIm9uQ2hhbmdlXCIsXHJcbiAgICBcIm9uU2Nyb2xsXCIsXHJcbiAgICBcIm9uRm9jdXNcIixcclxuICAgIFwib25CbHVyXCIsXHJcbiAgICBcImFjdGl2ZVwiXHJcbiAgXTtcclxuXHJcbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gcHJvcGVydGllcyxcclxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXHJcbiAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgZm9jdXNIYW5kbGVyID0gb25Gb2N1cywgLy8vXHJcbiAgICAgICAgICBibHVySGFuZGxlciA9IG9uQmx1ciwgLy8vXHJcbiAgICAgICAgICByaWNoVGV4dGFyZWEgPSBFbGVtZW50LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlciwgZm9jdXNIYW5kbGVyLCBibHVySGFuZGxlcik7XHJcblxyXG4gICAgcmljaFRleHRhcmVhLmluaXRpYWxpc2UoKTtcclxuXHJcbiAgICByZXR1cm4gcmljaFRleHRhcmVhO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKFJpY2hUZXh0YXJlYSlgXHJcblxyXG4gIGRpc3BsYXk6IG5vbmU7XHJcblxyXG4gIC5hY3RpdmUge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG5cclxuYFxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBQTs7Ozs7SUFFQSxjQUFBO0lBRUEsS0FBQTtJQUVBLFVBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBNlRBLGlFQVFBOzs7Ozs7O0lBblVB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