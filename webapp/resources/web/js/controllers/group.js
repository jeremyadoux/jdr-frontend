module.controller('GroupListController', ["$scope", "GroupService", "$state", function($scope, GroupService, $state) {
    $scope.createGroup =  function() {
        GroupService.createGroup($scope.group.title, $scope.group.description)
            .then(function(group) {
                $state.go('group-detail', { "id": group.id});
            });
    };

    $scope.listGroup = function() {
        GroupService.findAll().then(function(groups) {
            console.log(groups);
        });
    };

    $scope.listGroup();
}]);

module.controller('GroupDetailController', ["$scope", "GroupService", "$state", "$stateParams", function($scope, GroupService, $state, $stateParams) {
    console.log($scope.id);
    console.log($stateParams.id);
    if($stateParams.id) {
        GroupService.findGroup($stateParams.id)
            .then(function(group){
                $scope.group = group;
            });
    }
}]);