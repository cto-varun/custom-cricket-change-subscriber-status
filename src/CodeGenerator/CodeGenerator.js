import React, { useState } from "react";

import { Typography, Button, Space, Input } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

const { Text } = Typography;

export default function CodeGenerator(props) {
  const [otp, setOtp] = useState("");

  return (
    <>
      {/* Code Generator component start */}
      <Space
        direction="vertical"
        style={{
          margin: "2%",
          padding: "4% 10%",
          border: "2px dashed #52C41A",
          textAlign: "center"
        }}
      >
        <Text>
         {props.description}
        </Text>

        <Button type="ghost">GENERATE CODE</Button>
        
        <Input
          bordered={false}
          autoFocus
          maxLength={6}
          value={otp}
          style={{ textAlign: "center" }}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
      </Space>

      {otp.length === 6 && (
        <Button type="primary" style={{ margin: "2%" }}>
          SUBMIT
        </Button>
      )}
      {/* Code Generator end */}
    </>
  );
}
