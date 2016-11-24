'use strict';

angular.module('sisApp.tabela', ['ngRoute'])

.config(['$routeProvider', TabelaConfig])
.service('TabelaService', TabelaService)
.controller('TabelaCtrl', TabelaCtrl);

function TabelaConfig ($routeProvider) {
  $routeProvider.when('/tabela', {
    templateUrl: 'tabela/tabela.html',
    controller: 'TabelaCtrl'
  });
}

function TabelaCtrl ($scope, TabelaService) {

  var vm = this;
  var produtos = [];

  TabelaService.list()
    .then(function(list){
      console.log('Data: ', list);
      $scope.produtos = list.data;
    })
    .catch(function(err){
      console.log('Erro: ', err);
    })

}

function TabelaService ($http) {
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

TabelaConfig.$inject = ['$routeProvider'];
TabelaCtrl.$inject = ['$scope', 'TabelaService'];
TabelaService.$inject = ['$http'];
