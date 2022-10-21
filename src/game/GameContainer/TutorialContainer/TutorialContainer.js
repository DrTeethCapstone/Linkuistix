import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { TipHighlight } from './TipHighlight';
import { TipText } from './TipText';
import { GlowFilter } from '@pixi/filter-glow';
import { Word } from '../WordsContainer/Words';
import { Multiplier } from '../InputContainer/Multiplier';
import { ScoreContainer } from '../ScoreContainer/ScoreContainer';

gsap.registerPlugin(PixiPlugin);

export class TutorialContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.overlay = new PIXI.Sprite(PIXI.Texture.WHITE);
    if (this.parent) {
      this.parent.addChild(this);
    }
    this.overlay.tint = 0x000000;
    this.overlay.alpha = 0.7;
    this.overlay.parent = parent;
    this.overlay.height = window.innerHeight;
    this.overlay.width = window.innerWidth;

    // FOR DIMENSION CALCULATIONS
    this.wordHeight = new Word('').style.fontSize;
    // TODO this.multiplierWidth =

    // TUTORIAL PT 1: WORDS LIST
    this.tipHighlightWords = new TipHighlight(
      ((this.wordHeight * 4) / 3) * 9, // CONVERTS PT TO PX
      250,
      window.innerWidth / 2,
      window.innerHeight - 100,
      this
    );
    this.tipHighlightWords.anchor.set(0.5, 1);

    this.tipTextWords = new TipText(this);
    this.setTextProperties(
      'Your objective is to think of the word most closely related to the highlighted word.\n\n\nThe closer you are, the more you score!',
      this.tipTextWords
    );

    // TUTORIAL PT 2: INPUT TEXT
    this.tipHighlightInputText = new TipHighlight(
      (this.wordHeight * 4) / 3, // CONVERTS PT TO PX
      300,
      window.innerWidth / 2,
      window.innerHeight - (this.wordHeight * 4) / 3,
      this
    );
    this.tipHighlightInputText.filters = [
      new GlowFilter({
        color: 0xd1f7ff,
        distance: 15,
        outerStrength: 2,
        innerStrength: 1,
      }),
    ];

    this.tipTextInputText = new TipText(this);
    this.setTextProperties(
      "Type below to get started and press enter when happy to confirm your word.\n\n\nYou'll see the list sort the closest matches to the bottom.",
      this.tipTextInputText
    );

    // TUTORIAL PT 3: MULTIPLIER / SCORE
    this.tipHighlightMultiplier = new TipHighlight(
      50,
      1200, // TODO: calculate
      window.innerWidth / 2,
      window.innerHeight - 100,
      this
    );
    this.tipHighlightScore = new TipHighlight(
      150,
      300,
      window.innerWidth / 2,
      130,
      this
    );

    this.tipTextMultiplierAndScore = new TipText(this);
    this.setTextProperties(
      "As you progress through the game, the amount you score per answer increases.\n\n\nYou'll see your total at the top of the page - think you have what it takes to top our leaderboard?",
      this.tipTextMultiplierAndScore
    );

    // TUTORIAL PT 4: TIMER
    this.tipHighlightTimer = new TipHighlight(
      50,
      1200,
      window.innerWidth / 2,
      0,
      this
    );

    this.tipTextTimer = new TipText(this);
    this.setTextProperties(
      "But remember, it's a race against the clock.\n\n\nSo think fast... and type fast!",
      this.tipTextTimer
    );

    this.addChild(this.overlay);
    // APPEND TUTORIAL HIGHLIGHT BOXES (NOT VISIBLE BY DEFAULT)
    this.addChild(this.tipHighlightWords);
    this.tipHighlightWords.visible = true;
    this.addChild(this.tipTextWords);
    this.addChild(this.tipHighlightInputText);
    this.addChild(this.tipHighlightMultiplier);
    this.addChild(this.tipHighlightScore);
    this.addChild(this.tipHighlightTimer);

    // ANIMATING TUTORIAL STEPS
    const highlightAlpha = 0.6;
    const timeMultiplier = 1.5;

    const addElems = (tipHighlightsArray, tipTextArray) => {
      console.log('--addElem---');
      tipHighlightsArray.forEach((highlight) => (highlight.visible = true));
      tipTextArray.forEach((text) => this.addChild(text));
    };

    const removeElems = (tipHighlightsArray, tipTextArray) => {
      console.log('--removeElem---');
      tipHighlightsArray.forEach((highlight) => this.removeChild(highlight));
      tipTextArray.forEach((text) => (text.visible = false));
    };

    // ANIMATE PT 1: WORDS LIST
    gsap
      .timeline({
        onComplete: () =>
          removeElems([this.tipHighlightWords], [this.tipTextWords]),
      })
      .to(this.tipHighlightWords, {
        alpha: highlightAlpha,
        duration: timeMultiplier * 5,
      });
    // ANIMATE PT 2: INPUT TEXT
    gsap
      .timeline({
        onComplete: () =>
          addElems([this.tipHighlightInputText], [this.tipTextInputText]),
      })
      .to(this.tipHighlightInputText, {
        alpha: highlightAlpha,
        duration: timeMultiplier * 5,
      });
    gsap
      .timeline({
        onComplete: () =>
          removeElems([this.tipHighlightInputText], [this.tipTextInputText]),
      })
      .to(this.tipTextInputText, { alpha: 1, duration: timeMultiplier * 10 });
    // ANIMATE PT 3: MULTIPLIER / SCORE
    gsap
      .timeline({
        onComplete: () =>
          addElems(
            [this.tipHighlightMultiplier, this.tipHighlightScore],
            [this.tipTextMultiplierAndScore]
          ),
      })
      .to(this.tipHighlightMultiplier, {
        alpha: highlightAlpha,
        duration: timeMultiplier * 5,
      })
      .to(this.tipHighlightScore, {
        alpha: highlightAlpha,
        duration: timeMultiplier * 5,
      });
    // ANIMATE PT 4: TIMER
    gsap
      .timeline({
        onComplete: () =>
          removeElems(
            [this.tipHighlightMultiplier, this.tipHighlightScore],
            [this.tipTextMultiplierAndScore]
          ),
      })
      .to(this.tipTextInputText, { alpha: 1, duration: timeMultiplier * 15 });
    gsap
      .timeline({
        onComplete: () =>
          addElems([this.tipHighlightTimer], [this.tipTextTimer]),
      })
      .to(this.tipHighlightTimer, {
        alpha: highlightAlpha,
        duration: timeMultiplier * 15,
      });
    gsap
      .timeline({
        onComplete: () =>
          removeElems([this.tipHighlightTimer], [this.tipTextTimer]),
      })
      .to(this.tipTextTimer, { alpha: 1, duration: timeMultiplier * 17 });
  }
  removeAllChildren() {
    while (this.children[0]) {
      this.removeChild(this.children[0]);
    }
  }
  setTextProperties(setText, target) {
    target.text = setText;
    target.anchor.set(0.5);
    target.position.x = window.innerWidth / 2;
    target.position.y = window.innerHeight / 2;
  }
}
