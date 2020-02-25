var tetris = document.querySelector('#tetris');
var blockArr = [
    ['red', true, [
        [1, 1],
        [1, 1],
    ]],
    ['blue', true, [
        [0, 2, 0],
        [2, 2, 2],
    ]],
    ['orange', true, [
        [3, 3, 0],
        [0, 3, 3],
    ]],
    ['skyblue', true, [
        [0, 4, 4],
        [4, 4, 0],
    ]],
    ['yellowgreen', true, [
        [5, 5, 5],
        [5, 0, 0],
    ]],
    ['pink', true, [
        [6, 6, 6],
        [0, 0, 6],
    ]],
    ['yellow', true, [
        [7, 7, 7, 7],
    ]],
];
var blockDict = {
    0:['white',false,[]],
    1: ['red', true, [
        [1, 1],
        [1, 1],
    ]],//색깔 움직일수있는지 실제모형
    2: ['blue', true, [
        [0, 1, 0],
        [1, 1, 1],
    ]],
    3: ['orange', true, [
        [1, 1, 0],
        [0, 1, 1],
    ]],
    4: ['skyblue', true, [
        [0, 1, 1],
        [1, 1, 0],
    ]],
    5: ['yellowgreen', true, [
        [1, 1, 1],
        [1, 0, 0],
    ]],
    6: ['pink', true, [
        [1, 1, 1],
        [0, 0, 1],
    ]],
    7: ['yellow', true, [
        [1, 1, 1, 1],
    ]],
    10: ['red', false, []],
    20: ['blue', false, []],
    30: ['orange', false, []],
    40: ['skyblue', false, []],
    50: ['yellowgreen', false, []],
    60: ['pink', false, []],
    70: ['yellow', false, []],
};
var tetrisData = [];
var stopDown=false;

function Cell_Create() {
    var fragment = document.createDocumentFragment(); //메모리
    for (var i = 0; i < 20; i++) {
        var tr = document.createElement('tr');
        var arr = [];
        tetrisData.push(arr); //참조관계가 들어간것임 arr은 배열(객체니깐) 그러므로 arr바꾸면 tetris 안에도바뀜
        fragment.appendChild(tr);
        for (var j = 0; j < 10; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);
            arr.push(0);
        }

    }
    tetris.appendChild(fragment); //화면 , 메모리에서 조작하는건 빠른데 화면에서 조작하는것은 느려서 메모리먼저
}
function Drawing_Screen(){
    tetrisData.forEach(function(tr,i){
        tr.forEach(function(td,j){
            tetris.children[i].children[j].className=blockDict[td][0];
        })
    })
}
function Block_Create_Machine(){
    stopDown=false;
    var block=blockArr[Math.floor(Math.random()*7)][2];
    console.log(block);
    block.forEach(function(tr,i){
        tr.forEach(function(td,j){
            //TODO:블록생성할때 이미다 차있으면 게임오버
            tetrisData[i][j+3]=td; //중앙에서생겨나도록 +3
        })
    })
    Drawing_Screen();
}

function Block_Down(){
    for(var i=tetrisData.length-1 ; i>=0; i--){
        tetrisData[i].forEach(function(td,j){
            if(td>0 && td<10){//움직이는블록들
                if(tetrisData[i+1] && !stopDown){
                    tetrisData[i+1][j]=td;
                    tetrisData[i][j]=0;
                }else{//땅끝
                    stopDown=true;
                    tetrisData[i][j]=td*10;
                    
                }
                
            }
        })
    }
    if(stopDown){
        Block_Create_Machine();
    }
    Drawing_Screen();
}

window.addEventListener('keydown', function (e) {//keydown은 누르고있으면 계속실행되서 별로안쓴다고함 강의자가,keypress는 방향키가 인식이안됨
    this.console.log(e);
    if (e.code === "ArrowRight") { //오른쪽 이동

    } else if (e.code === "ArrowLeft") { //왼쪽 이동

    } else if (e.code === "ArrowDown") {//방향전환

    }
});
window.addEventListener('keyup', function (e) {
    if (e.code === "Space") {

    } else if (e.code === "ArrowUp") {

    }
})
Cell_Create();
Block_Create_Machine();
setInterval(Block_Down,100);