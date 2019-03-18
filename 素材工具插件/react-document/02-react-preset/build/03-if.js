"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function C(props) {
  return props.isShow ? React.createElement("div", null, "C\u7EC4\u4EF6") : null; // 如果想不显示组件 返回 null 或 false 不显示(不渲染)组件仍然会触发componentDidUpdate生命周期钩子
}

var If =
/*#__PURE__*/
function (_React$Component) {
  _inherits(If, _React$Component);

  function If() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, If);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(If)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      islogin: true,
      list: ['a', 'b', 'c'],
      isShow: true,
      i: 1
    };

    _this.handleClick = function () {
      _this.setState(function (old) {
        return {
          islogin: !old.islogin
        };
      });
    };

    return _this;
  }

  _createClass(If, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.setState 是异步的
      // React可以将多个setState()调用批处理为单个更新以提高性能
      this.setState({
        i: this.state.i + 3
      });
      this.setState({
        i: this.state.i * 2
      });
      console.log(this.state.i); // 1
      // 推选的做法
      // this.setState(old => ({
      //   i: old.i + 3
      // }))
      // this.setState(old => ({
      //   i: old.i * 2
      // }))
      // console.log(this.state.i) // 1
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      console.log('componentDidUpdate');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          islogin = _this$state.islogin,
          list = _this$state.list;
      var btn;

      if (islogin) {
        btn = React.createElement("button", null, "\u767B\u51FA");
      } else {
        btn = React.createElement("button", null, "\u767B\u5F55");
      }

      return React.createElement("div", null, btn, React.createElement("br", null), React.createElement("button", {
        type: "submit",
        onClick: this.handleClick
      }, "\u66F4\u6539\u767B\u5F55\u72B6\u6001"), React.createElement("br", null), list.length && list, React.createElement("br", null), islogin ? '登出' : '登录', React.createElement("br", null), // jsx中不能使用if条件判断 可以使用三元代替
      islogin ? '登出' : '登录', React.createElement("br", null), React.createElement("button", {
        type: "submit",
        onClick: function onClick() {
          return _this2.setState({
            isShow: !_this2.state.isShow
          });
        }
      }, "\u5207\u6362\u663E\u793AC\u7EC4\u4EF6"), React.createElement(C, {
        isShow: this.state.isShow
      }));
    }
  }]);

  return If;
}(React.Component);

ReactDOM.render(React.createElement(If, null), document.getElementById('vm'));