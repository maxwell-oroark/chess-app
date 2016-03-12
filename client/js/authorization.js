// Authorization factory
;(function () {
  angular.module('authFactory', [])

    // Create the mini factories to export
    .factory('Auth', Auth)
    .factory('AuthToken', AuthToken)
    .factory('AuthInterceptor', AuthInterceptor)

  // inject the depencies to use for each factory
  Auth.$inject = ['$http', '$q', 'AuthToken', '$location']
  AuthToken.$inject = ['$window']
  AuthInterceptor.$inject = ['$q', '$location', 'AuthToken']

// ===================================
 // Authentication Factory's
 // ===================================


 function Auth ($http, $q, AuthToken, $location) {
   // Empty object to return
   var authFactory = {}

   // Log in a user
   authFactory.login = function (username, password) {
     return $http.post('http://localhost:3000/api/login', {username: username, password: password})
       .then(function (data) {

         AuthToken.setToken(data.data.token);
         return data.data

       })
   }

   // log a user out by clearing the token
   authFactory.logout = function () {
     // clear the token
     AuthToken.setToken()
   }

   // check if a user is logged in via tokens part of my middleware on backend
   authFactory.isLoggedIn = function () {
     if (AuthToken.getToken())
       return true
     else
      	$location.url('/')
       return false
   }

   // get the logged in user
   authFactory.getUser = function () {
     if (AuthToken.getToken())
       return $http.get('/api/me', { cache: true })
     else
       return $q.reject({ message: 'User has no token.' })
   }

   // return auth factory object
   return authFactory
 }

 // ===================================================
 // factory for handling tokens
 // inject $window to store token client-side
 // ===================================================

 function AuthToken ($window) {
   var authTokenFactory = {}
   // get the token out of local storage
   authTokenFactory.getToken = function () {
     return $window.localStorage.getItem('token')
   }
   // function to set token or clear token
   // if a token is passed, set the token
   // if there is no token, clear it from local storage
   authTokenFactory.setToken = function (token) {
     if (token)
       $window.localStorage.setItem('token', token)
     else
       $window.localStorage.removeItem('token')
   }
   return authTokenFactory
 }

 // ===================================================
 // application configuration to integrate token into requests
 // ===================================================

 function AuthInterceptor ($q, $location, AuthToken) {
   var interceptorFactory = {}
   // this will happen on all HTTP requests
   interceptorFactory.request = function (config) {
     // grab the token
     var token = AuthToken.getToken()
     // if the token exists, add it to the header as x-access-token
     if (token)
       config.headers['x-access-token'] = token
     return config
   }
   // happens on response errors
   interceptorFactory.responseError = function (response) {
     // if our server returns a 403 forbidden response
     if (response.status == 403) {
       AuthToken.setToken()
       $location.path('/')
     }
     // return the errors from the server as a promise
     return $q.reject(response)
   }
   return interceptorFactory
 }

 //End of main module
}())
