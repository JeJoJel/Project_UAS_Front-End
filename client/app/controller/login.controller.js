var app = angular.module('myApp');

app.controller('LoginController', function($scope, AuthService, $location) {
    $scope.title = "Login";

    $scope.user = {}; 
    console.log('LoginController initialized');
    console.log('AuthService:', AuthService);
    $scope.login = function() {
        AuthService.login($scope.user)
            .then(response => {
                const token = response.data.token; // Ambil token dari respons
                const role = response.data.role; // Ambil role dari respons
                
                if (token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role); // Simpan token di localStorage
                    
                    if (role === 'admin') {
                        // Redirect ke halaman admin
                        window.location.href = 'app/views/admin.html';
                    } else {
                        // Redirect ke halaman user biasa
                        $location.path('/home');
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