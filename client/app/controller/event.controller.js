var app = angular.module('myApp', []);

// Event service to handle API requests
app.service('EventService', function($http) {
    const apiUrl = 'http://localhost:3000/api/events'; // Backend URL

    // Get all events (with pagination and search)
    this.getAll = function(page, searchQuery) {
        return $http.get(`${apiUrl}?page=${page}&search=${searchQuery}`);
    };

    // Create a new event
    this.create = function(event) {
        return $http.post(apiUrl, event);
    };
});

// Controller for the event page
app.controller('EventsController', function($scope, EventService) {
    $scope.events = [];
    $scope.currentPage = 1;
    $scope.totalPages = 1;
    $scope.searchQuery = '';

    // Function to load events based on the current page and search query
    function loadEvents() {
        EventService.getAll($scope.currentPage, $scope.searchQuery).then(function(response) {
            $scope.events = response.data.events;
            $scope.totalPages = response.data.totalPages;
        });
    }

    // Search events when the user types in the search bar
    $scope.searchEvents = function() {
        $scope.currentPage = 1;
        loadEvents();
    };

    // Go to the next page
    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.totalPages) {
            $scope.currentPage++;
            loadEvents();
        }
    };

    // Go to the previous page
    $scope.previousPage = function() {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            loadEvents();
        }
    };

    // Initial load
    loadEvents();
});
