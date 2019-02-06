var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Eve = function (_React$Component) {
  _inherits(Eve, _React$Component);

  function Eve(props) {
    _classCallCheck(this, Eve);

    var _this = _possibleConstructorReturn(this, (Eve.__proto__ || Object.getPrototypeOf(Eve)).call(this, props));

    _this.handlerClick2 = function (e) {
      e.preventDefault();
      console.log(_this, e);
    };

    _this.handlerClick1 = _this.handlerClick1.bind(_this); // 1.将 原型方法 直接bind this 赋值给 实例方法
    return _this;
  }

  _createClass(Eve, [{
    key: "handlerClick1",
    value: function handlerClick1(e) {
      e.preventDefault();
      console.log(this, e);
    }
    // 2.直接使用箭头函数定义实例方法

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

      return React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { href: "", onClick: this.handlerClick1 },
          "\u83B7\u53D6this \u65B9\u5F0F1"
        ),
        React.createElement("br", null),
        React.createElement(
          "a",
          { href: "", onClick: this.handlerClick2 },
          "\u83B7\u53D6this \u65B9\u5F0F2"
        ),
        React.createElement("br", null),
        React.createElement(
          "a",
          { href: "", onClick: function onClick(e) {
              return _this2.handlerClick3('参数', e);
            } },
          "\u83B7\u53D6this \u65B9\u5F0F3"
        ),
        React.createElement("br", null),
        React.createElement(
          "a",
          { href: "", onClick: this.handlerClick4.bind(this, '参数') },
          "\u83B7\u53D6this \u65B9\u5F0F4"
        ),
        React.createElement("br", null)
      );
    }
  }]);

  return Eve;
}(React.Component);

ReactDOM.render(React.createElement(Eve, null), document.getElementById('vm'));