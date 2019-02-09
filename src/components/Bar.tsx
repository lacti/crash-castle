import * as React from "react";
import { IPosition, ISize } from "../types";
import { sizeToNumber, shortNumber } from "../utils/numbers";

interface BarProps {
  maxValue?: number;
  currentValue: number;
  size: ISize;
  position: IPosition;
  fontColor?: string;
  fillColor?: string;
  backgroundColor?: string;
  border?: string;
}

const Bar: React.SFC<BarProps> = ({
  maxValue,
  currentValue,
  size,
  position,
  fontColor,
  fillColor,
  backgroundColor,
  border
}) => (
  <div
    style={{
      position: "absolute",
      ...position,
      ...size,
      background: `linear-gradient(${
        position.left ? -90 : 90
      }deg, ${backgroundColor} ${(1 -
        (maxValue !== undefined ? currentValue / maxValue : 1)) *
        sizeToNumber(size.width)}px, ${fillColor} 0)`,
      backgroundColor,
      border,
      color: fontColor,
      fontWeight: 900,
      fontSize: "90%",
      lineHeight: `${size.height}px`,
      padding: `0px 4px`,
      textAlign: position.left ? "left" : "right"
    }}
  >
    {maxValue !== undefined
      ? `${shortNumber(currentValue)} / ${shortNumber(maxValue)}`
      : shortNumber(currentValue)}
  </div>
);

export default Bar;
