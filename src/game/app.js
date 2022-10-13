import * as PIXI from "pixi.js";
import { GameContainer } from "./GameContainer/GameContainer";
import { GameMenu } from "./Background/GameMenu";
//ANIMATION PLUGINS
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class Sketch {
  //CREATE AND ADD A NEW INSTANCE OF THE CANVAS WITH STYLES
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new PIXI.Application({
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
    });
    this.playingGame = false

    document.body.appendChild(this.app.view);
    this.GameMenu = new GameMenu();
    // this.setupWordsContainer();
    this.app.stage.addChild(this.GameMenu);



    //CREATE GAME CONTAINER AND STORE ALL GAME CONTAINERS/ELEMENTS INSIDE


    // const test = new GameMenu(this.app.stage);

    //THIS CURRENTLY INITIATES THE GAME LOOP
    // this.render();
  }
  //RUNS GAME LOOP AND TRIGGERS THINGS THAT SHOULD RENDER ON EACH FRAME
  render() {
    this.app.ticker.add((delta) => {
      const wordsContainer = this.gameContainer.children[3];
      this.time += 0.05;
      if (Math.floor(this.time) === 10) {
        // wordsContainer.addWord();
        this.time = 0;
      }
      //   console.log("gameover!!!");
      //   this.app.stop();
    });
  }
  checkPlaying() {
    if (this.playingGame) {
      console.log('hit')
      this.gameContainer = new GameContainer(this.app.stage);
      this.gameContainer.position.set(this.width / 2, 0);
      this.time = 0;
    }
  }
  setPlaying(torf) {
    console.log(torf)
    this.playingGame = torf
  }
}
