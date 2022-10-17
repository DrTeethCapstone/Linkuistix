import * as PIXI from "pixi.js";

export class Timer extends PIXI.Text {
    constructor(parent = null) {
        super("0", {
            fontFamily: "Arial",
            fontSize: 128,
            fill: 0x000000,
            align: "center",
        });
        this.alpha = 0.5;
        this.parent = parent;
        this.text = 'hello'

        if (this.parent) {
            this.parent.addChild(this);
            this.position.y = this.parent.height / 3;
        }
    }
}