/**
 * Created by Lionel on 21/08/2015.
 */

// Controller principal pour test, je re-factoriserai correctement par la suite
module.controller('MainController', function($scope) {
    $scope.activePage = "accueil.html";

    $scope.setActivePage = function(page){
        $scope.activePage = page;
    };

});