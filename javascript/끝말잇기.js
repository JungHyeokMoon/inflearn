var word=prompt('첫단어 입력하세요')
while(true){
    var newword=prompt(word);
    if(word[word.length-1]==newword[0]){
        word=newword;
    }
    else{
        console.log('다시입력하세요')
    }
}


