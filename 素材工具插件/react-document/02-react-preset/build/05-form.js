"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Ele =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Ele, _React$Component);

  function Ele(props) {
    var _this;

    _classCallCheck(this, Ele);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ele).call(this, props));

    _this.handlerSubmit = function (e) {
      e.preventDefault();
      console.log(_this.state);
    };

    _this.handlerIntegration = _this.handlerIntegration.bind(_assertThisInitialized(_this));
    _this.state = {
      name: '',
      describe: '',
      schooling: '3',
      // 整合onChange事件
      integrationCheckbox: false,
      integrationText: ''
    };
    return _this;
  }

  _createClass(Ele, [{
    key: "handlerIntegration",
    // 整合onChange事件
    value: function handlerIntegration(e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value,
          checked = _e$target.checked;
      var val;

      switch (name) {
        case 'integrationCheckbox':
          val = checked;
          break;

        case 'integrationText':
          val = value;

        default:
          break;
      }

      this.setState(_defineProperty({}, name, val));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          name = _this$state.name,
          describe = _this$state.describe,
          schooling = _this$state.schooling,
          integrationCheckbox = _this$state.integrationCheckbox,
          integrationText = _this$state.integrationText;
      return React.createElement("form", {
        action: "",
        onSubmit: this.handlerSubmit
      }, React.createElement("label", {
        htmlFor: "name"
      }, "\u540D\u5B57\uFF1A"), React.createElement("input", {
        id: "name",
        type: "text",
        value: name,
        onChange: function onChange(e) {
          return _this2.setState({
            name: e.target.value
          });
        }
      }), React.createElement("br", null), React.createElement("label", null, "\u63CF\u8FF0\uFF1A", React.createElement("textarea", {
        cols: "20",
        rows: "3",
        value: describe,
        onChange: function onChange(e) {
          return _this2.setState({
            describe: e.target.value
          });
        }
      })), React.createElement("br", null), React.createElement("label", null, "\u5B66\u5386\uFF1A", React.createElement("select", {
        value: schooling,
        onChange: function onChange(e) {
          return _this2.setState({
            schooling: e.target.value
          });
        }
      }, React.createElement("option", {
        value: "1"
      }, "\u672C\u79D1"), React.createElement("option", {
        value: "2"
      }, "\u535A\u58EB"), React.createElement("option", {
        value: "3"
      }, "\u7855\u58EB"))), React.createElement("br", null), React.createElement("label", null, "\u6574\u5408onChange\u4E8B\u4EF6\uFF1A", React.createElement("input", {
        type: "checkbox",
        name: "integrationCheckbox",
        checked: integrationCheckbox,
        onChange: this.handlerIntegration
      })), React.createElement("br", null), React.createElement("label", null, "\u6574\u5408onChange\u4E8B\u4EF6\uFF1A", React.createElement("input", {
        type: "text",
        name: "integrationText",
        value: integrationText,
        onChange: this.handlerIntegration
      })), React.createElement("br", null), React.createElement("input", {
        type: "submit",
        value: "\u63D0\u4EA4"
      }));
    }
  }]);

  return Ele;
}(React.Component);

ReactDOM.render(React.createElement(Ele, null), document.getElementById('vm'));