var app = angular.module('myApp');
app.service('ArticleService', function($http) {

    // Function to save article data (POST request)
    this.saveArticle = function(articleData) {
        return $http.post('/article', articleData);
    };

    // Function to get all articles (GET request)
    this.getArticles = function() {
        return $http.get('/getArticle');
    };
});

