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
        game.load.image( 'mouse', 'assets/mouse.png' );
        game.load.image('trap', 'assets/trap.png');
		game.load.image('cat', 'assets/cat.png');
        //game.load.audio('eaten', 'assets/eaten.mp3');
    }


    var mouse;
    let button;
    let trap;
    let array;
	var cat;
	var CatHealth = ' ';
	var Text;
	var health;
	var stateText;

    function create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
        button = game.input.keyboard.createCursorKeys();

        mouse = game.add.sprite( 500, 1000, 'mouse' );
		cat = game.add.sprite( 0, 1000, 'cat' );
		cat.scale.setTo(0.1);
		game.physics.enable( cat, Phaser.Physics.ARCADE );
		cat.body.collideWorldBounds = true;
		mouse.scale.setTo(0.1);
        array = [];
        for(let i = 0; i < 7; i++){

          array.push(game.add.sprite(Math.random() * game.world.width, Math.random() * game.world.height, 'trap'));

        }
        game.physics.arcade.gravity.y = 100;

        mouse.anchor.setTo( 0.5, 0.5 );

        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( mouse, Phaser.Physics.ARCADE );
        game.physics.enable( array, Phaser.Physics.ARCADE );
        array.forEach(function(trap){
          trap.body.immovable = true;
			trap.scale.setTo(0.1);
          trap.body.moves = false;
        });
        // Make it bounce off of the world bounds.
        mouse.body.collideWorldBounds = true;


        game.stage.backgroundColor = "#a6aab2";
         // event handler for pichu eating cookie
        mouse.body.onCollide = new Phaser.Signal();
		cat.body.onCollide = new Phaser.Signal();
        mouse.body.onCollide.add(collide1, this);
		cat.body.onCollide.add(collide2, this);
		
		    //  The score
    CatHealth = 'Cat Health : ';
	health = 100; 
    Text = game.add.text(140, 20, CatHealth + health, { font: '34px Arial', fill: '#fff' });

    Text.anchor.setTo(0.5, 0.5);
	
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    
		
    }

    function collide1(sprite1, sprite2){
  
	stateText.text = "Game Over"
    stateText.visible = true;

    }
	    function collide2(sprite1, sprite2){
      sprite2.destroy(); // pichu ate cookie
		if(health > 10)
		{
			health = health - 30;
			Text.text = CatHealth + health; 
		}
		else
		{
			sprite1.destroy();
		    stateText.text = "You won"
			stateText.visible = true;
		}

    }

    function update() {

        if (button.up.isDown)
        {
          // move sprite down
          mouse.body.velocity.y -= 10;
		  cat.body.velocity.y -= 5;
        }

        else if (button.down.shiftKey)
        {
          mouse.body.velocity.y += 10;
		  cat.body.velocity.y += 5;
        }

        else if (button.left.isDown)
        {
          mouse.body.velocity.x -= 10;
		  cat.body.velocity.x -= 5;
        }
        else if (button.right.isDown)
        {
          mouse.body.velocity.x += 10;
		  cat.body.velocity.x += 5;
        }


        //check for collision
        game.physics.arcade.collide(mouse, array);
		game.physics.arcade.collide(cat, array);
		game.physics.arcade.collide(mouse, cat);
    }
};
