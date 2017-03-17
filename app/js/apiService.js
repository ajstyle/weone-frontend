angular.module('weone')
    .service('apiService', ['$resource', '$http', 'dataFactory', '$enviornment', function ($resource, $http, dataFactory, $enviornment) {
        //var httpUrl = $enviornment.httpUrl
        var dataResource = $resource('', {}, {
            login: {
                url: $enviornment.httpUrl + '/api/v1.1/admin/user/login',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            forgotPassword: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/password/forgot/:email",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    email: '@email'
                }
            },
            logout: {
                url: $enviornment.httpUrl + '/api/v1.1/admin/user/logout',
                method: "delete",
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                }
            },
            getUserData: {
                url: $enviornment.httpUrl + '/api/v1.1/admin/user/:role/:skip/:limit',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                },
                params: {
                    role: '@role',
                    skip: '@skip',
                    limit: '@limit'
                }
            },

            addUser: {
                url: $enviornment.httpUrl + '/api/v1.1/admin/user/register',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                }
            },
            deleteUser: {
                url: $enviornment.httpUrl + '/api/v1.1/app/user/delete',
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }

            },
            searchUsers: {
                url: $enviornment.httpUrl + '/api/v1.1/admin/user/search/:email/:skip/:limit/:role',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                }

            },
            updateUser: {
                url: $enviornment.httpUrl + '/api/v1.1/app/user',
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                }
            },
            checkemail: {
                url: $enviornment.httpUrl + '/api/v1.1/admin/checkemail/:email/:role',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                },
                params: {
                    email: "@email",
                    role: "@role"
                }
            },
            //advertisement
            getAdvertisement: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/advert/:skip/:limit",
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                },
                params: {
                    skip: "@skip",
                    limit: "@limit"
                }
            },
            deleteAdvertisement: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/advert/:advertid",
                method: "delete",
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                },
                params: {
                    advertid: '@advertid'
                }
            },
            editAdvertisement: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/advert/:advertid",
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                },
                params: {
                    advertid: '@advertid'
                }
            },
            editAdvertMedia: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/video/token",
                method: "post",
            },
            searchAdvertisement: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/advert/search/:name/:skip/:limit",
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                },
                params: {
                    name: '@name',
                    skip: '@skip',
                    limit: '@limit'


                }
            },
            createAdvertisement: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/advert",
                method: "post",
            },
            sendReward: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/user/rewards",
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            retrieveRewards: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/rewards/:skip/:limit",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    skip: '@skip',
                    limit: '@limit'
                }
            },
            deleteReward: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/rewards",
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            updateReward: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/user/rewards",
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            clientBill: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/client/bill",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            advertisementUser: {
                url: $enviornment.httpUrl + "/api/v1.1/advert/:id/:type",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    id: '@id',
                    type: '@type'
                }
            },
            userEarnings: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/user/earning/:date/:limit/:skip",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    date: '@date',
                    limit: '@limit',
                    skip: '@skip'
                }
            },
            dashboard: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/dashboard",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            adminRevenue: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/revenue",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            getUsersLocations: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/user/locations",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            getDownloadBenificiaryLink: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/beneficiary/export",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': dataFactory.getTokenHeader()

                }
            },
            getDownloadBenificiaryErrExcel: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/beneficiary/excel/error",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': dataFactory.getTokenHeader()
                }

            },


            getDownloadTransactionLink: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/transaction/export",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': dataFactory.getTokenHeader()
                }

            },
            getExcelHistory: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/excel/history/:action/:skip/:limit",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': dataFactory.getTokenHeader()
                },
                params: {
                    action: '@action',
                    skip: '@skip',
                  limit:'@limit'
                }
            },
            networkTreeStatus: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/user/tree/:userid",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    userid: '@userid'
                }
            },
            globalNotification: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/global_push_notifications",
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            getDeleteRequests : {
              url : $enviornment.httpUrl + "/api/v1.1/admin/user/get/delete_requests/:limit/:skip",
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json',
                'X-Auth-Token': dataFactory.getTokenHeader()
              }
            },
            manageDeleteRequest : {
              url : $enviornment.httpUrl + "/api/v1.1/admin/user/set_delete_request",
              method:'POST',
              headers : {
                'Content-Type' : 'application/json',
                'X-Auth-Token': dataFactory.getTokenHeader()
              }
            },
            getAllComments : {
              url : $enviornment.httpUrl + "/api/v1.1/admin/users/comments/show_all/:advertisement_id",
              method:'GET',
              headers : {
                'Content-Type' : 'application/json',
                'X-Auth-Token': dataFactory.getTokenHeader()
              },
              params: {
                  advertisement_id: '@advertisement_id'
              }
            },
            deleteComment : {
              url : $enviornment.httpUrl + "/api/v1.1/admin/user/delete/comment",
              method:'PUT',
              headers : {
                'Content-Type' : 'application/json',
                'X-Auth-Token': dataFactory.getTokenHeader()
              }
            },
            getUsersLocationsWithCities: {
                url: $enviornment.httpUrl + "/api/v1.1/admin/user/locations_with_city/:advertisement_id/:skip/:limit",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': dataFactory.getTokenHeader()
                },
                params: {
                    advertisement_id: '@advertisement_id',
                    skip:'@skip',
                    limit:'@limit'
                }
            },
            getTreeData: {
                url: $enviornment.httpUrl + "/api/v1.1/get/user/tree/:user_id",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                },
                params: {
                    user_id: '@user_id'
                }
            },
            getPaymentRequests : {
              url : $enviornment.httpUrl + "/api/v1.1/admin/get/payment_requests/:type/:limit/:skip",
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json',
                'X-Auth-Token': dataFactory.getTokenHeader()
              },
              params:{
                type:'@type',
                limit:'@limit',
                skip:'@skip'
              }
            },
            setUserRequests : {
              url : $enviornment.httpUrl + "/api/v1.1/admin/user/set_payment_request",
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json',
                'X-Auth-Token': dataFactory.getTokenHeader()
              }
            },
            getUserBankDetail:{
            url:$enviornment.httpUrl+"/api/v1.1/app/user/getUserBankDetail/:skip/:limit",
            method : 'GET',
            params:{
              skip:'@skip',
              limit:'@limit'

            }

          },
          getUserBankDetailById:{
            url:$enviornment.httpUrl+"/api/v1.1/app/user/getUserBankDetailById/:id",
            method : 'GET',
            params:{
              id:'@id'


            }

          },
          getVoucherDetails:{
            url:$enviornment.httpUrl+"/api/v1.1/app/user/getVoucherDetails/:skip/:limit",
            method : 'GET',
            params:{
              skip:'@skip',
              limit:'@limit'

            }
          },
          getVouchersOfUser:{
            url:$enviornment.httpUrl+"/api/v1.1/app/user/voucherWithUserId/:userId/:skip/:limit",
            method : 'GET',
            params:{
              userId:'@userId',
              skip:'@skip',
              limit:'@limit'

            }
          },
          viewVoucherOfUser:{
            url:$enviornment.httpUrl+"/api/v1.1/app/user/viewVoucherOfUser/:id",
            method : 'GET',
            params:{
              id:'@id'


            }
          },
          getDownloadVoucherLink: {
             // url: $enviornment.httpUrl + "/api/v1.1/admin/vouchers/export",
	      url: "http://52.66.101.222:3000" + "/api/v1.1/admin/vouchers/export",
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'X-Auth-Token': dataFactory.getTokenHeader()
              }

          },
          searchUsersInBankingDetails: {
              url: $enviornment.httpUrl + '/api/v1.1/admin/user/searchAdminWithBankingDetails/:email/:skip/:limit',
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  "X-Auth-Token": dataFactory.getTokenHeader()
              }

          },
          searchUsersInVoucherDetails: {
              url: $enviornment.httpUrl + '/api/v1.1/admin/user/searchAdminWithVoucherDetails/:email/:skip/:limit',
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  "X-Auth-Token": dataFactory.getTokenHeader()
              }

          },
          userLevel1: {
              url: $enviornment.httpUrl + '/api/v1.1/app/admin/get/tree_level/:level/:id/:skip/:limit',
              method: 'GET'


          },
          searchUserIncome: {
              url: $enviornment.httpUrl + "/api/v1.1/admin/user/searchUserIncome/:email/:date/:limit/:skip",
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  "X-Auth-Token": dataFactory.getTokenHeader()
              },
              params: {
                  email: '@email',
                  limit: '@limit',
                  skip: '@skip'
              }
          },
          searchUsersInDeleteRequest: {
              url: $enviornment.httpUrl + "/api/v1.1/admin/user/searchUsersInDeleteRequest/:email/:skip/:limit",
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  "X-Auth-Token": dataFactory.getTokenHeader()
              },
              params: {
                  email: '@email',
                  skip: '@skip',
                  limit: '@limit'
              }
          },
          searchUsersInPaymentRequest: {
              url: $enviornment.httpUrl + "/api/v1.1/admin/user/searchUsersInPaymentRequest/:type/:email/:skip/:limit",
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  "X-Auth-Token": dataFactory.getTokenHeader()
              },
              params: {
                type:'@type',
                  email: '@email',
                  skip: '@skip',
                  limit: '@limit'
              }
          },
        getUserEarningDetails:{
          url: $enviornment.httpUrl + "/api/v1.1/app/user/earningDetails/:userid",
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              "X-Auth-Token": dataFactory.getTokenHeader()
          },
          params: {
              userid:'@userid'
          }
        },
        getUserEarningDetailsByDate:{
          url: $enviornment.httpUrl + "/api/v1.1/app/user/earningDetailsByDate/:userid/:date",
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              "X-Auth-Token": dataFactory.getTokenHeader()
          },
          params: {
              userid:'@userid',
              date:'@date'
          }
        },
        getUserDataPanel: {
            url: $enviornment.httpUrl + '/api/v1.1/admin/panel/user/:role/:skip/:limit/:date',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                "X-Auth-Token": dataFactory.getTokenHeader()
            },
            params: {
                role: '@role',
                skip: '@skip',
                limit: '@limit',
                date:'@date'
            }
          },
        adminClients: {
                url: $enviornment.httpUrl + "/api/v2.0.0/admin/clients",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
          adminAdvertisements: {
                url: $enviornment.httpUrl + "/api/v2.0.0/admin/advertisements",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            },
	        getAdvertisementsCharge: {
                 url: $enviornment.httpUrl + "/api/v2.0.0/admin/advertisements/charges",
                 method: "GET",
                 headers: {
                    'Content-Type': 'application/json',
                 }
            }

        });
        return dataResource;
}]);
