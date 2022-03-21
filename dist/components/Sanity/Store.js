"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _createSanityClient = _interopRequireDefault(require("./createSanityClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reducer() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let newState = arguments.length > 1 ? arguments[1] : undefined;

  switch (newState.type) {
    case 'update client':
      state.client = newState.client;
      break;

    case 'update client via PUBLIC_API_KEY':
      state.client = (0, _createSanityClient.default)(newState.PUBLIC_API_KEY);
      break;

    default:
      console.log("No action defined for type: ".concat(newState.type));
  }

  return state;
}

var _default = (0, _redux.createStore)(reducer);

exports.default = _default;