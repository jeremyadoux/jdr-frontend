module.factory('GroupService', ['Group', '$q', '$stateParams', function(Group, $q, $stateParams ) {
    function createGroup(title, description) {
        return Group.create( {title: title, description: description} )
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findAll() {
        return Group.find({filter:{ order: 'created DESC', where: {status: true} }})
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

    function createMessage(groupId, content) {
        return Group.messages.create( {id: groupId}, {content: content})
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findMessage(groupId) {
        return Group.messages( {id: groupId, filter:{ order: 'created DESC', include : 'player' }})
            .$promise
            .then(function(response) {
                return response;
            });
    }

    return {
        createGroup: createGroup,
        findAll: findAll,
        findGroup: findGroup,
        createMessage: createMessage,
        findMessage: findMessage
    };
}]);