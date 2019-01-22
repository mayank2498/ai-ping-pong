function getRandomSpeed(){
  // return random number between -5 and 5
  return Math.floor((Math.random() * -5) + 1) + Math.floor((Math.random() * 5) + 1);
}


initialConf = {

  ball: { y_speed : 4  , x : 200, y:300},
  player : { x : 175, y : 580  },
  computer : { x:175 , y:10 }
}

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = getRandomSpeed();
  this.y_speed = initialConf.ball.y_speed;
  this.radius = 5;
}



Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#dff442";
  context.fill();
};



function bringToInitialPosition(ball,player,computer){
  ball.x_speed = getRandomSpeed();
  ball.y_speed = initialConf.ball.y_speed;
  ball.x = initialConf.ball.x;
  ball.y = initialConf.ball.y;
  player.x = initialConf.player.x;
  computer.x = initialConf.computer.x
  player.y = initialConf.player.y;
  computer.y = initialConf.computer.y;
}


// Balls class update function

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.x - 5 < 0) { // hitting the left wall
    this.x = 5;
    this.x_speed = -this.x_speed;
  } else if(this.x + 5 > 400) { // hitting the right wall
    this.x = 395;
    this.x_speed = -this.x_speed;
  }

  if(this.y < 0 || this.y > 600) { // a point was scored

    // restart the game
    bringToInitialPosition(this,paddle1,paddle2);
    stop();
  }

  if(top_y > 300) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle
      console.log("hit player");
      this.y_speed = -this.y_speed;
      this.x_speed += (paddle1.x_speed / 2);
      this.y += this.y_speed;
    }
  } else {
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the computer's paddle
      console.log("hit computer");
      this.y_speed = -this.y_speed;
      this.x_speed += (paddle2.x_speed / 2);
      this.y += this.y_speed;
    }
  }
};
