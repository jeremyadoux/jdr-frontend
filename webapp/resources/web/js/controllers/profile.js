module.controller('ProfileController', ["$scope", "$state", "FileUploader", 'LoopBackAuth', 'UserService', 'appContext', function($scope, $state, FileUploader, LoopBackAuth, UserService, appContext) {
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
    UserService.getCurrent().then(function(response) {
        $scope.profile = response;
    });

    $scope.profileInformationSave = function() {
        UserService.profileSave($scope.profile).then(function(response) {

        });
    };

    $scope.changeActiveTabs = function(tab) {
        $state.go(tab);
    };

    $scope.isActiveTabs = function(tab) {
        return tab == $state.$current.name;
    };
}]);

module.controller('ProfileNavController', ["$scope", function($scope) {
    $scope.$on('profileHaveBeenUpdated', function(event, profile) {
        $scope.currentUser = profile;
    });
}]);

module.controller('ProfileCharacterController', ["$scope", "$state", "UserService", "CharacterService", function($scope, $state, UserService, CharacterService) {
    $scope.changeActiveTabs = function(tab) {
        $state.go(tab);
    };

    $scope.isActiveTabs = function(tab) {
        return tab == $state.$current.name;
    };

    UserService.getCurrent().then(function(response) {
        $scope.profile = response;
    });

    CharacterService.findAllByUser().then(function(charactersResponse) {
        $scope.characterList = charactersResponse;
    });

    $scope.createCharacter = function() {
        CharacterService.createCharacter($scope.character.name)
            .then(function(character) {
            });
    };
}]);