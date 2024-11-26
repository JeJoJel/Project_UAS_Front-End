var app = angular.module('myApp');

app.service('AuthService', function($http) {
    const backendUrl = 'http://localhost:3000/api/auth';

    // Register
    this.register = function(user) {
        return $http.post(`${backendUrl}/register`, user);
    };

    // Login
    this.login = function(user) {
        return $http.post(`${backendUrl}/login`, user);
    };

});
