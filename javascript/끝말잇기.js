var body=document.body;
var words=document.createElement('div');
words.textContent='첫 단어를 입력하세요';
var form=document.createElement('form');
document.body.append(form);
form.append(words);
var input=document.createElement('input');
form.append(input);
var button=document.createElement('button');
button.textContent='입력!'; 
form.append(button);
var result=document.createElement('div');
document.body.append(result);   

form.addEventListener('submit',function(evt){
    evt.preventDefault();
    if(words.textContent[words.textContent.length-1]===input.value[0]){
        result.textContent='딩동댕';
        words.textContent=input.value;
        input.value='';
        input.focus();//사용자에게 마우스 사용을 최대한 덜하게끔
    }else{
        result.textContent='땡';
        input.value='';
        input.focus();
    }
});//콜백함수 ,tag 안에들어가는 글자는 textcontent, input 안에들어가는것들은 value

// var word=prompt('첫단어 입력하세요')

// while(true){
//     var newword=prompt(word);
//     if(word[word.length-1]==newword[0]){
//         word=newword;
//     }
//     else{
//         console.log('다시입력하세요')
//     }
// }


