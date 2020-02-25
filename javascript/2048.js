var table = document.querySelector('#table');
var data = [];
var scoreboard = document.querySelector('#score');
function Init() {
    var fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function () {
        var coldata = [];
        data.push(coldata);
        var tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function () {
            coldata.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}
function RandomCreate() {
    var emptyarr = [];
    data.forEach(function (coldata, i) {
        coldata.forEach(function (rowdata, j) {
            if (!rowdata) {
                emptyarr.push([i, j]);
            }
        });
    });
    if (emptyarr.length === 0) {
        alert('게임오버: ' + scoreboard.textContent);
        table.innerHTML = '';
        Init();
    } else {
        // console.log(emptyarr);
        var randomcell = emptyarr[Math.floor(Math.random() * emptyarr.length)]; //랜덤으로 한칸고른다
        data[randomcell[0]][randomcell[1]] = 2;
        Drawing();
    }
}
function Drawing() {
    data.forEach(function (coldata, i) {
        coldata.forEach(function (rowdata, j) {
            if (rowdata > 0) {
                table.children[i].children[j].textContent = rowdata;
            }
            else {
                table.children[i].children[j].textContent = '';
            }
        });
    });
}
Init();
RandomCreate();
Drawing();

var dragstart = false;
var draging = false;
var startcoordi;
var endcoordi;
window.addEventListener('mousedown', function (evt) { //마우스누를때

    dragstart = true;
    startcoordi = [evt.clientX, evt.clientY];
});
window.addEventListener('mousemove', function (evt) { //움직일때
    if (dragstart) {
        draging = true;
    }
});
window.addEventListener('mouseup', function (evt) { //땔떼

    endcoordi = [evt.clientX, evt.clientY];
    if (draging) {
        var direction;
        var diff_x = endcoordi[0] - startcoordi[0];
        var diff_y = endcoordi[1] - startcoordi[1];
        if (diff_x < 0 && Math.abs(diff_x) / Math.abs(diff_y) > 1) {
            direction = 'left';
        } else if (diff_x > 0 && Math.abs(diff_x) / Math.abs(diff_y) > 1) {
            direction = 'right';
        }
        else if (diff_y > 0 && Math.abs(diff_x) / Math.abs(diff_y) < 1) {
            direction = 'down';
        }
        else if (diff_y < 0 && Math.abs(diff_x) / Math.abs(diff_y) < 1) {
            direction = 'up';
        }
        console.log(diff_x, diff_y, direction);
    }
    dragstart = false;
    draging = false;
    switch (direction) {
        case 'left':
            var newdata = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function (coldata, i) {
                coldata.forEach(function (rowdata, j) {
                    if (rowdata) {
                        if (newdata[i][newdata[i].length - 1] && newdata[i][newdata[i].length - 1] === rowdata) { //행데이터가 내가움직이고있는 데이터인데 그게 앞에있는거랑 똑같으면
                            newdata[i][newdata[i].length - 1] *= 2;
                            var h_score = parseInt(scoreboard.textContent, 10);
                            scoreboard.textContent = h_score + newdata[i][newdata[i].length - 1];
                        } else {
                            newdata[i].push(rowdata);
                        }
                    }
                });
            });
            [1, 2, 3, 4].forEach(function (coldata, i) {
                [1, 2, 3, 4].forEach(function (rowdata, j) {
                    data[i][j] = newdata[i][j] || 0;
                })
            });
            break;
        case 'right':
            var newdata = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function (coldata, i) {
                coldata.forEach(function (rowdata, j) {
                    if (rowdata) {
                        if (newdata[i][0] && newdata[i][0] === rowdata) {
                            newdata[i][0] *= 2;
                            var h_score = parseInt(scoreboard.textContent, 10);
                            scoreboard.textContent = h_score + newdata[i][0];
                        }
                        else {
                            newdata[i].unshift(rowdata);
                        }

                    }
                });
            });
            [1, 2, 3, 4].forEach(function (coldata, i) {
                [1, 2, 3, 4].forEach(function (rowdata, j) {
                    data[i][3 - j] = newdata[i][j] || 0;
                })
            });
            break;
        case 'up':
            var newdata = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function (coldata, i) {
                coldata.forEach(function (rowdata, j) {
                    if (rowdata) {

                        if (newdata[j][newdata[j].length - 1] && newdata[j][newdata[j].length - 1] === rowdata) {
                            newdata[j][newdata[j].length - 1] *= 2;
                            var h_score = parseInt(scoreboard.textContent, 10);
                            scoreboard.textContent = h_score + newdata[j][newdata[j].length - 1];
                        }
                        else {
                            newdata[j].push(rowdata);
                        }

                    }
                });
            });
            console.log(newdata);
            [1, 2, 3, 4].forEach(function (rowdata, i) {
                [1, 2, 3, 4].forEach(function (coldata, j) {
                    data[j][i] = newdata[i][j] || 0;
                })
            });
            break;
        case 'down':
            var newdata = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function (coldata, i) {
                coldata.forEach(function (rowdata, j) {
                    if (rowdata) {
                        if (newdata[j][0] && newdata[j][0] === rowdata) {
                            newdata[j][0] *= 2;
                            var h_score = parseInt(scoreboard.textContent, 10);
                            scoreboard.textContent = h_score + newdata[j][0];
                        }
                        else {
                            newdata[j].unshift(rowdata);
                        }
                    }
                });
            });
            console.log(newdata);
            [1, 2, 3, 4].forEach(function (rowdata, i) {
                [1, 2, 3, 4].forEach(function (coldata, j) {
                    data[3 - j][i] = newdata[i][j] || 0;
                })
            });
            break;

    }
    Drawing();
    RandomCreate();
});
//screenX : 모니터기준좌표 , pageX:페이지(스크롤 포함), clientX: 브라우저 화면 기준 , offsetX:이벤트 타겟 기준


