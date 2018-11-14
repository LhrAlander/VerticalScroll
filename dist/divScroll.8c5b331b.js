// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js\\polyfill.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var $ = exports.$ = function $(selector) {
  return document.querySelector(selector);
};
var applyStyle = exports.applyStyle = function applyStyle(el, styleMedia) {
  for (var i in styleMedia) {
    el.style[i] = styleMedia[i];
  }
};
var ensureNumber = exports.ensureNumber = function ensureNumber(n) {
  return typeof n === 'number' && !isNaN(n);
};
// 确保存在 requestAnimationFrame 和 cancelAnimationFrame 存在
var lastTime = 0;
var vendors = ['webkit', 'moz', 'ms', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}
},{}],"js\\divScroll.js":[function(require,module,exports) {
'use strict';

var _polyfill = require('./polyfill');

function CountScroll(options) {
  this.targetVal = null;
  // 初始化需要的参数
  this.options = {
    el: null,
    currentVal: 1,
    size: 10,
    duration: 500
    // 显示区域的大小存储
  };this.itemSize = {
    width: 0,
    height: 0
    // 涉及到的 HTML Element
  };this.el = {
    wrapperEl: null,
    firstWrapper: null,
    secondWrapper: null
    // 滚动所需的一系列参数
  };this.scrollOp = {
    startTime: null,
    targetST: null,
    currentST: null
    // 报错信息提示
  };Object.defineProperty(this, 'error', {
    set: function set(error) {
      console.error(error);
    }
  });
  this._init_(options);
}

/**
 * 画出两个竖直排列的 div，同时将位置移至当前数值位置
 * @param{配置项} options
 */
CountScroll.prototype._init_ = function (options) {
  if (typeof options.el !== 'string') {
    this.error = 'typeError: \'el\' is not a string';
    return;
  }
  var parentEl = (0, _polyfill.$)(options.el);
  if (!parentEl) {
    this.error = 'el not founded: can not find a element by selector \'' + options.el + '\'';
    return;
  }
  parentEl.childNodes.forEach(function (node) {
    console.log(node);
    parentEl.removeChild(node);
  });
  var styleItems = {
    display: 'flex',
    'flex-direction': 'column',
    'overflow': 'auto'
  };
  (0, _polyfill.applyStyle)(parentEl, styleItems);
  this.options.el = parentEl;
  this.options.currentVal = options.currentVal >= 0 ? options.currentVal : this.options.currentVal;
  this.options.currentVal = options.size >= 0 ? options.currentVal : this.options.currentVal;
  this.options.duration = options.size >= 0 ? options.duration : this.options.duration;
  var wrapperEl = document.createElement('div');
  var firstWrapper = document.createElement('div');
  styleItems = {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  };
  (0, _polyfill.applyStyle)(wrapperEl, styleItems);
  // 单个框的宽高
  this.itemSize = {
    width: parentEl.getBoundingClientRect().width,
    height: parentEl.getBoundingClientRect().height
  };
  styleItems = {
    display: 'block',
    width: '100%',
    height: '100px',
    'flex-shrink': '0'
  };
  for (var i = 0, length = this.options.size; i < length; i++) {
    var item = document.createElement('div');
    (0, _polyfill.applyStyle)(item, styleItems);
    item.innerHTML = i;
    firstWrapper.appendChild(item);
  }
  var secondWrapper = firstWrapper.cloneNode(true);
  wrapperEl.appendChild(firstWrapper);
  wrapperEl.appendChild(secondWrapper);
  parentEl.appendChild(wrapperEl);
  this.el.wrapperEl = wrapperEl;
  this.el.firstWrapper = firstWrapper;
  this.el.secondWrapper = secondWrapper;
  wrapperEl.scrollTop = this.options.currentVal * this.itemSize.height;
};

/**
 * 设置滚动结束点
 */
CountScroll.prototype.setTargetVal = function (val) {
  if (!(0, _polyfill.ensureNumber)(val)) {
    this.error = 'typeError: target value is not a number';
    return;
  }
  this.targetVal = val;
  this.scrollOp.lastTime = null;
  this.scrollOp.startTime = null;
  this.scrollOp.targetST = (this.options.size + val) * this.itemSize.height;
  this.scrollOp.currentST = this.el.wrapperEl.scrollTop;
  return this;
};

/**
 * 开始滚动
 */
CountScroll.prototype.startScroll = function (cb) {
  var _this = this;

  console.log(this);
  if (!this.options.el) return;
  var animationFn = function animationFn(timeStamp) {
    if (!_this.scrollOp.startTime) _this.scrollOp.startTime = timeStamp;
    if (_this.el.wrapperEl.scrollTop >= _this.scrollOp.targetST) {
      _this.el.wrapperEl.scrollTop = _this.scrollOp.targetST - _this.options.size * _this.itemSize.height;
      cancelAnimationFrame(_this.rAF);
      if (cb && typeof cb === 'function') cb();
    } else {
      var progress = timeStamp - _this.scrollOp.startTime;
      var delta = (_this.scrollOp.targetST - _this.scrollOp.currentST) * progress / _this.options.duration;
      _this.el.wrapperEl.scrollTop = delta + _this.scrollOp.currentST;
      requestAnimationFrame(animationFn);
    }
  };
  this.rAF = requestAnimationFrame(animationFn);
};
},{"./polyfill":"js\\polyfill.js"}],"C:\\Users\\Alander\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '64411' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:\\Users\\Alander\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","js\\divScroll.js"], null)
//# sourceMappingURL=/divScroll.8c5b331b.map