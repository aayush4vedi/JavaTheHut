// alert("It's on");
var b1 = document.querySelector('#b1');
var b2 = document.querySelector('#b2');
var b3 = document.querySelector('#b3');
var p1 = document.querySelector('#p1');
var p2 = document.querySelector('#p2');
var num = document.querySelector('#maxScore');
var p = document.querySelector('#p');
var maxScore = 5;
var p1score =0, p2score=0;
var gameOver = false;

b1.addEventListener('click', ()=>{
    // alert("clicked");
    if(!gameOver){
        p1score++;
        p1.textContent=p1score;
        if(p1score==maxScore){
            gameOver=true;
            p1.classList.add("winner");
            alert("Player 1 won!");
        }
        console.log('p1 score is: ',p1score);
    }
})
b2.addEventListener('click', ()=>{
    // alert("clicked");
    if(!gameOver){
        p2score++;
        p2.textContent=p2score;
        if(p2score==maxScore){
            gameOver=true;
            p2.classList.add("winner");
            alert("Player 2 won!");
        }
        console.log('p2 score is: ',p2score);
    }
})
//Resetting
b3.addEventListener('click', ()=>{
    console.log("Resetted!");
    p1score=0;
    p2score=0;
    p1.textContent=p1score;
    p2.textContent=p2score;
    p1.classList.remove("winner");
    p2.classList.remove("winner");
})
num.addEventListener('change',()=>{
    console.log("clicked!");
    p.textContent = num.value;
    maxScore = parseInt(num.value);
})
