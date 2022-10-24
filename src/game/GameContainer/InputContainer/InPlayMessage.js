import * as PIXI from "pixi.js";

export class InPlayMessage extends PIXI.Text {
  constructor(parent = null) {
    super("", {
      fontFamily: "Press Start 2P",
      fontSize: 18,
      fill: 0xffffff,
      align: "center",
    });
  }
}
