"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = View;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _Provider = require("../Provider");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function View() {
  const {
    client,
    currentSections,
    options
  } = (0, _react.useContext)(_Provider.layouterContext);
  console.log(currentSections, options);

  if (!currentSections || !options || !options.sectionMap) {
    return /*#__PURE__*/_react.default.createElement("div", null, "Loading");
  }

  return /*#__PURE__*/_react.default.createElement("div", null, currentSections.map((currentSection, i) => {
    const currentComponentSectionMapData = options.sectionMap.find(section => {
      return currentSection._type === section.section;
    });
    if (!currentComponentSectionMapData) return /*#__PURE__*/_react.default.createElement("div", null, "No Components found for this route");
    const CurrentComponent = currentComponentSectionMapData.component;
    const props = currentSection;
    return /*#__PURE__*/_react.default.createElement(CurrentComponent, _extends({}, props, {
      key: i
    }));
  }), "This is the layouter body");
}