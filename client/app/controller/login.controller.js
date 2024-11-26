var app = angular.module('myApp');

app.service('AuthService', function($http) {
    this.register = function(user) {
        return $http.post('/api/register', user);
    };
});

app.controller('LoginController', function($scope, AuthService) {

    $scope.title = "Login";

    $scope.user = {}; // Objek untuk menyimpan input user

    $scope.login = function() {
        AuthService.login($scope.user)
            .then(response => {
                const token = response.data.token; // Ambil token dari respons
                if (token) {
                    localStorage.setItem('token', token); // Simpan token di localStorage
                // Berhasil
                alert(response.data.message); // Tampilkan pesan sukses
                // route ke halaman login
                window.location.href = '/client/app/views/home.html';
                } else {
                    alert('Token not found in response');
                }
            })
            .catch(err => {
                alert(err.data.error || 'Error during login');
            });
    };
});