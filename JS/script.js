let canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d");

// divide the canvas into 10 by 10 & save score
var score = 0
let scale = 20;
let rows = canvas.height / scale;
let columns = canvas.width / scale;

// An array to save bodies of the 🐍
let snake = [];
snake[0] = {
    x: (Math.floor(Math.random()*columns))*scale,
    y: (Math.floor(Math.random()*columns))*scale
}

// declare Function of the food
    let food = {
        x: (Math.floor(Math.random() * columns)) * scale ,
        y: (Math.floor(Math.random() * columns)) * scale
    }
    

// Snake Direction declaration
let d ="right"

// Keyboard control alignment (binding)
const direction = (e) => {
    let key = e.keyCode;
    if (key == 37 && d != "right") {
        d = "left"
    }
    else if (key == 38 && d != "down") {
        d="up"
    } else
        if (key == 39&&d!= "left") {
            d ="right"
        } else
            if (key == 40 && d != "up") {
                d = "down"
            }
}

document.onkeydown = direction;

// Function for drawing the snake and his food
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

    // defining a for loop
    for (let i = 0; i < snake.length; i++){
        ctx.fillStyle = "#a0a09e";
        ctx.strokeStyle = "#ff4b4b";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale)
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
    }

  // old head direction
  let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    // draw the food of the snake

    ctx.fillStyle = "aqua"
    ctx.strokeStyle = "#c3ff36";
    ctx.fillRect(food.x, food.y, scale, scale)
    ctx.strokeRect(food.x,food.y,scale,scale)

  // which direction
    if (d == "left") snakeX -= scale;
    if (d == "up") snakeY -= scale;
    if (d == "right") snakeX += scale;
    if (d == "down") snakeY -= scale;

    // if statment if it reaches the limited border
    if (snakeX > canvas.width) {
        snakeX = 0
    }
    if (snakeY > canvas.height) {
        snakeY = 0
    }
    if (snakeX < 0) {
        snakeX = canvas.width
    }
    if (snakeY < 0) {
        snakeY = canvas.height
    }

    // when the snake eats the food it grow up and score increases
      if (snakeX == food.x && snakeY == food.y) {
        var score = score + 1;
        food = {
          x: (Math.floor(Math.random() * columns)) * scale,
          y: (Math.floor(Math.random() * rows)) * scale,
        };
        // we don't remove the tail
      } else {
        // remove the tail
        snake.pop();
      }

  let newHead = {
    x: snakeX,
    y: snakeY,
    };

    // passing value of snake and new head into eatSelfCheck function and checking the Game over scenario
    if (eatSelfCheck(newHead,snake)) {
        clearInterval(playGame)
    }

    snake.unshift(newHead) 
}



// call the draw every 85 ms
let playGame = setInterval(draw, 85)

// Game over if the snake eat it's self

const eatSelfCheck = (head, array) => {
    for (let i = 0; i < array.length; i++){
        if (head.x == array[i].x && head.y == array[i].y) {
            $("#game-over-text").css({ display: "block" });
            $("#retry-btn").css({display: "block"})
            return true;
        }
    }
    return false
}
let retryButton = $("#retry-btn")
retryButton.on("click", function () {
    
});
console.log("Thanks for playing the game ;)");
