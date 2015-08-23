module.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'HomeController',
            authenticate: true
        })
        .state('event', {
            url: '/event',
            templateUrl: 'calendar.html',
            controller: 'EventController',
            authenticate: true
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'UserController'
        })
        .state('logout', {
            url: '/logout',
            controller: 'LogoutController',
            authenticate: true
        })
        .state('register', {
            url: '/register',
            templateUrl: 'createAccount.html',
            controller: 'UserController'
        });
    $urlRouterProvider.otherwise('home');
}])
    .run(['$rootScope', '$state', '$injector', 'LoopBackAuth', 'Player', function($rootScope, $state, $injector, LoopBackAuth, User) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            //Force login user
            var $state = $injector.get('$state');
            if(!$rootScope.currentUser && LoopBackAuth.accessTokenId) {
                User
                    .getCurrent()
                    .$promise
                    .then(function(response) {
                        $rootScope.currentUser = {
                            id: response.id,
                            tokenId: LoopBackAuth.accessTokenId,
                            email: response.email
                        };
                    });
            } else if (next.authenticate && !$rootScope.currentUser) {
                event.preventDefault(); //prevent current page from loading
                $state.go('login');
            }
        });
    }]);