import React from "react";
import { Modal, Typography } from "antd";

function setPosition(position) {
  if (position === "top-right")
    return { position: "absolute", top: 20, right: 20 };
  if (position === "top-left")
    return { position: "absolute", top: 20, left: 20 };
  if (position === "bottom-left")
    return { position: "absolute", bottom: 20, left: 20 };
  if (position === "bottom-right")
    return { position: "absolute", bottom: 20, right: 20 };
  if (position === "left") return { position: "absolute", left: 20 };
  if (position === "right") return { position: "absolute", right: 20 };
}

function success(props) {
  const { Text } = Typography;

  Modal.success({
    title: (
      <Text strong type="success">
        {props.title}
      </Text>
    ),
    content: <Text type="success">{props.content}</Text>,
    okText: "Dismiss",
    okButtonProps: { danger: true, type: "default" },
    style: setPosition(props.position),
  });
}

function error(props) {
  const { Text } = Typography;

  Modal.error({
    title: (
      <Text strong type="danger">
        {props.title}
      </Text>
    ),
    content: <Text type="danger">{props.content}</Text>,
    okText: "Dismiss",
    okButtonProps: { danger: true, type: "default" },
    style: setPosition(props.position),
  });
}

export default { success, error };
