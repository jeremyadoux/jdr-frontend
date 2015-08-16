//! Angular services
//! authors : sjanicaud
/**
 * @name messageSupport
 * @kind service
 *
 * @description Broadcast messages to registered listeners
 */

// Using Cross-Origin Resource Sharing (CORS).
// Prevent angular.js $http object from sending X-Requested-With header if target service doesn't support X-Requested-With header
module.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    $httpProvider.interceptors.push('authInterceptor');
    /*if(!$rootScope.userToken) {
        $rootScope.userToken = $cookies.token;
    }
    $httpProvider.defaults.headers.common["Authorization"] = $rootScope.userToken;*/
}]);

module.factory('authInterceptor', ['$rootScope', '$q', '$window', '$cookies', function($rootScope, $q, $window, $cookies) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($cookies.token) {
                config.headers.Authorization = 'Bearer ' + $cookies.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
}]);

module.service('messageSupport', function () {
    "use strict";

    this.listeners = [];
    this.level = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    };
    this.status = {
        IDLE: 'idle',
        BUSY: 'busy'
    };

    this.levelAsString = function (level) {
        switch (level) {
        case this.level.DEBUG:
            return 'DEBUG';
        case this.level.INFO:
            return 'INFO';
        case this.level.WARN:
            return 'WARN';
        case this.level.ERROR:
            return 'ERROR';

        }
    };

    this.addMessageListener = function (listener) {
        this.listeners.push(listener);
    };

    this.fireMessage = function (message, level, context) {
        var i, listener;
        for (i = 0; i < this.listeners.length; i += 1) {
            listener = this.listeners[i];
            if (listener && listener.onMessage) {
                if (!level) {
                    level = this.level.INFO;
                }
                listener.onMessage(message, level, context);
            }
        }
    };

    this.fireStatus = function (status, context) {
        var i, listener;
        for (i = 0; i < this.listeners.length; i += 1) {
            listener = this.listeners[i];
            if (listener && listener.onStatus) {
                listener.onStatus(status, context);
            }
        }
    };
});

/**
 * @name webSocket
 * @kind service
 *
 * @description WebSocket service
 */
module.service('webSocket', function (messageSupport, appContext) {
    "use strict";

    this.socket = null;
    /**
     * @name on
     * @kind function
     * @description listen on socket
     * @param {string} eventName the event name
     * @param {function} callback the callback
     */
    this.on = function (eventName, callback) {
        this.checkConnection();
        messageSupport.fireMessage('socket on : ' + eventName);
        this.socket.on(eventName, function (data) {
            callback(data);
        });
    };
    /**
     * @name emit
     * @kind function
     * @description emit on socket
     * @param {string} eventName the event name
     * @param {object} data the data
     * @param {function} callback the callback
     */
    this.emit = function (eventName, data, callback) {
        this.checkConnection();
        messageSupport.fireMessage('socket emit : ' + eventName);
        this.socket.emit(eventName, data, function (data) {
            callback(data);
        });
    };

    /**
     * @name checkConnection
     * @kind function
     * @private
     * @description check socket connection. connect socket if not connected
     */
    this.checkConnection = function () {
        if (!this.socket) {
            messageSupport.fireMessage('connect websocket @ ' + appContext.WEBSOCKET_URI);
            this.socket = io.connect(appContext.WEBSOCKET_URI, {query: 'token='+appContext.EXTERNAL_TOKEN});
        }
    };

});

module.service("authenticationService", function($cookies, $rootScope, userService) {
    this.setToken = function(token) {
        $rootScope.userToken = token;
        $cookies.token = token;
    };

    this.getToken = function() {
        if(!$rootScope.userToken) {
            $rootScope.userToken = $cookies.token;
        }
        return $rootScope.userToken;
    };

    this.getUserAuthenticated = function(opt_config) {
        if(!$rootScope.currentUser) {
            userService.getUserByToken(this.getToken(), opt_config);
        }

        if (opt_config.successCallback) { opt_config.successCallback( $rootScope.currentUser, 0, {}, {}); }
    };
});

module.service('userService', function($http, messageSupport, appContext, $cookies) {
    "use strict";

    this.createAccount = function(email, password, firstname, lastname, pseudo, phone, car, service, opt_config) {
        if (!opt_config) { opt_config = {}; }

        $http.post(appContext.API_URL + '/user', {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            pseudo: pseudo,
            phone: phone,
            car: car,
            service: service
        }
        ).
        success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            messageSupport.fireMessage(config.method + ' success @ ' + config.url);
            if (opt_config.successCallback) { opt_config.successCallback(data, status, headers, config); }
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            messageSupport.fireMessage(config.method + ' failure @ ' + config.url);
            if (opt_config.errorCallback) { opt_config.errorCallback(data, status, headers, config); }
        });
    };

    this.login = function(email, password, opt_config) {
        if (!opt_config) { opt_config = {}; }

        $http.post(appContext.API_URL + '/login', {
            email: email,
            password: password
        }).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                messageSupport.fireMessage(config.method + ' success @ ' + config.url);
                if (opt_config.successCallback) { opt_config.successCallback(data, status, headers, config); }
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                messageSupport.fireMessage(config.method + ' failure @ ' + config.url);
                if (opt_config.errorCallback) { opt_config.errorCallback(data, status, headers, config); }
            });
    };

    this.getUserByToken = function(token, opt_config) {
        if (!opt_config) { opt_config = {}; }

        $http.post(appContext.API_URL + '/current-user', {
            token: token
        }).
        success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            messageSupport.fireMessage(config.method + ' success @ ' + config.url);
            if (opt_config.successCallback) { opt_config.successCallback(data, status, headers, config); }
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            messageSupport.fireMessage(config.method + ' failure @ ' + config.url);
            if (opt_config.errorCallback) { opt_config.errorCallback(data, status, headers, config); }
        });
    }
});