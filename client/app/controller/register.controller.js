var app = angular.module('myApp');

app.service('AuthService', function($http) {
    this.register = function(user) {
        return $http.post('/api/register', user);
    };
});

app.controller('RegisterController', function($scope, AuthService) {

    $scope.title = "Register";

    $scope.user = {};

    $scope.register = function() {
        // Validasi password dan konfirmasi password
        if ($scope.user.password !== $scope.user.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Panggil service untuk registrasi
        AuthService.register($scope.user)
        .then(response => {
            // Berhasil
            alert(response.data.message); // Tampilkan pesan sukses
            // route ke halaman login
            window.location.href = '../../index.html';
        })
        .catch(err => {
            // Tangani error dari backend
            const errorMessage = err.data?.error || 'Error during registration, please try again';
            alert(errorMessage); // Tampilkan pesan error
        });
    };
});