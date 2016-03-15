angular.module("chess")
  .controller("match-maker-controller", function($http, $scope, $location, Auth, $timeout, $interval){

        //This will be moved after a while into a new controller but for now the stuff below will define creating a new game for the dashboard.
      $scope.publicGames = []

      var populatePublic = function(){
        console.log("checking database for games...")
        $http({
          method : 'GET',
          url    : '/api/games'

        }).then(function(response){
          $scope.publicGames = response.data
        })
      }


      $interval(function(){
        populatePublic()
      },2000)

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
        })
      }

      //This routes the user to an empty board when the click on the game they want to play and begins a 1 second interval calling the game object.
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
      $timeout(function(){

        console.log($scope.publicGames)
      },3000)

})
