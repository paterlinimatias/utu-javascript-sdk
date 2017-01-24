"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var diverted = {};

var getDivertedKey = function getDivertedKey(platform, platformId) {
  return platform + "-" + platformId;
};

var divert = exports.divert = function divert(platform, platformId) {
  var divertUser = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (divertUser) {
    diverted[getDivertedKey(platform, platformId)] = divertUser;
  } else {
    delete diverted[getDivertedKey(platform, platformId)];
  }
};

var isDiverted = exports.isDiverted = function isDiverted(platform, platformId) {
  return !!diverted[getDivertedKey(platform, platformId)];
};