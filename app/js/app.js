'use strict';

var app = angular.module('weone', [
	'ngCookies',
	'ui.router',
	'ui.bootstrap',
	'oc.lazyLoad',
    'weone.controllers',
	'weone.directives',
	'weone.factory',
	'weone.services',
     'ngResource',
	'FBAngular',
    'weone.User',
    'weone.Advertisement',
    'files',
    'angucomplete-alt',
    'weone.Dashboard',
    'weone.notify',
    'ngFileUpload',
    //'angularMoment'
    'ngImgCrop',
    'ng-jwplayer',
    'Config',
    'infinite-scroll'


])

angular.module('weone.User',[]);
angular.module('weone.Advertisement',[]);
angular.module('weone.Client',[]);
angular.module('weone.Dashboard',[]);
angular.module('weone.notify',[]);

//app.constant("httpUrl","http://182.71.214.253:3000");
//app.constant("httpUrl","http://192.168.2.106:3000")
 //app.constant("httpUrl","http://192.168.2.225:3000");
 //app.constant("httpUrl","http://52.77.32.166:80");

//app.constant("videoUploadUrl","http://182.71.214.253:9088/#/upload/");
//app.constant("videoUploadUrl","http://192.168.2.106:9088/#/upload/");
//app.constant("videoUploadUrl","http://52.77.32.166:88/#/upload/");





/*app.run(function()
{
	// Page Loading Overlay
	public_vars.$pageLoadingOverlay = jQuery('.page-loading-overlay');*/



