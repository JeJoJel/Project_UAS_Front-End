var app = angular.module('myApp');

// Define the controller
app.controller('ContactController', ['$scope', function($scope) {
    // Define the images
    $scope.images = [
        '../../assets/images/contact/person1.jpg',
        '../../assets/images/contact/person2.jpg',
    ];

    // Initialize the current image
    $scope.currentImage = 1;

    // Function to show a specific image
    $scope.showImage = function(imageNumber) {
        $scope.currentImage = imageNumber;
    };

    // Form model
    $scope.contact = {
        name: '',
        phone: '',
        email: '',
        message: ''
    };

    // Form submission function
    $scope.submitForm = function() {
        // For now, just log the contact details to the console
        console.log("Contact Form Submitted:", $scope.contact);
        alert("Thank you for contacting us, " + $scope.contact.name + "!");
        // Clear the form
        $scope.contact = {
            name: '',
            phone: '',
            email: '',
            message: ''
        };
    };
}]);
