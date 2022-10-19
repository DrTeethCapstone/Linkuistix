import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

//CREATE A NEW INSTANCE OF THE SCORE OBJECT
export class Score extends PIXI.Text {
  constructor(parent = null) {
    super("0", {
      fontFamily: "Press Start 2P",
      fontSize: 72,
      fill: 0x0eb3e1,
      align: "center",
    });

    this.alpha = 0.5;
    this.parent = parent;
    console.log('this1', this)
    if (this.parent) {
      this.parent.addChild(this);
      this.updatePosition();
      this.position.y = this.parent.height / 3;
    }
  }

  updatePosition() {
    this.position.x = this.parent.width / 2 - this.width / 2;
  }

  updateScore(val) {
    this.parent.parent.userScore += val;
    this.text = this.parent.parent.userScore;
    this.updatePosition();
    console.log('this2', this)

  }
  resetScore() {
    this.parent.parent.userScore = 0
    this.text = this.parent.parent.userScore;
  }

}