app.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, ASSETS, $httpProvider){

	$urlRouterProvider.otherwise('/login');

	$stateProvider.
		// Main Layout Structure
		state('app', {
			abstract: true,
			url: '/app',
			templateUrl: appHelper.templatePath('layout/app-body'),
			controller: function($rootScope){
				$rootScope.isLoginPage        = false;
				$rootScope.isLightLoginPage   = false;
				$rootScope.isLockscreenPage   = false;
				$rootScope.isMainPage         = true;
			}
		}).

		// Dashboards
		state('app.dashboard', {
			url: '/dashboard',
			templateUrl: appHelper.templatePath('dashboards/dashboard'),
            controller:'dashboardController',
			/*resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
						ASSETS.charts.dxGlobalize,
						ASSETS.extra.toastr,
					]);
				},
				dxCharts: function($ocLazyLoad){
					return $ocLazyLoad.load([
						ASSETS.charts.dxCharts,
					]);
				},
			}*/
		}).
  /*  state('Afterlogout', {
			url: '/login',
			templateUrl: appHelper.templatePath('login'),
			controller: 'LoginpageController',
    }).*/

		// App Users
		state('app.users-app-users', {
			url: '/users-app-users',
			templateUrl: appHelper.templatePath('users/app-users'),
            controller: 'UserController'
		}).

        // Admin Users
        state('app.users-admin-users', {
                url: '/users-admin-users',
                templateUrl: appHelper.templatePath('users/admin-users'),
                controller: 'UserController'
            }).
						state('app.users-banking-details', {
										url: '/users-banking-details',
										templateUrl: appHelper.templatePath('users/banking-details'),
										controller: 'UserController'
								}).
								state('app.users-voucher-details', {
												url: '/users-voucher-details',
												templateUrl: appHelper.templatePath('users/voucher-details'),
												controller: 'UserController'
										}).//beneficiary
     state('app.user-income-benificary', {
                url: '/user-income-benificary',
                templateUrl: appHelper.templatePath('export-import/benificary'),
                controller: 'beneficiaryController',
                resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
						//ASSETS.charts.dxGlobalize,
						ASSETS.extra.toastr
					])
				}
			}
            }).
        state('app.users-userRequest', {
                url: '/users-userRequest',
                templateUrl: appHelper.templatePath('users/userRequest'),
                controller: 'userRequestsController',
								resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
						ASSETS.extra.toastr
					])
				}
			}
            }).//beneficiary
						state('app.userRequest-paymentRequest', {
							url: '/userRequest-paymentRequest',
							templateUrl: appHelper.templatePath('userRequest/paymentRequest'),
							controller: 'userPaymentRequestsController',
							resolve: {
			resources: function($ocLazyLoad){
				return $ocLazyLoad.load([
					ASSETS.extra.toastr
				])
			}
		}
						}).
						state('app.userRequest-deleteRequest', {
							url: '/userRequest-deleteRequest',
							templateUrl: appHelper.templatePath('userRequest/deleteRequest'),
							controller: 'userRequestsController',
							resolve: {
			resources: function($ocLazyLoad){
				return $ocLazyLoad.load([
					ASSETS.extra.toastr
				])
			}
		}
						}).



    //transaction
    state('app.user-income-transaction', {
                url: '/user-income-transaction',
                templateUrl: appHelper.templatePath('export-import/transaction'),
                controller: 'transactionController',
                resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
						//ASSETS.charts.dxGlobalize,
						ASSETS.extra.toastr
					])
				}
			}
            }).
						state('app.user-income-vouchers', {
				                url: '/user-income-vouchers',
				                templateUrl: appHelper.templatePath('export-import/vouchers'),
				                controller: 'voucherController',
				                resolve: {
								resources: function($ocLazyLoad){
									return $ocLazyLoad.load([
										//ASSETS.charts.dxGlobalize,
										ASSETS.extra.toastr
									])
								}
							}
				            }).
        // Advertisement
        state('app.advertisement', {
                url: '/advertisement',
                templateUrl: appHelper.templatePath('advertisement/advertisement'),
                controller: 'advertisementController as advertisementctrl',
            resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
						//ASSETS.charts.dxGlobalize,
						ASSETS.extra.toastr
					])
				}
			}
        }).

        // client
        state('app.client', {
            url: '/client',
            templateUrl: appHelper.templatePath('client/client'),
            controller: 'UserController'
        }).
      state('app.transaction', {
            url: '/transaction',
            templateUrl: appHelper.templatePath('export-import/transaction'),
          //  controller: 'UserController'
        }).

        // client billing
        state('app.client-billing', {
            url: '/client-billing',
            templateUrl: appHelper.templatePath('client-billing/client-billing'),
            controller: 'clientBillingCtrl',
          resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
						//ASSETS.charts.dxGlobalize,
						ASSETS.extra.toastr
					])
				}
			}
        }).


     // user income
        state('app.user-income', {
            url: '/user-income',
            templateUrl: appHelper.templatePath('user-income/user-income'),
            controller: 'userIncomeCtrl'
        }).

        // Reward
        state('app.create-rewards', {
                url: '/rewards-create-rewards',
                templateUrl: appHelper.templatePath('rewards/create-rewards'),
              controller: 'createRewardController',
               resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
						//ASSETS.charts.dxGlobalize,
						ASSETS.extra.toastr
					])
				}
			}}).

        state('app.edit-rewards', {
                url: '/rewards-edit-rewards',
                templateUrl: appHelper.templatePath('rewards/edit-rewards'),
                controller:"retrieveRewardController"
            }).

         state('app.notify', {
                url: '/notify',
                templateUrl: appHelper.templatePath('notify/notify'),
                controller:"notifyCtrl",
								resolve: {
									resources: function($ocLazyLoad){
										return $ocLazyLoad.load([
					                       // ASSETS.core.jQueryUI,
											//ASSETS.forms.jQueryValidate,
											//ASSETS.extra.toastr,
											ASSETS.extra.toastr
										]);
									},
								}
            }).

     // Upload Video
        state('upload-video', {
                url: '/upload-video',
                templateUrl: appHelper.templatePath('upload-video'),
                //controller: 'createADcontroller',
        }).


		// Logins and Lockscreen
		state('login', {
			url: '/login',
			templateUrl: appHelper.templatePath('login'),
			controller: 'LoginCtrl',
			resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
                       // ASSETS.core.jQueryUI,
						//ASSETS.forms.jQueryValidate,
						//ASSETS.extra.toastr,
					]);
				},
			}
		}).



         // Forgot
        state('forgot', {
			url: '/forgot',
			templateUrl: appHelper.templatePath('forgot'),
			controller: 'forgotCtrl',
			resolve: {
				resources: function($ocLazyLoad){
					return $ocLazyLoad.load([
					//	ASSETS.forms.jQueryValidate,
                      //  ASSETS.extra.toastr,
					]);
				},
			}
		});




    $httpProvider.interceptors.push(function () {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Auth-Token'] = localStorage.getItem('authToken');
                return config;
            }
        };
    });

})
app.run(["$rootScope", "$location",function($rootScope,$location)
{
    // Page Loading Overlay
	public_vars.$pageLoadingOverlay = jQuery('.page-loading-overlay');

	jQuery(window).load(function()
	{
		public_vars.$pageLoadingOverlay.addClass('loaded');
	})

//     $rootScope.$on('$stateChangeStart',function (event, next) {
//        console.log("$routeChangeStart started..");
//            SessionService.isLoggedIn().success(function(res){
//                $rootScope.logInOrNot =res.object;
//              })
//            var res = $location.absUrl().substr($location.absUrl().indexOf($location.path()));
//            var res = $location.url();
//         console.log("res is...",res);*/
//          $location.url('/login?url='+res);
    $rootScope.$on('$stateChangeStart',function (event, next) {
        	if ((localStorage.getItem('authToken') == undefined || localStorage.getItem('authToken') == null || localStorage.getItem('authToken') == '')) {
       	    console.log("redirect to login..");
             $location.path("/login");
            }
    });
       	}])




