module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/MovieHeader.jsx":
/*!************************************!*\
  !*** ./components/MovieHeader.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "next/link");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
    className: "jsx-314368997" + " " + "movie-header"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "314368997",
    css: ".movie-header.jsx-314368997 ul.jsx-314368997{position:fixed;top:0;left:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;height:70px;line-height:70px;}.movie-header.jsx-314368997 ul.jsx-314368997 li.jsx-314368997{-webkit-flex:1;-ms-flex:1;flex:1;text-align:center;background-color:#1A2634;border-left:1px solid #fff;}.movie-header.jsx-314368997 ul.jsx-314368997 li.jsx-314368997 a.jsx-314368997{display:block;width:100%;height:100%;font-size:24px;color:#fff;}.movie-header.jsx-314368997 ul.jsx-314368997 li.jsx-314368997:first-child{border-left:0 none;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy96aGFvemhhb3FpL+S4quS6uui1hOaWmS/ntKDmnZDlt6Xlhbfmj5Lku7YvbGVhcm5pbmflrabkuaAvMTYtbmV4dC9jb21wb25lbnRzL01vdmllSGVhZGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJZ0IsQUFHd0IsQUFTUixBQU1PLEFBT0ssY0FOUixDQWZMLElBc0JSLEVBckJTLElBZUssR0FkQyxLQU9LLElBUUgsY0FQVSxDQVFkLFdBQ2IsYUFSNkIsMEJBUmhCLENBU2IsVUFSYyxZQUNLLGlCQUNuQiIsImZpbGUiOiIvVXNlcnMvemhhb3poYW9xaS/kuKrkurrotYTmlpkv57Sg5p2Q5bel5YW35o+S5Lu2L2xlYXJuaW5n5a2m5LmgLzE2LW5leHQvY29tcG9uZW50cy9Nb3ZpZUhlYWRlci5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IChcbiAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibW92aWUtaGVhZGVyXCI+XG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgLm1vdmllLWhlYWRlciB1bCB7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiA3MHB4O1xuICAgICAgICBsaW5lLWhlaWdodDogNzBweDtcbiAgICAgIH1cbiAgICAgIC5tb3ZpZS1oZWFkZXIgdWwgbGkge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxQTI2MzQ7XG4gICAgICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2ZmZjtcbiAgICAgIH1cbiAgICAgIC5tb3ZpZS1oZWFkZXIgdWwgbGkgYSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgfVxuICAgICAgLm1vdmllLWhlYWRlciB1bCBsaTpmaXJzdC1jaGlsZCB7XG4gICAgICAgIGJvcmRlci1sZWZ0OiAwIG5vbmU7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICAgIDx1bD5cbiAgICAgIDxsaT5cbiAgICAgICAgPExpbmsgaHJlZj1cIi9Nb3ZpZT90eXBlPW9ubGluZVRoZWF0ZXJcIj48YT7mraPlnKjng63mmKA8L2E+PC9MaW5rPlxuICAgICAgPC9saT5cbiAgICAgIDxsaT5cbiAgICAgICAgPExpbmsgaHJlZj1cIi9Nb3ZpZT90eXBlPXVwY29taW5nXCI+PGE+5Y2z5bCG5LiK5pigPC9hPjwvTGluaz5cbiAgICAgIDwvbGk+XG4gICAgICA8bGk+XG4gICAgICAgIDxMaW5rIGhyZWY9XCIvTW92aWU/dHlwZT10b3AyNTBcIj48YT50b3AyNTA8L2E+PC9MaW5rPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L3NlY3Rpb24+XG4pIl19 */\n/*@ sourceURL=/Users/zhaozhaoqi/\u4E2A\u4EBA\u8D44\u6599/\u7D20\u6750\u5DE5\u5177\u63D2\u4EF6/learning\u5B66\u4E60/16-next/components/MovieHeader.jsx */"
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "jsx-314368997"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "jsx-314368997"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/Movie?type=onlineTheater"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: "jsx-314368997"
  }, "\u6B63\u5728\u70ED\u6620"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "jsx-314368997"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/Movie?type=upcoming"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: "jsx-314368997"
  }, "\u5373\u5C06\u4E0A\u6620"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "jsx-314368997"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/Movie?type=top250"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: "jsx-314368997"
  }, "top250")))));
});

/***/ }),

/***/ "./layouts/Movie.jsx":
/*!***************************!*\
  !*** ./layouts/Movie.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_MovieHeader_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/MovieHeader.jsx */ "./components/MovieHeader.jsx");


/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      paddingTop: '70px'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_MovieHeader_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null), props.children);
});

/***/ }),

/***/ "./pages/MovieDetailed/index.jsx":
/*!***************************************!*\
  !*** ./pages/MovieDetailed/index.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _layouts_Movie_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../layouts/Movie.jsx */ "./layouts/Movie.jsx");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! isomorphic-unfetch */ "isomorphic-unfetch");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__);




