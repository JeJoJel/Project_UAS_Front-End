var app = angular.module('myApp');

app.controller("AdminController", function($scope, ArticleService, EventService, $http) {
    $scope.currentTab = 'articles';
    $scope.articles = [];
    $scope.events = [];
    $scope.showForm = false;
    $scope.editing = false;
    $scope.formData = {};

    // Ambil token dan role dari localStorage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Validasi akses
    if (!token) {
        // Jika tidak ada token, pengguna belum login
        alert("Access Denied: Please log in.");
        window.location.href = '../../index.html'; // Redirect ke halaman login
        return;
    } else if (role !== 'admin') {
        // Jika bukan admin, redirect ke home
        alert("Access Denied: Admins only.");
        window.location.href = '/client/app/views/home.html'; // Redirect ke halaman home
        return;
    }

    // Logout function
    $scope.logout = function () {
        // Hapus token dan informasi role
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '../../index.html';
    };

    // Load articles
    $scope.loadArticles = function() {
        $scope.currentTab = 'articles';
        ArticleService.getAll().then(response => {
            $scope.articles = response.data;
        }).catch(err => {
            console.error("Error loading articles:", err);
            alert("Failed to load articles.");
        });
    };

    // Load events
    $scope.loadEvents = function() {
        $scope.currentTab = 'events';
        EventService.getAll().then(response => {
            $scope.events = response.data;
        }).catch(err => {
            console.error("Error loading events:", err);
            alert("Failed to load events.");
        });
    };

    // Open form
    $scope.openArticleForm = function() {
        $scope.formData = {};
        $scope.showForm = true;
        $scope.editing = false;
    };

    $scope.openEventForm = function() {
        $scope.formData = {};
        $scope.showForm = true;
        $scope.editing = false;
    };

    // Save form
    $scope.saveForm = function() {
        if ($scope.currentTab === 'articles') {
            if ($scope.editing) {
                ArticleService.update($scope.formData.id, $scope.formData).then(() => {
                    $scope.loadArticles();
                }).catch(err => {
                    console.error("Error updating article:", err);
                    alert("Failed to update article.");
                });
            } else {
                ArticleService.create($scope.formData).then(() => {
                    $scope.loadArticles();
                }).catch(err => {
                    console.error("Error creating article:", err);
                    alert("Failed to create article.");
                });
            }
        } else if ($scope.currentTab === 'events') {
            if ($scope.editing) {
                EventService.update($scope.formData.id, $scope.formData).then(() => {
                    $scope.loadEvents();
                }).catch(err => {
                    console.error("Error updating event:", err);
                    alert("Failed to update event.");
                });
            } else {
                EventService.create($scope.formData).then(() => {
                    $scope.loadEvents();
                }).catch(err => {
                    console.error("Error creating event:", err);
                    alert("Failed to create event.");
                });
            }
        }
        $scope.showForm = false;
    };

    // Close form
    $scope.closeForm = function() {
        $scope.showForm = false;
    };

    // Delete article
    $scope.deleteArticle = function(id) {
        ArticleService.delete(id).then(() => {
            $scope.loadArticles();
        }).catch(err => {
            console.error("Error deleting article:", err);
            alert("Failed to delete article.");
        });
    };

    // Delete event
    $scope.deleteEvent = function(id) {
        EventService.delete(id).then(() => {
            $scope.loadEvents();
        }).catch(err => {
            console.error("Error deleting event:", err);
            alert("Failed to delete event.");
        });
    };
});