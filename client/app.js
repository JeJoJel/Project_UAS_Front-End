var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'app/views/register.html',
            controller: 'RegisterController'
        })
        .when('/home', {
            templateUrl: 'app/views/home.html',
            controller: 'HomeController'
        })
        .when('/profile', {
            templateUrl: 'app/views/profile.html',
            controller: 'ProfileController'
        })
        .when('/article', {
            templateUrl: 'app/views/article.html',
            controller: 'HomeController'
        })
        .when('/event', {
            templateUrl: 'app/views/event.html',
            controller: 'HomeController'
        })
        .when('/admin', {
            templateUrl: 'app/views/admin.html',
            controller: 'AdminController'
        })
        .when('/createArticle', {
            templateUrl: 'app/views/createArticle.html',
            controller: 'CreateArticleController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
