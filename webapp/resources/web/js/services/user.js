module.factory('UserService', ['Player', '$q', '$stateParams', '$rootScope', '$state', 'LoopBackAuth', function(Player, $q, $stateParams, $rootScope, $state, LoopBackAuth ) {
    function getCurrent() {
        if(LoopBackAuth.accessTokenId) {
            return Player
                .getCurrent({filter: {include: 'avatar'}})
                .$promise
                .then(function(response) {
                    console.log(response);
                    return response;
                });
        } else {
            event.preventDefault(); //prevent current page from loading
            $state.go('login');

            return "";
        }

    }

    function profileSave(profile) {
        return Player.prototype$updateAttributes( {id: profile.id}, profile )
            .$promise
            .then(function(response) {
                $rootScope.$broadcast('profileHaveBeenUpdated', response);
                return response;
            });
    }

    return {
        getCurrent: getCurrent,
        profileSave: profileSave
    };
}]);