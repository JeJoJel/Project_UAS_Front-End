var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'RegisterController'
        })
        .when('/homepage', {
            templateUrl: 'homepage.html',
            controller: 'HomepageController',
            resolve: {
                auth: function(AuthService, $location) {
                    return AuthService.isAuthenticated().catch(() => {
                        $location.path('/login');
                    });
                }
            }
        })
        .otherwise({
            redirectTo: '/login'
        });
});
