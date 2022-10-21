import * as PIXI from "pixi.js";

import { gsap } from "gsap";
//CREATE A NEW INSTANCE OF THE SCORE OBJECT
export class Score extends PIXI.Text {
  constructor(parent = null) {
    super("0", {
      fontFamily: "Press Start 2P",
      fontSize: 72,
      fill: 0x0eb3e1,
      align: "center",
    });

    this.alpha = 0;
    this.parent = parent;
    if (this.parent) {
      this.parent.addChild(this);
      this.updatePosition();
      this.position.y = this.parent.height / 3;
    }
  }
  animateOpacity(boolean) {
    if (boolean) {
      gsap.to(this, {
        alpha: 0,
        duration: 1.5,
      });
    } else {
      gsap.to(this, {
        alpha: 1,
        duration: 1,
      });
    }
  }

  updatePosition() {
    this.position.x = this.parent.width / 2 - this.width / 2;
  }

  updateScore(val) {
    this.parent.parent.userScore += val;
    this.text = this.parent.parent.userScore;
    this.updatePosition();
  }
  resetScore() {
    this.parent.parent.userScore = 0;
    this.text = this.parent.parent.userScore;
  }
}
