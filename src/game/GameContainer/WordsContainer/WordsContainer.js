import * as PIXI from "pixi.js";
import * as randomWords from "random-words";
import { Word } from "./Words";

//ANIMATION PLUGINS
import { gsap } from "gsap";

//CREATE A NEW INSTANCE OF A PIXI CONTAINER USED TO STORE LIST OF WORDS
export class WordsContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.target = null;
    this.isLoaded = false;

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.alpha = 0.25;
    bg.width = this.parent.width;
    bg.height = this.parent.height - this.parent.children[1].height * 2.22;
    this.addChild(bg);

    this.position.x = -this.parent.width / 2;
    if (this.parent) {
      this.parent.addChild(this);
      this.position.y = -this.height;
    }
    this.setupFirstChildren();
  }

  setupFirstChildren() {
    for (let i = 0; i < 9; i++) {
      new Word(randomWords(), this);
    }
    const target = new Word(randomWords(), this, true);
    this.target = target;
    this.isLoaded = true;
  }

  removeAllChildren() {
    while (this.children.length > 1) {
      this.removeChild(this.children[1]);
    }
  }

  checkTargetPosition(prevGuessObject) {
    if (this.target) {
      if (this.target.index <= 3) {
        for (let i = 0; i < 4; i++) {
          this.removeChild(this.children[1]);
        }

        this.target = null;
        this.children.forEach((word, i) => {
          if (word.isWord) {
            word.index = i;
          }
        });
        prevGuessObject.parent.parent.updateMultiplier(true);
      } else {
        prevGuessObject.parent.parent.updateMultiplier(false);
      }
    }
  }

  fromOffScreen() {
    this.visible = true;
    gsap.to(this, {
      y: this.previousPosition || 0,
      duration: 1,
    });
  }

  toOffScreen() {
    this.previousPosition = this.getGlobalPosition().y;
    gsap.to(this, {
      y: -this.height,
      duration: 1,
    });
    setTimeout(() => {
      this.visible = false;
    }, 1000);
  }
}
