'use strict';

// Declare app level module which depends on views, and components
angular.module('sisApp', [
  'ngRoute',
  'sisApp.dashboard',
  'sisApp.tabela',
  'sisApp.cadastro',
  'sisApp.instrumentos',
  'sisApp.validacao',
  'sisApp.relatorios',
  'sisApp.calibracao',
  'sisApp.login'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);
