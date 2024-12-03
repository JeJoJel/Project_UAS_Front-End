app.controller('CategoryController', function ($scope, CategoryService) {
    $scope.articles = [];
    $scope.filteredCards = [];
    $scope.visibleCards = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 3;
    $scope.totalPages = 0;
    $scope.selectedArticle = null; // To hold the clicked article's data

    // Load articles and extract necessary fields
    $scope.loadArticles = function () {
        CategoryService.getAll().then(response => {
            console.log("Response data:", response.data); // Log to ensure data is received
            
            // Ensure the correct fields are present in your response
            $scope.articles = response.data.map(article => ({
                title: article.title,
                category: article.category,
                author: article.author,
                content: article.content, 
                link: article.link,
                img: article.img,
                alt: article.alt
            }));

            // Initialize pagination
            $scope.filteredCards = $scope.articles;
            $scope.totalPages = Math.ceil($scope.filteredCards.length / $scope.itemsPerPage);
            $scope.updateVisibleCards();
        }).catch(error => {
            console.error('Error fetching articles:', error);
        });
    };

    // Update visible articles for the current page
    $scope.updateVisibleCards = function () {
        const start = ($scope.currentPage - 1) * $scope.itemsPerPage;
        $scope.visibleCards = $scope.filteredCards.slice(start, start + $scope.itemsPerPage);
    };

    // Show selected article content in the modal
    $scope.showArticleContent = function(article) {
        $scope.selectedArticle = article;
        // Show the modal (You can control visibility with ng-show or ng-if)
        document.getElementById("articleModal").style.display = "block";
    };

    // Hide the modal
    $scope.closeModal = function() {
        document.getElementById("articleModal").style.display = "none";
    };

    // Pagination functions
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

    // Call this on page load
    $scope.loadArticles();
});
