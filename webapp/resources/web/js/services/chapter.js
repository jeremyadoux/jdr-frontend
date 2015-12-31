module.factory('ChapterService', ['LoopBackAuth', 'Chapter', 'Chronique', '$q', '$stateParams', function(LoopBackAuth, Chapter, Chronique, $q, $stateParams ) {
    function createChapter(title, content, chronique, weight) {
        /*
         Chronique.chapters.create( {id: groupId}, {content: content})
         .$promise
         .then(function(response) {
         return response;
         });

         */
        return Chapter.create( {title: title, content: content, chroniqueId: chronique, weight: weight} )
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findAllByChroniqueId(chronique) {
        return Chronique.chapters({id: chronique.id}, {filter:{ order: 'weight ASC' }})
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