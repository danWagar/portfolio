import Game from './game.js';

import GameState from './gameState.js';

//Global variables
let game = new Game();
let gameState = new GameState(game);

window.onload = function() {
  //console.log('Loading window');
  let canv = document.getElementById('gc');
  let ctx = canv.getContext('2d');
  let center = canv.width / 2;
  let quarterHeight = canv.height - canv.height / 4;

  game.initSprites(canv);
  //console.log('setting gameState context');
  gameState.context = ctx;
  gameState.initScreens();

  let playerImage = game.player.image;
  playerImage.onload = function() {};
  playerImage.src = './images/images_space/3dRocket.png';

  let bulletImage = game.bulletImage;
  bulletImage.onload = function() {};
  bulletImage.src = './images/images_space/bullet.png';

  //load start button
  let startButton = new Image();
  startButton.onload = function() {
    gameState.startScreen.addButton(
      startButton,
      canv.width / 2 - startButton.width / 2,
      canv.height * 0.75,
      'start'
    );
    gameState.gameOverScreen.addButton(
      startButton,
      center - startButton.width / 2,
      quarterHeight + startButton.height / 2,
      'start'
    );
  };
  startButton.src = './images/images_space/startButton.jpg';

  //load start background
  let startBackground = new Image();
  startBackground.onload = function() {
    gameState.startScreen.backgroundImg = startBackground;
    gameState.home();
  };
  startBackground.src = './images/images_space/startBackground.jpg';

  //load home button
  let homeButton = new Image();
  homeButton.onload = function() {
    gameState.gameOverScreen.addButton(
      homeButton,
      center - homeButton.width / 2,
      quarterHeight - homeButton.height / 2 - 10,
      'home'
    );
    gameState.winScreen.addButton(
      homeButton,
      center - homeButton.width / 2,
      quarterHeight - homeButton.height / 2 - 10,
      'home'
    );
  };
  homeButton.src = './images/images_space/homeButton.jpg';

  //load next button
  let nextButton = new Image();
  nextButton.onload = function() {
    gameState.winScreen.addButton(
      nextButton,
      center - nextButton.width / 2,
      quarterHeight + nextButton.height / 2,
      'next'
    );
    gameState.upgradeScreen.addButton(
      nextButton,
      center - nextButton.width / 2,
      quarterHeight + nextButton.height / 2,
      'next'
    );
  };
  nextButton.src = './images/images_space/nextButton.jpg';

  //Please note that upgradeImages must be added to the upgradeScreen in the same order that the upgrades appear in Player.upgradeables
  let cannonUpgradeImage = new Image();
  cannonUpgradeImage.onload = function() {
    gameState.upgradeScreen.addUpgradeImage(cannonUpgradeImage, 'fireRate');
    //gameState.upgradeScreen.addImage(cannonUpgradeImage, center - cannonUpgradeImage.width, canv.height/4, true, "purple", "cannon");
  };
  cannonUpgradeImage.src = './images/images_space/cannonUpgradeImage.png';

  let boostUpgradeImage = new Image();
  boostUpgradeImage.onload = function() {
    //gameState.upgradeScreen.upgradeImages.push(boostUpgradeImage);

    gameState.upgradeScreen.addUpgradeImage(boostUpgradeImage, 'maxBoost');
    //gameState.upgradeScreen.addImage(boostUpgradeImage, center + boostUpgradeImage.width/2, canv.height/4, true, "purple", "boost");
  };
  boostUpgradeImage.src = './images/images_space/boostUpgradeImage.png';

  let turnUpgradeImage = new Image();
  turnUpgradeImage.onload = function() {
    //gameState.upgradeScreen.upgradeImages.push(boostUpgradeImage);

    gameState.upgradeScreen.addUpgradeImage(turnUpgradeImage, 'turnRate');
    //gameState.upgradeScreen.addImage(boostUpgradeImage, center + boostUpgradeImage.width/2, canv.height/4, true, "purple", "boost");
  };
  turnUpgradeImage.src = './images/images_space/turnUpgradeImage.png';

  //load plus button
  let plusButton = new Image();
  plusButton.onload = function() {
    gameState.upgradeScreen.plusButton = plusButton;
    //gameState.upgradeScreen.addButton(plusButton, center + cannonUpgradeImage.width - plusButton.width,
    //                                canv.height/4 + cannonUpgradeImage.height - plusButton.height, "plus");
  };
  plusButton.src = './images/images_space/plusButton.png';

  //load minus button
  let minusButton = new Image();
  minusButton.onload = function() {
    gameState.upgradeScreen.minusButton = minusButton;
    //gameState.upgradeScreen.addButton(minusButton, center - cannonUpgradeImage.width,
    //                                canv.height/4 + cannonUpgradeImage.height - minusButton.height, "minus");
  };
  minusButton.src = './images/images_space/minusButton.png';
};

document.onkeydown = function(e) {
  if (e.keyCode == 37) game.left = true;
  if (e.keyCode == 38) game.up = true;
  if (e.keyCode == 39) game.right = true;
  if (e.keyCode == 32) game.fire = true;
};

document.onkeyup = function(e) {
  if (e.keyCode == 37) game.left = false;
  if (e.keyCode == 38) game.up = false;
  if (e.keyCode == 39) game.right = false;
  if (e.keyCode == 32) {
    game.fire = false;
    game.bulletCounter = 0;
  }
};

window.addEventListener(
  'keydown',
  function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    if (e.keyCode == 13) {
      gameState.pause();
    }
  },
  false
);

window.addEventListener(
  'click',
  function(e) {
    let buttonClicked = gameState.currentScreen.checkButtonClick(e);
    if (buttonClicked !== false) {
      //console.log('buttonClicked is ' + buttonClicked);
      if (buttonClicked === 'start') {
        //console.log('you clicked on start');
        gameState.start();
      } else if (buttonClicked === 'home') {
        //console.log('you clicked on home');
        gameState.home();
      } else if (buttonClicked === 'next') {
        //console.log('you clicked on next');
        if (gameState.currentScreen.name === 'Win') {
          gameState.upgrade();
        } else {
          gameState.start();
        }
      } else if (buttonClicked.slice(0, 4) === 'plus') {
        //console.log('An upgrade button was clicked');
        let name = buttonClicked.slice(4);
        //console.log('searching for ' + name);
        for (let i = 0; i < game.player.upgradeables.length; i++) {
          //console.dir(game.player.upgradeables[i]);
          if (game.player.upgradeables[i].name === name) {
            //console.dir(game.user);
            game.player.upgradeables[i].upgrade(game.user);

            //console.log(game.player.upgradeables[i].currentLevel);
            gameState.upgrade();

            //console.dir(game.player.fireRate);
          }
        }
      } else if (buttonClicked.slice(0, 5) === 'minus') {
        let name = buttonClicked.slice(4);
        for (let i = 0; i < game.player.upgradeables.length; i++) {
          if (game.player.upgradeables[i].name === name) {
            game.player.upgradeables[i].downgrade();
            gameState.upgrade();
            //console.dir(game.player.fireRate);
          }
        }
      }
    } else console.log('unable to identify button pressed');
  },
  false
);
