
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var point = parseInt(document.getElementById('point').value);
var unit = 16;
var count = 0;
var snake = {
    x: 160,
    y: 160,
    dx: unit,
    dy: 0,
    cells: [],
    maxCells: 3
};
var apple = {
    x: 240,
    y: 240
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function reset() {
    alert("Game over!!!");
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 3;
    snake.dx = unit;
    snake.dy = 0;
    apple.x = getRandomInt(0, 25) * unit;
    apple.y = getRandomInt(0, 25) * unit;
    point = 0;
    document.getElementById('point').value = 0;
}
function snakeDerection() {
    snake.x += snake.dx;
    snake.y += snake.dy;
}
function snakeCollision() {
    if (snake.x < 0) {
        reset();
    } else if (snake.x >= canvas.width) {
        reset();
    }
    if (snake.y < 0) {
        reset();
    } else if (snake.y >= canvas.height) {
        reset();
    }
}
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function snackeWayToMove() {
    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
}
function drawApple() {
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, unit - 1, unit - 1);
}
function drawSnake() {
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, unit - 1, unit - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            snakeEatApple();
        }
        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                reset();
            }
        }
    });
}
function snakeEatApple() {
    point += 1;
    document.getElementById('point').value = point;
    snake.maxCells++;
    apple.x = getRandomInt(0, 25) * unit;
    apple.y = getRandomInt(0, 25) * unit;
}
function loop() {
    requestAnimationFrame(loop);
    // tốc độ rắn trong  game 4fps   //loop to 15 fps instead of 60 - 60/15 = 4
    // fps cao thì tốc độ game thấp và ngược lại
    if (point < 5) {
        if (++count < 10) {
            return;
        }
    } else if (point < 10) {
        if (++count < 8) {
            return;
        }
    } else if (point < 15) {
        if (++count < 6) {
            return;
        }

    } else if (point < 40) {
        if (++count < 4) {
            return;
        }
    } else {
        if (++count < 3) {
            return;
        }
    }
    count =0;
   clearCanvas();
   snakeDerection();
   snakeCollision();
   snackeWayToMove();
   drawApple();
   drawSnake();
}
//bắt sự kiện bàn phím ấn xuống theo mã ASCII
document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -unit;
        snake.dy = 0;
    }
//lên trên
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -unit;
        snake.dx = 0;
    }
//sang phải
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = unit;
        snake.dy = 0;
    }
//xuống dưới
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = unit;
        snake.dx = 0;
    }
});
requestAnimationFrame(loop);