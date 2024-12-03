var app = angular.module('myApp');

app.controller("AdminController", function($scope, ArticleService, EventService, $http) {
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
            $scope.events = response.data.events;
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
            if (!$scope.formData.author) {
                alert('Author is required!');
                return;
            }
            if ($scope.editing) {
                ArticleService.update($scope.formData.id, $scope.formData);
            } else {
                ArticleService.create($scope.formData);
            }
        } else if ($scope.currentTab === 'events') {
            if ($scope.editing) {
                EventService.update($scope.formData.id, $scope.formData);
            } else {
                EventService.create($scope.formData);
            }
        }
        $scope.showForm = false;
        $scope.loadArticles();
        $scope.loadEvents();
    };
        
    // Close form
    $scope.closeForm = function() {
        $scope.showForm = false;
    };

    // Delete 
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

    console.log($scope.formData);  
    console.log($scope.articles);
    console.log($scope.events);
    
    $scope.loadArticles();
    $scope.loadEvents();

});