app.constant('ASSETS', {
	'core': {
		'bootstrap': appHelper.assetPath('js/bootstrap.min.js'), // Some plugins which do not support angular needs this


		'jQueryUI': [
			appHelper.assetPath('js/jquery-ui/jquery-ui.min.js'),
			appHelper.assetPath('js/jquery-ui/jquery-ui.structure.min.css'),
		],

		'moment': appHelper.assetPath('js/moment.min.js'),

	//	'googleMapsLoader': appHelper.assetPath('app/js/angular-google-maps/load-google-maps.js')
	},
/*
	'charts': {

		'dxGlobalize': appHelper.assetPath('js/devexpress-web-14.1/js/globalize.min.js'),
		'dxCharts': appHelper.assetPath('js/devexpress-web-14.1/js/dx.chartjs.js'),
		'dxVMWorld': appHelper.assetPath('js/devexpress-web-14.1/js/vectormap-data/world.js'),
	},

	'xenonLib': {
		notes: appHelper.assetPath('js/xenon-notes.js'),
	},

	'maps': {

		'vectorMaps': [
			appHelper.assetPath('js/jvectormap/jquery-jvectormap-1.2.2.min.js'),
			appHelper.assetPath('js/jvectormap/regions/jquery-jvectormap-world-mill-en.js'),
			appHelper.assetPath('js/jvectormap/regions/jquery-jvectormap-it-mill-en.js'),
		],
	},

	'icons': {
		'meteocons': appHelper.assetPath('css/fonts/meteocons/css/meteocons.css'),
		'elusive': appHelper.assetPath('css/fonts/elusive/css/elusive.css'),
	},

	'tables': {
		'rwd': appHelper.assetPath('js/rwd-table/js/rwd-table.min.js'),

		'datatables': [
			appHelper.assetPath('js/datatables/dataTables.bootstrap.css'),
			appHelper.assetPath('js/datatables/datatables-angular.js'),
		],

	},

	'forms': {

		'select2': [
			appHelper.assetPath('js/select2/select2.css'),
			appHelper.assetPath('js/select2/select2-bootstrap.css'),

			appHelper.assetPath('js/select2/select2.min.js'),
		],

		'daterangepicker': [
			appHelper.assetPath('js/daterangepicker/daterangepicker-bs3.css'),
			appHelper.assetPath('js/daterangepicker/daterangepicker.js'),
		],

		'colorpicker': appHelper.assetPath('js/colorpicker/bootstrap-colorpicker.min.js'),

		'selectboxit': appHelper.assetPath('js/selectboxit/jquery.selectBoxIt.js'),

		'tagsinput': appHelper.assetPath('js/tagsinput/bootstrap-tagsinput.min.js'),

		'datepicker': appHelper.assetPath('js/datepicker/bootstrap-datepicker.js'),

		'timepicker': appHelper.assetPath('js/timepicker/bootstrap-timepicker.min.js'),

		'inputmask': appHelper.assetPath('js/inputmask/jquery.inputmask.bundle.js'),

		'formWizard': appHelper.assetPath('js/formwizard/jquery.bootstrap.wizard.min.js'),

		'jQueryValidate': appHelper.assetPath('js/jquery-validate/jquery.validate.min.js'),

		'dropzone': [
			appHelper.assetPath('js/dropzone/css/dropzone.css'),
			appHelper.assetPath('js/dropzone/dropzone.min.js'),
		],

		'typeahead': [
			appHelper.assetPath('js/typeahead.bundle.js'),
			appHelper.assetPath('js/handlebars.min.js'),
		],

		'multiSelect': [
			appHelper.assetPath('js/multiselect/css/multi-select.css'),
			appHelper.assetPath('js/multiselect/js/jquery.multi-select.js'),
		],

		'icheck': [
			appHelper.assetPath('js/icheck/skins/all.css'),
			appHelper.assetPath('js/icheck/icheck.min.js'),
		],

		'bootstrapWysihtml5': [
			appHelper.assetPath('js/wysihtml5/src/bootstrap-wysihtml5.css'),
			appHelper.assetPath('js/wysihtml5/wysihtml5-angular.js')
		],
	},

	'uikit': {
		'base': [
			appHelper.assetPath('js/uikit/uikit.css'),
			appHelper.assetPath('js/uikit/css/addons/uikit.almost-flat.addons.min.css'),
			appHelper.assetPath('js/uikit/js/uikit.min.js'),
		],

		'codemirror': [
			appHelper.assetPath('js/uikit/vendor/codemirror/codemirror.js'),
			appHelper.assetPath('js/uikit/vendor/codemirror/codemirror.css'),
		],

		'marked': appHelper.assetPath('js/uikit/vendor/marked.js'),
		'htmleditor': appHelper.assetPath('js/uikit/js/addons/htmleditor.min.js'),
		'nestable': appHelper.assetPath('js/uikit/js/addons/nestable.min.js'),
	},

	'extra': {
		'tocify': appHelper.assetPath('js/tocify/jquery.tocify.min.js'),

		'toastr': appHelper.assetPath('js/toastr/toastr.min.js'),

		'fullCalendar': [
			appHelper.assetPath('js/fullcalendar/fullcalendar.min.css'),
			appHelper.assetPath('js/fullcalendar/fullcalendar.min.js'),
		],

		'cropper': [
			appHelper.assetPath('js/cropper/cropper.min.js'),
			appHelper.assetPath('js/cropper/cropper.min.css'),
		]
	}
    */

	'extra': {
		'tocify': appHelper.assetPath('js/tocify/jquery.tocify.min.js'),

		'toastr': appHelper.assetPath('js/toastr/toastr.min.js'),

		'fullCalendar': [
			appHelper.assetPath('js/fullcalendar/fullcalendar.min.css'),
			appHelper.assetPath('js/fullcalendar/fullcalendar.min.js'),
		],

		'cropper': [
			appHelper.assetPath('js/cropper/cropper.min.js'),
			appHelper.assetPath('js/cropper/cropper.min.css'),
		]
	}
});
