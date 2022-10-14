import * as PIXI from "pixi.js";
import { GameMenu } from "../game/BackgroundScape";

export class Sketch {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new PIXI.Application({
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
    });

    this.time = 0;

    this.score = 420

    document.body.appendChild(this.app.view);
    this.GameMenu = new GameMenu();
    // this.setupWordsContainer();
    this.app.stage.addChild(this.GameMenu);
    // this.app.stage.on("pointerdown", (e) => console.log("omg"));
    // this.render();
  }

  // setupWordsContainer() {
  //   new InputText(this.wordsContainer);
  //   this.wordsContainer.positionChildren();
  // }

  // render() {
  //   this.app.ticker.add((delta) => {
  //     this.time += 0.1;
  //     if (Math.floor(this.time) === 10) {
  //       // this.wordsContainer.addWord();
  //       this.time = 0;
  //     }
  //     this.wordsContainer.positionChildren();
  //   });
  // }
}
