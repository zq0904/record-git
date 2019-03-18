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

// 状态提升
// 例子 提供 摄氏度 华氏度 2种输入
var T =
/*#__PURE__*/
function (_React$Component) {
  _inherits(T, _React$Component);

  function T() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, T);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(T)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.Map = {
      c: '摄氏度',
      f: '华氏度'
    };
    return _this;
  }

  _createClass(T, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          value = _this$props.value,
          _onChange = _this$props.onChange,
          Map = this.Map;
      return React.createElement("fieldset", null, React.createElement("legend", null, Map[type]), React.createElement("input", {
        type: "text",
        value: value,
        onChange: function onChange(e) {
          return _onChange(type, e.target.value);
        }
      }));
    }
  }]);

  return T;
}(React.Component);

var Ele =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Ele, _React$Component2);

  function Ele(props) {
    var _this2;

    _classCallCheck(this, Ele);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Ele).call(this, props));

    _this2.handlerChange = function (type, t) {
      _this2.setState({
        type: type,
        t: t
      });
    };

    _this2.state = {
      type: 'c',
      t: 0
    };
    _this2.handlerChange = _this2.handlerChange.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(Ele, [{
    key: "toC",
    value: function toC(f) {
      return (f - 32) * 5 / 9;
    }
  }, {
    key: "toF",
    value: function toF(c) {
      return c * 9 / 5 + 32;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          t = _this$state.t,
          type = _this$state.type,
          toC = this.toC,
          toF = this.toF;
      var c = type === 'c' ? t : toC(t);
      var f = type === 'f' ? t : toF(t);
      return React.createElement("div", null, React.createElement(T, {
        type: "c",
        value: c,
        onChange: this.handlerChange
      }), React.createElement(T, {
        type: "f",
        value: f,
        onChange: this.handlerChange
      }));
    }
  }]);

  return Ele;
}(React.Component);

ReactDOM.render(React.createElement(Ele, null), document.getElementById('vm'));