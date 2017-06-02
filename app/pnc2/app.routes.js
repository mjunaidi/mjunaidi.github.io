(function() {
  'use strict';

  angular.module('app').config([ '$routeProvider', '$locationProvider', configureRoutes ]);

  function configureRoutes($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
      templateUrl : '../app/pnc2/html/body.html'
    }).when("/try", {
      templateUrl : '../app/pnc2/html/edit.html'
    }).when("/enc", {
      templateUrl : '../app/pnc2/html/enc.html'
    }).otherwise({
      redirectTo : '/'
    });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
  }
})();
