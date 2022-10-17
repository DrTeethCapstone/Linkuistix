import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class TimerBar extends PIXI.Sprite {
    constructor(parent) {
        super()
        // this._texture = 0xffffff
        this.parent = parent
        this.anchor.set(0.5, 0)
        this.tint = 0xFFA500;
        this.width = 400;
        this.height = 50;
        // this.rectLength = 200
        // this.parent.addChild(this)
        // this.lineStyle(1, 0x000000)
        // this.beginFill(0x000000)
        // this.drawRect(0, 0, this.rectLength, 50)
        // // this.fill(0x000000)
        // this.endFill()


    }
    // reduceRect() {
    //     gsap.to(this, { rectLength: 50, duration: 1 })
    // }
}