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
			game.load.spritesheet('run', 'assets/run.png',280,400);
			game.load.image('Background', 'assets/road.png');
			game.load.image('car', 'assets/car.png');
			game.load.image('bus', 'assets/bus.png');
			game.load.image('fire', 'assets/fire.png');
			game.load.image('can', 'assets/can.png');
			game.load.image('rock', 'assets/rock.png');
			game.load.image('home', 'assets/home.png');
			game.load.image('bar', 'assets/bar.png');
			
    }
    
   var sprite; 
   var button;
   var background;
   var car;
   var bus;
   var fire;
   var can;
   var rock;
   var i = 0;
   var home;
   var time = ' ';
   var stateText = ' ';
   var distance = 0;
   var progressbar;
   
   
    function create() {
		
		background = game.add.sprite(0, -60, 'Background');
		background.scale.setTo(1,1);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		button = game.input.keyboard.createCursorKeys();
		
		sprite = game.add.sprite(100,200, 'run');
		sprite.scale.setTo(0.3,0.3);
		sprite.frame = 0;
		sprite.animations.add('run', [0, 1, 2, 3], 10, true);
		sprite.animations.play('run');
		sprite.anchor.setTo( 0.5, 0.5 );
		game.physics.enable( sprite, Phaser.Physics.ARCADE );
		sprite.body.collideWorldBounds = true;
		sprite.body.onCollide = new Phaser.Signal();
		
		time = game.add.text(650, 20, 'Time : ' + i, { font: '34px Arial', fill: '#fff' });

		time.anchor.setTo(0.5, 0.5);
		
		stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
		stateText.anchor.setTo(0.5, 0.5);
		
		stateText.text = "Go Home " ;
		stateText.visible = true;
		
		
    }
	
	function createHome() {
		home = game.add.sprite(800, 350*Math.random(), 'home');
		home.scale.setTo(0.4,0.4);
		game.physics.arcade.enable(home);
		home.body.velocity.x = -150;
		home.body.onCollide = new Phaser.Signal();
		home.body.onCollide.add(collide1, this);
	}
	
    function createCar() {
		car = game.add.sprite(800, 350*Math.random(), 'car');
		car.scale.setTo(0.5,0.5);
		game.physics.arcade.enable(car);
		car.body.velocity.x = -150;
		car.body.onCollide = new Phaser.Signal();
		car.body.onCollide.add(collide2, this);
	}
    function createBus() {
		bus = game.add.sprite(800, 100*Math.random()+300, 'bus');
		bus.scale.setTo(0.5,0.5);
		game.physics.arcade.enable(bus);
		bus.body.velocity.x = -150;
		bus.body.onCollide = new Phaser.Signal();
		bus.body.onCollide.add(collide2, this);
	}
    function createFire() {
		fire = game.add.sprite(800, 200*Math.random()+100, 'fire');
		fire.scale.setTo(0.05,0.05);
		game.physics.arcade.enable(fire);
		fire.body.velocity.x = -150;
		fire.body.onCollide = new Phaser.Signal();
		fire.body.onCollide.add(collide2, this);
	}
    function createCan() {
		can = game.add.sprite(800, 250*Math.random(), 'can');
		can.scale.setTo(0.3,0.3);
		game.physics.arcade.enable(can);
		can.body.velocity.x = -150;
		can.body.onCollide = new Phaser.Signal();
		can.body.onCollide.add(collide2, this);
	}
    function createRock() {
		rock = game.add.sprite(800, 150*Math.random()+400, 'rock');
		rock.scale.setTo(0.3,0.3);
		game.physics.arcade.enable(rock);
		rock.body.velocity.x = -150;
		rock.body.onCollide = new Phaser.Signal();
		rock.body.onCollide.add(collide2, this);
	}
	
	
	function checkOverlap(spriteA, spriteB) {

    
	var boundsA = spriteA.getBounds();
  	  
	var boundsB = spriteB.getBounds();
   
	return Phaser.Rectangle.intersects(boundsA, boundsB);

	}
	
	function collide1(sprite1, sprite2){
      sprite1.destroy();
	  stateText.text = "You Won \n You Made it home " ;
	  stateText.visible = true;
	  if(car != null)
	  car.destroy();
      if(can != null)
	  can.destroy();
      if(bus != null)
	  bus.destroy();
	  if(fire != null)
	  fire.destroy();	  
	}
	function collide2(sprite1, sprite2){
	  
	  stateText.text = "Go Over \n You did not \n make it home " ;
	  stateText.visible = true;
      sprite2.destroy();
	  if(car != null)
	  car.destroy();
      if(can != null)
	  can.destroy();
      if(bus != null)
	  bus.destroy();
	  if(fire != null)
	  fire.destroy();
	}
    
    function update() {
		
		if (sprite != null){
		sprite.body.velocity.y = 0;
		sprite.body.velocity.x = 0;
		}
		
		i += 1;
		distance += 1;
		if((distance/60) < 20){
		progressbar = game.add.sprite(50+ (distance/4),10, 'bar');
		progressbar.scale.setTo(0.05,0.2);
		}
		
		time.text = 'Home ';
		
		if(Math.round(distance/60) == 3)
			stateText.visible = false;

		if (button.up.isDown)
        {
          // move sprite down
          sprite.body.velocity.y -= 300;
        }

        else if (button.down.isDown)
        {
          sprite.body.velocity.y += 300;
        }
	    else if (button.left.isDown)
        {
          sprite.body.velocity.x -= 300;
        }
        else if (button.right.isDown)
        {
          sprite.body.velocity.x += 300;
        }
		
		if(Math.round(i/60) == 2 && car == null)
		{
			createCar();
		}
		else if(Math.round(i/60) == 3 && bus == null)
		{
			createBus();
		}
		else if(Math.round(i/60) == 4 && fire == null)
		{
			createFire();
		}
		else if(Math.round(i/60) == 5 && can == null)
		{
			createCan();
		}
		else if(Math.round(i/60) == 6 && rock == null)
		{
			createRock();
		}
		else if(Math.round(distance/60) == 20 && home == null)
		{
			createHome();
		}
		
		if((Math.round(i/60) == 8))
		{
			car = null;
			bus = null;
			fire = null;
			can = null;
			rock = null;
			i =0; 
		}
		
		if(car != null)
		game.physics.arcade.collide(sprite, car);
		if(bus != null)
		game.physics.arcade.collide(sprite, bus);
		if(fire != null)
		game.physics.arcade.collide(sprite, fire);
		if(rock != null)
		game.physics.arcade.collide(sprite, rock);
		if(can != null)
		game.physics.arcade.collide(sprite, can);
		if(home != null)
		game.physics.arcade.collide(sprite, home);
		
	

    }
};
