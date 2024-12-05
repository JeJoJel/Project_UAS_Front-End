var app = angular.module('myApp');

// Controller untuk menampilkan dan mengelola data profilangular.module('profileApp', [])
app.controller('ProfileController', function($scope, ProfileService) {
    $scope.userDetails = {};
    $scope.isEditMode = false; // Set apakah form dalam mode edit atau tidak

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

    // Menarik data pengguna saat controller ini dijalankan
    $scope.getUserDetails();
});