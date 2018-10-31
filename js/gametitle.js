// gametitle.js -- The title screen state
var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){
		game.stage.backgroundColor = "#1509ff";
		game.p1score = 0;
		game.whichMode = 0;
		game.winner = -1;
		this.cursors = game.input.keyboard.createCursorKeys();

		this.p1button = game.add.sprite(game.width/2 - 75, game.height*2/3, 'p1button')
		this.p1button.anchor.x = 0.5
		this.p1button.anchor.y = 0.5

		this.p1button_hl = game.add.sprite(game.width/2 - 75, game.height*2/3, 'p1button-hl')
		this.p1button_hl.alpha = 1;
		this.p1button_hl.anchor.x = 0.5
		this.p1button_hl.anchor.y = 0.5

		this.p2button = game.add.sprite(game.width/2 + 75, game.height*2/3, 'p2button')
		this.p2button.anchor.x = 0.5
		this.p2button.anchor.y = 0.5

		this.p2button_hl = game.add.sprite(game.width/2 + 75, game.height*2/3, 'p2button-hl')
		this.p2button_hl.alpha = 0;
		this.p2button_hl.anchor.x = 0.5
		this.p2button_hl.anchor.y = 0.5

		this.cursors.left.onDown.add(function(){
			game.whichMode = (game.whichMode+1) % 2
		}, this);
		this.cursors.right.onDown.add(function(){
			game.whichMode = (game.whichMode+1) % 2
		}, this);

		left_2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		right_2 = game.input.keyboard.addKey(Phaser.Keyboard.D);
		
		left_2.onDown.add(function(){
			game.whichMode = (game.whichMode+1) % 2
		}, this);
		right_2.onDown.add(function(){
			game.whichMode = (game.whichMode+1) % 2
		}, this);




		confirmKey_1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		confirmKey_2 = game.input.keyboard.addKey(Phaser.Keyboard.Q);
		
		confirmKey_1.onDown.add(function(){this.game.state.start("Gameplay");}, this);
		confirmKey_2.onDown.add(function(){this.game.state.start("Gameplay");}, this);
	
	},

	update: function(){

		if (game.whichMode == 0){
			this.p1button_hl.alpha = 1;
			this.p2button_hl.alpha = 0;
		} else {
			this.p1button_hl.alpha = 0;
			this.p2button_hl.alpha = 1;
		}
	}
}