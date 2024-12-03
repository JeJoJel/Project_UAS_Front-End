var app = angular.module('myApp', []);

app.controller("AdminController", function($scope, $http, ArticleService, EventService) {
    $scope.currentTab = 'articles';
    $scope.articles = [];
    $scope.events = [];
    $scope.showForm = false;
    $scope.editing = false;
    $scope.formData = {};
    $scope.successMessage = '';

    // Load articles
    $scope.loadArticles = function() {
        $scope.currentTab = 'articles';
        ArticleService.getAll().then(response => {
            console.log(response.data);  // Log to check if data is received
            $scope.articles = response.data; // Store data in scope
        }).catch(error => {
            console.error('Error loading articles:', error); 
        });
    };

    // Load events
    $scope.loadEvents = function() {
        $scope.currentTab = 'events';
        EventService.getAll().then(response => {
            console.log(response.data); // Log to check if data is received
            $scope.events = response.data.events; // Store data in scope
        }).catch(error => {
            console.error('Error loading events:', error); 
        });
    };

    // Open form for creating or editing articles
    $scope.openArticleForm = function() {
        $scope.formData = {};
        $scope.showForm = true;
        $scope.editing = false;
    };

    // Open form for creating or editing events
    $scope.openEventForm = function() {
        $scope.formData = {}; 
        $scope.showForm = true; 
        $scope.editing = false; 
    };

    // Image upload function
    $scope.uploadImage = function() {
        var file = $scope.formData.image;
        if (file) {
            var formData = new FormData();
            formData.append('image', file);

            // Upload the image to the server
            $http.post('/api/upload-image', formData, {
                headers: { 'Content-Type': undefined }
            }).then(function(response) {
                // Assuming the response contains the URL of the uploaded image
                $scope.formData.imageUrl = response.data.imageUrl;
                console.log('Image uploaded successfully: ', response.data.imageUrl);
            }).catch(function(error) {
                console.error('Error uploading image:', error);
            });
        }
    };

    // Save article or event
    $scope.saveForm = function() {
        if ($scope.currentTab === 'articles') {
            if (!$scope.formData.author) {
                alert('Author is required!');
                return;
            }

            // For editing an article
            if ($scope.editing) {
                ArticleService.update($scope.formData.id, $scope.formData).then(() => {
                    $scope.loadArticles();
                    alert('Article updated successfully');
                });
            } else {
                // For adding a new article
                ArticleService.create($scope.formData)
                    .then(() => {
                        $scope.loadArticles(); 
                        alert('Article added successfully');
                    })
                    .catch(error => {
                        console.error('Error adding Article:', error);
                        alert('Failed to add Article. Please try again.');
                    });
            }
        } else if ($scope.currentTab === 'events') {
            if ($scope.editing) {
                EventService.update($scope.formData.id, $scope.formData)
                    .then(() => {
                        $scope.loadEvents(); 
                        alert('Event updated successfully');
                    })
                    .catch(error => {
                        console.error('Error updating event:', error);
                        alert('Failed to update event. Please try again.');
                    });
            } else {
                EventService.create($scope.formData)
                    .then(() => {
                        $scope.loadEvents(); 
                        alert('Event added successfully');
                    })
                    .catch(error => {
                        console.error('Error adding event:', error);
                        alert('Failed to add event. Please try again.');
                    });
            }
        }
        $scope.showForm = false;
    };

    // Edit an article
    $scope.editArticle = function(article) {
        $scope.formData = angular.copy(article);
        $scope.showForm = true;
        $scope.editing = true;
    };

    // Edit an event
    $scope.editEvent = function(event) {
        $scope.formData = angular.copy(event);
        $scope.showForm = true;
        $scope.editing = true;
    };

    // Close the form
    $scope.closeForm = function() {
        $scope.showForm = false;
    };

    // Delete an article
    $scope.deleteArticle = function(id) {
        console.log('Article ID to delete:', id);
        if (confirm('Are you sure you want to delete this article?')) {
            ArticleService.delete(id)
                .then(() => {
                    $scope.loadArticles();
                    alert('Article deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting article:', error);
                    alert('Failed to delete article. Please try again.');
                });
        }
    };

    // Delete an event
    $scope.deleteEvent = function(id) {
        console.log('Event ID to delete:', id);
        if (confirm('Are you sure you want to delete this event?')) {
            EventService.delete(id)
                .then(() => {
                    $scope.loadEvents();
                    alert('Event deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting event:', error);
                    alert('Failed to delete event. Please try again.');
                });
        }
    };

    // Logout function
    $scope.logout = function() {
        localStorage.removeItem('token');
        window.location.href = '../../index.html';
    };

    console.log($scope.formData);  
    console.log($scope.articles);
    console.log($scope.events);

    $scope.loadArticles();
    $scope.loadEvents();
});
