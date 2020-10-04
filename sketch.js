
var monkey, monkey_running, bananaImg, obstacleImg, obstacleGroup, backImage, backround, score, bananaGroup;
var ground; 
var survival_time;
var survivial_time_factor;
var times_monkey_hit

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
backImage=loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImg=loadImage("banana.png");
  obstacleImg=loadImage("stone.png");
}

function setup() {
  
  ground = createSprite(30, 400, 800, 20);
  ground.visibility=false;
  
  backround = createSprite(200,370);
  backround.addImage("backround", backImage);
  backround.velocityX=-3;
  backround.x=backround.width/2;
  
  monkey = createSprite(30,370,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  survival_time=0;
  score=0;
  times_monkey_hit=0;
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  survival_time_factor=Math.round(getFrameRate()/60);
  
  if(backround.x<0) {
     backround.x=400
     }
  
  monkey.collide(ground);
  
  
  survival_time = survival_time + survival_time_factor
  //survival_time=Math.ceil(World.frameCount/World.frameRate);
  text("Survial Time: "+survival_time, 100, 50);   
  
  if (keyDown("space")) {
      monkey.velocityY=-12;
    }
    
   createEdgeSprites();
    
   monkey.velocityY=monkey.velocityY+1.5;
    
    monkey.collide(ground);
    
  SpawnBanana();
  SpawnObstacles();
  
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
    times_monkey_hit=times_monkey_hit+1;
     }
  
     
  
  if(bananaGroup.isTouching(monkey)){
        score=score+2;
        bananaGroup.destroyEach();
       }
  
  switch (score) {
      case 10:monkey.scale=0.12;
        break;
      case 20:monkey.scale=0.135;
        break;
      case 30:monkey.scale=0.145;
        break;
      case 40:monkey.scale=0.15;
        break;
      case 50:monkey.scale=0.16;
        break;
      case 60:monkey.scale=0.17;
        break;
        default:break;
    }
  
  drawSprites();
      
  stroke("black");
  textSize(20);
  fill("white");
  text("Survial Time: "+survival_time, 100, 50);
  text("Score: "+score,100,70);
}

function SpawnBanana() {
  if (World.frameCount%160===0) {
    var rand = random(120, 200);
    var banana = createSprite(400,rand, 20, 20);
    banana.addAnimation("banana",bananaImg);
    banana.scale=0.05;
    banana.velocityX=-2;
    banana.lifetime=204;
    bananaGroup.add(banana);
      
  }
  
  
}

function SpawnObstacles() {
  if (World.frameCount%300===0) {
    var obstacle = createSprite(400, 400);
    obstacle.addImage("obstacle",obstacleImg);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale=0.1;
    obstacle.velocityX=-2;
    obstacle.collide(ground);
    obstacle.collide(monkey);
    obstacleGroup.add(obstacle);
  }
  
  
}