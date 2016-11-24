'use strict';

angular.module('sisApp.validacao', ['ngRoute'])

.config(['$routeProvider', ValidacaoConfig])
.service('ValidacaoService', ValidacaoService)
.service('ValidacaoInstrumentoService', ValidacaoInstrumentoService)
.service('CalibracaoItensService', CalibracaoItensService)
.controller('ValidacaoCtrl', ValidacaoCtrl)
.controller('ValidacaoInstrumentoCtrl', ValidacaoInstrumentoCtrl)
.controller('CalibracaoItensCtrl', CalibracaoItensCtrl)

function ValidacaoConfig ($routeProvider) {
  $routeProvider
  .when('/validacao', {
    templateUrl: 'validacao/validacao.html',
    controller: 'ValidacaoCtrl'
  })
  .when('/validacao/:id', {
      templateUrl: 'validacao/validacao.instrumentos.html',
      controller: 'ValidacaoInstrumentoCtrl',
      controllerAs: 'ValidacaoInstrumentoAs'
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

  function ValidacaoInstrumentoCtrl ($scope, ValidacaoInstrumentoService) {
    var vm = this;
    // var validacaoInstrumentos = [];

    ValidacaoInstrumentoService.listOne()
      .then(function(validacaoInstrumentoData){
        console.log('Data: ', validacaoInstrumentoData.data);
        // $scope.validacaoInstrumentos = validacaoInstrumentoData;
        vm.validacaoInstrumentos = validacaoInstrumentoData.data;

      })
      .catch(function(err){
        console.log('Erro: ', err);
      })

    ValidacaoInstrumentoService.listOneItens()
      .then(function(calibracaoData){
        console.log('Data: ', calibracaoData);
        // $scope.calibracaoItens = calibracaoData.data;
        vm.calibracaoItens = calibracaoData.data;
      })
      .catch(function(err){
        console.log('Erro: ', err);
      })
  }

  function ValidacaoInstrumentoService ($http, $routeParams) {
    const BASE_URL = 'http://localhost:3000/api/calibracoes/joinInst/'; // API
    const BASE_URL_ITENS = 'http://localhost:3000/api/calibracoes/itens/';
    // this.list = function() {
    //   const request = {
    //     url: BASE_URL,
    //     method: 'GET'
    //   }
    //   return $http(request);
    // }
    this.listOne = function() {
      const request = {
        url: BASE_URL + $routeParams.id,
        method: 'GET'
      }
      return $http(request);
    }

    this.listOneItens = function() {
      const request = {
        url: BASE_URL_ITENS + $routeParams.id,
        method: 'GET'
      }
      return $http(request);
    }

  }

function ValidacaoCtrl ($scope, ValidacaoService) {

  var vm = this;
  var validacoes = [];
  var validacoesMocks = [];

  ValidacaoService.list()
    .then(function(list){
      console.log('Data: ', list);
      $scope.validacoes = list.data;
    })
    .catch(function(err){
      console.log('Erro: ', err);
    })

    ValidacaoService.listMock()
      .then(function(list){
        console.log('Data: ', list);
        $scope.validacoesMocks = list.data;
      })
      .catch(function(err){
        console.log('Erro: ', err);
      })

}

function ValidacaoService ($http) {
  const BASE_URL = 'http://localhost:3000/api/validacoes/'; // API
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

ValidacaoConfig.$inject = ['$routeProvider'];

ValidacaoCtrl.$inject = ['$scope', 'ValidacaoService'];
ValidacaoService.$inject = ['$http'];

ValidacaoInstrumentoCtrl.$inject = ['$scope', 'ValidacaoInstrumentoService'];
ValidacaoInstrumentoService.$inject = ['$http', '$routeParams'];

CalibracaoItensCtrl.$inject = ['$scope', 'CalibracaoItensService'];
CalibracaoItensService.$inject = ['$http', '$routeParams'];
