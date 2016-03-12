chessModule
  .controller('chess-controller', ['$scope','chessData','gameLib','Auth','$location', function($scope, chessData, gameLib, Auth, $location){

	// imports board object which contains 'rows', 'files', 'squares', and an array of 64 squares.
	// Auth.isLoggedIn()
	$scope.board = chessData.board
	$scope.games = gameLib.games
	$scope.endgames = gameLib.endgames
	$scope.famousgames = gameLib.famousgames
	$scope.pieces = chessData.pieces

	$scope.newGameFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

	var rows = $scope.board.rows

	// direct access to board array object

	$scope.boardArray = chessData.boardArray

	// console.log($scope.board.rows[q].squares)

	console.log($scope.board)

	// initialize some variables and definitions

	$scope.turn = 'white'
	$scope.activePiece = null
	var fromSquare = null
	$scope.capturedPieces = []

	//Switch Board Function

	$scope.switchBlack = false
	$scope.switchBack = false

	$scope.switchBoard = function(){
		$scope.switchBlack = !$scope.switchBlack
		$scope.switchBack = !$scope.switchBack
	}


	//click Piece function analyzes information about whether or not an active piece exists,
	// if not, it makes the selected piece active, if so and the square is different, it moves it to that square and switches
	// the turn to the other player, if it is the same square it deactives the piece and removes the highlight


	$scope.clickPiece = function($index, square){
		console.log('clickPiece function running')

		if (square.contents && square.contents.color === $scope.turn && square.contents !== $scope.activePiece){
			$scope.selectPiece($index,square)
			fromSquare = square
		}
		else if (square.contents === $scope.activePiece){
			$scope.deactivatePieces($index,square)
		}
		else{
			$scope.movePiece($index,square)
			// square.contents = null
		}
	}

	$scope.deactivatePieces = function(){
		$scope.activePiece = null
		$scope.board.rows.forEach(function(row){
			row.squares.forEach(function(square){
				square.active = false
			})
		})
	}

	$scope.selectPiece = function($index, square){

		console.log('selectPiece function running')

		if ((square.contents) && (square.contents !== $scope.activePiece)){
			$scope.deactivatePieces()
			$scope.activePiece = square.contents
			square.active = true
			console.log ($scope.activePiece)
		}
	}

	$scope.movePiece = function($index, square){
		console.log('movePiece function running')
		if ($scope.activePiece && square.contents === null){

			square.contents = $scope.activePiece
			$scope.activePiece = null
			$scope.deactivatePieces()
			fromSquare.contents = null


			//change move below
			if($scope.turn === 'white'){
				$scope.turn = 'black'
			}
			else {
				$scope.turn = 'white'
			}
		}
		else if ($scope.activePiece && square.contents !== null){
			console.log('capturing...')
			$scope.capturedPieces.push(square.contents)
			square.contents = $scope.activePiece
			$scope.deactivatePieces()
			fromSquare.contents = null
			console.log($scope.capturedPieces)

			//change move below
			if($scope.turn === 'white'){
				$scope.turn = 'black'
			}
			else {
				$scope.turn = 'white'
			}

		}
	}

	// Attempting to build a fen parser that will set my chess board when passed a legitimate Fen string.

	$scope.fen =  ''

	$scope.parseFen = function(fenStr){

		var fenArr = fenStr.split('')

		// console.log('before:' + fenArr)

		fenArr = fenArr.map(function(currentValue){
			var out = []
			if (!isNaN(parseInt(currentValue))){
				for (var i = 0; i < currentValue; i++){
					out.push('o')
				}
				console.log('evaluating fen...')
				return out.join('')
			} else {
				return currentValue
			}

		}).join('')

		// console.log('after:' + fenArr)

		fenArr = fenArr.split('/')

		fenArr.forEach(function(currentValue, Parentindex){

			currentValue.split('').forEach(function(c, index){
				rows[Parentindex].squares[index].contents = angular.copy($scope.pieces[c])

			})
		})

		$scope.capturedPieces = []
		$scope.turn = 'white'

	}

}])
