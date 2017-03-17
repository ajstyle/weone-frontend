angular.module('weone').controller('clientBillingCtrl', ['$scope', '$modal', '$log', '$timeout', '$state', "apiService", function ($scope, $modal, $log, $timeout, $state, apiService) {


    $scope.minStartDate = 0; //fixed date
    $scope.$watch('start', function (v) {
        $scope.minEndDate = v;
    });
    $scope.$watch('end', function (v) {
        $scope.maxStartDate = v;
    });

    $scope.openStart = function () {
        $timeout(function () {
            $scope.startOpened = true;
        });
    };

    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
    };

    $scope.data = [];
    $scope.clients = [];
    $scope.currentPage=1;
    $scope.maxSize=4;

    $scope.getAllClient = function () {
      $scope.loading=true;
        apiService.getUserData({
            "role": 'ROLE_CLIENT',
            'skip': 0,
            limit: 0

        }).$promise.then(function (clientData) {
            console.log("clients", clientData.object.object.length);
              console.log("clients", clientData.object.object);
            $scope.clients = [];
            for (var i = 0; i < clientData.object.object.length; i++) {
                $scope.clients.push({
                    name: clientData.object.object[i].name,
                    _id: clientData.object.object[i]._id
                });
                $scope.loading=false;
            }
        }, function (err) {
            console.log('error in select client');
        });
    }

    $scope.filterData = {};
    $scope.setDefault = function () {
        $scope.limit = 10;
        $scope.skip = 0;
        $scope.pageCounter = 0;
        $scope.counter = 0;
        $scope.selectedIndex = 0;
        $scope.getDataFlag = true;
    }
    $scope.setDefault();
    $scope.filterOnTabClick = function (number) {
        $scope.selectedIndex = number
        console.log('Filter ', number)
        $scope.skip = $scope.limit * number;
        $scope.init($scope.limit);
    }

    $scope.show = function (status) {
        if (status == 'prev') {
            if ($scope.skip > 0) {
                $scope.skip -= $scope.limit;
                //  $scope.getJoinEvents();
                $scope.init($scope.limit);
            }
        } else if (status == 'next') {
            if (($scope.skip + $scope.data.length) < $scope.counter) {
                $scope.skip += $scope.data.length;
                //$scope.getJoinEvents();
                $scope.init($scope.limit);
            }
        }
        $scope.selectedIndex = $scope.skip / $scope.limit;
    }

    $scope.init = function (limit) {
        $scope.limit = limit;
        $scope.getClientBill($scope.clientId);
    }

    $scope.getClientBill = function (clientId,skip) {
      $scope.loading=true;
      console.log("skip is ",$scope.skip);
      console.log("client id in scope is ",$scope.clientId);
      console.log("client id in variable",clientId);
      // if($scope.clientId==clientId){
      //   $scope.skip=$scope.skip;
      //   console.log("skip in if part is ",$scope.skip);
      // }else {
      //   $scope.skip=0;
      //   console.log("heloo skip in else part is",$scope.skip);
      // }
      // $scope.clientId=clientId;
        console.log($scope.date, clientId);
        if ($scope.date && clientId) {
            apiService.clientBill({
                clientId: clientId,
                date: $scope.date,
                skip: skip,
                limit: $scope.limit
            }).$promise.then(function (clientBillObjects) {
                console.log("bill data", clientBillObjects.object.object.length);
                if (clientBillObjects.object.count) {
                    $scope.counter = clientBillObjects.object.count;
                    console.log("count is ",$scope.counter);
                }

                if(clientBillObjects.object.object.length>0){
                  $scope.data=clientBillObjects.object.object;
                  $scope.pageCounter = Math.ceil($scope.counter / $scope.limit)*10;
                  console.log("page counter is ",$scope.pageCounter);
            $scope.totalCharges = clientBillObjects.object.object[0].client_details._id.client_account.client_charges_available;

                  $scope.loading=false;
                }else {
                  $scope.data.length=0;
                  $scope.loading=false;
                    $scope.totalCharges=null;
                }
            }, function (err) {
                console.log("error in client bill");
                console.log(err);
            })
        } else {
            if (!clientId)
                toastr.error("Client is not selected please select client", "oops");
                $scope.loading=false;
            if (!$scope.date)
                toastr.error("Date is not selected please select date", "oops");
                $scope.loading=false;
        }
    }

//     var displayClientBill = function (clientBillObjects) {
//       console.log("client bill object",clientBillObjects);
//         for (var i = 0; i < clientBillObjects.length; i++) {
//         if (clientBillObjects.length){
//             $scope.totalCharges = clientBillObjects[0].client_details._id.client_account.client_charges_available;
// }
//     }
//   }
    $scope.getAllClient();
    $scope.pageChanged=function(){
  $scope.skip=($scope.currentPage-1)*$scope.limit;
    $scope.getClientBill($scope.clientId,$scope.skip);
}

    $scope.openUserInfo = function (id, type) {
        console.log("open user ", id, type);
        $modal.open({
            templateUrl: '/app/tpls/client-billing/popup/urlClick.html',
            backdrop: 'true',
            windowClass: 'modal',
            size: 'lg',
            controller: 'advertisementUsers',
            resolve: {
                id: function () {
                    return id
                },
                type: function () {
                    return type
                }
            }
        });

    }
}])

.controller('advertisementUsers', ['$scope', '$modal', '$log', '$timeout', '$state', 'id', 'type', 'apiService', '$modalInstance', function ($scope, $modal, $log, $timeout, $state, id, type, apiService, $modalInstance) {
  $scope.maxSize=4;
  $scope.itemsPerPage=10;
  $scope.total=10;
  $scope.currentPage=1;
    $scope.urlClick = [];
    if (type == 'click') {
        $scope.title = "No. of Url Click"
    } else {
        $scope.title = "No. of Views"
    }

    apiService.advertisementUser({
        id: id,
        type: type
    }).$promise.then(function (userData) {

        console.log("user date", userData.object);
        $scope.totalItems=userData.object.users.length;
        console.log("total items are",$scope.totalItems);
        $scope.pageCounterOfUser = Math.ceil($scope.totalItems/ $scope.itemsPerPage);
              if($scope.pageCounterOfUser==1){
                $scope.total=$scope.totalItems;
              }
                      $scope.urlClick = [];
        for (var i = 0; i < userData.object.users.length; i++) {
            $scope.urlClick.push({
                name: userData.object.users[i].name,
                phone: (userData.object.users[i].phonenumber) ? userData.object.users[i].phonenumber : 'N/A',
                email: (userData.object.users[i].email) ? userData.object.users[i].email : 'N/A',
                image_url: (userData.object.users[i].image_url) ? userData.object.users[i].image_url : "assets/images/user-2.png"
            });
        }
    }, function (err) {
        console.log('error in get advertisement users');
    })


    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
    $scope.pageChanged=function(){
      $scope.total=($scope.currentPage)*$scope.itemsPerPage;
      if($scope.currentPage==$scope.pageCounterOfUser){

        $scope.total=$scope.totalItems;
        console.log("total is",$scope.total);

      }
      console.log("total is",$scope.total,$scope.pageCounterOfUser);

    }


}]);
