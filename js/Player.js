class Player {
  constructor(){
    this.index = null;
    this.distance = 750;
    this.name = null;
    this.rank=null;
  }

  getFinishCount(){
    var finishCount = database.ref('finishCount');
    finishCount.on("value",(data)=>{
      this.rank = data.val();
    })
  }
//static
static updateFinish(rank){
    database.ref('/').update({
      finishCount : rank
    })

  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
