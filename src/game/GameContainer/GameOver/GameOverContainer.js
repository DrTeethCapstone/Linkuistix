import * as PIXI from 'pixi.js'
import { GameOver } from './GameOver'
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Score } from './Score';
gsap.registerPlugin(PixiPlugin);

export class GameOverContainer extends PIXI.Container{
    constructor(parent){
        super()
        this.position.set(window.innerWidth/2, window.innerHeight / 2)
        this.parent = parent
        
        if (this.parent) {
          this.parent.addChild(this);
          
        }
    }
    setupFirstChildren(){
        const game = new GameOver('GAME', this)
       
        game.animateGameOn()
        const over = new GameOver('OVER', this)
        over.animateOverOn()
        const score = new GameOver('Score:1000',this)
        // score.animateScoreOn()
        setTimeout(()=>{
          game.animateGameOff()
          over.animateOverOff()
        },4000)
        setTimeout(()=>{
          score.animateScoreOff()
        },4500)
    }
}
