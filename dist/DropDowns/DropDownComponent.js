"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DropDownComponent;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
require("../styles.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  Option
} = _antd.Select;
function DropDownComponent(props) {
  const {
    option,
    change,
    place
  } = {
    props
  };
  return /*#__PURE__*/_react.default.createElement(_antd.Select, {
    placeholder: props.place,
    onChange: props.change,
    allowClear: true,
    className: "SelectStyle",
    style: {
      width: 200,
      margin: '0 10px'
    }
  }, props.option?.map((data, Index) => /*#__PURE__*/_react.default.createElement(Option, {
    key: Index,
    value: data
  }, data)));
}
module.exports = exports.default;