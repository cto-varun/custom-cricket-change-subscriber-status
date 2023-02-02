"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function setPosition(position) {
  if (position === "top-right") return {
    position: "absolute",
    top: 20,
    right: 20
  };
  if (position === "top-left") return {
    position: "absolute",
    top: 20,
    left: 20
  };
  if (position === "bottom-left") return {
    position: "absolute",
    bottom: 20,
    left: 20
  };
  if (position === "bottom-right") return {
    position: "absolute",
    bottom: 20,
    right: 20
  };
  if (position === "left") return {
    position: "absolute",
    left: 20
  };
  if (position === "right") return {
    position: "absolute",
    right: 20
  };
}
function success(props) {
  const {
    Text
  } = _antd.Typography;
  _antd.Modal.success({
    title: /*#__PURE__*/_react.default.createElement(Text, {
      strong: true,
      type: "success"
    }, props.title),
    content: /*#__PURE__*/_react.default.createElement(Text, {
      type: "success"
    }, props.content),
    okText: "Dismiss",
    okButtonProps: {
      danger: true,
      type: "default"
    },
    style: setPosition(props.position)
  });
}
function error(props) {
  const {
    Text
  } = _antd.Typography;
  _antd.Modal.error({
    title: /*#__PURE__*/_react.default.createElement(Text, {
      strong: true,
      type: "danger"
    }, props.title),
    content: /*#__PURE__*/_react.default.createElement(Text, {
      type: "danger"
    }, props.content),
    okText: "Dismiss",
    okButtonProps: {
      danger: true,
      type: "default"
    },
    style: setPosition(props.position)
  });
}
var _default = {
  success,
  error
};
exports.default = _default;
module.exports = exports.default;