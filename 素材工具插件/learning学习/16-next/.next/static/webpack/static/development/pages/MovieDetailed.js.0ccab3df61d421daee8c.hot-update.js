webpackHotUpdate("static/development/pages/MovieDetailed.js",{

/***/ "./pages/MovieDetailed/index.jsx":
/*!***************************************!*\
  !*** ./pages/MovieDetailed/index.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _layouts_Movie_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../layouts/Movie.jsx */ "./layouts/Movie.jsx");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
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
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/MovieDetailed")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=MovieDetailed.js.0ccab3df61d421daee8c.hot-update.js.map