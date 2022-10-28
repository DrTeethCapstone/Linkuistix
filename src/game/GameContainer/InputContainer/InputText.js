import * as PIXI from 'pixi.js';
// import { InPlayMessage } from "./InPlayMessage";

//howler sounds
import { Howl } from 'howler';

//CREATE A NEW INSTANCE OF A USER INPUT FIELD
export class InputText extends PIXI.Text {
  constructor(parent = null) {
    super('type here', {
      fontFamily: 'Press Start 2P',
      fontSize: 24,
      fill: 0xebd25b,
      align: 'center',
    });

    this.parent = parent;
    this.userGuess = '';
    this.interactive = true;
    this.enabled = false;
    this.isThinking = false;
    // this.message = new InPlayMessage(this);

    this.worker = new Worker(new URL('./TF_Worker.js', import.meta.url), {
      type: 'module',
    });

    this.worker.addEventListener('message', this.setTFOutout);

    if (parent) {
      const container = new PIXI.Container();
      const containerBG = new PIXI.Sprite(PIXI.Texture.WHITE);
      containerBG.tint = 0x1f1f1f;
      containerBG.alpha = 0.8;
      containerBG.width = this.parent.width;
      containerBG.height = this.parent.height / 2;
      container.position.y = -containerBG.height;
      container.position.x = -containerBG.width / 2;
      container.addChild(containerBG);
      this.parent.addChild(container);
      container.addChild(this);
      this.position.x = containerBG.width / 2;
      this.position.y = containerBG.height - this.height;
      this.anchor.set(0.5);
    }

    this.on('pointerdown', (e) => {
      this.style.fill = 0x0eb3e1;
      this.setupKeyboardListener();
      if (!this.parent.parent.parent.children[4].isRunning) {
        this.parent.parent.parent.wordsContainer.fromOffScreen();
        setTimeout(() => {
          this.parent.parent.parent.children[4].startTimer();
        }, 1100);
      }
    });
  }

  eventListener = (e) => {
    this.updateInputText(e);
  };

  resetState() {
    this.userGuess = '';
    this.text = 'Click to Start';
    this.style.fill = 0xebd25b;
    this.enabled = false;
    window.removeEventListener('keydown', this.eventListener);
  }

  setupKeyboardListener() {
    if (!this.enabled) {
      this.enabled = true;
      window.addEventListener('keydown', this.eventListener);
    }
  }

  validateWordInput({ targetString, inputString, target }) {
    if (!inputString.length) {
      this.text = '';
      this.userGuess = '';
      return false;
    }
    if (targetString.length <= 3 && inputString.length >= 3) {
      if (targetString.slice(0, 3) === inputString.slice(0, 3)) {
        target.invalidGuess(3);
        // this.removeChild(this.message);
        this.text = '';
        this.userGuess = '';
        return false;
      }
    } else if (targetString.length > 3 && inputString.length > 3) {
      if (targetString.slice(0, 4) === inputString.slice(0, 4)) {
        target.invalidGuess(4);
        // this.removeChild(this.message);
        this.text = '';
        this.userGuess = '';
        return false;
      }
    }
    return true;
  }

  setTFOutout = async ({ data }) => {
    const { TFOutput } = data;
    this.TFOutput = TFOutput;
  };

  createTicker() {
    this.ticker = new PIXI.Ticker();
    this.isThinking = true;
    this.ticker.add((delta) => {
      if (this.TFOutput) {
        this.ticker.stop();
        this.wordsContainer.children.slice(1).forEach((word, i) => {
          word.similarityScore = this.TFOutput[i];
        });

        const sortedArray = this.wordsContainer.children
          .slice(1)
          .sort((a, b) => {
            return b.similarityScore - a.similarityScore;
          });

        sortedArray.forEach((word, i) => {
          word.index = i;
          word.updatePosition();
        });

        if (this.wordsContainer.target.index <= 3) {
          let targetedSimilarityScore = sortedArray.filter(
            (elem) => elem.isTarget
          )[0].similarityScore;
          this.setSimilarityBonus(targetedSimilarityScore);
          for (let i = this.wordsContainer.children.length - 1; i > 0; i--) {
            if (this.wordsContainer.children[i].index <= 3) {
              this.wordsContainer.removeChild(this.wordsContainer.children[i]);
            }
          }
          this.parent.parent.updateMultiplier(true);
          this.wordsContainer.dropChildrenPosition();
          this.wordsContainer.parent.children[4].resetTimer();
        } else {
          this.parent.parent.updateMultiplier(false);
        }
        this.isThinking = false;
      }
    });
  }

  updateInputText(e) {
    this.prevWordObject = this.parent.parent.children[2].children[1];
    if (e.key === 'Enter') {
      if (!this.isThinking) {
        // this.message.text = "Please wait. Tensor is thinking...";
        // this.message.anchor.set(0.5);
        // this.addChild(this.message);
        this.wordsContainer = this.parent.parent.parent.children[3];
        let words = this.wordsContainer.children.slice(1);
        let [targetWord] = words.filter((word) => word.isTarget);
        const tensorWords = words.map((word) => word.text);
        const validation = {
          targetString: targetWord.text,
          inputString: this.userGuess.toLowerCase(),
          target: targetWord,
        };

        if (this.validateWordInput(validation)) {
          //SFX
          const submit = new Howl({
            src: ['/sounds/submit.mp3'],
            volume: 0.25,
          });

          setTimeout(() => {
            submit.play();
          }, 100);
          this.createTicker(words);
          this.ticker.start();
          // this.isThinking = true;
          this.worker.postMessage({
            userInput: [this.userGuess],
            tensorWords,
          });
          this.prevWordObject.updateWord(this.userGuess);
          this.userGuess = '';
          this.text = '';
        }
      }
    } else if (e.key === 'Backspace') {
      this.userGuess = this.userGuess.slice(0, this.userGuess.length - 1);
      this.text = this.userGuess;
    } else {
      if (this.isLetter(e.key) || e.key === ' ') {
        this.userGuess += e.key.toLowerCase();
        this.text = this.userGuess;
      }
    }
  }

  isLetter(char) {
    return char.length === 1 && char.match(/[a-z]/i);
  }

  sortBySimilarityScores(wordsObjectArray, guessObj) {
    wordsObjectArray.sort((a, b) => {
      return b.similarityScore - a.similarityScore;
    });
    wordsObjectArray.forEach((word, i) => {
      word.index = i;
      word.updatePosition();
    });
  }

  setSimilarityBonus(similarityScore) {
    if (!similarityScore) similarityScore = 0;
    this.similarityBonus = Math.floor(50 * similarityScore);
  }
}
