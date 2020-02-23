var rival_hero = document.querySelector('#rival-hero');
var my_hero = document.querySelector('#my-hero');
var rival_deck = document.querySelector('#rival-deck');
var my_deck = document.querySelector('#my-deck');
var rival_deck_data = [];
var my_deck_data = [];
var rival_hero_data;
var my_hero_data;

function Card_Dom_Connection(data,dom,hero) {
    var card = document.querySelector('.card-hidden .card').cloneNode(true);//cloneNode 로 기존태그를 그대로 넣으면 복사가가능 인자에 true 넣으면내부까지 다 복사
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    if(hero){
        card.querySelector('.card-cost').style.display='none';
        var name=document.createElement('div');
        name.textContent='영웅';
        card.appendChild(name);
    }
    card.querySelector('.card-hp').textContent = data.hp;

    dom.appendChild(card);
}
function Rival_deck_create(number) {
    for (var i = 0; i < number; i++) {
        rival_deck_data.push(CardFactory());
    }
    rival_deck_data.forEach(function (data) {
        Card_Dom_Connection(data,rival_deck,false);
    });
}
function My_deck_create(number) {
    for (var i = 0; i < number; i++) {
        my_deck_data.push(CardFactory()); //아무것도안들어가면 undefined 인데 false 처리가됨자동으로
    }
    my_deck_data.forEach(function (data) {
        Card_Dom_Connection(data,my_deck,false);
    });
}
function Rival_hero_create() {
    rival_hero_data = CardFactory(true);
    Card_Dom_Connection(rival_hero_data,rival_hero,true);
}
function My_hero_create() {
    my_hero_data = CardFactory(true);
    Card_Dom_Connection(my_hero_data,my_hero,true);
}
function Init() {
    Rival_deck_create(5);
    My_deck_create(5);
    Rival_hero_create();
    My_hero_create();
}
function Card(hero) {//매개변수가없는이유는 입력을받을필요가없기때문이다 랜덤으로 결정하기 때문에
    if (hero) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.heroflag = true;
    }
    else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }


}
function CardFactory(hero) {
    return new Card(hero); //
}
Init();