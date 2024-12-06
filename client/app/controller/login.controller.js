var app = angular.module('myApp');

app.controller('LoginController', function($scope, AuthService, $location) {

    // Mengaktifkan style untuk halaman Register, menonaktifkan lainnya
    document.getElementById('login').disabled = false;
    document.getElementById('register').disabled = true;
    document.getElementById('home').disabled = true;
    document.getElementById('profile').disabled = true;
    document.getElementById('admin').disabled = true;
    document.getElementById('create').disabled = true;

    $scope.title = "Login";

    $scope.user = {}; // Objek untuk menyimpan input user
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
                    
                    // Cek role dan redirect sesuai kondisi
                    if (role === 'admin') {
                        // Redirect ke halaman admin
                        $location.path('/admin');
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