
var imagecoordi = '0';
var dictionary = {
    Rock: '0',
    Scissor: '-142px',
    Paper: '-284px',
};
var scoreboard={
    Scissor:1,
    Rock:0,
    Paper:-1,
};
function computerchoice(imagecoordi) {
    return Object.entries(dictionary).find(function (v) {
        return v[1] === imagecoordi;
    })[0];
};
var Interval;
function IntervalMaker() {
    Interval=setInterval(function () {
        if (imagecoordi === dictionary.Rock) {
            imagecoordi = dictionary.Scissor;
        } else if (imagecoordi === dictionary.Scissor) {
            imagecoordi = dictionary.Paper;
        } else {
            imagecoordi = dictionary.Rock;
        }
        document.querySelector('#computer').style.background =
            'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imagecoordi + ' 0';
    }, 100);
}
//변수로 만들어줘야지 clearinterval로 멈출수가있다.

IntervalMaker();
// function whowin(my,com){

// }
document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        clearInterval(Interval);
        setTimeout(function () {
            IntervalMaker();
        }, 1000);
        var mychoice = this.textContent;
        // console.log(mychoice, computerchoice(imagecoordi));
        var myscore=scoreboard[mychoice];
        var computerscore=scoreboard[computerchoice(imagecoordi)];
        if(myscore-computerscore===0){
            console.log("비겼습니다.");
        }
        else if([-1,2].includes(myscore-computerscore)){
            console.log("이겼습니다.");
        }
        else{
            console.log("졌습니다.");
        }
        

    });
});

//가위 1 바위 0 보 -1 숫자들의차이라거나

//나\컴퓨터     가위  바위    보
//       가위   1 1   1 0   1 -1
//       바위   0 1   0 0   0 -1
//        보   -1 1  -1 0   -1 -1
// 두개의 차가 0이면 비긴거
// 두개의차의 -1 2 이긴거
// 두개의차의 1, -2 진거