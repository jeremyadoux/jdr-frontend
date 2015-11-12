module.controller('ChroniqueController', ["$scope", "ChroniqueService", "CharacterService", "$state", "PubSub", function($scope, ChroniqueService, CharacterService, $state, PubSub) {
    $scope.createChronique = function() {
        ChroniqueService.createChronique($scope.chronique.title, $scope.chronique.description, $scope.chronique.character.id).then(function(chronique) {

        });
    };

    CharacterService.findAllByUser().then(function(charactersResponse) {
        $scope.characterList = charactersResponse;
    });

    ChroniqueService.findAll().then(function(chroniques) {
        $scope.chroniqueList = chroniques;
    });
}]);