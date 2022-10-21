import * as PIXI from "pixi.js";
import { GameOverInput } from "./GameOverInput";

export class GameOverInputContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.alpha = 0.8;
    bg.tint = "#ff71ce";
    bg.anchor.set(0.5, 1);
    bg.height = 100;
    bg.width = 500;
    this.addChild(bg);
    this.interaction = new GameOverInput(this);
    if (this.parent) {
      this.parent.addChild(this);
      this.position.y = this.parent.height - this.height;
    }
  }
}