function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var MovieDetailed = function MovieDetailed(props) {
  var detailed = props.detailed;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_layouts_Movie_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    styleId: "284980063",
    css: ".movie-detailed.jsx-284980063{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.movie-detailed.jsx-284980063 div.jsx-284980063:first-child{margin-top:10px;}.movie-detailed.jsx-284980063 div.jsx-284980063{display:block;margin-bottom:10px;paddingTop:10px;width:400px;text-align:center;border:1px solid #ccc;}.movie-detailed.jsx-284980063 div.jsx-284980063 p.jsx-284980063:last-child{padding:10px;}.movie-detailed.jsx-284980063 div.jsx-284980063:hover{box-shadow:2px 2px 5px #ccc;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy96aGFvemhhb3FpL+S4quS6uui1hOaWmS/ntKDmnZDlt6Xlhbfmj5Lku7YvbGVhcm5pbmflrabkuaAvMTYtbmV4dC9wYWdlcy9Nb3ZpZURldGFpbGVkL2luZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPa0IsQUFHd0IsQUFLRyxBQUdGLEFBUUQsQUFHZSxhQUY5QixDQVJxQixFQUhyQixZQWNBLEtBVmtCLGdCQUNKLFlBQ00sYUFYSSxLQVlBLHNCQUN4QixtREFacUIsNkZBQ3JCIiwiZmlsZSI6Ii9Vc2Vycy96aGFvemhhb3FpL+S4quS6uui1hOaWmS/ntKDmnZDlt6Xlhbfmj5Lku7YvbGVhcm5pbmflrabkuaAvMTYtbmV4dC9wYWdlcy9Nb3ZpZURldGFpbGVkL2luZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb3ZpZSBmcm9tICcuLi8uLi9sYXlvdXRzL01vdmllLmpzeCdcbmltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLXVuZmV0Y2gnXG5cbmNvbnN0IE1vdmllRGV0YWlsZWQgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHtkZXRhaWxlZH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxNb3ZpZT5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLm1vdmllLWRldGFpbGVkIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAubW92aWUtZGV0YWlsZWQgZGl2OmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgICB9XG4gICAgICAgIC5tb3ZpZS1kZXRhaWxlZCBkaXYge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgICAgcGFkZGluZ1RvcDogMTBweDtcbiAgICAgICAgICB3aWR0aDogNDAwcHg7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gICAgICAgIH1cbiAgICAgICAgLm1vdmllLWRldGFpbGVkIGRpdiBwOmxhc3QtY2hpbGQge1xuICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLm1vdmllLWRldGFpbGVkIGRpdjpob3ZlciB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMnB4IDJweCA1cHggI2NjYztcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibW92aWUtZGV0YWlsZWRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aW1nIHNyYz17ZGV0YWlsZWQuaW1nfSBhbHQ9e2RldGFpbGVkLnRpdGxlfSAvPlxuICAgICAgICAgIDxwPuS4iuaYoOaXtumXtO+8mntkZXRhaWxlZC5kZXRhaWxlZFswXS55ZWFyfTwvcD5cbiAgICAgICAgICA8cD7nlLXlvbHlkI3np7DvvJp7ZGV0YWlsZWQudGl0bGV9PC9wPlxuICAgICAgICAgIDxwPueUteW9seexu+Wei++8mntkZXRhaWxlZC5nZW5yZXMuam9pbignLCcpfTwvcD5cbiAgICAgICAgICA8cD7nlLXlvbHor4TliIbvvJp7ZGV0YWlsZWQucmF0aW5nfTwvcD5cbiAgICAgICAgICA8cD7nlLXlvbHmj4/ov7DvvJp7ZGV0YWlsZWQuZGV0YWlsZWRbMF0uc3VtbWFyeX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvTW92aWU+XG4gIClcbn1cblxuTW92aWVEZXRhaWxlZC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoe3F1ZXJ5OiB7dHlwZSwgaWR9fSkgPT4ge1xuICBjb25zdCBkZXRhaWxlZCA9IGF3YWl0IGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjMzMDEvJHt0eXBlfS8ke2lkfT9fZW1iZWQ9ZGV0YWlsZWRgKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICByZXR1cm4ge2RldGFpbGVkfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb3ZpZURldGFpbGVkIl19 */\n/*@ sourceURL=/Users/zhaozhaoqi/\u4E2A\u4EBA\u8D44\u6599/\u7D20\u6750\u5DE5\u5177\u63D2\u4EF6/learning\u5B66\u4E60/16-next/pages/MovieDetailed/index.jsx */"
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", {
    className: "jsx-284980063" + " " + "movie-detailed"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "jsx-284980063"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: detailed.img,
    alt: detailed.title,
    className: "jsx-284980063"
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "jsx-284980063"
  }, "\u4E0A\u6620\u65F6\u95F4\uFF1A", detailed.detailed[0].year), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "jsx-284980063"
  }, "\u7535\u5F71\u540D\u79F0\uFF1A", detailed.title), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "jsx-284980063"
  }, "\u7535\u5F71\u7C7B\u578B\uFF1A", detailed.genres.join(',')), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "jsx-284980063"
  }, "\u7535\u5F71\u8BC4\u5206\uFF1A", detailed.rating), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "jsx-284980063"
  }, "\u7535\u5F71\u63CF\u8FF0\uFF1A", detailed.detailed[0].summary))));
};

MovieDetailed.getInitialProps =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
    var _ref$query, type, id, detailed;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$query = _ref.query, type = _ref$query.type, id = _ref$query.id;
            _context.next = 3;
            return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default()("http://127.0.0.1:3301/".concat(type, "/").concat(id, "?_embed=detailed")).then(function (res) {
              return res.json();
            });

          case 3:
            detailed = _context.sent;
            return _context.abrupt("return", {
              detailed: detailed
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (MovieDetailed);

/***/ }),

/***/ 4:
/*!*********************************************!*\
  !*** multi ./pages/MovieDetailed/index.jsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/MovieDetailed/index.jsx */"./pages/MovieDetailed/index.jsx");


/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "isomorphic-unfetch":
/*!*************************************!*\
  !*** external "isomorphic-unfetch" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "next/link":
/*!****************************!*\
  !*** external "next/link" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=MovieDetailed.js.map