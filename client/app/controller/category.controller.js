const app = angular.module('categoryApp');

app.controller('CategoryController', function ($scope, ArticleService) {
    $scope.categories = [];  
    $scope.filteredCards = [];
    $scope.visibleCards = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 3;
    $scope.totalPages = 0;

    // Load all cards initially and extract categories from articles
    $scope.loadCards = function () {
        // Fetch all articles
        ArticleService.getAll().then(response => {
            $scope.filteredCards = response.data;  // Store all articles
            
            // Extract unique categories from articles
            $scope.categories = [...new Set($scope.filteredCards.map(article => article.category))];
            
            // Update pagination
            $scope.totalPages = Math.ceil($scope.filteredCards.length / $scope.itemsPerPage);
            $scope.updateVisibleCards();
        }).catch(error => {
            console.error('Error loading articles:', error);
        });
    };

    // Update visible cards based on current page
    $scope.updateVisibleCards = function () {
        const start = ($scope.currentPage - 1) * $scope.itemsPerPage;
        $scope.visibleCards = $scope.filteredCards.slice(start, start + $scope.itemsPerPage);
    };

    // Filter articles by category
    $scope.filterByCategory = function (category) {
        $scope.filteredCards = $scope.filteredCards.filter(card => card.category === category);
        $scope.totalPages = Math.ceil($scope.filteredCards.length / $scope.itemsPerPage);
        $scope.currentPage = 1;
        $scope.updateVisibleCards();
    };

    // Pagination logic
    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.updateVisibleCards();
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.totalPages) {
            $scope.currentPage++;
            $scope.updateVisibleCards();
        }
    };

    // Search functionality
    $scope.searchCards = function () {
        $scope.filteredCards = $scope.filteredCards.filter(card => card.title.toLowerCase().includes($scope.searchTerm.toLowerCase()));
        $scope.totalPages = Math.ceil($scope.filteredCards.length / $scope.itemsPerPage);
        $scope.updateVisibleCards();
    };

    // Call this function when the page loads
    $scope.loadCards();
});
