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
// tạo con mồi, là hình vuông với tọa độ xuất hiện theo trục hướng  là x,y
var count = 0;

var apple = {

    x: 240,

    y: 240

};

// tạo gàm random để hiện thị con mồi với tọa độ random tùy chọn
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
//hàm này giống như setTimeout, sẽ liên tục gọi lại hàm loop mỗi khi loop thực thi xong

    requestAnimationFrame(loop);


    // tốc độ rắn trong  game 4fps   //loop to 15 fps instead of 60 - 60/15 = 4
    // fps cao thì tốc độ game thấp và ngược lại
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


    snake.x += snake.dx; // mỗi loop rắn sẽ di chuyển thêm 1dx đơn vị, mặc định khi chạy di chuyển sang phải

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


    // Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng khi di chuyển

    snake.cells.unshift({x: snake.x, y: snake.y});


    //tiến lên trước, thêm một phần tử vào mảng xóa 1 phần tử cuối mảng đi

    if (snake.cells.length > snake.maxCells) {

        snake.cells.pop();

    }


    // vẽ con mồi để rắn ăn  'apple'

    context.fillStyle = 'red';

    context.fillRect(apple.x, apple.y, move-1, move-1);


    //  mỗi lần cập nhật lại loop, duyệt từng phần tủ của mảng để vẽ lại toàn bộ rắn

    context.fillStyle = 'green';


    snake.cells.forEach(function(cell, index) {

        context.fillRect(cell.x, cell.y, move-1, move-1);


        //  hành động khi snake chạm vào con mồi apple
        //khi vị trí đầu rắn theo hướng x,y trùng với vị trí của mồi là apple điểm tăng lên một và thay đổi tại ô điểm
        // mảng snacke  cộng thêm 1 phần tử
        // và vẽ lại vị trí của con mồi theo random tùy chọn
        if (cell.x === apple.x && cell.y === apple.y) {

            point+=1;
            document.getElementById('point').value=point;

            snake.maxCells++;


            apple.x = getRandomInt(0, 25) * move;

            apple.y = getRandomInt(0, 25) * move;

        }


        // check va chạm khi rắn đụng đuôi,duyệt toàn bộ phần tử  trong mảng

        for (var i = index + 1; i < snake.cells.length; i++) {
            //nếu tại vị trí đầu rắn là cell.x và cell.y trùng với bất kì vị trí nào của từng phần tử trong mảng snack.cells
            //thì tiến hành reset lại game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                reset();
            }

        }

    });

}

//bắt sự kiện bàn phím ấn xuống theo mã ASCII

document.addEventListener('keydown', function(e) {

    // lọc sự kiện keydown
    //sang trái khi phím sang trái được nhấn và snacke.dx=0 thì tại đầu rắn di chuyển sang trái với giá trị là
    // move=16 trục y giữ nguyên không thay đổi. Cũng như vậy khi nhấn phím lên trên hoặc xuống dưới thì chỉ thay
    // giá trị theo hướng y hướng x không thay đổi


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