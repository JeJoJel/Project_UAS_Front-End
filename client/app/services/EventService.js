var app = angular.module('myApp'); 

app.factory('EventService', function($http) {
    const baseUrl = 'http://localhost:3000/api/events';

    return {
        getAll: function() {
            return $http.get(baseUrl);
        },
        create: function(eventData) {
            return $http.post(baseUrl, eventData);
        },
        update: function(id, eventData) {
            return $http.put(`${baseUrl}/${id}`, eventData);
        },
        delete: function(id) {
            return $http.delete(`${baseUrl}/${id}`);
        }
    };
});

