app.directive('headerComponent', function () {
    return {
        restrict: 'E',
        templateUrl: '../../components/header/header.html',
        link: function (scope, element, attrs) {
            // Tambahkan logika khusus jika perlu
            console.log('Header directive loaded');
        }
    };
});
