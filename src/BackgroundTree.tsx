import * as R from "rambda";
import * as React from "react";

import { defineAsset2x } from "./components/Asset";
import * as assets from "./assets";

const Tree = defineAsset2x(assets.trees);

interface BackgroundTreeModel {
  id: number;
  position: {
    right: number;
    bottom: number;
  };
}

interface BackgroundTreeProps {
  moving: boolean;
}

interface BackgroundTreeState {
  trees: BackgroundTreeModel[];
}

const treeRightMoveTimeInterval = 125;
const treeRightMoveDelta = 25;
const treeRightInterval = 160;
const treeBottom = 240;
const backgroundTreeCount = 20;

export default class BackgroundTree extends React.Component<
  BackgroundTreeProps,
  BackgroundTreeState
> {
  private moveTimer: number = 0;
  private treeIndex: number = 0;

  constructor(props: BackgroundTreeProps) {
    super(props);
    this.state = {
      trees: R.range(0, backgroundTreeCount).map(index => ({
        id: ++this.treeIndex,
        position: {
          right: treeRightInterval * index,
          bottom: treeBottom
        }
      }))
    };
  }

  public componentDidMount() {
    this.moveTimer = window.setInterval(() => {
      const { moving } = this.props;
      if (!moving) {
        return;
      }
      const { trees } = this.state;
      const oldTrees = trees
        .map<BackgroundTreeModel>(tree => ({
          id: tree.id,
          position: {
            bottom: tree.position.bottom,
            right: tree.position.right - treeRightMoveDelta
          }
        }))
        .filter(tree => tree.position.right >= 0);

      const maxRight = Math.max(...oldTrees.map(tree => tree.position.right));
      const newTrees = R.range(0, backgroundTreeCount - oldTrees.length).map<
        BackgroundTreeModel
      >(index => ({
        id: ++this.treeIndex,
        position: {
          right: maxRight + (index + 1) * treeRightInterval,
          bottom: treeBottom
        }
      }));
      this.setState({
        trees: [...oldTrees, ...newTrees]
      });
    }, treeRightMoveTimeInterval);
  }

  public componentWillUnmount() {
    window.clearInterval(this.moveTimer);
  }

  public render() {
    const { trees } = this.state;
    return (
      <React.Fragment>
        {trees.map(tree => (
          <Tree key={tree.id} index={tree.id % 2} position={tree.position} />
        ))}
      </React.Fragment>
    );
  }
}
