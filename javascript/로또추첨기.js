// var candidate=Array(45);
// var fill=candidate.fill();
// console.log(fill);

//  fill.forEach(function(value,index){
//     fill[index]=index+1;

// });
// console.log(fill);

// var map=fill.map(function(value,index){
//     return index+1;
// })

var candidate = Array(45).fill().map(function (value, index) {
    return index + 1;
})
console.log(candidate);
var shuffle = [];
while (candidate.length > 0) {
    var pushvalue = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(pushvalue);
}
console.log(shuffle);
var bonusnumber = shuffle[shuffle.length - 1];
var ret = shuffle.splice(0, 6).sort(function (p, c) { return p - c; }); //[0,6)
console.log('당첨숫자들 ', ret, '보너스', bonusnumber);
// console.log(shuffle); 이렇게하면 ret이 0~5번인덱스 떼어가서 shuffle의 length 는 39가 된다.



var answerwindow = document.querySelector('#answer');
var bonuswindow = document.querySelector('.bonus'); //index활용해줘야함 , id같은경우에는 하나밖에존재하지않지만 클래스는 여러개 존재할수 있기 때문에 


function ballcolor(number,window){
    
    var ball = document.createElement('div');
    ball.textContent = number
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '10px';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign='center';
    ball.style.marginRight='10px';
    ball.id='ballid'+number;
    ball.style.fontSize='12px';
    //ball.className='ballid'+number; 클래스를지정할경우 class는 js에서 중요한역할이기때문에 함부로 못쓴다

    var color;
    if(number<=10){
        color='red';
    }else if(number<=20){
        color='orange';
    }else if(number<=30){
        color='yellow';
    }
    else if(number<=40){
        color='blue'
    }else{
        color='green';
    }
    ball.style.backgroundColor=color;
    window.appendChild(ball);
}
setTimeout(function () {
    ballcolor(ret[0],answerwindow);
}, 1000);//밀리초
setTimeout(function () {
   ballcolor(ret[1],answerwindow);
}, 2000);//밀리초
setTimeout(function () {
    ballcolor(ret[2],answerwindow);
}, 3000);//밀리초
setTimeout(function () {
    ballcolor(ret[3],answerwindow);
}, 4000);//밀리초
setTimeout(function () {
    ballcolor(ret[4],answerwindow);
}, 5000);//밀리초
setTimeout(function () {
    ballcolor(ret[5],answerwindow);
}, 6000);//밀리초
setTimeout(function () {
    ballcolor(bonusnumber,bonuswindow);
}, 7000);