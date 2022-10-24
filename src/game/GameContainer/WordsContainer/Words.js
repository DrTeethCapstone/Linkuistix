import * as PIXI from "pixi.js";

import { gsap } from "gsap";

//CREATE A NEW INSTANCE OF A WORD OBJECT
export class Word extends PIXI.Text {
  //REQUIRES A STRING TO BE CREATED, PARENT CONTAINER OPTIONAL
  constructor(word, parent = null, isTarget = false) {
    super(word, {
      fontFamily: "Press Start 2P",
      fontSize: 24,
      fill: 0x000000,
      align: "center",
    });

    this.parent = parent;
    this.anchor.set(0, 1);
    this.isWord = true;
    this.similarityScore = 0;

    if (isTarget) {
      this.isTarget = isTarget;
      this.style.fill = 0xffffff;
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
    const originalText = this.text;
    const tempText = `(${originalText.slice(0, num)})${originalText.slice(
      num
    )}`;
    this.text = tempText;
    setTimeout(() => {
      this.text = originalText;
      this.style.fill = 0xffffff;
    }, 1500);
    gsap.to(this.style, { fill: "red", duration: 1 });
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
