'use strict';

angular.module('sisApp.relatorios', ['ngRoute'])

.config(['$routeProvider', RelatoriosConfig])
.service('RelatoriosService', RelatoriosService)
.controller('RelatoriosCtrl', RelatoriosCtrl);

function RelatoriosConfig ($routeProvider) {
  $routeProvider.when('/relatorios', {
    templateUrl: 'relatorios/relatorios.html',
    controller: 'RelatoriosCtrl'
  });
}

function RelatoriosCtrl ($scope, RelatoriosService) {

  var vm = this;
  var produtos = [];

  RelatoriosService.list()
    .then(function(list){
      console.log('Data: ', list);
      $scope.produtos = list.data;
    })
    .catch(function(err){
      console.log('Erro: ', err);
    })

}

function RelatoriosService ($http) {
  const BASE_URL = 'http://localhost:3000/api/instrumentos/'; // API
  this.list = function() {
    const request = {
      url: BASE_URL,
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

  this.remove = function(user) {
    const request = {
      url: BASE_URL + user._id,
      method: 'DELETE'
    }
    return $http(request);
  }
}

RelatoriosConfig.$inject = ['$routeProvider'];
RelatoriosCtrl.$inject = ['$scope', 'RelatoriosService'];
RelatoriosService.$inject = ['$http'];
