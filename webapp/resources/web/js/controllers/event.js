/**
 * Created by jadoux on 16/08/2015.
 */
module.controller('EventController', function($scope) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.alertOnEventClick = function(date, jsEvent, view) {
        console.log("vent click");
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

    $scope.events = [
        {title: 'All Day Event',start: new Date(y, m, 1)},
        {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false}
    ];

    $scope.uiConfig = {
        calendar:{
            height: 450,
            width: 700,
            editable: true,
            header:{
                left: 'title',
                center: '',
                right: 'today prev,next'
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

});