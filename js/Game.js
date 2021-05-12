class Game {
  constructor(){
    this.Victory = createElement('h2');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

  
    green= createSprite(600,160);
    green.addAnimation("GreenS",greenS_img);
    green.addAnimation("GreenP", greenP_img);
    green.scale=0.5;
    blue = createSprite(800,160);
    blue.addAnimation("BlueS",blueS_img);
    blue.addAnimation("BlueP",blueP_img);
    blue.scale=0.5;
    boats = [blue, green];
    wind = createSprite(700,50);
    wind.addAnimation("wind", wind_img);
    wind.scale=0.3;
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    player.getFinishCount();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(ocean, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the boats
      var x = 500 ;
      var y;

  

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the boats a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the boats in y direction
        y = displayHeight - allPlayers[plr].distance;
        //boats[index-1].bounceOff(edges[0]);

        if (index === player.index){
          camera.position.x = displayWidth/2;
          camera.position.y = boats[index-1].y;
          wind.y = boats[index-1].y-300;
          console. log(camera.position.y);
        }
      }
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !==null){
      boats[player.index-1].changeAnimation("GreenP",greenP_img);
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !==null){
      boats[player.index-1].changeAnimation("GreenS",greenS_img);
      player.update();
    }

    console.log("index"+index);

    if(keyIsDown(RIGHT_ARROW) && player.index !==null){
      boats[player.index-1].changeAnimation("BlueP",blueP_img);
      
      boats[player.index-1].velocityX=5;
      boats[player.index-1].velocityY=-5;
      player.distance +=5
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !==null){
      boats[player.index-1].changeAnimation("BlueS",blueS_img);
      boats[player.index-1].velocityX=-5;
      boats[player.index-1].velocityY=-5;
      player.distance +=5
      player.update();
    }

    if(player.distance > 1045){
      gameState = 2;
      player.rank = player.rank + 1;
      Player.updateFinish(player.rank);
    }
    drawSprites();
  }

  end(){   
    this.Victory.html("RANK " + player.rank + " Goes to " + player.name + " Congratulations for all your hard work on the water today!")
    this.Victory.position(displayWidth/4-100 , displayHeight/6);
    console.log("Game Ended");
    console.log("Congrats for finishing in " + player.rank);
  }
}
