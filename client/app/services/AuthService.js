var app = angular.module('myApp', []);

app.service('AuthService', function($http) {
    const backendUrl = 'http://localhost:3000/api/auth';

    this.login = function(credentials) {
        return $http.post(`${backendUrl}/login`, credentials);
    };
});

app.controller('LoginController', function($scope, AuthService) {
    $scope.user = {}; // Objek untuk menyimpan input user

    $scope.login = function() {
        AuthService.login($scope.user)
            .then(response => {
                const token = response.data.token; // Ambil token dari respons
                if (token) {
                    localStorage.setItem('token', token); // Simpan token di localStorage
                    alert('Login successful');
                    window.location.href = './views/home.html'; // Redirect ke home page
                } else {
                    alert('Token not found in response');
                }
            })
            .catch(err => {
                alert(err.data.error || 'Error during login');
            });
    };
});