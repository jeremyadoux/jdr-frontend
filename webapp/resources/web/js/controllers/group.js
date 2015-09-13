module.controller('GroupListController', ["$scope", "GroupService", "$state", function($scope, GroupService, $state) {
    $scope.groups = [];

    $scope.createGroup =  function() {
        GroupService.createGroup($scope.group.title, $scope.group.description)
            .then(function(group) {
                $state.go('group-detail', { "id": group.id});
            });
    };

    $scope.listGroup = function() {
        GroupService.findAll().then(function(groups) {
            $scope.groups = groups;
        });
    };

    $scope.listGroup();
}]);

module.controller('GroupDetailController', ["$scope", "GroupService", "$state", "$stateParams", function($scope, GroupService, $state, $stateParams) {
    if($stateParams.id) {
        GroupService.findGroup($stateParams.id)
            .then(function(group){
                $scope.group = group;
            });
        GroupService.findMessage($stateParams.id)
            .then(function(messages){
                console.log(messages);
                $scope.messages = messages;
            });
    }

    $scope.createMessage = function() {
        GroupService.createMessage($scope.group.id, $scope.form_message.content)
            .then(function(message) {
                console.log(message);
            });
    };
}]);