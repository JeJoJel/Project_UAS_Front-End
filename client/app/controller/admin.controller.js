var app = angular.module('myApp', []);

app.controller("AdminController", function($scope, $http, ArticleService, EventService) {
    $scope.currentTab = 'articles';
    $scope.articles = [];
    $scope.events = [];
    $scope.showForm = false;
    $scope.editing = false;
    $scope.formData = {};
    $scope.successMessage = '';

    // Open the form to add a new article
    $scope.openArticleForm = function() {
        $scope.formData = {};
        $scope.editing = false; 
        $scope.showForm = true; 
    };
    
    // Open the form to add a new event
    $scope.openEventForm = function() {
        $scope.formData = {};
        $scope.editing = false; 
        $scope.showForm = true; 
    };

    // Load all articles
    $scope.loadArticles = function() {
        $scope.currentTab = 'articles';
        ArticleService.getAll().then(response => {
            console.log(response.data);  
            $scope.articles = response.data;
        }).catch(error => {
            console.error('Error loading articles:', error);
        });
    };

    // Load all events
    $scope.loadEvents = function() {
        $scope.currentTab = 'events';
        EventService.getAll().then(response => {
            console.log(response.data);
            $scope.events = response.data.events;
        }).catch(error => {
            console.error('Error loading events:', error);
        });
    };

    // Image upload function (for articles)
    $scope.uploadImage = function() {
        var imageUrl = $scope.formData.imageUrl;
        if (imageUrl) {
            $scope.formData.imageUrl = imageUrl; 
            console.log('Image URL:', imageUrl);
        } else {
            console.error('Please provide a valid image URL');
        }
    };

    // Save the form (either article or event)
    $scope.saveForm = function() {
        if ($scope.currentTab === 'articles') {
            if ($scope.editing && !$scope.formData._id) {
                console.error('Missing article ID for update');
                return;
            }
            if ($scope.editing) {
                ArticleService.update($scope.formData._id, $scope.formData)
                    .then(() => {
                        $scope.loadArticles();
                        alert('Article updated successfully');
                    })
                    .catch(error => {
                        console.error('Error updating article:', error);
                        alert('Failed to update article.');
                    });
            } else {
                ArticleService.create($scope.formData)
                    .then(() => {
                        $scope.loadArticles();
                        alert('Article added successfully');
                    })
                    .catch(error => {
                        console.error('Error adding article:', error);
                        alert('Failed to add article.');
                    });
            }
        } else if ($scope.currentTab === 'events') {
            if ($scope.editing && !$scope.formData._id) {
                console.error('Missing event ID for update');
                return;
            }
            if ($scope.editing) {
                EventService.update($scope.formData._id, $scope.formData)
                    .then(() => {
                        $scope.loadEvents();
                        alert('Event updated successfully');
                    })
                    .catch(error => {
                        console.error('Error updating event:', error);
                        alert('Failed to update event.');
                    });
            } else {
                EventService.create($scope.formData)
                    .then(() => {
                        $scope.loadEvents();
                        alert('Event added successfully');
                    })
                    .catch(error => {
                        console.error('Error adding event:', error);
                        alert('Failed to add event.');
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

    // Update article
    $scope.updateArticle = function(article) {
        if (!article._id) {
            console.error('No ID found in article');
            return;
        }

        ArticleService.update(article._id, article).then(function(response) {
            console.log('Article updated successfully:', response.data);
        }).catch(function(error) {
            console.error('Error updating article:', error);
        });
    };
    
    // Update event
    $scope.updateEvent = function(event) {
        if (!event._id) {
            console.error('No ID found in event');
            return;
        }

        EventService.update(event._id, event).then(function(response) {
            console.log('Event updated successfully:', response.data.events);
        }).catch(function(error) {
            console.error('Error updating event:', error);
        });
    };

    // Close the form
    $scope.closeForm = function() {
        $scope.showForm = false;
    };

    // Delete an article
    $scope.deleteArticle = function(articleId) {
    if (!articleId) {
        console.error('Invalid article ID');
        return;
    }
    
    // Show confirmation dialog
    var confirmDelete = confirm('Are you sure you want to delete this article?');

    if (confirmDelete) {
        console.log('Deleting article with ID:', articleId);
        $http.delete(`http://localhost:3000/api/articles/${articleId}`)
            .then(response => {
                console.log('Article deleted:', response.data);
                $scope.loadArticles();  
            })
            .catch(error => {
                console.error('Error deleting article:', error);
            });
    } else {
        console.log('Article deletion was canceled');
    }
};

    // Delete an event
    $scope.deleteEvent = function(eventId) {
        if (!eventId) {
            console.error('Invalid Evnt ID');
            return;
        }
        
        // Show confirmation dialog
        var confirmDelete = confirm('Are you sure you want to delete this event?');
    
        if (confirmDelete) {
            console.log('Deleting article with ID:', eventId);
            $http.delete(`http://localhost:3000/api/events/${eventId}`)
                .then(response => {
                    console.log('Event deleted:', response.data.events);
                    $scope.loadEvents();  
                })
                .catch(error => {
                    console.error('Error deleting events:', error);
                });
        } else {
            console.log('Event deletion was canceled');
        }
    };

    // Load articles and events when the controller is initialized
    $scope.loadArticles();
    $scope.loadEvents();
});
