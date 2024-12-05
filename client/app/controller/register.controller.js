var app = angular.module('myApp');

app.controller('RegisterController', function($scope, AuthService, $location) {
    $scope.title = "Register";
    $scope.user = {};

    $scope.register = function() {
        // Validasi password dan konfirmasi password
        if ($scope.user.password !== $scope.user.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Validasi form sederhana (opsional)
        if (!$scope.user.username || !$scope.user.email || !$scope.user.password) {
            alert('Please fill in all fields.');
            return;
        }

        // Panggil service untuk registrasi
        AuthService.register($scope.user)
        .then(response => {
            alert(response.data.message || 'Registration successful!');
            $location.path('/');
        })
        .catch(err => {
            const errorMessage = err.data?.error || 'Error during registration, please try again';
            alert(errorMessage);
        });
    };
});