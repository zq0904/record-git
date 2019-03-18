"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Eve =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Eve, _React$Component);

  function Eve(props) {
    var _this;

    _classCallCheck(this, Eve);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Eve).call(this, props));

    _this.handlerClick2 = function (e) {
      e.preventDefault();
      console.log(_assertThisInitialized(_this), e);
    };

    _this.handlerClick1 = _this.handlerClick1.bind(_assertThisInitialized(_this)); // 1.将 原型方法 直接bind this 赋值给 实例方法

    return _this;
  }

  _createClass(Eve, [{
    key: "handlerClick1",
    value: function handlerClick1(e) {
      e.preventDefault();
      console.log(this, e);
    } // 2.直接使用箭头函数定义实例方法

  }, {
    key: "handlerClick3",
    value: function handlerClick3(c, e) {
      e.preventDefault();
      console.log(this, e, c);
    }
  }, {
    key: "handlerClick4",
    value: function handlerClick4(c, e) {
      e.preventDefault();
      console.log(this, e, c);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", null, React.createElement("a", {
        href: "",
        onClick: this.handlerClick1
      }, "\u83B7\u53D6this \u65B9\u5F0F1"), React.createElement("br", null), React.createElement("a", {
        href: "",
        onClick: this.handlerClick2
      }, "\u83B7\u53D6this \u65B9\u5F0F2"), React.createElement("br", null), React.createElement("a", {
        href: "",
        onClick: function onClick(e) {
          return _this2.handlerClick3('参数', e);
        }
      }, "\u83B7\u53D6this \u65B9\u5F0F3"), React.createElement("br", null), React.createElement("a", {
        href: "",
        onClick: this.handlerClick4.bind(this, '参数')
      }, "\u83B7\u53D6this \u65B9\u5F0F4"), React.createElement("br", null));
    }
  }]);

  return Eve;
}(React.Component);

ReactDOM.render(React.createElement(Eve, null), document.getElementById('vm'));