(function() {
  'use strict';

  angular.module('app').config([ '$routeProvider', configureRoutes ]);

  function configureRoutes($routeProvider) {
    $routeProvider.when("/", {
      templateUrl : 'app/portfolio/portfolio.html',
      controller : 'ModelController as ctrl',
      resolve : {
        config : function() {
          return {
            'get' : {
              'paths' : {
                'app/portfolio/portfolio.json' : null
              }
            }
          };
        }
      }
    }).otherwise({
      redirectTo : '/'
    });
  }
})();