const app = angular.module('styleApp', []);

app.controller('StyleController', ['$scope', function($scope) {
  $scope.featurePosts = [
    { link: "blog_style.html", img: "../asset/style/style3.jpg", alt: "How To Tie Dye", caption: "How To Tie Dye" },
    { link: "blog_style.html", img: "../asset/style/style5.jpg", alt: "Clay Bead Braceletes", caption: "Clay Bead Braceletes" },
    { link: "blog_style.html", img: "../asset/style/style7.jpg", alt: "Ombre Heart Mani", caption: "Ombre Heart Mani" },
    { link: "blog_style.html", img: "../asset/style/style10.jpg", alt: "How To Hem Your Jeans", caption: "How To Hem Your Jeans" },
    { link: "blog_style.html", img: "../asset/style/style15.jpg", alt: "Classic Valentine's Look", caption: "Classic Valentine's Look" }
];

$scope.cards = [
    { link: "blog6.html", img: "../asset/style/style1.jpg", alt: "How To Modify A Crochet Cardigan", title: "How To Modify A Crochet Cardigan" },
    { link: "blog5.html", img: "../asset/style/style2.jpg", alt: "How To Style A Simpe Dutch Braid", title: "How To Style A Simpe Dutch Braid" },
    { link: "blog_style.html", img: "../asset/style/style3.jpg", alt: "How To Tie Dye", title: "How To Tie Dye" },
    { link: "blog_style.html", img: "../asset/style/style4.jpg", alt: "How To Make Friendship Bracelets", title: "How To Make Friendship Bracelets" },
    { link: "blog_style.html", img: "../asset/style/style5.jpg", alt: "Clay Bead Braceletes", title: "Clay Bead Braceletes" },
    { link: "blog_style.html", img: "../asset/style/style6.jpg", alt: "Make Your Own Daisy Earrings", title: "Make Your Own Daisy Earrings" },
    { link: "blog_style.html", img: "../asset/style/style7.jpg", alt: "Ombre Heart Mani", title: "Ombre Heart Mani" },
    { link: "blog_style.html", img: "../asset/style/style8.jpg", alt: "Simple Macrame Handbag Tutorial", title: "Simple Macrame Handbag Tutorial" },
    { link: "blog_style.html", img: "../asset/style/style9.jpg", alt: "How To Remove Eyelash Extensions", title: "How To Remove Eyelash Extensions" },
    { link: "blog_style.html", img: "../asset/style/style10.jpg", alt: "How To Hem Your Jeans", title: "How To Hem Your Jeans" },
    { link: "blog_style.html", img: "../asset/style/style11.jpg", alt: "How To Shampoo Your Hair Like A Pro", title: "How To Shampoo Your Hair Like A Pro" },
    { link: "blog_style.html", img: "../asset/style/style12.jpg", alt: "How To Clean Makeup Brushes", title: "How To Clean Makeup Brushes" },
    { link: "blog_style.html", img: "../asset/style/style13.jpg", alt: "How To Care For Leather Shoes", title: "How To Care For Leather Shoes" },
    { link: "blog_style.html", img: "../asset/style/style14.jpg", alt: "How To Shop Vintage You'll Really Wear", title: "How To Shop Vintage You'll Really Wear" },
    { link: "blog_style.html", img: "../asset/style/style15.jpg", alt: "Classic Valentine's Look", title: "Classic Valentine's Look" },
    { link: "blog_style.html", img: "../asset/style/style16.jpg", alt: "Turn A Flannel Shirt Into Dress", title: "Turn A Flannel Shirt Into Dress" }
];


    $scope.filteredCards = [...$scope.cards];
    $scope.currentPage = 1;
    $scope.cardsPerPage = 8;

    $scope.searchTerm = '';
    $scope.totalPages = Math.ceil($scope.filteredCards.length / $scope.cardsPerPage);

    $scope.showPage = function(page) {
        const start = (page - 1) * $scope.cardsPerPage;
        const end = start + $scope.cardsPerPage;
        $scope.visibleCards = $scope.filteredCards.slice(start, end);
    };

    $scope.searchCards = function() {
        const term = $scope.searchTerm.toLowerCase();
        $scope.filteredCards = $scope.cards.filter(card => card.title.toLowerCase().includes(term));
        $scope.currentPage = 1;
        $scope.totalPages = Math.ceil($scope.filteredCards.length / $scope.cardsPerPage);
        $scope.showPage($scope.currentPage);
    };

    $scope.checkEnter = function(event) {
        if (event.key === 'Enter') {
            $scope.searchCards();
        }
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.totalPages) {
            $scope.currentPage++;
            $scope.showPage($scope.currentPage);
        }
    };

    $scope.prevPage = function() {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.showPage($scope.currentPage);
        }
    };

    $scope.showPage($scope.currentPage);
}]);
