chessModule
  .controller('chess-controller', ['$scope','chessData','gameLib','Auth','$location', '$http','$interval', function($scope, chessData, gameLib, Auth, $location, $http, $interval){


  //Check status of game on server and update client

	// imports board object which contains 'rows', 'files', 'squares', and an array of 64 squares.
	// Auth.isLoggedIn()
  $scope.boardArray = chessData.boardArray
	$scope.board = chessData.board
	$scope.games = gameLib.games
	$scope.endgames = gameLib.endgames
	$scope.famousgames = gameLib.famousgames
	$scope.pieces = chessData.pieces
  $scope.gameId = location.hash.split('/').pop() //this locates the game ID using the URL
  $scope.turn = 'white'

	var rows = $scope.board.rows


  //this is a helper function which tries to determine who's move it is from the game history array.
  $scope.determineTurn = function(gamehist){
    console.log('game history',gamehist.length)
    if (gamehist.length % 2 == 0){
      console.log('White\'s TURN')
      $scope.turn = 'white'
    } else {
      console.log('Black\'s TURN!')
      $scope.turn = 'black'
    }
  }

// query the database, download the game history, populate the board with the last FEN string on the game history array.
  $scope.queryGame = function(gameId){
    console.log('querying database for game history... from line 34', gameId)
    $http({
      method: 'GET',
      url   : 'api/games/' + gameId

    }).then(function(returnData){
      console.log("$gameHistoryFromServer: ",returnData.data.moves)//this should be an array object full of string Fen elements
      var lastMove = returnData.data.moves.pop()//this should be the last Fen string in the database
      $scope.gameHistoryFromServer = returnData.data.moves
      $scope.parseFen(lastMove)
      $scope.determineTurn(returnData.data.moves)
    })
  }
  //update the game on the server ---- this is called when a piece is moved.
  function updateGame(currentmove){
    //this below tries to assemble $scope.gameHistory client side before pushing it to the database
    // $scope.gameHistoryFromClient.push(currentmove)

    $http({
      method : 'PUT',
      url    : '/api/games',
      data   : { id : $scope.gameId, moves : currentmove }
    }).then(function(returnData){
      console.log('update with single Fen: ', returnData.data.message)
    })
  }

  $interval(function(){
    $scope.queryGame($scope.gameId)

  },5000)


	// initialize some variables and definitions

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
		console.log('movePiece function running...')
		if ($scope.activePiece && square.contents === null){

			square.contents = $scope.activePiece
			$scope.activePiece = null
			$scope.deactivatePieces()
			fromSquare.contents = null

      //update Fen generates a new fen string from the most recent look of the board
      updateFen()
      //update Game takes that lastest fen and updates the database with the entire game history
      updateGame($scope.currentFen)
      $scope.parseFen($scope.currentFen)



		}
		else if ($scope.activePiece && square.contents !== null){
			console.log('capturing...')
			$scope.capturedPieces.push(square.contents)
			square.contents = $scope.activePiece
			$scope.deactivatePieces()
			fromSquare.contents = null
			console.log($scope.capturedPieces)

      //update Fen generates a new fen string from the most recent look of the board
      updateFen()
      //update Game takes that lastest fen and updates the database with the entire game history
      updateGame($scope.currentFen)
      $scope.parseFen($scope.currentFen)

		}
	}

	// Attempting to build a fen parser that will set my chess board when passed a legitimate Fen string.
  //I now have a fen builder which builds a new fen and pushes it into game history after each move.

	$scope.fen =  ''


  function updateFen(){
    console.log('constructing fen string...')
    var fenArray = []
    $scope.board.arr.forEach(function(cur, index){
      if (cur.contents) {
        fenArray.push(cur.contents.FEN)
      } else {
        fenArray.push(null)
      }
      if ((index + 1) % 8 === 0){
        fenArray.push('/')
      }
    })

    var cnt = 1;
    var out = []

    fenArray.forEach(function(cur ,i, arr) {
      if (cur === null) {
        if (arr[i+1] === null) {
            cnt++
        }
        else {
            out.push(cnt)
            cnt = 1
        }
      }
      else {
        out.push(cur)
      }
})
    //clean up that last '/' character with pop()
    out.pop()
    $scope.currentFen = out.join('')
    console.log("current fen:", $scope.currentFen)

  }




  //

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
	}

}])
