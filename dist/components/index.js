"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.Landing = exports.Body = void 0;

var _react = _interopRequireDefault(require("react"));

var _Landing = _interopRequireDefault(require("./Landing"));

var _Provider = _interopRequireDefault(require("./Provider"));

var _Body = _interopRequireDefault(require("./Body"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Landing = _Landing.default;
exports.Landing = Landing;
const Provider = _Provider.default;
exports.Provider = Provider;
const Body = _Body.default;
exports.Body = Body;