'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider
      .when('/', {
        controller: 'mainController',
        templateUrl: 'views/home.html'
      }).when('/examples', {
        templateUrl: 'views/examples.html',
        controller: 'mainController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);
