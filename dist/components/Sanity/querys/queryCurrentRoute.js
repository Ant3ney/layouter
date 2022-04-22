"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _standardQueryRunner = _interopRequireDefault(require("./standardQueryRunner"));

var _queryHomePage = _interopRequireDefault(require("./queryHomePage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(currentRoute) {
  currentRoute = currentRoute || window.location.pathname;

  if (currentRoute === '/') {
    return (await (0, _queryHomePage.default)()).homePage;
  }

  const formatedRoute = currentRoute.split('/')[1];
  const query = "*[_type == \"page\" && slug.current == \"".concat(formatedRoute, "\"] {..., sections[]->}");
  return (0, _standardQueryRunner.default)(query, {
    noArray: true
  });
}