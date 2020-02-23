

// var obj={a:1,b:2};
// var obj2=Object.assign({},obj);
// //1단계깊은복사

// obj2=JSON.parese(JSON.stringify(obj));
//깊은복사 성능최악, prototype 복사 불가능

// call by value =>원시값은 복사가되서 매개변수에 들어감
//call by reference 는 자바스크립트에없다. c나 c++ 포인터가있어야지 callbyreference
//객체 속성 수정시에는 참조이지만 객체 자체를 수정할시에는 관계가깨짐
//------------------------11-1----------------------



//생성자는 함수, 첫글자 대문자가 국룰
// function Card(name,att,hp){
//     this.name=name;
//     this.att=att;
//     this.hp=hp;
// } //객체지향적 this는 기본적으로 window 실수로 new를 안붙였다면 window의 속성이되버린다.
// var prototype={
//     type:'card',
// }

// Card.prototype=prototype;

// function 카드공장(name,att,hp){
//     var 카드=Object.create(prototype);
//     카드.name=name;
//     카드.att=att;
//     카드.hp=hp;
//     return 카드;
// } //이건함수형프로그래밍



// var Junghyeok=new Card('JungHyeok',10,10);
// console.log(Junghyeok);

