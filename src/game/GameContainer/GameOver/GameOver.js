import * as PIXI from 'pixi.js'
import { gsap} from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);


export class GameOver extends PIXI.Text {
    constructor(word, parent = null){
        super(word,{
            fontFamily:'Noto',
            fontSize: 100,
            align: 'center',
            fill: 0x5dade2,
            
        })
    this.parent = parent
    this.anchor.set(.5)
    if(this.parent){
        this.index = this.parent.children.length
        this.parent.addChild(this)
        this.position.y = this.height*this.index 
    }
    }

    animateGameOn(){
        gsap.fromTo(this,{
            
            y:700, 
            duration:5,
            ease:"elastic",
            
        },{
            y:-100,
            duration:5,
            ease:"elastic"
        })
        gsap.to(this.style,{
            fill:'green',
            duration:5
        })
    }
    animateOverOn(){
        gsap.fromTo(this,{
            y:-800,
            duration:5,
            ease: "elastic",
        },{
            y:0,
            duration:5,
            ease:"elastic"
        })
        gsap.to(this.style,{
            fill: 'red',
            duration: 5
        })
    }
    animateGameOff(){
        gsap.to(this,{
          x:1000,
          y:1000,
          duration:2
        })}
    animateOverOff(){
        gsap.to(this,{
            x:-1000,
            y:-1000,
            duration:2
        })
    
    }
    animateScoreOn(){
        gsap.to(this,{
            y:-500,
            duration:2
        })
    }
    animateScoreOff(){
        gsap.to(this,{
            y:-100,
            duration:3,
            ease:'elastic'
        })
        gsap.to(this.style,{
            fontSize:150,
            duration:3,
            ease: 'elastic',
            fill:'purple'
        })
    }
    animate
}