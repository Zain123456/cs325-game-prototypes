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
	game.load.image('Background', 'assets/pokemon.jpg');
	game.load.image('chicken', 'assets/rooster.png', 35, 48);
	game.load.image('ground', 'assets/ground.png');
	game.load.image('star', 'assets/phaser.png');
        //game.load.image( 'logo', 'assets/rooster.png' );
	game.load.image('ball', 'assets/ball.png', 200, 200);
    }
    
    var bouncy;
    var sprite; 
    var player;
    var ground;	

    function create() {

	sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'Background');
    
	sprite.anchor.set(0.5);


	sprite.scale.setTo(0.5,0.5);
    
	game.stage.backgroundColor = '#000';
	
	var emitter = game.add.emitter(game.world.centerX, 0, 400);

	emitter.width = game.world.width;

	emitter.makeParticles('ball');

	emitter.minParticleScale = 0.1;
	emitter.maxParticleScale = 0.5;

	emitter.setYSpeed(300, 500);
	emitter.setXSpeed(-5, 5);

	emitter.minRotation = 0;
	emitter.maxRotation = 0;

	emitter.start(false, 1600, 5, 0);


	//ground of the game
      ground = game.add.sprite(0,game.height - 60,'ground');
      ground.scale.setTo(2,2);
      game.physics.arcade.enable(ground);
      ground.body.allowGravity = false;
      ground.body.immovable = true;

	bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'chicken' );	
        bouncy.scale.setTo(0.5,0.5);
	game.physics.arcade.enable(bouncy);
      bouncy.body.collideWorldBounds = true;
	bouncy.body.gravity.y = 500;

        // Create a sprite at the center of the screen using the 'logo' image.
        //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }


    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
	      //checks if the player collided with the ground. 
      game.physics.arcade.collide(bouncy, ground);

      
      game.physics.arcade.collide(bouncy, ground);

      bouncy.body.velocity.x = 0;

	var cursors = game.input.keyboard.createCursorKeys();

      //add controls for the player to move (written following phaser tutorial)
      if(cursors.left.isDown) {
        bouncy.body.velocity.x = -200;
        bouncy.animations.play('left');
      }
      else if(cursors.right.isDown) {
       bouncy.body.velocity.x = 200;
        bouncy.animations.play('right');
      }
      else {
        bouncy.animations.stop();
        bouncy.frame = 4;
      }

      if (cursors.up.isDown && bouncy.body.touching.down) {
        bouncy.body.velocity.y = -150;
      }

    }
};
