"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CodeGenerator;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  Text
} = _antd.Typography;
function CodeGenerator(props) {
  const [otp, setOtp] = (0, _react.useState)("");
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    direction: "vertical",
    style: {
      margin: "2%",
      padding: "4% 10%",
      border: "2px dashed #52C41A",
      textAlign: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(Text, null, props.description), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "ghost"
  }, "GENERATE CODE"), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    bordered: false,
    autoFocus: true,
    maxLength: 6,
    value: otp,
    style: {
      textAlign: "center"
    },
    onChange: e => {
      setOtp(e.target.value);
    }
  })), otp.length === 6 && /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    style: {
      margin: "2%"
    }
  }, "SUBMIT"));
}
module.exports = exports.default;