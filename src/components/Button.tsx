import * as React from "react";
import { IPosition, ISize } from "../types";

interface ButtonProps {
  position: IPosition;
  padding?: number;
  size?: ISize;
  image?: string;
  text?: string;
  opacity?: number;
  border?: boolean;
  onClick?: () => void;
}

const Button: React.SFC<ButtonProps> = ({
  position,
  padding,
  size,
  image,
  text,
  opacity,
  border,
  onClick
}) => (
  <div
    style={{
      position: "absolute",
      ...position,
      ...(size || {}),
      padding: !size ? padding : undefined,
      backgroundColor: border ? "#cccccc" : "",
      borderColor: "#333333",
      opacity: opacity,
      borderStyle: "solid",
      borderWidth: border ? "2px" : "0px",
      borderRadius: "50%"
    }}
    onMouseUp={onClick}
    onTouchEnd={onClick}
  >
    {image && <img src={image} draggable={false} />}
    {text}
  </div>
);

export default Button;
