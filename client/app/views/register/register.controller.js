app.controller('RegisterController', function($scope, AuthService, $location) {
    $scope.user = {}; // Bind form data to this object

    $scope.register = function() {
        if ($scope.user.password !== $scope.user.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        AuthService.register($scope.user)
            .then(() => {
                alert('Registration successful');
                $location.path('../login/login.html'); 
            })
            .catch(err => {
                alert(err.data.message || 'Error during registration');
            }); 
    };
});
