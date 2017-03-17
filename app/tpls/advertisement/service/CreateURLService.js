var app = angular.module('weone.Advertisement');
app.service('createURLService', function ($enviornment) {

    return {
        createURLForVideo: function (advDetails) {
            var URL= "http://api.weoneapp.com:8880/#/upload/";
            
//            var URL = $enviornment.videoUploadUrl
            var videoURL = URL + advDetails.object.advert_type + "/" + advDetails.object.name_of_advert + "/" + advDetails.object.authToken
            var randomnumber = Math.floor((Math.random() * 100) + 1);
            window.open(videoURL, "_blank", 'PopUp' + randomnumber + ',scrollbars=1,menubar=0,resizable=1,width=850,height=500');
            console.log("New window opened..");

        }

    }


})
