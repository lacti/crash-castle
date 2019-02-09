import * as React from "react";
import * as R from "rambda";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

import { defineCharacterNx } from "./components/Character";
import * as assets from "./assets";
import { defineAssetNx } from "./components/Asset";
import BackgroundTree from "./BackgroundTree";
import Message from "./components/Message";
import Button from "./components/Button";
import Bar from "./components/Bar";

const House = defineAssetNx(2.5)(assets.houses);
const Player = defineCharacterNx(2.5)(assets.players);

enum GameState {
  Intro,
  GameWalking,
  GameBattle,
  End
}

interface MessageState {
  id: string;
  text: string;
}

interface AppState {
  state: GameState;

  // GameStand
  house?: {
    index: number;
    maxHp: number;
    hp: number;
  };
  player: {
    maxHp: number;
    hp: number;
  };
  message?: MessageState;
}

const sleep = (millis: number) =>
  new Promise<void>(resolve => window.setTimeout(resolve, millis));

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      state: GameState.Intro,
      player: {
        maxHp: 100,
        hp: 100
      }
    };
  }

  public componentDidMount() {
    this.gameLoop();
  }

  public render() {
    const { state, house, player, message } = this.state;
    return (
      <div className="App">
        <BackgroundTree moving={state === GameState.GameWalking} />
        {house && (
          <React.Fragment>
            <Bar
              maxValue={house.maxHp}
              currentValue={house.hp}
              position={{ left: 24, bottom: 326 }}
              size={{ width: 256, height: 24 }}
              fillColor="#ff0000"
              fontColor="#ffffff"
              backgroundColor="#333333"
              border="2px solid #111111"
            />
            <House
              index={house.index}
              position={{ left: 48, bottom: 64 }}
              opacity={1}
            />
          </React.Fragment>
        )}
        <Bar
          maxValue={player.maxHp}
          currentValue={player.hp}
          position={{ right: 24, top: 24 }}
          size={{ width: 180, height: 24 }}
          fillColor="#ff0000"
          fontColor="#ffffff"
          backgroundColor="#333333"
          border="2px solid #111111"
        />
        <Bar
          currentValue={80}
          position={{ right: 24, top: 54 }}
          size={{ width: 180, height: 24 }}
          fillColor="#006400"
          fontColor="#ffffff"
          backgroundColor="#333333"
          border="2px solid #111111"
        />
        <Player
          index={0}
          animationDelay={state === GameState.GameWalking ? 150 : 0}
          position={{ right: 80, bottom: 112 }}
        />
        <React.Fragment>
          <Button
            position={{ right: 116, bottom: 32 }}
            padding={0}
            image={assets.icons.sword}
            opacity={1}
            onClick={this.onButtonA}
          />
          <Button
            position={{ right: 32, bottom: 32 }}
            padding={0}
            image={assets.icons.shield}
            opacity={1}
            onClick={this.onButtonB}
          />
          {message && <Message text={message.text} />}
        </React.Fragment>
      </div>
    );
  }

  private gameLoop = async () => {
    while (true) {
      this.setState({
        state: GameState.GameWalking,
        house: undefined
      });
      await sleep(2000);
      const houseHp = Math.abs(
        Math.floor(Math.random() * this.state.player.maxHp)
      );
      this.setState({
        state: GameState.GameBattle,
        house: {
          index: Math.floor(Math.random() * assets.houses.length),
          maxHp: houseHp,
          hp: houseHp
        }
      });
      while (this.state.house!.hp > 0 && this.state.player.hp > 0) {
        await sleep(100);
        this.setState({
          player: {
            ...this.state.player,
            hp: Math.max(0, this.state.player.hp - houseHp * 0.01)
          }
        });
      }
      if (this.state.player.hp <= 0) {
        this.setState({
          state: GameState.End
        });
        break;
      }
    }
  };

  private onButtonA = () => {
    const { house, player } = this.state;
    switch (this.state.state) {
      case GameState.GameWalking:
        const newMaxHp = player.maxHp * 1.05;
        this.setState({
          player: {
            ...player,
            maxHp: newMaxHp,
            hp: Math.max(newMaxHp * 0.01, player.hp)
          }
        });
        break;
      case GameState.GameBattle:
        if (house && house.hp > 0) {
          this.setState({
            house: {
              ...house,
              hp: Math.max(0, house.hp - player.maxHp * 0.1)
            }
          });
        }
      default:
        break;
    }
  };
  private onButtonB = () => {
    const { player } = this.state;
    switch (this.state.state) {
      case GameState.GameWalking:
        this.setState({
          player: {
            ...player,
            hp: Math.min(player.maxHp, player.hp * 1.1)
          }
        });
        break;
      case GameState.GameBattle:
        this.setState({
          player: {
            ...player,
            hp: Math.min(player.maxHp, player.hp * 1.01)
          }
        });
      default:
        break;
    }
  };

  private setMessageText = async (message: string, millis: number = 2000) => {
    const id = uuidv4();
    this.setState({
      message: {
        id,
        text: message
      }
    });
    await sleep(millis);
    if (this.state.message && this.state.message.id === id) {
      this.setState({ message: undefined });
    }
  };
}

export default App;
