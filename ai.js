
// Custom code:
function AI(){
    this.previous_data = null;
    this.training_data = [[], [], []];
    this.last_data_object = null;
    this.flip_table = true;
}


// Custom code:
// This code is responsible for saving data per frame
AI.prototype.save_data = function(player, computer, ball){


    // If this is the very first frame (no prior data):
    if(this.previous_data == null){
        data = this.flip_table ? [ width - player.x, width - ball.x, height - ball.y] : [ computer.x, ball.x, ball.y];
        this.previous_data = data;
        return;
    }
    // table is rotated to learn from player, but apply to computer position:
    if(this.flip_table){
        data_xs = [ width - player.x, width - ball.x, height - ball.y];
        index = ((width - player.x) > this.previous_data[0])?0:(((width - player.x) == this.previous_data[0])?1:2);
    }else{
        data_xs = [ computer.x, ball.x, ball.y];
        index = (player.x < this.previous_data[0])?0:((player.x == this.previous_data[0])?1:2);
    }

    //console.log(this.last_data_object, " index = ",index);

    this.last_data_object = [...this.previous_data, ...data_xs];


    // collect training data only when ai is not playing
    if(!computer.ai_plays)
    this.training_data[index].push(this.last_data_object);

    this.previous_data = data_xs;

    // update no of training points in the page
    updateDataPoints(this.training_data);
}

 
AI.prototype.train = function(){
    console.log("ready to train");
    // train all classes equally by using minimum 
    len = Math.min(this.training_data[0].length, this.training_data[1].length, this.training_data[2].length);
     // if there is no training data for a label

    if(!len){
        console.log('nothing to train');
        return;
    }

    data_xs = [];
    data_ys = [];
    for(i = 0; i < 3; i++){
        data_xs.push(...this.training_data[i].slice(0, len));
        data_ys.push(...Array(len).fill([i==0?1:0, i==1?1:0, i==2?1:0]));
    }
    // console.log(data_xs);
    // console.log(data_ys);

    
    const xs = tf.tensor(data_xs);
    const ys = tf.tensor(data_ys);
    // console.log(xs);

    (async function() {
        console.log('training');
        let result = await model.fit(xs, ys,{epochs:20});
        console.log(result);
    }());
    console.log('trained');


    // flip the board for predictions

    this.flip_table = false;
    computer.ai_plays = true;

    // clear training data

    updateDataPoints(this.training_data);
    // change opponents name 
    updateOpponent("AI");
    updateBeginTraining("Train Again !");
}



AI.prototype.predict_move = function(){

    if(this.last_data_object != null){
        
        prediction = model.predict(tf.tensor([this.last_data_object]));
        console.log("prediction :" ,tf.argMax(prediction, 1).dataSync()-1);
        let pred = tf.argMax(prediction, 1).dataSync()-1;
        updateAction(pred);
        return pred;
    }
}

