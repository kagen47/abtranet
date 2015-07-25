angular.module('productsApp', [])
  .controller('productsCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/products')
      .success(function(data) {
        $scope.products = data[0];
        console.log('heeeeelleelello' +data);
      });
  });