"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ChangeStatusDropDown;
var _react = _interopRequireWildcard(require("react"));
var _DropDownComponent = _interopRequireDefault(require("./DropDownComponent"));
var _CodeGenerator = _interopRequireDefault(require("../CodeGenerator/CodeGenerator"));
var _icons = require("@ant-design/icons");
var _antd = require("antd");
require("../styles.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import styled from 'styled-components';

const {
  Option
} = _antd.Select;
function ChangeStatusDropDown(props) {
  const {
    data,
    status,
    number,
    ctns,
    submitChanges,
    codetext
  } = props;
  const [newstatus, setNewStatus] = (0, _react.useState)('');
  const [authorizedusers, setAuthorizedusers] = (0, _react.useState)([]);
  const [reason, setReason] = (0, _react.useState)('');
  function onChanges(data, e) {
    if (e.target.checked === true) {
      setAuthorizedusers(authorizedusers => [...authorizedusers, data]);
    } else if (e.target.checked === false) {
      setAuthorizedusers(authorizedusers.filter(e => e !== data));
    }
  }
  const submit = () => {
    submitChanges(newstatus, reason);
  };
  const menu = /*#__PURE__*/_react.default.createElement(_antd.Menu, null, ctns.map((data, Index) => /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
    key: Index
  }, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
    onChange: e => onChanges(data, e)
  }, data))));
  const onStatusChange = value => {
    setNewStatus(value);
  };
  const onReasonChange = value => {
    setReason(value);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "list"
  }, /*#__PURE__*/_react.default.createElement("div", null, status === 'A' ? /*#__PURE__*/_react.default.createElement(_DropDownComponent.default, {
    place: 'Change Status',
    change: onStatusChange,
    check: false,
    option: data.activeItems
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), number.length === 15 ? /*#__PURE__*/_react.default.createElement(_DropDownComponent.default, {
    place: 'Change Status',
    change: onStatusChange,
    check: false,
    option: data.suspendItems
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), status === 'S' ? /*#__PURE__*/_react.default.createElement(_DropDownComponent.default, {
    place: 'Change Status',
    change: onStatusChange,
    check: false,
    option: data.suspendItems
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), status === 'C' ? /*#__PURE__*/_react.default.createElement(_DropDownComponent.default, {
    place: 'Change Status',
    change: onStatusChange,
    check: false,
    option: data.cancelItems
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)), /*#__PURE__*/_react.default.createElement("div", null, newstatus !== '' && newstatus === 'cancel' ? /*#__PURE__*/_react.default.createElement("div", {
    className: "list"
  }, /*#__PURE__*/_react.default.createElement(_DropDownComponent.default, {
    place: 'Reason',
    change: onReasonChange,
    check: false,
    option: data.cancelReasonItems
  }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: submit
  }, "Submit")) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), newstatus !== '' && newstatus === 'suspend' ? /*#__PURE__*/_react.default.createElement(_DropDownComponent.default, {
    place: 'Reason',
    change: onReasonChange,
    check: false,
    option: data.suspendReasonItems
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), newstatus !== '' && newstatus === 'restore' ? /*#__PURE__*/_react.default.createElement(_DropDownComponent.default, {
    place: 'Reason',
    change: onReasonChange,
    check: false,
    option: data.restoreReasonItems
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)), /*#__PURE__*/_react.default.createElement("div", null, newstatus === 'suspend' || newstatus === 'restore' && reason === 'Lost' || reason === 'Stolen' ? /*#__PURE__*/_react.default.createElement(_antd.Dropdown.Button, {
    menu: menu,
    trigger: ['click']
  }, "select authorized users") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), newstatus === 'suspend' && reason !== '' ? /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: submit
  }, "Submit") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), newstatus === 'restore' && reason !== '' ? /*#__PURE__*/_react.default.createElement("div", {
    className: "codeGeneratorAlignment"
  }, /*#__PURE__*/_react.default.createElement(_CodeGenerator.default, {
    description: codetext
  }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: submit
  }, "Submit")) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)));
}
module.exports = exports.default;