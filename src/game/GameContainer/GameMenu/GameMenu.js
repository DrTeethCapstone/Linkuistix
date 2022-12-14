import * as PIXI from 'pixi.js';

//howler sounds
import { Howl } from 'howler';

import back1 from '../../../assets/backgroundAnimation/0001.jpg';
import back2 from '../../../assets/backgroundAnimation/0002.jpg';
import back3 from '../../../assets/backgroundAnimation/0003.jpg';
import back4 from '../../../assets/backgroundAnimation/0004.jpg';
import back5 from '../../../assets/backgroundAnimation/0005.jpg';
import back6 from '../../../assets/backgroundAnimation/0006.jpg';
import back7 from '../../../assets/backgroundAnimation/0007.jpg';
import back8 from '../../../assets/backgroundAnimation/0008.jpg';
import back9 from '../../../assets/backgroundAnimation/0009.jpg';
import back10 from '../../../assets/backgroundAnimation/0010.jpg';
import back11 from '../../../assets/backgroundAnimation/0011.jpg';
import back12 from '../../../assets/backgroundAnimation/0012.jpg';
import back13 from '../../../assets/backgroundAnimation/0013.jpg';
import back14 from '../../../assets/backgroundAnimation/0014.jpg';
import back15 from '../../../assets/backgroundAnimation/0015.jpg';
import back16 from '../../../assets/backgroundAnimation/0016.jpg';
import back17 from '../../../assets/backgroundAnimation/0017.jpg';
import back18 from '../../../assets/backgroundAnimation/0018.jpg';
import back19 from '../../../assets/backgroundAnimation/0019.jpg';
import back20 from '../../../assets/backgroundAnimation/0020.jpg';
import back21 from '../../../assets/backgroundAnimation/0021.jpg';
import back22 from '../../../assets/backgroundAnimation/0022.jpg';
import back23 from '../../../assets/backgroundAnimation/0023.jpg';
import back24 from '../../../assets/backgroundAnimation/0024.jpg';
import back25 from '../../../assets/backgroundAnimation/0025.jpg';
import back26 from '../../../assets/backgroundAnimation/0026.jpg';
import back27 from '../../../assets/backgroundAnimation/0027.jpg';
import back28 from '../../../assets/backgroundAnimation/0028.jpg';
import back29 from '../../../assets/backgroundAnimation/0029.jpg';
import back30 from '../../../assets/backgroundAnimation/0030.jpg';
import back31 from '../../../assets/backgroundAnimation/0031.jpg';
import back32 from '../../../assets/backgroundAnimation/0032.jpg';
import back33 from '../../../assets/backgroundAnimation/0033.jpg';
import back34 from '../../../assets/backgroundAnimation/0034.jpg';
import back35 from '../../../assets/backgroundAnimation/0035.jpg';
import back36 from '../../../assets/backgroundAnimation/0036.jpg';
import back37 from '../../../assets/backgroundAnimation/0037.jpg';
import back38 from '../../../assets/backgroundAnimation/0038.jpg';
import back39 from '../../../assets/backgroundAnimation/0039.jpg';
import back40 from '../../../assets/backgroundAnimation/0040.jpg';
import back41 from '../../../assets/backgroundAnimation/0041.jpg';
import back42 from '../../../assets/backgroundAnimation/0042.jpg';
import back43 from '../../../assets/backgroundAnimation/0043.jpg';
import back44 from '../../../assets/backgroundAnimation/0044.jpg';
import back45 from '../../../assets/backgroundAnimation/0045.jpg';
import back46 from '../../../assets/backgroundAnimation/0046.jpg';
import back47 from '../../../assets/backgroundAnimation/0047.jpg';
import back48 from '../../../assets/backgroundAnimation/0048.jpg';
import back49 from '../../../assets/backgroundAnimation/0049.jpg';
import back50 from '../../../assets/backgroundAnimation/0050.jpg';
import back51 from '../../../assets/backgroundAnimation/0051.jpg';
import back52 from '../../../assets/backgroundAnimation/0052.jpg';
import back53 from '../../../assets/backgroundAnimation/0053.jpg';
import back54 from '../../../assets/backgroundAnimation/0054.jpg';
import back55 from '../../../assets/backgroundAnimation/0055.jpg';
import back56 from '../../../assets/backgroundAnimation/0056.jpg';
import back57 from '../../../assets/backgroundAnimation/0057.jpg';
import back58 from '../../../assets/backgroundAnimation/0058.jpg';
import back59 from '../../../assets/backgroundAnimation/0059.jpg';
import back60 from '../../../assets/backgroundAnimation/0060.jpg';
import back61 from '../../../assets/backgroundAnimation/0061.jpg';
import back62 from '../../../assets/backgroundAnimation/0062.jpg';
import back63 from '../../../assets/backgroundAnimation/0063.jpg';
import back64 from '../../../assets/backgroundAnimation/0064.jpg';
import back65 from '../../../assets/backgroundAnimation/0065.jpg';
import back66 from '../../../assets/backgroundAnimation/0066.jpg';
import back67 from '../../../assets/backgroundAnimation/0067.jpg';
import back68 from '../../../assets/backgroundAnimation/0068.jpg';
import back69 from '../../../assets/backgroundAnimation/0069.jpg';
import back70 from '../../../assets/backgroundAnimation/0070.jpg';
import back71 from '../../../assets/backgroundAnimation/0071.jpg';
import back72 from '../../../assets/backgroundAnimation/0072.jpg';
import back73 from '../../../assets/backgroundAnimation/0073.jpg';
import back74 from '../../../assets/backgroundAnimation/0074.jpg';
import back75 from '../../../assets/backgroundAnimation/0075.jpg';
import back76 from '../../../assets/backgroundAnimation/0076.jpg';
import back77 from '../../../assets/backgroundAnimation/0077.jpg';
import back78 from '../../../assets/backgroundAnimation/0078.jpg';
import back79 from '../../../assets/backgroundAnimation/0079.jpg';
import back80 from '../../../assets/backgroundAnimation/0080.jpg';
import back81 from '../../../assets/backgroundAnimation/0081.jpg';
import back82 from '../../../assets/backgroundAnimation/0082.jpg';
import back83 from '../../../assets/backgroundAnimation/0083.jpg';
import back84 from '../../../assets/backgroundAnimation/0084.jpg';
import back85 from '../../../assets/backgroundAnimation/0085.jpg';
import back86 from '../../../assets/backgroundAnimation/0086.jpg';
import back87 from '../../../assets/backgroundAnimation/0087.jpg';
import back88 from '../../../assets/backgroundAnimation/0088.jpg';
import back89 from '../../../assets/backgroundAnimation/0089.jpg';
import back90 from '../../../assets/backgroundAnimation/0090.jpg';
import back91 from '../../../assets/backgroundAnimation/0091.jpg';
import back92 from '../../../assets/backgroundAnimation/0092.jpg';
import back93 from '../../../assets/backgroundAnimation/0093.jpg';
import back94 from '../../../assets/backgroundAnimation/0094.jpg';
import back95 from '../../../assets/backgroundAnimation/0095.jpg';
import back96 from '../../../assets/backgroundAnimation/0096.jpg';
import back97 from '../../../assets/backgroundAnimation/0097.jpg';
import back98 from '../../../assets/backgroundAnimation/0098.jpg';
import back99 from '../../../assets/backgroundAnimation/0099.jpg';
import back100 from '../../../assets/backgroundAnimation/0100.jpg';
import back101 from '../../../assets/backgroundAnimation/0101.jpg';
import back102 from '../../../assets/backgroundAnimation/0102.jpg';
import back103 from '../../../assets/backgroundAnimation/0103.jpg';
import back104 from '../../../assets/backgroundAnimation/0104.jpg';
import back105 from '../../../assets/backgroundAnimation/0105.jpg';
import back106 from '../../../assets/backgroundAnimation/0106.jpg';
import back107 from '../../../assets/backgroundAnimation/0107.jpg';
import back108 from '../../../assets/backgroundAnimation/0108.jpg';
import back109 from '../../../assets/backgroundAnimation/0109.jpg';
import back110 from '../../../assets/backgroundAnimation/0110.jpg';
import back111 from '../../../assets/backgroundAnimation/0111.jpg';
import back112 from '../../../assets/backgroundAnimation/0112.jpg';
import back113 from '../../../assets/backgroundAnimation/0113.jpg';
import back114 from '../../../assets/backgroundAnimation/0114.jpg';
import back115 from '../../../assets/backgroundAnimation/0115.jpg';
import back116 from '../../../assets/backgroundAnimation/0116.jpg';
import back117 from '../../../assets/backgroundAnimation/0117.jpg';
import back118 from '../../../assets/backgroundAnimation/0118.jpg';
import back119 from '../../../assets/backgroundAnimation/0119.jpg';
import back120 from '../../../assets/backgroundAnimation/0120.jpg';

