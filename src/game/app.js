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
    // this.tutorial = true;
    // document.body.appendChild(this.app.view);
    this.user = {};
    this.time = 0;
    this.gameOver = false;
    this.gameMenu = new GameMenu(this.app.stage);
    if (this.user.username) {
      this.gameMenu.user = this.user;
    }
    document.body.appendChild(this.app.view);
  }

  checkPlaying() {
    if (this.playing) {
    }
  }
  setPlaying(torf) {
    this.playing = torf;
  }
  setUser(user) {
    this.user = user;
    this.gameMenu.stage.user = user;
    this.gameMenu.user = user;
    this.gameMenu.stage.user = user;
  }
  checkUser() {
    console.log(this.gameMenu.user);
  }
}
