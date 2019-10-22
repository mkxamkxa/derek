// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.bugSpeed = Math.round(Math.random()*5);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -70;
    this.y = 60 + Math.round(Math.random()) * 83 + Math.round(Math.random()) * 83;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if  (this.x < 600){
        this.x = this.x + 100 * dt + this.bugSpeed;
    } else {
        this.x = -70;
        this.y = 60 + Math.round(Math.random()) * 83 + Math.round(Math.random()) * 83;
        this.bugSpeed = Math.round(Math.random()*5);
    }
};
//60, 143, 226

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function (){
    this.mainCharacter = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function(a){ 
    if (a===1){
        this.mainCharacter = 'images/char-boy.png'
    } else if (a===2){
        this.mainCharacter = 'images/char-cat-girl.png'
    } else if (a===3){
        this.mainCharacter = 'images/char-horn-girl.png'
    } else if (a===4){
        this.mainCharacter = 'images/char-pink-girl.png'
    } else if (a===5){
        this.mainCharacter = 'images/char-princess-girl.png'
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.mainCharacter), this.x, this.y);
}

Player.prototype.handleInput = function(input) { 
    if (input === 'left' && this.x > 0){
        this.x = this.x - 100;
    } else if (input === 'right' && this.x < 400){
        this.x = this.x + 100;
    } else if (input === 'down' && this.y < 350){
        this.y = this.y + 83;
    } else if (input === 'up' && this.y > 100 ){
        this.y = this.y - 83;
    } else if (input === 'up' && numGems === 3 ){
        this.y = this.y - 83;
    }
}

// Diamond Class
var Diamond = function (){
    this.gems = '';
    this.x = 100 * Math.round(Math.random()*4);
    this.y = 60 + Math.round(Math.random()) * 83 + Math.round(Math.random()) * 83;
}
Diamond.prototype.render = function(){
    ctx.drawImage(Resources.get(this.gems), this.x, this.y);
}
Diamond.prototype.update = function(){
    if (diamondOrange.x === diamondBlue.x && diamondOrange.y === diamondBlue.y){
        if (diamondOrange.x < 300){
            diamondOrange.x = diamondOrange.x + 100;
        } else {
            diamondOrange.x = diamondOrange.x - 100;
        }
    } else if (diamondGreen.x === diamondBlue.x && diamondGreen.y === diamondBlue.y){
        if (diamondGreen.x < 300){
            diamondGreen.x = diamondGreen.x + 100;
        } else {
            diamondGreen.x = diamondGreen.x - 100;
        }
    } else if (diamondGreen.x === diamondOrange.x && diamondGreen.y === diamondOrange.y){
        if (diamondGreen.x < 300){
            diamondGreen.x = diamondGreen.x + 200;
        } else {
            diamondGreen.x = diamondGreen.x - 200;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
enemyOne = new Enemy();
enemyTwo = new Enemy();
enemyThree = new Enemy();
player = new Player();

diamondBlue = new Diamond();
diamondBlue.gems ='images/Gem Blue.png' 
diamondOrange = new Diamond();
diamondOrange.gems ='images/Gem Orange.png'
diamondGreen = new Diamond();
diamondGreen.gems ='images/Gem Green.png'

var allEnemies = [enemyOne, enemyTwo, enemyThree];
var allDiamonds = [diamondBlue, diamondOrange, diamondGreen];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Changing Players
let playCharacterUpdate = 1;
document.getElementById("character1").onclick = function (){ playCharacterUpdate = 1; player.update(playCharacterUpdate);}
document.getElementById("character2").onclick = function (){ playCharacterUpdate = 2; player.update(playCharacterUpdate);}
document.getElementById("character3").onclick = function (){ playCharacterUpdate = 3; player.update(playCharacterUpdate);}
document.getElementById("character4").onclick = function (){ playCharacterUpdate = 4; player.update(playCharacterUpdate);}
document.getElementById("character5").onclick = function (){ playCharacterUpdate = 5; player.update(playCharacterUpdate);}
