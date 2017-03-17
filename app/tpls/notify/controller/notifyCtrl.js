angular.module('weone.notify').controller('notifyCtrl', ['$scope', '$modal','apiService', function ($scope,$modal,apiService) {

    console.log('control inaaaa the dashboard');
    $scope.date=0;
    //var all_users = [];
    $scope.users = [];
    var all_users = [];
    $scope.selected_users = [];
    $scope.filterData = {};
    $scope.noOfSelections = "No User Selected";
    $scope.maxSize=4;
     $scope.currentPage=1;
       $scope.searchUserPage=1;

    $scope.setDefault = function () {
        $scope.filterData.skip = 0;
        $scope.filterData.limit = 10;
        $scope.totalPage = [];
        $scope.counter = 0;
        $scope.selectedIndex = 0;
        $scope.searchFlag = false;
        $scope.notification_send = 'global';
        $scope.loading=false;
        $scope.load=false;
    }


    $scope.setDefault();


    $scope.getUser = function (skip) {
      $scope.load=true;
      $scope.data=[];
        apiService.getUserData({

            role: 'ROLE_USER',
            limit: $scope.filterData.limit,
            skip: skip,
            date:$scope.date
        }).$promise.then(function (userData) {
            console.log('success', userData.object.count);
            if (userData.object.count) {
                $scope.counter = userData.object.count;
            }
            if(userData.object.object.length>0){
             $scope.data=userData.object.object;
             $scope.pageCounter = Math.ceil($scope.counter / $scope.filterData.limit)*10;
                $scope.load=false;
            }
            else {
               $scope.data.length=0;
               $scope.load=false;

            }

        }, function (error) {
            console.log('error is occured in retriving the app data');
            console.log(error);
        });
    }

    $scope.searchUsers = function (skip) {
       $scope.load=true;
        if ($scope.search == '') {
            console.log("search box..", $scope.search)
            $scope.searchFlag = false;
            $scope.init(0);
            $scope.currentPage=1;
              $scope.filterData.skip=0;
        } else {
            $scope.searchFlag = true;
               $scope.filterData.skip =skip;
            $scope.selectedIndex = 0
            apiService.searchUsers({
                role: 'ROLE_USER',
                limit: $scope.filterData.limit,
                skip: $scope.filterData.skip,
                email: $scope.search
            }).$promise.then(function (response) {
                if (response.object.count) {
                    $scope.counter = response.object.count;
                }
                if(response.object.object.length>0){
                 $scope.data=response.object.object;
                 $scope.pageCounter = Math.ceil($scope.counter / $scope.filterData.limit)*10;
                    $scope.load=false;
                 if($scope.selected_users.length>0){
                   console.log("in the if statement");
                 for( var  i=0;i<$scope.selected_users.length;i++){
              for( var j=0;j<$scope.data.length;j++){
                console.log("in the loop2 statement",$scope.selected_users[i]);
                if($scope.selected_users[i]._id==$scope.data[j]._id){
                  console.log("name in scope of userIds is",$scope.selected_users[i].name);
                  console.log("selected field is ",$scope.selected_users[i].selected);
                  $scope.data[j].selected=true;
                }

              }
                 }
               }
            // $scope.loading=false;
                }
                else {
                   $scope.data.length=0;
                   $scope.load=false;
                }


            }, function (error) {
                console.log("error is..", error);
            });
        }
    }
    $scope.add = function(sel_user){
      console.log("the sel_user",sel_user);
      var index = $scope.selected_users.indexOf(sel_user);
      if(index == -1 && sel_user.selected){
        $scope.selected_users.push(sel_user);
      } else if (!sel_user.selected && index != -1){
      $scope.selected_users.splice(index, 1);
      console.log("the users count is",$scope.users.length);
    }
    console.log("the selected are",$scope.selected_users.length);
    if($scope.selected_users.length>1){
      $scope.noOfSelections = $scope.selected_users.length+" Users Selected";
    }else if($scope.selected_users.length == 1){
      $scope.noOfSelections = $scope.selected_users.length+" User Selected";
    }else {
      $scope.noOfSelections = "No User Selected";
    }

  }


   $scope.checkAll = function () {
     console.log($scope.selectedAll);
        if ($scope.selectedAll) {
         $scope.selectedAll = false;
         $scope.noOfSelections="No User Selected";
        }
        else {
           $scope.selectedAll = true;
           $scope.noOfSelections=$scope.counter+ " "+"User Selected";
           console.log("change in selections",$scope.selectedAll);
        }
    };

    $scope.getNotificationType = function(val){

      console.log("the notification_type is",val);
      $scope.notification_send = val;
    }

    $scope.send_notification = function(){
$scope.loading=true;
if($scope.selectedAll){
      var data={};
      if($scope.subject){
        if($scope.message_body && $scope.message_body!=''){
     data.message = $scope.subject.toUpperCase()+": "+$scope.message_body;
      data.type = $scope.notification_send;
      data.selectedAll = true;
      var selected=$scope.selectedAll;
      console.log("the data sent is",data);
    apiService.globalNotification(data).$promise.then(function(response){
      console.log("response is ",response);
      toastr.success("Your message has been sent", 'Success');
      $scope.loading=false;
    },function (error) {
        console.log('some error');
        console.log(error);
  })
}
 else {
    $scope.loading=false;
       toastr.error("No message to send", 'Error');

  }
 }
  else {
      $scope.loading=false;
toastr.error("Please enter a subject for the Message", 'Error');
  }
  }else {
      if($scope.selected_users.length<1){
          $scope.loading=false;
        toastr.error("No Recipients are selected. Please select atleast one.", 'Error');
      }else {
        if($scope.subject){
          if($scope.message_body && $scope.message_body!=''){
            var userIds = $scope.selected_users.map(function(user){
                return user._id;
            })
            var data = {};
            data.users = userIds;
            data.message = $scope.subject.toUpperCase()+": "+$scope.message_body;
            data.type = $scope.notification_send
            data.selectedAll = false;
            console.log("the data sent is",data);

            apiService.globalNotification(data).$promise.then(function (response) {
                console.log("the response is",response);
                $scope.loading=false;
                toastr.success("Your message has been sent", 'Success');
              }, function (error) {
                  console.log('some error');
                  console.log(error);
            });
          }else {
              $scope.loading=false;
            toastr.error("No message to send", 'Error');
          }
        }else {
            $scope.loading=false;
          toastr.error("Please enter a subject for the Message", 'Error');
        }
      }

  }
    }

    $scope.changeShowRecord = function () {
        $scope.filterData.skip = 0;
        $scope.selectedIndex = 0
        console.log("limit value", $scope.limitValue)
        $scope.filterData.limit = $scope.limitValue;
        $scope.init(0);
        $scope.currentPage=1;
    }
    $scope.pageChanged=function(){
      if($scope.searchFlag==false){
  $scope.filterData.skip=($scope.currentPage-1)*$scope.filterData.limit;
    $scope.init($scope.filterData.skip);
  }else {
        $scope.filterData.skip=($scope.searchPage-1)*$scope.filterData.limit;
        $scope.searchUsers($scope.filterData.skip);
  }
    }
    $scope.init = function (skip) {
        if ($scope.searchFlag == false)
            $scope.getUser(skip)
        else
            $scope.searchUsers();

    }


    $scope.init(0);





}]);
