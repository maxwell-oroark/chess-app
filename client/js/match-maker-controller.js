angular.module("chess")
  .controller("match-maker-controller", function($http, $scope, $location, Auth, $timeout){

        //This will be moved after a while into a new controller but for now the stuff below will define creating a new game for the dashboard.
      console.log("match maker controller working..")
      $scope.publicGames = []


      var populatePublic = function(game){
        $scope.game = game
        $scope.publicGames.push($scope.game)
      }

      $scope.emptyBoard = function(){
        $location.path('/board')
      }

      $scope.newGame = function(){
        $http({
          method : 'POST',
          url    : '/api/games',
          data   : {
            id : $scope.user.id
          }
        }).then(function(response){
          populatePublic(response.data.game)
          console.log($scope.publicGames)
        })
      }

      //This (hopefully) routes the user to an empty board when the click on the game they want to play
      $scope.goToGame = function($index){
        $location.path('/games/' + $scope.publicGames[$index]._id)
        $timeout(function(){
          $http({
            method : 'POST',
            url    : '/api/games/' + $scope.publicGames[$index]._id,
            data   : { id : $scope.publicGames[$index]._id }
          }).then(function(response){
            console.log(response)
          })
        },1000)
      }

})
