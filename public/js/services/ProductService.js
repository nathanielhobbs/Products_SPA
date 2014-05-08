// public/js/services/ProductService.js
angular.module('ProductService', []).factory('Product', ['$http', function($http) {

    return {
        // call to get all product
        get : function() {
            return $http.get('/api/products');
        },

        // call to POST and create a new product
        create : function(productData) {
            return $http.post('/api/products', productData);
        },

        // call to DELETE a product
        delete : function(id) {
            return $http.delete('/api/products/' + id);
        }
    }
    
}]);
