(function() {
  'use strict';

  angular.module('app').config([ '$routeProvider', configureRoutes ]);

  function configureRoutes($routeProvider) {
    $routeProvider.when("/", {
      templateUrl : 'app/html/plain.html',
      controller : 'ModelController as ctrl',
      resolve : {
        config : function() {
          return {
            'get' : {
              'paths' : {
                'app/app.config.json' : null
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