'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var pt = _interopDefault(require('prop-types'));

var StateContext = React.createContext({
  state: {}
});

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var proxifyRecursive = function proxifyRecursive(obj, handler) {
  var mapped = Object.keys(obj).reduce(function (acc, key) {
    var val = obj[key];

    if (_typeof(val) === "object") {
      val = proxifyRecursive(val, handler);
    }

    acc[key] = val;
    return acc;
  }, new obj.constructor());
  return new Proxy(mapped, handler);
};

var ProxyListener = /*#__PURE__*/function () {
  function ProxyListener() {
    _classCallCheck(this, ProxyListener);

    _defineProperty(this, "listeners", []);
  }

  _createClass(ProxyListener, [{
    key: "addListener",
    value: function addListener(func) {
      this.listeners.push(func);
    }
  }, {
    key: "removeListener",
    value: function removeListener(func) {
      var funcIndex = this.listeners.indexOf(func);

      if (funcIndex > -1) {
        this.listeners.splice(funcIndex, 1);
      }
    }
  }, {
    key: "emit",
    value: function emit() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.listeners.every(function (listener) {
        return listener.apply(void 0, args);
      });
    }
  }]);

  return ProxyListener;
}();

var getProxyHandler = function getProxyHandler(listener) {
  return {
    set: function set(obj, prop, value) {
      var currentValue = obj[prop];
      obj[prop] = value;
      var shouldUpdate = listener.emit({
        obj: obj,
        prop: prop,
        value: value
      });

      if (!shouldUpdate) {
        obj[prop] = currentValue;
      }

      return true;
    }
  };
};

var StateProvider = function StateProvider(_ref) {
  var initialState = _ref.initialState,
      middleware = _ref.middleware,
      children = _ref.children;
  var listener = new ProxyListener();

  if (middleware.length) {
    middleware.forEach(function (mw) {
      return listener.addListener(mw);
    });
  }

  var proxiedState = proxifyRecursive(initialState, getProxyHandler(listener));
  return /*#__PURE__*/React__default.createElement(StateContext.Provider, {
    value: {
      state: proxiedState,
      listener: listener
    }
  }, children);
};

StateProvider.propTypes = {
  initialState: pt.object.isRequired,
  children: pt.node.isRequired,
  middleware: pt.arrayOf(pt.func)
};
StateProvider.defaultProps = {
  middleware: []
};

var stringify = (function (item) {
  return _typeof(item) === "object" ? JSON.stringify(item) : item;
});

var defaultSelector = function defaultSelector(state) {
  return state;
};

var useRps = (function () {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSelector;

  var _useContext = React.useContext(StateContext),
      state = _useContext.state,
      listener = _useContext.listener;

  var selectedState = selector(state);

  var _useState = React.useState(stringify(selectedState)),
      _useState2 = _slicedToArray(_useState, 2),
      lastStringValue = _useState2[0],
      setLastStringValue = _useState2[1];

  React.useEffect(function () {
    var handler = function handler() {
      var stringifiedMemo = stringify(selectedState);

      if (lastStringValue.current !== stringifiedMemo) {
        setLastStringValue(stringifiedMemo);
      }

      return true;
    };

    listener.addListener(handler);
    return function () {
      return listener.removeListener(handler);
    };
  }, []);
  return selectedState;
});

var useEffectObj = (function (fn) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return React.useEffect(fn, deps.map(function (d) {
    return stringify(d);
  }));
});

exports.StateProvider = StateProvider;
exports.useEffectObj = useEffectObj;
exports.useRps = useRps;
