var app = angular.module('myApp');

app.controller('HomeController', function ($scope, $location, CategoryService) {

    // Variables
    $scope.articles = [];
    $scope.filteredCards = [];
    $scope.visibleCards = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 3;
    $scope.totalPages = 0;
    $scope.selectedArticle = null; 

    // Testimonial Data
    $scope.testimonials = [
        {
            name: "James Passaquindici Arcand",
            img: "https://storage.googleapis.com/a1aa/image/dCvcTz9F5aaeIytnFAgTukwwnsMZDpHjjAIP2Pki3NVZfN3TA.jpg",
            message: "Saya sangat puas dengan layanan yang diberikan. Mereka benar-benar memahami kebutuhan saya dan memberikan solusi terbaik. Akan sangat merekomendasikan!"
        },
        {
            name: "Abram Schleifer",
            img: "https://storage.googleapis.com/a1aa/image/Lz3H8OvJk5ZEH9LCfvin6MMVeDWmQralBvK9OORxPX30ebunA.jpg",
            message: "Pelayanan yang luar biasa! Semua staf sangat ramah dan membantu, dan hasilnya lebih dari yang saya harapkan. Saya pasti akan kembali lagi!"
        },
        {
            name: "Sarah Connor",
            img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
            message: "Sangat terkesan dengan pengalaman saya di sini. Setiap detail diperhatikan, dan saya merasa dihargai sebagai pelanggan. Terima kasih atas perhatian dan dedikasinya!"
        },
        {
            name: "Jean Dean",
            img: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f",
            message: "Saya tidak pernah merasa lebih puas dengan layanan seperti ini sebelumnya. Mereka membuat proses yang rumit menjadi sangat mudah. Terus pertahankan!"
        }
    ];

    // Hero Section Variables
    $scope.heroImages = [
        { src: "https://img.freepik.com/free-photo/flat-lay-traveling-elements-collection_23-2149185255.jpg?t=st=1733240428~exp=1733244028~hmac=9a4c0f27dfe8126f04cc7244e401b614786d6a63ac2b9cf6e9f52acf42d13261&w=1380", alt: "Gambar 1" },
        { src: "https://img.freepik.com/free-photo/flat-lay-traveling-essentials-collection_23-2149185243.jpg?t=st=1733240420~exp=1733244020~hmac=a1f22862945813ecc7410db752dcfbba33b54cd1df88b1d0a841ac2c41c16896&w=1380", alt: "Gambar 2" },
        { src: "https://img.freepik.com/free-photo/high-angle-traveling-essentials-collection_23-2149185292.jpg?t=st=1733240411~exp=1733244011~hmac=6e6ad94a3d19308eb28bb282b0b119dd013ec141fcc86494035cab4f09f6cc7e&w=1380", alt: "Gambar 3" }
    ];

    $scope.currentImageIndex = 0;

    // Title di Hero Section
    $scope.heroText = {
        title: "Welcome to Chic & Simple",
        subtitle: "Explore the world, embrace new experiences, and create a lifestyle that makes you happy."
    };

    // Fungsi untuk ubah gambar kalo user klik button
    $scope.changeImage = function(direction) {
        if (direction === 'next') {
            $scope.currentImageIndex = ($scope.currentImageIndex + 1) % $scope.heroImages.length;
        } else if (direction === 'prev') {
            $scope.currentImageIndex = ($scope.currentImageIndex - 1 + $scope.heroImages.length) % $scope.heroImages.length;
        }
    };

    // Load articles and extract necessary fields
    $scope.loadArticles = function () {
        CategoryService.getAll().then(response => {
            console.log("Response data:", response.data); // Log to ensure data is received
            
            // Ensure the correct fields are present in your response
            $scope.articles = response.data.map(article => ({
                title: article.title,
                category: article.category,
                author: article.author,
                content: article.content, 
                link: article.link,
                img: article.img,
                alt: article.alt
            }));

            // Initialize pagination
            $scope.filteredCards = $scope.articles;
            $scope.totalPages = Math.ceil($scope.filteredCards.length / $scope.itemsPerPage);
            $scope.updateVisibleCards();
        }).catch(error => {
            console.error('Error fetching articles:', error);
        });
    };

    // Update visible articles for the current page
    $scope.updateVisibleCards = function () {
        const start = ($scope.currentPage - 1) * $scope.itemsPerPage;
        $scope.visibleCards = $scope.filteredCards.slice(start, start + $scope.itemsPerPage);
    };

    // Show selected article content in the modal
    $scope.showArticleContent = function(article) {
        $scope.selectedArticle = article;
        document.getElementById("articleModal").style.display = "block";
    };

    // Hide the modal
    $scope.closeModal = function() {
        document.getElementById("articleModal").style.display = "none";
    };

    // Pagination functions
    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.updateVisibleCards();
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.totalPages) {
            $scope.currentPage++;
            $scope.updateVisibleCards();
        }
    };

    // Call this on page load
    $scope.loadArticles();

    // HeaderController functionality (from home.controller.js)
    $scope.$on('$routeChangeSuccess', function() {
        $scope.currentPage = $location.path().split('/')[1]; // Extract active page from URL
    });

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    // Debugging log untuk memastikan token dan user ada
    console.log('Token:', token); // Periksa apakah token ada
    console.log('User:', user);   // Periksa apakah user ada
    
    // Set status login di scope
    $scope.isLoggedIn = !!token;   // Jika token ada, berarti login
    $scope.user = user ? JSON.parse(user) : null; // Jika ada user di localStorage, parse data JSON-nya
    
    // Cek apakah status login sudah benar
    console.log('isLoggedIn:', $scope.isLoggedIn); // Log status login

    // Fungsi logout
    $scope.logout = function() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        $scope.isLoggedIn = false;
        $scope.user = null;
        console.log('Logged out');
    };

    // Search functionality
    $scope.searchQuery = "";
    $scope.search = function() {
        console.log("Searching for:", $scope.searchQuery);
        // Implement search logic based on query
    };

    // Fungsi untuk menangani pengiriman form
    $scope.submitForm = function() {
        if ($scope.contactForm.$valid) {
            alert('Thank you for contacting us, ' + $scope.contact.name + '! We will get back to you soon.');
            // Reset form after submission
            $scope.contact = { name: '', email: '', message: '' };
        } else {
            alert('Please fill out the form correctly.');
        }
    };

});