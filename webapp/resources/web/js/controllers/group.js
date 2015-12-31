module.controller('GroupListController', ["$scope", "GroupService", "$state", "PubSub", function($scope, GroupService, $state, PubSub) {
    $scope.groups = [];

    $scope.createGroup =  function() {
        GroupService.createGroup($scope.group.title, $scope.group.description)
            .then(function(group) {
                $scope.group = null;
                $scope.createGroupForm.$setPristine();
            });
    };

    $scope.listGroup = function() {
        GroupService.findAll().then(function(groups) {
            $scope.groups = groups;

            PubSub.subscribe({
                collectionName: 'Group',
                method : 'POST'
            }, function(data) {
                $scope.groups.unshift(data);
                $scope.$apply();
            });
        });
    };

    $scope.listGroup();
}]);

module.controller('GroupDetailController', ["$scope", "$rootScope", "GroupService", "$state", "$stateParams", "PubSub", function($scope, $rootScope, GroupService, $state, $stateParams, PubSub) {
    if($stateParams.id) {
        GroupService.findGroup($stateParams.id)
            .then(function(group){
                $scope.group = group;
            });
        GroupService.findMessage($stateParams.id)
            .then(function(messages){
                $scope.messages = messages;

                PubSub.subscribe({
                    collectionName: 'Message',
                    method : 'POST'
                }, function(data) {
                    if(data.groupId == $scope.group.id) {
                        $scope.messages.unshift(data);
                        $scope.$apply();
                    }
                });
            });
    }

    $scope.optionsEditor = {
        language: 'fr',
        allowedContent: true,
        entities: false
    };

    $scope.createMessage = function() {
        GroupService.createMessage($scope.group.id, $scope.form_message.content)
            .then(function(message) {
                $scope.form_message = null;
                $scope.createMessageForm.$setPristine();
            });
    };

    $scope.loadClassMessageTypeSender = function(message, typeme, typeother) {
        typeme = typeof typeme !== 'undefined' ? typeme : "by-me";
        typeother = typeof typeother !== 'undefined' ? typeother : "by-other";


      if($rootScope.currentUser.id == message.publisherId) {
        return typeme;
      } else {
          return typeother;
      }
    };

}]);