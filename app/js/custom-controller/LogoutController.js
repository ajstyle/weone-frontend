var weone = angular.module('weone.controllers')
weone.controller('logoutController', ['$scope', 'apiService','$state','dataFactory',function ($scope, apiService,$state,dataFactory) {
    console.log('logout controller called');
    
    $scope.globalEmail=dataFactory.getUserEmail();  
     $scope.logout=function(){
        console.log('control in the logout user');
        apiService.logout({}).$promise.then(function(obj){
            console.log('success logout');
            console.log(obj);
            dataFactory.deleteAll();
             $state.go('login');
        },function(error){
            console.log('error in logout');
            
        });
    }


}]);