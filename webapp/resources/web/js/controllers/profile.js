module.controller('ProfileController', ["$scope", "$state", "FileUploader", 'LoopBackAuth', 'Player', 'appContext', function($scope, $state, FileUploader, LoopBackAuth, Player, appContext) {
    $scope.appContext = appContext.API_URL;

    var uploader = $scope.uploader = new FileUploader({
        url: appContext.API_URL + '/api/files/upload',
        autoUpload: true
    });

    // FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        $scope.profile.avatar = response;
        $scope.profile.avatarId = response.id;
    };

    //Load profile information
    if(LoopBackAuth.accessTokenId) {
        Player
            .getCurrent({filter: {include: 'avatar'}})
            .$promise
            .then(function(response) {
                $scope.profile = response;
            });
    } else {
        event.preventDefault(); //prevent current page from loading
        $state.go('login');
    }

    $scope.profileInformationSave = function() {
        Player.prototype$updateAttributes( {id: $scope.profile.id}, $scope.profile )
            .$promise
            .then(function(response) {
                console.log(response);
            });
    };

    $scope.getAvatarUrlApi = function(profile) {
        return appContext.API_URL + profile.avatar.url;
    }
}]);

module.controller('ProfileNavController', ["$rootScope", "$scope", "$state", "$timeout", "appContext", function($rootScope, $scope, $state, $timeout, appContext) {
    $scope.getAvatarUrlApi = function(profile) {
        return appContext.API_URL + profile.avatar.url;
    }
}]);