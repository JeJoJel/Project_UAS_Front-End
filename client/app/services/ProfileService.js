angular.module('myApp')
app.service('ProfileService', function($http) {
    const baseUrl = 'http://localhost:3000/api/user/get'; // URL untuk mengakses API user
    
    // Mendapatkan data pengguna dari server
    this.getUserDetails = function() {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage

        // Kirim request ke backend dengan token di header Authorization
        return $http.get('http://localhost:3000/api/user/get', {
            headers: {
                'Authorization': 'Bearer ' + token  // Menyertakan token dalam header
            }
        });
    };

    // Fungsi untuk memperbarui data user di backend
    this.updateUserDetails = function(userDetails) {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage

        // Kirim request untuk update data user dengan token di header Authorization
        return $http.put('http://localhost:3000/api/user/get', userDetails, {
            headers: {
                'Authorization': 'Bearer ' + token  // Menyertakan token dalam header
            }
        });
    };

    this.updatePassword = function(oldPassword, newPassword, token) {
        return $http.put(`http://localhost:3000/api/user/ganti-password`, {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Mengirimkan token di header untuk otentikasi
            }
        });
    };
});