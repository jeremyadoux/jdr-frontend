module.controller('ChapterProfileController', ["$scope", "$rootScope",  "ChroniqueService", "ChapterService", "$state", "$stateParams", "PubSub", function($scope, $rootScope, ChroniqueService, ChapterService, $state, $stateParams, PubSub) {
    $scope.createChapter = function() {
        ChapterService.createChapter($scope.chapter.title, $scope.chapter.content, $scope.chronique.id, 0).then(function(chapter) {
            $rootScope.$broadcast('sendMessageInformation', 'Votre chapitre a été créé.', 'success');
            $scope.chapter = null;
            $scope.createChapterForm.$setPristine();
        });
    };

    $scope.optionsEditor = {
        language: 'fr',
        allowedContent: true,
        entities: false
    };

    if($stateParams.id) {
        ChroniqueService.findById($stateParams.id).then(function(chronique){
            $scope.chronique = chronique;


            ChapterService.findAllByChroniqueId(chronique).then(function(chapters) {
                $scope.chapterList = chapters;

                PubSub.subscribe({
                    collectionName: 'Chapter',
                    method : 'POST'
                }, function(data) {
                    if(data.chroniqueId == $scope.chronique.id) {
                        $scope.chapterList.unshift(data);
                        $scope.$apply();
                    }
                });
            });

        });
    }
}]);