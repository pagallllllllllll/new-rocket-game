var PLAY = 1;
var END = 0;
var gameState = PLAY;
var scene,sceneImg,player,playerImg
var score;
var edges;
var gameOver,gameOverimg,restartimg,restart
var aliens,aliensImg,fuel,fuelImg,star,starImg;
var stGroup,s,alGroup,fuelGroup;
var score;
var bulletImg
var bullet,bgroup
var fu = 250,l = 250;
var go,fire,bg,rocket;


function preload(){
  sceneImg = loadImage("bg.jpg");
  playerImg = loadImage("player.png")
  aliensImg = loadImage("aliens.png")
  fuelImg = loadImage("fuel.png")
  starImg = loadImage("star.png")
  heartImg = loadImage("life.png")
  bulletImg = loadImage("bullet.png")
  go = loadSound("go.wav")
  fire = loadSound("fire.wav")
  bg = loadSound("bg.mp3")
  rocket = loadSound("rocket.wav")
}
  
function setup() {
  createCanvas(windowWidth,windowHeight);
  scene = createSprite(width/2,height/2,width - 50,height - 50);
  scene.addImage(sceneImg)
  scene.scale = 0.6
  scene.velocityY = 3;
  score = 0;
  player = createSprite(width/2,height-100,30,100);
  player.addImage(playerImg)
  player.scale = 0.655
  edges = createEdgeSprites()
  player.setCollider("rectangle",0,-60,100,200)
   stGroup = new Group()
   alGroup = new Group()
   fuelGroup = new Group()
   bgroup = new Group()
 }

function draw() {
  background(0);
  if(gameState == PLAY){

  if(scene.y>height){
    scene.y = height/2
   
  }
  if(keyDown("w")){
    player.velocityY = -2
    rocket.setVolume(0.1)
    rocket.play()
  }

  if(keyDown("s")){
    player.velocityY = 4
  }

  if(keyDown("a")){
    player.velocityX = -4
  }

  if(keyDown("d")){
    player.velocityX = 4
  }
  if(keyDown("space")){
    SpawnBullet()
    fire.setVolume(0.2)
    fire.play();
  }
  bgroup.bounce(alGroup,aliRemove)
   spawn(star,20,stGroup,starImg,0.3,5)
   spawn(aliens,100,alGroup,aliensImg,0.3,3)
   spawn(fuel,100,fuelGroup,fuelImg,0.3,4)
  player.bounceOff(edges)
  player.bounce(stGroup,stRemove)
  player.bounce(fuelGroup,fuRemove)
  player.bounce(alGroup,alRemove)
 drawSprites();
 textSize(20);
 fill ("white");
 text("Score:"+score,width - 200,100)
 image(fuelImg,40,70,50,30)
 image(heartImg,40,35,50,30)
 strokeWeight(5)
 stroke("red")
 noFill()
 rect(100,40,250,22)
 fill("red")
 rect(100,40,l,22)
 strokeWeight(5)
 stroke("blue")
 noFill()
 rect(100,75,250,22)
 fill("blue")
 rect(100,75,fu,22)
 if(fu<=0){
   l = 0
 }
 if(l==0){
   gameState = END
   go.play()
 }
 fu = fu-0.5
}
if(gameState==END){
  fill("white")
  textSize(40)
  text("You Lost LOL",width/2-100,height/2-100)
  text("Score:"+score,width/2-100,height/2)
}
}

function spawn(sprite,n,sGroup,spriteImg,s,v){
if(frameCount%n == 0){
  sprite = createSprite(random(50,width - 50),0,20,20)
  
  sprite.addImage(spriteImg);
  sprite.velocityY = v;
  sGroup.add(sprite)
  sprite.scale= 0.2
}
}
function stRemove(player,st){
  st.remove()
  score = score+5
}
function fuRemove(player,st){
  st.remove()
 fu = 250
}
function alRemove(player,st){
  st.remove()
  l = l-62.5
}
function aliRemove(player,st,b){
  st.remove();
 
  score = score+20
}
 function SpawnBullet(){
   bullet = createSprite(player.x,player.y,5,10);
   bullet.addImage(bulletImg)
   bullet.scale = 0.1
   bullet.shapeColor = "red";
   bullet.velocityY = -10
   bgroup.add(bullet);
 }
