var x1=Math.ceil(Math.random()*9)
var x2=Math.ceil(Math.random()*9)
var result=x1*x2;
var body=document.body;
var words=document.createElement('div');
words.textContent=String(x1)+'*'+String(x2)+'?';


var form=document.createElement('form');
document.body.append(form);
form.append(words);
var input=document.createElement('input');
form.append(input);
var button=document.createElement('button');
button.textContent='입력!';
form.append(button);

var answer=document.createElement('div');
document.body.append(answer);
form.addEventListener('submit',function(evt){
    evt.preventDefault();
    if(Number(input.value)===result){
        answer.textContent='딩동댕';
        x1=Math.ceil(Math.random()*9);
        x2=Math.ceil(Math.random()*9);
        words.textContent=String(x1)+'*'+String(x2)+'?';
        result=x1*x2;
        input.focus();
        input.value='';
    }
    else{
        answer.textContent='땡';
        input.focus();
        input.value='';
    }
});
// while(true){
//     var answer=prompt(String(x1)+"*"+String(x2)+'?')
//     if(answer===null){
//         break;
//     }
//     if(Number(answer)===x1*x2){
//         alert("딩동댕");
//         x1=Math.ceil(Math.random()*9)
//         x2=Math.ceil(Math.random()*9)
//     }
//     else{
//         alert("땡");
//     }
// }