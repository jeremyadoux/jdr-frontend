module.controller('ChapterProfileController', ["$scope", "$rootScope",  "ChroniqueService", "ChapterService", "$state", "$stateParams", "PubSub", function($scope, $rootScope, ChroniqueService, ChapterService, $state, $stateParams, PubSub) {
    $scope.createChapter = function() {
        ChapterService.createChapter($scope.chapter.title, $scope.chapter.content, $scope.chronique.id, 0).then(function(chapter) {
            $rootScope.$broadcast('sendMessageInformation', 'Votre chapitre a été créé.', 'alert-success');
        });
    };

    if($stateParams.id) {
        ChroniqueService.findById($stateParams.id)
            .then(function(chronique){
                $scope.chronique = chronique;
            });
        ChapterService.findAllByChroniqueId($stateParams.id).then(function(chapters) {
            $scope.chapterList = chapters;
        });
    }


}]);