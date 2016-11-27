(function () {
    "use strict";

    angular.module('public')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['$q','SignUpService', 'ApiPath'];
    function InfoController($q, SignUpService, ApiPath) {
        var $ctrl = this;
        $ctrl.basePath = ApiPath;
        $ctrl.userData = {};
        $ctrl.message ='';

        var promise1 = SignUpService.getUserInfo();
        var promise2 = SignUpService.getUser();

        $q.all([promise1, promise2]).
        then(function(response){
            $ctrl.message = 'These are your personal informations :';
            $ctrl.registred = true;

            $ctrl.userData = {
                firstName : response[1].firstName,
                lastName : response[1].lastName,
                phone : response[1].phone,
                email : response[1].email,
                img : response[0].data.short_name,
                title : response[0].data.name,
                description : response[0].data.description
            }
        })
            .catch(function(){
                $ctrl.registred = false;
                $ctrl.message = 'Not Signed Up Yet, Sign Up Now!';
            })
    }

})();