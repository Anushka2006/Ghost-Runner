var ghost, ghostImg, pathImg, path, climberImg, climberGroup, path2, doorGroup, spookySound;
var gameState = "play";

function preload(){
  ghostImg = loadAnimation("ghost-jumping.png","ghost-standing.png");
  pathImg= loadImage("tower.png");
  climberImg= loadImage("climber.png");
  doorImg= loadImage("door.png");
  spookySound= loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  path= createSprite(300,300,600,600);
  path.addImage(pathImg);
  ghost= createSprite(300,300,10,10);
  ghost.addAnimation("ghost_running",ghostImg);
  ghost.scale=0.35;
  
  climberGroup= new Group();
  doorGroup= new Group();
  
}
function draw(){
  background(255);
  spookySound.play();
  if(gameState==="play"){
  path.velocityY= 2;
  if(path.y>400){
    path.y= 300
  }
  if(keyDown("space")){
    ghost.velocityY= -7;
  }
  if(keyDown("Left_Arrow")){
    ghost.x= ghost.x-2;
  }
  if(keyDown("Right_Arrow")){
    ghost.x= ghost.x+2;
  }
  
  ghost.velocityY= ghost.velocityY + 1;
  
  createClimber();
    if(climberGroup.isTouching(ghost)||ghost.y>600){
    gameState= "end";
  }
    
  }

  drawSprites();
  if(gameState==="end"){
    textSize(30);
    textFont("greogrian");
    fill("black");
  text("Game Over",250,300);
  ghost.destroy();
    climberGroup.setLifetimeEach(-2);
    climberGroup.setVelocityYEach(0);
    
    doorGroup.setLifetimeEach(-2);
    doorGroup.setVelocityYEach(0);
    path.velocityY=0;
  
}
}

function createClimber(){
  if(frameCount%150===0){
    rand = Math.round(random(100,500));
    var climber = createSprite(rand,150,10,10);
    var door = createSprite(20,55,10,10);
    door.addImage(doorImg);
    door.scale=1.4;
    door.velocityY=2;
    door.lifetime=225;
    door.x= climber.x;
    climber.addImage(climberImg);
    climber.scale= 0.9;
    climber.velocityY= 2;
    climber.lifetime= 225;
    climberGroup.add(climber);
    doorGroup.add(door);
    
  }
}

