// public/js/controllers/productCtrl.js
angular.module('ProductController', []).controller('ProductController', function($scope, $html) {
    // This will hold the date from the form that the user fills out to create a new product
    $scope.formData = {};

    $scope.tagline = "product controller";

    // When the user opens the Product List link, first show them all existing products. (This is done by doing a 
    // GET /api/products and binding the received JSON from the API to $scope.products. The products view will then loop over these.)
    $http.get('/api/products')
        .success(function(data) {
            $scope.products = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});

