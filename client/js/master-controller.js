angular.module("chess")
  .controller("master-controller", function($rootScope, $http, $scope, $location, Auth, $interval){
    $scope.loggedIn = Auth.isLoggedIn()
    $rootScope.$on("$routeChangeStart", function(){
      // console.log("changing route scope");
      $scope.loggedIn = Auth.isLoggedIn()
      Auth.getUser()
        .then(function(user){
          $scope.user = user.data
        })
    })

    $scope.login = function(){
      Auth.login($scope.loginForm.username, $scope.loginForm.password)
      .then(function(data){
        if (data.success){$location.path('/home')}
        else {
          $scope.errormsg = data.message
        }
      })
    }

    $scope.logout = function(){
      console.log('loggin out..')
      // clear user scope so it doesn't show my name on dashboard
      $scope.user = ''
      Auth.logout()
      $location.path('/')
    }

    //Angular routing on SIGN UP.  Maybe need to add authentication of correct username and password
    $scope.signup = function(){
          $http({
              method : 'POST',
              url    : '/api/signup',
              data   : $scope.signupForm
          }).then(function(returnData){
              $scope.user.username = returnData.data.username
              if ( returnData.data) {
								$scope.userCreated = true;
                console.log("user created")
							 }

          })
      }
      console.log($scope.user)

    
})
