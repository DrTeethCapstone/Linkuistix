import * as PIXI from "pixi.js";

export class TipText extends PIXI.Text {
  constructor(parent = null) {
    super("", {
      fontFamily: "Press Start 2P",
      fontSize: 20,
      fill: 0xffffff,
      align: "center",
      visible: true,
      wordWrap: true,
      wordWrapWidth: 600,
      lineHeight: 80,
    });
  }
}