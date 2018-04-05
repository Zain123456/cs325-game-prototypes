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
    
    var game = new Phaser.Game( 1200, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image 
	game.load.image('Background', 'assets/sky.png');
	game.load.image('ground', 'assets/grass.png');
	game.load.image('house', 'assets/house.png');
	game.load.image('player', 'assets/shield.png');
	game.load.image('ball', 'assets/ball.png');
	game.load.audio('time', 'assets/time.mp3');

    }

    var sprite; 
	var ground;
	var house;
	var HouseHealth = ' ';
	var Text;
	var health;
	var stateText;	
	var player;
	var button;
	var ball;
	var ball2;
    var i = 0;
	var time = ' ';
	var music;

    function create() {
		
	button = game.input.keyboard.createCursorKeys();
	//sound
	music = game.add.audio('time');

    music.play();

	      	//load backgroud
	sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'Background');
    
	sprite.anchor.set(0.5);
	sprite.scale.setTo(1.5,1.5);
	game.stage.backgroundColor = '#000';
	
	//ground for the game
      ground = game.add.sprite(0,540,'ground');
      ground.scale.setTo(0.4,0.1);
      game.physics.arcade.enable(ground);
      ground.body.allowGravity = false;
      ground.body.immovable = true;
	  
	  //create house
	  house = game.add.sprite(0, 0, 'house' );
	  house.scale.setTo(0.2,0.459);
	  game.physics.enable( house, Phaser.Physics.ARCADE );
	  house.body.collideWorldBounds = true;
	  house.body.onCollide = new Phaser.Signal();
	  house.body.onCollide.add(collide2, this);
	  
	  //player
	  player = game.add.sprite( 500, 1000, 'player' );
	  player.scale.setTo(0.25);
	  game.physics.arcade.gravity.y = 300;
	  player.anchor.setTo( 0.5, 0.5 );
	  game.physics.enable( player, Phaser.Physics.ARCADE );
	  player.body.collideWorldBounds = true;
	  player.body.onCollide = new Phaser.Signal();
	  player.body.onCollide.add(collide1, this);
	  
	//House Health
    HouseHealth = 'House Health : ';
	health = 100; 
    Text = game.add.text(350, 20, HouseHealth + health, { font: '34px Arial', fill: '#fff' });

    Text.anchor.setTo(0.5, 0.5);
	
	time = game.add.text(650, 20, 'Time : ' + i, { font: '34px Arial', fill: '#fff' });

    time.anchor.setTo(0.5, 0.5);
	
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
	
	creatball();	
	creatball2();
	}
	
	//check for overlap
	function checkOverlap(spriteA, spriteB) {

    
	var boundsA = spriteA.getBounds();
  	  
	var boundsB = spriteB.getBounds();
   
	return Phaser.Rectangle.intersects(boundsA, boundsB);

	}
	    function collide2(sprite1, sprite2){
      sprite2.destroy(); // pichu ate cookie
		if(health > 20)
		{
			health = health - 20;
			Text.text = HouseHealth + health;
			creatball();
		}
		else
		{
			ball2.destroy();
			Text.text = HouseHealth + 0;
			music.stop();
		    stateText.text = "Game Over, \n You lasted " + Math.round(i/60) + "s";
			stateText.visible = true;
		}

    }
	
	function creatball()
	{
		ball = game.add.sprite(1200,Math.random() * game.world.height,'ball');
		ball.scale.setTo(0.1,0.1);
		game.physics.arcade.enable(ball);
		ball.body.gravity.y = 300;
		ball.body.velocity.setTo(300+Math.random(), 700+Math.random());
		//adds bounce 
		ball.body.bounce.setTo(1,1);
		//add the wall
		ball.body.collideWorldBounds = true;
		ball.body.onCollide = new Phaser.Signal();		
	}
	
	function creatball2()
	{
		ball2 = game.add.sprite(1200,Math.random() * game.world.height,'ball');
		ball2.scale.setTo(0.1,0.1);
		game.physics.arcade.enable(ball2);
		ball2.body.gravity.y = 300;
		ball2.body.velocity.setTo(400+Math.random(), 800+Math.random());
		//adds bounce 
		ball2.body.bounce.setTo(1,1);
		//add the wall
		ball2.body.collideWorldBounds = true;
		ball2.body.onCollide = new Phaser.Signal();		
	}
	
    function collide1(sprite1, sprite2){
      sprite2.destroy(); 
	  creatball();
	}

	
    function update() {
		
	i = i + 1;
	time.text = 'Time : ' + Math.round(i/60);
		
		player.body.velocity.x = 0;


	        if (button.up.isDown)
        {
          // move sprite down
          player.body.velocity.y -= 50;
        }

        else if (button.down.isDown)
        {
          player.body.velocity.y += 50;
        }

        else if (button.left.isDown)
        {
          player.body.velocity.x -= 400;
        }
        else if (button.right.isDown)
        {
          player.body.velocity.x += 400;
        }
		
		
		game.physics.arcade.collide(player, ball);
		game.physics.arcade.collide(house, ball); 
		
	    if (checkOverlap(player, ball2))
		{
			ball2.destroy();
			creatball2();
		}
		else if (checkOverlap(house, ball2))
		{
	    ball2.destroy(); // pichu ate cookie
		if(health > 20)
		{
			health = health - 20;
			Text.text = HouseHealth + health;
			creatball2();
		}
		else
		{
			ball.destroy();
			Text.text = HouseHealth + 0;
			music.stop();
		    stateText.text = "Game Over, \n You lasted " + Math.round(i/60) + "s";
			stateText.visible = true;
		}
		}

	}
};
