module.factory('ChapterService', ['LoopBackAuth', 'Chapter', '$q', '$stateParams', function(LoopBackAuth, Chapter, $q, $stateParams ) {
    function createChapter(title, content, chronique, weight) {
        return Chapter.create( {title: title, content: content, chroniqueId: chronique.id, weight: weight} )
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findAllByChroniqueId(chroniqueId) {
        return Chapter.find({where:{chroniqueId: chroniqueId}, filter:{ order: 'weight ASC' }})
            .$promise
            .then(function(response) {
                return response;
            });
    }

    return {
        createChapter: createChapter,
        findAllByChroniqueId: findAllByChroniqueId
    };
}]);