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
        // Load an image 
	game.load.image('Background', 'assets/pokemon.jpg');
	game.load.image('chicken', 'assets/Rooster.png');
	game.load.image('ground', 'assets/ground.png');
	game.load.image('great', 'assets/greatball.png');
        game.load.image( 'ultra', 'assets/UltraBall.png');
	game.load.image('ball', 'assets/ball.png', 200, 200);
    }
    
    var bouncy;
    var sprite; 
    var ground;
    var Text;
    var ball;
    var great;
    var ultra;	


    function create() {

	//load backgroud
	sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'Background');
    
	sprite.anchor.set(0.5);


	sprite.scale.setTo(0.5,0.5);
    
	game.stage.backgroundColor = '#000';
	//load ultraball
      ultra = game.add.sprite(0,0,'ultra');
	ultra.scale.setTo(0.2,0.2);
      game.physics.arcade.enable(ultra);
      ultra.body.gravity.y = 200;
      ultra.body.velocity.setTo(300, 400);
      //adds bounce 
      ultra.body.bounce.setTo(1,1);
      //the walls
      ultra.body.collideWorldBounds = true;
	//load the pokeball
      ball = game.add.sprite(0,0,'ball');
	ball.scale.setTo(0.5,0.5);
      game.physics.arcade.enable(ball);
      ball.body.gravity.y = 300;
      ball.body.velocity.setTo(900, 900);
      //adds bounce 
      ball.body.bounce.setTo(1,1);
      //add the wall
      ball.body.collideWorldBounds = true;
	//create the greatball
      great = game.add.sprite(0,0,'great');
	great.scale.setTo(0.2,0.2);
      game.physics.arcade.enable(great);
      great.body.gravity.y = 300;
      great.body.velocity.setTo(200, 250);
      //adds bounce 
      great.body.bounce.setTo(1,1);
      //the walls
      great.body.collideWorldBounds = true;

	//ground for the game
      ground = game.add.sprite(0,game.height - 60,'ground');
      ground.scale.setTo(2,2);
      game.physics.arcade.enable(ground);
      ground.body.allowGravity = false;
      ground.body.immovable = true;
	//bounce off the ground
	bouncy = game.add.sprite( 50, game.world.centerY, 'chicken' );	
        bouncy.scale.setTo(0.2,0.2);
	game.physics.arcade.enable(bouncy);
      bouncy.body.collideWorldBounds = true;
	bouncy.body.gravity.y = 500;
	
	//Display the text
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center", color: "Black" };

	Text = game.add.text( game.world.centerX, 15, " ", style );
        Text.anchor.setTo( 0.5, 0.0 );

	//Text = game.add.text(16, 16, 'Drag the sprites. Overlapping: false');
    }

	//check for overlap
	function checkOverlap(spriteA, spriteB) {

    
	var boundsA = spriteA.getBounds();
  	  
	var boundsB = spriteB.getBounds();

    
	return Phaser.Rectangle.intersects(boundsA, boundsB);


	}

    function update() {

      //physics	      
      game.physics.arcade.collide(bouncy, ground);

      bouncy.body.velocity.x = 0;

	var cursors = game.input.keyboard.createCursorKeys();

      //add controls for the player to move (written following phaser tutorial)
      if(cursors.left.isDown) {
        bouncy.body.velocity.x = -400;
        bouncy.animations.play('left');
      }
      else if(cursors.right.isDown) {
       bouncy.body.velocity.x = 400;
        bouncy.animations.play('right');
      }
      else {
        bouncy.animations.stop();
        bouncy.frame = 4;
      }

      if (cursors.up.isDown && bouncy.body.touching.down) {
        bouncy.body.velocity.y = -450;
      }
	//check for overlap
	if (checkOverlap(bouncy, ball))
   
 	{
        
		Text.text = "Noooooo!!!!! Game Over, You have been caught. Refresh page to try again ";

		
		bouncy.kill();
		    
	}

	else
	{
		Text.text = 'Avoid the PokeBall or You will be stuck in the Pokemon world';
	}	
   

    }
};
