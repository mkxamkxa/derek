/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Collection of declaration 
let openCardsArray = [];
let numOfMoves = 0;
let numOfMatched = 0;
let numOfStars = 0;
let seconds = 0;
let resetButtonNode = document.querySelector('.restart');
let numOfMovesNode = document.querySelector('.moves');
let ListOfCardNodes = document.querySelectorAll('.card'); 
let starsNode = document.querySelector('.stars');
let addingStarsHTML = '<li><i class="fa fa-star"></i></li>';
let figureDiamond = "fa fa-diamond";
let figurePaperPlane = "fa fa-paper-plane-o";
let figureAnchor = "fa fa-anchor";
let figureBolt = "fa fa-bolt";
let figureCube = "fa fa-cube";
let figureLeaf = "fa fa-leaf"; 
let figureBomb = "fa fa-bomb";
let figureBicyle = "fa fa-bicycle";

//setting cards
let cardsPicturesArray = [].concat(figureDiamond, figureAnchor, figureBicyle, figureBolt, figureBomb, figureCube, figureLeaf, figurePaperPlane);
cardsPicturesArray = cardsPicturesArray.concat(cardsPicturesArray);
cardsPicturesArray.forEach(function (item, index){    
    cardsPicturesArray[index] = '<li class="card" data-card="' + item + '"><i class="' + item + '"></i></li>';
});

startGame();
setInterval(timer,1000);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle
    while (currentIndex !== 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;  
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//to start a game
function startGame (){
    cardsPicturesArray = shuffle(cardsPicturesArray);
    let deck = document.querySelector('.deck');
    deck.innerHTML = cardsPicturesArray.join(' ');
    numOfMatched = 0;
    numOfMoves = 0;
    numOfStars = 0;
    seconds = 0;
    numOfMovesNode.innerText = numOfMoves;   
    ListOfCardNodes = document.querySelectorAll('.card'); 
    addingEventListner();
}

// when Game is over, alert and restart
function gameOver() { 
    if (confirm("Congratulation!! You moved " + numOfMoves +", and your star rating is "+ numOfStars +", and you finshed in "+seconds+". Would you like to try again?")) {
        startGame();  
    }
};

//timer function
function timer(){
    seconds++;
    let timerNode = document.querySelector('.timer');
    timerNode.innerHTML = seconds + " seconds";
}


// if reset button, reset
resetButtonNode.addEventListener('click', function (){   
    startGame();
});

// when cards clicked, open cards
function addingEventListner (){ 
    ListOfCardNodes.forEach( function (openCard){
        openCard.addEventListener('click', function (){
            if (openCardsArray.length < 2 && openCard.classList.contains('open') == false && openCard.classList.contains('show')== false && openCard.classList.contains('match') == false){
                openCardsArray.push(openCard);
                openCard.classList.add('open', 'show'); 
                if (openCardsArray.length == 2) {
                    // when match, leave them open
                    if (openCardsArray[0].dataset.card == openCardsArray[1].dataset.card){
                        openCardsArray[0].classList.add('open', 'show', 'match');
                        openCardsArray[1].classList.add('open', 'show', 'match');
                        openCardsArray = [];
                        numOfMatched ++; 
                        if (numOfMatched == 8){
                            gameOver();
                        }
                    } else {
                        //hiding cards
                        openCardsArray.forEach(function (openCard) { 
                            setTimeout(function() {
                                openCard.classList.remove('open', 'show');
                                openCardsArray = []; 
                            }, 1000);
                        }); 
                    }    
                } 
                numOfMoves++; //adding moves
                numOfMovesNode.innerText = numOfMoves;
                if (numOfMoves < 30){
                    starsNode.innerHTML = addingStarsHTML + addingStarsHTML + addingStarsHTML;
                    numOfStars = 3;
                }else if (numOfMoves < 50) {
                    starsNode.innerHTML = addingStarsHTML + addingStarsHTML;
                    numOfStars = 2;
                }else {
                    starsNode.innerHTML = addingStarsHTML;
                    numOfStars = 1;
                }

            }
        });

    });
}

