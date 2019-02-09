import * as React from "react";

interface MessageProps {
  text: string;
}

const Message: React.SFC<MessageProps> = ({ text: message }) => (
  <div
    style={{
      position: "absolute",
      right: 48,
      left: 48,
      top: 80,
      backgroundColor: "#222222",
      border: "2px solid #000000",
      opacity: 1,
      padding: 12,
      color: "#ffffff",
      fontWeight: 900,
      fontSize: 24,
      textAlign: "center"
    }}
  >
    {message}
  </div>
);

export default Message;
