import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Card } from 'antd';
import { MobileOutlined } from '@ant-design/icons';
import LineStatusCount from './LineStatusCount/LineStatusCount';
import ChangeStatusDropDown from './DropDowns/ChangeStatusDropDown';
import NotificationModal from './Notification/NotificationComponent';
import { Input } from 'antd';
import './styles.css';

const { Search } = Input;
const { Title, Link } = Typography;

/* Column Configuration */
const columns = [
    {
        title: 'Subscriber Number',
        key: 'subscriberNumber',
        dataIndex: 'telephoneNumber',
        width: '25%',
        render: (ctn) => (
            <div className="column-device-mobile-wrapper">
                <MobileOutlined className="column-device-mobile-icon" />
                &nbsp;&nbsp;
                <span className="column-device-telephone-number">
                    {ctn
                        .toString()
                        .replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
                </span>
            </div>
        ),
    },
    {
        title: 'Subscriber IMEI',
        dataIndex: 'imei',
    },
    {
        title: 'Current Status',
        key: 'ptnStatus',
        dataIndex: 'ptnStatus',
        render: (tag) => (
            <>
                {tag === 'A' ? (
                    <Tag color="success" key="active">
                        ACTIVE
                    </Tag>
                ) : tag === 'S' ? (
                    <Tag color="warning" key="suspended">
                        SUSPENDED
                    </Tag>
                ) : tag === 'C' ? (
                    <Tag color="error" key="cancelled">
                        CANCELLED
                    </Tag>
                ) : tag === 'B' ? (
                    <Tag color="#8C8C8C" key="blacklisted">
                        BLACKLISTED
                    </Tag>
                ) : (
                    <Link href="#statuspage" target="_blank">
                        {tag}
                    </Link>
                )}
            </>
        ),
    },
];

/* Table Column Data Structing Function */
const getTableColumnsData = (lineDetailsData) => {
    const column =
        lineDetailsData &&
        lineDetailsData.map((dataItem, i) => {
            const {
                telephoneNumber,
                subscriberNumber,
                imei,
                ptnStatus,
            } = dataItem;
            return {
                key: i,
                telephoneNumber: telephoneNumber,
                subscriberNumber: subscriberNumber,
                imei: imei,
                ptnStatus: ptnStatus,
            };
        });
    return column;
};

export default function TableComponent(props) {
    const [exist, setExist] = useState(true);
    if (props === '' || props === null || props === undefined) {
        setExist(false);
    }
    if (exist) {
        const { component, data, children, childComponents } = props;
        const [selectrow, setSelectrow] = useState([]);
        const [selectData, setSelectData] = useState([]);
        const [selectstatus, setSelectStatus] = useState('');
        const [hasSelected, setHasselected] = useState(selectrow.length > 0);
        const [selectedOptions, setSelectedOptions] = useState([]);
        const [searchvalue, setSearchvalue] = useState('');
        const { params } = component;
        const { lineDetails } = data.data;
        const [ctns, setCtns] = useState([]);
        const columnsData = getTableColumnsData(lineDetails);

        /* Active CTNS Retival Function(for user authorization) */
        const activectns = (number) => {
            /* Search IMEI Authorization numbers */
            columnsData.forEach((on) => {
                if (number === 999) {
                    setCtns((ctns) => [...ctns, on.subscriberNumber]);
                } else {
                    if (
                        on.ptnStatus === 'A' &&
                        on.subscriberNumber !==
                            columnsData[number].subscriberNumber
                    ) {
                        setCtns((ctns) => [...ctns, on.subscriberNumber]);
                    }
                }
            });
        };

        /* Status Modification Function */
        const submitChanges = (newstatus, reason) => {
            if (
                reason === 'Customer Decision' ||
                (newstatus === 'restore' && reason === 'Non-Payment') ||
                (selectstatus === 'C' && newstatus === 'restore')
            ) {
            } else if (
                (newstatus === 'suspend' && reason === 'Lost') ||
                reason === 'Stolen'
            ) {
                columnsData[
                    selectData[0].key
                ].ptnStatus = `submitted for status changed to ${newstatus} (Reason:${reason})`;
            } else {
                columnsData[
                    selectData[0].key
                ].ptnStatus = `submitted for status changed to ${newstatus} (Reason:${reason})`;
                NotificationModal.success({
                    title: 'Success',
                    content: `Subscriber Status Change has been successfully submitted`,
                    position: 'top-right',
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
        const onSelectChange = (selectrowkeys) => {
            if (selectrowkeys.length !== 0 && selectrowkeys.length === 1) {
                setSelectrow((row) => [...selectrow, row]);
                setSelectData((selectData) => [
                    ...selectData,
                    columnsData[selectrowkeys],
                ]);
                activectns(selectrowkeys);
                setSelectStatus(columnsData[selectrowkeys].ptnStatus);
            } else if (selectrowkeys.length > 1) {
                NotificationModal.error({
                    title: 'Error',
                    content: 'More than one row selected',
                    position: 'top-right',
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
        const onSearch = (value) => {
            setSearchvalue(value);
            activectns(999);
        };
        /* Row Selection function */
        const rowSelection = {
            selectrow,
            onChange: onSelectChange,
        };
        return (
            <div>
                {/* Current Lines Description Component */}
                <LineStatusCount data={columnsData} />
                <div>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected
                            ? `Selected ${selectrow.length} items`
                            : ''}
                    </span>
                    {/* Change Status DropDown Component */}
                    <div className="list">
                        <Search
                            placeholder="Search IMEI"
                            allowClear
                            onSearch={onSearch}
                            disabled={selectrow.length > 0}
                            maxLength={15}
                            style={{ width: 200, margin: '0 10px' }}
                        />
                        {searchvalue !== '' || selectstatus !== '' ? (
                            selectrow.length > 0 && (
                                <ChangeStatusDropDown
                                    data={params.dropdownData}
                                    codetext={params.CodeGenerationDescription}
                                    ctns={ctns}
                                    status={selectstatus}
                                    number={searchvalue}
                                    submitChanges={submitChanges}
                                />
                            )
                        ) : (
                            <></>
                        )}
                    </div>
                    {/* Table Component */}
                    {searchvalue.length > 0 ? (
                        <Table columns={columns} dataSource={columnsData} />
                    ) : (
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={columnsData}
                        />
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Card>
                    <Title level={3}>
                        CONFIGURATION is missing reload the component
                    </Title>
                </Card>
            </div>
        );
    }
}
