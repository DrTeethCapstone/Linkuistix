import * as PIXI from "pixi.js";
import { GameOverContainer } from "../GameOver/GameOverContainer";

import { gsap } from "gsap";

export class TimerContainer extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;

    this.timeBar = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.timeBar.anchor.set(0.5);
    this.timeBar.tint = 0x00ff00;
    this.timeBar.width = this.parent.width;
    this.timeBar.height = 20;
    this.addChild(this.timeBar);

    this.time = this.parent.width;
    this.increment = 0.5;

    if (this.parent) {
      this.parent.addChild(this);
      this.position.y = -25;
    }
  }

  fromOffScreen() {
    gsap.to(this, { y: 10, duration: 1 });
  }

  startTimer() {
    this.ticker = new PIXI.Ticker();
    this.ticker.add(() => {
      this.isRunning = true;
      this.time -= this.increment;
      this.updateTimer(this.timeBar);
      if (this.time <= 0) {
        this.ticker.stop();
        const gameContainer = this.parent;
        const parentStage = gameContainer.parent;
        const score = parentStage.children[1].children[2].userScore;
        this.ticker.stop();
        gameContainer.gameOver();
        setTimeout(() => {
          const gameOver = new GameOverContainer(parentStage);
          gameOver.score = score
          gameOver.setupFirstChildren(score);
          gameOver.position.x = window.innerWidth / 2;
          gameOver.position.y = window.innerHeight / 2;
        }, 1100);
      }
    });
    this.ticker.start();
  }

  stopTimer() {
    this.ticker.stop();
    this.isRunning = false;
  }

  updateTimer() {
    if (this.time > this.parent.width * 0.66) {
      this.timeBar.tint = 0x00ff00;
    }
    if (this.time < this.parent.width * 0.66) {
      this.timeBar.tint = 0xffa500;
    }
    if (this.time < this.parent.width * 0.33) {
      this.timeBar.tint = 0xff0000;
    }
    gsap.to(this.timeBar, { width: this.time });
  }

  resetTimer() {
    this.time = this.parent.width;
    if (this.increment < 5) {
      this.increment = this.increment * 1.1;
    }
    gsap.to(this.timeBar, { width: this.time });
  }
}
