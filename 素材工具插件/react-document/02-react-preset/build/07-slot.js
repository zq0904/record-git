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

// React 建议使用组合 而非继承 来组织重用组件之间的关系
// Sidebar Dialog
var Box =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Box, _React$Component);

  function Box() {
    _classCallCheck(this, Box);

    return _possibleConstructorReturn(this, _getPrototypeOf(Box).apply(this, arguments));
  }

  _createClass(Box, [{
    key: "render",
    value: function render() {
      var boxStyle = {
        width: '25%',
        textAlign: 'center',
        border: '1px solid red'
      };
      return (// 在一个组件中使用插槽 在组件内部 通过this.props获取插槽的内容 是虚拟dom jsx编译完也是虚拟dom 描述dom的对象
        // 对于多个插槽直接使用props
        React.createElement("div", {
          style: boxStyle
        }, this.props.children)
      );
    }
  }]);

  return Box;
}(React.Component);

var Dialog =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Dialog, _React$Component2);

  function Dialog() {
    _classCallCheck(this, Dialog);

    return _possibleConstructorReturn(this, _getPrototypeOf(Dialog).apply(this, arguments));
  }

  _createClass(Dialog, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          title = _this$props.title,
          content = _this$props.content;
      return React.createElement(Box, null, React.createElement("h1", null, title), React.createElement("div", null, content), React.createElement("div", null, children));
    }
  }]);

  return Dialog;
}(React.Component);

var Ele =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Ele, _React$Component3);

  function Ele() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Ele);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Ele)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isShow: false
    };
    return _this;
  }

  _createClass(Ele, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var isShow = this.state.isShow;
      return React.createElement("div", {
        className: "ele"
      }, isShow && React.createElement(Dialog, {
        title: "\u6807\u9898",
        content: "\u5185\u5BB9"
      }, React.createElement("div", null, "\u5E95\u90E8")), React.createElement("br", null), React.createElement("button", {
        type: "button",
        onClick: function onClick(e) {
          return _this2.setState(function (old) {
            return {
              isShow: !old.isShow
            };
          });
        }
      }, "toggle"));
    }
  }]);

  return Ele;
}(React.Component);

ReactDOM.render(React.createElement(Ele, null), document.getElementById('vm'));