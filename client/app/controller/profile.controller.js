var app = angular.module('myApp');

// Controller untuk menampilkan dan mengelola data profilangular.module('profileApp', [])
app.controller('ProfileController', function($scope, ProfileService) {


    // Mengaktifkan style untuk halaman Profile, menonaktifkan lainnya
    document.getElementById('profile').disabled = false;
    document.getElementById('register').disabled = true;
    document.getElementById('home').disabled = true;
    document.getElementById('admin').disabled = true;
    document.getElementById('create').disabled = true;
    
    $scope.userDetails = {};
    $scope.isEditMode = false; // Set apakah form dalam mode edit atau tidak
    $scope.user = {
        oldPassword: '', // Menyimpan password lama
        newPassword: '' // Menyimpan password baru
    };


    // Mendapatkan data user dari server
    $scope.getUserDetails = function() {
        ProfileService.getUserDetails().then(function(response) {
            $scope.userDetails = response.data;
            $scope.currentDate = new Date().toLocaleDateString(); // Format tanggal saat ini
        }).catch(function(error) {
            console.log('Error fetching user details:', error);
        });
    };

    // Mengubah mode untuk Edit
    $scope.toggleEditMode = function() {
        $scope.isEditMode = !$scope.isEditMode; // Toggle edit mode
    };

    // Update Profile
    $scope.updateProfile = function() {
        ProfileService.updateUserDetails($scope.userDetails).then(function(response) {
            alert('Profile updated successfully!');
            $scope.isEditMode = false; // Kembali ke mode view setelah update
        }).catch(function(error) {
            console.log('Error updating profile:', error);
        });
    };

    $scope.updatePassword = function() {
        if (!$scope.user.oldPassword || !$scope.user.newPassword) {
            alert('Both old and new passwords are required.');
            return;
        }

        const token = localStorage.getItem('token'); // Ambil token JWT dari localStorage

        if (!token) {
            alert('User not logged in.');
            return;
        }

        // Kirim request untuk mengubah password
        ProfileService.updatePassword($scope.user.oldPassword, $scope.user.newPassword, token)
            .then(function(response) {
                alert('Password updated successfully!');
                $scope.user.oldPassword = ''; // Reset password lama
                $scope.user.newPassword = ''; // Reset password baru
                $scope.isEditMode = false; // Kembali ke mode view setelah update
            })
            .catch(function(error) {
                alert('Error updating password:', error);
            });
    };

    // Menarik data pengguna saat controller ini dijalankan
    $scope.getUserDetails();
});var app = angular.module('myApp');

// Controller untuk menampilkan dan mengelola data profilangular.module('profileApp', [])
app.controller('ProfileController', function($scope, ProfileService) {
    $scope.userDetails = {};
    $scope.isEditMode = false; // Set apakah form dalam mode edit atau tidak
    $scope.user = {
        oldPassword: '', // Menyimpan password lama
        newPassword: '' // Menyimpan password baru
    };


    // Mendapatkan data user dari server
    $scope.getUserDetails = function() {
        ProfileService.getUserDetails().then(function(response) {
            $scope.userDetails = response.data;
            $scope.currentDate = new Date().toLocaleDateString(); // Format tanggal saat ini
        }).catch(function(error) {
            console.log('Error fetching user details:', error);
        });
    };

    // Mengubah mode untuk Edit
    $scope.toggleEditMode = function() {
        $scope.isEditMode = !$scope.isEditMode; // Toggle edit mode
    };

    // Update Profile
    $scope.updateProfile = function() {
        ProfileService.updateUserDetails($scope.userDetails).then(function(response) {
            alert('Profile updated successfully!');
            $scope.isEditMode = false; // Kembali ke mode view setelah update
        }).catch(function(error) {
            console.log('Error updating profile:', error);
        });
    };

    $scope.updatePassword = function() {
        if (!$scope.user.oldPassword || !$scope.user.newPassword) {
            alert('Both old and new passwords are required.');
            return;
        }

        const token = localStorage.getItem('token'); // Ambil token JWT dari localStorage

        if (!token) {
            alert('User not logged in.');
            return;
        }

        // Kirim request untuk mengubah password
        ProfileService.updatePassword($scope.user.oldPassword, $scope.user.newPassword, token)
            .then(function(response) {
                alert('Password updated successfully!');
                $scope.user.oldPassword = ''; // Reset password lama
                $scope.user.newPassword = ''; // Reset password baru
                $scope.isEditMode = false; // Kembali ke mode view setelah update
            })
            .catch(function(error) {
                alert('Error updating password:', error);
            });
    };

    // Menarik data pengguna saat controller ini dijalankan
    $scope.getUserDetails();
});var app = angular.module('myApp');

// Controller untuk menampilkan dan mengelola data profilangular.module('profileApp', [])
app.controller('ProfileController', function($scope, ProfileService) {
    $scope.userDetails = {};
    $scope.isEditMode = false; // Set apakah form dalam mode edit atau tidak
    $scope.user = {
        oldPassword: '', // Menyimpan password lama
        newPassword: '' // Menyimpan password baru
    };


    // Mendapatkan data user dari server
    $scope.getUserDetails = function() {
        ProfileService.getUserDetails().then(function(response) {
            $scope.userDetails = response.data;
            $scope.currentDate = new Date().toLocaleDateString(); // Format tanggal saat ini
        }).catch(function(error) {
            console.log('Error fetching user details:', error);
        });
    };

    // Mengubah mode untuk Edit
    $scope.toggleEditMode = function() {
        $scope.isEditMode = !$scope.isEditMode; // Toggle edit mode
    };

    // Update Profile
    $scope.updateProfile = function() {
        ProfileService.updateUserDetails($scope.userDetails).then(function(response) {
            alert('Profile updated successfully!');
            $scope.isEditMode = false; // Kembali ke mode view setelah update
        }).catch(function(error) {
            console.log('Error updating profile:', error);
        });
    };

    $scope.updatePassword = function() {
        if (!$scope.user.oldPassword || !$scope.user.newPassword) {
            alert('Both old and new passwords are required.');
            return;
        }

        const token = localStorage.getItem('token'); // Ambil token JWT dari localStorage

        if (!token) {
            alert('User not logged in.');
            return;
        }

        // Kirim request untuk mengubah password
        ProfileService.updatePassword($scope.user.oldPassword, $scope.user.newPassword, token)
            .then(function(response) {
                alert('Password updated successfully!');
                $scope.user.oldPassword = ''; // Reset password lama
                $scope.user.newPassword = ''; // Reset password baru
                $scope.isEditMode = false; // Kembali ke mode view setelah update
            })
            .catch(function(error) {
                alert('Error updating password:', error);
            });
    };

    // Menarik data pengguna saat controller ini dijalankan
    $scope.getUserDetails();
});