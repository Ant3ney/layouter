"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryMainNav = exports.queryHomePage = exports.queryCurrentRoute = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.promise.js");

var _Store = _interopRequireDefault(require("../Store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queryMainNav = () => {
  const query = '*[_type == "mainNav"] {..., leftNavMenu->{..., navItems[]->}, rightNavMenu->{..., navItems[]->}}';
  return standardQueryRunner(query, {
    noArray: true
  });
};

exports.queryMainNav = queryMainNav;

const queryCurrentRoute = currentRoute => {
  if (currentRoute === '/') return queryHomePage();
  const formatedRoute = currentRoute.split('/')[1];
  const query = "*[_type == \"page\" && slug.current == \"".concat(formatedRoute, "\"] {...}");
  return standardQueryRunner(query, {
    noArray: true
  });
};

exports.queryCurrentRoute = queryCurrentRoute;

const queryHomePage = currentRoute => {
  const query = '*[_type == "homePage"] {..., homePage->}';
  return standardQueryRunner(query, {
    noArray: true
  });
};

exports.queryHomePage = queryHomePage;

function standardQueryRunner(query, settings) {
  const client = _Store.default.getState().client;

  return new Promise((res, rej) => {
    if (client) client.fetch(query).then(response => {
      if (settings.noArray) res(response[0]);else res(response);
    }).catch(err => {
      rej(err);
    });else rej({
      message: 'Sanity client was not defined in query funtion'
    });
  });
}