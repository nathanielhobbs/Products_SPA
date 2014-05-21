// public/js/controllers/ProductListAddProductCtrl.js

angular.module('ProductListAddProductCtrl',[]).controller('ProductListAddProductController', function($scope, $http, $location, currentListService){
    // remove the Add Product buttton (inform the Main Controller that displays the menu)
    $scope.$emit('showButton', false);

    var currentProductList = currentListService.getProductList();
    $scope.productListID = currentProductList._id;
    // Function to submit form after Angular's validation
    $scope.submitForm = function(isValid){
        $scope.newProductFormSubmitted = true;

        //check if the form is valid or not
        if(isValid){
            $http.post('/api/productList/'+currentProductList._id, $scope.product)
            .success(function(data) {
                currentProductList.products.push($scope.product);       //push the product to the list of products so the user is updated in realtime
                $scope.product = {};                                    //clear the product
                $scope.newProductFormSubmitted=false;                   //make sure the form isn't counted as submitted (so that if the name is left blank, the user doesn't get a warning)
                console.log(data);
                //$window.location.href = '/productList/'+currentProductLis._id;
                $location.path('/productList/' + currentProductList._id);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    };
});

