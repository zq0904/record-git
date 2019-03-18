"use strict";
// import React from 'raect'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class Ts extends React.Component {
//   render() {
//     return (
//       <div>123</div>
//     )
//   }
// }
// export default Ts
var react_1 = __importDefault(require("react"));
console.log(react_1.default);
function Hello(props) {
    var a = props.a, b = props.b;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null,
            "a\uFF1A",
            a),
        react_1.default.createElement("h2", null,
            "b\uFF1A",
            b)));
}
exports.default = Hello;
