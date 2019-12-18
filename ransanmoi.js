//Ở đây ta tạo ra bộ khung chứa game canvas

var canvas = document.getElementById('game');

var context = canvas.getContext('2d');

var point=parseInt(document.getElementById('point').value);

var move = 16;
// khởi tạo đối tượng rắn là 1 ô vuông

var snake = {

    x: 160, //vị trí của snake theo hướng x,y

    y: 160,

    dx: move, //hướng di chuyển theo phương x hoặc y,ở đây khi start game
    //snake sẽ di chuyển theo x direction với value = 16

    dy: 0,

    cells: [],

    maxCells: 3

};

var count = 0;

var apple = {

    x: 320,

    y: 320

};


function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}
//tạo hàm reset lai game , sẽ vẽ lại toàn bộ và reset lại điểm
function reset() {
    alert("Game over!!!");
    snake.x = 160;

    snake.y = 160;

    snake.cells = [];

    snake.maxCells = 3;

    snake.dx = move;

    snake.dy = 0;


    apple.x = getRandomInt(0, 25) * move;

    apple.y = getRandomInt(0, 25) * move;
    point=0;
    document.getElementById('point').value=0;

}


// game loop

function loop() {
//hàm này giống như setTimeout, sẽ gọi lại hàm loop khi loop thực thi xong

    requestAnimationFrame(loop);


    // tốc độ rắn trong  game 4fps   //loop to 15 fps instead of 60 - 60/15 = 4
if (point<5) {
    if (++count < 10) {

        return;

    }
}else if (point<10){
    if (++count<8){
        return;
    }
}else if (point<15){
    if (++count<6){
        return;
    }

}else if(point<40){
    if (++count<4){
        return;
    }
}else {
    if (++count<3){
        return;
    }
}

    count = 0;

    context.clearRect(0,0,canvas.width,canvas.height);


    snake.x += snake.dx; // mỗi loop rắn sẽ di chuyển thêm 1dx đơn vị

    snake.y += snake.dy;


    // khi snake đụng tường sẽ rese lai game

    if (snake.x < 0) {
        reset();
    }

    else if (snake.x >= canvas.width) {

       reset();
    }


    if (snake.y < 0) {


        reset();
    }

    else if (snake.y >= canvas.height) {

        reset();
    }


    // Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng

    snake.cells.unshift({x: snake.x, y: snake.y});


    // thêm 1 ô vuông phía trc thì phải remove 1 cái phía sau để snake move dc.

    if (snake.cells.length > snake.maxCells) {

        snake.cells.pop();

    }


    // draw apple

    context.fillStyle = 'red';

    context.fillRect(apple.x, apple.y, move-1, move-1);


    // draw snake

    context.fillStyle = 'green';


    snake.cells.forEach(function(cell, index) {

        context.fillRect(cell.x, cell.y, move-1, move-1);


        // snake chạm vào apple


        if (cell.x === apple.x && cell.y === apple.y) {

            point+=1;
            document.getElementById('point').value=point;

            snake.maxCells++;


            apple.x = getRandomInt(0, 25) * move;

            apple.y = getRandomInt(0, 25) * move;

        }


        // check va chạm khi rắn đụng đuôi

        for (var i = index + 1; i < snake.cells.length; i++) {



            // va chạm thì reset game

            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                reset();
            }

        }

    });

}

//bắt sự kiện bàn phím ấn xuống

document.addEventListener('keydown', function(e) {

    // lọc sự kiện keydown để rắn không di ngược lại
    //sang trái

    if (e.which === 37 && snake.dx === 0) {

        snake.dx = -move;

        snake.dy = 0;

    }
//lên trên
    else if (e.which === 38 && snake.dy === 0) {

        snake.dy = -move;

        snake.dx = 0;

    }
//sang phải
    else if (e.which === 39 && snake.dx === 0) {

        snake.dx = move;

        snake.dy = 0;

    }
//xuống dưới
    else if (e.which === 40 && snake.dy === 0) {

        snake.dy = move;

        snake.dx = 0;

    }

});


requestAnimationFrame(loop);