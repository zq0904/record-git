webpackHotUpdate("static/development/pages/Movie.js",{

/***/ "./pages/Movie/index.jsx":
/*!*******************************!*\
  !*** ./pages/Movie/index.jsx ***!
  \*******************************/
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
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _layouts_Movie_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../layouts/Movie.jsx */ "./layouts/Movie.jsx");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/head */ "./node_modules/next/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_7__);



function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var MovieHome =
/*#__PURE__*/
function (_Component) {
  _inherits(MovieHome, _Component);

  function MovieHome() {
    _classCallCheck(this, MovieHome);

    return _possibleConstructorReturn(this, _getPrototypeOf(MovieHome).apply(this, arguments));
  }

  _createClass(MovieHome, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          movieList = _this$props.movieList,
          router = _this$props.router;
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_layouts_Movie_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
        styleId: "3751287040",
        css: ".movie-type.jsx-3751287040{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.movie-type.jsx-3751287040 a.jsx-3751287040:first-child{margin-top:10px;}.movie-type.jsx-3751287040 a.jsx-3751287040{display:block;margin-bottom:10px;paddingTop:10px;width:400px;text-align:center;border:1px solid #ccc;}.movie-type.jsx-3751287040 a.jsx-3751287040:hover{box-shadow:2px 2px 5px #ccc;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy96aGFvemhhb3FpL+S4quS6uui1hOaWmS/ntKDmnZDlt6Xlhbfmj5Lku7YvbGVhcm5pbmflrabkuaAvMTYtbmV4dC9wYWdlcy9Nb3ZpZS9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0JvQixBQUcwQixBQUtHLEFBR0YsQUFRYyxjQVBULEVBSHJCLFlBV0EsS0FQa0IsZ0JBQ0osWUFDTSxhQVhJLEtBWUEsc0JBQ3hCLG1EQVpxQiw2RkFDckIiLCJmaWxlIjoiL1VzZXJzL3poYW96aGFvcWkv5Liq5Lq66LWE5paZL+e0oOadkOW3peWFt+aPkuS7ti9sZWFybmluZ+WtpuS5oC8xNi1uZXh0L3BhZ2VzL01vdmllL2luZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcbmltcG9ydCBNb3ZpZSBmcm9tICcuLi8uLi9sYXlvdXRzL01vdmllLmpzeCdcbmltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLXVuZmV0Y2gnXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5cbmNsYXNzIE1vdmllSG9tZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoe3F1ZXJ5fSkge1xuICAgIGNvbnN0IG1vdmllTGlzdCA9IGF3YWl0IGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjMzMDEvJHtxdWVyeS50eXBlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgcmV0dXJuIHsgbW92aWVMaXN0IH1cbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbW92aWVMaXN0LFxuICAgICAgcm91dGVyXG4gICAgfSA9IHRoaXMucHJvcHNcbiAgICByZXR1cm4gKFxuICAgICAgPE1vdmllPlxuICAgICAgICB7Lyogc3R5bGVkLWpzeOivreazleWcqHNlcnZlcuerr+S8mui9rOS5iSA+IOWwvemHj+S4jeimgeWGmSAqL31cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5tb3ZpZS10eXBlIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLm1vdmllLXR5cGUgYTpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAubW92aWUtdHlwZSBhIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6IDEwcHg7XG4gICAgICAgICAgICB3aWR0aDogNDAwcHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgICAgICAgIH1cbiAgICAgICAgICAubW92aWUtdHlwZSBhOmhvdmVyIHtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDJweCAycHggNXB4ICNjY2M7XG4gICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDxIZWFkPlxuICAgICAgICAgIDx0aXRsZT7osYbnk6PnlLXlvbE8L3RpdGxlPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJrZXl3b3Jkc1wiIGNvbnRlbnQ9XCLnlLXlvbHvvIznu4/lhbjnlLXlvbHmjpLooYxcIiAvPlxuICAgICAgICA8L0hlYWQ+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm1vdmllLXR5cGVcIj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb3ZpZUxpc3QubWFwKHYgPT4gKFxuICAgICAgICAgICAgICA8TGluayBrZXk9e3YuaWR9IGhyZWY9e2AvTW92aWVEZXRhaWxlZD90eXBlPSR7cm91dGVyLnF1ZXJ5LnR5cGV9JmlkPSR7di5pZH1gfT5cbiAgICAgICAgICAgICAgICA8YT5cbiAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt2LmltZ30gYWx0PXt2LnRpdGxlfS8+XG4gICAgICAgICAgICAgICAgICA8cD7lkI3np7DvvJp7di50aXRsZX08L3A+XG4gICAgICAgICAgICAgICAgICA8cD7or4TliIbvvJp7di5yYXRpbmd9PC9wPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgKSlcbiAgICAgICAgICB9XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgXG4gICAgICA8L01vdmllPlxuICAgIClcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihNb3ZpZUhvbWUpIl19 */\n/*@ sourceURL=/Users/zhaozhaoqi/\u4E2A\u4EBA\u8D44\u6599/\u7D20\u6750\u5DE5\u5177\u63D2\u4EF6/learning\u5B66\u4E60/16-next/pages/Movie/index.jsx */"
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_7___default.a, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("title", {
        className: "jsx-3751287040"
      }, "\u8C46\u74E3\u7535\u5F71"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
        name: "keywords",
        content: "\u7535\u5F71\uFF0C\u7ECF\u5178\u7535\u5F71\u6392\u884C",
        className: "jsx-3751287040"
      })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", {
        className: "jsx-3751287040" + " " + "movie-type"
      }, movieList.map(function (v) {
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
          key: v.id,
          href: "/MovieDetailed?type=".concat(router.query.type, "&id=").concat(v.id)
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
          className: "jsx-3751287040"
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
          src: v.img,
          alt: v.title,
          className: "jsx-3751287040"
        }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
          className: "jsx-3751287040"
        }, "\u540D\u79F0\uFF1A", v.title), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
          className: "jsx-3751287040"
        }, "\u8BC4\u5206\uFF1A", v.rating)));
      })));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
        var query, movieList;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = _ref.query;
                _context.next = 3;
                return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_5___default()("http://127.0.0.1:3301/".concat(query.type)).then(function (res) {
                  return res.json();
                });

              case 3:
                movieList = _context.sent;
                return _context.abrupt("return", {
                  movieList: movieList
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return MovieHome;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(MovieHome));
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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/Movie")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=Movie.js.7aecc96d04ef8a362324.hot-update.js.map