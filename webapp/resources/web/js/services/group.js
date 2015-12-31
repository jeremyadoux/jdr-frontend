module.factory('GroupService', ['Group', '$q', '$stateParams', '$rootScope', function(Group, $q, $stateParams, $rootScope ) {
    function createGroup(title, description) {
        return Group.create( {title: title, description: description} )
            .$promise
            .then(function(response) {
                $rootScope.$broadcast('sendMessageInformation', 'Votre groupe a été créée.', 'success');

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
        return Group.messages( {id: groupId, filter:{ order: 'created DESC', include : {player : 'avatar'} }})
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