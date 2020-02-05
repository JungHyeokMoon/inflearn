var x1=Math.ceil(Math.random()*9)
var x2=Math.ceil(Math.random()*9)

while(true){
    var answer=prompt(String(x1)+"*"+String(x2)+'?')
    if(answer===null){
        break;
    }
    if(Number(answer)===x1*x2){
        alert("딩동댕");
        x1=Math.ceil(Math.random()*9)
        x2=Math.ceil(Math.random()*9)
    }
    else{
        alert("땡");
    }
}