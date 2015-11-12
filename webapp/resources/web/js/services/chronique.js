module.factory('ChroniqueService', ['Chronique', '$q', '$stateParams', function(Chronique, $q, $stateParams ) {
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
                console.log(response);
                return response;
            });
    }

    return {
        createChronique: createChronique,
        findAll: findAll
    };
}]);