/**
 * Created by yonatom on 8/31/16.
 */

(function () {
    'use strict';

    angular
        .module('app.client')
        .service('ClientService', ClientService);
    /*@ngNoInject*/
    function ClientService(TokenRestangular, $rootScope, $state, $translate) {
        var service = {
            getClientDetail: getClientDetail,
            getFriends : getFriends,
            getFriendCircle: getFriendCircle,
            getOtherCircles: getOtherCircles,
            addFriends: addFriends,
            respondToFriendRequest: respondToFriendRequest,
            getFriendRequests: getFriendRequests,
            getSentFriendRequests : getSentFriendRequest,
            getOrders: getOrders,
            getOrder: getOrder,
            updateOrderDetails: updateOrderDetails,
            updateOrder: updateOrder,
            printOrder: printOrder,
            getDiets: getDiets,
            getCurrentClient: getCurrentClient,
            getLanguageCode: getLanguageCode,
            updateClient : updateClient,

            getSetting: getSetting,
            getQuizClient: getQuizClient,
            getSumPrice: getSumPrice,
            orders_sum_price_between_dates: orders_sum_price_between_dates,
            updateLastCrossingTime: updateLastCrossingTime,
            getQuizPrize: getQuizPrize,
            sendEmail: sendEmail,
            addQuizClient: addQuizClient,
            startQuiz: startQuiz,

            // patron
            getAllpatronage: getAllpatronage,
            getActivePatronage: getActivePatronage,
            getHistoryPatronage: getHistoryPatronage,
            getBillingPatronage: getBillingPatronage,
            getRestaurantType: getRestaurantType,
            patronActivate: patronActivate,
            removeActive: removeActive,
            sendAmount: sendAmount,

            getClient: getClient,

            // remuneration
            getPaied: getPaied,
            getClient_payment: getClient_payment,
            getFirstMembers: getFirstMembers,
            getAllOrdersWithDetail: getAllOrdersWithDetail,
            getAllOrdersArray: getAllOrdersArray,
            getPaiedEmail: getPaiedEmail,
            // end remuneration

            //Request Meal
            getMenuList: getMenuList,
            getIngredientList: getIngredientList,
            getRestaurantList: getRestaurantList,
            getRestaurantAddress: getRestaurantAddress,
            sendRequest: sendRequest,
            getRequests: getRequests,
            getConfirmRequests: getConfirmRequests,
            getCancelRequests: getCancelRequests,
            getPastRequests: getPastRequests,
            cancelRequest: cancelRequest,
            printRequest: printRequest,
            confirmRequest: confirmRequest,
            changeStatusAsRead: changeStatusAsRead,
            countMissingBooking: countMissingBooking,
            currentUserCurrency: currentUserCurrency,
            countUnreadRequest: countUnreadRequest,
            getRestaurantOpeningHours: getRestaurantOpeningHours,
            //Request Meal End
        };
        return service;

        //Request Meal

        function getRestaurantOpeningHours(id){
            debugger;
            return TokenRestangular.all('client/opening-hours/'+id).customGET('');
        }

        function getMenuList(currentLanguage){
            debugger;
            return TokenRestangular.all('client/menu-list/'+currentLanguage).customGET('');
        }

        function countMissingBooking(){
            return TokenRestangular.all('client/count-missing-booking').customGET('');
        }

        function currentUserCurrency(){
            return TokenRestangular.all('client/current-user-currency').customGET('');
        }

        function countUnreadRequest(){
            return TokenRestangular.all('client/count-unread-request').customGET('');
        }

        function getIngredientList(currentLanguage){
            debugger;
            return TokenRestangular.all('client/ingredient-list/'+currentLanguage).customGET('');
        }

        function getRestaurantList(){
            debugger;
            return TokenRestangular.all('client/restaurant-list').customGET('');
        }

        function getRestaurantAddress(restaurantId){
            debugger;
            return TokenRestangular.all('client/restaurant-address/'+restaurantId).customGET('');
        }

        function sendRequest(sendRequestDetails){
            return TokenRestangular.all('client/send-request').customPOST(sendRequestDetails);
        }

        function confirmRequest(confirmRequest){
            return TokenRestangular.all('client/confirm-request').customPOST(confirmRequest);
        }

        function getRequests(currentPage){
            debugger;
            return TokenRestangular.all('client/get-requests?page='+ currentPage).customGET('');
        }

        function getConfirmRequests(currentPage){
            debugger;
            return TokenRestangular.all('client/get-confirm-requests?page='+ currentPage).customGET('');
        }

        function getCancelRequests(currentPage){
            debugger;
            return TokenRestangular.all('client/get-cancel-requests?page='+ currentPage).customGET('');
        }

        function getPastRequests(){
            debugger;
            return TokenRestangular.all('client/get-past-requests').customGET('');
        }

        function cancelRequest(cancelRequest){
            debugger;
            return TokenRestangular.all('client/cancel-request').customPOST(cancelRequest);
        }

        function printRequest(orderId, lang) {
            return TokenRestangular.all('client/request-print/' + lang + '/' + orderId).customGET('');
        }

        function changeStatusAsRead(request_id) {
            return TokenRestangular.all('client/change-status/' + request_id).customGET('');
        }

        //Request Meal End


        // remuneration
        function getPaied(clientPayment) {
            return TokenRestangular.all('client/clientPayment').customPOST(clientPayment);
        }

        function getClient_payment() {
            return TokenRestangular.all('client/getClient_payment').customPOST('');
        }

        function getFirstMembers(){
            //debugger;
            return TokenRestangular.all('client/getFirstMembers').customPOST('');
        }

        function getAllOrdersWithDetail(client) {
            //debugger;
            return TokenRestangular.all('getAllOrdersWithDetail').customPOST(client);
        }

        function getPaiedEmail(response){
            return TokenRestangular.all('client/getPaiedEmail').customPOST(response);
        }

        function getAllOrdersArray(client) {
            //debugger;
            return TokenRestangular.all('getAllOrdersArray').customPOST(client);
        }
        // end remuneration

        function getClient(client) {
            return TokenRestangular.all('client/getClient').customPOST(client);
        }

        function getClientDetail (clientId){
            //debugger;
            return TokenRestangular.all('client/'+clientId).customGET('');
        }

        function getFriends(query){
            //debugger;
            return TokenRestangular.all('clients?search='+query).customGET('');
        }
        function getFriendCircle(){
            //debugger;
            return TokenRestangular.all('client/friends').customGET('');
        }
        function getSetting(){
            //debugger;
            return TokenRestangular.all('client/quizsetting').customGET('');
        }
        function getSumPrice(data) {
            return TokenRestangular.all('orders_sum_price').customPOST(data);
        }
        function updateLastCrossingTime(){
            return TokenRestangular.all('client/updatelastcrossingtime').customGET('');
        }
        function getQuizPrize(){
            return TokenRestangular.all('client/quizPrize').customGET('');
        }
        function sendEmail(response){
            return TokenRestangular.all('client/sendEmail').customPOST(response);
        }
        function startQuiz(lang){
            //debugger;
            return TokenRestangular.all('client/question/' + lang).customGET();
        }
        function getQuizClient() {
            //debugger;
            // return TokenRestangular.all('client/quizsetting').customPOST(response);
            return TokenRestangular.all('client/quizclient').customGET('');
        }
        function orders_sum_price_between_dates(data) {
          return TokenRestangular.all('orders_sum_price_between_dates').customPOST(data);
        }
        function addQuizClient(quizClient) {
            //debugger;
            return TokenRestangular.all('client/quizclient').customPOST(quizClient);
        }
        function getOtherCircles(){
            //debugger;
            return TokenRestangular.all('client/circles').customGET('');
        }
        function addFriends(clients){
            //debugger;
            return TokenRestangular.all('client/friends').customPOST(clients);
        }
        function respondToFriendRequest(response){
            //debugger;
            return TokenRestangular.all('client/respond').customPOST(response);
        }
        function getFriendRequests(){
            //debugger;
            return TokenRestangular.all('client/requests').customGET('');
        }
        function getSentFriendRequest(){
            //debugger;
            return TokenRestangular.all('client/sent_requests').customGET('');
        }
        function getOrders(currentPage) {
            //debugger;
            return TokenRestangular.all('orders_by_status?page='+ currentPage).customGET('');
        }

        function getOrder(orderId) {
            //debugger;
            return TokenRestangular.all('orders/' + orderId).customGET('');
        }
        
        function updateOrderDetails(orderDetails, source) {
            //debugger;
            if (!source){
                angular.forEach(orderDetails.orders_detail, function(item){
                    item.serve_at = moment(item.serve_at).format();
                    //debugger;
                });
            }
            return TokenRestangular.all('orders_detail').customPUT(orderDetails);
        }

        function updateOrder(order) {
            //debugger;
            return TokenRestangular.all('orders').customPUT(order);
        }

        function printOrder(orderId, lang) {
            return TokenRestangular.all('print_order/' + lang + '/' + orderId).customGET('');
        }

        function getDiets(){
            return TokenRestangular.all('diet').customGET('');
        }

        function getCurrentClient(){
            return TokenRestangular.all('client').customGET('');
        }

        function getLanguageCode() {
            var langCode = {
                "en" : "ENG",
                "cs" : "CZE"
            }
            var currentLang = $translate.use();
            if (currentLang && currentLang in langCode) {
                return langCode[currentLang];
            }
            return "ENG";
        }

        function updateClient(client) {
            return TokenRestangular.all('client').customPUT(client);
        }

        // patron
        function getRestaurantType() {
            return TokenRestangular.all('getRestaurantType').customGET('');
        }

        function getAllpatronage(currentPage, distance, business, patronOnly, now) {
            //debugger;
            return TokenRestangular.all('Allpatronage?page='+ currentPage+"&distance="+distance+"&business="+business+"&patronOnly="+patronOnly+"&now="+now).customGET('');
        }

        function patronActivate(restaurantID, now) {
            return TokenRestangular.all('patron/activate').customPOST({restaurantID: restaurantID, now: now});
        }
        function removeActive(id) {
            return TokenRestangular.all('patron/remove').customPOST({id: id});
        }
        function getActivePatronage(currentPage, now) {
            return TokenRestangular.all('getActivePatronage?page='+currentPage+"&now="+now).customGET('');
        }

        function getHistoryPatronage(currentPage, now) {
            return TokenRestangular.all('getHistoryPatronage?page='+currentPage+"&now="+now).customGET('');
        }

        function getBillingPatronage(currentPage, now) {
            return TokenRestangular.all('getBillingPatronage?page='+currentPage+"&now="+now).customGET('');
        }

        function sendAmount(response){
            return TokenRestangular.all('patron/sendAmount').customPOST(response);
        }
    }
})();
