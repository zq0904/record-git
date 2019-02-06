var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// React 建议使用组合 而非继承 来组织重用组件之间的关系
// Sidebar Dialog
var Box = function (_React$Component) {
  _inherits(Box, _React$Component);

  function Box() {
    _classCallCheck(this, Box);

    return _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).apply(this, arguments));
  }

  _createClass(Box, [{
    key: 'render',
    value: function render() {
      var boxStyle = {
        width: '25%',
        textAlign: 'center',
        border: '1px solid red'
      };
      return (
        // 在一个组件中使用插槽 在组件内部 通过this.props获取插槽的内容 是虚拟dom jsx编译完也是虚拟dom 描述dom的对象
        // 对于多个插槽直接使用props
        React.createElement(
          'div',
          { style: boxStyle },
          this.props.children
        )
      );
    }
  }]);

  return Box;
}(React.Component);

var Dialog = function (_React$Component2) {
  _inherits(Dialog, _React$Component2);

  function Dialog() {
    _classCallCheck(this, Dialog);

    return _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));
  }

  _createClass(Dialog, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          title = _props.title,
          content = _props.content;

      return React.createElement(
        Box,
        null,
        React.createElement(
          'h1',
          null,
          title
        ),
        React.createElement(
          'div',
          null,
          content
        ),
        React.createElement(
          'div',
          null,
          children
        )
      );
    }
  }]);

  return Dialog;
}(React.Component);

var Ele = function (_React$Component3) {
  _inherits(Ele, _React$Component3);

  function Ele() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, Ele);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = Ele.__proto__ || Object.getPrototypeOf(Ele)).call.apply(_ref, [this].concat(args))), _this3), _this3.state = { isShow: false }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(Ele, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      var isShow = this.state.isShow;

      return React.createElement(
        'div',
        { className: 'ele' },
        isShow && React.createElement(
          Dialog,
          { title: '\u6807\u9898', content: '\u5185\u5BB9' },
          React.createElement(
            'div',
            null,
            '\u5E95\u90E8'
          )
        ),
        React.createElement('br', null),
        React.createElement(
          'button',
          { type: 'button', onClick: function onClick(e) {
              return _this4.setState(function (old) {
                return { isShow: !old.isShow };
              });
            } },
          'toggle'
        )
      );
    }
  }]);

  return Ele;
}(React.Component);

ReactDOM.render(React.createElement(Ele, null), document.getElementById('vm'));