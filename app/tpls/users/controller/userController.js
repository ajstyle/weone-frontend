angular.module('weone.User').controller('UserController', ['$scope', '$modal', '$log', '$timeout','apiService', '$state', function ($scope, $modal, $log,$timeout, apiService, $state) {
        // it is users object arrays
        console.log("hi.....kkkk");
        $scope.date=0;

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

        $scope.maxSize = 4;
        $scope.currentPage=1;
        $scope.searchPage=1;
        $scope.searchPageOfVoucher=1;

        $scope.searchUserPage=1;
         $scope.data = [];
          $scope.bankingData=[];
          $scope.searchVoucherData={};
        $scope.filterData = {};
        $scope.role = '';
        if ($state.current.name == 'app.users-admin-users') {
            $scope.role = 'ROLE_ADMIN';
            console.log('role', $scope.role);
        } else if ($state.current.name == 'app.users-app-users') {
            $scope.role = 'ROLE_USER';
            console.log('role', $scope.role);
        }else if ($state.current.name == 'app.users-banking-details') {
            $scope.role = 'ROLE_USER';
            console.log('role', $scope.role);
        }
        else if ($state.current.name == 'app.users-voucher-details') {
            $scope.role = 'ROLE_USER';
            console.log('role', $scope.role);
        }
        else if ($state.current.name == 'app.client') {
            $scope.role = 'ROLE_CLIENT'
            console.log('role', $scope.role);
        } else {
            console.log('no role defined');
        }

        $scope.setDefault = function () {
            $scope.filterData.skip = 0;
            $scope.filterData.limit = 10;
            $scope.totalPage = [];
            $scope.counter = 0;
              $scope.bankingPageCounter = 0;
              $scope.userVoucherPageCounter=0;
            $scope.count=0;
             $scope.pageCounter=0;
             $scope.PageCountInSearchBanking =0;
             $scope.pageCounterInSearchVoucher=0;
            $scope.selectedIndex = 0;
            $scope.searchFlag = false;
            $scope.searchFlagVoucher=false;
              $scope.loading=false;
              $scope.counterOfUser=0;
               $scope.pageCounterOfUser=0;
               $scope.skipOfUser=0;
               $scope.limitOfUser=10;
               $scope.dataOfUser=[];

        }
        $scope.setDefault();

$scope.openNetworkStatus = function (data) {
            $modal.open({
                templateUrl: '/app/tpls/users/popup/network-status.html',
                backdrop: 'true',
                windowClass: 'modal',
                size: 'md',
                controller: 'userNetworkTreeController',
                  resolve: {
                    userData: function () {
                        return data;
                    }
                }
            })
        }

        $scope.addClient = function () {
            $modal.open({
                templateUrl: '/app/tpls/client/popup/add-client.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'userAddController',
                resolve: {
                    role: function () {
                        return $scope.role;
                    }
                }
            })
        }

        $scope.addUser = function () {
            $modal.open({
                templateUrl: '/app/tpls/users/popup/add-user.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'userAddController',
                resolve: {
                    role: function () {
                        return $scope.role;
                    }
                }
            })
        }

        $scope.openModalEdit = function (data) {

            $modal.open({
                templateUrl: '/app/tpls/users/popup/edit.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'userEditController',
                resolve: {
                    userData: function () {
                        return data;
                    }
                }
            })
        }


        $scope.deleteConfirmation = function (id) {
            $modal.open({
                templateUrl: '/app/tpls/common/popup/deleteConfirmation.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'md',
                controller: 'deleteController',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            })
        }

        $scope.viewProfile = function (data) {

            $modal.open({
                templateUrl: '/app/tpls/users/popup/viewProfile.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'userProfileController',
                resolve: {
                    userData: function () {
                        return data;
                    }
                }
            })
        }
        $scope.viewEarningDetails=function(id){
          console.log("new user earning")
          $modal.open({
              templateUrl: '/app/tpls/users/popup/viewEarningDetails.html',
              backdrop: 'static',
              windowClass: 'modal',
              size: 'lg',
              controller: 'viewUserEarningController',
              resolve: {
                  id: function () {
                      return id;
                  }
              }
          })
        }
        $scope.viewModalVoucherOfUser= function (id) {

            $modal.open({
                templateUrl: '/app/tpls/users/popup/viewVoucherOfUser.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'viewVoucherOfUserController',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            })
        }
        // $scope.viewEarningDetails=function(id){
        //   console.log("new user earning")
        //   $modal.open({
        //       templateUrl: '/app/tpls/users/popup/viewEarningDetails.html',
        //       backdrop: 'static',
        //       windowClass: 'modal',
        //       size: 'lg',
        //       controller: 'viewUserEarningController',
        //       resolve: {
        //           id: function () {
        //               return id;
        //           }
        //       }
        //   })
        // }
        $scope.viewModalBankingDetailsOfUser = function (id) {

          $modal.open({
              templateUrl: '/app/tpls/users/popup/viewBankingDetails.html',
              backdrop: 'static',
              windowClass: 'modal',
              size: 'lg',
              controller: 'viewBankingDetailsController',
              resolve: {
                  id: function () {
                      return id;
                  }
              }
          })
      }


        $scope.editClient = function (data) {
            $modal.open({
                templateUrl: '/app/tpls/client/popup/edit-client.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'userEditController',
                resolve: {
                    userData: function () {
                        return data;
                    }
                }
            })
        }

        $scope.viewClient = function (data) {
            $modal.open({
                templateUrl: '/app/tpls/client/popup/view-client.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'userProfileController',
                resolve: {
                    userData: function () {
                        return data;
                    }
                }
            })
        }

        $scope.changeShowRecord = function () {
            $scope.skipOfUser = 0;
            $scope.selectedIndex = 0
            console.log("limit value", $scope.limitValue)
            $scope.limitOfUser = $scope.limitValue;
            $scope.init(0);
            $scope.currentPage=1;
        }
        $scope.reset=function(){
          console.log("hello in reset");
          $scope.skipOfUser=0;
          $scope.currentPage=1;
          $scope.init(0);
      }

        $scope.setAgain=function(){
          if($scope.search== ''){
          $scope.searchFlag=false;
          $scope.skipOfUser=0;
          $scope.currentPage=1;
          $scope.searchUserPage=1;
          $scope.init(0);
        }
      }
        //it will search all the user on base of their role
        $scope.searchUsers = function (skip) {
            $scope.loading=true;
            if ($scope.search == '') {
                console.log("search box..", $scope.search)
                $scope.searchFlag = false;
                $scope.init(0);
                $scope.currentPage=1;
                $scope.searchPage=1;
                $scope.searchUserPage=1;
                $scope.skipOfUser=0;
            } else {
              console.log("hrllo else in search");
                $scope.searchFlag = true;
                var userNumber=$scope.search;
                if(parseInt(userNumber) %1 === 0 ){
                  if(userNumber.length == 10){
                    userNumber=parseInt(91+""+userNumber);
                  }
                }
                //  $scope.skipOfUser =skip;
                // $scope.selectedIndex = 0
                apiService.searchUsers({
                    role: $scope.role,
                    limit: $scope.limitOfUser,
                    skip: skip,
                    email: userNumber
                }).$promise.then(function (response) {
                    if (response.object.count) {
                      $scope.counterOfUser = response.object.count;
                              console.log("counter in scope of search is",$scope.counter);
                    }

                    if(response.object.object.length>0){
                                $scope.dataOfUser=response.object.object;
                      console.log("length greater than 0 or not",response.object.object.length);
                       $scope.pageCounterOfUser = Math.ceil($scope.counterOfUser/ $scope.limitOfUser)*10;
                       console.log("totalPage is ",$scope.pageCounterOfUser);


                      $scope.loading=false;


                }else {

        $scope.dataOfUser.length=0;
        $scope.loading=false;

        }

                }, function (error) {
                    console.log("error is..", error);
                });
            }
        }

        $scope.init = function (skip) {
            if ($scope.searchFlag == false)
                $scope.getUser(skip)
                // $scope.getUserBankDetail(skip)
            else
                $scope.searchUsers();

        }

        // it will get all the user
        $scope.getUser = function (skip) {
          $scope.loading=true;
          console.log("date is ",$scope.date);
          if($scope.date==null){
            $scope.date=0;
          }
            apiService.getUserDataPanel({
                role: $scope.role,
                  skip: skip,
                limit: $scope.limitOfUser,
                date:$scope.date

            }).$promise.then(function (userObj) {
                console.log('success with user is ', userObj.object.object);
                if (userObj.object.count) {
                    $scope.counterOfUser = userObj.object.count;
                    console.log("counter in scope of user is",$scope.counterOfUser);
                }
                // $scope.retriveData(userObj.object);
                if(userObj.object.object.length>0){
                            $scope.dataOfUser=userObj.object.object;
                            console.log("user is",$scope.dataOfUser.length);
                  if($scope.limitOfUser!=0){

                  console.log("length greater than 0 or not",userObj.object.object.length);
                   $scope.pageCounterOfUser = Math.ceil($scope.counterOfUser/ $scope.limitOfUser)*10;
                   console.log("totalPage is ",$scope.pageCounterOfUser);


                  $scope.loading=false;
}
                 else {
                $scope.pageCounterOfUser=1;
                $scope.loading=false;
              }
            }else {
console.log("with data of user of length 0 un else part");
    $scope.dataOfUser.length=0;
    $scope.loading=false;

    }
            }, function (error) {
                console.log('error is occure in retrive the app data');
                console.log(error);
            });
        }



        //it will retrive the user
        // $scope.retriveData = function (userData) {
        //     var total = userData.object.length;
        //     console.log("userData in retrieve data is ",userData);
        //     $scope.data = [];
        //     console.log('total', total);
        //     for (var i = 0; i < total; i++) {
        //         var temp = {};
        //         temp._id = userData.object[i]._id
        //         temp.name = userData.object[i].name;
        //         temp.email = userData.object[i].email;
        //         temp.role = userData.object[i].role;
        //         temp.phoneNumber = userData.object[i].phonenumber;
        //         temp.balance = (userData.object[i].user_account.wallet.wallet_amount_available).toFixed(2);
        //         temp.gender = userData.object[i].gender;
        //         temp.dob = userData.object[i].date_of_birth;
        //         temp.logo_image_url = userData.object[i].logo_image_url;
        //         temp.image_url = (userData.object[i].image_url?userData.object[i].image_url:"assets/images/user-2.png");
        //         temp.client_org_name = userData.object[i].client_org_name;
        //         temp.referralId = userData.object[i].referralId;
        //         $scope.data.push(temp);
        //     }
        //     if ($scope.data.length != 0) {
        //       if($scope.filterData.limit!=0){
        //      $scope.pageCounterOfUser = Math.ceil(  $scope.counterOfUser/ $scope.filterData.limit)*10;
        //      console.log("page counter is ",$scope.pageCounter);
        //        $scope.loading=false;
        //    }else {
        //         $scope.pageCounter=1;
        //            $scope.loading=false;
        //
        //    }
        //   }
        //   else {
        //     $scope.data.length=0;
        //     $scope.loading=false;
        //
        //   }
        // }

//   $scope.checkIfEnterKeyWasPressed = function($event){
//     console.log("enter was pressed");
//     var keyCode = $event.which || $event.keyCode;
//     if (keyCode === 13) {
//         // Do that thing you finally wanted to do
//         console.log("hello");
// $scope.searchUsers(0);
//     }
//
//   };



        $scope.init(0);
        $scope.changeShowRecordBankDetails = function () {
            $scope.filterData.skip = 0;
            $scope.selectedIndex = 0
            console.log("limit value", $scope.limitValue)
            $scope.filterData.limit = $scope.limitValue;
            $scope.getUserBankDetail(0);
            $scope.currentPage=1;
        }
        $scope.getUserBankDetail=function(skip){
            $scope.loading=true;
          console.log("hwloo in bank details");
          $scope.bankingData=[];
          apiService.getUserBankDetail({
              limit: $scope.filterData.limit,
              skip:skip
          }).$promise.then(function (userData) {
                  // console.log('success banking details is', userData.object.object.length);
            if (userData.object) {
              if(userData.object.object.length>0){
                 $scope.bankingPageCounter = Math.ceil(userData.object.count / $scope.filterData.limit)*10;
                 console.log("bankingPageCounter is ",$scope.bankingPageCounter);
                  $scope.bankingData=userData.object.object;
                    $scope.loading=false;
            }
            else {
  $scope.bankingData.length=0;
  $scope.loading=false;
}
}
else {

$scope.bankingData.length=0;
$scope.loading=false;

}



        });
      }
      $scope.getUserBankDetail(0);
      $scope.pageChangedInBankDetails=function(){
        if($scope.searchFlag==false){
    $scope.filterData.skip=($scope.currentPage-1)*$scope.filterData.limit;
      $scope.getUserBankDetail($scope.filterData.skip);
    }else {
      $scope.filterData.skip=($scope.searchPage-1)*$scope.filterData.limit;

      $scope.searchUsersInBankingDetails($scope.filterData.skip);
    }
      }

      $scope.pageChanged=function(){
        console.log("in page changed with current page  ",$scope.currentPage);
        if($scope.searchFlag==false ){
    $scope.skipOfUser=($scope.currentPage-1)*$scope.limitOfUser;
      $scope.getUser($scope.skipOfUser);
    }else {
          $scope.skipOfUser=($scope.searchUserPage-1)*$scope.limitOfUser;
          $scope.searchUsers($scope.skipOfUser);
        }

      }

      $scope.searchUsersInBankingDetails = function (skip) {
          $scope.loading=true;
          if ($scope.search == '') {
              console.log("search box..", $scope.search)
              $scope.searchFlag = false;
              $scope.getUserBankDetail(0);
              $scope.currentPage=1;
              $scope.searchPage=1;
              $scope.filterData.skip=0;
          } else {
            console.log("hrllo else in search");
              $scope.searchFlag = true;
              //$scope.searchPage=1;
               $scope.filterData.skip = skip;
              // $scope.selectedIndex = 0
              apiService.searchUsersInBankingDetails({
                  email: $scope.search,
                  skip: skip,
                  limit: $scope.filterData.limit,
              }).$promise.then(function (response) {
                console.log("object is ",response.object);
                  if (response.object.count) {
                      $scope.PageCountInSearchBanking = response.object.count;
                            console.log("counter in scope of search is",$scope.counter);
                  }
                  if(response.object.object.length>0){
                    $scope.bankingData=response.object.object;
                    $scope.bankingPageCounter = Math.ceil($scope.PageCountInSearchBanking / $scope.filterData.limit)*10;
                      $scope.loading=false;
                  }
                  else {
                    $scope.bankingData.length=0;
                    $scope.loading=false;
                  }

              });
          }
      }


      $scope.changeShowRecordVoucherDetails = function () {
          $scope.filterData.skip = 0;
        //  $scope.selectedIndex = 0
          console.log("limit value", $scope.limitValue)
          $scope.filterData.limit = $scope.limitValue;
          $scope.getVoucherDetails(0);
      }

      $scope.getVoucherDetails=function(skip){
          $scope.loading=true;
      $scope.userVoucher=[];
          $scope.voucherOfUser=[];
      apiService.getVoucherDetails({
          limit: $scope.filterData.limit,
          skip:skip
      }).$promise.then(function (voucherData) {
        console.log("voucher data is ",voucherData);
        if(voucherData.object){
          if(voucherData.object.object.length>0){
            for(var i=0;i<voucherData.object.object.length;i++){
              if(!voucherData.object.object[i].user_id.deleted){
                console.log("true or false deleted is",voucherData.object.object[i].user_id.deleted);
              $scope.userVoucher=voucherData.object.object;
            }
            }
            if($scope.filterData.limit!=0){
     $scope.userVoucherPageCounter = Math.ceil(voucherData.object.count / $scope.filterData.limit)*10;
      console.log("userVoucherPageCounter is ",$scope.userVoucherPageCounter);

      // $scope.searchVoucherData.push(voucherData.object.object);
      console.log("user voucher is ",$scope.userVoucher);
      $scope.loading=false;
        // console.log("user voucher in search  is ",  $scope.searchVoucherData);
      }else {
           $scope.userVoucherPageCounter=1;

                 $scope.loading=false;
      }
      }
        else {

$scope.userVoucher.length=0;
$scope.loading=false;
        }
      }else {

$scope.userVoucher.length=0;

      }


    });
  }
  $scope.getVoucherDetails(0);
  $scope.pageChangedInVouchersOfUser=function(){
    if($scope.searchFlagVoucher==false){
$scope.filterData.skip=($scope.currentPage-1)*$scope.filterData.limit;
  $scope.getVoucherDetails($scope.filterData.skip);
}else {
  $scope.filterData.skip=($scope.searchPageOfVoucher-1)*$scope.filterData.limit;

  $scope.searchUsersInVoucherDetails($scope.filterData.skip);
}
  }


  $scope.searchUsersInVoucherDetails = function (skip) {
      $scope.loading=true;
      if ($scope.search == '') {
          console.log("search box..", $scope.search)
          $scope.searchFlagVoucher = false;
          $scope.getVoucherDetails(0);
          $scope.currentPage=1;
          $scope.searchPageOfVoucher=1;
          $scope.filterData.skip=0;
      } else {
        console.log("hrllo else in search");
          $scope.searchFlagVoucher = true;
          //$scope.searchPage=1;
           $scope.filterData.skip = skip;
          // $scope.selectedIndex = 0
          apiService.searchUsersInVoucherDetails({
              email: $scope.search,
              skip: skip,
              limit: $scope.filterData.limit,
          }).$promise.then(function (response) {
            console.log("object is ",response.object);
            console.log("object is ",response.object.findAllUserVouchers);
              if (response.object.count) {
                  $scope.pageCounterInSearchVoucher = response.object.count;
                        console.log("counter in scope of search is",$scope.userVoucherPageCounter);
              }
              if(response.object.object.length>0){
                $scope.userVoucher=response.object.object;
                $scope.userVoucherPageCounter = Math.ceil($scope.pageCounterInSearchVoucher / $scope.filterData.limit)*10;
                  $scope.loading=false;
                console.log("user voucher in scope is ",$scope.userVoucher);
              }
              else {
                $scope.userVoucher.length=0;
                $scope.loading=false;
              }

          });
      }
  }




}]).controller('userEditController', ['$scope', '$modal', '$modalInstance', '$timeout', 'userData', 'apiService', '$state', 'Upload', '$rootScope', '$enviornment', "$uploadImage", function ($scope, $modal, $modalInstance, $timeout, userData, apiService, $state, Upload, $rootScope, $enviornment, $uploadImage) {
        console.log('user edit controller called', userData);
        if (userData.role == "ROLE_USER") {
            $scope.roles = [{
                name: "user",
                value: "ROLE_USER"
            }];
        } else if (userData.role == "ROLE_CLIENT") {
            $scope.roles = [{
                name: "client",
                value: "ROLE_CLIENT"
            }];
        } else {
            $scope.roles = [{
                name: "admin",
                value: "ROLE_ADMIN"
            }, {
                name: "delegatedAdmin",
                value: "ROLE_DELEGATED_ADMIN"
            }];
        }
        $scope.user = {};
        $scope.user.email = userData.email;
        $scope.user.dob = userData.dob;
        $scope.user.userName = userData.name;
        $scope.user.gender = userData.gender;
        $scope.user.role = userData.role;
        $scope.user.phoneNumber = userData.phoneNumber
        $scope.clientImageURL = userData.image_url
        $scope.clientLogo = userData.logo_image_url
        $scope.user.client_org_name = userData.client_org_name

        $scope.$watch('start', function (v) {
            $scope.minEndDate = v;
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
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        //upload the logo of client
        $scope.uploadFiles = function (file, errFiles) {
            console.log('control in the upload logo')
            var fileUploadObj = $uploadImage.uploadFiles(file, errFiles);
            fileUploadObj.thpreven(function (response) {
                file.result = response.data;
                console.log(" service url", response.data.object);
                $scope.obj.logo_image_url = response.data.object
                $scope.clientLogo = response.data.object;
            }, function (response) {}, function (evt) {});
        }

        $scope.obj = {};
        // it will update  the user
        $scope.updateUser = function (valid) {
            $scope.submitted = true;
            if (valid) {
               $scope.obj.date_of_birth = $scope.user.dob;
                $scope.obj.role = $scope.user.role;
               $scope.obj.gender = $scope.user.gender;
                $scope.obj.name = $scope.user.userName;
                $scope.obj.email = $scope.user.email;
                $scope.obj.phonenumber = $scope.user.phoneNumber;
               $scope. obj.id = userData._id;
               //  console.log($scope.obj);
                apiService.updateUser({
                    user: $scope.obj
                }).$promise.then(function (obj) {
                    console.log("update successfully", obj);
                    $state.go($state.current, {}, {
                        reload: true
                    });
                }, function (error) {
                    console.log('error is occure ');
                    console.log(error);
                })= 0
                $modalInstance.close();
            } else {
                console.log("validtion falid in user");
            }
        }

        $scope.openCroper = function () {
            $modal.open({
                templateUrl: '/app/tpls/client/popup/cropper-temp.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'croperController',
                resolve: {
                    upperScope: function () {
                        return $scope;
                    }
                }
            });
        }
}])
    .controller('userAddController', ['$scope', '$modal', '$modalInstance', 'apiService', "$state", "role", "Upload", "$enviornment", "$uploadImage","$timeout",function ($scope, $modal, $modalInstance, apiService, $state, role, Upload, $enviornment, $uploadImage,$timeout) {
        console.log('userAddController', role);
        $scope.emailFlag = false;
        $scope.user = {};
        $scope.$watch('start', function (v) {
            $scope.minEndDate = v;
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
        $scope.ok = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        //upload the logo of client
        $scope.uploadFiles = function (file, errFiles) {
                console.log('control in the upload logo')
                var fileUploadObj = $uploadImage.uploadFiles(file, errFiles);
                fileUploadObj.then(function (response) {
                    file.result = response.data;
                    console.log(" service url", response.data.object);
                    $scope.user.logo_image_url = response.data.object
                    $scope.clientLogo = response.data.object;
                }, function (response) {}, function (evt) {});
            }
            //save the user

        $scope.saveUser = function (valid) {
            $scope.submitted = true;
            console.log("valid is..", valid);
            console.log("Uesr obje is***8", $scope.user);
            if (valid && $scope.emailFlag == false) {
                $scope.user.password2 = $scope.user.password;
                apiService.addUser({
                    user: $scope.user
                }).$promise.then(function (obj) {
                    console.log("success", obj);
                    $state.go($state.current, {}, {
                        reload: true
                    });
                }, function (error) {
                    console.log("error in creating user");
                    console.log(error);
                });
                $modalInstance.close();
            }
        }
        //it will check all the existance email
        $scope.checkEmail = function () {
            console.log('change')
            apiService.checkemail({
                email: $scope.user.email,
                role: role
            }).$promise.then(function (obj) {
                $scope.emailFlag = obj.object;
            }, function (err) {
                console.log("error in check email");
                console.log(err);
            });
        }
        $scope.openCroper = function () {
            $modal.open({
                templateUrl: '/app/tpls/client/popup/cropper-temp.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'croperController',
                resolve: {
                    upperScope: function () {
                        return $scope;
                    }
                }
            });
        }
}]).controller('userProfileController', ['$scope','$modal', '$modalInstance', 'userData','apiService', function ($scope,$modal, $modalInstance, userData,apiService) {
        console.log('userProfileController', userData._id);
       console.log('referralId is', userData.referralId);
        $scope.user = {};
        $scope.user._id=userData._id;
        $scope.user.email = userData.email;
        $scope.user.dob = userData.date_of_birth;
        $scope.user.userName = userData.name;
        $scope.user.gender = userData.gender;
        $scope.user.role = userData.role;
        $scope.user.phoneNumber = userData.phonenumber

        if(!userData.image_url){
          $scope.user.image_url = "http://api.weoneapp.com/assets/images/user-2.png";
        }else {
          $scope.user.image_url = userData.image_url
        }

        $scope.user.logo_image_url = userData.logo_image_url
        $scope.user.client_org_name = userData.client_org_name
        $scope.user.registrationId=userData._id;
        if(userData.role=='ROLE_USER'){
        $scope.user.referralId=userData.referralId.toLowerCase();
}
        $scope.viewBankingDetails = function (id) {

          $modal.open({
              templateUrl: '/app/tpls/users/popup/viewBankingDetails.html',
              backdrop: 'static',
              windowClass: 'modal',
              size: 'lg',
              controller: 'viewBankingDetailsController',
              resolve: {
                  id: function () {
                      return id;
                  }
              }
          })
      }


      $scope.viewVoucherDetails= function (id) {

          $modal.open({
              templateUrl: '/app/tpls/users/popup/viewVoucher.html',
              backdrop: 'static',
              windowClass: 'modal',
              size: 'lg',
              controller: 'viewVoucherController',
              resolve: {
                  id: function () {
                      return id;
                  }
              }
          })
      }







        $scope.ok = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

}])
    .controller('croperController', ['$scope', '$modalInstance', 'Upload', '$enviornment', '$uploadImage', 'upperScope', function ($scope, $modalInstance, Upload, $enviornment, $uploadImage, upperScope) {
        //it will be used to upload the image of client

        $scope.upload = function (dataUrl) {
            console.log("control in the upload image");
            var file = Upload.dataUrltoBlob(dataUrl);
            var fileUploadObj = $uploadImage.uploadFiles(file, null);
            fileUploadObj.then(function (response) {
                file.result = response.data;
                console.log(" service url", response.data.object);
                upperScope.user.image_url = response.data.object
                upperScope.clientImageURL = response.data.object
                //for update the image
                if(upperScope.obj)
                upperScope.obj.image_url=response.data.object;
                $modalInstance.dismiss();
            }, function (response) {}, function (evt) {});
        }
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
}])
    .controller('deleteController', ['$scope', '$modalInstance', 'id', 'apiService', '$state', function ($scope, $modalInstance, id, apiService, $state) {
        console.log("delete controller called", id);
        $scope.ok = function () {
            apiService.deleteUser({
                id: id
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
}])
    .controller('modalInstancectrl', ['$scope', '$timeout', '$modalInstance', '$log', function ($scope, $timeout, $modalInstance, $log) {

        // DatePicker
        $scope.$watch('start', function (v) {
            $scope.minEndDate = v;
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

        $scope.ok = function () {

            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
}]) .controller('userNetworkTreeController', ['$scope', "userData","$modal", "$modalInstance", "apiService", function ($scope, userData, $modal, $modalInstance, apiService) {
     console.log("userData controller is called", userData)

    //  apiService.getTreeData({user_id:userData}).$promise.then(function (requestData) {
    //      console.log('success with user id is', requestData.object[0]);
     //
    //      $scope.treeData = [requestData.object[0]];
    //      console.log("the in tree is",$scope.treeData);
    //  }, function (error) {
    //      $scope.treeData = [];
    //      console.log('error occured in retrieving the app data');
    //      console.log(error);
    //  });
$scope.loadingNetwork=true;
     $scope.level0={};
     $scope.level1={};
     $scope.showNetworkStatus=true;
     $scope.networkObjects=[];
      $scope.cancel = function () {
            $modalInstance.dismiss();
        };

     apiService.networkTreeStatus({userid:userData}).$promise.then(function (networkObj) {
        // console.log("Network data",networkObj.object.number_of_levels)&&

         if(networkObj.object && networkObj.object.number_of_levels>0){
           for(var i=0;i<networkObj.object.levels.length;i++){
                 if(i==0){
                     $scope.level0.name=networkObj.object.levels[0].persons[0].name;
                     $scope.level0.levelname=networkObj.object.levels[0].level_name;
                     $scope.level0.balance=networkObj.object.levels[0].totalbalance;
                     console.log("balance in level 0 is ",$scope.level0.balance);

                   }
                //  }else if(i==1){
                //       $scope.level1.levelname=networkObj.object.levels[1].level_name;
                    //   if(networkObj.object.levels[1].persons[0]){
                    //       $scope.level1.rightName=networkObj.object.levels[1].persons[0].name;
                    //       $scope.level1.rightBalance=networkObj.object.levels[1].persons[0].balance
                    //   }
                    //  if(networkObj.object.levels[1].persons[1]){
                    //       $scope.level1.leftName=networkObj.object.levels[1].persons[1].name;
                    //       $scope.level1.leftBalance=networkObj.object.levels[1].persons[1].balance
                    //   }
                 else{
                 if(networkObj.object.number_of_levels>0){
                  //  console.log("ist is ",networkObj.object);
            $scope.networkObjects.push(networkObj.object.levels[i]);
            console.log("loadingNetwork is ",$scope.loadingNetwork);
             $scope.loadingNetwork=false;
             }
           }
         }
         }else{
             console.log("Network is disconnected");
             $scope.showNetworkStatus=false;
            //  $scope.loadingNetwork=false;
         }
     }, function (err) {
      //  $scope.showNetworkStatus=false;
         console.log("Error in find user network tree", err);
     })

     $scope.viewLevel = function (level) {
       console.log("level is",level);
       if(level=='Level 1'){
            $modal.open({
                templateUrl: '/app/tpls/users/popup/level.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'userNetworkController',
                resolve: {
                  userData: function () {
                      return userData;
                  }

                    }

            });
          }
        }

}])

    .filter('rolefilter', function () {
        return function (input) {
            switch (input) {
            case 'ROLE_ADMIN':
                return 'admin'
                break;
            case 'ROLE_USER':
                return 'user'
                break;
            case 'ROLE_DELEGATED_ADMIN':
                return 'delegate admin'
                break;
            case 'ROLE_CLIENT':
                return 'client'
                break;
            }
        }
    })

.controller('userNetworkController', ['$scope','$modal', 'userData', '$modalInstance','apiService', function ($scope, $modal,userData, $modalInstance, apiService) {
    // console.log("hhh",networkObject);

    $scope.cancel = function () {
      console.log("hello");
            $modalInstance.dismiss();
        };
        $scope.setDefault = function () {
            $scope.skip = 0;
            $scope.limit = 10;
              $scope.data=[];
            $scope.totalPage = 0;
            $scope.counter = 0;
              // $scope.bankingPageCounter = 0;
             $scope.currnetPage=1;
              $scope.maxSize=4;
            // $scope.selectedIndex = 0;
            // $scope.searchFlag = false;

        }
        $scope.setDefault();
        $scope.getUserLevel1=function(skip){
           $scope.loading=true;
          console.log("id is ",userData);
        apiService.userLevel1({level:1,id:userData,skip:skip,limit:$scope.limit}).$promise.then(function(response){
          if(response.object.count){
            $scope.counter=response.object.count;
          }
          if(response.object.persons.length>0){
          $scope.data=response.object.persons;
          $scope.totalPage = Math.ceil($scope.counter / $scope.limit)*10;
          $scope.loading=false;
}else {
  $scope.data.length=0;
  $scope.loading=false;
}
        })
}
$scope.getUserLevel1(0);
$scope.pageChangedInNetworkDetails=function(){
$scope.skip=($scope.currentPage-1)*$scope.limit;
$scope.getUserLevel1($scope.skip);

}



}])

.controller('viewVoucherController', ['$scope','$modal', '$modalInstance','apiService', 'id', function ($scope,$modal, $modalInstance, apiService,id) {
        // console.log('userProfileController', id);
        // apiService.getVouchersOfUser({
        //     skip:$scope.filterData.skip
        //     id: id
        // }).$promise.then(function (obj) {
        //     console.log("success", obj);
        //     $scope.vouchers ={};
        //     $scope.vouchers=obj;
        //
        //
        // }, function (error) {
        //     console.log("error is occure in delete");
        //     console.log(error);
        // })
        //
        //
        // $scope.ok = function () {
        //     $modalInstance.close();
        // };
        // $scope.cancel = function () {
        //     $modalInstance.dismiss();
        // };
        $scope.viewModalVoucherOfUser= function (id) {

            $modal.open({
                templateUrl: '/app/tpls/users/popup/viewVoucherOfUser.html',
                backdrop: 'static',
                windowClass: 'modal',
                size: 'lg',
                controller: 'viewVoucherOfUserController',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            })
        }

          $scope.maxSize = 4;
          $scope.currentPage=1;
        $scope.setDefault = function () {
                $scope.filterData = {};
            $scope.filterData.skip = 0;
            $scope.filterData.limit = 10;
            $scope.count=0;
             $scope.userVoucherPageCounter=0;
            $scope.searchFlag = false;

        }
        $scope.setDefault();

        $scope.changeShowRecordOfUserVoucherDetails = function () {
            $scope.filterData.skip = 0;
          //  $scope.selectedIndex = 0
            console.log("limit value", $scope.limitValue)
            $scope.filterData.limit = $scope.limitValue;
            $scope.getVouchersOfUser(0);
            $scope.currentPage=1;
        }


        $scope.getVouchersOfUser=function(skip){
          console.log("skip in view voucher controller us ",skip);
              console.log("id in view voucher controller us ",id);
              var userId=id;
          $scope.voucherOfUser=[];
          apiService.getVouchersOfUser({
                  userId:userId,
                  skip:skip,
                  limit: $scope.filterData.limit
          }).$promise.then(function (voucherData) {
            console.log("response is ",voucherData.object);
            if(voucherData.object){
                console.log("Hello");
              if(voucherData.object.object.length>0){
                  console.log("Ho");
                  if(  $scope.filterData.limit!=0)
{
         $scope.voucherOfUserPageCounter = Math.ceil(voucherData.object.count / $scope.filterData.limit)*10;
          console.log("voucherOfUserPageCounter is ",$scope.userVoucherPageCounter);
          $scope.voucherOfUser=voucherData.object.object;



        }else {
          $scope.voucherOfUserPageCounter=1;
            $scope.voucherOfUser=voucherData.object.object;
        }
          }
            else {

  $scope.voucherOfUser.length=0;
        // $scope.voucherOfUser=voucherData.object.object;
        //  console.log("userVoucher in else is",$scope.userVoucher);

            }
          }
          else {
              $scope.voucherOfUser.length=0;

            //  console.log("userVoucher is",$scope.userVoucher);
          }


        });
      }
      $scope.getVouchersOfUser(0);
      $scope.pageChangedInVouchersOfUser=function(){
    $scope.filterData.skip=($scope.currentPage-1)*$scope.filterData.limit;
      $scope.getVouchersOfUser($scope.filterData.skip);
      }

//       $scope.viewVoucherOfUser=function(){
//         console.log("id can be voucher or user ",id);
//         apiService.viewVoucherOfUser({
//             id: id
//         }).$promise.then(function (obj) {
//           console.log('obj is', obj);
//
//           if(obj.object){
//             console.log("success", obj.object);
//             $scope.voucherDetail ={};
//             $scope.voucherDetail=obj.object;
//           //  console.log("mobile no is",$scope.bankDetail.user.name);
// }else {
//   console.log("message please fill in your details");
// }
//
//         }, function (error) {
//             console.log("error is occure in delete");
//             console.log(error);
//         })
//
//
//       }
        // $scope.viewVoucherOfUser();

      $scope.ok = function () {
          $modalInstance.close();
      };
      $scope.cancel = function () {
          $modalInstance.dismiss();
      };
}])
.controller('viewVoucherOfUserController', ['$scope', '$modalInstance','apiService','id', function ($scope, $modalInstance,apiService, id) {
        console.log('id in viewVoucherOfUserController', id);
        apiService.viewVoucherOfUser({
            id: id
        }).$promise.then(function (obj) {
          console.log('obj is', obj);

          if(obj.object){
            console.log("success", obj.object);
            $scope.voucherDetail ={};
            $scope.voucherDetail=obj.object;
           console.log("mobile no is",$scope.voucherDetail.status);
}else {
  console.log("message please fill in your details");
}

        }, function (error) {
            console.log("error is occure in delete");
            console.log(error);
        })


        $scope.ok = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
}])
.controller('viewBankingDetailsController', ['$scope', '$modalInstance','apiService','id', function ($scope, $modalInstance,apiService, id) {
        console.log('id in viewVoucherOfUserController', id);
        apiService.getUserBankDetailById({
            id: id
        }).$promise.then(function (obj) {
          console.log('obj is', obj);

          if(obj.object){
            console.log("success", obj.object);
            $scope.bankDetail ={};
            $scope.bankDetail=obj.object;
          //  console.log("mobile no is",$scope.bankDetail.user.name);
}else {
  console.log("message please fill in your details");
}

        }, function (error) {
            console.log("error is occure in delete");
            console.log(error);
        })


        $scope.ok = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
}])
.controller('viewUserEarningController', ['$scope', '$modalInstance','$timeout','apiService','id', function ($scope, $modalInstance,$timeout,apiService, id) {
        console.log('id in user Earining details ', id);
        $scope.viewby = 10;
        $scope.date=0;
        $scope.loading=false;

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


       $scope.currentPage = 1;
       $scope.itemsPerPage = 10;
        $scope.maxSize = 4;

// $scope.changeShowRecord=function(){
//   $scope.itemsPerPage=$scope.limitValue;
//   $scope.total=$scope.itemsPerPage;
//   $scope.pageCounterOfUser = Math.ceil($scope.totalItems/ $scope.itemsPerPage);
//
// }

        $scope.getUserEarningDetails=function(){
          console.log("loading is",$scope.loading);
          $scope.loading=true;
            $scope.total=10;
        apiService.getUserEarningDetails({
            userid: id

        }).$promise.then(function (res) {
          console.log('obj is', res);

          if(res.object){
            console.log("success", res.object);
            $scope.earningDetails ={};

            $scope.userData1=[];
            $scope.balance=0;
            $scope.newValue=true;
            $scope.earningDetails=res.object;
            if(res.object.object.length >0){
            //  $scope.earningDetails.object.reverse();
           $scope.totalItems = res.object.object.length;
           $scope.pageCounterOfUser = Math.ceil($scope.totalItems/ $scope.itemsPerPage);
                 if($scope.pageCounterOfUser==1){
                   $scope.total=$scope.totalItems;
                 }
           console.log("totalItems are ",$scope.totalItems,$scope.total);
              angular.forEach($scope.earningDetails.object.reverse(),function(user){
                var userData={};
                console.log(user.total_amount);
                if($scope.newValue){
                $scope.balance=user.user_id.user_account.wallet.wallet_amount_available;
                userData.balance=$scope.balance;
                $scope.newValue=false;
              }else{
                userData.balance=$scope.balance-user.total_amount;
                $scope.balance=userData.balance;
              }
                userData.dateOfEarning=user.date_of_earning;
                userData.total_amount=user.total_amount;


                $scope.userData1.push(userData);


              })
              $scope.loading=false;
            }
            else {
              $scope.totalItems=0;
              $scope.loading=false;
              console.log("no items are there");
            }
}else {
  console.log("Could not get user earning details");
  $scope.loading=false;
}
}, function (error) {
            console.log("error is occure in getting details");
            console.log(error);
        })
}
$scope.getUserEarningDetails(0);
$scope.getUserEarningDetailsByDate=function(){
  $scope.loading=true;
  $scope.total=10;
apiService.getUserEarningDetailsByDate({
    userid: id,
    date:$scope.date
}).$promise.then(function (res) {
  console.log('obj is', res);

  if(res.object){
    console.log("success", res.object);
    $scope.earningDetails ={};

    $scope.userData1=[];
    $scope.balance=0;
    $scope.newValue=true;
    $scope.earningDetails=res.object;
    if(res.object.object.length >0){
    //  $scope.earningDetails.object.reverse();
   $scope.totalItems = res.object.object.length;
   $scope.pageCounterOfUser = Math.ceil($scope.totalItems/ $scope.itemsPerPage);
         if($scope.pageCounterOfUser==1){
           $scope.total=$scope.totalItems;
         }
   console.log("totalItems are ",$scope.totalItems);
      angular.forEach($scope.earningDetails.object.reverse(),function(user){
        var userData={};
        console.log(user.total_amount);
        if($scope.newValue){
        $scope.balance=user.user_id.user_account.wallet.wallet_amount_available;
        userData.balance=$scope.balance;
        $scope.newValue=false;
      }else{
        userData.balance=$scope.balance-user.total_amount;
        $scope.balance=userData.balance;
      }
        userData.dateOfEarning=user.date_of_earning;
        userData.total_amount=user.total_amount;


        $scope.userData1.push(userData);
        $scope.loading=false;

      })
    }else {
      $scope.totalItems=0;
      $scope.loading=false;
      console.log("no items are there");
    }
}else {

console.log("Could not get user earning details");
$scope.loading=false;
}
}, function (error) {
    console.log("error is occure in getting details");
    console.log(error);
})
}
$scope.reset=function(){
  $scope.currentPage=1;
  if($scope.date==null){
    $scope.getUserEarningDetails(0);
  }else {
  $scope.getUserEarningDetailsByDate(0);
}
}

        $scope.ok = function () {
            $modalInstance.close();
        };
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
}])
