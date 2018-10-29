// gametitle.js -- The title screen state
var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){
		game.p1score = 0;

		this.game.state.start("Gameplay")
	},

	update: function(){
		
	}
}