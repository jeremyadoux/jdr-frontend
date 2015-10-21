module.factory('CharacterService', ['$rootScope', 'Character', '$q', '$stateParams', function($rootScope, Character, $q, $stateParams ) {
    function createCharacter(name) {
        return Character.create( {name: name} )
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findAllByUser() {
        return Character.find({where:{playerId: $rootScope.currentUser.id}, filter:{ order: 'created DESC' }})
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