import * as PIXI from "pixi.js";
import { GameMenu } from "./GameContainer/GameMenu/GameMenu";
//ANIMATION PLUGINS
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TutorialContainer } from "./GameContainer/TutorialContainer/TutorialContainer"
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
    this.playing = false
    this.tutorial = true


    document.body.appendChild(this.app.view);

    //CREATE GAME CONTAINER AND STORE ALL GAME CONTAINERS/ELEMENTS INSIDE

    this.user = {}
    this.time = 0;
    this.gameOver = false;

    this.gameMenu = new GameMenu(this.app.stage);
    document.body.appendChild(this.app.view);
  }

  checkPlaying() {
    if (this.playing) {
      // this.gameContainer = new GameContainer(this.app.stage);
      // this.gameContainer.position.set(this.width / 2, 0);
      // this.render()
      if (this.tutorial) {
        this.tutorial = false
        this.tutorialContainer = new TutorialContainer(this.app.stage)
      }
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
