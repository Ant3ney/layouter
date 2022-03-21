"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LayouterProvider;
exports.layouterContext = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _routeStore = _interopRequireDefault(require("./routeStore"));

var _Sanity = require("./Sanity");

var _queryRoute = _interopRequireDefault(require("./Sanity/queryRoute"));

var _URL_to_map_keys = _interopRequireDefault(require("./Sanity/URL_to_map_keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const layouterContext = /*#__PURE__*/(0, _react.createContext)(null);
exports.layouterContext = layouterContext;

function LayouterProvider(_ref) {
  let {
    children,
    options
  } = _ref;
  const {
    PUBLIC_API_KEY
  } = options;
  const [currentRoute, setCurrentRoute] = (0, _react.useState)(_routeStore.default.getState().currentLocation);
  const [client, setClient] = (0, _react.useState)(_Sanity.sanityStore.getState() ? _Sanity.sanityStore.getState().client : null);
  const [bodyKeys, setBodyKeys] = (0, _react.useState)(null);
  let hasPathChanged = useHasChanged(currentRoute);
  (0, _react.useEffect)(() => {
    const unsubClient = _Sanity.sanityStore.subscribe(() => {
      setClient(_Sanity.sanityStore.getState().client);
    });

    return () => {
      unsubClient();
    };
  }, [client]);
  (0, _react.useEffect)(() => {
    _Sanity.sanityStore.dispatch({
      type: 'update client via PUBLIC_API_KEY',
      PUBLIC_API_KEY
    });
  }, []);
  (0, _react.useEffect)(() => {
    const unsubRoute = _routeStore.default.subscribe(() => {
      setCurrentRoute(_routeStore.default.getState().currentLocation);
    });

    return () => {
      unsubRoute();
    };
  }, [currentRoute]);
  (0, _react.useEffect)(() => {
    if (hasPathChanged) {
      console.log('Route change detected');
      console.log((0, _queryRoute.default)(currentRoute));
    }
  }, [hasPathChanged, currentRoute]);

  if (!_Sanity.sanityStore.getState()) {
    return /*#__PURE__*/_react.default.createElement("div", null, "Loading");
  }

  const value = {
    client,
    options
  };

  function useHasChanged(val) {
    const prevVal = usePrevious(val);
    return prevVal !== val;
  }

  function usePrevious(value) {
    const ref = (0, _react.useRef)();
    (0, _react.useEffect)(() => {
      ref.current = value;
    });
    return ref.current;
  }

  return /*#__PURE__*/_react.default.createElement(layouterContext.Provider, {
    value: value
  }, children);
}