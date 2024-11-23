const app = angular.module('recipesApp', []);

app.controller('RecipesController', ['$scope', function($scope) {
  $scope.featurePosts = [
      { img: "../asset/recipe/recipe4.jpg", alt: "Air Fryer Salmon", caption: "Air Fryer Salmon", link: "blog_recipe.html" },
      { img: "../asset/recipe/recipe8.jpg", alt: "Brandy Alexander", caption: "Brandy Alexander", link: "blog_recipe.html" },
      { img: "../asset/recipe/recipe10.jpg", alt: "Dumpling Sauce", caption: "Dumpling Sauce", link: "blog_recipe.html" },
      { img: "../asset/recipe/recipe12.jpg", alt: "Tomato Burrata", caption: "Tomato Burrata", link: "blog_recipe.html" },
      { img: "../asset/recipe/recipe15.jpg", alt: "Enoki Mushrooms", caption: "Enoki Mushrooms", link: "blog_recipe.html" }
  ];

  $scope.cards = [
      { link: "blog3.html", img: "../asset/recipe/recipe1.jpg", alt: "Overnight Baked Blueberry Muffin Oatmeal", title: "Overnight Baked Blueberry Muffin Oatmeal" },
      { link: "blog4.html", img: "../asset/recipe/recipe2.jpg", alt: "Pumpkin Cheesecake", title: "Pumpkin Cheesecake" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe3.jpg", alt: "Alfredo Sauce", title: "Alfredo Sauce" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe4.jpg", alt: "Air Fryer Salmon", title: "Air Fryer Salmon" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe5.jpg", alt: "Pumpkin Juice", title: "Pumpkin Juice" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe6.jpg", alt: "Caprese Skewers", title: "Caprese Skewers" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe7.jpg", alt: "Old Fashioned Cocktail", title: "Old Fashioned Cocktail" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe8.jpg", alt: "Brandy Alexander", title: "Brandy Alexander" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe9.jpg", alt: "Pizza Bagels", title: "Pizza Bagels" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe10.jpg", alt: "Dumpling Sauce", title: "Dumpling Sauce" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe11.jpg", alt: "Lactation Cookies", title: "Lactation Cookies" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe12.jpg", alt: "Tomato Burrata", title: "Tomato Burrata" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe13.jpg", alt: "Pimm's Cup", title: "Pimm's Cup" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe14.jpg", alt: "Mango Salsa", title: "Mango Salsa" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe15.jpg", alt: "DIY Pumpkin Stands", title: "DIY Pumpkin Stands" },
      { link: "blog_recipe.html", img: "../asset/recipe/recipe16.jpg", alt: "Divided Built In Closet DIY", title: "Divided Built In Closet DIY" },
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
