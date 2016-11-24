'use strict';

angular.module('sisApp.calibracao', ['ngRoute'])

.config(['$routeProvider', CalibracaoConfig])
.service('CalibracaoService', CalibracaoService)
.service('CalibracaoItensService', CalibracaoItensService)
.controller('CalibracaoCtrl', CalibracaoCtrl)
.controller('CalibracaoItensCtrl', CalibracaoItensCtrl);

function CalibracaoConfig ($routeProvider) {
  $routeProvider.when('/calibracao', {
    templateUrl: 'calibracao/calibracao.html',
    controller: 'CalibracaoCtrl'
  })
  .when('/calibracao/:id', {
      templateUrl: 'calibracao/calibracao.itens.html',
      controller: 'CalibracaoItensCtrl'
    });
}

function CalibracaoItensCtrl ($scope, CalibracaoItensService) {
  var vm = this;
  var calibracaoItens = [];

  CalibracaoItensService.listOne()
    .then(function(calibracaoData){
      console.log('Data: ', calibracaoData);
      $scope.calibracaoItens = calibracaoData.data;
    })
    .catch(function(err){
      console.log('Erro: ', err);
    })
}

function CalibracaoItensService ($http, $routeParams) {
  const BASE_URL = 'http://localhost:3000/api/calibracoes/itens/'; // API
  // this.list = function() {
  //   const request = {
  //     url: BASE_URL,
  //     method: 'GET'
  //   }
  //   return $http(request);
  // }
  this.listOne = function(id) {
    const request = {
      url: BASE_URL + $routeParams.id,
      method: 'GET'
    }
    return $http(request);
  }

}

function CalibracaoCtrl ($scope, CalibracaoService) {

  var vm = this;
  var calibracoes = [];

  CalibracaoService.list()
    .then(function(list){
      console.log('Data: ', list);
      $scope.calibracoes = list.data;
    })
    .catch(function(err){
      console.log('Erro: ', err);
    })

}

function CalibracaoService ($http) {
  const BASE_URL = 'http://localhost:3000/api/calibracoes/'; // API
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

CalibracaoConfig.$inject = ['$routeProvider'];

CalibracaoCtrl.$inject = ['$scope', 'CalibracaoService'];
CalibracaoService.$inject = ['$http'];

CalibracaoItensCtrl.$inject = ['$scope', 'CalibracaoItensService'];
CalibracaoItensService.$inject = ['$http', '$routeParams'];
