var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 状态提升
// 例子 提供 摄氏度 华氏度 2种输入
var T = function (_React$Component) {
  _inherits(T, _React$Component);

  function T() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, T);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = T.__proto__ || Object.getPrototypeOf(T)).call.apply(_ref, [this].concat(args))), _this), _this.Map = { c: '摄氏度', f: '华氏度' }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(T, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          value = _props.value,
          _onChange = _props.onChange,
          Map = this.Map;

      return React.createElement(
        'fieldset',
        null,
        React.createElement(
          'legend',
          null,
          Map[type]
        ),
        React.createElement('input', { type: 'text', value: value, onChange: function onChange(e) {
            return _onChange(type, e.target.value);
          } })
      );
    }
  }]);

  return T;
}(React.Component);

var Ele = function (_React$Component2) {
  _inherits(Ele, _React$Component2);

  function Ele(props) {
    _classCallCheck(this, Ele);

    var _this2 = _possibleConstructorReturn(this, (Ele.__proto__ || Object.getPrototypeOf(Ele)).call(this, props));

    _this2.handlerChange = function (type, t) {
      _this2.setState({ type: type, t: t });
    };

    _this2.state = { type: 'c', t: 0 };
    _this2.handlerChange = _this2.handlerChange.bind(_this2);
    return _this2;
  }

  _createClass(Ele, [{
    key: 'toC',
    value: function toC(f) {
      return (f - 32) * 5 / 9;
    }
  }, {
    key: 'toF',
    value: function toF(c) {
      return c * 9 / 5 + 32;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          t = _state.t,
          type = _state.type,
          toC = this.toC,
          toF = this.toF;

      var c = type === 'c' ? t : toC(t);
      var f = type === 'f' ? t : toF(t);
      return React.createElement(
        'div',
        null,
        React.createElement(T, { type: 'c', value: c, onChange: this.handlerChange }),
        React.createElement(T, { type: 'f', value: f, onChange: this.handlerChange })
      );
    }
  }]);

  return Ele;
}(React.Component);

ReactDOM.render(React.createElement(Ele, null), document.getElementById('vm'));