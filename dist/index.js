'use strict';

require('babel-core/polyfill');
global.log = require('./util.js');

function sleepRandom(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time * 1e3, 0 | Math.random() * 1e3);
  });
}

log('Run'); // => Run
sleepRandom(5).then(function (result) {
  log(result); // => 869, after 5 sec.
  return sleepRandom(10);
}).then(function (result) {
  log(result); // => 202, after 10 sec.
}).then(function () {
  log('immediately after'); // => immediately after

  //other promises
  log('new Promise');
  var p = sleepRandom(3).then(function () {
    log('wait...');
    return sleepRandom(5);
  }).then(function () {
    log('Error -> catch');
    throw new Error("hmm");
  })['catch'](function (err) {
    log('returns a promise that resolves when all of the promises in the iterable argument have resolved.');
    return Promise.all([sleepRandom(4), sleepRandom(7)]).then(function () {
      log('all OK, bye');
    });
  });

  throw Error('Irror!');
}).then(function () {
  log('will not be displayed');
})['catch'](log); // => => Error: Irror!