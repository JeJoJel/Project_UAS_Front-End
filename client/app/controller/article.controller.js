const app = angular.module('ArticleApp', ['ngSanitize']);

app.controller('CreateArticleController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.article = {
        title: "",
        author: "",
        category: "",
        contentHTML: "" 
    };

    $scope.categories = ["Category 1", "Category 2", "Category 3"];

    $scope.currentDate = new Date().toISOString().split('T')[0];

    $scope.applyFormat = function (command) {
        document.execCommand(command, false, null); 
    };

    $scope.saveArticle = function () {
        if (!$scope.article.title || !$scope.article.category) {
            alert("Please complete all fields.");
            return;
        }

        const articleData = {
            title: $scope.article.title.trim(),
            author: $scope.article.author.trim() || "Anonymous",
            category: $scope.article.category,
            date: $scope.currentDate,
            content: document.getElementById('editor').innerHTML.trim().split('<p>').map(p => p.replace('</p>', '').trim())
        };

        console.log("Article Data:", articleData);

        $http.post('/article', articleData)
            .then(function (response) {
                alert("Article saved successfully!");
                $window.location.href = '/display';
            })
            .catch(function (error) {
                console.error("Error saving article:", error);
                alert("Error saving article: " + (error.data || "Unknown error"));
            });
    };
}]);

app.controller('GetArticleController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.articles = [];            
    $scope.hasArticles = false;     
    $scope.hasError = false;        
    $scope.errorMessage = "";       

    // Fetch articles from the server
    $http.get('/getArticle')
        .then(function (response) {
            const data = response.data;

            if (data && data.length > 0) {
                $scope.articles = data;
                $scope.hasArticles = true; // Set the flag if articles exist
            } else {
                $scope.hasArticles = false;
            }
        })
        .catch(function (error) {
            console.error("Error fetching articles:", error);
            $scope.hasError = true;

            // Set an appropriate error message
            if (error.status === 404) {
                $scope.errorMessage = "No articles found (404).";
            } else {
                $scope.errorMessage = `Error: ${error.statusText || 'Failed to fetch articles'}`;
            }
        });

    // Redirect to /text
    $scope.redirectToText = function () {
        $window.location.href = '/article';
    };
}]);