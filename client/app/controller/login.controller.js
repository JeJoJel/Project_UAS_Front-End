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
                const role = response.data.role; // Ambil role dari respons
                
                if (token) {
                    localStorage.setItem('token', token); // Simpan token di localStorage
                    
                    // Cek role dan redirect sesuai kondisi
                    if (role === 'admin') {
                        // Redirect ke halaman admin
                        window.location.href = '/client/app/views/admin.html';
                    } else {
                        // Redirect ke halaman user biasa
                        window.location.href = '/client/app/views/home.html';
                    }

                    alert(response.data.message); // Tampilkan pesan sukses
                } else {
                    alert('Token not found in response');
                }
            })
            .catch(err => {
                alert(err.data.error || 'Error during login');
            });
    };
});