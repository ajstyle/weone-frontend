 'use strict';

 angular.module('weone.controllers').controller("googlemapController", ["$scope", "$state", "$log", "$location", "$document", "$timeout", "$modalInstance","latitude","longitude","radius", function ($scope,$state, $log, $location, $document, $timeout,$modalInstance,latitude,longitude,radius) {
    var self = this;
     $scope.Circle;
      
      $scope.latitude= latitude;
     $scope.longitude= longitude ;
     $scope.radius=radius;
     $scope.init=function() {
         
         var map = new google.maps.Map(document.getElementById('map'), {
             center: {
                 lat: $scope.latitude,
                 lng: $scope.longitude
             },
             zoom: 13,
             mapTypeId: google.maps.MapTypeId.ROADMAP
         });


          $scope.Circle = new google.maps.Circle({
             strokeColor: '#FF0000',
             strokeOpacity: 0.8,
             strokeWeight: 2,
             fillColor: '#FF0000',
             fillOpacity: 0.35,
             map: map,
             center: map.getCenter(),
             radius: $scope.radius,
             draggable: true,
             editable: true
         });

         // Create the search box and link it to the UI element.
         var input = document.getElementById('pac-input');
         var searchBox = new google.maps.places.SearchBox(input);
         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

         // Bias the SearchBox results towards current map's viewport.
         map.addListener('bounds_changed', function () {
             searchBox.setBounds(map.getBounds());
         });



         var markers = [];
         // [START region_getplaces]
         // Listen for the event fired when the user selects a prediction and retrieve
         // more details for that place.
         searchBox.addListener('places_changed', function () {
             var places = searchBox.getPlaces();
             if (places.length == 0) {
                 return;
             }

             // Clear out the old markers.
             markers.forEach(function (marker) {
                 marker.setMap(null);
             });
             markers = [];

             // For each place, get the icon, name and location.
             var bounds = new google.maps.LatLngBounds();
             places.forEach(function (place) {
                 var icon = {
                     url: place.icon,
                     size: new google.maps.Size(71, 71),
                     origin: new google.maps.Point(0, 0),
                     anchor: new google.maps.Point(17, 34),
                     scaledSize: new google.maps.Size(25, 25)
                 };


                 // Create a marker for each place.
                  markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location


                  }))

                 if (place.geometry.viewport) {
                     // Only geocodes have viewport.
                     bounds.union(place.geometry.viewport);
                 } else {
                     bounds.extend(place.geometry.location);
                 }
             });
             map.fitBounds(bounds);

             $scope.Circle = new google.maps.Circle({
                 strokeColor: '#FF0000',
                 strokeOpacity: 0.8,
                 strokeWeight: 2,
                 fillColor: '#FF0000',
                 fillOpacity: 0.35,
                 map: map,
                 center: map.getCenter(),
                 radius: 2000,
                 draggable: true,
                 editable: true
             });

         });
         // [END region_getplaces]
         //google.maps.event.addListener(map, 'click', function(event) {

         //  marker = new google.maps.Marker({position: event.latLng, map: map});

         //});
         $timeout(function () {
             google.maps.event.trigger(map, 'resize');
             //map.setCenter(myLatLng);
         })

  }

      $scope.close = function () {
        $modalInstance.dismiss();
    }

    $scope.ok = function () {
      
        var data={};
        
              var radius = $scope.Circle.getRadius();
              var latt = $scope.Circle.getCenter().lat();
              var longg = $scope.Circle.getCenter().lng();
              data.radius=radius;
              data.latitude=latt;
               data.longitude=longg;
        
        $modalInstance.close(data);
    }



}]);
