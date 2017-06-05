(function() {
  'use strict';

  angular.module('app').config([ '$routeProvider', '$locationProvider', configureRoutes ]);

  function configureRoutes($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
      templateUrl : '../app/uuid/html/home.html'
    }).when("/try", {
      templateUrl : '../app/uuid/html/edit.html'
    }).when("/enc", {
      templateUrl : '../app/uuid/html/enc.html'
    }).when("/dec", {
      templateUrl : '../app/uuid/html/dec.html'
    }).when("/uuid", {
      templateUrl : '../app/uuid/html/uuid.html'
    }).when("/exp", {
      templateUrl : '../app/uuid/html/exp.html'
    }).otherwise({
      redirectTo : '/'
    });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
  }
})();