import { LoadingContainer } from '../LoadingContainer/LoadingContainer';
import { gsap } from 'gsap';

export class GameMenu extends PIXI.Container {
  constructor(parent) {
    super();
    this.stage = parent;
    this.images = [
      back1,
      back2,
      back3,
      back4,
      back5,
      back6,
      back7,
      back8,
      back9,
      back10,
      back11,
      back12,
      back13,
      back14,
      back15,
      back16,
      back17,
      back18,
      back19,
      back20,
      back21,
      back22,
      back23,
      back24,
      back25,
      back26,
      back27,
      back28,
      back29,
      back30,
      back31,
      back32,
      back33,
      back34,
      back35,
      back36,
      back37,
      back38,
      back39,
      back40,
      back41,
      back42,
      back43,
      back44,
      back45,
      back46,
      back47,
      back48,
      back49,
      back50,
      back51,
      back52,
      back53,
      back54,
      back55,
      back56,
      back57,
      back58,
      back59,
      back60,
      back61,
      back62,
      back63,
      back64,
      back65,
      back66,
      back67,
      back68,
      back69,
      back70,
      back71,
      back72,
      back73,
      back74,
      back75,
      back76,
      back77,
      back78,
      back79,
      back80,
      back81,
      back82,
      back83,
      back84,
      back85,
      back86,
      back87,
      back88,
      back89,
      back90,
      back91,
      back92,
      back93,
      back94,
      back95,
      back96,
      back97,
      back98,
      back99,
      back100,
      back101,
      back102,
      back103,
      back104,
      back105,
      back106,
      back107,
      back108,
      back109,
      back110,
      back111,
      back112,
      back113,
      back114,
      back115,
      back116,
      back117,
      back118,
      back119,
      back120,
    ];

    this.isPlaying = false;
    this.backgroundTextures = [];
    this.createBackgroundTextures();
    const background = new PIXI.AnimatedSprite(this.backgroundTextures);
    background.anchor.set(0.5);
    background.position.x = window.innerWidth / 2;
    background.position.y = window.innerHeight / 2;
    background.animationSpeed = 0.25;
    background.play();
    this.addChild(background);
    if (this.stage) {
      this.stage.addChild(this);
    }
    const splashTitleContainer = new PIXI.Container();
    const splashContainerBG = new PIXI.Sprite(PIXI.Texture.WHITE);
    const splashTitle = new PIXI.Text('Linkuistix', {
      fontFamily: 'Press Start 2P',
      fontSize: 52,
      fill: 0x121212,
      align: 'center',
      dropShadow: true,
      dropShadowColor: 0xffff,
      dropShadowAngle: 6,
    });

    const splashIntroText = new PIXI.Text(
      'Word association game powered by machine learning.',
      {
        fontFamily: 'Silkscreen',
        fontSize: 14,
        fill: 0xffffff,
        align: 'center',
      }
    );

    this.addChild(splashTitleContainer);
    splashTitleContainer.addChild(splashContainerBG);
    splashTitleContainer.addChild(splashTitle);
    splashTitleContainer.addChild(splashIntroText);
    splashTitleContainer.position.x =
      window.innerWidth / 2 - splashTitleContainer.width / 2;
    splashTitleContainer.position.y = 200;
    splashTitle.position.x =
      splashTitleContainer.width / 2 - splashTitle.width / 2;
    splashIntroText.position.y = splashTitle.height;
    splashIntroText.position.x =
      splashTitleContainer.width / 2 - splashIntroText.width / 2;
    splashContainerBG.width = splashTitleContainer.width;
    splashContainerBG.height = splashTitleContainer.height;
    splashContainerBG.alpha = 0;

    const timeattackContainer = new PIXI.Container();
    const timeattackContainerBG = new PIXI.Sprite(PIXI.Texture.WHITE);
    const timeattackTitle = new PIXI.Text('Time Attack', {
      fontFamily: 'Silkscreen',
      fontSize: 52,
      fill: '#F9B4F6',
      align: 'center',
    });
    const timeAttackText1 = new PIXI.Text('Think fast,', {
      fontFamily: 'Silkscreen',
      fontSize: 22,
      fill: '#001d3d',
      align: 'center',
    });
    const timeAttackText2 = new PIXI.Text('type faster!', {
      fontFamily: 'Silkscreen',
      fontSize: 22,
      fill: '#001d3d',
      align: 'center',
    });

    this.addChild(timeattackContainer);
    timeattackContainer.addChild(timeattackContainerBG);
    timeattackContainer.addChild(timeattackTitle);
    timeattackContainer.addChild(timeAttackText1);
    timeattackContainer.addChild(timeAttackText2);

    timeattackContainerBG.width = timeattackTitle.width * 2;
    timeattackContainerBG.height = timeattackTitle.height * 3;
    timeattackContainerBG.tint = 0x000000;
    timeattackContainerBG.alpha = 0.5;

    timeattackContainer.position.x =
      window.innerWidth / 2 - timeattackContainer.width / 2;
    timeattackContainer.position.y = window.innerHeight / 2;

    timeattackTitle.position.x =
      timeattackContainer.width / 2 - timeattackTitle.width / 2;

    timeAttackText1.position.x =
      timeattackContainer.width / 2 - timeAttackText1.width / 2;
    timeAttackText1.position.y = timeattackTitle.height;

    timeAttackText2.position.x =
      timeattackContainer.width / 2 - timeAttackText2.width / 2;
    timeAttackText2.position.y =
      timeattackTitle.height + timeAttackText1.height;

    const playGameButtonContainer = new PIXI.Container();
    const playgameButtonBG1 = new PIXI.Sprite(PIXI.Texture.WHITE);
    const playgameButtonBG2 = new PIXI.Sprite(PIXI.Texture.WHITE);
    const playGameText = new PIXI.Text('PLAY', {
      fontFamily: 'Press Start 2P',
      fontSize: 24,
      fill: 0xffff,
      align: 'center',
    });

    timeattackContainer.addChild(playGameButtonContainer);
    playGameButtonContainer.addChild(playgameButtonBG1);
    playGameButtonContainer.addChild(playgameButtonBG2);
    playGameButtonContainer.addChild(playGameText);

    playgameButtonBG1.tint = 0xffff;
    playgameButtonBG1.width = playGameText.width * 2;
    playgameButtonBG1.height = playGameText.height * 1.5;

    playgameButtonBG2.tint = 0x000000;
    playgameButtonBG2.width = playGameText.width * 2 - 4;
    playgameButtonBG2.height = playGameText.height * 1.5 - 4;
    playgameButtonBG2.position.x =
      playGameButtonContainer.width / 2 - playgameButtonBG2.width / 2;
    playgameButtonBG2.position.y =
      playGameButtonContainer.height / 2 - playgameButtonBG2.height / 2;

    playGameButtonContainer.position.x =
      timeattackContainer.width / 2 - playGameButtonContainer.width / 2;
    playGameButtonContainer.position.y =
      timeattackContainer.height - playGameButtonContainer.height * 1.5;

    playGameText.position.x =
      playGameButtonContainer.width / 2 - playGameText.width / 2;
    playGameText.position.y =
      playGameButtonContainer.height / 2 - playGameText.height / 2;
    playGameButtonContainer.interactive = true;

    playGameButtonContainer.on('mouseover', (evt) => {
      playgameButtonBG1.tint = 0x000000;
      playgameButtonBG2.tint = 0xffff;
      playGameText.style.fill = 0x000000;
      playGameButtonContainer.cursor = 'pointer';
    });

    playGameButtonContainer.on('mouseout', (evt) => {
      playgameButtonBG1.tint = 0xffff;
      playgameButtonBG2.tint = 0x000000;
      playGameText.style.fill = 0xffff;
    });

    playGameButtonContainer.on('pointerdown', (evt) => {
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.animateOff();
      }
    });
  }

  createBackgroundTextures() {
    for (let i = 0; i < this.images.length; i++) {
      const texture = PIXI.Texture.from(this.images[i]);
      this.backgroundTextures.push(texture);
    }
  }

  animateOff() {
    //SFX
    const coinDrop = new Howl({
      src: ['/sounds/coin.mp3'],
      volume: 0.25,
    });
    setTimeout(() => {
      coinDrop.play();
    }, 1000);

    gsap.to(this, { alpha: 0, duration: 1 });
    setTimeout(() => {
      while (this.children.length > 1) {
        this.removeChild(this.children[this.children.length - 1]);
      }
      this.createLoadingScreen();
    }, 1100);
  }

  createLoadingScreen() {
    new LoadingContainer(this.stage);
  }
  setUser(user) {
    this.user = user;
    window.user = user;
    console.log(window.user);
  }
}
