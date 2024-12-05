angular.module('profileApp')
app.service('ProfileService', function($http) {
    const baseUrl = '/api/user'; // URL untuk mengakses API user
    
    // Mendapatkan data pengguna dari server
    this.getUserDetails = function() {
        return $http.get(baseUrl); // Ambil data pengguna yang sudah login
    };

    // Memperbarui data pengguna
    this.updateUserDetails = function(userDetails) {
        return $http.put(baseUrl, userDetails); // Kirim data pengguna yang diperbarui ke server
    };
});