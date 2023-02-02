import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import {Select} from 'antd';
import '../styles.css';
const { Option } = Select;

export default function DropDownComponent(props){
    const {option,change,place}={props}
    return(
    <Select placeholder={props.place} onChange={props.change} allowClear className="SelectStyle" style={{ width: 200, margin: '0 10px' }}>
        {props.option?.map(
            (data,Index)=>(<Option key={Index} value={data}>{data}</Option>)
            )}
        </Select>
        )
}