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
var openCardsArray = [];
var numOfMoves = 0;
var numOfMatched = 0;
var resetButtonNode = document.querySelector('.restart');
var numOfMovesNode = document.querySelector('.moves');
var ListOfCardNodes = document.querySelectorAll('.card'); 
var starsNode = document.querySelector('.stars');
var addingStarsHTML = '<li><i class="fa fa-star"></i></li>';
var cardsPicturesArray = [
    "fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
    "fa fa-bomb", "fa fa-bomb", "fa fa-bicycle", "fa fa-bicycle"
];
startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
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
    cardsPicturesArray.forEach(function (item, index){    
        cardsPicturesArray[index] = '<li class="card" data-card="' + item + '"><i class="' + item + '"></i></li>';
    });
    cardsPicturesArray = shuffle(cardsPicturesArray);
    var deck = document.querySelector('.deck');
    deck.innerHTML = cardsPicturesArray.join(' ');
    numOfMatched = 0;
    numOfMoves = 0;
    numOfMovesNode.innerText = numOfMoves;   
    ListOfCardNodes = document.querySelectorAll('.card'); 
    addingEventListner();
}

// when Game is over, alert and auto restart
function gameOver() { 
    alert("You have won the game.");
    setTimeout(() => {
        startGame();    
    }, 1000);
};



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
                console.log(openCardsArray.length);
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
                    starsNode.innerHTML = addingStarsHTML;
                }else if (numOfMoves < 50) {
                    starsNode.innerHTML = addingStarsHTML + addingStarsHTML;
                }else {
                    starsNode.innerHTML = addingStarsHTML + addingStarsHTML + addingStarsHTML;
                }

            }
        });

    });
}




/*            
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
