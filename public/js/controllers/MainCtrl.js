// public/js/controllers/MainCtrl.js

angular.module('MainCtrl', []).controller('MainController', function($scope) { 
    // ensure that any time the user goes back home that they are not displayed the Add Item button 
    $scope.$emit('showButton', false); 

    // if receive an emitted event to show the "Add Item" button, update scope accordingly 
    $scope.$on('showButton',function(event, args) {
        $scope.showAddButton=args;
    });
 });
