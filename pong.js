
play = false;
var ai = new AI();
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, -2000 )  };

//The number of callbacks is usually 60 times per second

let canvas = document.getElementById('pong');
let width = 400;
let height = 600;
canvas.width = width;
canvas.height = height;
let context = canvas.getContext('2d');

var step = function() {
  update();
  render();
  if( play ){
     animate(step);
  }
  else{
    //console.log("cant play");
  }
};

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

// member function of object Paddle

Paddle.prototype.render = function() { 
  context.fillStyle = "#FFFFFF";
  context.fillRect(this.x, this.y, this.width, this.height);
};


// make objects for player and the opponent

function Player() {
   this.paddle = new Paddle(175, 580, 50, 10);
}

function Computer() {
  this.paddle = new Paddle(175, 10, 50, 10);
  this.ai_plays = false;
}

// render methods

Player.prototype.render = function() {
  this.paddle.render();
};

Computer.prototype.render = function() {
  this.paddle.render();
};

// make object of the ball


// create instances of objects
var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);



// MAIN RENDER FUNCTION  called in sztep function 
var render = function() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);
  
  player.render();
  computer.render();
  ball.render();
};


// Controls of player

var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});


Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    //ai.save_data(player.paddle,computer.paddle,ball);
    if(value == 37) { // left arrow
      this.paddle.move(-4, 0);
    } else if (value == 39) { // right arrow
      this.paddle.move(4, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};




Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.x < 0) { // all the way to the left
    this.x = 0;
    this.x_speed = 0;
  } else if (this.x + this.width > 400) { // all the way to the right
    this.x = 400 - this.width;
    this.x_speed = 0;
  }
}


// simple computer AI

var update = function() {
  player.update();
  if(computer.ai_plays){
        move = ai.predict_move();
        computer.ai_update(move);
    }
    else
        computer.update(ball);

  ball.update(player.paddle, computer.paddle);
  ai.save_data(player.paddle,computer.paddle,ball);
};

Computer.prototype.update = function(ball) {
  var x_pos = ball.x;
  var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
  if(diff < 0 && diff < -4) { // max speed left
    diff = -5;
  } else if(diff > 0 && diff > 4) { // max speed right
    diff = 5;
  }
  this.paddle.move(diff, 0);
  if(this.paddle.x < 0) {
    this.paddle.x = 0;
  } else if (this.paddle.x + this.paddle.width > 400) {
    this.paddle.x = 400 - this.paddle.width;
  }
};

Computer.prototype.ai_update = function (move = 0) {
    this.paddle.move(4 * move, 0);
};