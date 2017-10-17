/**
 * Created by yonatom on 8/31/16.
 */

(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('SocialLoginController', SocialLoginController);
    /*@ngNoInject*/
    function SocialLoginController($state, $rootScope, AuthService, appConstant, TokenRestangular, $stateParams) {
        var vm = this;
        vm.email = $stateParams.email;        
        debugger;
        var data = {
            "grant_type": appConstant.grant_type,
            "client_id": appConstant.client_id,
            "client_secret": appConstant.client_secret,
            "username": vm.email,
            "password": "",
        };

        debugger;
        AuthService.authorize(data).then(function (response) {
            debugger;
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            TokenRestangular.setDefaultHeaders({Authorization: 'Bearer ' + localStorage.getItem('access_token')});
            AuthService.login().then(function (response) {
                var user = JSON.stringify(response.user);
                localStorage.setItem('user', user);
                $rootScope.currentUser = JSON.parse(localStorage.getItem('user'));
                debugger;
                $rootScope.$broadcast('orders-detail-changed');

                if($stateParams.app == 'widget') {
                    $state.go('main.restaurant_detail', {restaurantId: localStorage.getItem('widget__restaurantId')});
                    return;
                }

                $state.go("main.home");
            });
        }, function (error) {
            debugger;
            if (error.statusText == 'Unauthorized') {
            }
            else {
            }
        });
    }

})();