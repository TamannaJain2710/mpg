var ball,bImg;
var playerPaddle,pImg,pfImg,pkImg;
var player2Paddle,p2Img,p2fImg,p2kImg;
var gameState = "serve";
var player2Score = 0;
var playerScore = 0;
var playerPos, player2Pos, ballPos;

function preload(){
    bImg = loadImage("ball.png");
    pImg = loadImage("player.png");
    pfImg = loadImage("player_fall.png")
    pkImg = loadImage("player_kick.png")
    p2Img = loadImage("player2.png");
    p2fImg = loadImage("player_fall.png")
    p2kImg = loadImage("player_kick.png")
}

function setup(){
    database = firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.addImage(bImg);
    playerPaddle = createSprite(480,200,10,70);
    playerPaddle.addImage(pImg);
    player2Paddle = createSprite(20,200,10,70);
    player2Paddle.addImage(p2Img);
    /*playerPos = database.ref('players/player/pos')
    playerPos.on("value",readPos,error);
    player2Pos = database.ref('players/player2/pos')
    player2Pos.on("value",readPos,error);
    ballPos = database.ref('players/ball/pos')
    ballPos.on("value",readPos,error);*/
    
}

function draw(){
    background("white");
    playerPaddle.y = World.mouseY;
    player2Paddle.y = ball.y;
    text("Score " + player2Score, "80", "50");
    text("Score " + playerScore, "420", "50");
    for (var i = 0; i < 500; i=i+20) {
        line(250,i,250,i+10);
      }

    createEdgeSprites();
    
    /*if (ball.bounceOff(bottomEdge) || ball.bounceOff(topEdge)) {
        playSound("wall_hit.mp3");
    }
    ball.bounceOff(topEdge);
    ball.bounceOff(bottomEdge);
    ball.bounceOff(playerPaddle);
    ball.bounceOff(computerPaddle);*/
    
    if((touches.length > 0 || keyDown("SPACE")) {
      serve();
        playerPaddle.addImage(pImg);
        player2Paddle.addImage(p2Img);
        gameState = "play";
      
      touches = [];
   }
    
    /*if ((keyDown("space") || touches.length > 0  &&  gameState === "serve") {
      touches = [];
        
        
    }*/

    if(ball.x > 400 || ball.x <0) {
        //playSound("score.mp3",false);
        if(ball.x > 400) {
        player2Score = player2Score + 1;
        playerPaddle.addImage(pfImg);
        
        }
        
        if(ball.x < 0) {
        playerScore = playerScore + 1;
        player2Paddle.addImage("player2_fall.png");
        }
        
        reset();
        gameState = "serve";
    }
    if (playerScore === 5 || player2Score === 5){
        gameState = "over";
        text("Game Over!",170,160);
        text("Press to Restart",150,180);
    }
      
      if (keyDown("r") && gameState === "over") {
        gameState = "serve";
        player2Score = 0;
        playerScore = 0;
      }
      
      if (keyWentDown("k")) {
       playerPaddle.addImage(p);  
      }
      if (keyWentUp("k")){
        playerPaddle.setAnimation(pImg);
      }

      drawSprites();

}

  function serve() {
    ball.velocityX = 3;
    ball.velocityY = 4;
  }
  
  function reset() {
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
  }

  /*function readPos(data){
    playerPos = data.val();
    console.log(playerPos)
    playerPos.x 
    playerPos.y 
    player2Pos.x
    player2Pos.y
    ballPos.x 
    ballPos.y 
}

    function error(){
        console.log("error");
    }


    function writePosition(x,y){
        database.ref('players/player/pos').set({
            x : pos.x + x,
            y: pos.y + y
        })
    
    }*/