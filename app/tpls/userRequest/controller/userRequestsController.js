angular.module('weone.User').controller('userRequestsController', ['$scope','apiService','$modal', function ($scope,apiService,$modal) {
console.log("helloooo");
  $scope.maxSizeOfUser = 4;
  $scope.currentPageOfUser=1;
  $scope.searchPageOfUser=1;
  $scope.setDefault = function () {
      $scope.skip = 0;
      $scope.limit = 10;
      $scope.count=0;
       $scope.pageCounterOfUser=0;
      $scope.searchFlag = false;
        $scope.loading=false;

  }
  $scope.setDefault();

  $scope.changeShowRecord = function () {
      $scope.skip = 0;
      $scope.selectedIndex = 0
      console.log("limit value", $scope.limitValue)
      $scope.limit = $scope.limitValue;
      $scope.getDeleteRequests(0);
      $scope.currentPageOfUser=1;
  }
  $scope.searchUsersInDeleteRequest = function (skip) {
      $scope.loading=true;
      if ($scope.search == '') {
          console.log("search box..", $scope.search)
          $scope.searchFlag = false;
          $scope.getDeleteRequests(0);
          $scope.currentPageOfUser=1;
        $scope.searchPageOfUser=1;
          $scope.skip=0;
      } else {
        console.log("hrllo else in search");
          $scope.searchFlag = true;
           $scope.skip =skip;
          // $scope.selectedIndex = 0
          apiService.searchUsersInDeleteRequest({
            email: $scope.search,
                skip: skip,
              limit: $scope.limit
          }).$promise.then(function (response) {
              if (response.object.count) {
                  $scope.count = response.object.count;
            console.log("counter in scope of search is",$scope.count);
              }
              if(response.object.object.length>0){
                $scope.delete_requests=response.object.object;
                $scope.pageCounterOfUser = Math.ceil($scope.count / $scope.limit)*10;
                console.log("counter in scope of search is",$scope.pageCounterOfUser);

                $scope.loading=false;

              }else {
                $scope.delete_requests.length=0;
                $scope.loading=false;
              }

          }, function (error) {
              console.log("error is..", error);
          });
      }
  }

   $scope.manageDeleteRequest = function(user,toDelete){
     var obj = {
       phonenumber : user.phonenumber,
       user : user._id,
       status : toDelete
     }
     apiService.manageDeleteRequest(obj).$promise.then(function(response) {
         console.log('success', response);
         toastr.success(response.message);
         $scope.getDeleteRequests(0);
     }, function (error) {
         console.log('error occured in retrieving the app data');
         console.log(error);
         toastr.error(response.message);
     });
   }

   $scope.getDeleteRequests =  function(skip){
     console.log("skip is ",skip);
     $scope.loading=true;
     apiService.getDeleteRequests({
       limit: $scope.limit,
       skip: skip
     }).$promise.then(function (requestData) {
         console.log('success', requestData);
         if(requestData.object.count>0){
           $scope.count=requestData.object.count;
           console.log("count is ",$scope.count);
            }
            if(requestData.object.deleteRequests.length>0){
              $scope.delete_requests = requestData.object.deleteRequests;
              if($scope.limit!=0){
                $scope.pageCounterOfUser = Math.ceil( $scope.count / $scope.limit)*10;
                console.log("page count is ",$scope.pageCounterOfUser);

         $scope.loading=false;
       }
       else {
         $scope.pageCounterOfUser=1;
         $scope.loading=false;
       }
}else {
     $scope.delete_requests.length=0;
     $scope.loading=false;
}
     }, function (error) {
         console.log('error occured in retrieving the app data');
         console.log(error);
     });
   };

   $scope.deleteUserRequestConfirmation = function(user) {
     console.log("clicked delete on",user.name);
       $modal.open({
           templateUrl: '/app/tpls/common/popup/requestDeleteConfirmation.html',
           backdrop: 'static',
           windowClass: 'modal',
           size: 'md',
           controller: 'requestDeleteController',
           resolve: {
               user: function () {
                   return user;
               }
           }
       }).result.then(function(returnObject){
          console.log("the response of modal is",returnObject);
          if(returnObject){
            $scope.getDeleteRequests(0);
          }
       })
   }

$scope.getDeleteRequests(0);
$scope.pageChangedInDeleteRequestOfUser=function(){
  console.log("search flag is ",$scope.searchFlag);
  console.log("skip is ",$scope.skip);
  if($scope.searchFlag==false){
$scope.skip=($scope.currentPageOfUser-1)*$scope.limit;
console.log("skip inside if is ",$scope.skip);

$scope.getDeleteRequests($scope.skip);
}else {
    $scope.skip=($scope.searchPageOfUser-1)*$scope.limit;
    $scope.searchUsersInDeleteRequest($scope.skip);
}
}


}])

