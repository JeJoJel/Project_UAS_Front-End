var app = angular.module('myApp');

app.controller('RegisterController', function($scope, AuthService, $location) {

    // Mengaktifkan style untuk halaman Register, menonaktifkan lainnya
    document.getElementById('register').disabled = false;
    document.getElementById('home').disabled = true;
    document.getElementById('profile').disabled = true;
    document.getElementById('admin').disabled = true;
    document.getElementById('login').disabled = true;

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
            // Berhasil
            alert(response.data.message || 'Registration successful!');
            // Alihkan ke halaman login menggunakan $location
            $location.path('/');
        })
        .catch(err => {
            // Tangani error dari backend
            const errorMessage = err.data?.error || 'Error during registration, please try again';
            alert(errorMessage); // Tampilkan pesan error
        });
    };
});
