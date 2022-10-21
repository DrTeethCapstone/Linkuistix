import * as PIXI from "pixi.js";

import img1 from "../../img/loadingAnimation/frame_00_delay-0.06s.gif";
import img2 from "../../img/loadingAnimation/frame_01_delay-0.06s.gif";
import img3 from "../../img/loadingAnimation/frame_02_delay-0.06s.gif";
import img4 from "../../img/loadingAnimation/frame_03_delay-0.06s.gif";
import img5 from "../../img/loadingAnimation/frame_04_delay-0.06s.gif";
import img6 from "../../img/loadingAnimation/frame_05_delay-0.06s.gif";
import img7 from "../../img/loadingAnimation/frame_06_delay-0.06s.gif";
import img8 from "../../img/loadingAnimation/frame_07_delay-0.06s.gif";
import img9 from "../../img/loadingAnimation/frame_08_delay-0.06s.gif";
import img10 from "../../img/loadingAnimation/frame_09_delay-0.06s.gif";
import img11 from "../../img/loadingAnimation/frame_10_delay-0.06s.gif";
import img12 from "../../img/loadingAnimation/frame_11_delay-0.06s.gif";
import img13 from "../../img/loadingAnimation/frame_12_delay-0.06s.gif";
import img14 from "../../img/loadingAnimation/frame_13_delay-0.06s.gif";
import img15 from "../../img/loadingAnimation/frame_14_delay-0.06s.gif";
import img16 from "../../img/loadingAnimation/frame_15_delay-0.06s.gif";
import img17 from "../../img/loadingAnimation/frame_16_delay-0.06s.gif";
import img18 from "../../img/loadingAnimation/frame_17_delay-0.06s.gif";
import img19 from "../../img/loadingAnimation/frame_18_delay-0.06s.gif";
import img20 from "../../img/loadingAnimation/frame_19_delay-0.06s.gif";

import { GameContainer } from "../GameContainer";

export class LoadingContainer extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;
    this.position.set(window.innerWidth / 2, window.innerHeight / 2);
    if (this.parent) {
      this.parent.addChild(this);
    }
    const arr = [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
      img17,
      img18,
      img19,
      img20,
    ];

    let textureArray = [];
    for (let i = 0; i < arr.length; i++) {
      let texture = PIXI.Texture.from(arr[i]);
      textureArray.push(texture);
    }

    let animatedSprite = new PIXI.AnimatedSprite(textureArray);
    animatedSprite.position.set(-200, -150);
    animatedSprite.play();
    animatedSprite.animationSpeed = 0.4;
    this.addChild(animatedSprite);

    this.loadingText = new PIXI.Text("Loading", {
      fontFamily: "Chakra Petch",
      fontSize: 24,
      fill: 0x000000,
    });

    this.loadingText.position.set(-5, -50);
    this.addChild(this.loadingText);
    this.gameContainer = {};
    this.time = 0;
    this.loadAssets();
  }

  loadAssets() {
    this.ticker = new PIXI.Ticker();
    this.ticker.add(() => {
      this.time += 0.05;
      if (!this.gameContainer.isLoaded) {
        if (Math.floor(this.time) === 5) {
          this.updateText("Loading.");
        }
        if (Math.floor(this.time) === 10) {
          this.updateText("Loading..");
        }
        if (Math.floor(this.time) === 15) {
          this.updateText("Loading...");
          this.time = 0;
        }
      }

      if (
        this.gameContainer.children[1].isLoaded &&
        this.gameContainer.children[3].isLoaded
      ) {
        this.gameContainer.isLoaded = true;
      }

      if (this.gameContainer.isLoaded && this.parent) {
        // console.log(this.gameContainer, "help mee");
        this.ticker.stop();
        this.gameContainer.isLoaded = false;
        this.parent.removeChild(this);
        this.gameContainer.position.x = window.innerWidth / 2;
        this.gameContainer.animateOpacity(false);
        this.gameContainer.children[1].fromOffScreen();
        this.gameContainer.children[3].fromOffScreen();
        this.gameContainer.children[4].fromOffScreen();
        this.gameContainer.children[4].startTimer();
      }
    });
    this.ticker.start();
    this.gameContainer = new GameContainer();
    this.parent.addChild(this.gameContainer);
  }

  updateText(string) {
    this.loadingText.text = string;
  }
}
