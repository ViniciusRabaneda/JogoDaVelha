/* Initial Data */


let board = {
    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
};

let player = '';
let warning ='';
let playing = false;

reset(); //initialize the game with reset

/*Events  */

document.querySelector('.reset').addEventListener('click',reset);
document.querySelectorAll('.item').forEach(item =>{  // loop through the items that have the item class and add the click event to each of them
    item.addEventListener('click',itemClick);  
});

/* Functions */
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(playing && board[item] ===''){
        board[item]= player;
        renderBoard();
        tooglePlayer(); // change the player
    }
}


function reset(){
    warning = '';
    let random = Math.floor(Math.random()*2); // Generates a random number between and rounds down
    if(random ===0){ // choose a player randomly
        player = 'x';
    }else{
        player = 'o'
    }
 
    for (let i in board){ // clean the board
        board[i] = '';
    }

    playing = true; 

    renderBoard();
    renderInfo();

}

function renderBoard(){
    for(let i in board){
        let item = document.querySelector(`div[data-item=${i}]`);
        if(board[i] !== ''){
            item.innerHTML = board[i]
        }else{
            item.innerHTML = '';
        }
    }

    checkGame();
}

function renderInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function tooglePlayer(){
    if(player ==='x'){
        player ='o';
    }else{
        player ='x';
    }
    renderInfo();
}

function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu!';
        playing = false;
    }else if(checkWinnerFor('o')){
        warning = 'O "o" venceu!';
        playing = false;
    }else if(isFull()){
        warning = 'Deu empate!';
        playing = false;
    }
}

function checkWinnerFor(player){
    let possibilityWin = [
        'a1,a2,a3',   // horizontal 
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',  // vertical
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',  // diagonal
        'a3,b2,c1'

    ];

    for(let w in possibilityWin){
        let pArray = possibilityWin[w].split(','); // array with a1, a2 ,a3
        let hasWon = pArray.every(option => board[option] === player); // the condition is applied to all items in the array.
        if(hasWon){
            return true;
        }
    }
    return false;

}

function isFull(){
    for(let i in board){
        if (board[i] === ''){
            return false;
        }
    }
    return true;
}