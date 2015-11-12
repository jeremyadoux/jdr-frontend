module.factory('CharacterService', ['LoopBackAuth', 'Character', '$q', '$stateParams', function(LoopBackAuth, Character, $q, $stateParams ) {
    function createCharacter(name) {
        return Character.create( {name: name} )
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findAllByUser() {
        return Character.find({where:{playerId: LoopBackAuth.currentUserId}, filter:{ order: 'created DESC' }})
            .$promise
            .then(function(response) {
                return response;
            });
    }

    return {
        createCharacter: createCharacter,
        findAllByUser: findAllByUser
    };
}]);