var app = angular.module('myApp');

app.controller('CreateArticleController', ['$scope', '$window', 'ArticleService', function ($scope, $window, ArticleService) {
    // Mengaktifkan style untuk halaman Admin, menonaktifkan lainnya
    document.getElementById('admin').disabled = true;
    document.getElementById('register').disabled = true;
    document.getElementById('home').disabled = true;
    document.getElementById('profile').disabled = true;
    document.getElementById('create').disabled = false;

    $scope.article = {
        title: "",
        author: "",
        image: "",
        contentHTML: "" 
    };

    // Save the article to the server
    $scope.saveArticle = function () {
        if (!$scope.article.title || !$scope.article.author) {
            alert("Please complete all fields.");
            return;
        }

        const articleData = {
            title: $scope.article.title.trim(),
            author: $scope.article.author.trim(),
            image: $scope.article.image.trim(),
            content: document.getElementById('editor').innerHTML.trim().split('<p>').map(p => p.replace('</p>', '').trim()).join('\n')
        };

        ArticleService.create(articleData)
            .then(() => {
                alert('Article added successfully');
                $window.location.href = '#!/admin';
            })
            .catch(error => {
                console.error('Error adding article:', error);
                alert('Failed to add article.');
            });
    };
}]);