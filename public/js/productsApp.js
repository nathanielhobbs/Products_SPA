// pulbic/js/productsApp.js
// TODO: add a 404 page not found instead of a catch-all route

// create the module and include ngRoute for all our routing needs
var productsApp = angular.module('productsApp', ['ngRoute', 'MainCtrl', 'ProductListCtrl', 'ProductListAddProductCtrl','CurrentListService', 'CreateListFactory']);
//angular.module('productsApp.controllers');

//configure our routes
productsApp.config(function($routeProvider, $locationProvider){
    $routeProvider

    // route for the homepage
    .when('/', {
        templateUrl : 'views/home.html',
        controller : 'MainController'
    })

    // route when adding a product to the product list
    .when('/addProduct', {
        templateUrl : 'views/productListAddProduct.html',
        controller : 'ProductListAddProductController'
    })

    // route for showing a product list
    .when('/productList', {
        templateUrl : 'views/productList.html',
        controller : 'ProductListController'
    })

    // route for displaying a specific product list
    .when('/productList/:productListID', {
        templateUrl: 'views/productList.html',
        controller: 'ProductListController'
    })

    // a catch all route
    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
});

