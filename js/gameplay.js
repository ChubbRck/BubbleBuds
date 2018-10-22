




var Gameplay = function(game){

};

Gameplay.prototype = {
 

  create: function() {
    var bb = this;
    game.stage.backgroundColor = "#1509ff";
    
    bb.sprite;
    bb.cursors = null;

    bb.bullet;
    bb.bullets;
    bb.bulletTime = 0;
    bb.bubbleSpawnTime = 10000
    bb.bubbleSpawnRate = 5000
    

    //  This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    //  We need arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A spacey background
    // game.add.tileSprite(0, 0, game.width, game.height, 'space');

    //  Add a list of large bubbles
    lg_bubbles = game.add.group();
    lg_bubbles.enableBody = true;
    lg_bubbles.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 20 of them
    lg_bubbles.createMultiple(20, 'wizball');
    lg_bubbles.setAll('anchor.x', 0.5);
    lg_bubbles.setAll('anchor.y', 0.5);
    
    lg_bubbles.forEach(function (bubble){
      bubble.body.setCircle(45);
    })


    //  Our ships bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    bullets.createMultiple(40, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);

    //  Our player ship
    bb.sprite = game.add.sprite(300, 300, 'ship');
    bb.sprite.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(bb.sprite, Phaser.Physics.ARCADE);

    bb.sprite.body.drag.set(100);
    bb.sprite.body.maxVelocity.set(200);

    //  Game input
    bb.cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    // create a test large asteroid
    
    var lg_bubble = lg_bubbles.getFirstExists(false);

    if (lg_bubble)
    {
        lg_bubble.reset(200,200);
        lg_bubble.body.velocity.x = -40 + Math.random(80);
        lg_bubble.body.velocity.y = -40 + Math.random(80);
    }
    

  },
  update: function() {
    var bb = this
  
    if (bb.cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(bb.sprite.rotation, 200, bb.sprite.body.acceleration);
    }
    else
    {
        bb.sprite.body.acceleration.set(0);
    }

    if (bb.cursors.left.isDown)
    {
        bb.sprite.body.angularVelocity = -300;
    }
    else if (bb.cursors.right.isDown)
    {
        bb.sprite.body.angularVelocity = 300;
    }
    else
    {
        bb.sprite.body.angularVelocity = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        bb.fireBullet();
    }

    bb.screenWrap(bb.sprite);

    bullets.forEachExists(this.screenWrap, this);
    lg_bubbles.forEachExists(this.screenWrap, this);

    bb.checkForBubbleSpawn();

    //check for collisions between bullets and asteroids
    game.physics.arcade.overlap(bullets, lg_bubbles, bb.killBubble, null, this); 
    game.physics.arcade.overlap(bb.sprite, lg_bubbles, bb.killPlayer, null, this); 
  },

  killPlayer: function(player,bubble){
    player.kill();
  },
  killBubble: function(bullet, bubble){
    bubble.kill();
  },

  checkForBubbleSpawn: function(){
    var bb = this;
    var lg_bubble = lg_bubbles.getFirstExists(false);
    if (game.time.now > bb.bubbleSpawnTime){
      if (lg_bubble){
          console.log("spawning bubble")
          lg_bubble.reset(game.rnd.integerInRange(0, 1200),game.rnd.integerInRange(0, 600));
          lg_bubble.body.velocity.x = -40 + game.rnd.integerInRange(0, 80);
          lg_bubble.body.velocity.y = -40 + game.rnd.integerInRange(0, 80);
          bb.bubbleSpawnTime = game.time.now + bb.bubbleSpawnRate
      }
    }
  },

  fireBullet: function(){
    var bb = this;
    if (game.time.now > bb.bulletTime){
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(bb.sprite.body.x + 16, bb.sprite.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = bb.sprite.rotation;
            game.physics.arcade.velocityFromRotation(bb.sprite.rotation, 400, bullet.body.velocity);
            bb.bulletTime = game.time.now + 100;
        }
    }
  },
  screenWrap:function(sprite){

    if (sprite.x < 0)
    {
        sprite.x = game.width;
    }
    else if (sprite.x > game.width)
    {
        sprite.x = 0;
    }

    if (sprite.y < 0)
    {
        sprite.y = game.height;
    }
    else if (sprite.y > game.height)
    {
        sprite.y = 0;
    }
  },

  render:function(){
   
   game.debug.physicsGroup(lg_bubbles);
  }
};