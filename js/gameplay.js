




var Gameplay = function(game){

};

Gameplay.prototype = {
 

  create: function() {
    var bb = this;
    game.stage.backgroundColor = "#1509ff";
    
    bb.p1;
    
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

    lg_bubbles.setAll('body.bounce.x', 1);
    lg_bubbles.setAll('body.bounce.y', 1);

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
    md_bubbles.setAll('mass', '0.75')
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
   sm_bubbles.setAll('mass', '0.4')
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
    bb.p1 = game.add.sprite(game.width/2, game.height/2, 'ship');
    bb.p1.lives = 3
    bb.p1.anchor.set(0.5);
    bb.p1.score = 0;
    //  and its physics settings
    game.physics.enable(bb.p1, Phaser.Physics.ARCADE);

    bb.p1.body.drag.set(70);
    bb.p1.body.maxVelocity.set(200);

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
    
      bb.scoreDisplay = game.add.text(100, 100, "100", {
        font: "65px Arial",
        fill: "#ffffff",
        align: "left"
    });

    bb.scoreDisplay.anchor.setTo(0.5, 0.5);

  },
  update: function() {
    var bb = this
  
    if (bb.cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(bb.p1.rotation, 200, bb.p1.body.acceleration);
    }
    else
    {
        bb.p1.body.acceleration.set(0);
    }

    if (bb.cursors.left.isDown)
    {
        bb.p1.body.angularVelocity = -300;
    }
    else if (bb.cursors.right.isDown)
    {
        bb.p1.body.angularVelocity = 300;
    }
    else
    {
        bb.p1.body.angularVelocity = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && bb.p1.alive)
    {
        bb.fireBullet();
    }

    if (bb.p1.invicible) {
      bb.p1.alpha = .4
    } else{
      bb.p1.alpha = 1;
      }



    bb.screenWrap(bb.p1);

    bullets.forEachExists(this.screenWrap, this);
    lg_bubbles.forEachExists(this.screenWrap, this);
    md_bubbles.forEachExists(this.screenWrap, this);

    bb.checkForBubbleSpawn();

    bb.checkForGameOver();

    bb.updateScoreDisplay();


    //check for collisions between bullets and asteroids
    game.physics.arcade.overlap(bullets, sm_bubbles, bb.killBubble, null, this); 
    game.physics.arcade.overlap(bb.p1, sm_bubbles, bb.killPlayer, null, this); 

    game.physics.arcade.overlap(bullets, lg_bubbles, bb.killBubble, null, this); 
    game.physics.arcade.overlap(bb.p1, lg_bubbles, bb.killPlayer, null, this); 

    game.physics.arcade.overlap(bullets, md_bubbles, bb.killBubble, null, this); 
    game.physics.arcade.overlap(bb.p1, md_bubbles, bb.killPlayer, null, this); 
    // game.physics.arcade.collide(lg_bubbles, lg_bubbles, null, null, this); 
    game.physics.arcade.collide(lg_bubbles);
    game.physics.arcade.collide(md_bubbles);
    game.physics.arcade.collide(sm_bubbles);

    game.physics.arcade.collide(sm_bubbles,md_bubbles);
    game.physics.arcade.collide(sm_bubbles,lg_bubbles);
    game.physics.arcade.collide(md_bubbles,lg_bubbles);
  },

  checkForGameOver: function(){
  var bb = this;
  // TODO: Check for 2p mode

  if (!bb.p1.alive && bb.p1.lives >= 0){
    // for now just respawn
    
  } else if (!bb.p1.alive && bb.p1.lives <= 0){
    // game over
    this.game.state.start("Preload");
  }

  },

  updateScoreDisplay: function(){
    var bb = this;
    bb.scoreDisplay.setText(bb.p1.score);
  },

  killPlayer: function(player,bubble){
    if (!player.invicible){
      player.kill();
      player.lives -= 1;

      if (player.lives >= 0){
        game.time.events.add(Phaser.Timer.SECOND * 1, this.respawnPlayer, this).autoDestroy = true;
      }
    }

  },

  respawnPlayer: function(){
    var bb = this;
    bb.p1.reset(game.width/2,game.height/2)
    bb.p1.invicible = true;
    game.time.events.add(Phaser.Timer.SECOND * 2, bb.removeInvincibility, this).autoDestroy = true;
  },

  removeInvincibility: function(){
    var bb = this;
    bb.p1.invicible = false;
  },

  killBubble: function(bullet, bubble){
    var bb = this;
    switch(bubble.type){
      case "lg_bubble":
         bb.p1.score += 100
         this.spawnBubble(bubble.x+30,bubble.y+30,"md_bubble")
         this.spawnBubble(bubble.x-30,bubble.y-30,"md_bubble")
         this.spawnBubble(bubble.x+30,bubble.y-30,"md_bubble")
      break;
      case "md_bubble":
         bb.p1.score += 50
         this.spawnBubble(bubble.x+10,bubble.y+10,"sm_bubble")
         this.spawnBubble(bubble.x-10,bubble.y-10,"sm_bubble")
         this.spawnBubble(bubble.x+10,bubble.y-10,"sm_bubble")
         this.spawnBubble(bubble.x-10,bubble.y+10,"sm_bubble")
      break;
      case "sm_bubble":
         bb.p1.score += 25
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
    var padding = 50;
    var lg_bubble = lg_bubbles.getFirstExists(false);
    if (game.time.now > bb.bubbleSpawnTime){
      if (lg_bubble){
         // console.log("spawning bubble")
          var whichBorder = game.rnd.integerInRange(1,4)
          switch(whichBorder){
            case 1:
              // top border
              console.log("top spawn")
              lg_bubble.reset(game.rnd.integerInRange(0, game.width),0-padding);
              lg_bubble.body.velocity.x = -40 + game.rnd.integerInRange(0, 80);



              lg_bubble.body.velocity.y = 0 + game.rnd.integerInRange(0, 40);




            break;
            case 2:
              // right border
              console.log("right spawn")
              lg_bubble.reset(game.width+padding, game.rnd.integerInRange(0, game.height));
              lg_bubble.body.velocity.x = 0 - game.rnd.integerInRange(0, 40);





              lg_bubble.body.velocity.y = -40 + game.rnd.integerInRange(0, 80);



            break;
            case 3:
              // bottom border
              console.log("bottom spawn")
              lg_bubble.reset(game.rnd.integerInRange(0, game.width),game.height+padding);
              lg_bubble.body.velocity.x = -40 + game.rnd.integerInRange(0, 80);



              lg_bubble.body.velocity.y = 0 - game.rnd.integerInRange(0, 40);




            break;
            case 4:
              // left border
              console.log("left spawn")
              lg_bubble.reset(0-padding,game.rnd.integerInRange(0, game.height));
              lg_bubble.body.velocity.x = 0 + game.rnd.integerInRange(0, 40);



              lg_bubble.body.velocity.y = -40 + game.rnd.integerInRange(0, 80);




            break;
          }

         
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
            bullet.reset(bb.p1.body.x + 16, bb.p1.body.y + 16);
            bullet.lifespan = 2000;
            bullet.owner = bb.b1;
            bullet.rotation = bb.p1.rotation;
            game.physics.arcade.velocityFromRotation(bb.p1.rotation, 400, bullet.body.velocity);
            bb.bulletTime = game.time.now + 300;
        }
    }
  },
  screenWrap:function(sprite){
    var padding = 50;
    if (sprite.x < 0 - padding)
    {
        sprite.x = game.width + padding;
    }
    else if (sprite.x > game.width + padding)
    {
        sprite.x = 0 - padding;
    }

    if (sprite.y < 0 - padding)
    {
        sprite.y = game.height + padding;
    }
    else if (sprite.y > game.height + padding)
    {
        sprite.y = 0 - padding;
    }
  },

  render:function(){
   
   // game.debug.physicsGroup(lg_bubbles);
   // game.debug.physicsGroup(md_bubbles);
   // game.debug.physicsGroup(sm_bubbles);
  }
};