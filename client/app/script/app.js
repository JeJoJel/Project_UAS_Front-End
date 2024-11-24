var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: 'views/register/register.html',
            controller: 'RegisterController'
        })
        .when('/index', {
            templateUrl: 'views/index.html'
        })
        .otherwise({
            redirectTo: '/index'
        });
});
