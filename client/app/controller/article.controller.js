var app = angular.module('myApp');

app.controller('ArticleController', function ($scope, $sce, ArticleService) {
    
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('articleId');
    $scope.article = [];
    
    $scope.loadArticle = function() {
        console.log(articleId);
        ArticleService.getById(articleId).then(response => {
            console.log(response.data)
            $scope.article = response.data;
        }).catch(error => {
            console.error('Error fetching article:', error);
        });
    };

    $scope.getTrustedHtml = function(content) {
        return $sce.trustAsHtml(content);
    };

    $scope.loadArticle();

});