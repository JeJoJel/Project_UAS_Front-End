app.controller('HomepageController', function($scope, AuthService, $location) {
    $scope.logout = function() {
        AuthService.logout();
        $location.path('/login');
    };
});