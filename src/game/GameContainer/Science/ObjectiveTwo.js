import * as PIXI from "pixi.js";
import { Word } from "../WordsContainer/Words";
import { gsap } from "gsap";

export class ObjectiveTwo extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;
    if (this.parent) {
      this.parent.addChild(this);
    }
    this.objective = new PIXI.Text(
      "Score points by getting the target in the bottom four of the list.",
      {
        fontFamily: "Press Start 2P",
        fontSize: 20,
        fill: 0xffffff,
        align: "center",
        visible: true,
        wordWrap: true,
        wordWrapWidth: (window.innerWidth * 50) / 100,
        lineHeight: 30,
      }
    );

    this.objective.position.x = -this.objective.width / 2;
    this.objective.position.y = 150;
    this.addChild(this.objective);

    this.inputContainer = new PIXI.Container();
    const inputHightlighter = new PIXI.Sprite(PIXI.Texture.WHITE);
    inputHightlighter.height = 110;
    inputHightlighter.width = (window.innerWidth * 50) / 100;
    this.inputContainer.position.x = -inputHightlighter.width / 2;
    this.inputContainer.position.y =
      window.innerHeight - inputHightlighter.height;
    inputHightlighter.alpha = 0;
    this.inputContainer.addChild(inputHightlighter);
    this.addChild(this.inputContainer);

    //RECTANGE FOR PREVIOUS GUESS
    this.multiplierSection = new PIXI.Graphics();
    this.multiplierSection.lineStyle(5, 0xffff);
    this.multiplierSection.drawRect(
      0,
      0,
      inputHightlighter.width,
      inputHightlighter.height / 4
    );

    this.inputContainer.addChild(this.multiplierSection);

    this.correctGuess = new PIXI.Text(
      "< Successful attempts\nadds to multiplier",
      {
        fontFamily: "Press Start 2P",
        fontSize: 12,
        fill: 0xffffff,
        align: "center",
      }
    );
    this.correctGuess.position.x = this.inputContainer.width;
    this.correctGuess.position.y =
      this.inputContainer.height - this.correctGuess.height * 4;
    this.inputContainer.addChild(this.correctGuess);

    this.failedGuess = new PIXI.Text("This is your multiplier >", {
      fontFamily: "Press Start 2P",
      fontSize: 12,
      fill: 0xffffff,
      align: "center",
    });
    this.failedGuess.position.x = -this.failedGuess.width;
    this.failedGuess.position.y = this.failedGuess.height / 2;
    this.inputContainer.addChild(this.failedGuess);

    this.exampleWordsContainer = new PIXI.Container();
    const exampleWord = new Word("testExampleWord");
    const wordsHightlighter = new PIXI.Sprite(PIXI.Texture.WHITE);
    wordsHightlighter.alpha = 0.25;
    wordsHightlighter.height = exampleWord.height * 10;
    wordsHightlighter.width = exampleWord.width;
    this.exampleWordsContainer.addChild(wordsHightlighter);
    this.addChild(this.exampleWordsContainer);

    this.exampleWords = [
      "curious",
      "adventurous",
      "creative",
      "supportive",
      "committed",
      "positive",
      "sensational",
      "luxurious",
      "inpsiring",
      "revolutionary",
    ].map((word, i) => {
      if (i < 9) {
        const newWord = new Word(word, this.exampleWordsContainer);
        newWord.index = 9 - i;
        return newWord;
      }
      const target = new Word(word, this.exampleWordsContainer, true);
      target.index = 0;
      return target;
    });
    this.exampleWordsContainer.position.y =
      window.innerHeight -
      inputHightlighter.height -
      this.exampleWordsContainer.height -
      2;
    this.exampleWordsContainer.position.x =
      -this.exampleWordsContainer.width / 2;

    this.targetRectangle = new PIXI.Graphics();
    this.targetRectangle.lineStyle(5, 0xffff);
    this.targetRectangle.drawRect(
      0,
      0,
      exampleWord.width + 5,
      exampleWord.height * 4 + 5
    );
    this.targetRectangle.position.y =
      this.exampleWordsContainer.height - this.targetRectangle.height + 5;

    this.exampleWordsContainer.addChild(this.targetRectangle);

    this.thisIsTarget = new PIXI.Text("Target Area >", {
      fontFamily: "Press Start 2P",
      fontSize: 12,
      fill: 0xffffff,
      align: "center",
    });
    this.thisIsTarget.position.x = -this.thisIsTarget.width - 20;
    this.thisIsTarget.position.y =
      this.exampleWordsContainer.height - this.thisIsTarget.height * 5;
    this.exampleWordsContainer.addChild(this.thisIsTarget);
  }

  hide() {
    this.objective.alpha = 0;
    this.exampleWordsContainer.alpha = 0;
    this.targetRectangle.alpha = 0;
    this.thisIsTarget.alpha = 0;
    this.failedGuess.alpha = 0;
    this.correctGuess.alpha = 0;
    this.multiplierSection.alpha = 0;
  }

  animateTargetArea() {
    this.exampleWordsContainer.alpha = 1;
    gsap.to(this.objective, { alpha: 1, delay: 0.5, duration: 1 });
    gsap.to(this.targetRectangle, { alpha: 1, delay: 1.1, duration: 1 });
    gsap.to(this.thisIsTarget, { alpha: 1, delay: 1.2, duration: 1 });
    setTimeout(() => {
      this.parent.inProgress = false;
    }, 1300);
  }

  animateMultiplier() {
    for (let i = 0; i < 4; i++) {
      const rect = new PIXI.Graphics();
      rect.beginFill(0xebd25b);
      rect.drawRect(
        0,
        0,
        this.inputContainer.width / 8,
        this.inputContainer.height / 8
      );
      rect.endFill();
      rect.position.x = rect.width * i + i * 10;
      rect.position.y = rect.height / 2;
      this.inputContainer.addChild(rect);
    }
    gsap.to(this.multiplierSection, { alpha: 1, duration: 1 });
    gsap.to(this.failedGuess, { alpha: 1, delay: 0.5, duration: 1 });
    gsap.to(this.correctGuess, { alpha: 1, delay: 0.5, duration: 1 });
    setTimeout(() => {
      this.parent.inProgress = false;
    }, 1300);
  }

  animateOff() {
    gsap.to(this.objective, { alpha: 0, duration: 0.5 });
    gsap.to(this.targetRectangle, { alpha: 0, duration: 0.5 });
    gsap.to(this.thisIsTarget, { alpha: 0, duration: 0.5 });
    gsap.to(this.multiplierSection, { alpha: 0, duration: 0.5 });
    gsap.to(this.failedGuess, { alpha: 0, duration: 0.5 });
    gsap.to(this.correctGuess, { alpha: 0, duration: 0.5 });
    gsap.to(this.exampleWordsContainer, { alpha: 0, duration: 0.5 });

    this.inputContainer.children
      .slice(4)
      .forEach((graphic) => this.inputContainer.removeChild(graphic));
  }
}
