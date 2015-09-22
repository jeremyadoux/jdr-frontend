//Here LoopBackAuth service must be provided as argument for authenticating the user
module.factory('socket', function(LoopBackAuth, appContext){
    //Creating connection with server
    console.log(appContext.API_URL);
    var socket = io.connect(appContext.API_URL);

    //This part is only for login users for authenticated socket connection between client and server.
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

module.factory('PubSub', function (socket) {
        var container =  [];
        return {
            subscribe: function(options, callback){
                if(options){
                    var collectionName = options.collectionName;
                    var modelId = options.modelId;
                    var method = options.method;
                    if(method === 'POST'){
                        var name = '/' + collectionName + '/' + method;
                        socket.on(name, callback);
                    }
                    else{
                        var name = '/' + collectionName + '/' + modelId + '/' + method;
                        socket.on(name, callback);
                    }
                    //Push the container..
                    this.pushContainer(name);
                }else{
                    throw 'Error: Option must be an object';
                }
            }, //end subscribe

            pushContainer : function(subscriptionName){
                container.push(subscriptionName);
            },

            //Unsubscribe all containers..
            unSubscribeAll: function(){
                for(var i=0; i<container.length; i++){
                    socket.removeAllListeners(container[i]);
                }
                //Now reset the container..
                container = [];
            }

        };
    });