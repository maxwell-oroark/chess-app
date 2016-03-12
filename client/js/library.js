chessModule
	.factory('gameLib',[function(){

		var games = [

			{
				name: 'King\'s Indian',
				position: 'rnbqkbnr/ppp1pppp/8/3p4/8/5NP1/PPPPPP1P/RNBQKB1R'
			},{
				name: 'King\'s Gambit Accepted',
				position: 'rnbqkbnr/ppp2ppp/8/3P4/5p2/5N2/PPPP2PP/RNBQKB1R'
			},{
				name: 'Sicilian Defense',
				position: 'rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R'
			},{
				name: 'Ruy Lopez',
				position: 'r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R'
			},{
				name: 'Queen\'s Gambit',
				position: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR'
			},{
				name: 'London System',
				position: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R'
			}


		]

		var endgames = [

			{
				name : 'Rook Checkmate',
				position: '4r1K1/8/6k1/8/8/8/8/8'
			},{
				name : 'Bishop Checkmate',
				position: 'k7/8/1K6/4BB2/8/8/8/8'
			},{
				name : 'Pawn Puzzle',
				position: '8/8/8/3k4/3P4/3K4/8/8'
			}

			]

		var famousgames = [

			{
				name : 'Bobby Fisher',
				position : ''
			},{
				name : 'Kasparov',
				position : ''
			},{
				name : 'Murphy',
				position : ''
			}





		]



		return {
			games : games,
			endgames : endgames,
			famousgames : famousgames
		}


	}])
