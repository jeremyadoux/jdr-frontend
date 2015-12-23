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
        .state('group-list', {
            url: '/group/list',
            controller: 'GroupListController',
            templateUrl: 'group-list.html',
            authenticate: true
        })
        .state('group-detail', {
            url: '/group/:id',
            controller: 'GroupDetailController',
            templateUrl: 'group-detail.html',
            authenticate: true
        })
        .state('chronique-list', {
            url: '/chronique/list',
            controller: 'ChroniqueController',
            templateUrl: 'chronique-list.html',
            authenticate: true
        })
        .state('profile', {
            url: '/profile/edit',
            controller: 'ProfileController',
            templateUrl: 'profile-edit.html',
            authenticate: true
        })
        .state('profile-chronique', {
            url: '/profile/chronique',
            controller: 'ChroniqueProfileController',
            templateUrl: 'chronique-list-profile.html',
            authenticate: true
        })
        .state('profile-chronique-detail', {
            url: '/profile/chronique/:id',
            controller: 'ChapterProfileController',
            templateUrl: 'chronique-detail-profile.html',
            authenticate: true
        })
        .state('profile-edit-character', {
            url: '/profile/edit/character',
            controller: 'ProfileCharacterController',
            templateUrl: 'profile-edit-character.html',
            authenticate: true
        })
        .state('register', {
            url: '/register',
            templateUrl: 'createAccount.html',
            controller: 'UserController'
        });
    $urlRouterProvider.otherwise('home');
}])
    .run(['$rootScope', '$state', '$injector', 'LoopBackAuth', 'Player', function($rootScope, $state, $injector, LoopBackAuth, Player) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            //Force login user
            var $state = $injector.get('$state');
            if(!$rootScope.currentUser && LoopBackAuth.accessTokenId) {
                Player
                    .getCurrent({filter: {include: 'avatar'}})
                    .$promise
                    .then(function(response) {
                        $rootScope.currentUser = response;
                        $rootScope.$broadcast('profileHaveBeenUpdated', response);
                    },
                    function(errorResponse) {
                        event.preventDefault(); //prevent current page from loading
                        $state.go('login');
                    });
            } else if (next.authenticate && !$rootScope.currentUser) {
                event.preventDefault(); //prevent current page from loading
                $state.go('login');
            }
        });
    }]);