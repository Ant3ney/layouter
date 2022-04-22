"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = standardQueryRunner;

require("core-js/modules/es.promise.js");

var _Store = _interopRequireDefault(require("../Store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function standardQueryRunner(query, settings) {
  const client = _Store.default.getState().client;

  return new Promise((res, rej) => {
    if (client) client.fetch(query).then(response => {
      console.log(response);
      if (settings.noArray) res(response[0]);else res(response);
    }).catch(err => {
      rej(err);
    });else rej({
      message: 'Sanity client was not defined in query funtion'
    });
  });
}