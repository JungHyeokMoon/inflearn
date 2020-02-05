var body = document.body;
var candidate;
var numarr;

function PickNumber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    numarr = [];

    for (var i = 0; i < 4; i++) {
        var picked = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        numarr.push(picked);
    }
}
PickNumber();
console.log(numarr);
//배열 메서드 push : 마지막추가 , pop : 마지막빼기 , unshift : 처음에추가 , shift : 처음 것 뽑기
//splice (위치 , 개수 )위치부터 개수만큼뽑음
var count = document.createElement('h1');
count.textContent = '카운트';
body.append(count);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
input.type = 'number';
input.maxLength = 4;
form.append(input);
var button = document.createElement('button');
button.textContent = '입력!';
form.append(button);
var letmeknow = document.createElement('div');
form.append(letmeknow);

var fault = 0;
form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var answer = input.value;
    console.log(answer);
    if (answer === numarr.join('')) {
        count.textContent = '홈런';
        input.value = '';
        input.focus();
        PickNumber();
        fault = 0;
    }
    else {
        fault++;

        letmeknow.textContent = String(4 - fault) + 'You have chance';

        if (fault >= 4) {
            count.textContent = 'You Failed 4 chance,Game Over' + 'Original Answer' + numarr.join(',');
            input.focus();
            input.value = '';

            PickNumber();
            console.log(numarr);
            fault = 0;
        } else {
            var temp = answer.split('');
            var strike = 0;
            var ball = 0;
            console.log(temp);
            for (var i = 0; i < 4; i++) {
                if (Number(temp[i]) === numarr[i]) {
                    strike++;
                    //console.log('strike수 ', strike);
                }
                else if (numarr.indexOf(Number(temp[i])) > -1) {
                    ball++;
                    //console.log('ball 수', ball);
                }
            }
            count.textContent = 'Strike : ' + String(strike) + ' Ball :' + String(ball);
            input.focus();
            input.value = '';
        }
    }
})
//indexof(값) 값의위치 알수있다 없으면 -1