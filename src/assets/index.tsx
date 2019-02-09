import { ISprites, IAsset } from "../types";

import CharacterSprite1 from "./character-1.png";
import CharacterSprite2 from "./character-2.png";
import CharacterSprite3 from "./character-3.png";
import CharacterSprite4 from "./character-4.png";
import CharacterSprite5 from "./character-5.png";
import CharacterSprite6 from "./character-6.png";
import CharacterSprite7 from "./character-7.png";
import CharacterSprite8 from "./character-8.png";

export const players: ISprites[] = [
  {
    images: [
      CharacterSprite1,
      CharacterSprite2,
      CharacterSprite3,
      CharacterSprite4,
      CharacterSprite5,
      CharacterSprite6,
      CharacterSprite7,
      CharacterSprite8
    ],
    width: 24,
    height: 32
  }
];

import TreeSprite1 from "./tree-1.png";
import TreeSprite2 from "./tree-2.png";
import TreeSprite3 from "./tree-3.png";
import TreeSprite4 from "./tree-4.png";
import TreeSprite5 from "./tree-5.png";
import TreeSprite6 from "./tree-6.png";

export const trees: IAsset[] = [
  { image: TreeSprite1, width: 32, height: 64 },
  { image: TreeSprite2, width: 32, height: 64 },
  { image: TreeSprite3, width: 32, height: 64 },
  { image: TreeSprite4, width: 32, height: 64 },
  { image: TreeSprite5, width: 32, height: 64 },
  { image: TreeSprite6, width: 32, height: 64 }
];

import HouseSprite1 from "./house-1.png";
import HouseSprite2 from "./house-2.png";
import HouseSprite3 from "./house-3.png";
import HouseSprite4 from "./house-4.png";
import HouseSprite5 from "./house-5.png";
import HouseSprite6 from "./house-6.png";

export const houses: IAsset[] = [
  { image: HouseSprite1, width: 89, height: 96 },
  { image: HouseSprite2, width: 82, height: 96 },
  { image: HouseSprite3, width: 89, height: 96 },
  { image: HouseSprite4, width: 81, height: 96 },
  { image: HouseSprite5, width: 89, height: 96 },
  { image: HouseSprite6, width: 82, height: 96 }
];

import SwordImage from "./crossing-swords.png";
import ShieldImage from "./shield.png";

export const icons = {
  sword: SwordImage,
  shield: ShieldImage,
};
