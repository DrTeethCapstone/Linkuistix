import * as PIXI from "pixi.js";
import { InputText } from "./InputText";
import { PreviousWord } from "./PreviousWord";
import { Multiplier } from "./Multiplier";

import { gsap } from "gsap";

export class InputContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.multiplier = 1;
    this.isLoaded = false;

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.anchor.set(0.5, 1);
    bg.height = 100;
    bg.width = this.parent.width;
    bg.alpha = 0;
    this.addChild(bg);

    this.interaction = new InputText(this);
    this.prevGuess = new PreviousWord(this);

    this.multiplierContainer = new PIXI.Container();
    const MCBackground = new PIXI.Sprite(PIXI.Texture.WHITE);
    MCBackground.tint = 0x1f1f1f;
    MCBackground.width = bg.width;
    MCBackground.height = bg.height / 4;
    this.multiplierContainer.position.y = MCBackground.height * -4.5;
    this.multiplierContainer.position.x = MCBackground.width / -2;
    this.multiplierContainer.addChild(MCBackground);
    this.addChild(this.multiplierContainer);

    if (this.parent) {
      this.parent.addChild(this);
      this.position.y = this.parent.height;
    }
  }

  updateMultiplier(boolean) {
    const children = this.multiplierContainer.children.slice(1);
    const scoreObject = this.parent.children[2].children[1].children[1];
    let similarityBonus = this.children[1].children[1].similarityBonus
    if (boolean) {
      const baseScore = 25;
      scoreObject.updateScore(baseScore * this.multiplier+similarityBonus);
      this.parent.children[4].resetTimer();
      if (this.multiplier <= 4) {
        this.multiplier++;
        if (children.length < this.multiplier) {
          new Multiplier(this.multiplierContainer);
        }
      }
    } else {
      if (this.multiplier > 1) {
        this.multiplier--;
        this.multiplierContainer.removeChild(children[children.length - 1]);
      }
    }
  }

  fromOffScreen(num = 0) {
    this.visible = true;
    gsap.to(this, {
      y: this.getGlobalPosition().y - this.height - num,
      duration: 1,
    });
  }

  toOffScreen() {
    // this.previousPosition = this.getGlobalPosition;
    gsap.to(this, {
      y: this.parent.height + this.height,
      duration: 1,
    });
    setTimeout(() => {
      this.visible = false;
    }, 0.5);
  }
}
