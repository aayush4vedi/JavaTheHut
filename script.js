var num=6;
var easy = document.querySelector('#easy');
var hard = document.querySelector('#hard');
var col =[num];
var newGame = document.querySelector('#new-color');
var squares = document.querySelectorAll('.square');
var index ,pickedColor;
var tryAgain = document.getElementById('try-again');
var colorCode = document.getElementById('tabColor');
var jumbotron = document.querySelector('.jumbotron');
var activeButton = document.querySelector('.b-active');
// var easyButton = document.querySelector('#easy');
// var hardButton = document.querySelector('#hard');


//see game's difficulty level
easy.addEventListener('click',()=>{
    num = 3;
    hard.classList.remove('b-active');
    hard.style.background= 'rgb(255, 255, 255)';
    hard.classList.remove('text-white');
    easy.classList.add('b-active');
    easy.classList.add('text-white');
    activeButton = easy;
    initSetup();
});
hard.addEventListener('click',()=>{
    num = 6;
    easy.classList.remove('b-active');
    easy.classList.remove('text-white');
    hard.classList.add('b-active');
    hard.classList.add('text-white');
    activeButton = hard;
    initSetup();
});

initSetup();

newGame.addEventListener('click', ()=>{
    initSetup();
});


function initSetup(){
    //set jumbotron color 
    jumbotron.style.background = 'rgb(0, 150, 205)';
    //when switch easy<->hard, reset the prev button
    if(num==3){
        hard.style.background= 'rgb(255, 255, 255)';
        hard.classList.remove('text-white');
    }else{
        easy.style.background= 'rgb(255, 255, 255)';
        easy.classList.remove('text-white');
    }
    activeButton.style.background = 'rgb(0, 150, 205)';
    //remove success message
    tryAgain.textContent = '';
    //generate new col[]
    generateColArray(num);
    console.log('col[]: ', col);
    
    //have new picked color & display
    index = Math.floor((Math.random() * (num-1))); 
    pickedColor = col[index];
    console.log('index, ',index);
    
    colorCode.textContent = pickedColor;
    console.log('picked col is: ', pickedColor, 'at index ', index);
    
    //assing col to squares
    assignRandCol();
}

function generateColArray(num){
    for(var i=0;i<num;i++){
        col[i]= randColor();
    }
}
function randColor(){
    var r = Math.floor((Math.random() * 255) + 1);
    var g = Math.floor((Math.random() * 255) + 1);
    var b = Math.floor((Math.random() * 255) + 1);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'; 
}
function assignRandCol(){
    for(var i=0;i< num;i++){
        squares[i].style.background = col[i];
        squares[i].addEventListener('click',function(){
            var clickedColor = this.style.background;
            if(clickedColor==pickedColor){
                tryAgain.textContent = 'Success!';
                changeColor(pickedColor);
                newGame.textContent = 'Play Again';
            }else{
                this.style.background= 'rgb(41, 38, 38)';
                tryAgain.textContent = 'Try Again!';
            }
        });
    }
    if(num==3){
        while(i<6){
            squares[i].style.background = 'rgb(41, 38, 38)';
            i++;
        }
    }
}
function changeColor(color){
    for(var i=0;i<num;i++){
        squares[i].style.background = color;
    }
    jumbotron.style.background = color;
    activeButton.style.background = color;
}