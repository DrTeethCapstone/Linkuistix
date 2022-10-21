import * as PIXI from "pixi.js";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

//CREATE A NEW INSTANCE OF A USER INPUT FIELD
export class InputText extends PIXI.Text {
  constructor(parent = null) {
    super("type here", {
      fontFamily: "Press Start 2P",
      fontSize: 24,
      fill: 0xebd25b,
      align: "center",
    });

    this.parent = parent;
    this.userGuess = "";
    this.interactive = true;
    this.enabled = false;
    this.isThinking = false;

    this.worker = new Worker(new URL("./TF_Worker.js", import.meta.url), {
      type: "module",
    });

    this.TFOutput = [];

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

    this.on("pointerdown", (e) => {
      this.style.fill = 0x0eb3e1;
      this.setupKeyboardListener();

      if (!this.parent.parent.parent.children[4].isRunning) {
        this.parent.parent.parent.children[3].fromOffScreen();
        setTimeout(() => {
          this.parent.parent.parent.children[4].ticker.start();
        }, 1000);
      }
    });

    this.setupModel();
  }

  eventListener = (e) => {
    this.updateInputText(e, this);
  };

  resetState() {
    this.userGuess = "";
    this.text = "Click to Start";
    this.style.fill = 0xebd25b;
    this.enabled = false;
    window.removeEventListener("keydown", this.eventListener);
  }

  setupKeyboardListener() {
    if (!this.enabled) {
      this.enabled = true;
      window.addEventListener("keydown", this.eventListener);
    }
  }

  validateWordInput({ targetString, inputString, target }) {
    if (!inputString.length) {
      return false;
    }
    if (targetString.length <= 3 && inputString.length >= 3) {
      if (targetString.slice(0, 3) === inputString.slice(0, 3)) {
        target.invalidGuess(3);
        return false;
      }
    } else if (targetString.length > 3 && inputString.length > 3) {
      if (targetString.slice(0, 4) === inputString.slice(0, 4)) {
        target.invalidGuess(4);
        return false;
      }
    }
    return true;
  }

  updateInputText(e, me) {
    const prevWordObject = this.parent.parent.children[2].children[1];
    if (e.key === "Enter") {
      if (!this.isThinking) {
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
          this.isThinking = true;
          this.worker.postMessage({
            userInput: [this.userGuess],
            tensorWords,
          });

          this.worker.addEventListener("message", async ({ data }) => {
            const { TFOutput } = data;
            console.log("returned from worker: ", TFOutput);
            this.TFOutput = TFOutput;
            for (let i = 0; i < this.TFOutput.length; i++) {
              words[i].similarityScore = this.TFOutput[i];
            }
            console.log(words);
            this.sortBySimilarityScores(words, prevWordObject);
            prevWordObject.updateWord(this.userGuess);
            this.isThinking = false;
          });
        }
      }

      prevWordObject.updateWord(this.userGuess);
      this.userGuess = "";
      me.text = "";
    } else if (e.key === "Backspace") {
      this.userGuess = this.userGuess.slice(0, this.userGuess.length - 1);
      me.text = this.userGuess;
    } else {
      if (this.isLetter(e.key) || e.key === " ") {
        this.userGuess += e.key.toLowerCase();
        me.text = this.userGuess;
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
    this.wordsContainer.checkTargetPosition(guessObj);
  }

  async setupModel() {
    this.model = await use.load();
    this.parent.parent.isLoaded = true;
  }
}
