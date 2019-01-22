function update_innerHTML(data,id){
  document.getElementById(id).innerHTML = data;
}

function updateDataPoints(training_data){
  if(training_data[0] != null)
    update_innerHTML(training_data[0].length,"moveLeft");
  if(training_data[1] != null)
    update_innerHTML(training_data[1].length,"stay");
  if(training_data[2] != null)
    update_innerHTML(training_data[2].length,"moveRight");
}


function updateOpponent(opponent){
    update_innerHTML(opponent,"opponent")
}

function updateBeginTraining(data){
  update_innerHTML(data,"beginTraining");
}



function updateAction(pred){
  if(pred==-1){
    update_innerHTML("MOVE LEFT","action");
  }
  else if(pred==0){
    update_innerHTML("STAY","action");
  }
  else {
    update_innerHTML("MOVE RIGHT","action");
  }
}