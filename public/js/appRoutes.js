// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', 'locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        //Products home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // List of products page that will use ProductController
        .when('/products', {
            templateUrl: 'views/list_products.html',
            controller: 'ProductController'
        });

    $locationProvider.html5Mode(true);
}]);
