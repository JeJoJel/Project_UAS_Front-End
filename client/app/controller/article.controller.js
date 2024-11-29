app.controller('CreateArticleController', function($scope, ArticleService, $window) {
    // Initialize the article object bound to the form
    $scope.article = {
        title: "",
        author: "",
        category: "",
        contentHTML: "" 
    };

    // Predefined categories for the dropdown
    $scope.categories = ["Style", "DIY", "Recipes"];

    // Set the current date (ISO format) for article creation
    $scope.currentDate = new Date().toISOString().split('T')[0];

    // Function to apply rich text formatting (using execCommand)
    $scope.applyFormat = function(command) {
        document.execCommand(command, false, null); 
    };

    // Function to register (submit) the article
    $scope.saveArticle = function() {
        if (!$scope.article.title || !$scope.article.category) {
            alert("Please complete all fields.");
            return;
        }

        // Prepare the article data
        const articleData = {
            title: $scope.article.title.trim(),
            author: $scope.article.author.trim() || "Anonymous",
            category: $scope.article.category,
            date: $scope.currentDate,
            content: document.getElementById('editor').innerHTML.trim().split('<p>').map(p => p.replace('</p>', '').trim())
        };

        // Call ArticleService to save the article data
        ArticleService.saveArticle(articleData)
            .then(function(response) {
                alert("Article saved successfully!");
                $window.location.href = '/display';  // Redirect after success
            })
            .catch(function(error) {
                console.error("Error saving article:", error);
                alert("Error saving article: " + (error.data || "Unknown error"));
            });
    };
});
