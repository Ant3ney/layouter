"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queryHomePage;

var _standardQueryRunner = _interopRequireDefault(require("./standardQueryRunner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function queryHomePage(currentRoute) {
  const query = '*[_type == "homePage"] {..., homePage-> {..., sections[]->}}';
  return (0, _standardQueryRunner.default)(query, {
    noArray: true
  });
}