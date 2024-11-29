var app = angular.module('myApp');

app.controller('FeaturedPostsController', function ($scope) {
    // Data Featured Posts
    $scope.featuredPosts = [
        {
            title: 'Halloween Cupcakes',
            image: 'assets/images/index/halloween2.webp',
            link: '#'
        },
        {
            title: 'Pumpkin Spice Syrup Recipe',
            image: 'assets/images/index/halloween1.webp',
            link: '#'
        },
        {
            title: 'Our Spooky Village',
            image: 'assets/images/index/halloween3.webp',
            link: '#'
        },
        {
            title: 'DIY Candy Corn Garland',
            image: '../asset/halloween/hal4.jpg',
            link: '#'
        }
    ];
});

app.controller('BlogPostController', function ($scope) {
    $scope.post = {
        title: 'Dog Family Costume Ideas',
        date: 'October 9 2024',
        comments: 12,
        image: '../asset/style/style18.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos saepe dolores et nostrum porro odit reprehenderit animi...'
    };
});

app.controller('PostListController', function ($scope) {
    $scope.posts = [
        {
            title: 'Caprese Skewers',
            date: 'January 20 2019',
            comments: 34,
            image: '../asset/recipe/recipe6.jpg',
            description: 'Lorem ipsum dolor sit amet...',
            link: '#'
        },
        {
            title: 'Pumpkin Cheesecake',
            date: 'January 19 2013',
            comments: 64,
            image: '../asset/recipe/recipe2.jpg',
            description: 'Lorem ipsum dolor sit amet...',
            link: 'blog4.html'
        },
        {
            title: 'Old Fashioned Cocktail',
            date: 'January 13 2015',
            comments: 64,
            image: '../asset/recipe/recipe7.jpg',
            description: 'Lorem ipsum dolor sit amet...',
            link: '#'
        },
        {
            title: 'Brandy Alexander',
            date: 'January 15 2015',
            comments: 64,
            image: '../asset/recipe/recipe8.jpg',
            description: 'Lorem ipsum dolor sit amet...',
            link: '#'
        }
    ];
});