angular.module('weone').controller('beneficiaryController', ['$scope','apiService','$timeout','$uploadImage', function ($scope,apiService,$timeout,$uploadImage) {



 $scope.data = [];
        $scope.filterData = {};

$scope.downloadExcel = function(){
console.log("downloadExcel running");
  apiService.getDownloadBenificiaryLink({
            }).$promise.then(function (downloadLink) {
                console.log('success',downloadLink);
				window.location = downloadLink.object;
            }, function (error) {
                console.log('error is occure in getDownloadBenificiaryLink');
                console.log(error);
            });

}

$scope.downloadBenificiaryErrExcel = function(){
console.log("downloadBenificiaryErrExcel running");
  apiService.getDownloadBenificiaryErrExcel({
            }).$promise.then(function (downloadLink) {
                console.log('success',downloadLink);
                window.location = downloadLink.object;
            }, function (error) {
                console.log('error is occure in downloadBenificiaryErrExcel');
                console.log(error);
            });

}

//todo use the code from single service
 $scope.setDefault = function () {
            $scope.filterData.skip = 0;
            $scope.filterData.limit = 10;
            $scope.totalPage =0;
            $scope.counter = 0;
            $scope.selectedIndex = 0;
            $scope.searchFlag = false;
            $scope.maxSize=4;
            $scope.currentPage=1;
            $scope.loading=false;
        }
        $scope.setDefault();

//todo use the code from single service
 $scope.filterOnTabClick = function (number) {
            $scope.selectedIndex = number
            console.log('Filter ', number)
            $scope.filterData.skip = $scope.filterData.limit * number;
            $scope.init($scope.filterData.skip);
        }

//todo use the code from single service
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



    $scope.getBeneficaryHistory=function(skip){
        $scope.loading=true;
        console.log("getBeneficaryHistory");
        apiService.getExcelHistory({
        		action:'beneficiary',
                limit:10,
                skip: skip
            }).$promise.then(function (beneficaryHistoryObj) {
                 if (beneficaryHistoryObj.object.count) {
                    $scope.counter = beneficaryHistoryObj.object.count;
                }
                console.log('success',beneficaryHistoryObj);
			var total = beneficaryHistoryObj.object.object.length;
            $scope.data = [];
            console.log('total', total);

            if(beneficaryHistoryObj.object.object.length>0)
            {
                $scope.data=beneficaryHistoryObj.object.object;
                console.log("scope data is ",$scope.data);
                $scope.totalPage=Math.ceil($scope.counter / $scope.filterData.limit)*10;
                  $scope.loading=false;
            }
            else {
              $scope.data.length=0;
                $scope.loading=false;
            }
            }, function (error) {
                console.log('error is occure in getBeneficaryHistory');
                console.log(error);
            });
    }

    $scope.pageChangedInExcelBenificiaryHistory=function(){
  $scope.filterData.skip=($scope.currentPage-1)*$scope.filterData.limit;
    $scope.getBeneficaryHistory($scope.filterData.skip);
    }



     //thumbnail upload
        $scope.uploadFiles = function (file, errFiles) {
            console.log('control in the upload thmbnail'+file);
            var fileUploadObj = $uploadImage.uploadExcelFiles(file, errFiles);
            fileUploadObj.then(function (response) {
                 toastr.success("Your file imported successfully ", "Success");
                file.result = response.data;
                console.log(" service url", response.data.object);
                $scope.custom_thmbnail = response.data.object
            }, function (response) {}, function (evt) {});
        }


$scope.downloadListedExcel = function(linkOfExcelFile){
    window.location = linkOfExcelFile;

}
 $scope.init = function (skip) {

              $scope.getBeneficaryHistory(skip)
        }

$scope.init(0);
}])
//todo remove this controller and use only one controller use a stateChange event
.controller('transactionController', ['$scope','apiService','$uploadImage', function ($scope,apiService,$uploadImage) {
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

$scope.data = [];
$scope.filterData = {};

//todo use the code from single service
$scope.setDefault = function () {
            $scope.filterData.skip = 0;
            $scope.filterData.limit = 10;
            $scope.totalPage = 0;
            $scope.counter = 0;
            $scope.selectedIndex = 0;
            $scope.searchFlag = false;
            $scope.maxSize=4;
            $scope.currentPage=1;
              $scope.loading=false;
        }
        $scope.setDefault();

//todo use the code from single service
 $scope.filterOnTabClick = function (number) {
            $scope.selectedIndex = number
            console.log('Filter ', number)
            $scope.filterData.skip = $scope.filterData.limit * number;
            $scope.init($scope.filterData.skip);
        }



$scope.downloadExcel = function(){
console.log("downloadExcel running");
  apiService.getDownloadTransactionLink({
            }).$promise.then(function (downloadLink) {
                console.log('success',downloadLink);
                window.location = downloadLink.object;
            }, function (error) {
                console.log('error is occure in getDownloadLink');
                console.log(error);
            });

}



 $scope.getTransactionHistory=function(){
     $scope.loading=true;
        console.log("getTransactionHistory");
        apiService.getExcelHistory({
                action:'transaction',
                limit: 10,
                skip: 0
            }).$promise.then(function ( transactionHistoryObj) {
                console.log('success',transactionHistoryObj);
                 if (transactionHistoryObj.object.count) {
                    $scope.counter = transactionHistoryObj.object.count;
                }
            var total = transactionHistoryObj.object.object.length;
            $scope.data = [];
            console.log('total', total);

            if(transactionHistoryObj.object.object.length>0)
            {
                $scope.data=transactionHistoryObj.object.object;
                console.log("scope data is ",$scope.data);
                $scope.totalPage=Math.ceil(transactionHistoryObj.object.count / $scope.filterData.limit)*10;
                  $scope.loading=false;
            }
            else {
              $scope.data.length=0;
                $scope.loading=false;
            }

            }, function (error) {
                console.log('error is occure in getTransactionHistory');
                console.log(error);
            });
    }
    $scope.pageChangedInExcelTransactionHistory=function(){
  $scope.filterData.skip=($scope.currentPage-1)*$scope.filterData.limit;
    $scope.getTransactionHistory($scope.filterData.skip);
    }


//thumbnail upload
        $scope.uploadFiles = function (file, errFiles) {
            console.log('control in the upload thmbnail'+file);
            var fileUploadObj = $uploadImage.uploadExcelFiles(file, errFiles);
            fileUploadObj.then(function (response) {
                 toastr.success("Your file imported successfully ", "Success");
                file.result = response.data;
                console.log(" service url", response.data.object);
                $scope.custom_thmbnail = response.data.object
            }, function (response) {}, function (evt) {});
        }

    $scope.downloadListedExcel = function(linkOfExcelFile){
    window.location = linkOfExcelFile;

}
$scope.init = function (skip) {

              $scope.getTransactionHistory(skip)
        }

$scope.init(0);

}])
.controller('voucherController', ['$scope','apiService','$timeout','$uploadVoucherFile', function ($scope,apiService,$timeout,$uploadVoucherFile) {
  $scope.date=0;
  console.log("sssssssssssssssssssssssssssssssssssssssss");

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

  $scope.minStartingDate = 0; //fixed date
  $scope.$watch('start', function (v) {
      $scope.minEndDate = v;
  });
  $scope.$watch('end', function (v) {
      $scope.maxStartingDate = v;
  });

  $scope.openEnd = function () {
      $timeout(function () {
          $scope.endOpened = true;
      });
  };

  $scope.dateOptions = {
      'year-format': "'yy'",
      'starting-day': 1
  };
  $scope.setDefault = function () {
              $scope.filterData={};
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

  //todo use the code from single service
   $scope.filterOnTabClick = function (number) {
              $scope.selectedIndex = number
              console.log('Filter ', number)
              $scope.filterData.skip = $scope.filterData.limit * number;
              $scope.init($scope.filterData.skip);
          }


  $scope.downloadExcel = function(){
  console.log("downloadExcel running");
    apiService.getDownloadTransactionLink({
              }).$promise.then(function (downloadLink) {
                  console.log('success',downloadLink);
                  window.location = downloadLink.object;
              }, function (error) {
                  console.log('error is occure in getDownloadLink');
                  console.log(error);
              });

  }
   $scope.getTransactionHistory=function(skip){
          console.log("voucherHistoryObj");
            $scope.loading=true;
          apiService.getExcelHistory({
                  action:'voucher',
                  skip:skip,
                  limit:10
              }).$promise.then(function ( voucherHistoryObj) {
                  console.log('success',voucherHistoryObj);
                   if (voucherHistoryObj.object.count) {
                      $scope.counter = voucherHistoryObj.object.count;
                  }
              // var total = transactionHistoryObj.object.object.length;
              $scope.data = [];


              if(voucherHistoryObj.object.object.length>0)

              {
                  $scope.data=voucherHistoryObj.object.object;
                  console.log("scope data is ",$scope.data);
                  $scope.totalPage=Math.ceil($scope.counter / $scope.filterData.limit)*10;
                    $scope.loading=false;
              }
              else {
                $scope.data.length=0;
                  $scope.loading=false;
              }
              }, function (error) {
                  console.log('error is occure in getTransactionHistory');
                  console.log(error);
              });

      }
      $scope.pageChangedInExcelVoucherHistory=function(){
    $scope.filterData.skip=($scope.currentPage-1)*$scope.filterData.limit;
      $scope.getTransactionHistory($scope.filterData.skip);
      }

  //thumbnail upload
          $scope.uploadFiles = function (file, errFiles) {
              console.log('control in the upload thmbnail'+file);
              var fileUploadObj = $uploadImage.uploadExcelFiles(file, errFiles);
              fileUploadObj.then(function (response) {
                   toastr.success("Your file imported successfully ", "Success");
                  file.result = response.data;
                  console.log(" service url", response.data.object);
                  $scope.custom_thmbnail = response.data.object
              }, function (response) {}, function (evt) {});
          }

      $scope.downloadListedExcel = function(linkOfExcelFile){
      window.location = linkOfExcelFile;

  }
  $scope.init = function (skip) {

                $scope.getTransactionHistory(skip)
          }

  $scope.init(0);

  $scope.downloadExcel = function(){
    console.log("downloadExcel running",$scope.date,$scope.EndDate);
    var postObject = {};
    postObject.startDate = $scope.date;
    postObject.endDate = $scope.EndDate;
    if($scope.date!=0 && $scope.EndDate!=0){
      apiService.getDownloadVoucherLink(postObject).$promise.then(function (downloadLink) {
                    console.log('success',downloadLink);
                    if(downloadLink.object){
                      window.location = downloadLink.object;
                      toastr.success("Voucher file exported successfully.", "Success");
                    }else {
                      toastr.success("No vouchers are left for this duration.", "Message");
                    }
                    // window.location = downloadLink.object;
                }, function (error) {
                    console.log('error is occure in getDownloadLink');
                    console.log(error);
                });
    }else {
      console.log("Error in date",$scope.minStartDate,$scope.minEndDate);
    }
  }

  $scope.uploadFiles = function (file, errFiles) {
      console.log('control in the upload thmbnail'+file);
      var fileUploadObj = $uploadVoucherFile.uploadExcelFiles(file, errFiles);
      fileUploadObj.then(function (response) {
        console.log("the response is",response);
           toastr.success("Your file imported successfully ", "Success");
          file.result = response.data;
          console.log(" service url", response.data.object);
          $scope.custom_thmbnail = response.data.object
      }, function (response) {}, function (evt) {});
  }

}]);
