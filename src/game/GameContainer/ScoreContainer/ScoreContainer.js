import * as PIXI from "pixi.js";
import { Score } from "./Score";

export class ScoreContainer extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;
    this.userScore = 0;

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.alpha = 0;
    bg.width = (window.innerWidth * 50) / 100;
    bg.height = 250;
    bg.anchor.set(0.5, 1);
    this.addChild(bg);

    this.userScoreContainer = new PIXI.Container();
    const USCBackground = new PIXI.Sprite(PIXI.Texture.WHITE);
    USCBackground.alpha = 0;
    USCBackground.width = bg.width;
    USCBackground.height = bg.height * 0.75;
    this.userScoreContainer.position.x = USCBackground.width / -2;
    this.userScoreContainer.position.y = -USCBackground.height;
    this.userScoreContainer.addChild(USCBackground);

    this.score = new Score(this.userScoreContainer);
    this.userScoreContainer.addChild(this.score);

    this.addChild(this.userScoreContainer);

    if (this.parent) {
      this.parent.addChild(this);
      this.position.x = 0;
      this.position.y = this.height * 0.9;
    }
  }
}
