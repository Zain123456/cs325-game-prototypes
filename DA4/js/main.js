"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'player', 'assets/player.png' );
        game.load.image('crack', 'assets/crack.png');
		game.load.image('pizza', 'assets/pizza.png');
		game.load.image('Background','assets/floor.jpg');
    }


    var player;
	var pizza;
	var PizzaArray;
    let button;
    let crack;
    let array;
	var stateText;
	var number = 0;

    function create() {
		
		var ice = game.add.sprite(game.world.centerX, game.world.centerY, 'Background');
		ice.anchor.set(0.5);
		ice.scale.setTo(1.5,1.5);
		game.physics.startSystem(Phaser.Physics.ARCADE);
        button = game.input.keyboard.createCursorKeys();

        player = game.add.sprite( 0, 1000, 'player' );
		player.scale.setTo(0.2);
		PizzaArray = [];
		
        array = [];
        for(let i = 0; i < 10; i++){
			
			var width = Math.random() * game.world.width;
			var height = Math.random() * game.world.height;
			if(width == 0)
				width = Math.random() * game.world.width;
			array.push(game.add.sprite(width, height, 'crack'));
			var newWidth = Math.random() * width;
			var newHeight = Math.random() * height;
			if(width == newWidth)
			{
				newWidth = Math.random() * width;

			}
			if(height == newHeight)
			{
				newHeight = Math.random() * height; 

			}

			PizzaArray.push(game.add.sprite(newWidth, newHeight, 'pizza'));

        }
        game.physics.arcade.gravity.y = 100;

        player.anchor.setTo( 0.5, 0.5 );

        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        game.physics.enable( array, Phaser.Physics.ARCADE );
		game.physics.enable( PizzaArray, Phaser.Physics.ARCADE );
        array.forEach(function(crack){
          crack.body.immovable = true;
			crack.scale.setTo(0.3);
          crack.body.moves = false;
        });
		
		
		PizzaArray.forEach(function(pizza){
			pizza.body.immovable = true;
			pizza.scale.setTo(0.2);
			pizza.body.moves = false;
			pizza.body.onCollide = new Phaser.Signal();
			pizza.body.onCollide.add((sprite1, sprite2) => {pizza.destroy();
			number = number + 1; 
			if(number == 5)
				
				stateText.text = "You Won"
				stateText.visible = true;
			},this);
        });
		
				
				
        // Make it bounce off of the world bounds.
        player.body.collideWorldBounds = true;


        game.stage.backgroundColor = "FFFFFF";
        player.body.onCollide = new Phaser.Signal();
		
        //player.body.onCollide.add(collide1, this);
		

		
	
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '0000'});
    stateText.anchor.setTo(0.5, 0.5);
    
		
    }

    function collide1(sprite1, sprite2){
    
	sprite1.kill(); 
	stateText.text = "Game Over"
    stateText.visible = true;

    }
	

    function update() {

        if (button.up.isDown)
        {
          // move sprite down
          player.body.velocity.y -= 10;
        }

        else if (button.down.shiftKey)
        {
          player.body.velocity.y += 10;
        }

        else if (button.left.isDown)
        {
          player.body.velocity.x -= 10;
        }
        else if (button.right.isDown)
        {
          player.body.velocity.x += 10;
        }


        //check for collision
		if(game.physics.arcade.collide(player,array))
			collide1(player,array);
		else if(game.physics.arcade.collide(PizzaArray,player))
			game.physics.arcade.collide(PizzaArray,player);
		if(number == 5)
			player.kill();
		
    }
};
