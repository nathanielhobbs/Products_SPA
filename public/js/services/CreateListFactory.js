// public/js/services/CreateListFactory.js

// This is a factory we use to defer to result of the POST to our API
// without it, we won't be able to use the newly created productList's _id in ProductListController
angular.module('CreateListFactory',[]).factory('createListFactory', function($http, $q) {
    var getData = function() {
    var deferred = $q.defer();

    $http.post('/api/productList')
        .success(function(data) {
            deferred.resolve(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

        return deferred.promise;
    };
    return { getData: getData };
});

