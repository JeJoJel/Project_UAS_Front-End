app.service('AuthService', function($http) {
    const baseUrl = 'http://localhost:3000/api/auth'; // Your backend URL

    this.register = function(user) {
        return $http.post(`${baseUrl}/register`, user); // Send data to the backend
    };
});
