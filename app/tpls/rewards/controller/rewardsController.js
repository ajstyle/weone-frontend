'use strict';

angular.module('weone').controller('createRewardController', ['$scope', '$modal', '$log', 'apiService', '$state', '$window', function ($scope, $modal, $log, apiService, $state, $window) {
    console.log("reward controller called");

    $scope.Users = [];
    $scope.reward = {};
    $scope.userIds = [];
    $scope.statusOfUser=[];
    $scope.limitValue = 10;
    $scope.skipValue = 0;
    $scope.totalUsers = 0;
    $scope.currentPage=1;
    $scope.maxSize=4;
    $scope.pageCounter=0;
    $scope.searchUserPage=1;
     $scope.searchFlag=false;
    $scope.noOfSelections = "No User Selected";
    $scope.selectedAll=false;
    $scope.loading=false;
    $scope.load=false;
    $scope.date=0;
    /*angular.element($window).bind("scroll", function(e) {
        console.log("scroll");
    }
     */
    // $scope.nextPage = function () {
    //     console.log("control in the next page");
    //
    //     if ($scope.skipValue <= $scope.totalUsers) {
    //         $scope.getUser();
    //         $scope.skipValue = $scope.skipValue + 10;
    //         $scope.busy = true
    //     } else {
    //         $scope.busy = true
    //     }
    //     //  console.log("buuuuuu", $scope.busy, $scope.totalUsers, $scope.skipValue)
    // }

    $scope.checkAll = function () {
        console.log("selectedAll", $scope.selectedAll)
        $scope.userIds = [];
        if ($scope.selectedAll) {
            // angular.forEach($scope.Users, function (user) {
            //     user.Selected = selectedAll;
            //     $scope.userIds.push(user._id);
            // });
            $scope.selectedAll = true;
            $scope.noOfSelections=    $scope.totalUsers+ " "+"User Selected";
            console.log("change in selections",$scope.selectedAll);

        } else {
            // angular.forEach($scope.Users, function (user) {
            //     user.Selected = selectedAll;
            // });
            $scope.selectedAll = false;
          $scope.noOfSelections="No User Selected";
            // $scope.userIds = [];
        }
        console.log("users length", $scope.userIds.length);
    };

    $scope.addOrRemoveUser = function (status, value) {
        console.log(status, "add or remove user", value);
        if (status) {
            $scope.userIds.push(value);
            console.log("index of selected users ",$scope.userIds.indexOf(value));
        } else {
            $scope.userIds.splice($scope.userIds.indexOf(value), 1);
        }
        console.log($scope.userIds.length)

    if($scope.userIds.length>1){
      $scope.noOfSelections = $scope.userIds.length+" Users Selected";
    }else if($scope.userIds.length == 1){
      $scope.noOfSelections = $scope.userIds.length+" User Selected";
    }else {
      $scope.noOfSelections = "No User Selected";
    }
}



    $scope.changeShowRecord = function () {
        $scope.getUser(0);
        $scope.search = ''
    }

    $scope.cancel = function () {
        console.log("cancel");
        $scope.reward = {};
    }

    $scope.searchUsers = function (skip) {
      $scope.load=true;
        $scope.Users = [];
        $scope.skipValue = 0;
        if ($scope.search == '') {
            $scope.searchFlag = false;
            $scope.getUser(0);
            $scope.currentPage=1;
            $scope.skipValue=0;
        } else {
          $scope.searchFlag = true;
          $scope.skipValue=skip;
            apiService.searchUsers({
                role: 'ROLE_USER',
                limit: $scope.limitValue,
                skip: skip,
                email: $scope.search
            }).$promise.then(function (response) {
            console.log('success', response.object.object.length);
            if(response.object.count){
              $scope.totalUsers=response.object.count;

            }
            if(response.object.object.length>0){
              $scope.Users=response.object.object;
              $scope.pageCounter = Math.ceil($scope.totalUsers / $scope.limitValue)*10;
              $scope.load=false;
              console.log("page counter for rewards is",$scope.pageCounter);
                     console.log("total users are ",$scope.Users);
                     if($scope.userIds.length>0){
                       console.log("in the if statement");
                     for( var  i=0;i<$scope.userIds.length;i++){
                  for( var j=0;j<$scope.Users.length;j++){
                    console.log("in the loop2 statement",$scope.userIds[i]);
                    if($scope.userIds[i]._id==$scope.Users[j]._id){
                      console.log("name in scope of userIds is",$scope.userIds[i].name);
                      console.log("selected field is ",$scope.userIds[i].Selected);
                      $scope.Users[j].Selected=true;
                    }

                  }
                     }
                   }
                   $scope.load=false;
            }else {
              $scope.Users.length=0;
              $scope.load=false;
            }

            }, function (error) {
                console.log("error is..", error);
            });
        }
    }

    $scope.sendReward = function (valid) {
      $scope.loading=true;
        console.log("reward is",$scope.reward);
        $scope.submitted = true;
        var data={};
        if (valid) {
          if($scope.selectedAll){
            console.log("selected all in scope is",$scope.selectedAll);
            console.log("reward is",$scope.reward);

            apiService.sendReward( {
              reward:$scope.reward,
              selectedAll:$scope.selectedAll,
          userIds:$scope.userIds
        }).$promise.then(function (userData) {
                console.log("reward send to user successfully");
                $scope.loading=false;
                if (userData.object.count) {
                    $scope.totalUsers = userData.object.count;
                    console.log("total users", $scope.totalUsers);
                }
              })
          }
          else {
            if ($scope.userIds.length != 0) {
              console.log("selected all in scope is",$scope.selectedAll);

                apiService.sendReward({
                  reward:$scope.reward,
                  selectedAll:$scope.selectedAll,
              userIds:$scope.userIds
            }).$promise.then(function (userData) {
                    console.log("reward send to user successfully");

                    if (userData.object.count) {
                        $scope.totalUsers = userData.object.count;
                        console.log("total users", $scope.totalUsers);
                    }
                      $scope.loading=false;
                    toastr.success("Reward sent successfully", "Success");
                    $state.go($state.current, {}, {
                        reload: true
                    });
                }, function (error) {
                    console.log("error in the send reward");
                    console.log(error);
                });
            } else {
                $scope.loading=false;
                toastr.error("Please, Select atleast one user", "Oops");
            }
        }
      }
    }

    $scope.getUser = function (skip) {
      $scope.load=true;
        apiService.getUserData({
            role: 'ROLE_USER',
            limit: $scope.limitValue,
            skip: skip,
            date:$scope.date
        }).$promise.then(function (userData) {
          console.log("userData is",userData);
            if (userData.object.count) {
                $scope.totalUsers = userData.object.count;
                console.log("total users", $scope.totalUsers);
            }
            console.log('success', userData.object.object.length);
            // $scope.retrieveUser(userData.object);
            // $scope.busy = false;
            if(userData.object.object.length>0){
                $scope.Users=userData.object.object;
                $scope.pageCounter = Math.ceil($scope.totalUsers / $scope.limitValue)*10;
                $scope.load=false;
            }else {
               $scope.Users.length=0;
               $scope.load=false;
            }
        }, function (error) {
            console.log('error is occure in retrive the app data');
            console.log(error);
        });
    }

    // $scope.retrieveUser = function (userData) {
    //         //$scope.Users = [];
    //         for (var i = 0; i < userData.obj.length; i++) {
    //             $scope.Users.push({
    //                 name: userData.obj[i].name,
    //                 phone: userData.obj[i].phonenumber,
    //                 _id: userData.obj[i]._id
    //             });
    //         }
    //     }
        $scope.getUser(0);
        $scope.pageChanged=function(){
          if($scope.searchFlag==false){
      $scope.skipValue=($scope.currentPage-1)*$scope.limitValue;
        $scope.getUser($scope.skipValue);
      }else {
            $scope.skipValue=($scope.searchUserPage-1)*$scope.limitValue;
            $scope.searchUsers($scope.skipValue);
      }
        }
    }]).controller('retrieveRewardController', ["$scope", "apiService", "$modal", "$state", function ($scope, apiService, $modal, $state) {
    console.log("edit reward controller called");
    $scope.data = [];
    $scope.deleteConfirmation = function (rewardId) {
        $modal.open({
            templateUrl: '/app/tpls/common/popup/deleteConfirmation.html',
            backdrop: 'static',
            windowClass: 'modal',
            size: 'md',
            controller: 'deleteRewardController',
            resolve: {
                rewardId: function () {
                    return rewardId;
                }
            }
        });
    }
    $scope.filterData = {};
    $scope.setDefault = function () {
        $scope.filterData.skip = 0;
        $scope.filterData.limit = 10;
        $scope.totalPage = 0;
        $scope.counter = 0;
        $scope.selectedIndex = 0;
        $scope.searchFlag = false;
        $scope.currentPage=1;
        $scope.maxSize=4;
        $scope.loading=false;
    }
    $scope.setDefault();
    $scope.filterOnTabClick = function (number) {
        $scope.selectedIndex = number
        console.log('Filter ', number)
        $scope.filterData.skip = $scope.filterData.limit * number;
        $scope.init($scope.filterData.skip);
    }

    $scope.show = function (status) {
        if (status == 'prev') {
            if ($scope.filterData.skip > 0) {
                $scope.filterData.skip -= $scope.filterData.limit;
                //  $scope.getJoinEvents();
                $scope.init($scope.filterData.skip);
            }
        } else if (status == 'next') {
            if (($scope.filterData.skip + $scope.data.length) < $scope.counter) {
                $scope.filterData.skip += $scope.data.length;
                //$scope.getJoinEvents();
                $scope.init($scope.filterData.skip);
            }
        }
        $scope.selectedIndex = $scope.filterData.skip / $scope.filterData.limit;
    }
    $scope.init = function (skip) {
        $scope.retrieveRewards(skip);
    }

    $scope.openEditReward = function (rewardData) {
        $modal.open({
            templateUrl: '/app/tpls/rewards/popup/edit.html',
            backdrop: 'static',
            windowClass: 'modal',
            size: 'lg',
            controller: 'editRewardController',
            resolve: {
                rewardData: function () {
                    return rewardData;
                }
            }
        })
    }

    $scope.retrieveRewards = function (skip) {
      $scope.loading=true;
        apiService.retrieveRewards({
            skip: skip,
            limit: $scope.filterData.limit
        }).$promise.then(function (rewardData) {
            //console.log(rewardData.object.rewardObjects)
            if (rewardData.object.count) {
                $scope.counter = rewardData.object.count;
                console.log("total rewards  are",$scope.counter );
            }
            if (rewardData.object.rewardObjects.length>0) {
                $scope.totalPageInRewards = Math.ceil($scope.counter / $scope.filterData.limit)*10;
                $scope.data = rewardData.object.rewardObjects;
                $scope.loading=false;

            }
            else {
              $scope.data.length=0;
                $scope.loading=false;
            }
        }, function (err) {
            console.log("Error in retrieve rewards list", err);
        });
    }
    $scope.init(0);
    $scope.pageChangedInRewards=function(){
    $scope.filterData.skip=($scope.currentPage-1)*$scope.filterData.limit;
    $scope.retrieveRewards($scope.filterData.skip);
    }


}]).controller('deleteRewardController', ['$scope', '$modalInstance', 'rewardId', 'apiService', '$state', function ($scope, $modalInstance, rewardId, apiService, $state) {
    console.log("delete controller called", rewardId);
    $scope.ok = function () {
        apiService.deleteReward({
            reward_id: rewardId
        }).$promise.then(function (obj) {
            console.log("success", obj);
            $state.go($state.current, {}, {
                reload: true
            });
        }, function (error) {
            console.log("error is occure in delete");
            console.log(error);
        })
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}]).controller('editRewardController', ['$scope', '$modalInstance', 'rewardData', 'apiService', '$state', function ($scope, $modalInstance, rewardData, apiService, $state) {
    console.log("editRewardController controller called", rewardData);
    $scope.reward = {};
    $scope.reward.reward_id = rewardData._id;
    $scope.reward.coupon = {};
    $scope.reward.cash_amount = rewardData.cash_amount;
    $scope.reward.name = rewardData.reward_name;
    $scope.reward.coupon.coupon_code = rewardData.coupon_code;
    $scope.reward.text_to_display = rewardData.text_to_display;
    $scope.updateReward = function (valid) {
        $scope.submitted = true;
        if (valid) {
            apiService.updateReward({
                reward: $scope.reward
            }).$promise.then(function (obj) {
                console.log("success", obj);
                $state.go($state.current, {}, {
                    reload: true
                });
            }, function (error) {
                console.log("error is occure in delete");
                console.log(error);
            })
            $modalInstance.close();
        } else {
            console.log("Invalid state")
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}])
