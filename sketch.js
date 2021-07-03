var bg, loseBg, winBg;

var player, playerLeftImg, playerRightImg;
var bullet, bulletGrp, bulletImg;
var zombieGrp, zombie1, zombie2, zombie3, zombie4;

var loseEImg, loseE, loseAImg, loseA;
var winEImg, winE, winAImg, winA, rewardImg, reward;

var kill, life;

var PLAY = 1;
var WIN = 2;
var END = 0;
var gameState = PLAY;

var inviGround;

function preload()
{
	bg = loadImage("bg.jpg");
    loseBg = loadImage("loseBg.jpg");
	winBg = loadImage("winBg.jpg");

	loseEImg = loadImage("loseEmoji.png");
	loseAImg = loadImage("loseAnime.png");
	winEImg = loadImage("winEmoji.png");
	winAImg = loadImage("winAnime.png");
	rewardImg = loadImage("reward.png");

	playerLeftImg = loadImage("shootingGirlLeft.png");
	playerRightImg = loadImage("shootingGirlRight.png");

	bulletImg = loadImage("bullet.png");

	zombie1 = loadImage("zombie1.png");
	zombie2 = loadImage("zombie2.png");
	zombie3 = loadImage("zombie3.png");
	zombie4 = loadImage("zombie5.png");
}

function setup() {
	createCanvas(1000, 500);

	player = createSprite(100, 365, 50, 50);
	player.addImage("right", playerRightImg);
	player.scale = 0.5;

	inviGround = createSprite(1, 100, 10, 1000);
	inviGround.visible=false;
	

	bulletGrp = new Group();
    zombieGrp = new Group();

    kill = 0;
	life = 3;
}


function draw() {
  background(bg);

  if(gameState===PLAY){
	if(keyWentDown(32)){
		bullet = createSprite(player.x+75, player.y-85, 50, 50);
		bullet.addImage("bullet", bulletImg);
		bullet.scale = 0.1;
		bullet.velocityX=6;
		bulletGrp.add(bullet);
	  }

	  if(zombieGrp.isTouching(inviGround)){
		  zombieGrp.destroyEach();
		  life-=1;
	  }
	
	  if(keyDown(RIGHT_ARROW)){
		player.x+=2;
	  }
	
	  if(keyDown(LEFT_ARROW)){
		player.addImage("left", playerLeftImg);
		player.x-=2;
	
	  }
	
	  if(keyDown(UP_ARROW)){
		  player.y-=2;
	  }
	  if(keyDown(DOWN_ARROW)){
		player.y+=2;
	  } 
	
	  if(bulletGrp.isTouching(zombieGrp)){
		  kill+=1;
		  zombieGrp.destroyEach();
		  bulletGrp.destroyEach();
	  }
	
	  if(zombieGrp.isTouching(player)){
		  life-=1;
		  zombieGrp.destroyEach();
	  }

	  textSize(20);
	  fill("white");
	  text("Killed : "+kill, 30, 30);
	
	  textSize(20);
	  fill("white");
	  text("Life : "+life, 30, 60);
	
	  textSize(20);
	  fill("white");
	  text("*Control the player with the arrow keys", 120, 30);
	
	  textSize(20);
	  fill("white");
	  text("*Press space to shoot", 120, 60);
	
	  textSize(20);
	  fill("white");
	  text("*Zombies can from top also", 120, 90);
	
	  textSize(20);
	  fill("white");
	  text("*Kill 15 zombies to save the city or they will go the city", 450, 60);
	
	  textSize(20);
	  fill("white");
	  text("*If zombie go without killing then also 1 life will be deducted", 450, 90);

	  if(life === 0){
		gameState=END;
	  }

	  if(kill === 15){
		gameState=WIN;
	  }

  }else if(gameState===END){
       loose();
  }else if(gameState===WIN){
	  win();
  }



  drawSprites();
  Zombie();
}

function Zombie() {
	if(frameCount % 75 === 0){
		var rand = Math.round(random(1,4));
		zombie = createSprite(1000, 365, 50, 50);
		zombie.y=Math.round(random(100, 365));
		switch (rand) {
			case 1 : zombie.addImage("1", zombie1);
			zombie.scale = 0.4;
			 break;
			case 2 : zombie.addImage("2", zombie2);
			zombie.scale = 0.4;
			 break;
			case 3 : zombie.addImage("3", zombie3);
			zombie.scale = 0.4;
			 break;
			case 4 : zombie.addImage("4", zombie4);
			zombie.scale = 0.4;
			 default:
				break;
		}
		zombie.velocityX = -13;
		zombieGrp.add(zombie);
 
	}

}

function loose(){
	background(loseBg);
	textSize(30);
	fill("red");
	stroke("white");
	text("Oh No ZOMBIES destroyed the city!!!", 300, 200);
	text("You LOSE from saving the city from the destruction of ZOMBIES :(",100, 250);

	zombieGrp.destroyEach();
	bulletGrp.destroyEach();
	player.x=1100;
	player.y=600;

    loseA = createSprite(900, 400, 50, 50);
	loseA.addImage(loseAImg);

	loseE = createSprite(150, 100, 50, 50);
	loseE.addImage(loseEImg);
	loseE.scale = 0.5;
}

function win(){
    background(winBg);
	textSize(30);
	fill("red");
	stroke("white");
	text("Congratulations!!", 400, 120);
	text("You SAVED the city from the zombies :D",200, 170);
	text("Take your reward :)", 400, 230);

	zombieGrp.destroyEach();
	bulletGrp.destroyEach();
	player.x=1100;
	player.y=600;

	winA = createSprite(900, 400, 50, 50);
	winA.addImage(winAImg);
	winA.scale=0.8;

	winE = createSprite(300, 70, 50, 50);
	winE.addImage(winEImg);
	winE.scale=0.3;

	stroke('white');
	strokeWeight(10);
	reward = createSprite(700, 400, 50, 50);
	reward.addImage(rewardImg);
	reward.scale=0.3;

}