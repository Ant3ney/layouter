"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queryMainNav;

var _standardQueryRunner = _interopRequireDefault(require("./standardQueryRunner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function queryMainNav() {
  const query = '*[_type == "mainNav"] {..., leftNavMenu->{..., navItems[]->{..., navContent->, subNavItems[]->{..., navContent->}}}, rightNavMenu->{..., navItems[]->{..., navContent->, subNavItems[]->{..., navContent->}}}}';
  return (0, _standardQueryRunner.default)(query, {
    noArray: true
  });
}