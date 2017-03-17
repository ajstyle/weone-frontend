var app1 = angular.module('uploadVideo', ['ngFileUpload', 'ui.bootstrap', 'ui.router', 'ng-jwplayer', 'Config']);
//app1.constant("httpUrl","http://192.168.2.106:3000");
//app1.constant("httpUrl","http://182.71.214.253:3000");
//app1.constant("httpUrl","http://52.77.32.166:80");
//app1.constant("smilUrl","http://192.168.2.106:1935/vod/_definst_/");
//app1.constant("smilUrl","http://52.77.32.166:1935/vod/_definst_/");
//app1.constant("smilUrl","http://182.71.214.253:1935/vod/_definst_/");
//app1.constant("imageUrl","http://192.168.2.106:8595/video/");
//app1.constant("imageUrl","http://52.77.32.166:8595/video/");
//app1.constant("imageUrl","http://182.71.214.253:8595/video/");
app1.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/upload");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $stateProvider.
        // Main Layout Structure
    state('upload', {
        url: '/upload/:advType/:advName/:advToken',
        templateUrl: 'videoUpload.html',
        controller: 'UploadVideoController'
    }).
    state('viewVideo', {
        url: '/weone/:advType/:smilFile/:advName',
        templateUrl: 'viewVideo.html',
        controller: 'viewVideoController'
    }).
     state('faq', {
        url: '/weone/faq',
        templateUrl: 'faq.html'
    }).
      state('terms', {
        url: '/weone/term',
        templateUrl: 'term-and-condition.html'
    }).
      state('about', {
        url: '/weone/about',
        templateUrl: 'about.html'
    })

});
app1.controller('UploadVideoController', ["$scope", "$timeout", "Upload", "$enviornment", "$stateParams", "$window", function ($scope, $timeout, Upload, $enviornment, $stateParams, $window) {

    var type = $stateParams
    console.log("type is...", $stateParams);
    $scope.toggleCancel = false;

    if ($stateParams.advType == 'Video') {
        $scope.viewPattren = 'video'
    } else {
        $scope.viewPattren = 'image'
    }
    $scope.uploadFiles = function (file) {
        $scope.f = file;
        $scope.exportProcessing = true;
        if (file) {
            $scope.toggleCancel = true;
            $scope.file.upload = Upload.upload({
//                url: $enviornment.httpUrlVideoUpload + "/api/v1.1/admin/upload/advertisment",
	        url: "http://52.66.101.222:3000/api/v1.1/admin/upload/advertisment",
                data: {
                    file: file,
                    _id: $scope.advertId,
                    advert_type: $scope.advertType,
                    token: $stateParams.advToken
                }
            });

            $scope.file.upload.then(function (response) {
                $scope.exportProcessing = false;
                $timeout(function () {
                    file.result = response.data;
                    console.log("file is...", file);
                    $scope.showBeforeUpload = true;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    }

    $scope.cancelUpload = function () {
        console.log("cancel button")
        $scope.f.progress=0;
        $scope.file.upload.abort();
        $scope.file.upload.disableProgress=true;
        $scope.toggleCancel = false;
    }
    
}]);
app1.controller('viewVideoController', ["$scope", "$timeout", "$enviornment", "$stateParams", "$sce", "$enviornment", "$enviornment", function ($scope, $timeout, $enviornment, $stateParams, $sce, $enviornment, $enviornment) {
    $scope.smilURL = $stateParams.smilFile;
    $scope.advName = $stateParams.advName;
    $scope.advType = $stateParams.advType;
    $scope.fileTypeFlag = false;
    if ($scope.advType == 'Video') {
        $scope.fileTypeFlag = true;
        if (typeof window.orientation == 'undefined' && window.innerWidth > 960) {
            $scope.smil_URL = "http://52.66.101.222:1935/vod/_definst_/" + $stateParams.smilFile + "/smil:" + $stateParams.smilFile + ".smil/jwplayer.smil"
        } else {
            $scope.smil_URL = "http://52.66.101.222:1935/vod/_definst_/" + $stateParams.smilFile + "/smil:" + $stateParams.smilFile + ".smil/playlist.m3u8"

        }
    } else {
        $scope.image = $enviornment.imageUrl + $stateParams.smilFile + "/" + $stateParams.smilFile + "_thumbnail.jpg"

    }
    $scope.name = 'JWPlayer Example';
    $scope.options = {
        androidhls: true

    };
    $scope.file = $sce.trustAsResourceUrl($scope.smil_URL);
    // The directive waits to fire until the scope 
    // associated with 'watch-me' in the directive changes.
    // So we can set that here. 
    $scope.watchme = true;

}])
