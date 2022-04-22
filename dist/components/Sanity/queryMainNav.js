"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queryRoute;

var _Store = _interopRequireDefault(require("./Store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function queryRoute(currentRoute) {
  const client = _Store.default.getState().client;

  const query = '*[_type == "mainNav"] {..., leftNavMenu->{..., navItems[]->}, rightNavMenu->{..., navItems[]->}}';
  client.fetch(query).then(mainNavs => {
    mainNavs.forEach(mainNav => {
      console.log(mainNav);
    });
  });
  return client;
}