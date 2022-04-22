"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LayouterProvider;
exports.layouterContext = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _routeStore = _interopRequireDefault(require("./routeStore"));

var _Sanity = require("./Sanity");

var _utilities = require("./utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const layouterContext = /*#__PURE__*/(0, _react.createContext)({});
exports.layouterContext = layouterContext;

function LayouterProvider(_ref) {
  let {
    children,
    options
  } = _ref;
  const {
    PUBLIC_API_KEY,
    dataset,
    Loading
  } = options;
  const [currentRoute, setCurrentRoute] = (0, _react.useState)(_routeStore.default.getState().currentLocation);
  const [client, setClient] = (0, _react.useState)(_Sanity.sanityStore.getState() ? _Sanity.sanityStore.getState().client : null);
  const [bodyKeys, setBodyKeys] = (0, _react.useState)(null);
  const [queriedBodyData, setQueriedBodyData] = (0, _react.useState)();
  const [nav, setNav] = (0, _react.useState)();
  const [currentSections, setCurrentSections] = (0, _react.useState)();
  let hasPathChanged = (0, _utilities.useHasChanged)(currentRoute);
  /* This is a React Hook that subscribes to the `sanityStore` and sets the `client` state to the
  `sanityStore`'s `client` state. */

  (0, _react.useEffect)(() => {
    const unsubClient = _Sanity.sanityStore.subscribe(() => {
      setClient(_Sanity.sanityStore.getState().client);
    });

    return () => {
      unsubClient();
    };
  }, [client]);
  (0, _react.useEffect)(() => {
    const unsubSanityStore = _Sanity.sanityStore.subscribe(async () => {
      /* Run inital setters in ths context */
      if (_Sanity.sanityStore.getState().client) {
        const navData = await (0, _Sanity.queryMainNav)();
        setNav(navData);
      }
    });

    _Sanity.sanityStore.dispatch({
      type: 'update client credentials',
      credentials: {
        PUBLIC_API_KEY,
        dataset
      }
    });

    return () => {
      unsubSanityStore();
    };
  }, []); //Syncs route state to store

  (0, _react.useEffect)(() => {
    const unsubRoute = _routeStore.default.subscribe(() => {
      setCurrentRoute(_routeStore.default.getState().currentLocation);
    });

    return () => {
      unsubRoute();
    };
  }, [currentRoute]);
  /* Route Dependencys syncronization */

  /* TODO: Add case handling for when the home page is not defined */

  (0, _react.useEffect)(() => {
    if (hasPathChanged) {
      (async () => {
        const queryFormater = new _Sanity.QueryFormater();
        const routeData = (await queryFormater.queryCurrentRoute(currentRoute)).getCurrentRouteData();
        const sectionsData = (await queryFormater).getCurrentRouteSectionArray();
        setCurrentSections(sectionsData);
        setQueriedBodyData(routeData);
        console.log('Detected route change.', 'sectionsData:', sectionsData, 'routeData:', routeData);
      })();
    }
  }, [hasPathChanged, currentRoute]); //#region Rendoring

  if (!_Sanity.sanityStore.getState()) {
    if (Loading) return /*#__PURE__*/_react.default.createElement(Loading, null);else return /*#__PURE__*/_react.default.createElement("div", null, "Loading");
  }

  const value = {
    client,
    options,
    currentSections,
    routeStore: _routeStore.default,
    nav,
    leftNav: nav.leftNavMenu,
    rightNav: nav.rightNavMenu
  };
  return /*#__PURE__*/_react.default.createElement(layouterContext.Provider, {
    value: value
  }, children); //#endregion
}