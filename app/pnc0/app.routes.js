(function() {
  'use strict';

  angular.module('app').config([ '$routeProvider', '$locationProvider', configureRoutes ]);

  function configureRoutes($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
      templateUrl : '../app/pnc0/html/body.html'
    }).when("/try", {
      templateUrl : '../app/pnc0/html/edit.html'
    }).otherwise({
      redirectTo : '/'
    });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
  }
})();
