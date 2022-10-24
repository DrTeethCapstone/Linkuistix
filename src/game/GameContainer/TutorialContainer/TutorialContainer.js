import * as PIXI from "pixi.js";
import { ObjectiveOne } from "./ObjectiveOne";
import { ObjectiveTwo } from "./ObjectiveTwo";
import { ObjectiveThree } from "./ObjectiveThree";
import { gsap } from "gsap";

export class TutorialContainer extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;
    if (this.parent) {
      this.parent.addChild(this);
    }
    this.interactive = true;
    this.phase = 0;
    this.inProgress = false;

    const size = new PIXI.Sprite(PIXI.Texture.WHITE);
    size.tint = 0xfff;
    size.alpha = 0;
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    size.position.x = -size.width / 2;
    this.addChild(size);

    this.clickToContinue = new PIXI.Text("Click to Continue...", {
      fontFamily: "Press Start 2P",
      fontSize: 10,
      fill: 0xffffff,
      align: "center",
      visible: true,
    });
    this.clickToContinue.position.x = -this.width / 2 + 15;
    this.clickToContinue.position.y =
      this.height - this.clickToContinue.height * 2;
    this.addChild(this.clickToContinue);

    const objective = new PIXI.Text("Objectives:", {
      fontFamily: "Press Start 2P",
      fontSize: 32,
      fill: 0xebd25b,
      align: "center",
      visible: true,
      wordWrap: true,
      wordWrapWidth: 600,
    });
    objective.position.x = -objective.width / 2;
    objective.position.y = 50;
    this.addChild(objective);

    this.objective1 = new ObjectiveOne(this);
    this.objective1.hide();
    this.objective2 = new ObjectiveTwo(this);
    this.objective2.hide();
    this.objective3 = new ObjectiveThree(this);
    this.objective3.hide();

    this.interactive = true;
    this.on("pointerdown", () => {
      if (this.parent.isLoaded) {
        if (!this.inProgress) {
          this.phase++;
          if (this.phase === 1) {
            this.inProgress = true;
            this.objective1.animateInput();
          }
          if (this.phase === 2) {
            this.inProgress = true;
            this.objective1.animateWords();
          }
          if (this.phase === 3) {
            this.inProgress = true;
            this.objective1.animateOff();
            this.objective2.animateTargetArea();
            this.objective1.exampleWordsContainer.alpha = 0;
          }
          if (this.phase === 4) {
            this.inProgress = true;
            this.objective2.animateMultiplier();
          }
          if (this.phase === 5) {
            this.inProgress = true;
            this.objective2.animateOff();
            this.objective3.animateTimer();
            this.clickToContinue.alpha = 0;
          }
          if (this.phase === 6) {
            this.inProgress = true;
            this.objective3.animateOff();

            setTimeout(() => {
              this.parent.scoreContainer.score.alpha = 1;
              this.parent.inputContainer.interaction.text =
                "Click Here to Start";
              this.parent.wordsContainer.fromOffScreen();
              this.parent.timerContainer.fromOffScreen();
              gsap.to(this.parent.parent.children[0], {
                alpha: 1,
                duration: 0.5,
              });
              this.destroy();
            }, 600);
          }
        }
      }
    });
  }
}
