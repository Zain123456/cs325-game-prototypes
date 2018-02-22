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
    
    
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});

function preload() {

    game.load.spritesheet('rock', 'assets/rock.png');
    game.load.image('ship', 'assets/player.png');
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    game.load.image('starfield', 'assets/starfield.png');
    

}

var player;
var cursors;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var stateText;
var rock;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
	rock = game.add.emitter(game.world.centerX, 5, 100);
	rock.scale.setTo(1);
	rock.width = game.world.width; 

	rock.makeParticles('rock');

	rock.minParticleScale = 0.1;
	rock.maxParticleScale = 0.3;

	rock.setYSpeed(200, 600);
	rock.setXSpeed(-5, 5);

	rock.minRotation = 4;
	rock.maxRotation = 20;
	rock.checkWorldBounds = true;
    rock.outOfBoundsKill = true;
	rock.collision = true; 
	game.physics.enable(rock, Phaser.Physics.ARCADE);
	rock.start(false, 2000, 200, 0);
	

    //  The hero!
    player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.scale.setTo(0.1,0.1);
	
    //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;



    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    
}



function update() {


    //  Scroll the background
    starfield.tilePosition.y += 2;

    if (player.alive)
    {
        //  Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
        }

        //  Run collision
        //game.physics.arcade.overlap(rock, player, enemyHitsPlayer, null, this);
		//game.physics.arcade.collide(rock, player, checkOverlap, null, this);

		if(player.overlap(rock))
		{
			player.destroy();
			rock.destroy(); 
			stateText.text=" GAME OVER \n Game will restart \n in 5 seconds";
			stateText.visible = true;
			setTimeout(myFunction, 5000);
			function myFunction() {
				location.reload();
			}
			
		}
        
    }

}


};
