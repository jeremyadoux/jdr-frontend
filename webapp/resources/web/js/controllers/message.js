module.controller('MessageController', ["$scope", "$timeout", function($scope, $timeout) {
    $scope.delay = "5000"; //En millisecondes
    $scope.delayStarted = false;
    $scope.messageQueue = [];

    $scope.$on('sendMessageInformation', function(event, message, type) {
        if($scope.delayStarted) {
            $scope.messageQueue.unshift({'message': message, 'type': type});
        } else {
            $scope.delayStarted = true;

            $scope.message = message;
            $scope.type = type;

            var recallTimeout = $timeout(function() {
                if($scope.messageQueue.length > 0) {
                    $scope.message = $scope.messageQueue[$scope.messageQueue.length - 1].message;
                    $scope.type = $scope.messageQueue[$scope.messageQueue.length - 1].type;
                    $scope.messageQueue.pop();
                    recallTimeout();
                } else {
                    $scope.delayStarted = false;
                    $scope.message = false;
                    $scope.type = false;
                }
            }, $scope.delay);
        }
    });
}]);