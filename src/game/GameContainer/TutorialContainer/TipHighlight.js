import * as PIXI from "pixi.js";

export class TipHighlight extends PIXI.Sprite {
  constructor(height, width, xPos, yPos, parent = null) {
    super(PIXI.Texture.WHITE);
    this.tint = 0xffffff
    this.alpha = 0; // TODO: change back to 0
    this.parent = parent;
    this.height = height;
    this.width = width;
    this.visible = false;
    this.anchor.set(0.5);
    this.position.x = xPos;
    this.position.y = yPos;
  }
}