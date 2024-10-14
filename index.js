// number of rolls Dice 
var numRollDice  = Math.floor(Math.random()* 10) + 1;
// flag to stop game when one of player win
let gameActive = true;

// Generate a random dice number
function generateRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// ! buttons
const newGame = document.getElementsByClassName("btn--new")[0];
const rollDice = document.getElementsByClassName("btn--roll")[0];
const hold = document.getElementsByClassName("btn--hold")[0];

// ! values of players
var value_player1 = document.getElementsByClassName("val_roll")[0];
var value_player2 = document.getElementsByClassName("val_roll")[1];

// ! current values of players
var currenValue1 = document.getElementsByClassName("current_value")[0];
var currenValue2 = document.getElementsByClassName("current_value")[1];

// ! image of roll dice
var imgRoll = document.getElementsByClassName("img-roll")[0];

// ! random of roll dice
var imgValue = 0;
// ! current values
var currentValue = 0;

// ! player 
const player1 = document.getElementsByClassName("player")[0];
const player2 = document.getElementsByClassName("player")[1];

// ! Roll dice 
rollDice.addEventListener("click",function(){
    // If game is not active, stop rolling dice
    if(!gameActive) return;
    if(numRollDice > 0)
        {
            --numRollDice;
            if(player1.classList.contains("player--active"))
            {
                currenValue2.textContent = 0;
                currenValue1.textContent = Number(currenValue1.textContent) + imgValue;
                
            }else if(player2.classList.contains("player--active")){
                currenValue1.textContent = 0;
                currenValue2.textContent = Number(currenValue2.textContent) + imgValue;
            }else{/* Noting */}
        }else{
            player1.classList.toggle("player--active");
            player2.classList.toggle("player--active");
            numRollDice  = Math.floor(Math.random()* 10) + 1;
    }
    imgValue = generateRandomDice();
    imgRoll.classList.remove("hidden");
    imgRoll.src = `images/dice-${imgValue}.png`;
    
})
// ! hold 
hold.addEventListener("click",function(){
    // If game is not active, stop rolling dice
    if(!gameActive) return;
    if(player1.classList.contains("player--active")){
        currenValue2.textContent = 0;
        value_player1.textContent = Number(value_player1.textContent)+ Number(currenValue1.textContent);
        if(value_player1.textContent >= 100)
            {
                player1.classList.add("player--winner");
                gameActive = false;
                return;
                
            }
    }else if(player2.classList.contains("player--active"))
        { 
        currenValue1.textContent = 0;
        value_player2.textContent = Number(value_player2.textContent)+ Number(currenValue2.textContent);
        if(value_player2.textContent >= 100)
            {
                player2.classList.add("player--winner");
                gameActive = false;
                return;
            }
    }else{/* Noting */}
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
})

// ! Reset Game
newGame.addEventListener("click", function() {
    imgRoll.classList.add("hidden");

    // Reset winner player
    player1.classList.remove("player--winner");
    player2.classList.remove("player--winner");
    
    value_player1.textContent = 0;
    value_player2.textContent = 0;
    
    currenValue1.textContent = 0;
    currenValue2.textContent = 0;

    // Reset active player to Player 1
    player1.classList.add("player--active");
    player2.classList.remove("player--active");

    // Reactive the game 
    gameActive = true;
});

