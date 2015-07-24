angular.module('userApp', [])
  .controller('userCtrl', ['$scope', function($scope, $http) {
    $http.post('/login')
      .success(function(data))
  });

app.controller('userCtrl', function($scope) {
    $scope.heroes = [
        {
            name: "Wonder woman",
            power: "flies"
        },
        {
            name: "Iron man",
            power: "special beam"
        },
        {
            name: "Super man",
            power: "xray vision"
        },
        {
            name: "Flash gordon",
            power: "fast"
        }
    ];
});