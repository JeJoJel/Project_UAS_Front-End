var app = angular.module('myApp');

app.controller("AdminController", function($scope, ArticleService, EventService) {
    $scope.currentTab = 'articles';
    $scope.articles = [];
    $scope.events = [];
    $scope.showForm = false;
    $scope.editing = false;
    $scope.formData = {};

    // Load articles
    $scope.loadArticles = function() {
        $scope.currentTab = 'articles';
        ArticleService.getAll().then(response => {
            $scope.articles = response.data;
        });
    };

    // Load events
    $scope.loadEvents = function() {
        $scope.currentTab = 'events';
        EventService.getAll().then(response => {
            $scope.events = response.data;
        });
    };

    // Open form
    $scope.openArticleForm = function() {
        $scope.formData = {};
        $scope.showForm = true;
        $scope.editing = false;
    };

    $scope.openEventForm = function() {
        $scope.formData = {}; // Clear form data
        $scope.showForm = true; // Show modal
        $scope.editing = false; // Set editing mode to false
    };
    
    // Save form
    $scope.saveForm = function() {
        if ($scope.currentTab === 'articles') {
            if ($scope.editing) {
                ArticleService.update($scope.formData.id, $scope.formData);
            } else {
                // Post the new article to the backend
                $http.post('http://localhost:3000/api/articles', $scope.formData)
                    .then(response => {
                        console.log('Article posted successfully:', response);
                        $scope.loadArticles();
                    })
                    .catch(error => {
                        console.error('Error posting article:', error);
                    });
            }
        } else if ($scope.currentTab === 'events') {
            if ($scope.editing) {
                EventService.update($scope.formData.id, $scope.formData);
            } else {
                // Post the new event to the backend
                $http.post('http://localhost:3000/api/events', $scope.formData)
                    .then(response => {
                        console.log('Event posted successfully:', response);
                        $scope.loadEvents();
                    })
                    .catch(error => {
                        console.error('Error posting event:', error);
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
        ArticleService.delete(id).then(() => $scope.loadArticles());
    };

    // Delete event
    $scope.deleteEvent = function(id) {
        EventService.delete(id).then(() => $scope.loadEvents());
    };

    // **Logout Functionality**
    $scope.logout = function() {
        // Hapus token dari localStorage
        localStorage.removeItem('token');
        // Arahkan ke halaman login
        window.location.href = '../../index.html';
    };
});
