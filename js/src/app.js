'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'lbServices', 'angular.filter']);

app
    .config(['$routeProvider',
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
    ])
    .config(function(LoopBackResourceProvider) {

        // Use a custom auth header instead of the default 'Authorization'
        LoopBackResourceProvider.setAuthHeader('X-Access-Token');

        // Change the URL where to access the LoopBack REST API server
        LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
    });
