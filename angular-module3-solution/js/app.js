(function() {
  'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', foundItems)
  .constant('apiPath', 'https://davids-restaurant.herokuapp.com/menu_items.json');

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.getItems = function() {
      ctrl.msg = '';
      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

      promise.then(function(response) {
        ctrl.found = response;

        if (!ctrl.found.length) {
          ctrl.msg = 'Nothing found';
        }
      }).catch(function (response) {
          console.error(response);
      })
    };

    ctrl.removeItem = function(index){
      ctrl.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http', 'apiPath'];
  function MenuSearchService($http, apiPath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){

      return $http({
        method: 'GET',
        url: apiPath
      })
        .then(function(response){
          var foundItems = [];
          if (searchTerm !== ''){
            response.data.menu_items.forEach(function (item) {
              if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
                foundItems.push(item);
              }
            });
          }
          return foundItems;
        })
    };
  }

  function foundItems(){
    var ddo = {
      templateUrl: 'foundItems.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&',
        msg: '@msg'

      },
      controller: NarrowItDownController,
      controllerAs: 'ctrl',
      bindToController: true
    };
    return ddo;
  }

})();
