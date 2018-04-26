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
		sprite.body.onCollide.add(collide1, this);
		

		
    }
	
	function createHome() {
		home = game.add.sprite(800, 350*Math.random(), 'home');
		home.scale.setTo(0.4,0.4);
		game.physics.arcade.enable(home);
		home.body.velocity.x = -100;
		home.body.onCollide = new Phaser.Signal();
		home.body.onCollide.add(collide1, this);
	}
	
    function createCar() {
		car = game.add.sprite(800, 350*Math.random(), 'car');
		car.scale.setTo(0.5,0.5);
		game.physics.arcade.enable(car);
		car.body.velocity.x = -100;
		car.body.onCollide = new Phaser.Signal();
		car.body.onCollide.add(collide1, this);
	}
    function createBus() {
		bus = game.add.sprite(800, 100*Math.random(), 'bus');
		bus.scale.setTo(0.5,0.5);
		game.physics.arcade.enable(bus);
		bus.body.velocity.x = -100;
		bus.body.onCollide = new Phaser.Signal();
		bus.body.onCollide.add(collide1, this);
	}
    function createFire() {
		fire = game.add.sprite(800, 200*Math.random(), 'fire');
		fire.scale.setTo(0.05,0.05);
		game.physics.arcade.enable(fire);
		fire.body.velocity.x = -100;
		fire.body.onCollide = new Phaser.Signal();
		fire.body.onCollide.add(collide1, this);
	}
    function createCan() {
		can = game.add.sprite(800, 250*Math.random(), 'can');
		can.scale.setTo(0.3,0.3);
		game.physics.arcade.enable(can);
		can.body.velocity.x = -100;
		can.body.onCollide = new Phaser.Signal();
		can.body.onCollide.add(collide1, this);
	}
    function createRock() {
		rock = game.add.sprite(800, 150*Math.random(), 'rock');
		rock.scale.setTo(0.3,0.3);
		game.physics.arcade.enable(rock);
		rock.body.velocity.x = -100;
		rock.body.onCollide = new Phaser.Signal();
		rock.body.onCollide.add(collide1, this);
	}
	
		function collide1(sprite1, sprite2){
         sprite.destroy(); 
	}
	
		function checkOverlap(spriteA, spriteB) {

    
	var boundsA = spriteA.getBounds();
  	  
	var boundsB = spriteB.getBounds();
   
	return Phaser.Rectangle.intersects(boundsA, boundsB);

	}
    
    function update() {
		
		sprite.body.velocity.y = 0;
		sprite.body.velocity.x = 0;
		
		i += 1;
		i = Math.round(i/60);
		

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
		
		if(i == 1)
		{
			createCar();
		}
		else if(i == 2)
		{
			createBus();
		}
		else if(i == 3)
		{
			createFire();
		}
		else if(i == 4)
		{
			createCan();
		}
		else if(i == 5)
		{
			createRock();
		}
		
		if (checkOverlap(sprite,car) && car == null)
		{
			sprite.destroy();
		}
		if (checkOverlap(sprite,bus) && bus != null)
		{
			sprite.destroy();
		}
		if (checkOverlap(sprite,fire)&& fire != null)
		{
			sprite.destroy();
		}
		if (checkOverlap(sprite,can)&& can != null)
		{
			sprite.destroy();
		}
		if (checkOverlap(sprite,rock)&& rock != null)
		{
			sprite.destroy();
		}
		if (checkOverlap(sprite,home)&& home != null)
		{
			sprite.destroy();
		}
    }
};
