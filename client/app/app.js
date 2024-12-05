var app = angular.module('myApp', ['ngRoute']);

// Routing
app.config(['$routeProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);  // Mengaktifkan HTML5 Mode
    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'LoginController',
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/article', {
            templateUrl: 'views/articles.html',
            controller: 'ArticlesController'
        })
        .when('/admin', {
            templateUrl: 'views/contact.html',
            controller: 'AdminController',
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'views/login.html',
            controller: 'RegisterController'
        })
        
        .otherwise({
            redirectTo: '/'
        });
}]);