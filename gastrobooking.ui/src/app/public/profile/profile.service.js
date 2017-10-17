/**
 * Created by yonatom on 8/31/16.
 */

(function () {
    'use strict';

    angular
        .module('app.profile')
        .service('ProfileService', ProfileService);
    /*@ngNoInject*/
    function ProfileService(TokenRestangular) {
        var service = {
            uploadFile: uploadFile,
            saveRestaurant: saveRestaurant,
            getCurrentUser: getCurrentUser,
            getRestaurants: getRestaurants,
            getRestaurant: getRestaurant,
            getCurrentRestaurant: getCurrentRestaurant,
            deleteRestaurant: deleteRestaurant,
            deleteRestaurants: deleteRestaurants,
            updateRestaurant: updateRestaurant,
            updateOpeningHours: updateOpeningHours,
            getOpeningHours: getOpeningHours,
            deletePicture: deletePicture,
            getRestaurantByUuid: getRestaurantByUuid,
            getRestaurantTypes: getRestaurantTypes,
            updateUser: updateUser,
            updateRestaurantProfile: updateRestaurantProfile,
            updateSyncServOwn: updateSyncServOwn,

            getRestaurantRequest: getRestaurantRequest,
            getPendingRestaurantRequest: getPendingRestaurantRequest,
            getConfirmRestaurantRequest: getConfirmRestaurantRequest,
            getCancelRestaurantRequest: getCancelRestaurantRequest,
            cancelRestaurantRequest: cancelRestaurantRequest,
            getIngredientList: getIngredientList,
            getMenuList: getMenuList,
            saveChanges: saveChanges,
            changeStatusAsRead: changeStatusAsRead,
            restaurantCountUnreadRequest: restaurantCountUnreadRequest
        };
        return service;

        function saveRestaurant(restaurant, user_id) {
            debugger;
            return TokenRestangular.all('user/' + user_id + "/restaurant").customPOST(restaurant);
        }

        function uploadFile(file, item_id, item_type){
            var fd = new FormData();
            debugger;
            fd.append('file', file, file.name);
            return TokenRestangular.all('photo/' + item_id + '/' + item_type)
                .withHttpConfig({transformRequest: angular.identity})
                .customPOST(fd, '', undefined, {'Content-Type': undefined});
        }

        function getRestaurants(user_id){
            debugger;
            return TokenRestangular.all('user/' + user_id + '/restaurants').customGET('');
        }

        function getRestaurant(restaurant_id){
            debugger;
            return TokenRestangular.all('restaurant/' + restaurant_id).customGET('');
        }

        function getRestaurantByUuid(uuid){
            return TokenRestangular.all('restaurant/uuid/' + uuid).customGET('');
        }

        function getCurrentRestaurant(user_id){
            debugger;
            return TokenRestangular.all('user/' + user_id + '/restaurant').customGET('');
        }

        function deleteRestaurant(restaurant_id){
            return TokenRestangular.all('restaurant/' + restaurant_id).customDELETE('');
        }

        function deleteRestaurants(user_id){
            return TokenRestangular.all('user/' + user_id + '/restaurants').customDELETE('');
        }

        function updateRestaurant(restaurant){
            debugger;
            return TokenRestangular.all('restaurant').customPUT(restaurant);
        }

        function updateOpeningHours(restaurant_id, time){
            debugger;
            return TokenRestangular.all('restaurant/' + restaurant_id + '/open').customPUT(time);
        }

        function getOpeningHours(restaurant_id){
            debugger;
            return TokenRestangular.all('restaurant/' + restaurant_id + '/open').customGET('');
        }

        function deletePicture(url){
            debugger;
            return TokenRestangular.all('photo/url').customPOST(url);
        }

        function getRestaurantTypes(){
            return TokenRestangular.all('restaurantTypes').customGET('');
        }

        function getCurrentUser(){
            return TokenRestangular.all('user').customGET('');
        }

        function updateUser(user){
            return TokenRestangular.all('user/' + user.id).customPUT(user);
        }

        function updateRestaurantProfile(restaurantProfile) {
            return TokenRestangular.all('restaurant').customPUT(restaurantProfile);
        }

        function updateSyncServOwn(restaurant_id) {
            return TokenRestangular.all('restaurantsyncservown').customPOST({id:restaurant_id});
        }

        function getRestaurantRequest(restaurant_id, currentPage){
            return TokenRestangular.all('restaurant_request/' + restaurant_id +'?page='+currentPage).customGET('');
        }
        function getPendingRestaurantRequest(restaurant_id, currentPage){
            return TokenRestangular.all('restaurant_pending_request/' + restaurant_id +'?page='+currentPage).customGET('');
        }
        function getConfirmRestaurantRequest(restaurant_id, currentPage){
            return TokenRestangular.all('restaurant_confirm_request/' + restaurant_id +'?page='+currentPage).customGET('');
        }
        function getCancelRestaurantRequest(restaurant_id, currentPage){
            return TokenRestangular.all('restaurant_cancel_request/' + restaurant_id +'?page='+currentPage).customGET('');
        }

        function restaurantCountUnreadRequest(restaurant_id){
            return TokenRestangular.all('restaurant_count_unread/' + restaurant_id).customGET('');
        }

        function cancelRestaurantRequest(cancelRequest){
            return TokenRestangular.all('cancel_restaurant_request').customPOST(cancelRequest);
        }

        function getIngredientList(currentLanguage){
            debugger;
            return TokenRestangular.all('client/ingredient-list/'+currentLanguage).customGET('');
        }

        function saveChanges(updateRequestDetails){
            debugger;
            return TokenRestangular.all('update-request').customPOST(updateRequestDetails);
        }

        function getMenuList(currentLanguage){
            debugger;
            return TokenRestangular.all('client/menu-list/'+currentLanguage).customGET('');
        }

        function changeStatusAsRead(request_id) {
            return TokenRestangular.all('restaurant/change-status/' + request_id).customGET('');
        }
    }
})();