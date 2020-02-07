var body = document.body;

var table = document.createElement('table');
var cols = [];
var rows = [];
var turn = 'X';
var result=document.createElement('div');
body.append(result);
var async_callback = function (evt) {
    

    var numberofline = rows.indexOf(evt.target.parentNode);
    console.log('몇번째줄', numberofline);
    var numberofcol = cols[numberofline].indexOf(evt.target);
    console.log('몇번째칸', numberofcol);

    if (cols[numberofline][numberofcol].textContent !== "") {
        console.log('not emtpy'); //빈게아니면
    } else {//비었으면
        console.log('empty');
        cols[numberofline][numberofcol].textContent = turn;
        var flag = false;
        //가로검사

        if (cols[numberofline][0].textContent === turn &&
            cols[numberofline][1].textContent === turn &&
            cols[numberofline][2].textContent === turn) {
            flag = ture;
        }
        //세로검사
        if (cols[0][numberofcol].textContent === turn &&
            cols[1][numberofcol].textContent === turn &&
            cols[2][numberofcol].textContent === turn) {
            flag = true;
        }
        ///대각선검사
        if (numberofcol - numberofline === 0 ) {
            if (cols[0][0].textContent === turn &&
                cols[1][1].textContent === turn &&
                cols[2][2].textContent === turn) {
                flag = true;
            }

        }
        if(Math.abs(numberofcol-numberofline)===2){
            if(cols[0][2].textContent===turn&&
                cols[1][1].textContent===turn&&
                cols[2][0].textContent===turn){
                    flag=true;
                }
        }

        if (flag) {
            result.textContent=turn + '승리!';
            
            turn='X';
            cols.forEach(function(row){
              row.forEach(function(col){
                  col.textContent='';
              })  
            })
            flag=false;
        } else {
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