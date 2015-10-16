module.factory('EventService', ['Event', '$q', '$stateParams', function(Event, $q, $stateParams ) {
    function createEvent(title, description, dateStarted, dateEnded) {
        return Event.create( {title: title, description: description, dateStarted: dateStarted, dateEnded: dateEnded} )
            .$promise
            .then(function(response) {
                return response;
            });
    }

    function findAll() {
        return Event.find()
            .$promise
            .then(function(response) {
                return response;
            });
    }

    return {
        createEvent: createEvent,
        findAll: findAll
    };
}]);