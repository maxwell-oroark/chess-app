chessModule
	.factory('chessData',[function(){

		//Board Constructor
		function Board (rows, files) {
			this.rows = rows
			this.files = files
		}

		//Row Constructor
		function Row (squares) {
			this.squares = squares
		}

		//File Constructor
		function File(squares) {
			this.squares = squares
		}

		//Square Constructor
		function Square (contents, ID) {
			this.contents = contents
			this.ID = ID
			this.active = false
		}

		// All my square objects
		var a1 = new Square(null, 'a1')
		var a2 = new Square(null, 'a2')
		var a3 = new Square(null, 'a3')
		var a4 = new Square(null, 'a4')
		var a5 = new Square(null, 'a5')
		var a6 = new Square(null, 'a6')
		var a7 = new Square(null, 'a7')
		var a8 = new Square(null, 'a8')

		var b1 = new Square(null, 'b1')
		var b2 = new Square(null, 'b2')
		var b3 = new Square(null, 'b3')
		var b4 = new Square(null, 'b4')
		var b5 = new Square(null, 'b5')
		var b6 = new Square(null, 'b6')
		var b7 = new Square(null, 'b7')
		var b8 = new Square(null, 'b8')

		var c1 = new Square(null, 'c1')
		var c2 = new Square(null, 'c2')
		var c3 = new Square(null, 'c3')
		var c4 = new Square(null, 'c4')
		var c5 = new Square(null, 'c5')
		var c6 = new Square(null, 'c6')
		var c7 = new Square(null, 'c7')
		var c8 = new Square(null, 'c8')

		var d1 = new Square(null, 'd1')
		var d2 = new Square(null, 'd2')
		var d3 = new Square(null, 'd3')
		var d4 = new Square(null, 'd4')
		var d5 = new Square(null, 'd5')
		var d6 = new Square(null, 'd6')
		var d7 = new Square(null, 'd7')
		var d8 = new Square(null, 'd8')

		var e1 = new Square(null, 'e1')
		var e2 = new Square(null, 'e2')
		var e3 = new Square(null, 'e3')
		var e4 = new Square(null, 'e4')
		var e5 = new Square(null, 'e5')
		var e6 = new Square(null, 'e6')
		var e7 = new Square(null, 'e7')
		var e8 = new Square(null, 'e8')

		var f1 = new Square(null, 'f1')
		var f2 = new Square(null, 'f2')
		var f3 = new Square(null, 'f3')
		var f4 = new Square(null, 'f4')
		var f5 = new Square(null, 'f5')
		var f6 = new Square(null, 'f6')
		var f7 = new Square(null, 'f7')
		var f8 = new Square(null, 'f8')

		var g1 = new Square(null, 'g1')
		var g2 = new Square(null, 'g2')
		var g3 = new Square(null, 'g3')
		var g4 = new Square(null, 'g4')
		var g5 = new Square(null, 'g5')
		var g6 = new Square(null, 'g6')
		var g7 = new Square(null, 'g7')
		var g8 = new Square(null, 'g8')

		var h1 = new Square(null, 'h1')
		var h2 = new Square(null, 'h2')
		var h3 = new Square(null, 'h3')
		var h4 = new Square(null, 'h4')
		var h5 = new Square(null, 'h5')
		var h6 = new Square(null, 'h6')
		var h7 = new Square(null, 'h7')
		var h8 = new Square(null, 'h8')

		// All my row objects

		var row8 = new Row([a1,b1,c1,d1,e1,f1,g1,h1])
		var row7 = new Row([a2,b2,c2,d2,e2,f2,g2,h2])
		var row6 = new Row([a3,b3,c3,d3,e3,f3,g3,h3])
		var row5 = new Row([a4,b4,c4,d4,e4,f4,g4,h4])
		var row4 = new Row([a5,b5,c5,d5,e5,f5,g5,h5])
		var row3 = new Row([a6,b6,c6,d6,e6,f6,g6,h6])
		var row2 = new Row([a7,b7,c7,d7,e7,f7,g7,h7])
		var row1 = new Row([a8,b8,c8,d8,e8,f8,g8,h8])

		// All my file objects

		var fileA = new File([a1,a2,a3,a4,a5,a6,a7,a8])
		var fileB = new File([b1,b2,b3,b4,b5,b6,b7,b8])
		var fileC = new File([c1,c2,c3,c4,c5,c6,c7,c8])
		var fileD = new File([d1,d2,d3,d4,d5,d6,d7,d8])
		var fileE = new File([e1,e2,e3,e4,e5,e6,e7,e8])
		var fileF = new File([f1,f2,f3,f4,f5,f6,f7,f8])
		var fileG = new File([g1,g2,g3,g4,g5,g6,g7,g8])
		var fileH = new File([h1,h2,h3,h4,h5,h6,h7,h8])

		// My board object

		var gameBoard = new Board([row1, row2, row3,row4,row5,row6,row7,row8],[fileA,fileB,fileC,fileD,fileE,fileF,fileG,fileH])

		// A piece constructor

		function Piece(name, image, color) {
			this.name = name;
			this.image = image;
			this.color = color;

		}

		var p = new Piece('blackPawn', 'images/bP.png', 'black')
		var r = new Piece('blackRook','images/bR.png', 'black')
		var n = new Piece('blackKnight', 'images/bN.png', 'black')
		var b = new Piece('blackBishop', 'images/bB.png', 'black')
		var k = new Piece('blackKing', 'images/bK.png', 'black')
		var q = new Piece('blackQueen', 'images/bQ.png', 'black')
		var P = new Piece('whitePawn','images/wP.png', 'white')
		var R = new Piece('whiteRook', 'images/wR.png', 'white')
		var N = new Piece('whiteKnight', 'images/wN.png', 'white')
		var B = new Piece('whiteBishop', 'images/wB.png', 'white')
		var K = new Piece('whiteKing', 'images/wK.png', 'white')
		var Q = new Piece('whiteQueen', 'images/wQ.png', 'white')

		gameBoard.pieces = {
			p : p,
			r : r,
			n : n,
			b : b,
			k : k,
			q : q,
			P : P,
			R : R,
			N : N,
			B : B,
			K : K,
			Q : Q,
			o : null
		}

		gameBoard.arr = []

		for (var c = 0; c < 8; c++){

			for (var i = 0; i < 8; i++){
				gameBoard.arr.push(gameBoard.rows[c].squares[i])
			}

		}

		return {

			board : gameBoard,
			pieces : gameBoard.pieces,
			boardArray : gameBoard.arr,

		}
//End of factory
	}])
