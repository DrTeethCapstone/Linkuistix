import * as PIXI from "pixi.js";
import { gsap } from "gsap";

export class ObjectiveThree extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;
    if (this.parent) {
      this.parent.addChild(this);
    }
    this.objective = new PIXI.Text(
      "Successful attempts will restart the timer. \n\nBut as you play, you'll have less time to submit a guess. \n\nDo YOU have what it takes to top the leaderboards...?\n\nClick to Play.",
      {
        fontFamily: "Press Start 2P",
        fontSize: 20,
        fill: 0xffffff,
        align: "center",
        visible: true,
        wordWrap: true,
        wordWrapWidth: (window.innerWidth * 50) / 100,
        lineHeight: 30,
      }
    );

    this.objective.position.x = -this.objective.width / 2;
    this.objective.position.y = 150;
    this.addChild(this.objective);

    this.timerContainer = new PIXI.Container();
    this.timerRect = new PIXI.Graphics();
    this.timerContainer.addChild(this.timerRect);
    this.addChild(this.timerContainer);
    this.timerRect.lineStyle(5, 0xffff);
    this.timerRect.beginFill(0x1c8051);
    this.timerRect.drawRect(0, 0, (window.innerWidth * 50) / 100, 25);
    this.timerRect.endFill();
    this.timerRect.position.x = -this.timerContainer.width / 2;

    this.target = new PIXI.Text("Your Timer >", {
      fontFamily: "Arial",
      fontSize: 12,
      fill: 0xffffff,
      align: "center",
    });
    this.timerContainer.addChild(this.target);
    this.target.position.y = this.target.height / 2;
    this.target.position.x = -this.timerContainer.width / 2 - this.target.width;
  }

  hide() {
    this.objective.alpha = 0;
    this.target.alpha = 0;
    this.timerRect.alpha = 0;
  }

  animateTimer() {
    gsap.to(this.objective, { alpha: 1, delay: 1, duration: 1 });
    gsap.to(this.target, { alpha: 1, delay: 1.1, duration: 1 });
    gsap.to(this.timerRect, { alpha: 1, delay: 1.1, duration: 1 });
    setTimeout(() => {
      this.parent.inProgress = false;
    }, 1300);
  }

  animateOff() {
    gsap.to(this.objective, { alpha: 0, duration: 0.5 });
    gsap.to(this.target, { alpha: 0, duration: 0.5 });
    gsap.to(this.timerRect, { alpha: 0, duration: 0.5 });
  }
}
