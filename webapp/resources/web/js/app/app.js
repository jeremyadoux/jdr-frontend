
// Initialize main Angular module
var module = angular.module('app', ['ui.router', 'ngCookies', 'ui.calendar', 'lbServices', 'angularFileUpload']);

var getUrlParameter = function(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

//Here LoopBackAuth service must be provided as argument for authenticating the user
module.factory('socket', function(LoopBackAuth, appContext){
    console.log('test');
    //Creating connection with server
    console.log(appContext.API_URL);
    var socket = io.connect(appContext.API_URL);

    //This part is only for login users for authenticated socket connection between client and server.
    //If you are not using login page in you website then you should remove rest piece of code..
    var id = LoopBackAuth.accessTokenId;
    var userId = LoopBackAuth.currentUserId;
    socket.on('connect', function(){
        socket.emit('authentication', {id: id, userId: userId });
        socket.on('authenticated', function() {
            // use the socket as usual
            console.log('User is authenticated');
        });
    });
    return socket;

});