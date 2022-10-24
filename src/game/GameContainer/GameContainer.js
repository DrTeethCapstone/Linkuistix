import * as PIXI from "pixi.js";
import { gsap } from "gsap";

import { InputContainer } from "./InputContainer/InputContainer";
import { WordsContainer } from "./WordsContainer/WordsContainer";
import { ScoreContainer } from "./ScoreContainer/ScoreContainer";
import { TimerContainer } from "./TimerContainer/TimerContainer";
import { TutorialContainer } from "./TutorialContainer/TutorialContainer";

export class GameContainer extends PIXI.Container {
  constructor(parent, tutorial = true) {
    super();
    this.stage = parent;
    this.tutorial = tutorial;
    this.alpha = 0;
    this.isPlaying = false;
    this.isLoaded = false;

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0x1f1f1f;
    bg.alpha = 0;
    bg.width = (window.innerWidth * 50) / 100;
    bg.height = window.innerHeight;
    bg.anchor.set(0.5, 0);
    this.addChild(bg);

    this.inputContainer = new InputContainer(this);
    this.scoreContainer = new ScoreContainer(this);
    this.wordsContainer = new WordsContainer(this);
    this.timerContainer = new TimerContainer(this);
    if (this.tutorial) {
      this.tutorialContainer = new TutorialContainer(this);
    }

    if (this.stage) {
      this.stage.addChild(this);
      this.position.x = this.stage.width / 2;
    }
  }

  animateOpacity(boolean) {
    if (boolean) {
      gsap.to(this, {
        alpha: 0,
        duration: 1.5,
      });
    } else {
      gsap.to(this, {
        alpha: 1,
        duration: 1,
      });
    }
  }

  animateElementsIn() {
    gsap.to(this.parent.children[0], { alpha: 1, duration: 0.5 });
    // this.parent.children[0].alpha = 1;
    this.inputContainer.fromOffScreen();
    this.wordsContainer.fromOffScreen();
    this.timerContainer.fromOffScreen();
    this.scoreContainer.score.alpha = 1;
  }

  gameOver() {
    this.inputContainer.toOffScreen();
    this.wordsContainer.toOffScreen();
    this.timerContainer.stopTimer();
    this.animateOpacity(true);

    setTimeout(() => {
      this.wordsContainer.removeAllChildren();
      this.wordsContainer.setupFirstChildren();
      this.scoreContainer.score.resetScore();
      this.scoreContainer.score.updatePosition();

      this.inputContainer.multiplier = 1;
      this.inputContainer.prevGuess.updateWord(" ");
      this.inputContainer.interaction.resetState();
      while (this.inputContainer.multiplierContainer.children.length > 1) {
        this.inputContainer.multiplierContainer.removeChild(
          this.inputContainer.multiplierContainer.children[1]
        );
      }
      this.timerContainer.increment = 0.5;
    }, 1100);
  }

  gameOverStartGame() {
    this.animateOpacity(false);
    this.timerContainer.resetTimer();
    this.timerContainer.updateTimer();
    this.inputContainer.fromOffScreen(25);
  }
}
