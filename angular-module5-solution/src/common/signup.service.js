(function () {
    "use strict";

    angular.module('public')
        .service('SignUpService', SignUpService);

    SignUpService.$inject = ['$http', 'ApiPath'];
    function SignUpService($http, ApiPath) {
        var service = this;
        service.data = null;
        service.user = null;

        service.register = function(user){
            var shortName = user.favDish;
            var response = $http.get(ApiPath + '/menu_items/'+shortName+'.json');
            service.data = response;
            service.user = user;
            return response;
        };

        service.getUserInfo = function(){
            return service.data;
        };

        service.getUser = function(){
            return service.user;
        }
    }

})();
