




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
      bubble.body.setCircle(57);
    })

    lg_bubbles.setAll('body.bounce.x', 1);
    lg_bubbles.setAll('body.bounce.y', 1);

    //  Add a list of medium bubbles
    md_bubbles = game.add.group();
    md_bubbles.enableBody = true;
    md_bubbles.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    md_bubbles.createMultiple(40, 'md_bubble');
    md_bubbles.setAll('anchor.x', 0.5);
    md_bubbles.setAll('anchor.y', 0.5);
    md_bubbles.setAll('width', 50);
    md_bubbles.setAll('height', 50);
    md_bubbles.setAll('type', 'md_bubble')
    md_bubbles.setAll('mass', '0.75')
    md_bubbles.forEach(function (bubble){
      bubble.body.setCircle(25);
    })

  
    //  Add a list of small bubbles
   sm_bubbles = game.add.group();
   sm_bubbles.enableBody = true;
   sm_bubbles.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 60 of them
   sm_bubbles.createMultiple(200, 'sm_bubble');
   sm_bubbles.setAll('anchor.x', 0.5);
   sm_bubbles.setAll('anchor.y', 0.5);

   sm_bubbles.setAll('width', 25);
   sm_bubbles.setAll('height', 25);
   sm_bubbles.setAll('type', 'sm_bubble')
   sm_bubbles.setAll('mass', '0.4')
   sm_bubbles.forEach(function (bubble){
      bubble.body.setCircle(12);
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
    bb.p1.width = 89;
    bb.p1.height = 96;
    bb.p1.scale.setTo(0.5)
    bb.p1.lives = 3
    bb.p1.anchor.set(0.5);
    game.p1score = 0;

    bb.p1.liveDisplay_one = game.add.sprite(game.width - 200, 50, 'ship')
    bb.p1.liveDisplay_one.anchor.x = 0.5
    bb.p1.liveDisplay_one.anchor.y = 0.5
    bb.p1.liveDisplay_one.scale.setTo(0.25)
    bb.p1.liveDisplay_one.angle = -90

    bb.p1.liveDisplay_two = game.add.sprite(game.width - 166, 50, 'ship')
    bb.p1.liveDisplay_two.anchor.x = 0.5
    bb.p1.liveDisplay_two.anchor.y = 0.5
    bb.p1.liveDisplay_two.scale.setTo(0.25)
    bb.p1.liveDisplay_two.angle = -90

    bb.p1.liveDisplay_three = game.add.sprite(game.width - 133, 50, 'ship')
    bb.p1.liveDisplay_three.anchor.x = 0.5
    bb.p1.liveDisplay_three.anchor.y = 0.5
    bb.p1.liveDisplay_three.scale.setTo(0.25)
    bb.p1.liveDisplay_three.angle = -90
    
    //  and its physics settings
    game.physics.enable(bb.p1, Phaser.Physics.ARCADE);

    bb.p1.body.drag.set(50);
    bb.p1.body.maxVelocity.set(200);

    //  Game input
    bb.cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    if (game.whichMode == 1){

    bb.p2 = game.add.sprite(20, game.height/2, 'player2');
    // bb.p2.width = 89;
    // bb.p2.height = 96;

    bb.p2.scale.setTo(0.5)
    bb.p2.lives = 3
    bb.p2.padding = 25;
    bb.p2.x = bb.p2.padding;
    bb.p2.border = 3;
    bb.p2.anchor.x = (0.5);
    bb.p2.anchor.y = 0.5 
    game.p2score = 0;

    bb.p2.liveDisplay_one = game.add.sprite( 200, 50, 'player2_sm')
    bb.p2.liveDisplay_one.anchor.x = 0.5
    bb.p2.liveDisplay_one.anchor.y = 0.5
    bb.p2.liveDisplay_one.scale.setTo(0.5)
    // bb.p2.liveDisplay_one.angle = -90

    bb.p2.liveDisplay_two = game.add.sprite(166, 50, 'player2_sm')
    bb.p2.liveDisplay_two.anchor.x = 0.5
    bb.p2.liveDisplay_two.anchor.y = 0.5
    bb.p2.liveDisplay_two.scale.setTo(0.5)
    // bb.p2.liveDisplay_two.angle = -90

    bb.p2.liveDisplay_three = game.add.sprite(133, 50, 'player2_sm')
    bb.p2.liveDisplay_three.anchor.x = 0.5
    bb.p2.liveDisplay_three.anchor.y = 0.5
    bb.p2.liveDisplay_three.scale.setTo(0.5)
    // bb.p2.liveDisplay_three.angle = -90
    
      game.physics.enable(bb.p2, Phaser.Physics.ARCADE);
    // bb.p2.body.setSize(200,200)
  game.input.keyboard.addKeyCapture([ Phaser.Keyboard.W ]);
  game.input.keyboard.addKeyCapture([ Phaser.Keyboard.A ]);
  game.input.keyboard.addKeyCapture([ Phaser.Keyboard.S ]);
  game.input.keyboard.addKeyCapture([ Phaser.Keyboard.D ]);
  fireBoulderKey = game.input.keyboard.addKey(Phaser.Keyboard.Q );
// confirmKey_1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  fireBoulderKey.onDown.add(function(){this.chargeBoulder()}, this);
    
  fireBoulderKey.onUp.add(function(){this.fireBoulder()}, this);
    }
    // Let's spawn 5 big asteroids to start

    var padding = 50;
    var lg_bubble_one = lg_bubbles.getFirstDead();

    if (lg_bubble_one)
    {
        lg_bubble_one.reset(0-padding,game.height/2);
        lg_bubble_one.body.velocity.x = game.rnd.integerInRange(0, 40);
        lg_bubble_one.body.velocity.y = -40 + game.rnd.integerInRange(0, 80);
    }

    var lg_bubble_two = lg_bubbles.getFirstDead();

    if (lg_bubble_two)
    {
        lg_bubble_two.reset(game.width+padding,game.height/2);
        lg_bubble_two.body.velocity.x = -1 * game.rnd.integerInRange(0, 40);
        lg_bubble_two.body.velocity.y = -40 + game.rnd.integerInRange(0, 80);
    }

    var lg_bubble_three = lg_bubbles.getFirstDead();

    if (lg_bubble_three)
    {
        lg_bubble_three.reset(game.width/2,0-padding);
        lg_bubble_three.body.velocity.x = -40 + game.rnd.integerInRange(0, 80);
        lg_bubble_three.body.velocity.y =  game.rnd.integerInRange(0, 40);
    }

    var lg_bubble_four = lg_bubbles.getFirstDead();

    if (lg_bubble_four)
    {
        lg_bubble_four.reset(game.width/2,game.height+padding);
        lg_bubble_four.body.velocity.x = -40 + game.rnd.integerInRange(0, 80);
        lg_bubble_four.body.velocity.y = -1 * game.rnd.integerInRange(0, 40);
    }

      // Add a list of explosions 
    explosions = game.add.group();
    explosions.createMultiple(20, 'explosion');
    explosions.setAll('anchor.x', 0.5)
    explosions.setAll('anchor.y', 0.5)

  
      bb.scoreDisplay = game.add.text(100, 50, "0", {
        font: "32px Futura",
        fill: "#ffffff",
        align: "left"
    });

    bb.scoreDisplay.anchor.setTo(0, 0.5);
    if (game.whichMode == 1){
      bb.scoreDisplay.alpha = 0;
    }
  },
  update: function() {
    var bb = this
    
    var p2speed = 5;
    if (game.whichMode == 1){
      if (game.input.keyboard.isDown(Phaser.Keyboard.W) &&( bb.p2.border == 3 || bb.p2.border == 1)){
        bb.p2.y -= p2speed;
        this.checkBorderChange()
      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && (bb.p2.border == 3 || bb.p2.border == 1)){
        bb.p2.y += p2speed;  
        this.checkBorderChange()
      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.A) && (bb.p2.border == 0 || bb.p2.border == 2)){
        bb.p2.x -= p2speed;  
        this.checkBorderChange()
      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.D)&& (bb.p2.border == 0 || bb.p2.border == 2)){
        bb.p2.x += p2speed; 
        this.checkBorderChange()
      }

      // if (game.input.keyboard.isDown(Phaser.Keyboard.Q)){
      //   this.fireBoulder();
      // }
     

      
    }
    



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

    if (game.whichMode == 1){
      if (bb.p2.invicible) {
        bb.p2.alpha = .4
      } else{
        bb.p2.alpha = 1;
      }
    }


    
      bb.screenWrap(bb.p1);
    

    if (game.whichMode == 0){
      bullets.forEachExists(this.screenWrap, this);
    }

    lg_bubbles.forEachExists(this.screenWrap, this);
    md_bubbles.forEachExists(this.screenWrap, this);

    explosions.forEachExists(this.manageExplosions, this);

    if (game.whichMode == 0){
      bb.checkForBubbleSpawn();
    }

    bb.checkForGameOver();

    bb.updateScoreDisplay();


    //check for collisions between bullets and asteroids
    game.physics.arcade.overlap(bullets, sm_bubbles, bb.killBubble, null, this); 
    game.physics.arcade.overlap(bb.p1, sm_bubbles, bb.killPlayer, null, this); 

    game.physics.arcade.overlap(bullets, lg_bubbles, bb.killBubble, null, this); 
    game.physics.arcade.overlap(bb.p1, lg_bubbles, bb.killPlayer, null, this); 

    game.physics.arcade.overlap(bullets, md_bubbles, bb.killBubble, null, this); 

    

    game.physics.arcade.overlap(bb.p1, md_bubbles, bb.killPlayer, null, this); 

    if (game.whichMode == 1){
     
      game.physics.arcade.overlap(bb.p2, bullets, bb.killPlayerTwo, null, this); 
      game.physics.arcade.overlap(bb.p1, bb.p2, bb.killPlayer, null, this); 
    }
    // game.physics.arcade.collide(lg_bubbles, lg_bubbles, null, null, this); 
    // game.physics.arcade.collide(lg_bubbles);
    // game.physics.arcade.collide(md_bubbles);
    // game.physics.arcade.collide(sm_bubbles);

    // game.physics.arcade.collide(sm_bubbles,md_bubbles);
    // game.physics.arcade.collide(sm_bubbles,lg_bubbles);
    // game.physics.arcade.collide(md_bubbles,lg_bubbles);
  },

  chargeBoulder: function(){
    var bb = this;
    bb.p2.pressTime = game.time.now;
  },

  fireBoulder: function(){
    var bb = this;
    var duration = game.time.now - bb.p2.pressTime;
    var speed_modifier;
        var boulder; 
      if (game.time.now - bb.p2.lastFire < 200){
        return;
      }
        if (duration > 1000){
          boulder = lg_bubbles.getFirstDead();
          speed_modifier = 2;
        }
          else if (duration > 500){
            boulder = md_bubbles.getFirstDead();
            speed_modifier = 3;
          } else{
            boulder = sm_bubbles.getFirstDead();
            speed_modifier = 4;
          }

        if (boulder)
        {
            bb.p2.lastFire = game.time.now;
            boulder.reset(bb.p2.x, bb.p2.y);
            switch (bb.p2.border){
              case 0:
               boulder.body.velocity.x = -10*speed_modifier + game.rnd.integerInRange(0, 20*speed_modifier);
               boulder.body.velocity.y = 20*speed_modifier
              break;
              case 1:
               boulder.body.velocity.y = -10*speed_modifier + game.rnd.integerInRange(0, 20*speed_modifier);
               boulder.body.velocity.x = -20*speed_modifier
              break;
              case 2:
                boulder.body.velocity.x = -10*speed_modifier + game.rnd.integerInRange(0, 20*speed_modifier);
               boulder.body.velocity.y = -20*speed_modifier
              break;
              case 3:
              boulder.body.velocity.y = -10*speed_modifier + game.rnd.integerInRange(0, 20*speed_modifier);
               boulder.body.velocity.x = 20*speed_modifier
              break;

            }
            

         
        }
    
  },

  checkBorderChange: function(){
    var bb = this;
    var borderJustChanged = false
    // if (bb.p2.x > game.width - bb.p2.padding){
    //   if (!borderJustChanged && bb.p2.border == 0){
    //     bb.p2.border = 1
        
    //     bb.p2.x = game.width - bb.p2.padding - 1
    //     bb.p2.y = bb.p2.padding + 5
    //     console.log(bb.p2.y)

    //   }
    // }
    if (bb.p2.x < bb.p2.padding){
      if (!borderJustChanged && bb.p2.border == 0){
        bb.p2.border = 3
        
        bb.p2.x = bb.p2.padding + 1
        bb.p2.y = bb.p2.padding+10
        bb.p2.angle = 0
        // bb.p2.body.rotation = 0
        // if (bb.p2.body){
        bb.p2.body.setSize(53,207,0,0)
        // }
      

      }
    }

     if (bb.p2.x > game.width - bb.p2.padding){
      if (!borderJustChanged && bb.p2.border == 0){
        bb.p2.border = 1
        
        bb.p2.x = game.width - bb.p2.padding - 1
        bb.p2.y = bb.p2.padding+10
        bb.p2.angle = 180
        // bb.p2.body.rotation = 180
         bb.p2.body.setSize(53,207,0,0)
      }
    }


     if (bb.p2.x > game.width - bb.p2.padding){
      if (!borderJustChanged && bb.p2.border == 2){
        bb.p2.border = 1
        
        bb.p2.x = game.width - bb.p2.padding - 1
        bb.p2.y = game.height - bb.p2.padding - 10
        bb.p2.angle = 180
        // bb.p2.body.rotation = 180
         bb.p2.body.setSize(53,207,0,0)

      }
    }

     if (bb.p2.x < bb.p2.padding){
      if (!borderJustChanged && bb.p2.border == 2){
        bb.p2.border = 3
        
        bb.p2.x = bb.p2.padding + 1
        bb.p2.y = game.height-bb.p2.padding-20
        bb.p2.angle = 0
        // bb.p2.body.rotation = 0
         bb.p2.body.setSize(53,207,0,0)
      }
    }


    if (bb.p2.y < bb.p2.padding){
      if (!borderJustChanged && bb.p2.border == 1){
        bb.p2.border = 0
        
        bb.p2.y = bb.p2.padding + 1
        bb.p2.x = game.width - bb.p2.padding - 20;
        bb.p2.angle = 90
        // bb.p2.body.rotation = 90
         bb.p2.body.setSize(207,53, -50,50)

      }
    }

    if (bb.p2.y > game.height - bb.p2.padding){
      if (!borderJustChanged && bb.p2.border == 3){
        bb.p2.border = 2
        
        bb.p2.y = game.height - bb.p2.padding - 1
        bb.p2.x = bb.p2.padding + 20;
        bb.p2.angle = -90
        // bb.p2.body.rotation = -90
        bb.p2.body.setSize(207,53, -50,100)

      }
    }

    if (bb.p2.y > game.height - bb.p2.padding){
      if (!borderJustChanged && bb.p2.border == 1){
        bb.p2.border = 2
        
        bb.p2.y = game.height - bb.p2.padding - 1
        bb.p2.x = game.width - bb.p2.padding - 20;
        bb.p2.angle = -90
        // bb.p2.body.rotation = -90
        bb.p2.body.setSize(207,53, -50,100)

      }
    }

    if (bb.p2.y < bb.p2.padding){
      console.log(bb.p2.y)
      if (!borderJustChanged && bb.p2.border == 3){
        bb.p2.border = 0
        
        bb.p2.y = bb.p2.padding + 1
        bb.p2.x = bb.p2.padding+20
        bb.p2.angle = 90
        // bb.p2.body.rotation = 90
        bb.p2.body.setSize(207,53, -50,50)

        console.log(bb.p2.y)
      }
    }

  },

  checkForGameOver: function(){
  var bb = this;
  // console.log(bb.p2.border)
  // TODO: Check for 2p mode

  if (!bb.p1.alive && bb.p1.lives >= 0){
    // for now just respawn
    
  } else if (!bb.p1.alive && bb.p1.lives <= 0){
    // game over
   // this.game.state.start("Preload");
   if (game.whichMode == 1){
    game.winner = 2;
   }
    this.game.state.start("GameOver");
  }

  if (game.whichMode == 1){

     if (!bb.p2.alive && bb.p2.lives <= 0){
      game.winner = 1;
      this.game.state.start("GameOver")
     }
  }

  },

  updateScoreDisplay: function(){
    var bb = this;
    bb.scoreDisplay.setText(game.p1score);
  },

  killPlayerTwo: function(player, bullet){
    if (!player.invicible){
      this.fireExplosion(player.x, player.y)
      player.kill();
      player.lives -= 1;

      if (player.lives == 2){
        this.p2.liveDisplay_three.alpha = 0;
      }
      if (player.lives == 1){
        this.p2.liveDisplay_two.alpha = 0;
      }

      if (player.lives == 0){
        this.p2.liveDisplay_one.alpha = 0;
      }

      if (player.lives >= 0){
        game.time.events.add(Phaser.Timer.SECOND * 1, this.respawnPlayerTwo, this).autoDestroy = true;
      }
    }
  },

  killPlayer: function(player,bubble){
    if (!player.invicible){
      this.fireExplosion(player.x, player.y)
      player.kill();
      player.lives -= 1;

      if (player.lives == 2){
        this.p1.liveDisplay_three.alpha = 0;
      }

      if (player.lives == 1){
        this.p1.liveDisplay_two.alpha = 0;
      }

      if (player.lives == 0){
        this.p1.liveDisplay_one.alpha = 0;
      }

      if (player.lives >= 0){
        game.time.events.add(Phaser.Timer.SECOND * 1, this.respawnPlayer, this).autoDestroy = true;
      }
    }

  },
  respawnPlayerTwo: function(){
    var bb = this;
    var whichBorder = game.rnd.integerInRange(1, 4) - 1;
    var newX;
    var newY;
    console.log("which border" + whichBorder);
    switch (whichBorder){
      case 0:
      newY = bb.p2.padding + 1;
      newX = game.rnd.integerInRange(bb.p2.padding*3,game.width-bb.p2.padding*3)
      bb.p2.angle = 90

      break;
      case 1:
      newX = game.width - bb.p2.padding - 1;
      newY= game.rnd.integerInRange(bb.p2.padding*3,game.height-bb.p2.padding*3)
      bb.p2.angle = 180

      break;
      case 2:
      newY = game.height - bb.p2.padding - 1;
      newX = game.rnd.integerInRange(bb.p2.padding*3,game.width-bb.p2.padding*3)
      bb.p2.angle = -90;

      break;
      case 3:
      newX = bb.p2.padding + 1;
      newY = game.rnd.integerInRange(bb.p2.padding*3,game.height-bb.p2.padding*3)
      bb.p2.angle = 0;

      break;
    }

    bb.p2.reset(newX, newY)
    bb.p2.border = whichBorder;
    bb.p2.invicible = true;
    game.time.events.add(Phaser.Timer.SECOND * 2, bb.removeInvincibilityPlayerTwo, this).autoDestroy = true;
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
  removeInvincibilityPlayerTwo: function(){
    var bb = this;
    bb.p2.invicible = false;
  },

  killBubble: function(bullet, bubble){
    var bb = this;
    switch(bubble.type){
      case "lg_bubble":
         game.p1score += 100
         this.spawnBubble(bubble.x+30,bubble.y+30,"md_bubble")
         this.spawnBubble(bubble.x-30,bubble.y-30,"md_bubble")
         this.spawnBubble(bubble.x+30,bubble.y-30,"md_bubble")
      break;
      case "md_bubble":
         game.p1score += 50
         this.spawnBubble(bubble.x+10,bubble.y+10,"sm_bubble")
         this.spawnBubble(bubble.x-10,bubble.y-10,"sm_bubble")
         this.spawnBubble(bubble.x+10,bubble.y-10,"sm_bubble")
         this.spawnBubble(bubble.x-10,bubble.y+10,"sm_bubble")
      break;
      case "sm_bubble":
         game.p1score += 25
      break;
      default:
      break;
    }
      
    
    this.fireExplosion(bubble.x,bubble.y)
    bullet.kill();
    bubble.kill();
  },

  spawnBubble: function(locx, locy, type){
    console.log("spawning a bubble")
    var bubble;
    var speed_modifier = 2
    switch(type){
      case "lg_bubble":
        bubble = lg_bubbles.getFirstDead();
      break;
      case "md_bubble":
        console.log("A medium bubble, actually")
        bubble = md_bubbles.getFirstDead();
        speed_modifier = 3
      break;
      case "sm_bubble":
        bubble = sm_bubbles.getFirstDead();
        speed_modifier = 4
      break;
      default:
        bubble = lg_bubbles.getFirstDead();
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
    var lg_bubble = lg_bubbles.getFirstDead();
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
          bb.bubbleSpawnRate -= 50;
          console.log("spa2ned more bubs. Rate is now " +bb.bubbleSpawnRate)
          if (bb.bubbleSpawnRate < 1000){
            bb.bubbleSpawnRate == 1000
          }
      }
    }
  },

  fireBullet: function(){
    var bb = this;
    if (game.time.now > bb.bulletTime){
        bullet = bullets.getFirstDead();

        if (bullet)
        {
            bullet.reset(bb.p1.x, bb.p1.y);
            bullet.lifespan = 2000;
            bullet.owner = bb.b1;
            bullet.rotation = bb.p1.rotation;
            game.physics.arcade.velocityFromRotation(bb.p1.rotation, 400, bullet.body.velocity);
            bb.bulletTime = game.time.now + 300;
        }
    }
  },

  fireExplosion:function(xloc,yloc){
    explosion = explosions.getFirstDead();
    explosion.explosionTime = game.time.now + 100;
        if (explosion)
        {
            explosion.reset(xloc,yloc);
        }
  },
  manageExplosions:function(explosion){
    if (game.time.now > explosion.explosionTime){
      explosion.kill();
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
   
   // game.debug.body(this.p2);

  }
};