export type CssPosition = number | string;

export interface ISize {
  width: CssPosition;
  height: CssPosition;
}

export interface IPosition {
  left?: CssPosition;
  right?: CssPosition;
  top?: CssPosition;
  bottom?: CssPosition;
}

export interface IRect extends IPosition, ISize {}

export interface IAsset {
  image: string;
  width: number;
  height: number;
}

export interface ISprites {
  images: string[];
  width: number;
  height: number;
}
