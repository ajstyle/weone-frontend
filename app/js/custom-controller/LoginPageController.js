'use strict';
var weone = angular.module('weone.controllers')
weone.controller('LoginpageController', ['$scope', 'apiService','$state','dataFactory','$location',function ($scope, apiService,$state,dataFactory,$location) {
    console.log("login page controller called");
 
//it is for login the user
    $scope.login = function (valid) {
        console.log("login function", valid);
        $scope.submitted = true;
        if (valid) {
            console.log($scope.email, $scope.password);
            apiService.login({
                email: $scope.email,
                password: $scope.password
            }).$promise.then(function (obj) {
                console.log('successfull login', obj)
                dataFactory.saveTokenHeader(obj.object.authToken)
                dataFactory.saveUserEmail(obj.object.email);
               // console.log(dataFactory.getTokenHeader());
                 $state.go('app.dashboard');
            }, function (error) {
                console.log("error is occure",error);
                $scope.loginMsg=error.data.message;
            });
        } else {
            console.log('validation check');
        }
    }
//it will be used as reset the message during login and forgot    
    $scope.resetMsg = function () {
        $scope.messageAfterSubmit='';
        $scope.loginMsg='';
    }
//it will be used as fogot password 
    $scope.forgotPassword = function (valid) {
        console.log('forgot password function', valid);
        console.log($scope.email);
        $scope.submited = true;
        if (valid) {
            apiService.forgotPassword({
                email: $scope.email
            }).$promise.then(function (obj) {
                console.log("successfully ");
                console.log(obj.message);
                $scope.messageAfterSubmit = obj.message;
            }, function (error) {
                console.log('error is occure in forgot password');
                console.log(error);
                console.log(error.data.message);
                $scope.messageAfterSubmit = error.data.message;
            });
        } else {
            console.log('validation check');
        }
    }

}]);