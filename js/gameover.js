// gameover.js -- describes the game over state
var GameOver = function(game){};

GameOver.prototype = {

  	create: function(){
  		var bb = this;
  		bb.startTime = game.time.now;
  		console.log("Score was " + game.score)
  		bb.p1win = game.add.sprite(game.width/2, game.height/2-50, 'p1win');
  		bb.p1win.anchor.x = 0.5;
  		bb.p1win.anchor.y = 0.5;
  		bb.p1win.scale.setTo(0.5)

  		bb.finalScoreDisplay = game.add.text(game.width/2, game.height/2 + 110, game.p1score, {
        font: "32px Futura",
        fill: "#ffffff",
        align: "left"
    	});
    	bb.finalScoreDisplay.anchor.x = 0.5;
    	bb.finalScoreDisplay.anchor.y = 0.5;

    	bb.continuePrompt = game.add.text(game.width/2, game.height/2 + 165, "Press any button to continue", {
        font: "24px Futura",
        fill: "#ffffff",
        align: "left"
    	});
    	bb.continuePrompt.anchor.x = 0.5;
    	bb.continuePrompt.anchor.y = 0.5;

    	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	},

	update: function(){
		if (game.time.now > this.startTime + 1000){
			if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        		this.restartGame();
    		}
    	}
	},
	restartGame: function(){
		this.game.state.start("GameTitle");
	}
	
}