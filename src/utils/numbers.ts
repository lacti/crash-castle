import { CssPosition } from "../types";

export const sizeToNumber = (value: CssPosition) =>
  typeof value === "number" ? value : parseFloat(value);

export const shortNumber = (value: number) => {
  const units = [
    "K",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y",
    "A",
    "AA",
    "AB",
    "AC",
    "AD",
    "AE",
    "AG",
    "AH",
    "AI",
    "AJ",
    "AK"
  ];
  let n = Math.abs(Math.round(value));
  var index = 0;
  while (n >= 1000 && ++index < units.length) {
    n /= 1000;
  }
  const text = index === 0 ? n.toFixed(2) : n.toFixed(2) + units[index - 1];
  return text.replace(/\.00$/, "");
};
