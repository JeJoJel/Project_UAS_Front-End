var app = angular.module('myApp'); 

app.service("ArticleService", function($http) {
    const apiUrl = "http://localhost:3000/api/articles";

    this.getAll = function() {
        return $http.get(apiUrl);
    };

    this.getById = function(id) {
        return $http.get(`${apiUrl}/${id}`);
    };

    this.create = function(articles) {
        return $http.post(apiUrl, articles);
    };

    this.update = function(id, article) {
        return $http.put(`${apiUrl}/${id}`, article);
    };    
    
    this.delete = function(id) {
        return $http.delete(`${apiUrl}/${id}`);
    };
});
