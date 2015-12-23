module.factory('ChroniqueService', ['LoopBackAuth', 'Chronique', '$q', '$stateParams', function(LoopBackAuth, Chronique, $q, $stateParams ) {
    function createChronique(title, description, character) {
        return Chronique.create( {title: title, description: description, characterId: character} )
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findAll() {
        return Chronique.find({filter:{ order: 'created DESC', include : {character : 'player'} }})
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findById(id) {
        return Chronique.findById({id: id})
            .$promise
            .then(function(chronique) {
                return chronique;
            });
    }

    function findAllByUser() {
        return Chronique.find({where:{playerId: LoopBackAuth.currentUserId}, filter:{ order: 'created DESC', include : {character : 'player'} }})
            .$promise
            .then(function(response) {
                return response;
            });
    }

    return {
        createChronique: createChronique,
        findAll: findAll,
        findById: findById,
        findAllByUser: findAllByUser
    };
}]);