"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const sanityClient = require('@sanity/client');

function CreateSanityClient(PUBLIC_API_KEY) {
  return sanityClient({
    projectId: PUBLIC_API_KEY,
    dataset: 'production',
    apiVersion: '2021-03-25',
    // use current UTC date - see "specifying API version"!
    useCdn: true // `false` if you want to ensure fresh data

  });
}

var _default = CreateSanityClient;
exports.default = _default;