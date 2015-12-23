module.controller('ChroniqueController', ["$scope", "$rootScope", "ChroniqueService", "CharacterService", "$state", "PubSub", function($scope, $rootScope, ChroniqueService, CharacterService, $state, PubSub) {
    $scope.createChronique = function() {
        ChroniqueService.createChronique($scope.chronique.title, $scope.chronique.description, $scope.chronique.character.id).then(function(chronique) {
            $rootScope.$broadcast('sendMessageInformation', 'Votre chronique a été créée.', 'alert-success');
        });
    };

    CharacterService.findAllByUser().then(function(charactersResponse) {
        $scope.characterList = charactersResponse;
    });

    ChroniqueService.findAll().then(function(chroniques) {
        $scope.chroniqueList = chroniques;
    });
}]);

module.controller('ChroniqueProfileController', ["$scope", "ChroniqueService", "CharacterService", "$state", "PubSub", function($scope, ChroniqueService, CharacterService, $state, PubSub) {
    $scope.createChronique = function() {
        ChroniqueService.createChronique($scope.chronique.title, $scope.chronique.description, $scope.chronique.character.id).then(function(chronique) {
            $rootScope.$broadcast('sendMessageInformation', 'Votre chronique a été créée.', 'alert-success');
        });
    };

    CharacterService.findAllByUser().then(function(charactersResponse) {
        $scope.characterList = charactersResponse;
    });

    ChroniqueService.findAllByUser().then(function(chroniques) {
        $scope.chroniqueList = chroniques;
    });
}]);