

var garo = 4;
var sero = 3;
var colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
// 4*3만드려고
// 함수도객체
// 객체를 참조가아닌 복사하는법
// var obj = { a: 1, b: 2, c: 3 };
// var obj2={};
// Object.keys(obj).forEach(function(key){
//     obj2[key]=obj[key];
// }); //이거 값이 1단계만있을때 (객체안에 객체가없을때)

//참조인지 아닌지 알아보는방법
// var obj={a:1,b:2,c:3};
// var obj2=obj;//이러면참조
// obj===obj2 //이렇게해서 true가나오면 참조관계이다

//깊은복사하는법
// var obj = { a: 1, b: { c: 1 } };
// var obj2={};
// obj2=JSON.parse(JSON.stringify(obj)); ->성능최악이라 1단계일경우 slice로 가거나 저위에 foreach로 가는것이좋다


var colorcandidate = JSON.parse(JSON.stringify(colors)); //배열 참조를 분리시켜준다.(복사)
//위방법말고 배열은 colorcandidate=color.slice(); 이것도 객체안에 객체가 없을때
var color = [];
var flag = true;
var clickcard = [];
var clikedcard = [];
var startime;
function shuffle() {
    while (colorcandidate.length > 0) {
        color = color.concat(colorcandidate.splice(Math.floor(Math.random() * colorcandidate.length), 1));
    }
}
// 피셔에이츠

function cardSetting(garo, sero) {
    flag = false;
    for (var i = 0; i < garo * sero; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function (c) {
            card.addEventListener('click', function () {
                if (flag && !clikedcard.includes(c)) {
                    c.classList.toggle('flipped');
                    clickcard.push(c);
                    if (clickcard.length === 2) {
                        if (clickcard[0].querySelector('.card-back').style.backgroundColor === clickcard[1].querySelector('.card-back').style.backgroundColor) {
                            clikedcard.push(clickcard[0]);
                            clikedcard.push(clickcard[1]);
                            clickcard = [];
                            if (clikedcard.length === garo * sero) {
                                var endtime = new Date();
                                alert('축하합니다! + 성공!' + (endtime - startime) / 1000 + '초 걸렸습니다.');
                                document.querySelector('#wrapper').innerHTML = '';
                                colorcandidate = JSON.parse(JSON.stringify(colors));
                                clikedcard = [];//완성카드도비워줘야함
                                // colorcandidate = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
                                startime = null;
                                color = [];
                                shuffle();
                                cardSetting(garo, sero);
                            }
                        }
                        else {
                            flag = false;
                            setTimeout(function () {
                                clickcard[0].classList.remove('flipped');
                                clickcard[1].classList.remove('flipped');
                                clickcard = [];
                                flag = true;
                            }, 1000);
                        }

                    }
                }
            });
        })(card);
        //클로저문제해결
        document.querySelector('#wrapper').appendChild(card);
    }
    //세팅이 완료되면 보여줘야하니까
    document.querySelectorAll('.card').forEach(function (card, i) {
        setTimeout(function () {
            card.classList.add('flipped');
        }, 1000 + 100 * i);

    });
    setTimeout(function () {
        document.querySelectorAll('.card').forEach(function (card, i) {
            card.classList.remove('flipped');
        });
        flag = true;
        startime = new Date();
    }, 5000);
}
shuffle();
cardSetting(garo, sero);




// var card=cardsetting('정혁',10,10);
// console.log(card); 팩토리패턴

//-----------------프로토타입

var prototype={
    type:'card',
    attack: function(){},
    defend: function(){},
} //이게 객체라서 (135라인이 참조처리가된다)
//그렇다면 prototype.type='toy' 이러면 한꺼번에 여러장의카드들이 다바뀌게됨
// Object.create(prototype);

function cardsetting(name,atk,hp){
    // var card={
    //     name:name,
    //     att:att,
    //     hp:hp,
    // }
    // card.__proto__=prototype;
    // return card;

    var card=Object.create(prototype);
    card.name=name;
    card.atk=atk;
    card.hp=hp;
    return card;
}


//1단계복사 추가 
// Object.assign(obj2,obj);





// var card={
//     name:'정혁',
//     att:10,
//     hp:10,
// }
// card.__proto__=prototype;
//__proto__ 생략가능


//prototype을 쓰는이유는 수정을 쉽게하기위해서 공유되는것을 모아두는것임

