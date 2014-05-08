// public/js/app.js

//create the angular module and name it productApp
//also include ngRoute for all our (frontend) routing needs
var productApp = angular.module('productApp',['ngRoute', 'appRoutes', 'MainController', 'ProductController', 'ProductService']);
