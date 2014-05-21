// public/js/services/CurrentListService.js

// This factory will be used to allow different controllers to know which is the current product list
angular.module('CurrentListService',[]).service('currentListService', function() {
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

