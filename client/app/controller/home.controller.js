var app = angular.module('myApp');

app.controller('HeaderController', function ($scope, $location) {
    // Set halaman aktif berdasarkan URL
    $scope.$on('$routeChangeSuccess', function() {
        $scope.currentPage = $location.path().split('/')[1]; // Mengambil bagian URL setelah '/'
    });

    // Status login
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    $scope.isLoggedIn = !!token; // True jika token ada
    $scope.user = user ? JSON.parse(user) : null;

    // Fungsi pencarian
    $scope.searchQuery = "";
    $scope.search = function() {
        console.log("Searching for:", $scope.searchQuery);
        // Implementasikan pencarian berdasarkan query
    };

    // Fungsi logout
    $scope.logout = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/client/app/views/login.html";
    };
});