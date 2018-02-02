/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _functions = __webpack_require__(1);

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.onload = function () {

    var trunk = {
        "Item 1": 1,
        "Item 2": {
            "Item 2.1": "blue",
            "Item 2.2": 1,
            "Item 2.3": {
                "Item 2.3.1": 1,
                "Item 2.3.2": "green"
            }
        },
        "Item 3": 2,
        "Item 4": 'red',
        "Item 5": _defineProperty({
            "Item 5.1": 1,
            "Item 5.2": {
                "Item 5.2.1": "color",
                "Item 5.2.2": "tree",
                "Item 5.2.3": 1
            },
            "Item 5.3": "apple",
            "Item 5.4": {
                "Item 5.3.1": 1,
                "Item 5.3.2": "background",
                "Item 5.3.3": {
                    "Item 5.3.3.1": "road",
                    "Item 5.3.3.2": "track",
                    "Item 5.3.3.3": 1
                }
            }
        }, "Item 5.4", [1, 9, 4, 5, 1]),
        "Item 6": {
            "Item 6.1": "january",
            "Item 6.2": "may",
            "Item 6.3": {
                "Item 6.3.1": 34,
                "Item 6.3.2": 4,
                "Item 6.3.3": 15
            }
        },
        "Item7": {
            "Item 7.1": "global",
            "Item 7.2": 1,
            "Item 7.3": {
                "Item 7.3.1": "video",
                "Item 7.3.2": {
                    "Item 7.3.2.1": 1
                },
                "Item 7.3.3": 3,
                "Item 7.3.4": {
                    "Item 7.3.4.1": 1
                }
            }
        }
    };

    /* Задание 1 */
    _functions2.default.getValue1(trunk);

    /* Задание 2 */
    var el = document.getElementById('treeBlock');
    _functions2.default.renderTree(trunk, el);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Задание 1: вывод путей свойств дерева со значением '1' */
function getValue1(tree) {
    var curPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var prop = void 0;var prevPath = void 0;
    for (prop in tree) {
        if (tree[prop] === 1) {
            console.log(tree[prop], curPath + prop);
        }

        if (Array.isArray(tree[prop])) {
            for (var i = 0; i < tree[prop].length; i++) {
                if (tree[prop][i] === 1) {
                    console.log(tree[prop][i], curPath + i);
                }
            }

            continue;
        }

        if (_typeof(tree[prop]) === 'object') {
            prevPath = curPath;
            curPath += prop + ' > ';
            getValue1(tree[prop], curPath);
            curPath = prevPath;
        }
    }
}

/* Задание 2: рендеринг дерева */
function renderTree(tree, el) {
    var prop = void 0;
    for (prop in tree) {
        var div = document.createElement('div');

        if (_typeof(tree[prop]) !== 'object') {
            div.innerText = tree[prop];

            if (tree[prop] === 1) div.style.background = '#ccc';

            el.appendChild(div);
        } else {
            if (Array.isArray(tree[prop])) {
                for (var i = 0; i < tree[prop].length; i++) {
                    var _div = document.createElement('div');

                    if (tree[prop][i] === 1) _div.style.background = '#ccc';

                    _div.innerText = tree[prop][i];
                    el.appendChild(_div);
                }

                continue;
            }

            el.appendChild(div);
            renderTree(tree[prop], div);
        }
    }
}

exports.default = {
    getValue1: getValue1,
    renderTree: renderTree
};

/***/ })
/******/ ]);