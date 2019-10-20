// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.bugSpeed = Math.round(Math.random()*5);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.startingXPostion = -70;
    this.startingYPostion = 60 + Math.round(Math.random()) * 83 + Math.round(Math.random()) * 83;
    this.sprite = 'images/enemy-bug.png';
    this.x = this.startingXPostion;
    this.y = this.startingYPostion;
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
        this.x = this.startingXPostion;
        this.y = this.startingYPostion;
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
Player.prototype.update = function() {
    
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.mainCharacter), this.x, this.y);
}
Player.prototype.handleInput = function(input) { 
    if (input === 'left' && this.x > 0){
        this.x = this.x - 101;
    } else if (input === 'right' && this.x < 400){
        this.x = this.x + 101;
    } else if (input === 'down' && this.y < 350){
        this.y = this.y + 83;
    } else if (input === 'up' && this.y > 0){
        this.y = this.y - 83;
    } 

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
enemyOne = new Enemy();
enemyTwo = new Enemy();
enemyThree = new Enemy();
player = new Player();

var allEnemies = [enemyOne, enemyTwo, enemyThree];



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
