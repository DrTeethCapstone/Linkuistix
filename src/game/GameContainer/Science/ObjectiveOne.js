import * as PIXI from "pixi.js";
import { Word } from "../WordsContainer/Words";
import { gsap } from "gsap";

export class ObjectiveOne extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;
    if (this.parent) {
      this.parent.addChild(this);
    }

    //TUTORIAL OBJECTIVE
    this.objective = new PIXI.Text(
      "Enter a word that associates with the target word.",
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

    const inputContainer = new PIXI.Container();
    const inputHightlighter = new PIXI.Sprite(PIXI.Texture.WHITE);
    inputHightlighter.height = 110;
    inputHightlighter.width = (window.innerWidth * 50) / 100;
    inputContainer.position.x = -inputHightlighter.width / 2;
    inputContainer.position.y = window.innerHeight - inputHightlighter.height;
    inputHightlighter.alpha = 0;
    inputContainer.addChild(inputHightlighter);
    this.addChild(inputContainer);

    //RECTANGE FOR INPUT TEXT
    this.inputRect = new PIXI.Graphics();
    this.inputRect.lineStyle(5, 0xffff);
    this.inputRect.drawRect(
      0,
      0,
      inputHightlighter.width,
      inputHightlighter.height
    );
    inputContainer.addChild(this.inputRect);

    //RECTANGE FOR PREVIOUS GUESS
    this.prevGuessRect = new PIXI.Graphics();
    this.prevGuessRect.lineStyle(5, 0xffff);
    this.prevGuessRect.drawRect(
      0,
      0,
      inputHightlighter.width,
      inputHightlighter.height / 2
    );
    inputContainer.addChild(this.prevGuessRect);

    //INTRO TO INPUT FIELD
    this.thisIsInput = new PIXI.Text("< Enter Guess Here", {
      fontFamily: "Press Start 2P",
      fontSize: 12,
      fill: 0xffffff,
      align: "center",
    });
    this.thisIsInput.position.x = inputContainer.width;
    this.thisIsInput.position.y =
      inputContainer.height - this.thisIsInput.height * 3;
    inputContainer.addChild(this.thisIsInput);

    //INTRO TO PREV GUESS FIELD
    this.thisIsPrevGuess = new PIXI.Text(
      "Your Previous Guess > \nDisplays Here",
      {
        fontFamily: "Press Start 2P",
        fontSize: 12,
        fill: 0xffffff,
        align: "center",
      }
    );
    this.thisIsPrevGuess.position.x = -this.thisIsPrevGuess.width;
    this.thisIsPrevGuess.position.y = this.thisIsPrevGuess.height;
    inputContainer.addChild(this.thisIsPrevGuess);

    //INTRO TO WORDS CONTAINER
    this.exampleWordsContainer = new PIXI.Container();
    const exampleWord = new Word("testExampleWord");
    const wordsHightlighter = new PIXI.Sprite(PIXI.Texture.WHITE);
    wordsHightlighter.alpha = 0.25;
    wordsHightlighter.height = exampleWord.height * 10;
    wordsHightlighter.width = exampleWord.width;
    this.exampleWordsContainer.addChild(wordsHightlighter);
    this.addChild(this.exampleWordsContainer);
    [
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
        return new Word(word, this.exampleWordsContainer);
      }
      return new Word(word, this.exampleWordsContainer, true);
    });
    this.exampleWordsContainer.position.y =
      window.innerHeight -
      inputHightlighter.height -
      this.exampleWordsContainer.height -
      2;
    this.exampleWordsContainer.position.x =
      -this.exampleWordsContainer.width / 2;

    //INTRO TO TARGET
    this.targetRectangle = new PIXI.Graphics();
    this.targetRectangle.lineStyle(5, 0xffff);
    this.targetRectangle.drawRect(
      0,
      0,
      exampleWord.width + 5,
      exampleWord.height + 5
    );
    this.exampleWordsContainer.addChild(this.targetRectangle);

    this.thisIsTarget = new PIXI.Text("Your Target >", {
      fontFamily: "Press Start 2P",
      fontSize: 12,
      fill: 0xffffff,
      align: "center",
    });
    this.thisIsTarget.position.x = -this.thisIsTarget.width - 20;
    this.thisIsTarget.position.y = this.thisIsTarget.height;
    this.exampleWordsContainer.addChild(this.thisIsTarget);
  }

  hide() {
    this.inputRect.alpha = 0;
    this.prevGuessRect.alpha = 0;
    this.thisIsInput.alpha = 0;
    this.thisIsPrevGuess.alpha = 0;
    this.exampleWordsContainer.alpha = 0;
    this.targetRectangle.alpha = 0;
    this.thisIsTarget.alpha = 0;
  }
  animateInput() {
    this.parent.parent.children[1].fromOffScreen();
    gsap.to(this.inputRect, { alpha: 1, delay: 1, duration: 1 });
    gsap.to(this.prevGuessRect, { alpha: 1, delay: 1, duration: 1 });
    gsap.to(this.thisIsInput, { alpha: 1, delay: 1.1, duration: 1 });
    gsap.to(this.thisIsPrevGuess, { alpha: 1, delay: 1.1, duration: 1 });
    setTimeout(() => {
      this.parent.inProgress = false;
    }, 1300);
  }
  animateWords() {
    gsap.to(this.exampleWordsContainer, { alpha: 1, duration: 1 });
    gsap.to(this.targetRectangle, { alpha: 1, delay: 1, duration: 1 });
    gsap.to(this.thisIsTarget, { alpha: 1, delay: 1.1, duration: 1 });
    setTimeout(() => {
      this.parent.inProgress = false;
    }, 1300);
  }

  animateOff() {
    gsap.to(this.inputRect, { alpha: 0, duration: 0.5 });
    gsap.to(this.prevGuessRect, { alpha: 0, duration: 0.5 });
    gsap.to(this.thisIsInput, { alpha: 0, duration: 0.5 });
    gsap.to(this.thisIsPrevGuess, { alpha: 0, duration: 0.5 });
    gsap.to(this.targetRectangle, { alpha: 0, duration: 0.5 });
    gsap.to(this.thisIsTarget, { alpha: 0, duration: 0.5 });
    gsap.to(this.objective, { alpha: 0, duration: 0.5 });
  }
}
