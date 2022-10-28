import * as PIXI from 'pixi.js';

import { gsap } from 'gsap';

//howler sounds
import { Howl } from 'howler';

//CREATE A NEW INSTANCE OF A WORD OBJECT
export class Word extends PIXI.Text {
  //REQUIRES A STRING TO BE CREATED, PARENT CONTAINER OPTIONAL
  constructor(word, parent = null, isTarget = false) {
    super(word, {
      fontFamily: 'Press Start 2P',
      fontSize: 34,
      fill: 0xffffff,
      align: 'center',
    });

    this.parent = parent;
    this.anchor.set(0, 1);
    this.isWord = true;
    this.similarityScore = 0;

    if (isTarget) {
      this.isTarget = isTarget;
      this.style.fill = '#FFE87C';
    }

    if (this.parent) {
      this.index = this.parent.children.length;
      this.parent.addChild(this);
      this.position.y = this.parent.height - this.height * this.index;
      this.position.x = this.parent.width / 2 - this.width / 2;
    }
  }

  //HIGHLIGHTS WORD IN RED IF GUESS WASN'T VALID
  invalidGuess(num) {
    const error = new Howl({
      src: ['/sounds/error.mp3'],
      volume: 0.25,
    });

    setTimeout(() => {
      error.play();
    }, 100);
    const originalText = this.text;
    const tempText = `(${originalText.slice(0, num)})${originalText.slice(
      num
    )}`;
    this.text = tempText;
    this.position.x = this.parent.width / 2 - this.width / 2;
    setTimeout(() => {
      this.text = originalText;
      this.style.fill = '#FFE87C';
      this.position.x = this.parent.width / 2 - this.width / 2;
    }, 1500);
    gsap.to(this.style, { fill: 'red', duration: 1 });
  }

  updatePosition() {
    if (this.index > -1) {
      gsap.to(this, {
        y: this.parent.height - this.height * this.index,
        duration: 1,
      });
    }
  }

  updateWord(word) {
    this.text = word;
  }
}
