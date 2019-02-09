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
import { shortNumber } from "./utils/numbers";

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

const initialState: AppState = {
  state: GameState.Intro,
  player: {
    maxHp: 100,
    hp: 100
  }
};

class App extends React.Component<{}, AppState> {
  private count: number = 0;
  private pressed = {
    a: 0,
    b: 0
  };

  constructor(props: {}) {
    super(props);
    this.state = initialState;
  }

  public componentDidMount() {
    this.gameLoop();
    window.addEventListener("keydown", this.onKeyDown);
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
              position={{ left: 32, bottom: 294 }}
              size={{ width: 200, height: 24 }}
              fillColor="#ff0000"
              fontColor="#ffffff"
              backgroundColor="#333333"
              border="2px solid #111111"
            />
            <House
              index={house.index}
              position={{ left: 32, bottom: 64 }}
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
        <Player
          index={0}
          animationDelay={state === GameState.GameWalking ? 150 : 0}
          position={{ right: 40, bottom: 112 }}
        />
        <React.Fragment>
          {state === GameState.GameBattle && (
            <Button
              position={{ left: 32, bottom: 32 }}
              padding={0}
              image={assets.icons.sword}
              opacity={1}
              onClick={this.onButtonA}
            />
          )}
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
    this.setMessageText(`부동산 파괘자`, 1000);
    await sleep(1000);
    while (true) {
      this.setState({
        state: GameState.GameWalking,
        house: undefined
      });
      await sleep(1000 + Math.random() * 3000);
      const houseHp = Math.floor(Math.random() * 10 * this.state.player.maxHp);
      this.setState({
        state: GameState.GameBattle,
        house: {
          index: Math.floor(Math.random() * assets.houses.length),
          maxHp: houseHp,
          hp: houseHp
        }
      });
      while (this.state.house!.hp > 0 && this.state.player.hp > 0) {
        await sleep(300 + Math.random() * 300);
        this.setState({
          player: {
            ...this.state.player,
            hp: Math.max(
              0,
              this.state.player.hp - houseHp * 0.01 * (1 + Math.random())
            )
          }
        });
      }
      if (this.state.house!.hp <= 0) {
        this.count++;
        this.setState({
          player: {
            ...this.state.player,
            maxHp: this.state.player.maxHp + houseHp,
            hp: this.state.player.hp + houseHp
          }
        });
      }
      if (this.state.player.hp <= 0) {
        this.setState({
          state: GameState.End
        });
        this.setMessageText(`제거한 부동산의 수 ${this.count}`, 10 * 1000);
        await sleep(11 * 1000);
        this.setState(initialState);
      }
    }
  };

  private onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        this.onButtonA();
        break;
      case "ArrowRight":
        this.onButtonB();
        break;
    }
  };

  private onButtonA = () => {
    const { house, player } = this.state;
    const now = Date.now();
    switch (this.state.state) {
      case GameState.GameBattle:
        if (now - this.pressed.a < 100) {
          break;
        }
        this.pressed.a = now;
        if (house && house.hp > 0) {
          this.setState({
            house: {
              ...house,
              hp: Math.max(
                0,
                house.hp - player.maxHp * (0.05 + Math.random() / 20)
              )
            }
          });
        }
      default:
        break;
    }
  };
  private onButtonB = () => {
    const { player } = this.state;
    const now = Date.now();
    switch (this.state.state) {
      case GameState.GameWalking:
        if (now - this.pressed.b < 100) {
          break;
        }
        this.pressed.b = now;
        this.setState({
          player: {
            ...player,
            hp: Math.min(player.maxHp, player.hp * 1.1)
          }
        });
        break;
      case GameState.GameBattle:
        if (now - this.pressed.b < 100) {
          break;
        }
        this.pressed.b = now;
        this.setState({
          player: {
            ...player,
            hp: Math.min(
              player.maxHp,
              player.hp + player.maxHp * (0.05 + Math.random() / 20)
            )
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
