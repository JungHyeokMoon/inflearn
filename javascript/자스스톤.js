var rival = {
    hero: document.querySelector('#rival-hero'),
    deck: document.querySelector('#rival-deck'),
    field: document.querySelector('#rival-cards'),
    cost: document.querySelector('#rival-cost'),
    deck_data: [],
    hero_data: [],
    field_data: [],
    cardchoice: null,
    cardchoice_data: null,
};
var my = {
    hero: document.querySelector('#my-hero'),
    deck: document.querySelector('#my-deck'),
    field: document.querySelector('#my-cards'),
    cost: document.querySelector('#my-cost'),
    deck_data: [],
    field_data: [],
    hero_data: [],
    cardchoice: null,
    cardchoice_data: null,
};

var turn = true; //true=> myturn, false, 상대방턴
var turn_btn = document.querySelector('#turn-btn');

function From_Deck_To_Field(data, myturn) {
    var object = myturn ? my : rival;
    var presentcost = Number(object.cost.textContent);
    if (presentcost < data.cost) {
        return 'end';
    }
    var idx = object.deck_data.indexOf(data);
    object.deck_data.splice(idx, 1);
    object.field_data.push(data);

    Redrawing_Field(object);
    Redrawing_Deck(object);
    data.field = true;
    object.cost.textContent = presentcost - data.cost;
}
function Redrawing_Screen(myscreen) {
    var object = myscreen ? my : rival;
    Redrawing_Field(object);
    Redrawing_Deck(object);
    Redrawing_Hero(object);

}
function Redrawing_Field(object) {
    object.field.innerHTML = '';
    object.field_data.forEach(function (data) {
        Card_Dom_Connection(data, object.field);
    });
}
function Redrawing_Deck(object) {
    object.deck.innerHTML = '';
    object.deck_data.forEach(function (data) {
        Card_Dom_Connection(data, object.deck);
    });
}
function Redrawing_Hero(object) {
    object.hero.innerHTML = '';
    Card_Dom_Connection(object.hero_data, object.hero, true);
}
function Use_Turn(card, data, myflag) {
    var alians = myflag ? my : rival;
    var enemy = myflag ? rival : my;
    if (card.classList.contains('card-turnover')) {
        return;
    }//턴이 끝난카드면 아무것도 동작 x
    //적군 카드면서 아군카드가 선택되어있고, 또 그게 턴이 끝난카드가아니라면
    var enemycard = myflag ? !data.mine : data.mine;
    if (enemycard && alians.cardchoice) {
        data.hp = data.hp - alians.cardchoice_data.att;
        if (data.hp <= 0) {//카드죽음
            var idx = enemy.field_data.indexOf(data);
            if (idx > -1) { //쫄병이죽었을때
                enemy.field_data.splice(idx, 1);
            } else {//영웅이죽었을때
                alert('승리하셨습니다!');
                Init();
            }
        }
        Redrawing_Screen(!myflag);
        alians.cardchoice.classList.remove('card-selected');
        alians.cardchoice.classList.add('card-turnover');
        alians.cardchoice = null;
        alians.cardchoice_data = null;
        return;
    }
    else if (enemycard) { //내게아니면 실행안하고 return
        return;
    }
    if (data.field) {//카드가 필드에있으면
        card.parentNode.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('card-selected');
        })
        card.classList.add('card-selected');
        alians.cardchoice = card;
        alians.cardchoice_data = data;
    } else {//덱에있으면
        if (From_Deck_To_Field(data, myflag) !== 'end') {
            myflag ? My_deck_create(1) : Rival_deck_create(1);
        };
    }

}
function Card_Dom_Connection(data, dom, hero) {
    var card = document.querySelector('.card-hidden .card').cloneNode(true);//cloneNode 로 기존태그를 그대로 넣으면 복사가가능 인자에 true 넣으면내부까지 다 복사
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp;
    if (hero) {
        card.querySelector('.card-cost').style.display = 'none';
        var name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }

    card.addEventListener('click', function () {
        Use_Turn(card, data, turn);
    });
    dom.appendChild(card);
}
function Rival_deck_create(number) {
    for (var i = 0; i < number; i++) {
        rival.deck_data.push(CardFactory(false, false));
    }
    Redrawing_Deck(rival);
}
function My_deck_create(number) {
    for (var i = 0; i < number; i++) {
        my.deck_data.push(CardFactory(false, true)); //아무것도안들어가면 undefined 인데 false 처리가됨자동으로
    }
    Redrawing_Deck(my);
}
function Rival_hero_create() {
    rival.hero_data = CardFactory(true, false);
    Card_Dom_Connection(rival.hero_data, rival.hero, true);
}
function My_hero_create() {
    my.hero_data = CardFactory(true, true);
    Card_Dom_Connection(my.hero_data, my.hero, true);
}
function Init() {
    [rival, my].forEach(function (item) {
        item.deck_data = [];
        item.hero_data = [];
        item.field_data = [];
        item.cardchoice_data = [];
        item.cardchoice = [];
    })
    Rival_deck_create(5);
    My_deck_create(5);
    Rival_hero_create();
    My_hero_create();
    Redrawing_Screen(true);
    Redrawing_Screen(false);
}
function Card(hero, mycard) {//매개변수가없는이유는 입력을받을필요가없기때문이다 랜덤으로 결정하기 때문에
    if (hero) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.heroflag = true;
        this.field = true;
    }
    else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (mycard) {
        this.mine = true;
    }

}
function CardFactory(hero, mycard) {
    return new Card(hero, mycard); //
}
turn_btn.addEventListener('click', function () {
    var object = turn ? my : rival;
    document.querySelector('#rival').classList.toggle('turn');
    document.querySelector('#my').classList.toggle('turn');
    Redrawing_Field(object);
    Redrawing_Hero(object);
    
    turn = !turn;
    if (turn) {
        my.cost.textContent = 10;
    }
    else {
        rival.cost.textContent = 10;
    }
})
Init();
