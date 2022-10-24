import * as PIXI from "pixi.js";

import img1 from "../../../assets/loadingAnimation/frame_00_delay-0.06s.gif";
import img2 from "../../../assets/loadingAnimation/frame_01_delay-0.06s.gif";
import img3 from "../../../assets/loadingAnimation/frame_02_delay-0.06s.gif";
import img4 from "../../../assets/loadingAnimation/frame_03_delay-0.06s.gif";
import img5 from "../../../assets/loadingAnimation/frame_04_delay-0.06s.gif";
import img6 from "../../../assets/loadingAnimation/frame_05_delay-0.06s.gif";
import img7 from "../../../assets/loadingAnimation/frame_06_delay-0.06s.gif";
import img8 from "../../../assets/loadingAnimation/frame_07_delay-0.06s.gif";
import img9 from "../../../assets/loadingAnimation/frame_08_delay-0.06s.gif";
import img10 from "../../../assets/loadingAnimation/frame_09_delay-0.06s.gif";
import img11 from "../../../assets/loadingAnimation/frame_10_delay-0.06s.gif";
import img12 from "../../../assets/loadingAnimation/frame_11_delay-0.06s.gif";
import img13 from "../../../assets/loadingAnimation/frame_12_delay-0.06s.gif";
import img14 from "../../../assets/loadingAnimation/frame_13_delay-0.06s.gif";
import img15 from "../../../assets/loadingAnimation/frame_14_delay-0.06s.gif";
import img16 from "../../../assets/loadingAnimation/frame_15_delay-0.06s.gif";
import img17 from "../../../assets/loadingAnimation/frame_16_delay-0.06s.gif";
import img18 from "../../../assets/loadingAnimation/frame_17_delay-0.06s.gif";
import img19 from "../../../assets/loadingAnimation/frame_18_delay-0.06s.gif";
import img20 from "../../../assets/loadingAnimation/frame_19_delay-0.06s.gif";

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
    const loadingTips = [
      "Antonyms are often great Guesses!",
      "Drew is the game logic master!",
      "Bill insereted a coin to learn object orientated programming!",
      "Bilal has nightmares about the Tensor Flowing!",
      `Noel's dreams are multi threaded!`,
      "Will designed this beautiful background!",
      `If you're having trouble getting a high score, try getting better at the game!`,
      `Don't forget to breathe. Very Important!`,
      "Bug...or Feature?!",
      "This loading screen does not require that you click to continue",
      "Time is going to count down while you are thinking",
      "Try using pop culture references for a guess!",
      "Has the meaning of Run, Run Amok?",
      "Typing in actual words will improve tensor flow performance",
      "Type fast to avoid Game Over",
      "Lunchtime is for Lunch!",
      "Open pizza box before eating pizza",
      "Why do we have noses that run, and feet that smell?",
      `Example of something that you shouldn't read`,
      "Tip: The game is loading!",
      `I wanted to read the tips on the loading screen but the game loaded too quickly`,
      "What does a baby computer call his father??? DATA",
      "git push --force ...problem solved!!",
      "in case of fire:\n git commit, git push, leave building",
      `It's working on my machine!`,
      "Wow a different error message!!! Progress!",
      `The h in 'software development' stands for 'happiness'`,
      "console.log(everySingleThing)",
      `I see you're looking for a React Dev with 15 years of experience...interesting!`,
    ];

    let textureArray = [];
    for (let i = 0; i < arr.length; i++) {
      let texture = PIXI.Texture.from(arr[i]);
      textureArray.push(texture);
    }

    let animatedSprite = new PIXI.AnimatedSprite(textureArray);
    animatedSprite.anchor.set(0.5, 0.5);
    animatedSprite.play();
    animatedSprite.animationSpeed = 0.4;
    this.addChild(animatedSprite);

    this.loadingText = new PIXI.Text("Loading", {
      fontFamily: "Press Start 2P",
      fontSize: 24,
      fill: 0x000000,
    });

    let phrase = loadingTips[Math.floor(Math.random() * loadingTips.length)];
    this.toolTip = new PIXI.Text(phrase, {
      fontFamily: "Arial",
      fontSize: 22,
      fill: 0xffffff,
    });

    this.loadingText.anchor.set(0.5, 3.5);
    this.toolTip.anchor.set(0.5, 8.3);
    this.addChild(this.loadingText);
    this.addChild(this.toolTip);
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

      if (this.gameContainer.children[3].isLoaded) {
        setTimeout(() => {
          this.gameContainer.isLoaded = true;
        }, 2500);
      }

      if (this.gameContainer.isLoaded && this.parent) {
        this.ticker.stop();
        this.gameContainer.isLoaded = false;
        this.parent.removeChild(this);
        this.gameContainer.position.x = window.innerWidth / 2;
        this.gameContainer.animateOpacity(false);
        this.gameContainer.children[2].score.alpha = 0;

        //LOAD GAME ELEMENTS IF THERE ISN'T A TUTORIAL CONTAINER
        if (this.gameContainer.children.length < 6) {
          this.gameContainer.animateElementsIn();
        }
      }
    });
    this.ticker.start();
    let localTutorial = window.localStorage.getItem('tutorial')

    if (localTutorial === 'false') {
      localTutorial = false
    } else {
      localTutorial = true
    }
    console.log(localTutorial)
    this.gameContainer = new GameContainer(this.parent, localTutorial);
  }

  updateText(string) {
    this.loadingText.text = string;
  }
}
