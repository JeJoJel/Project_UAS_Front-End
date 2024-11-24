app.controller('LoginController', function($scope, AuthService, $location) {
    $scope.user = {}; // Bind form data to this object

    $scope.login = function() {
        AuthService.login($scope.user)
            .then(response => {
                alert('Login successful');
                const token = response.data.token;
                
                localStorage.setItem('token', token);
                $location.path('/'); 
            })
            .catch(err => {
                alert(err.data.message || 'Error during login');
            });
    };
});
