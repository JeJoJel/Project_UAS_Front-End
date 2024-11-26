const app = angular.module('categoryApp', []);

app.service('CategoryService', function () {
    this.getCategories = function () {
        return [
            { title: 'Home Decor', description: 'DIY ideas for decorating your home.', img: 'img/home-decor.jpg', link: 'diy_home_decor.html', category: 'diy' },
            { title: 'Fashion', description: 'Stylish DIY fashion projects.', img: 'img/fashion.jpg', link: 'diy_fashion.html', category: 'style' },
            { title: 'Beauty', description: 'DIY beauty treatments and tips.', img: 'img/beauty.jpg', link: 'diy_beauty.html', category: 'diy' }
        ];
    };
    this.getCategoryCards = function (category) {
        const allCards = [
            { img: '/path/to/image1.jpg', title: 'DIY Project 1', link: '/project1', alt: 'Project 1', category: 'diy' },
            { img: '/path/to/image2.jpg', title: 'DIY Project 2', link: '/project2', alt: 'Project 2', category: 'diy' },
            { img: '/path/to/image3.jpg', title: 'Recipe 1', link: '/recipe1', alt: 'Recipe 1', category: 'recipes' },
            { img: '/path/to/image4.jpg', title: 'Recipe 2', link: '/recipe2', alt: 'Recipe 2', category: 'recipes' },
            { img: '/path/to/image5.jpg', title: 'Style Tip 1', link: '/style1', alt: 'Style 1', category: 'style' },
            { img: '/path/to/image6.jpg', title: 'Style Tip 2', link: '/style2', alt: 'Style 2', category: 'style' }
        ];

        return category ? allCards.filter(card => card.category === category) : allCards;
    };
});

app.controller('CategoryController', function ($scope, CategoryService) {
    $scope.featurePosts = CategoryService.getCategories();
    $scope.visibleCards = [];
    $scope.filteredCards = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 4;
    $scope.totalPages = 0;
    $scope.searchTerm = '';

    // Load all cards initially
    $scope.loadCards = function () {
        $scope.filteredCards = CategoryService.getCategoryCards(); // Load all categories initially
        $scope.totalPages = Math.ceil($scope.filteredCards.length / $scope.itemsPerPage);
        $scope.updateVisibleCards();
    };

    // Update visible cards based on current page
    $scope.updateVisibleCards = function () {
        const start = ($scope.currentPage - 1) * $scope.itemsPerPage;
        $scope.visibleCards = $scope.filteredCards.slice(start, start + $scope.itemsPerPage);
    };

    // Filter cards by category
    $scope.filterByCategory = function (category) {
        $scope.filteredCards = CategoryService.getCategoryCards(category);
        $scope.totalPages = Math.ceil($scope.filteredCards.length / $scope.itemsPerPage);
        $scope.currentPage = 1; // Reset to the first page
        $scope.updateVisibleCards();
    };

    // Pagination controls
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

    $scope.checkEnter = function (event) {
        if (event.keyCode === 13) {
            $scope.searchCards();
        }
    };

    // Load all cards when the page is loaded
    $scope.loadCards();
});
