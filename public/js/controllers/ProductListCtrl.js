// public/js/controllers/ProductListCtrl.js

angular.module('ProductListCtrl', []).controller('ProductListController', function($scope, $http, $routeParams, createListFactory, currentListService ){
    var currentProductList = '';

    // show the Add Product buttton (inform the Main Controller that displays the menu)
    $scope.$emit('showButton', true);

    // if loading an existing list then perform an http GET on the list to load it into the browser
    if($routeParams.productListID){
        var productListID = $routeParams.productListID;
        $scope.productListID = productListID;
        $scope.listURL = document.URL;
        $http.get('/api/productList/'+productListID)    //returns a productList with ID productListID
            .success(function(data) {
                currentListService.setProductList(data);   // save the productList so that other controllers can access it
                $scope.products = data.products;        // fill up scope.products, so that they can be displayed to the user
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    }
    else {
    // else if creating a new list, wait for the POST method to the API to create a productList finishes before
    // doing an http GET on that list to load it into the browser
        var myDataPromise = createListFactory.getData();
        myDataPromise.then(function(data){ //only run after http POST completes
            $scope.productList = data;
            $scope.productListID = data.productListID;
            $scope.listURL = document.URL + '/' + data.productListID;
            var productListID = $scope.productListID;
             $http.get('/api/productList/'+productListID)   //returns a productList with ID productListID
                .success(function(data) {
                    currentListService.setProductList(data)    // save the productList so that other controllers can access it
                    $scope.products = data.products;        // fill up scope.products, so that they can be displayed to the user
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

        });
    }

     //this will be called if the user wants to delete an item from the list
    $scope.deleteProduct = function(product){
        $http.delete('/api/productList/'+ $scope.productListID + '/' + product._id )
            .success(function(data) {
                $scope.products.splice($scope.products.indexOf(product), 1);    //remove the item from $scope.products, so the list of products the user sees is updated in real time
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

});

