'use strict';

angular.module('sisApp.instrumentos', ['ngRoute'])

.config(['$routeProvider', InstrumentosConfig])
.service('InstrumentosService', InstrumentosService)
.controller('InstrumentosCtrl', InstrumentosCtrl);

function InstrumentosConfig ($routeProvider) {
  $routeProvider.when('/instrumentos', {
    templateUrl: 'instrumentos/instrumentos.html',
    controller: 'InstrumentosCtrl'
  });
}

function InstrumentosCtrl ($scope, InstrumentosService) {

  var vm = this;
  var produtos = [];

  InstrumentosService.list()
    .then(function(list){
      console.log('Data: ', list);
      $scope.produtos = list.data;
    })
    .catch(function(err){
      console.log('Erro: ', err);
    })

    // $scope.query = {}; 
}

function InstrumentosService ($http) {
  const BASE_URL = 'http://localhost:3000/api/instrumentos/';
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

InstrumentosConfig.$inject = ['$routeProvider'];
InstrumentosCtrl.$inject = ['$scope', 'InstrumentosService'];
InstrumentosService.$inject = ['$http'];
