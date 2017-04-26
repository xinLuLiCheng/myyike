
	var Yike = angular.module('Yike', ['ngRoute']);

	Yike.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/today', {
			templateUrl: './views/today.html',
			controller: 'TodayCtrl'
		})
		.when('/older', {
			templateUrl: './views/older.html',
			controller: 'OlderCtrl'
		})
		.when('/author', {
			templateUrl: './views/author.html',
			controller: 'AuthorCtrl'
		})
		.when('/cagegory', {
		// 为路由配置视图
			templateUrl: './views/category.html'
		})
		.when('/like', {
		// 为路由配置视图
			templateUrl: './views/favourite.html'
		})
		.when('/settings', {
			// 为路由配置视图
			templateUrl: './views/settings.html'
		})
		.otherwise({
			redirectTo: '/today'
		});
	}]);


	Yike.run(['$rootScope', function ($rootScope) {

		$rootScope.collapsed = false;

		$rootScope.collapse = function () {
			$rootScope.collapsed = !$rootScope.collapsed;

			//所有导航
			var navs = document.querySelectorAll('.navs dd');
			//判断当前导航是打开还是关闭
			if($rootScope.collapsed){
				for(var i = 0; i < navs.length; i ++){
					navs[i].style.transform = 'translate(0)';
					navs[i].style.transitionDelay = '0.2s';
					navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
				}
			}else{
				for(var j = navs.length; j > 0; j--){
					navs[j-1].style.transform = 'translate(-100%)';
					navs[j-1].style.transitionDelay = '';
					navs[j-1].style.transitionDuration = (navs.length - j) * 0.15 + 's';
				}
			}
		}

	}]);


	Yike.controller('NavsCtrl', ['$scope', function ($scope) {

		$scope.navs = [
			{text: '今日天下', link: '#/today', icon: 'icon-home'},
			{text: '往期内容', link: '#/older', icon: 'icon-file-empty'},
			{text: '热门作者', link: '#/author', icon: 'icon-pencil'},
			{text: '栏目浏览', link: '#/cagegory', icon: 'icon-menu'},
			{text: '我的喜欢', link: '#/like', icon: 'icon-heart'},
			{text: '设置', link: '#/settings', icon: 'icon-cog'}
		];

	}]);


	Yike.controller('TodayCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

		$rootScope.loaded = false;

		$rootScope.key = 0;

		$rootScope.title = '今日天下';

		$http({
			url: './api/today.php'
		}).success(function (info) {
			// console.log(info);
			$scope.posts = info.posts;
			$scope.date = info.date;

			$rootScope.loaded = true;
		})
	}]);

	Yike.controller('OlderCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
		$rootScope.loaded = false;
		$rootScope.key = 1;
		$rootScope.title = '往期回顾';
		$http({
			url: './api/older.php'
		}).success(function(info){
			console.log(info);

			$scope.posts = info.posts;
			$scope.date = info.date;
			$rootScope.loaded = true;
		})
	}]);

	Yike.controller('AuthorCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
		$rootScope.loaded = false;
		$rootScope.key = 2;
		$rootScope.title = '热门作者';
		$http({
			url: './api/author.php'
		}).success(function(info){
			console.log(info);

			$scope.rec = info.rec.authors;
			$scope.all = info.all.authors;
			$rootScope.loaded = true;
		})
	}])