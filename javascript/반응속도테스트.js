

var screen = document.querySelector('#screen');
var output=document.querySelector('#output');
var starttime;
var endtime;
var record = [];
var timeout;
var count=0;
var sum=0;
// console.time('시간');
// var starttime=performance.now();

screen.addEventListener('click', function () {

    // console.log((endtime-starttime)/1000);
    // console.timeEnd('시간');
    // var endtime=performance.now();

    if (screen.classList.contains('waiting')) { //현재 클래스상태를 파악이가능하다
        console.log('click!');
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색이 되면 클릭하세요.';
        timeout = setTimeout(function () {
            starttime = new Date();
            screen.click();
        }, Math.floor(Math.random() * 1000) + 2000); //2000~3000사이수
    }
    else if (screen.classList.contains('ready')) {
        if (!starttime) {//부정클릭
            clearTimeout(timeout); //settimeout취소
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.textContent = '부정출발.';
        } else {
            screen.classList.remove('ready');
            screen.classList.add('now');
            screen.textContent = '클릭하세요!.';
        }

    }
    else if (screen.classList.contains('now')) {
        endtime = new Date();
        record.push((endtime - starttime) / 1000);
        console.log('반응속도', (endtime - starttime) / 1000, 'ms');
        if(record.length===5){
            for(var i=0; i<record.length; i++){
                sum+=record[i];
            }
            sum=sum/5;
            output.textContent='다섯번의 평균'+String(sum);
            sum=0;
            count=0;
            record=[];
        }
        else{
            count++;
            output.textContent=String(count)+'/5';
        }
        starttime = null;//하나의게임끝나면초기화
        endtime = null;
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요.';
    }

});
//비동기함수는 호출스택들어갔다가 끝나면 바로나감