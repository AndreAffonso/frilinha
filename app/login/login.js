'use strict';

angular.module('sisApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])
.service('LoginService', LoginService)
.controller('LoginCtrl', LoginCtrl)

function LoginCtrl ($scope, $location, LoginService) {
  $scope.login = function (user) {

    function success (data) {
      console.log('data', data)
      if (data.status === 200) {
        $location.path('/dashboard')
      }
    }
    function error (error) {
      console.log('error', error)
    }
    LoginService
      .login(user)
      .then(success)
      .catch(error)
  }
}
LoginCtrl.$inject = ['$scope', '$location','LoginService']

function LoginService ($http) {
  const BASE_URL = 'http://localhost:3000/api/usuarios/';
  this.list = function() {
    const request = {
      url: BASE_URL,
      method: 'GET'
    }
    return $http(request);
  }

  this.currentUser = function() {
    const request = {
      url: BASE_URL+'currentuser',
      method: 'GET'
    }
    return $http(request);
  }

  this.create = function(user) {
    const request = {
      url: BASE_URL,
      method: 'POST',
      data: user
    }
    return $http(request);
  }

  this.login = function(user) {
    console.log('user', user)
    const request = {
      url: BASE_URL+'login',
      method: 'POST',
      data: user
    }
    return $http(request);
  }

  this.remove = function(user) {
    const request = {
      url: BASE_URL + user._id,
      method: 'DELETE'
    }
    return $http(request);
  }
}
LoginService.$inject = ['$http']
