app.controller("HeaderController", function ($scope) {
    // Periksa status login
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    $scope.isLoggedIn = !!token; // True jika token ada
    $scope.user = user ? JSON.parse(user) : null;

    $scope.logout = function () {
        // Hapus data login
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect ke login
        window.location.href = "/client/app/views/login.html";
    };
});