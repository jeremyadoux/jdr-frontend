module.factory('AuthService', ['Player', '$q', '$rootScope', function(Player, $q,
                                                                      $rootScope) {
        function login(email, password) {
            return Player
                .login({email: email, password: password})
                .$promise
                .then(function(response) {
                    console.log(response.user);
                    $rootScope.currentUser = response.user;
                    $rootScope.$broadcast('profileHaveBeenUpdated', response.user);

                    return response;
                });
        }

        function logout() {
            return Player
                .logout()
                .$promise
                .then(function() {
                    $rootScope.currentUser = null;
                    $rootScope.$broadcast('profileHaveBeenUpdated', null);
                });
        }

        function register(email, password) {
            return Player
                .create({
                    email: email,
                    password: password
                })
                .$promise;
        }

        return {
            login: login,
            logout: logout,
            register: register
        };
    }]);