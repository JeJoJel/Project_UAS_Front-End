app.service('AuthService', function($http) {
    this.register = function(user) {
        return $http.post('/api/register', user); // Mengirim data ke endpoint API
    };
});
