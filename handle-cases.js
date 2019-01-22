function start(){
  play = true;
  animate(step);
}

function stop(){
  play = false;
  bringToInitialPosition(ball,player.paddle,computer.paddle);
}


// 

function startTraining(){

  // collect training data in many frames

  if(!computer.ai_plays){
    updateBeginTraining("Train Again");
    play = false;
    ai.train()
    bringToInitialPosition(ball,player.paddle,computer.paddle);
 }
  return;
  // ai is playing .. stop him from playing
  computer.ai_plays = false;
  ai.flip_table = true;
  //ai.training_data = [[],[],[]];  // clear training data
  updateBeginTraining("Begin Training");
  updateOpponent("Dumb computer");
  updateAction("No Prediction");
}

