import * as PIXI from 'pixi.js';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

//CREATE A NEW INSTANCE OF A USER INPUT FIELD
export class InputText extends PIXI.Text {
  constructor(parent = null) {
    super('type here', {
      fontFamily: 'Press Start 2P',
      fontSize: 24,
      fill: 0xebd25b,
      align: 'center',
    });

    //DEFAULTS
    this.parent = parent;
    this.userGuess = '';
    this.interactive = true;
    this.enabled = false;

    //Our TF web worker
    this.worker = new Worker(new URL('./TF_Worker.js', import.meta.url), {
      type: 'module',
    });

    this.TFOutput = [];

    //DON'T HAVE ACCESS TO THESE VALUES UNTIL SPECIFIC METHODS ARE CALLED
    // this.model = null;
    // this.wordsContainer = null;

    if (parent) {
      const container = new PIXI.Container();
      const containerBG = new PIXI.Sprite(PIXI.Texture.WHITE);
      // console.dir('container', container)
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

    //ONLY ENABLED IF USER CLICKS ON FIELD
    this.on('pointerdown', (e) => {
      this.style.fill = 0x0eb3e1;
      this.setupKeyboardListener();
    });

    this.setupModel();
  }

  setupKeyboardListener() {
    if (!this.enabled) {
      this.enabled = true;
      window.addEventListener('keydown', (e) => {
        this.updateInputText(e, this);
      });
    }
  }

  //VALIDATION FOR INPUT WORD BEFORE SENDING WORD TO TENSOR
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

  GRU;

  //KEYBOARD
  updateInputText(e, me) {
    if (e.key === 'Enter') {
      // this.parent.parent.parent.children[4].resetTimer()

      //ARRAY OF WORD OBJECTS
      this.wordsContainer = this.parent.parent.parent.children[3];
      let words = this.wordsContainer.children;
      //TARGET WORD OBJECT
      let [targetWord] = words.filter((word) => word.isTarget);
      //ARRAY OF WORDS -- IN STRINGS
      const tensorWords = words.map((word) => word.text);

      const validation = {
        targetString: targetWord._text,
        inputString: this.userGuess.toLowerCase(),
        target: targetWord,
      };
      const prevWordObject = this.parent.parent.children[2].children[1];

      if (this.validateWordInput(validation)) {
        //   this.speakToTensor(
        //     [this.userGuess],
        //     tensorWords,
        //     words,
        //     prevWordObject
        //   );
        // }

        this.worker.postMessage({
          userInput: [this.userGuess],
          tensorWords,
        });

        //listen for a response and set the scores
        this.worker.addEventListener('message', async ({ data }) => {
          const { TFOutput } = data;
          console.log('returned from worker: ', TFOutput);
          this.TFOutput = TFOutput;
          for (let i = 0; i < this.TFOutput.length; i++) {
            words[i].similarityScore = this.TFOutput[i];
          }

          console.log(words);

          this.assignSimilarityIndex(words, prevWordObject);

          prevWordObject.updateWord(this.userGuess);
          this.userGuess = '';
          me.text = '';
        });
      }
    } else if (e.key === 'Backspace') {
      this.userGuess = this.userGuess.slice(0, this.userGuess.length - 1);
      me.text = this.userGuess;
    } else {
      //ONLY ALPHABET CHARACTERS AND SPACES ARE ACCEPTED
      if (this.isLetter(e.key) || e.key === ' ') {
        this.userGuess += e.key.toLowerCase();
        me.text = this.userGuess;
      }
    }
  }

  //QUICK FUNCTION TO CHECK IF A KEY CODE IS A LETTER IN THE ALPHABET
  isLetter(char) {
    return char.length === 1 && char.match(/[a-z]/i);
  }

  //TODO: MAYBE STORE THIS SOMEWHERE BEFORE USING SPEAK TO TENSOR
  // async createTensorWordList(words) {
  //   await this.model.embed(words);
  //   return tf.slice(embeddingsFromWords, [j, 0], [1]);
  // }

  //USER INTERACTION WITH TENSOR
  async speakToTensor(target, words, wordObjects, guessObj) {
    // console.log("start", tf.memory().numTensors);
    // TO FIX MEMORY LEAKS, WE NEED TO MANUALLY DEFINE OUR SCOPE
    // USE TF.ENGINE FOR ASYNC FUNCTIONS, TF.TIDY FOR OTHERS
    tf.engine().startScope();

    //TODO: MAYBE TRY TO EMBED SOMEWHERE ELSE SOONER BEFORE TARGET IS AVAILABLE

    const embeddingsFromWords = await this.model.embed(words);
    const embeddingsFromTarget = await this.model.embed(target);
    //TODO: THIS DOESN'T RETURN THE SAME INFORMATION THAT ON GOOGLE'S REF
    for (let i = 0; i < target.length; i++) {
      for (let j = i; j < words.length; j++) {
        const wordI = tf.slice(embeddingsFromTarget, [i, 0], [1]);
        const wordJ = tf.slice(embeddingsFromWords, [j, 0], [1]);
        const wordITranspose = false;
        const wordJTranspose = true;

        const score = tf
          .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
          .dataSync();

        // console.log(`${words[j]} -- ${target}`, score);

        //ADDING=THE SIMILARITY SCORE TO EACH WORD OBJECT
        wordObjects[j].similarityScore = score[0];
      }
    }

    this.assignSimilarityIndex(wordObjects, guessObj);
    tf.engine().endScope();
    // console.log("end", tf.memory().numTensors);
  }

  //AFTER RUNNING TENSOR, UPDATE EACH WORD'S INDEX STATE
  assignSimilarityIndex(wordsObjectArray, guessObj) {
    wordsObjectArray.sort((a, b) => {
      return b.similarityScore - a.similarityScore;
    });
    wordsObjectArray.forEach((word, i) => {
      word.index = i;
      //THIS WILL ANIMATE THE WORDS INTO THE NEW PLACE
      word.updatePosition();
    });
    //REMOVE TOP 4 WORDS IF TARGET HAS AN INDEX OF 3 OR LESS
    this.wordsContainer.checkTargetPosition(guessObj);
  }

  //PRETRAINED MODEL
  async setupModel() {
    this.model = await use.load();
    // console.log("Tensorflow model was loaded.");
  }
}
