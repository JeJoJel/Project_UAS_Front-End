var app = angular.module('myApp', []);

app.service("CategoryService", function($http) {
    const apiUrl = "http://localhost:3000/api/articles";

    this.getAll = function() {
        return $http.get(apiUrl);
    };

    this.create = function(categories) {
        return $http.post(apiUrl, categories);
    };

    this.update = function(id, categories) {
        return $http.put(`${apiUrl}/${id}`, categories);
    };

    this.delete = function(id) {
        return $http.delete(`${apiUrl}/${id}`);
    };
});
