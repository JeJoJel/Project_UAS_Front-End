var app = angular.module('myApp', []);

app.controller("HeaderController", function ($scope) {
    // Periksa apakah pengguna sudah login
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
        // Jika login, tampilkan ikon profil
        $scope.isLoggedIn = true;
        $scope.user = JSON.parse(user);
    } else {
        // Jika belum login, tampilkan tombol login
        $scope.isLoggedIn = false;
    }

    $scope.logout = function () {
        // Hapus token dan user info dari localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/client/app/views/login.html";
    };
});

app.factory('AuthInterceptor', function () {
    return {
        request: function (config) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = token;
            }
            return config;
        },
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});