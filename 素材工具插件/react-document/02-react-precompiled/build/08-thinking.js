var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React = React,
    Component = _React.Component;

function UserInput(_ref) {
  var text = _ref.text,
      textChange = _ref.textChange,
      isStocke = _ref.isStocke,
      stockeChange = _ref.stockeChange;

  console.log(isStocke);
  return React.createElement(
    "div",
    null,
    React.createElement("input", { type: "text", value: text, onChange: function onChange(e) {
        return textChange(e.target.value);
      } }),
    React.createElement(
      "p",
      null,
      React.createElement("input", { type: "checkbox", checked: isStocke, onChange: function onChange(e) {
          return stockeChange(e.target.checked);
        } }),
      "\u53EA\u5C55\u793A\u5E93\u5B58\u4EA7\u54C1"
    )
  );
}
function SearchResult() {
  return React.createElement(
    "div",
    { style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', width: '400px', margin: 0 } },
    React.createElement(
      "h3",
      { style: { display: 'flex', justifyContent: 'space-around', width: '100%', margin: 0 } },
      React.createElement(
        "strong",
        null,
        "\u540D\u5B57"
      ),
      React.createElement(
        "strong",
        null,
        "\u4EF7\u683C"
      )
    ),
    React.createElement(
      "p",
      { style: { textAlign: 'center', width: '100%', margin: 0 } },
      "\u4F53\u80B2\u7528\u54C1"
    ),
    React.createElement(
      "p",
      { style: { display: 'flex', justifyContent: 'space-around', width: '100%', margin: 0 } },
      React.createElement(
        "strong",
        null,
        "\u8DB3\u7403"
      ),
      React.createElement(
        "strong",
        null,
        "$50"
      )
    )
  );
}

var Box = function (_Component) {
  _inherits(Box, _Component);

  function Box() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Box);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Box.__proto__ || Object.getPrototypeOf(Box)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      data: [{ category: '', price: '', stocked: '', name: '' }],
      text: '',
      isStocke: false
    }, _this.textChange = function (text) {
      return _this.setState({ text: text });
    }, _this.stockeChange = function (isStocke) {
      return _this.setState({ isStocke: isStocke });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Box, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      this.timeId = setTimeout(function () {
        _this2.setState({
          data: [{ category: '体育用品', price: '$50', stocked: true, name: '足球1' }, { category: '体育用品', price: '$20', stocked: true, name: '足球2' }, { category: '体育用品', price: '$30', stocked: false, name: '足球3' }, { category: '手机用品', price: '$300', stocked: true, name: 'iPhone5' }, { category: '手机用品', price: '$400', stocked: false, name: 'iPhoneX' }, { category: '手机用品', price: '$550', stocked: true, name: 'iPhoneXS' }]
        });
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeId);
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          data = _state.data,
          text = _state.text,
          isStocke = _state.isStocke,
          textChange = this.textChange,
          stockeChange = this.stockeChange;

      var filterData = data.filter(function (v) {
        if (isStocke && !v.stocked) return;
        v.name;
      });
      return React.createElement(
        "div",
        null,
        React.createElement(UserInput, { text: text, textChange: textChange, isStocke: isStocke, stockeChange: stockeChange }),
        React.createElement(SearchResult, { data: filterData })
      );
    }
  }]);

  return Box;
}(Component);

ReactDOM.render(React.createElement(Box, null), document.getElementById('vm'));