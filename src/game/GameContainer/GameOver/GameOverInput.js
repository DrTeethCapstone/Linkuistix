import * as PIXI from "pixi.js";
import {addDoc, Timestamp, collection, } from 'firebase/firestore'
import {db} from '../../../firebase'
import { GameOver } from "./GameOver";


export class GameOverInput extends PIXI.Text{
    constructor(parent = null){
        super('Enter LeaderBoard Name',{
            fontFamily: 'Press Start 2P',
            fontSize: 20,
            fill: 0xff1010,
            align: 'center'
        })
        this.parent = parent
        this.userInput = ''
        this.interactive=true
        this.enabled = true
        
        if (parent) {
            const container = new PIXI.Container();
            const containerBG = new PIXI.Sprite(PIXI.Texture.WHITE);
            containerBG.tint = '#ff71ce';
            containerBG.width = this.parent.width;
            containerBG.height = this.parent.height / 2;
            container.position.y = -containerBG.height;
            container.position.x = -containerBG.width / 2;
            container.addChild(containerBG);
            this.parent.addChild(container);
            container.addChild(this);
            this.position.x = containerBG.width / 2;
            this.position.y = containerBG.height - this.height;
            this.anchor.set(0.5);
          }
    }
    setupKeyboardListener() {
        window.addEventListener("keydown", (e) => this.updateInputText(e, this));
       ;
    }
    removeKeyboardListener(){
      console.log('hit')
   
      window.removeEventListener("keydown", (e)=>this.updateInputText(e, this));
      
    }
    
    async addLeaderBoardScore(user, score){
        await addDoc(collection(db, 'scores'), {
          score: score,
          uid: user.id,
          username: user.username,
          scoreCreatedAt: Timestamp.fromDate(new Date()),
      })}
    
    updateInputText(e,me){
        if(e.key==='Enter'){
            this.userName = this.userInput
            let score = Number(this.parent.parent.parent.score)
            let user = this.parent.parent.parent.parent.children[1].user
            console.log(score)
            let newUser = {
                username:this.userInput,
                id:user.id,
            }
            this.addLeaderBoardScore(newUser, score)
            this.interactive = false
            console.log(this.parent.parent)
            const completed = new GameOver('Score Added!', this.parent.parent)
            completed.animateCompleted2()
            this.parent.removeChild(this)
          
             
        } else if (e.key === "Backspace") {
            this.userInput = this.userInput.slice(0, this.userInput.length - 1);
            me.text = this.userInput;
    } else {if (this.isLetter(e.key) || e.key === " "){
        this.userInput += e.key;
        me.text = this.userInput;}
      }
    }

    isLetter(char) {
        return char.length === 1 && char.match(/[a-z]/i);
      }
}