'use strict';

angular.module('sisApp.cadastro', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cadastro', {
    templateUrl: 'cadastro/cadastro.html',
    controller: 'CadastroCtrl'
  });
}])

.controller('CadastroCtrl', [function() {

}]);
