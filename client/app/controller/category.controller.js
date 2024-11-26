const app = angular.module('categoryApp', []);

app.service('CategoryService', function () {
    this.getCategories = function () {
        return [
            { title: 'Home Decor', description: 'DIY ideas for decorating your home.', img: '../asset/diy/home_decor.jpg', alt: 'Home Decor', link: 'home_decor.html' },
            { title: 'Garden Projects', description: 'Creative outdoor projects.', img: '../asset/diy/garden.jpg', alt: 'Garden Projects', link: 'garden_projects.html' },
            { title: 'Fashion', description: 'Upcycle your old clothes.', img: '../asset/diy/fashion.jpg', alt: 'Fashion', link: 'fashion.html' },
            { title: 'Fashion', description: 'Upcycle your old clothes.', img: '../asset/diy/fashion.jpg', alt: 'Fashion', link: 'fashion.html' },
        ];
    };
});

app.controller('CategoryController', ['$scope', 'CategoryService', function ($scope, CategoryService) {
    $scope.featurePosts = [
        { img: '../asset/diy/furniture.jpg', alt: 'DIY Furniture Ideas', caption: 'DIY Furniture Ideas' },
        { img: '../asset/diy/wall_art.jpg', alt: 'Creative Wall Art', caption: 'Creative Wall Art' },
        { img: '../asset/diy/eco_friendly.jpg', alt: 'Eco-Friendly Projects', caption: 'Eco-Friendly Projects' },
        { img: '../asset/diy/organization.jpg', alt: 'Organization Hacks', caption: 'Organization Hacks' },
        { img: '../asset/diy/upcycling.jpg', alt: 'Upcycling Ideas', caption: 'Upcycling Ideas' }
    ];

    $scope.cards = CategoryService.getCategories();

    $scope.itemsPerPage = 6;
    $scope.currentPage = 1;
    $scope.totalPages = Math.ceil($scope.cards.length / $scope.itemsPerPage);

    $scope.getVisibleCards = function () {
        const startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
        const endIndex = startIndex + $scope.itemsPerPage;
        return $scope.filteredCards.slice(startIndex, endIndex);
    };

    $scope.filteredCards = [...$scope.cards];
    $scope.visibleCards = $scope.getVisibleCards();

    $scope.searchTerm = '';
    $scope.searchCards = function () {
        const searchTermLower = $scope.searchTerm.toLowerCase();
        $scope.filteredCards = $scope.cards.filter(card => card.title.toLowerCase().includes(searchTermLower));
        $scope.currentPage = 1;
        $scope.totalPages = Math.ceil($scope.filteredCards.length / $scope.itemsPerPage);
        $scope.visibleCards = $scope.getVisibleCards();
    };

    $scope.checkEnter = function (event) {
        if (event.key === 'Enter') {
            $scope.searchCards();
        }
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.visibleCards = $scope.getVisibleCards();
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.totalPages) {
            $scope.currentPage++;
            $scope.visibleCards = $scope.getVisibleCards();
        }
    };

    $scope.visibleCards = $scope.getVisibleCards();
}]);
