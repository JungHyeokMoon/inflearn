

var body = document.body;

var table = document.createElement('table');
var cols = [];
var rows = [];
var turn = 'X';
var result = document.createElement('div');


function checkforwin(numberofline, numberofcol) {
    var flag = false;
    //가로검사

    if (cols[numberofline][0].textContent === turn &&
        cols[numberofline][1].textContent === turn &&
        cols[numberofline][2].textContent === turn) {
        flag = true;
    }
    //세로검사
    if (cols[0][numberofcol].textContent === turn &&
        cols[1][numberofcol].textContent === turn &&
        cols[2][numberofcol].textContent === turn) {
        flag = true;
    }
    ///대각선검사

    if (cols[0][0].textContent === turn &&
        cols[1][1].textContent === turn &&
        cols[2][2].textContent === turn) {
        flag = true;
    }



    if (cols[0][2].textContent === turn &&
        cols[1][1].textContent === turn &&
        cols[2][0].textContent === turn) {
        flag = true;
    }

    return flag;
}
function init(draw) {
    if (draw) {
        result.textContent = '무승부';
    }
    else {
        result.textContent = turn + '승리!';
    }
    setTimeout(function () {
        result.textContent = ' ';
        cols.forEach(function (row) {
            row.forEach(function (col) {
                col.textContent = '';
            });
        });
        turn = 'X';
    }, 1000);
}
body.append(result);
var async_callback = function (evt) {
    if (turn === 'O') {
        // console.log('기달려');
        return; //셋타임아웃으로 정해놓은 시간전에 눌러버릴경우 
    }

    var numberofline = rows.indexOf(evt.target.parentNode);
    // console.log('몇번째줄', numberofline);
    var numberofcol = cols[numberofline].indexOf(evt.target);
    // console.log('몇번째칸', numberofcol); //이거 어디일지알아낼때 중요

    if (cols[numberofline][numberofcol].textContent !== "") {
        console.log('not emtpy'); //빈게아니면
    } else {//비었으면
        console.log('empty');
        cols[numberofline][numberofcol].textContent = turn;

        // flag = false;

        var flag = checkforwin(numberofline, numberofcol);

        //모든칸 다 찼는지 검사
        var candidate = [];
        cols.forEach(function (row) {
            row.forEach(function (col) {
                candidate.push(col);
            });
        });
        candidate = candidate.filter(function (col) { return !col.textContent; }) //'',0,Nan,undefined,null,false //filter메서드는 true인애들만 걸러냄
        if (flag) {
            init(false);
        } else if (candidate.length === 0) {
            init(true);
        }
        else {
            setTimeout(function () {
                console.log('컴퓨터턴');
                //빈칸하나선택하고 



                var computerchoice = candidate[Math.floor(Math.random() * candidate.length)];
                computerchoice.textContent = turn;
                //컴퓨터승리
                var numberofline = rows.indexOf(computerchoice.parentNode);
                var numberofcol = cols[numberofline].indexOf(computerchoice);
                var flag = checkforwin(numberofline, numberofcol);
                if (flag) {
                    init(false);
                }
                //턴을나한테넘김
                else {
                    turn = 'X';
                }
            }, 1000);//컴퓨터의턴
            if (turn === 'O') {
                turn = 'X';
            } else {
                turn = 'O';
            }
        }
    }


}



for (var i = 0; i < 3; i++) {
    var row = document.createElement('tr');
    rows.push(row);
    cols.push([]);
    for (var j = 0; j < 3; j++) {
        var col = document.createElement('td');
        col.addEventListener('click', async_callback);
        cols[i].push(col);
        row.appendChild(col);
    }
    table.appendChild(row);
}
body.appendChild(table);
console.log(cols, rows);