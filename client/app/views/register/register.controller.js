var app = angular.module('myApp', []);

app.service('AuthService', function($http) {
    this.register = function(user) {
        return $http.post('/api/register', user);
    };
});

app.controller('RegisterController', function($scope, AuthService, $location) {
    $scope.user = {};

    $scope.register = function() {
        if ($scope.user.password !== $scope.user.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        AuthService.register($scope.user)
        .then(() => {
            alert('Registration successful');
            $location.path('../home/home.html');
        })
        .catch(err => {
            alert(err.data.message || 'Error during registration');
        });
    
    };
});