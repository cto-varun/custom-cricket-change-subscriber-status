import React, { useState } from 'react';
import DropDownComponent from './DropDownComponent';
import CodeGenerator from '../CodeGenerator/CodeGenerator';
import { DownOutlined } from '@ant-design/icons';
// import styled from 'styled-components';
import { Button, Checkbox, Menu, Dropdown } from 'antd';
import { Select } from 'antd';
import '../styles.css';
const { Option } = Select;

export default function ChangeStatusDropDown(props) {
    const { data, status, number, ctns, submitChanges, codetext } = props;

    const [newstatus, setNewStatus] = useState('');
    const [authorizedusers, setAuthorizedusers] = useState([]);
    const [reason, setReason] = useState('');

    function onChanges(data, e) {
        if (e.target.checked === true) {
            setAuthorizedusers((authorizedusers) => [...authorizedusers, data]);
        } else if (e.target.checked === false) {
            setAuthorizedusers(authorizedusers.filter((e) => e !== data));
        }
    }

    const submit = () => {
        submitChanges(newstatus, reason);
    };

    const menu = (
        <Menu>
            {ctns.map((data, Index) => (
                <Menu.Item key={Index}>
                    <Checkbox onChange={(e) => onChanges(data, e)}>
                        {data}
                    </Checkbox>
                </Menu.Item>
            ))}
        </Menu>
    );

    const onStatusChange = (value) => {
        setNewStatus(value);
    };

    const onReasonChange = (value) => {
        setReason(value);
    };

    return (
        <div className="list">
            {/* Status Dropdown start */}
            <div>
                {/* Dropdown Component */}
                {status === 'A' ? (
                    <DropDownComponent
                        place={'Change Status'}
                        change={onStatusChange}
                        check={false}
                        option={data.activeItems}
                    />
                ) : (
                    <></>
                )}
                {number.length === 15 ? (
                    <DropDownComponent
                        place={'Change Status'}
                        change={onStatusChange}
                        check={false}
                        option={data.suspendItems}
                    />
                ) : (
                    <></>
                )}
                {status === 'S' ? (
                    <DropDownComponent
                        place={'Change Status'}
                        change={onStatusChange}
                        check={false}
                        option={data.suspendItems}
                    />
                ) : (
                    <></>
                )}
                {status === 'C' ? (
                    <DropDownComponent
                        place={'Change Status'}
                        change={onStatusChange}
                        check={false}
                        option={data.cancelItems}
                    />
                ) : (
                    <></>
                )}
            </div>
            {/* Status Dropdown end */}

            {/* Reason Dropdown start */}
            <div>
                {newstatus !== '' && newstatus === 'cancel' ? (
                    <div className="list">
                        <DropDownComponent
                            place={'Reason'}
                            change={onReasonChange}
                            check={false}
                            option={data.cancelReasonItems}
                        />
                        <Button onClick={submit}>Submit</Button>
                    </div>
                ) : (
                    <></>
                )}
                {newstatus !== '' && newstatus === 'suspend' ? (
                    <DropDownComponent
                        place={'Reason'}
                        change={onReasonChange}
                        check={false}
                        option={data.suspendReasonItems}
                    />
                ) : (
                    <></>
                )}
                {newstatus !== '' && newstatus === 'restore' ? (
                    <DropDownComponent
                        place={'Reason'}
                        change={onReasonChange}
                        check={false}
                        option={data.restoreReasonItems}
                    />
                ) : (
                    <></>
                )}
            </div>
            {/* Reason Dropdown end */}

            {/* User Authorization and Code Generation start */}
            <div>
                {newstatus === 'suspend' ||
                (newstatus === 'restore' && reason === 'Lost') ||
                reason === 'Stolen' ? (
                    <Dropdown.Button menu={menu} trigger={['click']}>
                        select authorized users
                    </Dropdown.Button>
                ) : (
                    <></>
                )}

                {newstatus === 'suspend' && reason !== '' ? (
                    <Button onClick={submit}>Submit</Button>
                ) : (
                    <></>
                )}

                {newstatus === 'restore' && reason !== '' ? (
                    <div className="codeGeneratorAlignment">
                        <CodeGenerator description={codetext} />
                        <Button onClick={submit}>Submit</Button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {/* User Authorization and Code Generation end */}
        </div>
    );
}
