var tbody = document.querySelector('#table tbody');
var dataset = [];
var hor;
var ver;
var mine;
var flag = false;
var count = 0;
var code = {
    opencell: -1,
    questionmark: -2,
    flagmark: -3,
    flagmine: -4,
    questionmine: -5,
    mine: 1,
    normal: 0,
};
document.querySelector('#exec').addEventListener('click', function () {
    tbody.innerHTML = '';//tbody의 내부태그들을 초기화
    dataset = []; //dataset도초기화해야지 게임다시시작했을때 이전데이터로 하지않는다.
    document.querySelector('#result1').textContent = ' ';
    flag = false;
    count = 0;
    hor = parseInt(document.querySelector('#hor').value);
    ver = parseInt(document.querySelector('#ver').value);
    mine = parseInt(document.querySelector('#mine').value);
    // console.log(hor, ver, mine);


    //100칸중에 mine 개수만큼 지뢰랜덤으로
    var candidate = Array(hor * ver)
        .fill() //hor*ver 칸들을 다 undefined로 채움
        .map(function (value, index) {
            return index;
        });//이건 쓸만한코드임
    var shuffle = [];
    while (candidate.length > (hor * ver) - mine) {
        var pushvalue = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(pushvalue);
    }

    // console.log(shuffle);
    // console.log(candidate);

    //지뢰테이블만들기


    for (var i = 0; i < ver; i++) {
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for (var j = 0; j < hor; j++) {
            arr.push(code.normal);
            var td = document.createElement('td');
            td.addEventListener('contextmenu', function (e) {//오른쪽클릭 -> contextmenu
                if (flag) {
                    return;
                }
                e.preventDefault();
                // console.log('오른쪽 출력');
                // e.currentTarget //이걸쓰는게 안헷갈린다. current.etarget은 이벤트리스너가 달린애임
                var parent_tr = e.currentTarget.parentNode;
                var parent_tbody = e.currentTarget.parentNode.parentNode;
                var cell = Array.prototype.indexOf.call(parent_tr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parent_tbody.children, parent_tr); //indexof를 쓰고싶은데 유사배열인경우 쓸수가없음 그래서 prototype
                // console.log(parent_tr, parent_tbody, e.currentTarget, line, cell);


                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');
                    if (dataset[line][cell] === code.mine) {
                        dataset[line][cell] = code.flagmine;
                    } else {
                        dataset[line][cell] = code.flagmark;
                    }
                }
                else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if (dataset[line][cell] === code.flagmine) {
                        dataset[line][cell] = code.questionmine;
                    } else {
                        dataset[line][cell] = code.questionmark;
                    }
                }
                else if (e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if (dataset[line][cell] === code.questionmine) {
                        e.currentTarget.textContent = 'X';
                        dataset[line][cell] = code.mine;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[line][cell] = code.normal;
                    }
                    // e.currentTarget.textContent = '';
                    // if (dataset[line][cell] === '1') {
                    //     e.currentTarget.textContent = '';
                    // }
                    // else if (dataset[line][cell] === 'X') {
                    //     e.currentTarget.textContent = 'X';
                    // }
                }
            }); //여기다 추가해줘야 비동기가 바로붙음 이 비동기 함수 바깥영역에서작성하면 td는 없어지니깐
            td.addEventListener('click', function (e) {
                if (flag === true) {
                    return;
                }
                //클릭했을때 주변지뢰갯수
                var parent_tr = e.currentTarget.parentNode;
                var parent_tbody = e.currentTarget.parentNode.parentNode;
                var cell = Array.prototype.indexOf.call(parent_tr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);
                if ([code.opencell, code.flagmark, code.flagmine, code.questionmark, code.questionmine].includes(dataset[line][cell])) {
                    return;
                }
                e.currentTarget.classList.add('opened'); //classlist 로 클래스에접근 add나 remove로 제거
                count++;
                if (dataset[line][cell] === code.mine) {
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result1').textContent = '실패';
                    flag = true;
                }
                else {

                    var near = [
                        dataset[line][cell - 1], , dataset[line][cell + 1]
                    ];
                    if (dataset[line - 1]) {
                        near = near.concat([dataset[line - 1][cell - 1], dataset[line - 1][cell], dataset[line - 1][cell + 1]]);
                    }
                    if (dataset[line + 1]) {
                        near = near.concat([dataset[line + 1][cell - 1], dataset[line + 1][cell], dataset[line + 1][cell + 1]]);
                    }
                    var minenumber = near.filter(function (v) {
                        return [code.mine, code.flagmine, code.questionmine].includes(v);
                    }).length;
                    e.currentTarget.textContent = minenumber || '';
                    dataset[line][cell] = code.opencell; //주변지뢰개수가 0이아닐때도 1로처리해줘야함
                    if (minenumber === 0) {
                        //주변8칸동시오픈(재귀함수)
                        console.log('open near');
                        var nearcell = [];
                        if (tbody.children[line - 1]) {
                            nearcell = nearcell.concat(
                                [
                                    tbody.children[line - 1].children[cell - 1],
                                    tbody.children[line - 1].children[cell],
                                    tbody.children[line - 1].children[cell + 1],
                                ]
                            );
                        }
                        nearcell = nearcell.concat([
                            tbody.children[line].children[cell - 1],
                            tbody.children[line].children[cell + 1],
                        ]);
                        if (tbody.children[line + 1]) {
                            nearcell = nearcell.concat([
                                tbody.children[line + 1].children[cell + 1],
                                tbody.children[line + 1].children[cell],
                                tbody.children[line + 1].children[cell + 1],
                            ]);
                        }

                        nearcell.filter(function (v) {
                            return !!v;
                        }).forEach(function (beside) {
                            var parent_tr = beside.parentNode;
                            var parent_tbody = beside.parentNode.parentNode;
                            var besidecell = Array.prototype.indexOf.call(parent_tr.children, beside);
                            var besideline = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);
                            if (dataset[besideline][besidecell] !== code.opencell) {
                                beside.click();
                            }
                        });
                    }
                    // count++;
                }
                if (count === (hor * ver) - mine) {
                    document.querySelector('#result1').textContent = '성공!';
                    flag = true;
                }
            });
            tr.appendChild(td);

        }
        tbody.appendChild(tr);
    }
    // console.log(dataset);


    //지뢰심기
    for (var k = 0; k < shuffle.length; k++) {
        var row = Math.floor(shuffle[k] / ver);
        var col = (shuffle[k] % ver);
        // console.log(row, col);
        tbody.children[row].children[col].textContent = 'X'; //children으로 자식태그에 접근할수 있음
        dataset[row][col] = code.mine;
    }
});

