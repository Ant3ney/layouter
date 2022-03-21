"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

function routeStoreReducer() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    currentLocation: window.location.pathname
  };
  let newState = arguments.length > 1 ? arguments[1] : undefined;

  switch (newState.type) {
    case 'updateCurrentLocation':
      //TODO: Fix this function so that the back button actualy works
      window.history.pushState({}, 'Site navigation', newState.currentLocation);
      state.currentLocation = newState.currentLocation;
      break;

    default:
      break;
  }

  return state;
}

var _default = (0, _redux.createStore)(routeStoreReducer);

exports.default = _default;