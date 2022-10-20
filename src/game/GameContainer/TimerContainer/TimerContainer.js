import * as PIXI from "pixi.js";
import { GameOverContainer } from "../GameOver/GameOverContainer";

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class TimerContainer extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;
    this.timerContainer = new PIXI.Container();

    const timeBar = new PIXI.Sprite(PIXI.Texture.WHITE);
    timeBar.anchor.set(0.5, 0.5);
    timeBar.tint = 0x00ff00;
    timeBar.width = parent.width;
    timeBar.height = 25;
    this.timerContainer.addChild(timeBar);

    this.time = parent.width;

    this.increment = .5;

    this.ticker = PIXI.Ticker.shared;
    this.ticker.add((delta) => {
      this.time -= this.increment;
      // console.log(this.time)
      this.updateTimer(timeBar);
      if (this.time <= 0) {
        const parentStage = this.parent.parent;


        this.ticker.stop();

        parentStage.children[1].children[1].toOffScreen();
        parentStage.children[1].children[3].toOffScreen();
        parentStage.children[1].children[3].removeAllChildren()
        parentStage.children[1].animateOpacity(true);
        setTimeout(() => {
          const gameOver = new GameOverContainer(parentStage);
          gameOver.score = parentStage.children[1].children[2].userScore
          gameOver.setupFirstChildren(
            parentStage.children[1].children[2].userScore
          );
          gameOver.position.x = window.innerWidth / 2;
          gameOver.position.y = window.innerHeight / 2;
        }, 0.1);
        //show game over screen
      }
      //   console.log(this.time);
    });

    this.addChild(this.timerContainer);

    if (this.parent) {
      this.parent.addChild(this);
      this.position.x = 0;
      this.position.y = 0;
    }
  }
  updateTimer(timeBar) {
    if (this.time < this.parent.width * 0.66) {
      timeBar.tint = 0xffa500;
    }
    if (this.time < this.parent.width * 0.33) {
      timeBar.tint = 0xff0000;
    }
    gsap.to(timeBar, { width: this.time });
  }
  resetTimer(timeBar) {
    this.time = this.parent.width;
    this.increment = this.increment * 1.1;
    gsap.to(timeBar, { width: this.time });
  }
}
