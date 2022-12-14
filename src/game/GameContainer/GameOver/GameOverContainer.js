import * as PIXI from 'pixi.js';
import { GameOver } from './GameOver';
import { GameOverImg } from './GameOverImg';
import { gsap } from 'gsap';
import coin from './coin.png';
import insertCoin from './insertCoin.PNG';
import { addDoc, Timestamp, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import { GameOverInputContainer } from './GameOverInputCont';
import { getAuth } from 'firebase/auth';

export class GameOverContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    if (this.parent) {
      this.parent.addChild(this);
    }
    this.sortableChildren = true;
    const coinImg = new PIXI.Sprite.from(coin);
    coinImg.anchor.set(0.5);
    coinImg.height = 100;
    coinImg.width = 100;
    coinImg.zIndex = 5;
    coinImg.alpha = 0.8;
    this.parent.cursor = 'none';
    this.addChild(coinImg);
    this.parent.interactive = true;
    this.parent.on('pointermove', moveCoin);
    function moveCoin(e) {
      let pos = e.data.global;
      coinImg.x = pos.x - window.innerWidth / 2;
      coinImg.y = pos.y - window.innerHeight / 2;
    }
  }
  removeAllChildren() {
    while (this.children[0]) {
      this.removeChild(this.children[0]);
    }
  }

  getUserInfo() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return user;
    } else {
      return null;
    }
  }
  async addLeaderBoardScore(user, score) {
    await addDoc(collection(db, 'scores'), {
      score: score,
      uid: user.uid,
      username: user.displayName,
      scoreCreatedAt: Timestamp.fromDate(new Date()),
    });
  }

  setupFirstChildren(currentScore) {
    const game = new GameOver('GAME', this);
    game.animateGameOn();
    const over = new GameOver('OVER', this);
    over.animateOverOn();
    const score = new GameOver(`Score:${currentScore}`, this);
    setTimeout(() => {
      game.animateGameOff();
      over.animateOverOff();
    }, 4000);
    setTimeout(() => {
      score.animateScoreOff();
    }, 4500);
    setTimeout(() => {
      const message = new GameOver('Insert Coin to Continue', this);
      message.position.x = 0;
      message.position.y = -1000;
      message.animateMessage();
      const insert = new GameOverImg.from(insertCoin);
      this.addChild(insert);
      insert.height = 150;
      insert.width = 110;
      insert.zIndex = 10;
      insert.position.x = -300;
      insert.position.y = 100;
      insert.interactive = true;
      insert.zIndex = 0;
      insert.alpha = 0.9;

      insert.addListener('click', () => {
        const parent = this.parent;
        parent.cursor = 'auto';
        parent.removeChild(this);
        parent.children[1].gameOverStartGame();
      });

      gsap.fromTo(
        insert,
        {
          x: 1000,
        },
        {
          ease: 'elastic',
          duration: 3,
          x: -300,
          y: 100,
        }
      );
      const leader = new GameOver(
        `Click Here to \nAdd score to\nLeader Board`,
        this
      );
      leader.animateLeader();
      leader.interactive = true;
      leader.addListener('click', clickLeader);
      async function clickLeader(e) {
        const myUser = this.parent.getUserInfo();
        if (myUser.displayName === 'guest') {
          this.parent.parent.cursor = 'default';
          const inputCont = new GameOverInputContainer(this.parent);
          inputCont.children[1].children[1].setupKeyboardListener();
          inputCont.position.x = 0;
          inputCont.position.y = -200;
          leader.interactive = false;
        } else {
          let score = Number(this.parent.score);
          this.parent.addLeaderBoardScore(myUser, score);
          leader.interactive = false;
          const completed = new GameOver('Score Added!', this.parent);
          completed.animateCompleted();
        }
      }
    }, 5500);
  }
}
