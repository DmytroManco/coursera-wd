(function(){
    'use strict';

    angular
        .module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var buyCtrl = this;

        buyCtrl.items = ShoppingListCheckOffService.buyItems();

        buyCtrl.bought = function(index) {
            ShoppingListCheckOffService.bought(index);
        }
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtCtrl = this;

        boughtCtrl.items = ShoppingListCheckOffService.boughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var buyList = [
            {
                "name": "Jim Beam Raye",
                "quantity": "1"
            },
            {
                "name": "Johnnie Walker Black Label",
                "quantity": "5"
            },
            {
                "name": "Jameson Crested",
                "quantity": "4"
            },
            {
                "name": "Chivas Regal Royal Salute",
                "quantity": "2"
            },
            {
                "name": "Dewar's Founder Reserve",
                "quantity": "3"
            },
            {
                "name": "Jack Daniel's Sinatra",
                "quantity": "6"
            }
        ];

        var boughtList = [];

        service.buyItems = function() {
            return buyList;
        };

        service.boughtItems = function() {
            return boughtList;
        };

        service.bought = function(index) {
            var item = buyList[index];
            boughtList.push(item);
            buyList.splice(index, 1);
        };
    }

})();