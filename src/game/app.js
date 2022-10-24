import * as PIXI from "pixi.js";
import { GameMenu } from "./GameContainer/GameMenu/GameMenu";
//ANIMATION PLUGINS
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class Sketch {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new PIXI.Application({
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
    });

    this.playing = false;
    this.tutorial = true;
    document.body.appendChild(this.app.view);
    this.user = {};
    this.time = 0;
    this.gameOver = false;
    this.gameMenu = new GameMenu(this.app.stage);
    this.background = new GameMenu(this.app.stage);
    while (this.background.children.length > 1) {
      this.background.removeChild(
        this.background.children[this.background.children.length - 1]
      );
    }
    this.background.visible = false;
  }

  checkPlaying() {
    if (this.playing) {
    }
  }
  setPlaying(torf) {
    this.playing = torf;
  }
  setUser(user) {
    this.gameContainer.user = user;
  }
  checkUser() {
    console.log(this.gameContainer.user);
  }
}
