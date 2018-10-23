




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
    lg_bubbles.setAll('type', 'lg_bubble')
    lg_bubbles.forEach(function (bubble){
      bubble.body.setCircle(45);
    })

    //  Add a list of medium bubbles
    md_bubbles = game.add.group();
    md_bubbles.enableBody = true;
    md_bubbles.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    md_bubbles.createMultiple(40, 'wizball');
    md_bubbles.setAll('anchor.x', 0.5);
    md_bubbles.setAll('anchor.y', 0.5);
    md_bubbles.setAll('width', 50);
    md_bubbles.setAll('height', 50);
    md_bubbles.setAll('type', 'md_bubble')
    md_bubbles.forEach(function (bubble){
      // bubble.body.setCircle(25);
    })

    //  Add a list of small bubbles
   sm_bubbles = game.add.group();
   sm_bubbles.enableBody = true;
   sm_bubbles.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 60 of them
   sm_bubbles.createMultiple(60, 'wizball');
   sm_bubbles.setAll('anchor.x', 0.5);
   sm_bubbles.setAll('anchor.y', 0.5);

   sm_bubbles.setAll('width', 20);
   sm_bubbles.setAll('height', 20);
   sm_bubbles.setAll('type', 'sm_bubble')
   sm_bubbles.forEach(function (bubble){
      // bubble.body.setCircle(10);
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
    bb.sprite = game.add.sprite(game.width/2, game.height/2, 'ship');
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

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && bb.sprite.alive)
    {
        bb.fireBullet();
    }

    bb.screenWrap(bb.sprite);

    bullets.forEachExists(this.screenWrap, this);
    lg_bubbles.forEachExists(this.screenWrap, this);
    md_bubbles.forEachExists(this.screenWrap, this);

    bb.checkForBubbleSpawn();

    //check for collisions between bullets and asteroids
    game.physics.arcade.overlap(bullets, sm_bubbles, bb.killBubble, null, this); 
    game.physics.arcade.overlap(bb.sprite, sm_bubbles, bb.killPlayer, null, this); 

    game.physics.arcade.overlap(bullets, lg_bubbles, bb.killBubble, null, this); 
    game.physics.arcade.overlap(bb.sprite, lg_bubbles, bb.killPlayer, null, this); 

    game.physics.arcade.overlap(bullets, md_bubbles, bb.killBubble, null, this); 
    game.physics.arcade.overlap(bb.sprite, md_bubbles, bb.killPlayer, null, this); 
    // game.physics.arcade.collide(lg_bubbles, lg_bubbles, null, null, this); 
  },

  killPlayer: function(player,bubble){
    player.kill();
  },
  killBubble: function(bullet, bubble){
    switch(bubble.type){
      case "lg_bubble":
         this.spawnBubble(bubble.x+30,bubble.y+30,"md_bubble")
         this.spawnBubble(bubble.x-30,bubble.y-30,"md_bubble")
         this.spawnBubble(bubble.x+30,bubble.y-30,"md_bubble")
      break;
      case "md_bubble":
         this.spawnBubble(bubble.x+10,bubble.y+10,"sm_bubble")
         this.spawnBubble(bubble.x-10,bubble.y-10,"sm_bubble")
         this.spawnBubble(bubble.x+10,bubble.y-10,"sm_bubble")
         this.spawnBubble(bubble.x-10,bubble.y+10,"sm_bubble")
      break;

      default:
      break;
    }
      
    

    bullet.kill();
    bubble.kill();
  },

  spawnBubble: function(locx, locy, type){
    console.log("spawning a bubble")
    var bubble;
    var speed_modifier = 1
    switch(type){
      case "lg_bubble":
        bubble = lg_bubbles.getFirstExists(false);
      break;
      case "md_bubble":
        console.log("A medium bubble, actually")
        bubble = md_bubbles.getFirstExists(false);
        speed_modifier = 1.25
      break;
      case "sm_bubble":
        bubble = sm_bubbles.getFirstExists(false);
        speed_modifier = 1.5
      break;
      default:
        bubble = lg_bubbles.getFirstExists(false);
      break;
    }
    if (bubble){
      bubble.reset(locx,locy);
      bubble.body.velocity.x = -40*speed_modifier + game.rnd.integerInRange(0, 80*speed_modifier);
      bubble.body.velocity.y = -40*speed_modifier + game.rnd.integerInRange(0, 80*speed_modifier);
    }
  },

  checkForBubbleSpawn: function(){
    var bb = this;
    var lg_bubble = lg_bubbles.getFirstExists(false);
    if (game.time.now > bb.bubbleSpawnTime){
      if (lg_bubble){
         // console.log("spawning bubble")
          lg_bubble.reset(game.rnd.integerInRange(0, game.width),game.rnd.integerInRange(0, game.height));
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
            bb.bulletTime = game.time.now + 300;
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
   
   // game.debug.physicsGroup(lg_bubbles);
   // game.debug.physicsGroup(md_bubbles);
   // game.debug.physicsGroup(sm_bubbles);
  }
};