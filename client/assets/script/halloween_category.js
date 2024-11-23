const app = angular.module('halloweenApp', []);

app.controller('HalloweenController', ['$scope', function($scope) {
    $scope.featurePosts = [
        { img: "../asset/halloween/hal1.jpg", alt: "Halloween Cupcakes", caption: "Halloween Cupcakes" },
        { img: "../asset/halloween/hal3.jpg", alt: "Beetlejuice! Costume", caption: "Beetlejuice! Costume" },
        { img: "../asset/halloween/hal7.jpg", alt: "Our Spooky Village", caption: "Our Spooky Village" },
        { img: "../asset/halloween/hal9.jpg", alt: "Spooky Eyeball Jello Shots!", caption: "Spooky Eyeball Jello Shots!" },
        { img: "../asset/halloween/hal12.jpg", alt: "Halloween Cake Pops", caption: "Halloween Cake Pops" }
    ];

    $scope.cards = [
      { link: "blog7.html", img: "../asset/halloween/hal1.jpg", alt: "Halloween Cupcakes", title: "Halloween Cupcakes" },
      { link: "blog8.html", img: "../asset/halloween/hal2.jpg", alt: "No-Carve (Tattoo) Pumpkin Decor", title: "No-Carve (Tattoo) Pumpkin Decor" },
      { link: "blog_style.html", img: "../asset/halloween/hal3.jpg", alt: "Beetlejuice! Costume", title: "Beetlejuice! Costume" },
      { link: "blog_style.html", img: "../asset/halloween/hal4.jpg", alt: "DIY Candy Corn Garland", title: "DIY Candy Corn Garland" },
      { link: "blog_style.html", img: "../asset/halloween/hal5.jpg", alt: "Easy DIY Fabric Pumpkins", title: "Easy DIY Fabric Pumpkins" },
      { link: "blog_style.html", img: "../asset/halloween/hal6.jpg", alt: "5 Ways to Decorate with Skeletons", title: "5 Ways to Decorate with Skeletons" },
      { link: "blog_style.html", img: "../asset/halloween/hal7.jpg", alt: "Our Spooky Village", title: "Our Spooky Village" },
      { link: "blog_style.html", img: "../asset/halloween/hal8.jpg", alt: "DIY Full Moon Photo Backdrop", title: "DIY Full Moon Photo Backdrop" },
      { link: "blog_style.html", img: "../asset/halloween/hal9.jpg", alt: "Spooky Eyeball Jello Shots!", title: "Spooky Eyeball Jello Shots!" },
      { link: "blog_style.html", img: "../asset/halloween/hal10.jpg", alt: "Glass Bead Jack-O-Lanterns", title: "Glass Bead Jack-O-Lanterns" },
      { link: "blog_style.html", img: "../asset/halloween/hal11.jpg", alt: "Pumpkin Spice Syrup Recipe", title: "Pumpkin Spice Syrup Recipe" },
      { link: "blog_style.html", img: "../asset/halloween/hal12.jpg", alt: "Halloween Cake Pops", title: "Halloween Cake Pops" },
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
