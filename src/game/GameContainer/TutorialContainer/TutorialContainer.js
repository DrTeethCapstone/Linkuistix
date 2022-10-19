import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { TipHighlight } from './TipHighlight';
import { TipText } from './TipText';
import { GlowFilter } from '@pixi/filter-glow';
import { Word } from '../WordsContainer/Words';

gsap.registerPlugin(PixiPlugin);

export class TutorialContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.overlay = new PIXI.Sprite(PIXI.Texture.WHITE);
    if (this.parent) {
      this.parent.addChild(this);
    }
    // const overlay = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.overlay.tint = 0x000000;
    // this.overlay.scale.set(0.2);
    this.overlay.alpha = 0.8;
    this.overlay.parent = parent;
    this.overlay.height = window.innerHeight;
    this.overlay.width = window.innerWidth;
    this.wordHeight = new Word('').style.fontSize;

    // TUTORIAL PT 1
    this.tipHighlightWords = new TipHighlight(
      ((this.wordHeight * 4) / 3) * 9, // CONVERTS PT TO PX
      250,
      window.innerWidth / 2,
      window.innerHeight - 100,
      this
    );
    this.tipHighlightWords.anchor.set(0.5, 1);

    this.tipTextWords = new TipText(this);
    this.tipTextWords.text =
      'Your objective is to think of the word most closely related to the highlighted word.\n\n\nThe closer you are, the more you score!';
    this.tipTextWords.anchor.set(0.5);
    this.tipTextWords.position.x = window.innerWidth / 2;
    this.tipTextWords.position.y = window.innerHeight / 2;

    // TUTORIAL PT 2
    this.tipHighlightTypeHere = new TipHighlight(
      100, //TODO: Calculate dimensions?
      300,
      window.innerWidth / 2,
      window.innerHeight - this.height,
      this
    );
    this.tipHighlightTypeHere.filters = [
      new GlowFilter({
        color: 0xd1f7ff,
        distance: 15,
        outerStrength: 2,
        innerStrength: 1,
      }),
    ];

    this.tipTextTypeHere = new TipText(this);
    this.tipTextTypeHere.text =
      "Type below to get started and press enter when happy to confirm your word.\n\n\nYou'll see the list sort the closest matches to the bottom.";
    this.tipTextTypeHere.anchor.set(0.5);
    this.tipTextTypeHere.position.x = window.innerWidth / 2;
    this.tipTextTypeHere.position.y = window.innerHeight / 2;

    this.addChild(this.overlay);

    this.addChild(this.tipHighlightWords);
    this.addChild(this.tipHighlightTypeHere);

    this.playTutorialStep(this.tipHighlightWords, this.tipTextWords, 8);
    this.playTutorialStep(
      this.tipHighlightTypeHere,
      this.tipTextTypeHere,
      20,
      true,
    );
  }
  removeAllChildren() {
    while (this.children[0]) {
      this.removeChild(this.children[0]);
    }
  }
  playTutorialStep(tipHighlight, tipText, time, end = false) {
    setTimeout(() => {
      this.addChild(tipText);
      gsap.to(tipHighlight, { alpha: 0.2, duration: 3 });
    }, time * 400);

    setTimeout(() => {
      tipText.text = '';
      this.removeChild(tipHighlight);
      if (end) this.removeChild(this.overlay);
    }, time * 1000);
  }
}
