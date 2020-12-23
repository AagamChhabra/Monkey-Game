
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var gameState = "PLAY"


function preload(){
  
  
  monkey_running =  loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {



  var survivalTime = 0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  
   ground.x=ground.width/2;    
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();
 
  score = 0;
 
  
}


function draw() {
  
  background("white");
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
  
  if(gameState === "PLAY"){
  if(keyDown("space")){
    monkey.velocityY=-4;
  }
    monkey.velocityY=monkey.velocityY+0.5;
    monkey.collide(ground);
    spawnObstacles();
    spawnFood();
    survivalTime=Math.round(frameCount/frameRate());
    
 }

  
  drawSprites();
if(obstaclesGroup.isTouching(monkey)){
  ground.velocitYX-=0;
  monkey.velocityY=0;
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  gameState="END";
  
}
stroke("black"); 
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime, 100,50); 
  text("Score: " +score,100,20);
      if(FoodGroup.isTouching(monkey)){
        score=score+1;
        FoodGroup.destroyEach();
      }
    }
  
  
 



function spawnFood() {
  //write code here to spawn the Food
  

  if (frameCount % 80 === 0) {
    banana=createSprite(600,250,40,10);
    banana.velocityX=-5;
    banana.y=random(120,200);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime=300;
    monkey.depth=banana.depth+1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
     obstacle=createSprite(800,320,10,40);
    obstacle.velocityX=-5;
    //obstacle.y=random(120,200);
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.1;
    obstacle.lifetime=300;
    //monkey.depth=banana.depth+1;
    obstaclesGroup.add(obstacle);
   
  }
}
