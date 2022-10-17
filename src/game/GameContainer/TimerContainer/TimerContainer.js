import * as PIXI from 'pixi.js'
import { Timer } from './Timer';
import { TimerBar } from './TimerSprite';
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class TimerContainer extends PIXI.Container {
    constructor(parent = null) {
        super();
        this.parent = parent;
        console.log(parent.width)

        this.timerContainer = new PIXI.Container()
        // this.timer = new Timer(this.timerContainer)
        // this.timerSprite = new TimerBar(this.timerContainer)
        // this.timerContainer.addChild(this.timerSprite)
        const timeBar = new PIXI.Sprite(PIXI.Texture.WHITE)
        timeBar.anchor.set(0.5, 0.5)
        timeBar.tint = 0x00FF00;
        timeBar.width = parent.width;
        timeBar.height = 25;
        this.timerContainer.addChild(timeBar)

        this.time = parent.width

        this.increment = 0.5

        this.ticker = PIXI.Ticker.shared
        this.ticker.add((delta) => {
            this.time -= this.increment
            // console.log(this.time)
            this.updateTimer(timeBar)
            if (this.time === 0) {
                this.ticker.stop()
                console.log('game OVER')
            }
        })



        this.addChild(this.timerContainer)


        if (this.parent) {
            this.parent.addChild(this);
            this.position.x = 0;
            this.position.y = 0;
        }


    }
    updateTimer(timeBar) {
        if (this.time < this.parent.width * 0.66) {
            timeBar.tint = 0xFFA500
        }
        if (this.time < this.parent.width * 0.33) {
            timeBar.tint = 0xFF0000
        }
        gsap.to(timeBar,
            { width: this.time }
        )
    }
    resetTimer(timeBar) {
        this.time = this.parent.width
        this.increment = this.increment * 1.1
        gsap.to(timeBar,
            { width: this.time }
        )
    }
}