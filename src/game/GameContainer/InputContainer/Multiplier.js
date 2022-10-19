import * as PIXI from "pixi.js";

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class Multiplier extends PIXI.Graphics {
  constructor(parent) {
    super();
    this.parent = parent;

    if (this.parent) {
      this.parent.addChild(this);
      this.lineStyle(1, 0x1f1f1f);
      this.drawRect(1, 0, this.parent.width / 4 - 2, this.parent.height / 2.5);
      this.graphic = new PIXI.Graphics();
      this.graphic.beginFill(0xebd25b);
      this.graphic.drawRect(3, 0, this.width - 5, this.height);
      // console.dir(this.graphic)
      this.graphic.endFill();
      this.graphic.alpha = 0.1
      this.addChild(this.graphic);
      this.position.y = this.height / 2;
      this.position.x = 0;
      this.positionBasedOnSiblings();
      gsap.to(this.graphic, { alpha: 1, duration: 2 })
    }
  }

  positionBasedOnSiblings() {
    this.position.x = this.width * (this.parent.children.slice(1).length - 1);
  }
}
