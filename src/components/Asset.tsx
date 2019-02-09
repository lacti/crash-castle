import * as React from "react";
import * as R from "rambda";
import { IPosition, ISize, IAsset } from "../types";

interface AssetRequiredProps {
  asset: IAsset;
  position: IPosition;
  opacity?: number;
}

interface AssetProps extends AssetRequiredProps {
  size?: ISize;
}

export default class Asset extends React.Component<AssetProps> {
  public render() {
    const { asset, size, position, opacity } = this.props;
    const imageStyle: React.CSSProperties = {
      position: "absolute",
      opacity: opacity === undefined ? 1 : opacity,
      ...(size || { width: asset.width, height: asset.height }),
      ...(position || {})
    };
    return <img src={asset.image} style={imageStyle} draggable={false} />;
  }
}

export const AssetNx = (magnitude: number): React.SFC<AssetRequiredProps> => props => (
  <Asset
    {...props}
    size={{
      width: props.asset.width * magnitude,
      height: props.asset.height * magnitude
    }}
  />
);

export const Asset2x = AssetNx(2);
export const Asset4x = AssetNx(4);

export const defineAssetNx = (magnitude: number) => (assets: IAsset[]) => {
  const AssetX = AssetNx(magnitude);
  const defined: React.SFC<
    R.Omit<AssetRequiredProps, "asset"> & { index: number }
  > = props => <AssetX {...props} asset={assets[props.index]} />;
  return defined;
};

export const defineAsset2x = defineAssetNx(2);
export const defineAsset4x = defineAssetNx(4);