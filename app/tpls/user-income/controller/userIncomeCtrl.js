angular.module('weone').controller('userIncomeCtrl', ['$scope', '$modal', '$log', '$timeout', '$state', 'apiService', function ($scope, $modal, $log, $timeout, $state, apiService) {
console.log("user incomecontroller");
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
    $scope.setDefault = function () {
        $scope.limit = 10;
        $scope.skip = 0;
        $scope.totalPage =0;
        $scope.counter = 0;
        $scope.selectedIndex = 0;
        $scope.getDataFlag = true;
        $scope.maxSize=4;
        $scope.currentPage=1;
        $scope.searchFlag = false;
        $scope.searchPage=1;
        $scope.loading=false;
        $scope.amount=[];
        $scope.maxSize1=2;
        $scope.prev=0;
        $scope.balance={};
          $scope.nextAmountTotal={};
          $scope.nextAmount={};
          $scope.balance1={};
          $scope.previousAmount={};
                 $scope.currentPage={};
                 $scope.nextAmountCurrent={};
    }
    $scope.setDefault();
    $scope.filterOnTabClick = function (number) {
        $scope.selectedIndex = number
        console.log('Filter ', number)
        $scope.skip = $scope.limit * number;
        $scope.init($scope.limit);
    }



    $scope.init = function (skip) {
        $scope.getEarning(skip);
    }


    $scope.getEarning = function (skip) {
      console.log("hello un user earning");
         $scope.loading=true;
        console.log('date in scope is ',$scope.date);
        console.log('skip in scope is ',skip);
        console.log('limit in scope is ',$scope.limit);
        if($scope.date==null){
          $scope.date=0;
        }
        apiService.userEarnings({
            date: $scope.date,
             limit: $scope.limit,
             skip:skip
        }).$promise.then(function (userObj) {
            console.log("user object", userObj);
            console.log(" object of object of user object", userObj.object.object);
            console.log(" object of user object ", userObj.object);
              if (userObj.object.count>0) {
                    $scope.counter = userObj.object.count
                  }
            console.log("counter in scope is ",userObj.object.count);
            if(userObj.object.object.length>0){
              console.log("length greater than 0 or not",userObj.object.object.length);
               $scope.totalPage = Math.ceil($scope.counter/ $scope.limit)*10;
               console.log("totalPage is ",$scope.totalPage);
                $scope.retriveData(userObj.object.object);
              $scope.loading=false;


          }else {

$scope.data.length=0;
$scope.loading=false;

}

        }, function (err) {
            console.log('error in get user earning ');
            console.log(err);
        });
    }
    $scope.init(0);
    $scope.searchUserIncome = function (skip) {
      $scope.loading=true;
      if($scope.date==null){
        $scope.date=0;
      }
        if ($scope.search == '') {
            console.log("search box..", $scope.search)
            $scope.searchFlag = false;
            $scope.init(0);
            $scope.currentPage=1;
            $scope.skip=0;

        } else {
          console.log("hrllo else in search",$scope.currentPage);
            $scope.searchFlag = true;
             $scope.skip =skip;
            // $scope.selectedIndex = 0
            apiService.searchUserIncome({
                  email: $scope.search,
                  date:$scope.date,
                  limit: $scope.limit,
                  skip: skip
            }).$promise.then(function (response) {
              console.log("response is",response);
                if (response.object.count) {
                    $scope.counter = response.object.count;
                          console.log("counter in scope of search is",$scope.counter);
                }
                if(response.object.object.length>0){
                  $scope.totalPage = Math.ceil($scope.counter/ $scope.limit)*10;
                       console.log("current page is ",$scope.currentPage);
                      //  if($scope.skip==$scope.counter-response.object.object.length){
                      //    $scope.loading=false;
                      //    $scope.skip=0;
                      //  }
                      //  else {
                  $scope.retriveData(response.object.object);
                     $scope.loading=false;
// }
                }
                else {
                  $scope.data.length=0;
                  $scope.loading=false;
                }

            }, function (error) {
                console.log("error is..", error);
                $scope.loading=false;
            });
        }
    }

$scope.retriveData=function(userObject){
  $scope.data=[];
  for(i=0;i<userObject.length;i++){
                    var temp={};
                    temp.date_of_earning=userObject[i].date_of_earning;
                    temp.name=userObject[i].user_id.name;
                    temp.image_url=userObject[i].user_id.image_url;
                    temp.total_amount=userObject[i].total_amount;
                    temp.balance=userObject[i].user_id.user_account.wallet.wallet_amount_available;
                    console.log("balance is",temp.balance);
                    $scope.data.push(temp);
                    $scope.loading=false;
                    console.log("data in scope is",$scope.data);

                  }

}

    $scope.setAgain=function(){
      if($scope.search== ''){
      $scope.searchFlag=false;
      $scope.skip=0;
      $scope.currentPage=1;
      $scope.searchPage=1;
      $scope.init(0);
      $scope.prev=0;
    }
}

    $scope.pageChangedInUserIncome=function(){
      if($scope.searchFlag==false){
  $scope.skip=($scope.currentPage-1)*$scope.limit;
    $scope.getEarning($scope.skip);
  }else {
    $scope.skip=($scope.searchPage-1)*$scope.limit;

    $scope.searchUserIncome($scope.skip);

  }
    }
    $scope.reset=function(){
      $scope.skip=0;
      $scope.currentPage=1;
      $scope.init(0);
  }



}]);
