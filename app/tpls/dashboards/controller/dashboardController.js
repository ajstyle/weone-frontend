angular.module('weone.Dashboard').controller('dashboardController', ['$scope', '$modal', 'apiService', function ($scope, $modal, apiService) {

    console.log('control in the dashboard');
    apiService.dashboard().$promise.then(function (dashboardDate) {
        console.log('dashboard datat', dashboardDate.object)
        $scope.totalUsers = dashboardDate.object.totalUser;
        $scope.totalAdvertisement = dashboardDate.object.totalAdvertisement;
    }, function (err) {
        console.log("error in dashborad data");
        console.log(err);
    })

    apiService.adminRevenue().$promise.then(function (adminRevenue) {
        console.log("admin revenue", adminRevenue.object);
        if(adminRevenue.object.totalRevenue)
        $scope.totalRevenue = (adminRevenue.object.totalRevenue).toFixed(2);
        else
         $scope.totalRevenue=0;
        if(adminRevenue.object.lastWeekRevenue)
        $scope.lastWeekRevenue = (adminRevenue.object.lastWeekRevenue).toFixed(2);
        else
        $scope.lastWeekRevenue=0;
        if(adminRevenue.object.lastMonthRevenue)
        $scope.lastMonthRevenue = (adminRevenue.object.lastMonthRevenue).toFixed(2);
        else
        $scope.lastMonthRevenue=0;
    }, function (error) {
        console.log("error in the admin revenue");
        console.log(error);
    })
    apiService.adminClients().$promise.then(function(topClients){
      if(topClients.object){
        $scope.clients = topClients.object;
      }else{
        $scope.clients=topClients.message;
      }
    },function(error){
      console.log("error in getting top 10 clients");
      console.log(error);
    })
    apiService.adminAdvertisements().$promise.then(function(topAdvertisement){
      if(topAdvertisement.object){
        $scope.advertisements = topAdvertisement.object;
      }else{
        $scope.advertisements = topAdvertisement.message;
      }
    },function(error){
      console.log("error in getting top 10 advertisements");
      console.log(error);
    })
    apiService.getAdvertisementsCharge().$promise.then(function(advertCharges){
      if(advertCharges.object){
          $scope.totalClientCharges = advertCharges.object;
      }else{
        $scope.totalClientCharges = advertCharges.message;
      }
    },function(error){
      console.log("error in getting top 10 advertisements");
      console.log(error);
    })


}]).directive('chart', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=data'
        },
        template: '<div class="chart"></div>',
        link: function (scope, element, attrs) {
            var chart = new google.visualization.GeoChart(element[0]);

            var options = {
                region: 'IN',
                displayMode: 'regions',
                resolution: 'provinces',
                width: 625,
                height: 480
            };

            scope.$watch('data', function (v) {

                var data = google.visualization.arrayToDataTable(v);
                chart.draw(data, options);

            });

        }
    };

}).controller('ChartController', ["$scope", "apiService", function ($scope, apiService) {

    $scope.scoreHistory = [];
    $scope.states = [];
    $scope.loadDataFromServer = function () {

        var scoreHistory = [['State', 'Users']];
        apiService.getUsersLocations().$promise.then(function (userLocation) {
            console.log("total state", userLocation.object.length)
            for (var i = 0; i < userLocation.object.length; i++) {
                if (userLocation.object[i]._id != null && userLocation.object[i]._id != "") {
                    scoreHistory.push([userLocation.object[i]._id, userLocation.object[i].totalusers]);
                    $scope.states.push({
                        state: userLocation.object[i]._id,
                        users: userLocation.object[i].totalusers
                    });
                }
            }
            $scope.scoreHistory = scoreHistory;
        }, function (err) {
            console.log("error in get user location");
            console.log(err);
        })
    };
    $scope.loadDataFromServer()

}]);

google.setOnLoadCallback(function () {

  //  angular.bootstrap(document, ['app']);

});

google.load('visualization', '1', {
    'packages': ['geochart']
});
