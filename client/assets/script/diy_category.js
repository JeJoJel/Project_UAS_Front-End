const app = angular.module('diyApp', []);

app.controller('DiyController', ['$scope', function($scope) {
    $scope.featurePosts = [
        { img: "../asset/diy/diy12.jpg", alt: "How To Paint Leather", caption: "How To Paint Leather" },
        { img: "../asset/diy/diy9.jpg", alt: "Christmas Card Ideas", caption: "Christmas Card Ideas" },
        { img: "../asset/diy/diy2.jpg", alt: "How To Make Candles", caption: "How To Make Candles" },
        { img: "../asset/diy/diy15.jpg", alt: "DIY Pumpkin Stands", caption: "DIY Pumpkin Stands" },
        { img: "../asset/diy/diy6.jpg", alt: "PVC Wall Planter DIY", caption: "PVC Wall Planter DIY" }
    ];

    $scope.cards = [
        { link: "blog1.html", img: "../asset/diy/diy2.jpg", alt: "How To Make Candles", title: "How To Make Candles" },
        { link: "blog2.html", img: "../asset/diy/diy3.jpg", alt: "Hair Accessories Organizer DIY", title: "Hair Accessories Organizer DIY" },
        { link: "blog_diy.html", img: "../asset/diy/diy4.jpg", alt: "How We Built A Hidden Room", title: "How We Built A Hidden Room" },
        { link: "blog_diy.html", img: "../asset/diy/diy5.jpg", alt: "Resin Art", title: "Resin Art" },
        { link: "blog_diy.html", img: "../asset/diy/diy5.jpg", alt: "Resin Art", title: "Resin Art" },
        { link: "blog_diy.html", img: "../asset/diy/diy6.jpg", alt: "DIY Hanging Clothes Rail", title: "DIY Hanging Clothes Rail"},
        { link: "blog_diy.html", img: "../asset/diy/diy7.jpg", alt: "How To Clean Copper", title: "How To Clean Copper" },
        { link: "blog_diy.html", img: "../asset/diy/diy8.jpg", alt: "Easy Balloon Garland DIY", title: "Easy Balloon Garland DIY" },
        { link: "blog_diy.html", img: "../asset/diy/diy9.jpg", alt: "Christmas Card Ideas", title: "Resin Art" },
        { link: "blog_diy.html", img: "../asset/diy/diy10.jpg", alt: "15 Fall Decor DIYs", title: "Resin Art" },
        { link: "blog_diy.html", img: "../asset/diy/diy11.jpg", alt: "Homemade Bath Bombs", title: "Resin Art" },
        { link: "blog_diy.html", img: "../asset/diy/diy12.jpg", alt: "How To Paint Leather", title: "Resin Art" },
        { link: "blog_diy.html", img: "../asset/diy/diy13.jpg", alt: "Northern Popcorn Machine", title: "Resin Art" },
        { link: "blog_diy.html", img: "../asset/diy/diy14.jpg", alt: "Make Your Own Clay Ornaments", title: "Resin Art" },
        { link: "blog_diy.html", img: "../asset/diy/diy15.jpg", alt: "DIY Pumpkin Stands", title: "Resin Art" },
        { link: "blog_diy.html", img: "../asset/diy/diy16.jpg", alt: "Divided Built In Closet DIY", title: "Resin Art" },
        { link: "blog_diy.html", img: "../asset/diy/diy17.jpg", alt: "Create Your Own Cozy Fireplace", title: "Resin Art" },
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
