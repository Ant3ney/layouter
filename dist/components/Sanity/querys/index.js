"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryMainNav = exports.queryHomePage = exports.queryCurrentRoute = exports.default = void 0;

var _queryMainNav = _interopRequireDefault(require("./queryMainNav"));

var _queryCurrentRoute = _interopRequireDefault(require("./queryCurrentRoute"));

var _queryHomePage = _interopRequireDefault(require("./queryHomePage"));

var _QueryFormater = _interopRequireDefault(require("./QueryFormater"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: Change all querys to listeners
const queryMainNav = _queryMainNav.default;
exports.queryMainNav = queryMainNav;
const queryCurrentRoute = _queryCurrentRoute.default;
exports.queryCurrentRoute = queryCurrentRoute;
const queryHomePage = _queryHomePage.default;
exports.queryHomePage = queryHomePage;
var _default = _QueryFormater.default;
exports.default = _default;