import * as PIXI from "pixi.js";
import { gsap } from "gsap";

export class GameOverImg extends PIXI.Sprite {
  constructor(parent = null) {
    super();

    this.parent = parent;
    this.anchor.set(0.5);
    if (this.parent) {
      this.parent.addChild(this);
    }
  }
  animateInsert() {
    gsap.fromTo(
      this,
      {
        opacity: 0,
        x: 100,
        y: 100,
        duration: 3,
      },
      {
        opacity: 1,
      }
    );
  }
}
