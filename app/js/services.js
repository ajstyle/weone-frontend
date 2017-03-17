'use strict';

angular.module('weone.services', []).
	service('$menuItems', function()
	{
		this.menuItems = [];

		var $menuItemsRef = this;

		var menuItemObj = {
			parent: null,

			title: '',
			link: '', // starting with "./" will refer to parent link concatenation
			state: '', // will be generated from link automatically where "/" (forward slashes) are replaced with "."
			icon: '',

			isActive: false,
			label: null,

			menuItems: [],

			setLabel: function(label, color, hideWhenCollapsed)
			{
				if(typeof hideWhenCollapsed == 'undefined')
					hideWhenCollapsed = true;

				this.label = {
					text: label,
					classname: color,
					collapsedHide: hideWhenCollapsed
				};

				return this;
			},

			addItem: function(title, link, icon)
			{
				var parent = this,
					item = angular.extend(angular.copy(menuItemObj), {
						parent: parent,

						title: title,
						link: link,
						icon: icon
					});

				if(item.link)
				{
					if(item.link.match(/^\./))
						item.link = parent.link + item.link.substring(1, link.length);

					if(item.link.match(/^-/))
						item.link = parent.link + '-' + item.link.substring(2, link.length);

					item.state = $menuItemsRef.toStatePath(item.link);
				}

				this.menuItems.push(item);

				return item;
			}
		};

		this.addItem = function(title, link, icon)
		{
			var item = angular.extend(angular.copy(menuItemObj), {
				title: title,
				link: link,
				state: this.toStatePath(link),
				icon: icon
			});

			this.menuItems.push(item);

			return item;
		};

		this.getAll = function()
		{
			return this.menuItems;
		};

		this.prepareSidebarMenu = function()
		{
						var dashboard      = this.addItem('Dashboard', 	'/app/dashboard', 		'linecons-cog');
						var users          = this.addItem('Users',	        '/app/users',	        'linecons-user');
            var advertisement  = this.addItem('Advertisement',	'/app/advertisement',	'linecons-megaphone');
            var client         = this.addItem('Client',	    '/app/client',	        '');
            var rewards        = this.addItem('Rewards',	    '/app/rewards',	        '');
            var clientBilling  = this.addItem('Client Billing',	'/app/client-billing',	'');
            var userIncome     = this.addItem('User Income',	'/app/user-income',	'');
		    		var exportimport   = this.addItem('Export / Import', '/app/user-income', '');
            var notify         = this.addItem('Notify' , '/app/notify', 'fa fa-bell');
						var userRequest    = this.addItem('User Requests' , '/app/userRequest', 'fa fa-envelope');


                // Subitems of Users
								users.addItem('App Users', 	   '-/app-users');
                users.addItem('Admin Users', 	'-/admin-users');
								users.addItem('Banking Details', 	   '-/banking-details');
								users.addItem('Voucher Details', 	   '-/voucher-details');

                // users.addItem('User Requests', 	'-/userRequest');
								userRequest.addItem('Payment Requests', 	   '-/paymentRequest');
				        userRequest.addItem('Delete Requests', 	'-/deleteRequest');

								// Subitems of Export Import
                exportimport.addItem('Benificary',  '-/benificary');
                exportimport.addItem('Transaction',  '-/transaction');
								  exportimport.addItem('Vouchers',  '-/vouchers');

              	rewards.addItem('Create Rewards',  '-/create-rewards');
                rewards.addItem('Edit Rewards',  '-/edit-rewards');
			return this;
		};

		this.prepareHorizontalMenu = function()
		{
			var dashboard    = this.addItem('Dashboard', 		'/app/dashboard', 			'linecons-cog');
            var users      = this.addItem('Users',	'/app/users',	'linecons-desktop');





			return this;
		}

		this.instantiate = function()
		{
			return angular.copy( this );
		}

		this.toStatePath = function(path)
		{
			return path.replace(/\//g, '.').replace(/^\./, '');
		};

		this.setActive = function(path)
		{
			this.iterateCheck(this.menuItems, this.toStatePath(path));
		};

		this.setActiveParent = function(item)
		{
			item.isActive = true;
			item.isOpen = true;

			if(item.parent)
				this.setActiveParent(item.parent);
		};

		this.iterateCheck = function(menuItems, currentState)
		{
			angular.forEach(menuItems, function(item)
			{
				if(item.state == currentState)
				{
					item.isActive = true;

					if(item.parent != null)
						$menuItemsRef.setActiveParent(item.parent);
				}
				else
				{
					item.isActive = false;
					item.isOpen = false;

					if(item.menuItems.length)
					{
						$menuItemsRef.iterateCheck(item.menuItems, currentState);
					}
				}
			});
		}
	}).service("$uploadImage",function(Upload,$enviornment){

    this.uploadFiles = function(file, errFiles) {
            file.upload = Upload.upload({
                url: $enviornment.httpUrl+"/api/v1/uploadimage",
                data: {file: file}
            });
            return file.upload;
    },
     this.uploadExcelFiles = function(file, errFiles) {
            file.upload = Upload.upload({
                url: $enviornment.httpUrl+"/api/v1/beneficiary/import",
                data: {file: file}
/*                 headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                }*/
            });
            return file.upload;
    }


}).service("$uploadVoucherFile",function(Upload,$enviornment){

	this.uploadFiles = function(file, errFiles) {
					file.upload = Upload.upload({
							url: $enviornment.httpUrl+"/api/v1/uploadimage",
							data: {file: file}
					});
					return file.upload;
	},
	 this.uploadExcelFiles = function(file, errFiles) {
					file.upload = Upload.upload({
							url: $enviornment.httpUrl+"/api/v1.1/admin/vouchers/import",
							data: {file: file}
/*                 headers: {
									'Content-Type': 'application/json',
									"X-Auth-Token": dataFactory.getTokenHeader()
							}*/
					});
					return file.upload;
	}


});/*.service("$uploadImage",function(Upload,$enviornment){

    this.uploadExcelFiles = function(file, errFiles) {
            file.upload = Upload.upload({
                url: $enviornment.httpUrl+"/api/v1/beneficiary/import",
                data: {file: file}
/*                 headers: {
                    'Content-Type': 'application/json',
                    "X-Auth-Token": dataFactory.getTokenHeader()
                }*/
          //  });
            //return file.upload;
   // }
//});//*/
