var app = angular.module('myApp', []);

app.controller('LoginController', function($scope, AuthService) {
    $scope.user = {}; // Data dari form

    $scope.login = function() {
        AuthService.login($scope.user)
            .then(response => {
                // Ambil token dari respons
                const token = response.data.token;
                if (token) {
                    alert('Login successful');
                    localStorage.setItem('token', token); // Simpan token di localStorage
                    window.location.href = './views/home.html'; // Redirect ke home
                } else {
                    alert('Token not found in response');
                }
            })
            .catch(err => {
                console.error('Login error:', err);
                alert(err.data.message || 'Error during login');
            });
    };
});
