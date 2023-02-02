"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TableComponent;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _LineStatusCount = _interopRequireDefault(require("./LineStatusCount/LineStatusCount"));
var _ChangeStatusDropDown = _interopRequireDefault(require("./DropDowns/ChangeStatusDropDown"));
var _NotificationComponent = _interopRequireDefault(require("./Notification/NotificationComponent"));
require("./styles.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  Search
} = _antd.Input;
const {
  Title,
  Link
} = _antd.Typography;

/* Column Configuration */
const columns = [{
  title: 'Subscriber Number',
  key: 'subscriberNumber',
  dataIndex: 'telephoneNumber',
  width: '25%',
  render: ctn => /*#__PURE__*/_react.default.createElement("div", {
    className: "column-device-mobile-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_icons.MobileOutlined, {
    className: "column-device-mobile-icon"
  }), "\xA0\xA0", /*#__PURE__*/_react.default.createElement("span", {
    className: "column-device-telephone-number"
  }, ctn.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')))
}, {
  title: 'Subscriber IMEI',
  dataIndex: 'imei'
}, {
  title: 'Current Status',
  key: 'ptnStatus',
  dataIndex: 'ptnStatus',
  render: tag => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, tag === 'A' ? /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    color: "success",
    key: "active"
  }, "ACTIVE") : tag === 'S' ? /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    color: "warning",
    key: "suspended"
  }, "SUSPENDED") : tag === 'C' ? /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    color: "error",
    key: "cancelled"
  }, "CANCELLED") : tag === 'B' ? /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    color: "#8C8C8C",
    key: "blacklisted"
  }, "BLACKLISTED") : /*#__PURE__*/_react.default.createElement(Link, {
    href: "#statuspage",
    target: "_blank"
  }, tag))
}];

/* Table Column Data Structing Function */
const getTableColumnsData = lineDetailsData => {
  const column = lineDetailsData && lineDetailsData.map((dataItem, i) => {
    const {
      telephoneNumber,
      subscriberNumber,
      imei,
      ptnStatus
    } = dataItem;
    return {
      key: i,
      telephoneNumber: telephoneNumber,
      subscriberNumber: subscriberNumber,
      imei: imei,
      ptnStatus: ptnStatus
    };
  });
  return column;
};
function TableComponent(props) {
  const [exist, setExist] = (0, _react.useState)(true);
  if (props === '' || props === null || props === undefined) {
    setExist(false);
  }
  if (exist) {
    const {
      component,
      data,
      children,
      childComponents
    } = props;
    const [selectrow, setSelectrow] = (0, _react.useState)([]);
    const [selectData, setSelectData] = (0, _react.useState)([]);
    const [selectstatus, setSelectStatus] = (0, _react.useState)('');
    const [hasSelected, setHasselected] = (0, _react.useState)(selectrow.length > 0);
    const [selectedOptions, setSelectedOptions] = (0, _react.useState)([]);
    const [searchvalue, setSearchvalue] = (0, _react.useState)('');
    const {
      params
    } = component;
    const {
      lineDetails
    } = data.data;
    const [ctns, setCtns] = (0, _react.useState)([]);
    const columnsData = getTableColumnsData(lineDetails);

    /* Active CTNS Retival Function(for user authorization) */
    const activectns = number => {
      /* Search IMEI Authorization numbers */
      columnsData.forEach(on => {
        if (number === 999) {
          setCtns(ctns => [...ctns, on.subscriberNumber]);
        } else {
          if (on.ptnStatus === 'A' && on.subscriberNumber !== columnsData[number].subscriberNumber) {
            setCtns(ctns => [...ctns, on.subscriberNumber]);
          }
        }
      });
    };

    /* Status Modification Function */
    const submitChanges = (newstatus, reason) => {
      if (reason === 'Customer Decision' || newstatus === 'restore' && reason === 'Non-Payment' || selectstatus === 'C' && newstatus === 'restore') {} else if (newstatus === 'suspend' && reason === 'Lost' || reason === 'Stolen') {
        columnsData[selectData[0].key].ptnStatus = `submitted for status changed to ${newstatus} (Reason:${reason})`;
      } else {
        columnsData[selectData[0].key].ptnStatus = `submitted for status changed to ${newstatus} (Reason:${reason})`;
        _NotificationComponent.default.success({
          title: 'Success',
          content: `Subscriber Status Change has been successfully submitted`,
          position: 'top-right'
        });
        setTimeout(() => {
          if (newstatus === 'suspend') {
            columnsData[selectData[0].key].ptnStatus = `S`;
          } else if (newstatus === 'cancel') {
            columnsData[selectData[0].key].ptnStatus = `C`;
          } else {
            columnsData[selectData[0].key].ptnStatus = `A`;
          }
        }, 4000);
      }
    };
    /* Row Selection data retrival */
    const onSelectChange = selectrowkeys => {
      if (selectrowkeys.length !== 0 && selectrowkeys.length === 1) {
        setSelectrow(row => [...selectrow, row]);
        setSelectData(selectData => [...selectData, columnsData[selectrowkeys]]);
        activectns(selectrowkeys);
        setSelectStatus(columnsData[selectrowkeys].ptnStatus);
      } else if (selectrowkeys.length > 1) {
        _NotificationComponent.default.error({
          title: 'Error',
          content: 'More than one row selected',
          position: 'top-right'
        });
      } else if (selectrowkeys.length === 0) {
        setSelectStatus('');
        setSelectData([]);
        setSelectrow([]);
      }
      // else if(searchvalue!==''){
      //     NotificationModal.error({
      //         title: 'Error',
      //         content: 'Search IMEI is in use',
      //         position: 'top-right',
      //     });
      // }
    };

    /* Search IMEI function */
    const onSearch = value => {
      setSearchvalue(value);
      activectns(999);
    };
    /* Row Selection function */
    const rowSelection = {
      selectrow,
      onChange: onSelectChange
    };
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_LineStatusCount.default, {
      data: columnsData
    }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
      style: {
        marginLeft: 8
      }
    }, hasSelected ? `Selected ${selectrow.length} items` : ''), /*#__PURE__*/_react.default.createElement("div", {
      className: "list"
    }, /*#__PURE__*/_react.default.createElement(Search, {
      placeholder: "Search IMEI",
      allowClear: true,
      onSearch: onSearch,
      disabled: selectrow.length > 0,
      maxLength: 15,
      style: {
        width: 200,
        margin: '0 10px'
      }
    }), searchvalue !== '' || selectstatus !== '' ? selectrow.length > 0 && /*#__PURE__*/_react.default.createElement(_ChangeStatusDropDown.default, {
      data: params.dropdownData,
      codetext: params.CodeGenerationDescription,
      ctns: ctns,
      status: selectstatus,
      number: searchvalue,
      submitChanges: submitChanges
    }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)), searchvalue.length > 0 ? /*#__PURE__*/_react.default.createElement(_antd.Table, {
      columns: columns,
      dataSource: columnsData
    }) : /*#__PURE__*/_react.default.createElement(_antd.Table, {
      rowSelection: rowSelection,
      columns: columns,
      dataSource: columnsData
    })));
  } else {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Card, null, /*#__PURE__*/_react.default.createElement(Title, {
      level: 3
    }, "CONFIGURATION is missing reload the component")));
  }
}
module.exports = exports.default;