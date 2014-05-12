// pulbic/js/productsApp.js

// create the module and include ngRoute for all our routing needs
var productsApp = angular.module('productsApp', ['ngRoute']);

//configure our routes
productsApp.config(function($routeProvider, $locationProvider){
    $routeProvider

    // route for the homepage
    .when('/', {
        templateUrl : 'views/home.html',
        controller : 'MainController'
    })

    .when('/addProduct', {
        templateUrl : 'views/productListAddProduct.html',
        controller : 'ProductListAddProductController'
    })

    .when('/productList', {
        templateUrl : 'views/productList.html',
        controller : 'ProductListController'
    })

    .when('/productList/:productListID', {
        templateUrl: 'views/productList.html',
        controller: 'ProductListController'
    })

    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
});

productsApp.controller('MainController', function($scope) {
    // ensure that any time the user goes back home that they are not displayed the Add Item button
    $scope.$emit('showButton', false);

    // if receive an emitted event to show the "Add Item" button, update scope accordingly
    $scope.$on('showButton',function(event, args) {
        $scope.showAddButton=args;
    });
});


// This is a factory we use to defer to result of the POST to our API
// without it, we won't be able to use the newly created productList's _id in ProductListController
productsApp.factory('createListFactory', function($http, $q) {
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

// This factory will be used to allow different controllers to know which is the current product list
productsApp.service('currentListFactory', function() {
    var currentProductList = '';
    return {
        getProductList: function () {
            return currentProductList;
        },
        setProductList: function(value) {
            currentProductList = value;
        }
    };
});

productsApp.controller('ProductListAddProductController', function($scope, $http, $location, currentListFactory){
    // remove the Add Product buttton (inform the Main Controller that displays the menu)
    $scope.$emit('showButton', false);

    var currentProductList = currentListFactory.getProductList();
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

productsApp.controller('ProductListController', function($scope, $http, $routeParams, createListFactory, currentListFactory ){
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
                currentListFactory.setProductList(data);   // save the productList so that other controllers can access it
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
                    currentListFactory.setProductList(data)    // save the productList so that other controllers can access it
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

