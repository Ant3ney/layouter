"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _queryCurrentRoute = _interopRequireDefault(require("./queryCurrentRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class QueryFormater {
  constructor(query) {
    this.query = query;
  } //TODO: Create a run query function in class.

  /**
   * It queries the current route data.
   * @returns queryFormater.
   */


  async queryCurrentRoute() {
    const currentRouteData = await (0, _queryCurrentRoute.default)();
    this.currentRouteData = currentRouteData;
    return this;
  }
  /**
   * Get the current route data
   * @returns The current route data.
   */


  getCurrentRouteData() {
    return this.currentRouteData;
  }
  /**
   * Get the current route section array keys
   * @returns An array of the keys of the sections in the current route.
   */


  getCurrentRouteSectionArray() {
    const currentRouteData = this.currentRouteData;
    if (!currentRouteData || !currentRouteData.sections) return (() => {
      console.error('In order to call get section array keys, you must make sure this.currentRouteData and this.currentRouteData.sections is defined');
      return 'Error';
    })();
    return this.currentRouteData.sections;
  }

}

exports.default = QueryFormater;