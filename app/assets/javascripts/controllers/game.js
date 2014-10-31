function GameController() {
  var player;
  var platforms;
  var cursors;
  var spacebar;
  var shootWeapon; 
  var stars;
  var score = 0;
  var scoreText;
  var world;
  var game;
}

GameController.prototype.run = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: this.preload, create: this.create, update: this.update, render: this.render });
}

GameController.prototype.preload = function() {
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

GameController.prototype.create = function() {
  // World driver code
  world = new World();
  world.setCanvas(game, 0, 0, 2400, 600);

  game.input.onDown.add(world.setFullscreen, game);
  // window.onload.game.add(world.setFullscreen, this);

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    var sky = game.add.sprite(0, 0, 'sky');
    sky.scale.setTo(10,1);

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        //  A simple background for our game
        game.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();


        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      
    ground.scale.setTo(10, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;


        //  Now let's create two ledges
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        // The player and its settings
        // player = game.add.sprite(100, game.world.height - 150, 'dude');
        // player = game.add.asteria(32, game.world.height - 150, 'dude');
        // player = new Asteria(game, 32, game.world.height - 150);
        // game.world.add(player);
        asteria = new Asteria(game, 32, game.world.height - 150);
        player = asteria.sprite;

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);


    // set camera follow
    // game.camera.follow(player);
    // game.camera.follow(player, 2);
    world.setCamera(game, player);
    // style = 'STYLE_PLATFORMER';

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

        asteria.entersTheScene();
        asteria.setMotions();
        //  Player physics properties. Give the little guy a slight bounce.
        // player.body.bounce.y = 0.2;
        // player.body.gravity.y = 300;
        // player.body.collideWorldBounds = true;


        // //  Our two animations, walking left and right.
        // player.animations.add('left', [0, 1, 2, 3], 10, true);
        // player.animations.add('right', [5, 6, 7, 8], 10, true);

        //  Finally some stars to collect
        stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 0, 'star');


    //  Here we'll create 12 of them evenly spaced apart
   

    // rainStars(game.camera.x);

    

   
            //  Let gravity do its thing
            star.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        //  The score
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        // console.log(x);
        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        // console.log(cursors)
        spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.startFullScreen();
        // this.stars = stars;
    }
GameController.prototype.update = function() {
        // stars = this.stars;

        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);

    collectStar = function(player, star) {

        // Removes the star from the screen
        console.log(star);
        star.kill();
        console.log(this);
        //  Add and update the score
        // score += 10;
        // scoreText.text = 'Score: ' + score;

    }
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(player, stars, collectStar, null, game);


  
    if (player.position.x === 600) {
      rainStar();
    };

    //  Collide the player and the stars with the platforms
    // game.physics.arcade.collide(player, platforms);
    // game.physics.arcade.collide(stars, platforms);

        asteria.setVelocityX(0);

        // console.log(cursors);
        if(cursors.left.isDown){
            asteria.moveLeft();
        }
        else if(cursors.right.isDown){
            asteria.moveRight();
        }
        else {
            asteria.standStill();
        }

        //  Allow the player to jump if they are touching the ground.
        if (spacebar.isDown && player.body.touching.down){
            asteria.jump();
        }

    
}

GameController.prototype.render = function() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}