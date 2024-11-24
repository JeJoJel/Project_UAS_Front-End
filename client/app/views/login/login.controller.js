app.controller('LoginController', function($scope, AuthService, $location) {
    $scope.user = {}; // Bind form data to this object

    $scope.login = function() {
        AuthService.login($scope.user)
            .then(response => {
                alert('Login successful');
                const token = response.data.token;
                // Save the token in localStorage or cookies
                localStorage.setItem('token', token);
                $location.path('/'); // Redirect to the homepage or dashboard
            })
            .catch(err => {
                alert(err.data.message || 'Error during login');
            });
    };
});
