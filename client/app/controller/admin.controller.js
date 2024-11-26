var app = angular.module('myApp');

app.controller("AdminController", function($scope, ArticleService, EventService) {
    $scope.currentTab = 'articles';
    $scope.articles = [];
    $scope.events = [];
    $scope.showForm = false;
    $scope.editing = false;
    $scope.formData = {};

    $scope.loadArticles = function() {
        $scope.currentTab = 'articles';
        ArticleService.getAll().then(response => {
            $scope.articles = response.data;
        });
    };

    $scope.loadEvents = function() {
        $scope.currentTab = 'events';
        EventService.getAll().then(response => {
            $scope.events = response.data;
        });
    };

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

    $scope.saveForm = function() {
        if ($scope.currentTab === 'articles') {
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

    $scope.closeForm = function() {
        $scope.showForm = false;
    };

    $scope.deleteArticle = function(id) {
        ArticleService.delete(id).then(() => $scope.loadArticles());
    };

    $scope.deleteEvent = function(id) {
        EventService.delete(id).then(() => $scope.loadEvents());
    };
});
