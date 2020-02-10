var candidate;
var shuffle;
var bonusnumber;
var ret;
var color;
var inputArr;
var input_count;
var answer_count;
var delete_value;
var field;
function initialize() {

    candidate = Array(45).fill().map(function (value, index) {
        return index + 1;
    })
    console.log(candidate);
    shuffle = [];
    while (candidate.length > 0) {
        var pushvalue = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(pushvalue);
    }
    console.log(shuffle);
    bonusnumber = shuffle[shuffle.length - 1];
    ret = shuffle.splice(0, 6).sort(function (p, c) { return p - c; }); //[0,6)
    console.log('당첨숫자들 ', ret, '보너스', bonusnumber);
    // console.log(shuffle); 이렇게하면 ret이 0~5번인덱스 떼어가서 shuffle의 length 는 39가 된다.

}


initialize();

var answerwindow = document.querySelector('#answer');
var bonuswindow = document.querySelector('.bonus'); //index활용해줘야함 , id같은경우에는 하나밖에존재하지않지만 클래스는 여러개 존재할수 있기 때문에 


function ballcolor(number, window) {

    var ball = document.createElement('div');
    ball.textContent = number
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '10px';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '10px';
    ball.id = 'ballid' + number;
    ball.style.fontSize = '12px';
    //ball.className='ballid'+number; 클래스를지정할경우 class는 js에서 중요한역할이기때문에 함부로 못쓴다

    color;
    if (number <= 10) {
        color = 'red';
    } else if (number <= 20) {
        color = 'orange';
    } else if (number <= 30) {
        color = 'yellow';
    }
    else if (number <= 40) {
        color = 'blue'
    } else {
        color = 'green';
    }
    ball.style.backgroundColor = color;
    window.appendChild(ball);
}

function lotto() {
    setTimeout(function () {
        ballcolor(ret[0], answerwindow);
    }, 1000);//밀리초
    setTimeout(function () {
        ballcolor(ret[1], answerwindow);
    }, 2000);//밀리초
    setTimeout(function () {
        ballcolor(ret[2], answerwindow);
    }, 3000);//밀리초
    setTimeout(function () {
        ballcolor(ret[3], answerwindow);
    }, 4000);//밀리초
    setTimeout(function () {
        ballcolor(ret[4], answerwindow);
    }, 5000);//밀리초
    setTimeout(function () {
        ballcolor(ret[5], answerwindow);
    }, 6000);//밀리초
    setTimeout(function () {
        ballcolor(bonusnumber, bonuswindow);
    }, 7000);
}
lotto();

function delete_ball(inputArr){
    while(inputArr.length>0){
        deletevalue='ballid'+inputArr.pop();
        console.log(delete_value);
        field=document.getElementById(deletevalue);
        document.querySelector('#answer').removeChild(field);
    }
    delete_value='ballid'+String(bonusnumber);
    field=document.getElementById(delete_value);
    document.querySelector('.bonus').removeChild(field);
}

var inputform = document.querySelector('.inputform');
var count = document.querySelector('.remainder');
var input = document.querySelector('.input');
inputform.type = 'number';
function inputinit() {
    inputArr = [];
    input_count = 6;
    count.textContent = '6개 남았습니다.';
    answer_count = 0;
}
    inputinit();
var output = document.querySelector('.output');

inputform.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var inputvalue = input.value;
    console.log(inputvalue);
    inputArr.push(Number(inputvalue));
    console.log(inputArr);

    input.focus();
    input.value = '';
    input_count--;
    count.textContent = String(input_count) + '개남았습니다.'

    if (input_count === 0) {
        inputArr.forEach(function (element) {
            if (ret.indexOf(element) !== -1) {
                answer_count++;
            }
        })

        if (answer_count === 6) {
            output.textContent = '1등입니다.';
        }
        else if (answer_count === 5) {
            if (inputArr.indexOf(bonusnumber) !== -1) {
                output.textContent = '2등입니다.'
            }//보너스숫자맞힌경우2등
            else {
                output.textContent = '3등입니다.'
            }//아닌경우3등
        }
        else if (answer_count === 4) {
            output.textContent = '4등입니다.';
        }
        else if (answer_count === 3) {
            output.textContent = '5등입니다.';
        }
        else {
            output.textContent = '꽝입니다.';
        }
        delete_ball(ret);
        initialize();
        lotto();
        inputinit();
        
        console.log('맞힌 개수 : ', answer_count);
    }
});

