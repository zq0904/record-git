var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function C(props) {
  return props.isShow ? React.createElement(
    'div',
    null,
    'C\u7EC4\u4EF6'
  ) : null; // 如果想不显示组件 返回 null 或 false 不显示(不渲染)组件仍然会触发componentDidUpdate生命周期钩子
}

var If = function (_React$Component) {
  _inherits(If, _React$Component);

  function If() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, If);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = If.__proto__ || Object.getPrototypeOf(If)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      islogin: true,
      list: ['a', 'b', 'c'],
      isShow: true,
      i: 1
    }, _this.handleClick = function () {
      _this.setState(function (old) {
        return { islogin: !old.islogin };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(If, [{
    key: 'componentDidMount',
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
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      console.log('componentDidUpdate');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          islogin = _state.islogin,
          list = _state.list;

      var btn = void 0;
      if (islogin) {
        btn = React.createElement(
          'button',
          null,
          '\u767B\u51FA'
        );
      } else {
        btn = React.createElement(
          'button',
          null,
          '\u767B\u5F55'
        );
      }
      return React.createElement(
        'div',
        null,
        btn,
        React.createElement('br', null),
        React.createElement(
          'button',
          { type: 'submit', onClick: this.handleClick },
          '\u66F4\u6539\u767B\u5F55\u72B6\u6001'
        ),
        React.createElement('br', null),
        list.length && list,
        React.createElement('br', null),
        islogin ? '登出' : '登录',
        React.createElement('br', null),

        // jsx中不能使用if条件判断 可以使用三元代替
        islogin ? '登出' : '登录',
        React.createElement('br', null),
        React.createElement(
          'button',
          { type: 'submit', onClick: function onClick() {
              return _this2.setState({ isShow: !_this2.state.isShow });
            } },
          '\u5207\u6362\u663E\u793AC\u7EC4\u4EF6'
        ),
        React.createElement(C, { isShow: this.state.isShow })
      );
    }
  }]);

  return If;
}(React.Component);

ReactDOM.render(React.createElement(If, null), document.getElementById('vm'));