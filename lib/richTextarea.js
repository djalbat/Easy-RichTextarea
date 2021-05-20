"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _easy = require("easy");
var _selection = _interopRequireDefault(require("./selection"));
var _constants = require("./constants");
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++){
            arr2[i] = arr[i];
        }
        return arr2;
    }
}
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
function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
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
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
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
var _handler;
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
var RichTextarea = /*#__PURE__*/ function(Element1) {
    _inherits(RichTextarea, Element1);
    function RichTextarea() {
        _classCallCheck(this, RichTextarea);
        return _possibleConstructorReturn(this, _getPrototypeOf(RichTextarea).apply(this, arguments));
    }
    _createClass(RichTextarea, [
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
            key: "activate",
            value: function activate() {
                var mouseDown = false;
                this.setMouseDown(mouseDown);
                _easy.window.on(_constants.MOUSEUP_CONTEXTMENU_BLUR, this.mouseUpHandler, this); ///
                this.on(_constants.MOUSEDOWN, this.mouseDownHandler, this);
                this.on(_constants.MOUSEMOVE, this.mouseMoveHandler, this);
                this.on(_constants.KEYDOWN, this.keyDownHandler, this);
                this.on(_constants.INPUT, this.inputHandler, this);
                this.on(_constants.SCROLL, this.scrollHandler, this);
                this.on(_constants.FOCUS, this.focusHandler, this);
                this.on(_constants.BLUR, this.blurHandler, this);
                this.addClass("active");
            }
        },
        {
            key: "deactivate",
            value: function deactivate() {
                var mouseDown = false;
                this.setMouseDown(mouseDown);
                _easy.window.off(_constants.MOUSEUP_CONTEXTMENU_BLUR, this.mouseUpHandler, this); ///
                this.off(_constants.MOUSEDOWN, this.mouseDownHandler, this);
                this.off(_constants.MOUSEMOVE, this.mouseMoveHandler, this);
                this.off(_constants.KEYDOWN, this.keyDownHandler, this);
                this.off(_constants.INPUT, this.inputHandler, this);
                this.off(_constants.SCROLL, this.scrollHandler, this);
                this.off(_constants.FOCUS, this.focusHandler, this);
                this.off(_constants.BLUR, this.blurHandler, this);
                this.removeClass("active");
            }
        },
        {
            key: "onBlur",
            value: function onBlur(blurHandler, element) {
                var eventType = _constants.BLUR, handler = blurHandler; ///
                this.addEventListener(eventType, handler, element);
            }
        },
        {
            key: "offBlur",
            value: function offBlur(blurHandler, element) {
                var eventType = _constants.BLUR, handler = blurHandler; ///
                this.removeEventListener(eventType, handler, element);
            }
        },
        {
            key: "onFocus",
            value: function onFocus(blurHandler, element) {
                var eventType = _constants.FOCUS, handler = blurHandler; ///
                this.addEventListener(eventType, handler, element);
            }
        },
        {
            key: "offFocus",
            value: function offFocus(blurHandler, element) {
                var eventType = _constants.FOCUS, handler = blurHandler; ///
                this.removeEventListener(eventType, handler, element);
            }
        },
        {
            key: "onScroll",
            value: function onScroll(scrollHandler, element) {
                var eventType = _constants.SCROLL, handler = scrollHandler; ///
                this.addEventListener(eventType, handler, element);
            }
        },
        {
            key: "offScroll",
            value: function offScroll(scrollHandler, element) {
                var eventType = _constants.SCROLL, handler = scrollHandler; ///
                this.removeEventListener(eventType, handler, element);
            }
        },
        {
            key: "onChange",
            value: function onChange(changeHandler, element) {
                var eventType = _constants.CHANGE, handler = changeHandler; ///
                this.addEventListener(eventType, handler, element);
            }
        },
        {
            key: "offChange",
            value: function offChange(changeHandler, element) {
                var eventType = _constants.CHANGE, handler = changeHandler; ///
                this.removeEventListener(eventType, handler, element);
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
                var forced = false, mouseDown = true, eventType = _constants.CHANGE;
                this.setMouseDown(mouseDown);
                defer((function() {
                    return this.intermediateHandler(event, element, eventType, forced);
                }).bind(this));
            }
        },
        {
            key: "mouseMoveHandler",
            value: function mouseMoveHandler(event, element) {
                var forced = false, mouseDown = this.isMouseDown(), eventTYpe = _constants.CHANGE;
                if (mouseDown) {
                    this.intermediateHandler(event, element, eventTYpe, forced);
                }
            }
        },
        {
            key: "keyDownHandler",
            value: function keyDownHandler(event, element) {
                var forced = false, eventType = _constants.CHANGE;
                defer((function() {
                    return this.intermediateHandler(event, element, eventType, forced);
                }).bind(this));
            }
        },
        {
            key: "inputHandler",
            value: function inputHandler(event, element) {
                var forced = false, eventType = _constants.CHANGE;
                this.intermediateHandler(event, element, eventType, forced);
            }
        },
        {
            key: "scrollHandler",
            value: function scrollHandler(event, element) {
                var eventType = _constants.SCROLL;
                this.callHandlers(eventType, event, element);
            }
        },
        {
            key: "focusHandler",
            value: function focusHandler(event, element) {
                var forced = true, eventType = _constants.FOCUS;
                defer((function() {
                    return this.intermediateHandler(event, element, eventType, forced);
                }).bind(this));
            }
        },
        {
            key: "blurHandler",
            value: function blurHandler(event, element) {
                var forced = true, eventType = _constants.BLUR;
                this.intermediateHandler(event, element, eventType, forced);
            }
        },
        {
            key: "intermediateHandler",
            value: function intermediateHandler(event, element, eventType, forced) {
                var changed = this.hasChanged();
                if (changed || forced) {
                    this.callHandlers(eventType, event, element);
                }
                var content = this.getContent(), selection = this.getSelection(), previousContent = content, previousSelection = selection; ///
                this.setPreviousContent(previousContent);
                this.setPreviousSelection(previousSelection);
            }
        },
        {
            key: "callHandlers",
            value: function callHandlers(eventType) {
                for(var _len = arguments.length, remainingArguments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    remainingArguments[_key - 1] = arguments[_key];
                }
                var eventListeners = this.findEventListeners(eventType);
                eventListeners.forEach((function(eventListener) {
                    var handler = eventListener.handler, element = eventListener.element;
                    if (handler !== this.blurHandler && handler !== this.focusHandler && handler !== this.scrollHandler) {
                        (_handler = handler).call.apply(_handler, [
                            element
                        ].concat(_toConsumableArray(remainingArguments)));
                    }
                }).bind(this));
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
            key: "didMount",
            value: function didMount() {
                var _properties = this.properties, active = _properties.active, onChange = _properties.onChange, onScroll = _properties.onScroll, onFocus = _properties.onFocus, onBlur = _properties.onBlur, changeHandler = onChange, scrollHandler = onScroll, focusHandler = onFocus, blurHandler = onBlur; ///
                changeHandler && this.onChange(changeHandler);
                scrollHandler && this.onScroll(scrollHandler);
                focusHandler && this.onFocus(focusHandler);
                blurHandler && this.onBlur(blurHandler);
                if (active) {
                    this.activate();
                }
            }
        },
        {
            key: "willUnmount",
            value: function willUnmount() {
                var _properties = this.properties, onChange = _properties.onChange, onScroll = _properties.onScroll, onFocus = _properties.onFocus, onBlur = _properties.onBlur, changeHandler = onChange, scrollHandler = onScroll, focusHandler = onFocus, blurHandler = onBlur; ///
                changeHandler && this.offChange(changeHandler);
                scrollHandler && this.offScroll(scrollHandler);
                focusHandler && this.offFocus(focusHandler);
                blurHandler && this.offBlur(blurHandler);
            }
        },
        {
            key: "initialise",
            value: function initialise() {
                this.setInitialState();
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
var _default = (0, _easyWithStyle).default(RichTextarea)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yaWNoVGV4dGFyZWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xyXG5cclxuaW1wb3J0IHsgd2luZG93LCBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcclxuXHJcbmltcG9ydCBTZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9uXCJcclxuXHJcbmltcG9ydCB7IEJMVVIsXHJcbiAgICAgICAgIElOUFVULFxyXG4gICAgICAgICBGT0NVUyxcclxuICAgICAgICAgQ0hBTkdFLFxyXG4gICAgICAgICBTQ1JPTEwsXHJcbiAgICAgICAgIEtFWURPV04sXHJcbiAgICAgICAgIE1PVVNFRE9XTixcclxuICAgICAgICAgTU9VU0VNT1ZFLFxyXG4gICAgICAgICBNT1VTRVVQX0NPTlRFWFRNRU5VX0JMVVIgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IGRlZmVyID0gKGZ1bmMpID0+IHNldFRpbWVvdXQoZnVuYywgMCk7IC8vL1xyXG5cclxuY2xhc3MgUmljaFRleHRhcmVhIGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgaXNBY3RpdmUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmhhc0NsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuICAgIHJldHVybiBhY3RpdmU7XHJcbiAgfVxyXG5cclxuICBpc1JlYWRPbmx5KCkge1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxyXG4gICAgICAgICAgeyByZWFkT25seSB9ID0gZG9tRWxlbWVudDtcclxuICAgIFxyXG4gICAgcmV0dXJuIHJlYWRPbmx5OyBcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICB7IHZhbHVlIH0gPSBkb21FbGVtZW50LFxyXG4gICAgICAgICAgY29udGVudCA9IHZhbHVlOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXHJcbiAgICAgICAgICBzZWxlY3Rpb24gPSBTZWxlY3Rpb24uZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNldFJlYWRPbmx5KHJlYWRPbmx5KSB7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihkb21FbGVtZW50LCB7XHJcbiAgICAgIHJlYWRPbmx5XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50LCAgLy8vXHJcbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihkb21FbGVtZW50LCB7XHJcbiAgICAgIHZhbHVlXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uLCAgLy8vXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmRQb3NpdGlvbiwgIC8vL1xyXG4gICAgICAgICAgcHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24sICAvLy9cclxuICAgICAgICAgIGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKGRvbUVsZW1lbnQsIHtcclxuICAgICAgc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIHNlbGVjdGlvbkVuZFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c1NlbGVjdGlvbihwcmV2aW91c1NlbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBpc01vdXNlRG93bigpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgeyBtb3VzZURvd24gfSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBtb3VzZURvd247XHJcbiAgfVxyXG5cclxuICBoYXNDaGFuZ2VkKCkge1xyXG4gICAgY29uc3QgY29udGVudENoYW5nZWQgPSB0aGlzLmhhc0NvbnRlbnRDaGFuZ2VkKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gdGhpcy5oYXNTZWxlY3Rpb25DaGFuZ2VkKCksXHJcbiAgICAgICAgICBjaGFuZ2VkID0gKGNvbnRlbnRDaGFuZ2VkIHx8IHNlbGVjdGlvbkNoYW5nZWQpO1xyXG5cclxuICAgIHJldHVybiBjaGFuZ2VkO1xyXG4gIH1cclxuXHJcbiAgaGFzQ29udGVudENoYW5nZWQoKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCksXHJcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSB0aGlzLmdldFByZXZpb3VzQ29udGVudCgpLFxyXG4gICAgICAgICAgY29udGVudERpZmZlcmVudFRvUHJldmlvdXNDb250ZW50ID0gKGNvbnRlbnQgIT09IHByZXZpb3VzQ29udGVudCksXHJcbiAgICAgICAgICBjb250ZW50Q2hhbmdlZCA9IGNvbnRlbnREaWZmZXJlbnRUb1ByZXZpb3VzQ29udGVudDsgLy8vXHJcblxyXG4gICAgcmV0dXJuIGNvbnRlbnRDaGFuZ2VkO1xyXG4gIH1cclxuXHJcbiAgaGFzU2VsZWN0aW9uQ2hhbmdlZCgpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IHRoaXMuZ2V0UHJldmlvdXNTZWxlY3Rpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkRpZmZlcmVudFRvUHJldmlvdXNTZWxlY3Rpb24gPSBzZWxlY3Rpb24uaXNEaWZmZXJlbnRUbyhwcmV2aW91c1NlbGVjdGlvbiksXHJcbiAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gc2VsZWN0aW9uRGlmZmVyZW50VG9QcmV2aW91c1NlbGVjdGlvbjsgLy8vXHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbkNoYW5nZWQ7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgd2luZG93Lm9uKE1PVVNFVVBfQ09OVEVYVE1FTlVfQkxVUiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xyXG5cclxuICAgIHRoaXMub24oTU9VU0VET1dOLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oTU9VU0VNT1ZFLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oS0VZRE9XTiwgdGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vbihJTlBVVCwgdGhpcy5pbnB1dEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oU0NST0xMLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub24oRk9DVVMsIHRoaXMuZm9jdXNIYW5kbGVyLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9uKEJMVVIsIHRoaXMuYmx1ckhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgY29uc3QgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zZXRNb3VzZURvd24obW91c2VEb3duKTtcclxuXHJcbiAgICB3aW5kb3cub2ZmKE1PVVNFVVBfQ09OVEVYVE1FTlVfQkxVUiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cclxuXHJcbiAgICB0aGlzLm9mZihNT1VTRURPV04sIHRoaXMubW91c2VEb3duSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoTU9VU0VNT1ZFLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKEtFWURPV04sIHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKElOUFVULCB0aGlzLmlucHV0SGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoU0NST0xMLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMub2ZmKEZPQ1VTLCB0aGlzLmZvY3VzSGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5vZmYoQkxVUiwgdGhpcy5ibHVySGFuZGxlciwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG4gIG9uQmx1cihibHVySGFuZGxlciwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZXZlbnRUeXBlID0gQkxVUixcclxuICAgICAgICAgIGhhbmRsZXIgPSBibHVySGFuZGxlcjsgIC8vL1xyXG5cclxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgb2ZmQmx1cihibHVySGFuZGxlciwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZXZlbnRUeXBlID0gQkxVUixcclxuICAgICAgICAgIGhhbmRsZXIgPSBibHVySGFuZGxlcjsgIC8vL1xyXG5cclxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgb25Gb2N1cyhibHVySGFuZGxlciwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZXZlbnRUeXBlID0gRk9DVVMsXHJcbiAgICAgICAgICBoYW5kbGVyID0gYmx1ckhhbmRsZXI7ICAvLy9cclxuXHJcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIG9mZkZvY3VzKGJsdXJIYW5kbGVyLCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBldmVudFR5cGUgPSBGT0NVUyxcclxuICAgICAgICAgIGhhbmRsZXIgPSBibHVySGFuZGxlcjsgIC8vL1xyXG5cclxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgb25TY3JvbGwoc2Nyb2xsSGFuZGxlciwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZXZlbnRUeXBlID0gU0NST0xMLFxyXG4gICAgICAgICAgaGFuZGxlciA9IHNjcm9sbEhhbmRsZXI7ICAvLy9cclxuXHJcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIG9mZlNjcm9sbChzY3JvbGxIYW5kbGVyLCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBldmVudFR5cGUgPSBTQ1JPTEwsXHJcbiAgICAgICAgICBoYW5kbGVyID0gc2Nyb2xsSGFuZGxlcjsgIC8vL1xyXG5cclxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZXZlbnRUeXBlID0gQ0hBTkdFLFxyXG4gICAgICAgICAgaGFuZGxlciA9IGNoYW5nZUhhbmRsZXI7ICAvLy9cclxuXHJcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIG9mZkNoYW5nZShjaGFuZ2VIYW5kbGVyLCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBldmVudFR5cGUgPSBDSEFOR0UsXHJcbiAgICAgICAgICBoYW5kbGVyID0gY2hhbmdlSGFuZGxlcjsgIC8vL1xyXG5cclxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VVcEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcbiAgfTtcclxuXHJcbiAgbW91c2VEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gZmFsc2UsXHJcbiAgICAgICAgICBtb3VzZURvd24gPSB0cnVlLFxyXG4gICAgICAgICAgZXZlbnRUeXBlID0gQ0hBTkdFO1xyXG5cclxuICAgIHRoaXMuc2V0TW91c2VEb3duKG1vdXNlRG93bik7XHJcblxyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCBldmVudFR5cGUsIGZvcmNlZCkpO1xyXG4gIH1cclxuXHJcbiAgbW91c2VNb3ZlSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZm9yY2VkID0gZmFsc2UsXHJcbiAgICAgICAgICBtb3VzZURvd24gPSB0aGlzLmlzTW91c2VEb3duKCksXHJcbiAgICAgICAgICBldmVudFRZcGUgPSBDSEFOR0U7XHJcblxyXG4gICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIGV2ZW50VFlwZSwgZm9yY2VkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGtleURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSBmYWxzZSxcclxuICAgICAgICAgIGV2ZW50VHlwZSA9IENIQU5HRTtcclxuXHJcbiAgICBkZWZlcigoKSA9PiB0aGlzLmludGVybWVkaWF0ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQsIGV2ZW50VHlwZSwgZm9yY2VkKSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IGZhbHNlLFxyXG4gICAgICAgICAgZXZlbnRUeXBlID0gQ0hBTkdFO1xyXG5cclxuICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgZXZlbnRUeXBlLCBmb3JjZWQpO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xyXG4gICAgY29uc3QgZXZlbnRUeXBlID0gU0NST0xMO1xyXG5cclxuICAgIHRoaXMuY2FsbEhhbmRsZXJzKGV2ZW50VHlwZSwgZXZlbnQsIGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgZm9jdXNIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmb3JjZWQgPSB0cnVlLFxyXG4gICAgICAgICAgZXZlbnRUeXBlID0gRk9DVVM7XHJcblxyXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5pbnRlcm1lZGlhdGVIYW5kbGVyKGV2ZW50LCBlbGVtZW50LCBldmVudFR5cGUsIGZvcmNlZCkpO1xyXG4gIH1cclxuXHJcbiAgYmx1ckhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZvcmNlZCA9IHRydWUsXHJcbiAgICAgICAgICBldmVudFR5cGUgPSBCTFVSO1xyXG5cclxuICAgIHRoaXMuaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgZXZlbnRUeXBlLCBmb3JjZWQpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJtZWRpYXRlSGFuZGxlcihldmVudCwgZWxlbWVudCwgZXZlbnRUeXBlLCBmb3JjZWQpIHtcclxuICAgIGNvbnN0IGNoYW5nZWQgPSB0aGlzLmhhc0NoYW5nZWQoKTtcclxuXHJcbiAgICBpZiAoY2hhbmdlZCB8fCBmb3JjZWQpIHtcclxuICAgICAgdGhpcy5jYWxsSGFuZGxlcnMoZXZlbnRUeXBlLCBldmVudCwgZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQsICAvLy9cclxuICAgICAgICAgIHByZXZpb3VzU2VsZWN0aW9uID0gc2VsZWN0aW9uOyAgLy8vXHJcblxyXG4gICAgdGhpcy5zZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KTtcclxuICAgIHRoaXMuc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgY2FsbEhhbmRsZXJzKGV2ZW50VHlwZSwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XHJcbiAgICBjb25zdCBldmVudExpc3RlbmVycyA9IHRoaXMuZmluZEV2ZW50TGlzdGVuZXJzKGV2ZW50VHlwZSk7XHJcblxyXG4gICAgZXZlbnRMaXN0ZW5lcnMuZm9yRWFjaCgoZXZlbnRMaXN0ZW5lcikgPT4ge1xyXG4gICAgICBjb25zdCB7IGhhbmRsZXIsIGVsZW1lbnQgfSA9IGV2ZW50TGlzdGVuZXI7XHJcblxyXG4gICAgICBpZiAoIChoYW5kbGVyICE9PSB0aGlzLmJsdXJIYW5kbGVyKSAmJlxyXG4gICAgICAgICAgIChoYW5kbGVyICE9PSB0aGlzLmZvY3VzSGFuZGxlcikgJiZcclxuICAgICAgICAgICAoaGFuZGxlciAhPT0gdGhpcy5zY3JvbGxIYW5kbGVyKSApIHtcclxuXHJcbiAgICAgICAgaGFuZGxlci5jYWxsKGVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzQ29udGVudCB9ID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzQ29udGVudDtcclxuICB9XHJcblxyXG4gIGdldFByZXZpb3VzU2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgICAgICB7IHByZXZpb3VzU2VsZWN0aW9uIH0gPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzZXRNb3VzZURvd24obW91c2VEb3duKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgbW91c2VEb3duXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpb3VzQ29udGVudChwcmV2aW91c0NvbnRlbnQpIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c0NvbnRlbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlvdXNTZWxlY3Rpb24ocHJldmlvdXNTZWxlY3Rpb24pIHtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBjb25zdCBtb3VzZURvd24gPSBmYWxzZSxcclxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IG51bGwsXHJcbiAgICAgICAgICBwcmV2aW91c1NlbGVjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1vdXNlRG93bixcclxuICAgICAgcHJldmlvdXNDb250ZW50LFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IHsgYWN0aXZlLCBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gdGhpcy5wcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xyXG4gICAgICAgICAgICBzY3JvbGxIYW5kbGVyID0gb25TY3JvbGwsIC8vL1xyXG4gICAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgICAgYmx1ckhhbmRsZXIgPSBvbkJsdXI7IC8vL1xyXG5cclxuICAgIGNoYW5nZUhhbmRsZXIgJiYgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcclxuICAgIHNjcm9sbEhhbmRsZXIgJiYgdGhpcy5vblNjcm9sbChzY3JvbGxIYW5kbGVyKTtcclxuICAgIGZvY3VzSGFuZGxlciAmJiB0aGlzLm9uRm9jdXMoZm9jdXNIYW5kbGVyKTtcclxuICAgIGJsdXJIYW5kbGVyICYmIHRoaXMub25CbHVyKGJsdXJIYW5kbGVyKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdpbGxVbm1vdW50KCkge1xyXG4gICAgY29uc3QgeyBvbkNoYW5nZSwgb25TY3JvbGwsIG9uRm9jdXMsIG9uQmx1ciB9ID0gdGhpcy5wcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cclxuICAgICAgICAgIHNjcm9sbEhhbmRsZXIgPSBvblNjcm9sbCwgLy8vXHJcbiAgICAgICAgICBmb2N1c0hhbmRsZXIgPSBvbkZvY3VzLCAvLy9cclxuICAgICAgICAgIGJsdXJIYW5kbGVyID0gb25CbHVyOyAvLy9cclxuXHJcbiAgICBjaGFuZ2VIYW5kbGVyICYmIHRoaXMub2ZmQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xyXG4gICAgc2Nyb2xsSGFuZGxlciAmJiB0aGlzLm9mZlNjcm9sbChzY3JvbGxIYW5kbGVyKTtcclxuICAgIGZvY3VzSGFuZGxlciAmJiB0aGlzLm9mZkZvY3VzKGZvY3VzSGFuZGxlcik7XHJcbiAgICBibHVySGFuZGxlciAmJiB0aGlzLm9mZkJsdXIoYmx1ckhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGlzZSgpIHtcclxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdGFnTmFtZSA9IFwidGV4dGFyZWFcIjtcclxuXHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xyXG4gICAgY2xhc3NOYW1lOiBcInJpY2hcIlxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcclxuICAgIFwib25DaGFuZ2VcIixcclxuICAgIFwib25TY3JvbGxcIixcclxuICAgIFwib25Gb2N1c1wiLFxyXG4gICAgXCJvbkJsdXJcIixcclxuICAgIFwiYWN0aXZlXCJcclxuICBdO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoUmljaFRleHRhcmVhKWBcclxuXHJcbiAgZGlzcGxheTogbm9uZTtcclxuXHJcbiAgLmFjdGl2ZSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcblxyXG5gXHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVVLGNBQWlCO0lBRVAsS0FBTTtJQUVoQixVQUFhO0lBVU0sVUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvUzlDLFFBQU87OztTQWtHd0IsaUVBUXZDOzs7Ozs7O0lBNVlNLEtBQUssWUFBSSxJQUFJO1dBQUssVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0VBQUcsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO0lBRTFDLFlBQVk7Y0FBWixZQUFZO2FBQVosWUFBWTs4QkFBWixZQUFZO2dFQUFaLFlBQVk7O2lCQUFaLFlBQVk7O1lBQ2hCLEdBQVEsR0FBUixRQUFROzRCQUFSLFFBQVE7b0JBQ0EsTUFBTSxRQUFRLFFBQVEsRUFBQyxNQUFRO3VCQUU5QixNQUFNOzs7O1lBR2YsR0FBVSxHQUFWLFVBQVU7NEJBQVYsVUFBVTtvQkFDRixVQUFVLFFBQVEsYUFBYSxJQUM3QixRQUFRLEdBQUssVUFBVSxDQUF2QixRQUFRO3VCQUVULFFBQVE7Ozs7WUFHakIsR0FBVSxHQUFWLFVBQVU7NEJBQVYsVUFBVTtvQkFDRixVQUFVLFFBQVEsYUFBYSxJQUM3QixLQUFLLEdBQUssVUFBVSxDQUFwQixLQUFLLEVBQ1AsT0FBTyxHQUFHLEtBQUssQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7dUJBRXBCLE9BQU87Ozs7WUFHaEIsR0FBWSxHQUFaLFlBQVk7NEJBQVosWUFBWTtvQkFDSixVQUFVLFFBQVEsYUFBYSxJQUMvQixTQUFTLEdBdENHLFVBQWEsU0FzQ0gsY0FBYyxDQUFDLFVBQVU7dUJBRTlDLFNB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