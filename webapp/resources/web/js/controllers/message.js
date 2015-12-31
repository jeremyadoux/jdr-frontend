module.controller('MessageController', ["$scope", "$timeout", "Notification", function($scope, $timeout, Notification) {
    $scope.delay = "5000"; //En millisecondes
    $scope.delayStarted = false;
    $scope.messageQueue = [];

    $scope.$on('sendMessageInformation', function(event, message, type) {
        Notification[type]({message: message, delay: 5000, positionX: 'center'});

        /*if($scope.delayStarted) {
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
        }*/
    });
}]);