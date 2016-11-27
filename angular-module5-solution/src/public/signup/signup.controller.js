(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['SignUpService'];
    function SignUpController(SignUpService) {
        var $ctrl = this;
        $ctrl.user = {};
        $ctrl.message ='';

        $ctrl.submit = function(user){
            var promise = SignUpService.register(user);
            promise.then(function(){
                $ctrl.message = 'Your information has been saved';
            }).catch(function(){
                    $ctrl.message = 'No such new number exists';
                });
        }
    }

})();
