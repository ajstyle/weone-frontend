'use strict';
angular.module('weone')
    .factory('dataFactory', ['$rootScope', function ($rootScope) {

        return {
            saveTokenHeader: function (token) {
                localStorage.setItem('authToken',token);
            },
            getTokenHeader: function () {
                return localStorage.getItem('authToken');
            },
            saveUserEmail:function(email){
                localStorage.setItem('Email',email);
            },
            getUserEmail:function(){
                return localStorage.getItem('Email');
            },
            deleteAll:function(){
                localStorage.clear();
            }

        };
    }]);