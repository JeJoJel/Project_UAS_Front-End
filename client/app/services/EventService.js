var app = angular.module('myApp'); 

app.service("EventService", function($http) {
    const apiUrl = "http://localhost:3000/api/events";

    this.getAll = function() {
        return $http.get(apiUrl);
    };

    this.create = function(event) {
        return $http.post(apiUrl, event);
    };

    this.update = function(id, event) {
        return $http.put(`${apiUrl}/${id}`, event);
    };

    this.delete = function(id) {
        return $http.delete(`${apiUrl}/${id}`);
    };
});
