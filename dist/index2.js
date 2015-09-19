'use strict';

var _this = this;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

require('babel-core/polyfill');

function log(txt) {
  console.log(txt);
}

var delay = function delay(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
};

function sleepRandom(time) {
  return regeneratorRuntime.async(function sleepRandom$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(delay(time * 1e3));

      case 2:
        return context$1$0.abrupt('return', 0 | Math.random() * 1e3);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};
function sleepError(time, msg) {
  return regeneratorRuntime.async(function sleepError$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(delay(time * 1e3));

      case 2:
        throw Error(msg);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

(function callee$0$0() {
  var _ref, _ref2, a, b, c;

  return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        log('Run'); // => Run
        context$1$0.next = 4;
        return regeneratorRuntime.awrap(sleepRandom(5));

      case 4:
        context$1$0.t0 = context$1$0.sent;
        log(context$1$0.t0);
        context$1$0.next = 8;
        return regeneratorRuntime.awrap(Promise.all([sleepRandom(5), sleepRandom(15), sleepRandom(10)]));

      case 8:
        _ref = context$1$0.sent;
        _ref2 = _slicedToArray(_ref, 3);
        a = _ref2[0];
        b = _ref2[1];
        c = _ref2[2];

        log(a, b, c); // => 210 445 71, after 15 sec.
        context$1$0.next = 16;
        return regeneratorRuntime.awrap(sleepError(5, 'Irror!'));

      case 16:
        log('Will not be displayed');
        context$1$0.next = 22;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t1 = context$1$0['catch'](0);

        log(context$1$0.t1); // => Error: 'Irror!', after 5 sec.

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[0, 19]]);
})();
// => 936, after 5 sec.