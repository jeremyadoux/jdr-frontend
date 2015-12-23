/**
 * Created by jadoux on 16/08/2015.
 */
module.controller('EventController', ["$scope", "$rootScope", "EventService", "$state", "PubSub", function($scope, $rootScope, EventService, $state, PubSub) {
    /*var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();*/

    $scope.alertOnEventClick = function(date, jsEvent, view) {
        console.log(date, jsEvent, view);
    };

    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
        console.log("alert drop");
    };

    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
        console.log("alert on resize");
    };

    $scope.eventRender = function(event, element, view) {
        console.log("event render");
    };

    $scope.events = [];

    EventService.findAll()
        .then(function(events) {
            for(var i= 0; i < events.length; i++)
            {
                objDate = {
                    id:  events[i].id,
                    title:  events[i].title,
                    objEvent: events[i],
                    start:  events[i].dateStarted,
                    end:  events[i].dateEnded
                };

                $scope.events.push(objDate);
            }

            PubSub.subscribe({
                collectionName: 'Event',
                method : 'POST'
            }, function(data) {
                console.log(data);
                objDate = {
                    id:  data.id,
                    title:  data.title,
                    objEvent: data,
                    start:  data.dateStarted,
                    end:  data.dateEnded
                };

                $scope.events.push(objDate);
                $scope.$apply();
            });
        });

    $scope.createEvent =  function() {
        EventService.createEvent($scope.event.title, $scope.event.description, $scope.event.dateStarted, $scope.event.dateEnded)
            .then(function(event) {
                $rootScope.$broadcast('sendMessageInformation', "L'évènement a été créé avec succès.", 'alert-success');
            });
    };

    $scope.uiConfig = {
        calendar:{
            height: 450,
            width: 700,
            editable: true,
            header:{
                left: 'Titre',
                center: '',
                right: "Aujourd'hui précédent,suivant"
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender
        }
    };

    $scope.eventSources = [$scope.events];

    $scope.titlePlaceholder = "Titre de l'evenement";
    $scope.startPlaceholder = "Date de debut";
    $scope.endPlaceholder = "Date de fin";
    $scope.descriptionPlaceholder = "Rédigez une description ici";

}]);