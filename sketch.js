var dog, dog_running, edges;
var groundImage;
var PLAY = 1
var END = 0
var gamestate = PLAY
var score = 0

function preload() {
  dog_running = loadAnimation("dog1.png", "dog2.png");
  dog_collided = loadAnimation("collided.png")
  groundImage = loadImage("ground (1).png")
  treatsImage = loadImage("treats.png")
  bananaImage = loadImage("banana.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  dog = createSprite(width-50, height-170, 20, 50);
  dog.addAnimation("running", dog_running);
  dog.addAnimation("collided", dog_collided)
  edges = createEdgeSprites();

  dog.scale = 0.7;
  dog.x = 70

  ground = createSprite(width/2,height-141, 800, 5)
  ground.addImage("ground", groundImage)
  ground.scale = 0.6

  invisibleground = createSprite(200, height-170, 800, 5)
  invisibleground.visible = false


  treatsgroup = new Group()
  bananagroup = new Group()

  score = score+frameCount/60
  text("Score = ", score, 550, 30)
}
function draw() {

 
  //set background color 
  background("white");
  
dog.bounce(treatsgroup,doghit)


text("Score = ", score,550,50)

 
  dog.collide(invisibleground)

  if(gamestate == PLAY){
    spawntreats()
    spawnbanana()
    ground.velocityX = -5
    console.log(dog.y)
 
  if (keyDown("space")&& dog.y >= 134){
    dog.velocityY = -10;
  }

  dog.velocityY = dog.velocityY + 0.4;

  if (ground.x < 0) {
    ground.x = 300
  }

  if(dog.isTouching(bananagroup)){
    gamestate = END
  }
  }
  else if(gamestate == END){
    ground.velocityX = 0
    treatsgroup.setVelocityXEach(0)
    bananagroup.setVelocityXEach(0)
    dog.changeAnimation("collided", dog_collided)
    dog.velocityY = 0
  }
  drawSprites();
}

function spawntreats() {
  if (frameCount % 60 === 0) {
    treats = createSprite(600, 100, 20, 10)
    treats.velocityX = -5
    treats.addImage("treats", treatsImage)
    dog.depth = treats.depth
    treats.scale = 0.09
    treats.y = Math.round(random(30,100))
    treatsgroup.add(treats)
    treats.lifetime = 130
    }
  }



function spawnbanana(){
  if (frameCount % 80 === 0 ){
    banana = createSprite(width-200,height-200,20,10)
    banana.addImage("banana", bananaImage)
    banana.velocityX = -5
    banana.scale = 0.09
    bananagroup.add(banana)
  }
}

function doghit(dog,treat){
  treat.velocityX = 0
  treat.destroy()
  score = score + 1
}

