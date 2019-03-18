"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// 用户搜索
function UserInput(_ref) {
  var search = _ref.search,
      isInventory = _ref.isInventory,
      update = _ref.update;
  return React.createElement("div", null, React.createElement("input", {
    type: "text",
    value: search,
    onChange: function onChange(e) {
      return update({
        search: e.target.value
      });
    }
  }), "\u641C\u7D22\u5546\u54C1\u7684\u540D\u5B57", React.createElement("p", null, React.createElement("input", {
    type: "checkbox",
    checked: isInventory,
    onChange: function onChange(e) {
      return update({
        isInventory: e.target.checked
      });
    }
  }), "\u53EA\u5C55\u793A\u5E93\u5B58\u4EA7\u54C1"));
}

function GoodsInfo(_ref2) {
  var goods = _ref2.goods;
  return React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "\u5546\u54C1\u540D\u79F0"), React.createElement("th", null, "\u5546\u54C1\u4EF7\u683C"))), React.createElement("tbody", null, goods.map(function (_ref3) {
    var name = _ref3.name,
        price = _ref3.price;
    return React.createElement("tr", {
      key: name
    }, React.createElement("td", null, name), React.createElement("td", null, price));
  })));
}

var Screening =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Screening, _React$Component);

  function Screening() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Screening);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Screening)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      goods: [],
      // 商品数据
      search: '',
      // 搜索条件
      isInventory: false // 是否根据库存筛选

    };

    _this.update = function (payload) {
      return _this.setState(payload);
    };

    return _this;
  }

  _createClass(Screening, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      this.timeId = setTimeout(function () {
        _this2.setState({
          goods: [{
            category: 'Sporting Goods',
            price: '$49.99',
            stocked: true,
            name: 'Football'
          }, {
            category: 'Sporting Goods',
            price: '$9.99',
            stocked: true,
            name: 'Baseball'
          }, {
            category: 'Sporting Goods',
            price: '$29.99',
            stocked: false,
            name: 'Basketball'
          }, {
            category: 'Electronics',
            price: '$99.99',
            stocked: true,
            name: 'iPod Touch'
          }, {
            category: 'Electronics',
            price: '$399.99',
            stocked: false,
            name: 'iPhone 5'
          }, {
            category: 'Electronics',
            price: '$199.99',
            stocked: true,
            name: 'Nexus 7'
          }]
        });
      }, 400);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeId);
    }
  }, {
    key: "filterGoods",
    // 根据条件 过滤数据 得到应该展示的数据
    value: function filterGoods() {
      var _this3 = this;

      return this.state.goods.filter(function (v) {
        var isIncludes = new RegExp(_this3.state.search, 'ig').test(v.name);
        if (!isIncludes) return false;
        if (!_this3.state.isInventory) return true;
        return v.stocked === true;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var state = this.state;
      return React.createElement("div", null, React.createElement(UserInput, _extends({
        update: this.update
      }, state)), React.createElement(GoodsInfo, {
        goods: this.filterGoods()
      }));
    }
  }]);

  return Screening;
}(React.Component);

ReactDOM.render(React.createElement(Screening, null), document.getElementById('vm'));