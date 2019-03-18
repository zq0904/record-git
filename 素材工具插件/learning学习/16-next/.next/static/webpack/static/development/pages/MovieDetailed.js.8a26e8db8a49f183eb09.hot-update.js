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
    styleId: "115738290",
    css: ".movie-detailed.jsx-115738290{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.movie-detailed.jsx-115738290 div.jsx-115738290:first-child{margin-top:10px;}.movie-detailed.jsx-115738290 div.jsx-115738290{display:block;margin-bottom:10px;padding-top:10px;width:400px;text-align:center;border:1px solid #ccc;}.movie-detailed.jsx-115738290 div.jsx-115738290 p.jsx-115738290:last-child{padding:10px;}.movie-detailed.jsx-115738290 div.jsx-115738290:hover{box-shadow:2px 2px 5px #ccc;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy96aGFvemhhb3FpL+S4quS6uui1hOaWmS/ntKDmnZDlt6Xlhbfmj5Lku7YvbGVhcm5pbmflrabkuaAvMTYtbmV4dC9wYWdlcy9Nb3ZpZURldGFpbGVkL2luZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPa0IsQUFHd0IsQUFLRyxBQUdGLEFBUUQsQUFHZSxhQUY5QixDQVJxQixFQUhyQixZQWNBLEtBVm1CLGlCQUNMLFlBQ00sWUFYSSxNQVlBLHNCQUN4QixrREFacUIsNkZBQ3JCIiwiZmlsZSI6Ii9Vc2Vycy96aGFvemhhb3FpL+S4quS6uui1hOaWmS/ntKDmnZDlt6Xlhbfmj5Lku7YvbGVhcm5pbmflrabkuaAvMTYtbmV4dC9wYWdlcy9Nb3ZpZURldGFpbGVkL2luZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb3ZpZSBmcm9tICcuLi8uLi9sYXlvdXRzL01vdmllLmpzeCdcbmltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLXVuZmV0Y2gnXG5cbmNvbnN0IE1vdmllRGV0YWlsZWQgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHtkZXRhaWxlZH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxNb3ZpZT5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLm1vdmllLWRldGFpbGVkIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAubW92aWUtZGV0YWlsZWQgZGl2OmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgICB9XG4gICAgICAgIC5tb3ZpZS1kZXRhaWxlZCBkaXYge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgICAgICAgd2lkdGg6IDQwMHB4O1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgICAgICB9XG4gICAgICAgIC5tb3ZpZS1kZXRhaWxlZCBkaXYgcDpsYXN0LWNoaWxkIHtcbiAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICB9XG4gICAgICAgIC5tb3ZpZS1kZXRhaWxlZCBkaXY6aG92ZXIge1xuICAgICAgICAgIGJveC1zaGFkb3c6IDJweCAycHggNXB4ICNjY2M7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm1vdmllLWRldGFpbGVkXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGltZyBzcmM9e2RldGFpbGVkLmltZ30gYWx0PXtkZXRhaWxlZC50aXRsZX0gLz5cbiAgICAgICAgICA8cD7kuIrmmKDml7bpl7TvvJp7ZGV0YWlsZWQuZGV0YWlsZWRbMF0ueWVhcn08L3A+XG4gICAgICAgICAgPHA+55S15b2x5ZCN56ew77yae2RldGFpbGVkLnRpdGxlfTwvcD5cbiAgICAgICAgICA8cD7nlLXlvbHnsbvlnovvvJp7ZGV0YWlsZWQuZ2VucmVzLmpvaW4oJywnKX08L3A+XG4gICAgICAgICAgPHA+55S15b2x6K+E5YiG77yae2RldGFpbGVkLnJhdGluZ308L3A+XG4gICAgICAgICAgPHA+55S15b2x5o+P6L+w77yae2RldGFpbGVkLmRldGFpbGVkWzBdLnN1bW1hcnl9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8L01vdmllPlxuICApXG59XG5cbk1vdmllRGV0YWlsZWQuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKHtxdWVyeToge3R5cGUsIGlkfX0pID0+IHtcbiAgY29uc3QgZGV0YWlsZWQgPSBhd2FpdCBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTozMzAxLyR7dHlwZX0vJHtpZH0/X2VtYmVkPWRldGFpbGVkYCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgcmV0dXJuIHtkZXRhaWxlZH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW92aWVEZXRhaWxlZCJdfQ== */\n/*@ sourceURL=/Users/zhaozhaoqi/\u4E2A\u4EBA\u8D44\u6599/\u7D20\u6750\u5DE5\u5177\u63D2\u4EF6/learning\u5B66\u4E60/16-next/pages/MovieDetailed/index.jsx */"
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", {
    className: "jsx-115738290" + " " + "movie-detailed"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "jsx-115738290"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: detailed.img,
    alt: detailed.title,
    className: "jsx-115738290"
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "jsx-115738290"
  }, "\u4E0A\u6620\u65F6\u95F4\uFF1A", detailed.detailed[0].year), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "jsx-115738290"
  }, "\u7535\u5F71\u540D\u79F0\uFF1A", detailed.title), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "jsx-115738290"
  }, "\u7535\u5F71\u7C7B\u578B\uFF1A", detailed.genres.join(',')), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "jsx-115738290"
  }, "\u7535\u5F71\u8BC4\u5206\uFF1A", detailed.rating), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "jsx-115738290"
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
//# sourceMappingURL=MovieDetailed.js.8a26e8db8a49f183eb09.hot-update.js.map