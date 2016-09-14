(function () {

'use strict';
angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController ($scope){
        $scope.message = '';
        $scope.dishes = '';

        $scope.showMessage = function () {
            var amount = countDishes($scope.dishes);
            var el = document.getElementById('message');

            if(amount === 0) {
                $scope.message = 'Please enter data first';
                el.className = 'warning';
            } else {
                el.className = 'good';
                if (amount <= 3) {
                    $scope.message = 'Enjoy!';
                } else if (amount > 3) {
                    $scope.message = 'Too much!';
                }
            }
        }
    }

    function countDishes(str) {
       if(str === '') {
            return 0;
        }
        var arr = str.split(',');
        return arr.length;
    }
})();