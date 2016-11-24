'use strict';

angular.module('sisApp.dashboard', ['ngRoute'])

.config(['$routeProvider', DashboardConfig])
.service('DashboardService', DashboardService)
.controller('DashboardCtrl', DashboardCtrl);

function DashboardConfig ($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}

function DashboardCtrl ($scope, DashboardService) {

  var vm = this;
  var produtos = [];

  DashboardService.list()
    .then(function(list){
      console.log('Data: ', list);
      $scope.produtos = list.data;
    })
    .catch(function(err){
      console.log('Erro: ', err);
    })

}

function DashboardService ($http) {
  // const BASE_URL = 'http://localhost:3000/api/instrumentos/'; // API
  const BASE_URL = 'http://localhost:3000/api/calibracoes/pendentes';
  // const BASE_URL_MOCK = '../dashboardDadoMock.json'
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

DashboardConfig.$inject = ['$routeProvider'];
DashboardCtrl.$inject = ['$scope', 'DashboardService'];
DashboardService.$inject = ['$http'];
