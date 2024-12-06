var app = angular.module('myApp');

app.controller('ArticleController', function ($scope, $location, $http, $sce, ArticleService, CategoryService, EventService) {

    // Mengaktifkan style untuk halaman Home, menonaktifkan lainnya
    document.getElementById('home').disabled = false;
    document.getElementById('register').disabled = true;
    document.getElementById('profile').disabled = true;
    document.getElementById('admin').disabled = true;
    document.getElementById('create').disabled = true;
    document.getElementById('login').disabled = true;

        // Handle login status
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

        if(!token){
            $location.path('#!/');
        }

    const hash = window.location.hash; // e.g., #!/page?articleId=123
    const queryString = hash.split('?')[1]; // Ambil bagian setelah '?'
    const params = new URLSearchParams(queryString);
    const articleId = params.get('articleId');

    // const params = new URLSearchParams(window.location.search);
    // const articleId = params.get('articleId');
    // console.log(articleId);
    $scope.article = [];
    
    $scope.loadArticle = function() {
        ArticleService.getById(articleId).then(response => {
            $scope.article = response.data;
        }).catch(error => {
            console.error('Error fetching article:', error);
        });
    };

    $scope.getTrustedHtml = function(content) {
        return $sce.trustAsHtml(content);
    };

    $scope.loadArticle();

    // HeaderController functionality (from home.controller.js)
    $scope.$on('$routeChangeSuccess', function() {
        // Ambil path setelah #
        var path = $location.path().substring(1); // Menghapus "#!" dari URL
        console.log('Current Path:', path); // Debugging untuk memeriksa nilai path
    
        // Tentukan currentPage berdasarkan path
        if (['home', 'style', 'contact'].includes(path)) {
            $scope.currentPage = path;
        } else {
            $scope.currentPage = ''; // Atur default jika tidak ditemukan
        }
    });
    

    // load events
    $scope.events = [];
    $scope.loadEvents = function() {
        console.log("Before fetching events:", $scope.events); // Log initial state
        EventService.getAll().then(response => {
            console.log("Events fetched:", response.data.events); // Log fetched events
            $scope.events = response.data.events;
            console.log("After assigning events:", $scope.events); // Log assigned events
        }).catch(error => {
            console.error('Error fetching events:', error);
        });
    };
    

    $scope.loadEvents();

    // Fungsi logout
    $scope.logout = function() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        $scope.isLoggedIn = false;
        $scope.user = null;
        console.log('Logged out');
    };

    $scope.search = function () {
        console.log("Searching for:", $scope.searchQuery);
    
        if (!$scope.searchQuery) {
            localStorage.removeItem('searchResults');
            localStorage.removeItem('searchQuery');
            return;
        }
    
        // Panggil endpoint search melalui $http
        $http.get(`http://localhost:3000/api/articles/search?title=${encodeURIComponent($scope.searchQuery)}`)
            .then(function (response) {
                // Simpan hasil pencarian di localStorage
                localStorage.setItem('searchResults', JSON.stringify(response.data));
                localStorage.setItem('searchQuery', $scope.searchQuery);
    
                // Arahkan pengguna ke halaman /article
                $location.path('/article');
            })
            .catch(function (error) {
                console.error('Error fetching search results:', error);
    
                // Menangkap dan menampilkan pesan error dari response data
                // Cek apakah error.response.data.message ada
                if (error.data && error.data.message) {
                    alert(error.data.message);  // Menampilkan pesan error
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
            });
    };

});