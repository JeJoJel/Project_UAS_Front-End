const app = angular.module('categoryApp');

app.service('CategoryService', function ($http) {
    // Fetch categories from the database
    this.getCategories = function () {
        return $http.get('/api/categories')  // Adjust the URL to your API endpoint
            .then(function (response) {
                return response.data;  // Return the list of categories
            })
            .catch(function (error) {
                console.error('Error fetching categories:', error);
                return [];  // Return an empty array in case of an error
            });
    };

    // Fetch category cards from the database (filtered by category)
    this.getCategoryCards = function (category) {
        return $http.get('/api/category-cards', { params: { category: category } })  // Adjust the URL to your API endpoint
            .then(function (response) {
                return response.data;  // Return the list of cards
            })
            .catch(function (error) {
                console.error('Error fetching category cards:', error);
                return [];  // Return an empty array in case of an error
            });
    };
});
