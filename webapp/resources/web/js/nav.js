/**
 * Created by Lionel on 21/08/2015.
 */

var main = module.controller('MainController', function() {
    this.activePage = "accueil.html";

    this.setActivePage = function(page){
        this.activePage = page;
    };

});