.controller('userPaymentRequestsController', ['$scope','apiService','$modal', function ($scope,apiService,$modal) {
   console.log("Inside Payment Request Controller");
   $scope.maxSizeOfUser = 4;
   $scope.currentPageOfUser=1;
   $scope.searchPageOfUser=1;
   $scope.setDefault = function () {
       $scope.skip = 0;
       $scope.limit = 10;
       $scope.count=0;
        $scope.pageCounterOfUser=0;
       $scope.searchFlag = false;
         $scope.loading=false;
         $scope.payment_requests=[];
   }
   $scope.setDefault();

   $scope.changeShowRecord = function () {
       $scope.skip = 0;
       $scope.selectedIndex = 0
       console.log("limit value", $scope.limitValue)
       $scope.limit = $scope.limitValue;
       $scope.getPaymentRequests(0);
       $scope.currentPageOfUser=1;
   }
   $scope.searchUsersInPaymentRequest = function (skip) {
       $scope.loading=true;
       if ($scope.search == '') {
           console.log("search box..", $scope.search)
           $scope.searchFlag = false;
           $scope.getPaymentRequests(0);
           $scope.currentPageOfUser=1;
         $scope.searchPageOfUser=1;
           $scope.skip=0;
       } else {
         console.log("hrllo else in search");
           $scope.searchFlag = true;
            $scope.skip =skip;
           // $scope.selectedIndex = 0
           apiService.searchUsersInPaymentRequest({
             type:'PAYMENT',
             email: $scope.search,
                 skip: skip,
               limit: $scope.limit
           }).$promise.then(function (response) {
               if (response.object.count) {
                   $scope.count = response.object.count;
             console.log("counter in scope of search is",$scope.count);
               }
               if(response.object.object.length>0){
                 $scope.payment_requests=response.object.object;
                 $scope.pageCounterOfUser = Math.ceil($scope.count / $scope.limit)*10;
                 console.log("counter in scope of search is",$scope.pageCounterOfUser);

                 $scope.loading=false;

               }else {
                 $scope.payment_requests.length=0;
                 $scope.loading=false;
               }

           }, function (error) {
               console.log("error is..", error);
           });
       }
   }

   $scope.getPaymentRequests =  function(skip){
     console.log("skip is in user paymetn",skip);
     $scope.loading=true;
     apiService.getPaymentRequests({
       type:'PAYMENT',
       limit: $scope.limit,
       skip: skip
     }).$promise.then(function (requestData) {
         console.log('success', requestData);
         if(requestData.object.count>0){
           $scope.count=requestData.object.count;
           console.log("count is ",$scope.count);
            }
            if(requestData.object.paymentRequests.length>0){
              console.log("helloo",requestData.object.paymentRequests);
              $scope.payment_requests = requestData.object.paymentRequests;
              if($scope.limit!=0){
                $scope.pageCounterOfUser = Math.ceil( $scope.count / $scope.limit)*10;
                console.log("page count is ",$scope.pageCounterOfUser);

         $scope.loading=false;
       }
       else {
         $scope.pageCounterOfUser=1;
         $scope.loading=false;
       }
}else {
     $scope.payment_requests.length=0;
     $scope.loading=false;
}
     }, function (error) {
         console.log('error occured in retrieving the app data');
         console.log(error);
     });
   };

$scope.getPaymentRequests(0);
$scope.pageChangedInPaymentRequestOfUser=function(){
  console.log("search flag is ",$scope.searchFlag);
  console.log("skip is ",$scope.skip);
  if($scope.searchFlag==false){
$scope.skip=($scope.currentPageOfUser-1)*$scope.limit;
console.log("skip inside if is ",$scope.skip);

$scope.getPaymentRequests($scope.skip);
}else {
    $scope.skip=($scope.searchPageOfUser-1)*$scope.limit;
    $scope.searchUsersInPaymentRequest($scope.skip);
}
}
  //  $scope.getPaymentRequests = function(){
  //    apiService.getPaymentRequests({type:'PAYMENT'}).$promise.then(function(response){
  //      console.log("the payment requests are",response);
  //      $scope.payment_requests = response.object.paymentRequests;
  //    }, function(error){
  //      console.log('error occured in retrieving the data');
  //      console.log(error);
  //    });
  //  }

   $scope.completeRequest = function(user){
     console.log("the user is",user);
     console.log("clicked delete on",user.name);
       $modal.open({
           templateUrl: '/app/tpls/userRequest/popup/requestCompleteConfirmation.html',
           backdrop: 'static',
           windowClass: 'modal',
           size: 'md',
           controller: 'completeRequestModalController',
           resolve: {
               user: function () {
                   return user;
               }
           }
       }).result.then(function(returnObject){
          console.log("the response of modal is",returnObject);
          if(returnObject){
             $scope.getPaymentRequests();
          }
       })
   }

   $scope.cancelUserRequest = function(user){
     console.log("the user is",user);
     console.log("clicked delete on",user.name);
       $modal.open({
           templateUrl: '/app/tpls/userRequest/popup/requestCancelConfirmation.html',
           backdrop: 'static',
           windowClass: 'modal',
           size: 'md',
           controller: 'cancelRequestModalController',
           resolve: {
               user: function () {
                   return user;
               }
           }
       }).result.then(function(returnObject){
          console.log("the response of modal is",returnObject);
          if(returnObject){
             $scope.getPaymentRequests();
          }
       })
   }

  //  $scope.getPaymentRequests();

}])

