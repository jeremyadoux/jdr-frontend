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

module.controller('ChroniqueReaderController',  ["$scope", "ChroniqueService", "CharacterService", "ChapterService", "$state", "$stateParams", "PubSub", function($scope, ChroniqueService, CharacterService, ChapterService, $state, $stateParams, PubSub) {
    $scope.currentChapterKey = 0;
    //$scope.currentChapter = null;

    if($stateParams.id) {
        ChroniqueService.findById($stateParams.id)
            .then(function(chronique){
                $scope.chronique = chronique;
            });
        ChapterService.findAllByChroniqueId($stateParams.id).then(function(chapters) {
            $scope.chapterList = chapters;
            if($scope.chapterList.length > 0) {
                $scope.currentChapter = $scope.chapterList[$scope.currentChapterKey];
            }
        });
    }

    $scope.hasNextChapter = function() {
        if($scope.chapterList.length > ($scope.currentChapterKey + 1)) {
            return true;
        }

        return false;
    };

    $scope.hasPreviousChapter = function() {
        if($scope.currentChapterKey > 0) {
            return true;
        }

        return false;
    };

    $scope.nextChapter = function() {
        if($scope.hasNextChapter()) {
            $scope.currentChapterKey++;
            $scope.currentChapter = $scope.chapterList[$scope.currentChapterKey];
        }
    };

    $scope.previousChapter = function() {
        if($scope.hasPreviousChapter()) {
            $scope.currentChapterKey--;
            $scope.currentChapter = $scope.chapterList[$scope.currentChapterKey];
        }
    };


}]);