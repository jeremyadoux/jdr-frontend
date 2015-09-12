module.factory('GroupService', ['Group', '$q', '$stateParams', function(Group, $q, $stateParams ) {
    function createGroup(title, description) {
        return Group.create( {title: title, description: description} )
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findAll() {
        return Group.find({filter:{ order: 'created DESC' }})
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findGroup(id) {
        return Group.findById( {id: id} )
            .$promise
            .then(function(response) {
                return response;
            });
    }

    return {
        createGroup: createGroup,
        findAll: findAll,
        findGroup: findGroup
    };
}]);