.controller('requestDeleteController', ['$scope', '$modalInstance', 'apiService','user', function ($scope, $modalInstance, apiService,user) {
    console.log("inside delete confirm controller modal",user.phonenumber,user._id);

    $scope.getDeleteRequests =  function(){
      apiService.getDeleteRequests().$promise.then(function (requestData) {
          console.log('success', requestData);
          $scope.delete_requests = requestData.object.deleteRequests;
      }, function (error) {
          console.log('error occured in retrieving the app data');
          console.log(error);
      });
    };



    $scope.ok = function () {
      var obj = {
        phonenumber : user.phonenumber,
        user : user._id,
        status : true
      }
      apiService.manageDeleteRequest(obj).$promise.then(function(response) {
          console.log('success', response);
          toastr.success(response.message);
          $modalInstance.close(true);
      }, function (error) {
          toastr.error("An error occured");
          $modalInstance.close(false);
          console.log('error occured in retrieving the app data');
          console.log(error);
      });
    };
    $scope.cancel = function () {
        $modalInstance.close(false);
    };
}])

.controller('cancelRequestModalController', ['$scope', '$modalInstance', 'apiService','user', function ($scope, $modalInstance, apiService,user) {

    $scope.ok = function () {

      var obj = {user: {
        _id:user._id,
        type:"PAYMENT",
        newStatus:"CANCELLED"
      }};

      console.log("the user is in modal",user);
      apiService.setUserRequests(obj).$promise.then(function(response) {
          console.log('success', response);
          toastr.success(response.message);
          $modalInstance.close(true);
      }, function (error) {
          toastr.error("An error occured");
          $modalInstance.close(false);
          console.log('error occured in retrieving the app data');
          console.log(error);
      });
    };

    $scope.cancel = function () {
        $modalInstance.close(false);
    };
}])

.controller('completeRequestModalController', ['$scope', '$modalInstance', 'apiService','user', function ($scope, $modalInstance, apiService,user) {

  $scope.ok = function () {

    var obj = {user: {
      _id:user._id,
      type:"PAYMENT",
      newStatus:"COMPLETED"
    }};

    console.log("the user is in modal",user);
    apiService.setUserRequests(obj).$promise.then(function(response) {
        console.log('success', response);
        toastr.success(response.message);
        $modalInstance.close(true);
    }, function (error) {
        toastr.error("An error occured");
        $modalInstance.close(false);
        console.log('error occured in retrieving the app data');
        console.log(error);
    });
  };

  $scope.cancel = function () {
      $modalInstance.close(false);
  };
}])
