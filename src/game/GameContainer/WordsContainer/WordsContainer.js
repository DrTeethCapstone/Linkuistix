import * as PIXI from 'pixi.js';
import * as randomWords from 'random-words';
import { Word } from './Words';

//ANIMATION PLUGINS
import { gsap } from 'gsap';

//CREATE A NEW INSTANCE OF A PIXI CONTAINER USED TO STORE LIST OF WORDS
export class WordsContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.target = null;
    this.isLoaded = false;
    this.wordsInPlay = [];

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0x000000;
    bg.alpha = 0.3;
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
      const word = new Word(randomWords(), this);
      this.wordsInPlay.push({ word: word.text, index: word.index });
    }
    const target = new Word(randomWords(), this, true);
    this.wordsInPlay.push({
      word: target.text,
      isTarget: true,
      index: target.index,
    });
    this.target = target;
    this.isLoaded = true;
  }

  removeAllChildren() {
    while (this.children.length > 1) {
      this.children[1].destroy();
      this.removeChild(this.children[1]);
    }
  }

  dropChildrenPosition() {
    this.children.slice(1).forEach((word, i) => {
      word.index = i;
      word.updatePosition();
    });
    while (this.children.length < 10) {
      const word = new Word(randomWords());
      this.addChild(word);
      word.index = this.children.length - 1;
      word.position.x = this.width / 2 - word.width / 2;
      word.updatePosition();
    }
    const target = new Word(randomWords(), null, true);
    this.addChild(target);
    target.index = this.children.length - 1;
    target.position.x = this.width / 2 - target.width / 2;
    target.updatePosition();
    this.target = target;
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
