// gametitle.js -- The title screen state
var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){
		game.stage.backgroundColor = "#1509ff";
		game.p1score = 0;
		game.whichMode = 0;
		game.winner = -1;
		this.cursors = game.input.keyboard.createCursorKeys();

		this.title = game.add.sprite(game.width/2, game.height/2-130, 'title')
		this.title.anchor.x = 0.5
		this.title.anchor.y = 0.5

		this.p1button = game.add.sprite(game.width/2 - 65, game.height/2, 'p1button')
		this.p1button.anchor.x = 0.5
		this.p1button.anchor.y = 0.5

		this.p1button_hl = game.add.sprite(game.width/2 - 65, game.height/2, 'p1button-hl')
		this.p1button_hl.alpha = 1;
		this.p1button_hl.anchor.x = 0.5
		this.p1button_hl.anchor.y = 0.5

		this.p2button = game.add.sprite(game.width/2 + 65, game.height/2, 'p2button')
		this.p2button.anchor.x = 0.5
		this.p2button.anchor.y = 0.5

		this.p2button_hl = game.add.sprite(game.width/2 + 65, game.height/2, 'p2button-hl')
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
			//game.whichMode = (game.whichMode+1) % 2
		}, this);
		right_2.onDown.add(function(){
			//game.whichMode = (game.whichMode+1) % 2
		}, this);

		p1_info = game.add.group();
		p2_info = game.add.group();

		p1_text = game.add.text(game.width/2, 450, "Score points by destroying\n the cellular dead zones.", {
        font: "32px Futura",
        fill: "#ffffff",
        align: "center"
    	}, p1_info);
    	p1_text.anchor.setTo(0.5, 0.5);
    	p1_info.alpha = 0;

    	p1_icon = game.add.sprite(game.width/2, game.height/2+100, 'ship')
    	p1_icon.anchor.x = 0.5
    	p1_icon.anchor.y = 0.5
    	p1_icon.scale.setTo(0.4)
    	p1_icon.angle = -90;

    	p1_info.add(p1_icon)

    	//player two info
    	p2_text = game.add.text(game.width/2, 450, "Stay alive.\n Defeat your opponent.", {
        font: "32px Futura",
        fill: "#ffffff",
        align: "center"
    	}, p2_info);
    	p2_text.anchor.setTo(0.5, 0.5);
    	p2_info.alpha = 1;

    	p1_icon_2 = game.add.sprite(game.width/2 - 30, game.height/2+100, 'ship')
    	p1_icon_2.anchor.x = 0.5
    	p1_icon_2.anchor.y = 0.5
    	p1_icon_2.scale.setTo(0.4)
    	p1_icon_2.angle = -90;

    	p2_icon = game.add.sprite( game.width/2 + 30, game.height/2+100, 'player2_sm')
    	p2_icon.anchor.x = 0.5
    	p2_icon.anchor.y = 0.5
    	p2_icon.scale.setTo(.9)

    	p2_info.add(p2_icon)	
    	p2_info.add(p1_icon_2)	


		confirmKey_1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//confirmKey_2 = game.input.keyboard.addKey(Phaser.Keyboard.Q);
		
		confirmKey_1.onDown.add(function(){this.game.state.start("Gameplay");}, this);
		//confirmKey_2.onDown.add(function(){this.game.state.start("Gameplay");}, this);
	
	},

	update: function(){

		if (game.whichMode == 0){
			this.p1button_hl.alpha = 1;
			this.p2button_hl.alpha = 0;
			p1_info.alpha = 1;
			p2_info.alpha = 0;
		} else {
			this.p1button_hl.alpha = 0;
			this.p2button_hl.alpha = 1;
			p1_info.alpha = 0;
			p2_info.alpha = 1;
		}
	}
}