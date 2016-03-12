var chessModule = angular.module('chess',
[
 "authFactory",
 "ngRoute",
 "ngAnimate"
])

// Next, we need to tell our module we're going to be routing using ngRoute
// and define those routes
angular.module('chess')
	.config(function($routeProvider, $httpProvider){
		// $routeProvider is a service contained on ngRoute
		// Must also use the directive ng-view
		$httpProvider.interceptors.push("AuthInterceptor")
		$routeProvider
			.when('/', {
				templateUrl : '/login.html', // route on SERVER where the template file lives
				controller  : 'master-controller'  // name of angular CONTROLLER to use with the template
			})
			.when('/home', {
				templateUrl : '/partials/dashboard.html',
				controller : 'master-controller'
			})
      .when('/board', {
        templateUrl : '/partials/board.html',
        controller  : 'chess-controller'
      })
      .when('/games/:gameid', {
        templateUrl : '/partials/board.html',
        controller  : 'chess-controller'
      })

	})
