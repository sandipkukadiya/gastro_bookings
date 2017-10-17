/**
 * Created by yonatom on 8/31/16.
 */

(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('RestaurantRequestController', RestaurantRequestController);
    /*@ngNoInject*/
    function RestaurantRequestController($state, $scope, Cropper, $timeout, appConstant, $location, $anchorScroll, $stateParams, $rootScope, ProfileService, $filter, $sce) {
        var vm = this;
        vm.cancelRequest = cancelRequest;
        vm.changeStatusAsRead = changeStatusAsRead;
        vm.getRestaurantRequest = getRestaurantRequest;
        vm.getPendingRestaurantRequest = getPendingRestaurantRequest;
        vm.getConfirmRestaurantRequest = getConfirmRestaurantRequest;
        vm.getCancelRestaurantRequest = getCancelRestaurantRequest;
        vm.restaurantCountUnreadRequest = restaurantCountUnreadRequest;

        vm.requestCurrentPage = 1;
        vm.totalrequests = 0;
        vm.requestPerPage = 5;
        
        vm.pendingrequestCurrentPage = 1;
        vm.pendingtotalrequests = 0;
        vm.pendingrequestPerPage = 5;

        vm.confirmrequestCurrentPage = 1;
        vm.confirmtotalrequests = 0;
        vm.confirmrequestPerPage = 5;

        vm.cancelrequestCurrentPage = 1;
        vm.canceltotalrequests = 0;
        vm.cancelrequestPerPage = 5;

        getIngredientList();
        getMenuList();
        getRestaurantRequest();
        getPendingRestaurantRequest();
        getConfirmRestaurantRequest();
        getCancelRestaurantRequest();
        restaurantCountUnreadRequest();

        $rootScope.$on('$translateChangeSuccess', function (a) {
            getMenuList();
            getIngredientList();
        });

        vm.refreshRequests = function(){
            restaurantCountUnreadRequest();
            getRestaurantRequest();
            getPendingRestaurantRequest();
            getConfirmRestaurantRequest();
            getCancelRestaurantRequest();
        }

        /*...Custom Filters.......*/
        $scope.requestTab = "newRequests"
        $scope.show = function(arg) {
            $scope.requestTab = arg;
        }

        vm.openCalendar = function(){
            vm.date_picker.open = true;
        };

        vm.date_picker = {
            date: new Date(),
            datepickerOptions: {
                showWeeks: false,
                minDate: new Date(),
                startingDay: 1
            }
        };

        $scope.statusFilter = function (request) { 
            if (request.status == 'N') {
              return request;
            }
        };

        $scope.pendingStatusFilter = function (request) { 
            if (request.status == 'S' ) {
              return request;
            }
        };

        $scope.confirmationStatusFilter = function (request) { 
            if (request.status == 'A' ) {
              return request;
            }
        };

        $scope.cancelStatusFilter = function (request) { 
            if (request.status == 'E' || request.status == 'C' ) {
              return request;
            }
        };

        $scope.orderDetailStatusFilter = function (request) { 
            if (request.status != 'E' && request.status != 'C' && request.status != 'A') {
              return request;
            }
        };

        $scope.orderDetailConfirmStatusFilter = function (request) { 
            if (request.status == 'A') {
              return request;
            }
        };

        $scope.requestMealStatusFilter = function (request) { 
            if (request.status != 3 ) {
              return request;
            }
        };

        $scope.ingridentStatusFilter = function (request) { 
            if (request.status_confirmed == 'N' || request.status_confirmed == 'C' ) {
              return request;
            }
        };

        $scope.ingridentStatusRightFilter = function (request) { 
            if (request.status_confirmed == 'C' || request.status_confirmed == 'D'  || request.status_confirmed == 'U') {
              return request;
            }
        };

        $scope.totalOrderDetail = function (request) { 
            if (request.status != 3) {
              return request;
            }
        };


        $scope.convertToDate = function (stringDate){
            if (stringDate) {
                var dateOut = new Date(stringDate);
            }
            else{
                return;
            }
            return dateOut;
        };

        $scope.checkPreDate = function (stringDate){
            var date = new Date(); 
            var toDay = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate();
            var dateOut = new Date(stringDate);
            var dateOut = dateOut.getFullYear()+'-'+(dateOut.getMonth() + 1)+'-'+dateOut.getDate();
            var date1 = +new Date(toDay);
            var date2 = +new Date(dateOut);
            if ( date1 <= date2) {
                return true;
            }
            else {
                return false;
            }
        };

        vm.timeOptions = {
            step: 15,
            timeFormat: 'H:i'
        };

        $scope.convertToTime = function (stringDate){
            if (stringDate) {
                var dateElements = stringDate.split(':');
            }
            else{
                return;
            }
            var date = new Date();
            date.setHours(dateElements[0]);
            date.setMinutes(dateElements[1]);
            return date;
        };

        $scope.isCollapsed = [];
        $scope.checkOpen = [];
        vm.updateRequest = [];
        $scope.collapseToggleMore = function(request_id, orderdetail_id) {
            $scope.isCollapsed.length = 0;

            if ( $scope.checkOpen[orderdetail_id] == 1) { 
                $scope.isCollapsed[orderdetail_id] = false;  
                $scope.checkOpen[orderdetail_id] = 0;
            }
            else{  
                $scope.isCollapsed[orderdetail_id] = true;
                $scope.checkOpen[orderdetail_id] = 1;
            }

            vm.ing_exist[orderdetail_id] == false;
            vm.updateRequest[request_id] = false;
            $scope.more_ingredient.ingredient = null;
        }

        $scope.getTotalPrice = function(orders_detail)
        {
            var price = 0;
            angular.forEach(orders_detail, function(value, key){
                if ( value.status != 3 ) {
                    price += value.price * value.x_number; 
                }
            });
            return price.toFixed(2);
        }

        $scope.pageChangeHandler = function() {
          getRestaurantRequest();
        };

        function getRestaurantRequest(){
            vm.reqLoading = true;
            vm.isRequestEmpty = false;
            ProfileService.getRestaurantRequest($stateParams.restaurantId, vm.requestCurrentPage).then(function(response){
                if (response == 'Meal Request Not Found') {
                    vm.isRequestEmpty = true;
                }
                vm.getRequests = response.data;
                vm.totalrequests = response.total;
                vm.requestPerPage = response.per_page;
                vm.requestCurrentPage = response.current_page;
                vm.reqLoading = false;
            }, function(error){
                debugger;
                vm.reqLoading = false;
            });
        }

        $scope.pendingPageChangeHandler = function() {
          getPendingRestaurantRequest();
        };

        function getPendingRestaurantRequest(){
            vm.reqPLoading = true;
            vm.isPendingRequestEmpty = false;
            ProfileService.getPendingRestaurantRequest($stateParams.restaurantId, vm.pendingrequestCurrentPage).then(function(response){
                if (response == 'Meal Request Not Found') {
                    vm.isPendingRequestEmpty = true;
                }
                vm.getPendingRequest = response.data;
                vm.pendingtotalrequests = response.total;
                vm.pendingrequestPerPage = response.per_page;
                vm.pendingrequestCurrentPage = response.current_page;
                vm.reqPLoading = false;
            }, function(error){
                debugger;
                vm.reqPLoading = false;
            });
        }

        $scope.confirmPageChangeHandler = function() {
          getConfirmRestaurantRequest();
        };

        function getConfirmRestaurantRequest(){
            vm.reqCLoading = true;
            vm.isConfirmRequestEmpty = false;
            ProfileService.getConfirmRestaurantRequest($stateParams.restaurantId, vm.confirmrequestCurrentPage).then(function(response){
                if (response == 'Meal Request Not Found') {
                    vm.isConfirmRequestEmpty = true;
                }
                vm.getConfirmRequest = response.data;
                vm.confirmtotalrequests = response.total;
                vm.confirmrequestPerPage = response.per_page;
                vm.confirmrequestCurrentPage = response.current_page;
                vm.reqCLoading = false;
            }, function(error){
                debugger;
                vm.reqCLoading = false;
            });
        }

        $scope.cancelPageChangeHandler = function() {
          getCancelRestaurantRequest();
        };

        function getCancelRestaurantRequest(){
            vm.reqCaLoading = true;
            vm.isCancelRequestEmpty = false;
            ProfileService.getCancelRestaurantRequest($stateParams.restaurantId, vm.cancelrequestCurrentPage).then(function(response){
                if (response == 'Meal Request Not Found') {
                    vm.isCancelRequestEmpty = true;
                }
                vm.getCancelRequests = response.data;
                vm.canceltotalrequests = response.total;
                vm.cancelrequestPerPage = response.per_page;
                vm.cancelrequestCurrentPage = response.current_page;
                vm.reqCaLoading = false;
            }, function(error){
                debugger;
                vm.reqCaLoading = false;
            });
        }

        function restaurantCountUnreadRequest(){
            vm.reqCountLoading = true;
            ProfileService.restaurantCountUnreadRequest($stateParams.restaurantId).then(function(response){
                vm.cancel_unread = response.cancel_unread;
                vm.confirm_unread = response.confirm_unread;
                vm.new_unread = response.new_unread;
                vm.request_serving_delta = response.request_serving_delta;
                vm.reqCountLoading = false;
            }, function(error){
                debugger;
                vm.reqCountLoading = false;
            });
        }


        vm.confirmRequest_comment = [];
        vm.checkDetailStatusAfterAction = {};
        function cancelRequest(requestId){
            $scope.cancelId = requestId;
            var comment = vm.confirmRequest_comment[requestId];
            var lang = localStorage.getItem('current_language_code');
            var cancelRequest = {'ID': requestId, 'comment': comment, 'lang': lang};
            ProfileService.cancelRestaurantRequest(cancelRequest).then(function(response){
                angular.element('#requestDetail'+requestId).modal('hide');
                angular.element('#requestConfirmDetail'+requestId).modal('hide');
                angular.element('.modal-backdrop').remove();
                if (response.message == 'success') { 
                    vm.checkDetailStatusAfterAction[requestId] = true;
                    vm.confirmRequest_comment[requestId] = null; 
                    $scope.requestTab = "cancelledRequests"
                    getRestaurantRequest();
                    getPendingRestaurantRequest();
                    getConfirmRestaurantRequest();
                    getCancelRestaurantRequest();
                    restaurantCountUnreadRequest();
                }
            }, function(error){
                debugger;
                alert('Error');
            });
        }


        $scope.orderByDateFilter = function(getRequest) {
            var date = new Date();
            return date;
        };


        function getIngredientList(){
            var currentLanguage = localStorage.getItem('current_language_code');

            return ProfileService.getIngredientList(currentLanguage).then(function(response){
                $scope.ingredientList = response.ingredients;
            });
        }

        function getMenuList(){
            var currentLanguage = localStorage.getItem('current_language_code');

            return ProfileService.getMenuList(currentLanguage).then(function(response){
                $scope.menuList = response.menu_lists;
            });
        }

        $scope.update_ingredient_amount = {};
        $scope.update_ingredient_unit = {};
        $scope.update_ingredient_name = {};
        $scope.mealIngredientDetails = {};
        $scope.updateIngredientDetail = [];
        $scope.updateIngredientName = {};
        $scope.pre_ingredient_amount = {};
        $scope.pre_ingredient_unit = {};
        vm.updateIng = {}; 
        vm.confirmClass = {}; 
        vm.ing_exist = [];
        $scope.updateIngredient = function(id, ID_request_menu, status, preId, preStaus, order_detail_id){
            vm.ing_exist[order_detail_id] = false;
            var update_ingredient_amount = $scope.update_ingredient_amount[id];
            var update_ingredient_unit = $scope.update_ingredient_unit[id];
            var update_ingredient_name = $scope.update_ingredient_name[id];
            var pre_ingredient_amount = $scope.pre_ingredient_amount[id];
            var pre_ingredient_unit = $scope.pre_ingredient_unit[id];
            var check = 1;
                
            if ( update_ingredient_name) {
                var ingredient_id = update_ingredient_name.ID;
                var ingredient_name = update_ingredient_name.name;
                
                angular.forEach($scope.mealIngredientDetails[ID_request_menu], function(value, key){
                    if ( (value.ID != id) && (value.ID_ingredient === ingredient_id) && ( value.status_confirmed != 'D') ) {
                        vm.ing_exist[order_detail_id] = true;
                        check = 0;
                        return false;
                    }
                    else if(value.ID === id) {
                        $scope.mealIngredientDetails[ID_request_menu][key].ID_ingredient = ingredient_id;
                        if ( status == 'D' ) {
                            $scope.mealIngredientDetails[ID_request_menu][key].status_confirmed = 'D';
                        }
                    }
                });

                for(var i=0;i<$scope.updateIngredientDetail.length;i++){
                    if($scope.updateIngredientDetail[i].ID!=id && $scope.updateIngredientDetail[i].ID_ingredient==ingredient_id && value.updateIngredientDetail[i] != 'D'){
                        vm.ing_exist[order_detail_id] = true;
                        check = 0;
                        return false;
                    }
                }

                for(var i=0;i<$scope.ingredients.length;i++){
                    if($scope.ingredients[i].ID_ingredient === ingredient_id && $scope.ingredients[i].order_detail_id === order_detail_id){
                        vm.ing_exist[order_detail_id] = true;
                        check = 0;
                        return false;
                    }
                }
            }

            if(check == 1){
                if(vm.confirmClass[id]  != 'btn-success'){
                    if (update_ingredient_amount != pre_ingredient_amount || update_ingredient_unit != pre_ingredient_unit) {
                        status = 'U';
                    }
                    else if(preId == ingredient_id && status == 'U'){
                        status = 'C';
                    }
                    else if ( status == 'U' ) {
                        status = 'U';
                    }
                    else if(status == 'D'){
                        status = 'D';
                    }
                }
                vm.updateIng[id] = false;
                vm.confirmClass[id] = 'btn-success';
                
                var ingObj = {
                    ID: id,
                    ID_request_menu: ID_request_menu,
                    name: ingredient_name,
                    ID_ingredient: ingredient_id,
                    amount: update_ingredient_amount,
                    unit: update_ingredient_unit,
                    status_confirmed: status,
                    preStaus: preStaus
                }

                for(var i=0;i<$scope.updateIngredientDetail.length;i++){
                    if($scope.updateIngredientDetail[i].ID===id){
                        $scope.updateIngredientDetail.splice(i, 1);
                    }
                }

                $scope.updateIngredientDetail.push(ingObj);
            }
            else{

            }
            console.log($scope.updateIngredientDetail);
        }

        vm.serveDetailInvalid = {};
        $scope.request_from = {};
        $scope.request_to = {};
        $scope.confirmed_meal_price = {};
        vm.priceInvalid = {};

        $scope.checkMealValidation = function(request_id, order_detail_id, status){
            console.log('Meal : '+status);

            if ( $scope.confirmed_meal_price[order_detail_id] > '0.00' && $scope.confirmed_meal_price[order_detail_id] < 1000000){
                vm.priceInvalid[order_detail_id] = false;
            }
            else{
                vm.priceInvalid[order_detail_id] = true;
            }

            if ( status == false ) {
                for(var i=0;i<$scope.updateOrderDetail.length;i++){
                    if($scope.updateOrderDetail[i].ID===order_detail_id){
                        $scope.updateOrderDetail.splice(i, 1);
                    }
                }
                vm.confirmClass[order_detail_id] = 'btn-info';
                vm.updateRequest[request_id] = false;
            }


            var from = $scope.request_from[order_detail_id];
            var serve_at = $scope.confirmed_meal_time[order_detail_id];
            var to = $scope.request_to[order_detail_id];

            var from_time = $filter('date')(new Date(from), 'HH:mm');
            var to_time = $filter('date')(new Date(to), 'HH:mm');
            var serve_time = $filter('date')(new Date(serve_at), 'HH:mm');

            if ( ((from != undefined) && (serve_time != undefined) && (from_time > serve_time)) || ((to != undefined) && (serve_time != undefined) && (to_time < serve_time)) ) {
                for(var i=0;i<$scope.updateOrderDetail.length;i++){
                    if($scope.updateOrderDetail[i].ID===order_detail_id){
                        $scope.updateOrderDetail.splice(i, 1);
                    }
                }
                vm.confirmClass[order_detail_id] = 'btn-info';
                vm.updateRequest[request_id] = false;
                vm.serveDetailInvalid[order_detail_id] = true;
            }
            else{
                vm.serveDetailInvalid[order_detail_id] = false;
            }
        }

        
        
        $scope.checkServeValidation = function(request_id, order_detail_id, status){
            var from = $scope.request_from[order_detail_id];
            var serve_at = $scope.confirmed_meal_time[order_detail_id];
            var to = $scope.request_to[order_detail_id];

            var from_time = $filter('date')(new Date(from), 'HH:mm');
            var to_time = $filter('date')(new Date(to), 'HH:mm');
            var serve_time = $filter('date')(new Date(serve_at), 'HH:mm');
            
            if ( (status == false) || (from > to) || ((from != undefined) && (serve_time != undefined) && (from_time > serve_time)) || ((to != undefined) && (serve_time != undefined) && (to_time < serve_time)) ) {
                for(var i=0;i<$scope.updateOrderDetail.length;i++){
                    if($scope.updateOrderDetail[i].ID===order_detail_id){
                        $scope.updateOrderDetail.splice(i, 1);
                    }
                }
                vm.confirmClass[order_detail_id] = 'btn-info';
                vm.updateRequest[request_id] = false;
                vm.serveDetailInvalid[order_detail_id] = true;
            }
            else{
                vm.serveDetailInvalid[order_detail_id] = false;
            }
        }

        $scope.autoMaxServing = function(request_id, order_detail_id, status){
            if ( angular.element('.min_manually_'+order_detail_id).hasClass('min_manually')  && angular.element('.max_manually_'+order_detail_id).hasClass('max_manually') ) {
                var request_min_servings = $scope.request_min_servings[order_detail_id];
                $scope.request_max_servings[order_detail_id] = parseInt(request_min_servings) + parseInt(vm.request_serving_delta);
            }
        }

        $scope.checkMaxServing = function(request_id, order_detail_id, status){
            angular.element('.min_manually_'+order_detail_id).removeClass('min_manually'); 
            angular.element('.max_manually_'+order_detail_id).removeClass('max_manually');
        }



        vm.mini_serving = {};
        vm.serveDeadlineInvalid = {};
        $scope.checkDeadlineValidation = function(request_id, order_detail_id, status){
            var serveDate = vm.mini_serving[order_detail_id];
            var request_deadline = $scope.request_deadline[order_detail_id];
            if ( status != false ) {
                vm.serveDeadlineInvalid[order_detail_id] = false;
            }
            else{
                vm.serveDeadlineInvalid[order_detail_id] = true;
            }
            console.log(request_deadline);
            if ( request_deadline != null) {
                var serve_at = $filter('date')(new Date(serveDate), 'yyyy-MM-dd HH:mm');
                var serve_deadline = $filter('date')(new Date(request_deadline), 'yyyy-MM-dd HH:mm');
                if(serve_at < serve_deadline){
                    for(var i=0;i<$scope.updateOrderDetail.length;i++){
                        if($scope.updateOrderDetail[i].ID===order_detail_id){
                            $scope.updateOrderDetail.splice(i, 1);
                        }
                    }
                    vm.confirmClass[order_detail_id] = 'btn-info';
                    vm.updateRequest[request_id] = false;
                    vm.serveDeadlineInvalid[order_detail_id] = true;
                }
                else{
                    vm.serveDeadlineInvalid[order_detail_id] = false;
                }
            }
        }


        $scope.more_ingredient = {}
        $scope.ingredients = [];
        $scope.addIngredient = function(ID_request_menu, order_detail_id) {
            vm.ing_exist[order_detail_id] = false;
            var check = 1;
            var ingredient_name = $scope.more_ingredient.ingredient.name;
            var ingredient_id = $scope.more_ingredient.ingredient.ID;
            var amount = $scope.more_ingredient.amount;
            if (amount) { var amount = amount; }else{ var amount = ''; }
            var unit = $scope.more_ingredient.unit;
            if (unit) { var unit = unit; }else{ var unit = ''; }


            angular.forEach($scope.mealIngredientDetails[ID_request_menu], function(value, key){
                if ( value.ID_ingredient === ingredient_id && value.status_confirmed != 'D' ) {
                    vm.ing_exist[order_detail_id] = true;
                    check = 0;
                    return false;
                }
            });
            if(check == 1) {
                if(ingredient_id && ID_request_menu) {

                    for(var i=0;i<$scope.ingredients.length;i++){
                        if($scope.ingredients[i].ID_ingredient === ingredient_id && $scope.ingredients[i].order_detail_id === order_detail_id){
                            vm.ing_exist[order_detail_id] = true;
                            return false;
                        }
                    }

                    var obj = { 
                        ID: '',
                        ID_request_menu: ID_request_menu, 
                        name: ingredient_name, 
                        ID_ingredient: ingredient_id, 
                        amount: amount, 
                        unit: unit,
                        status_confirmed: 'C',
                        order_detail_id: order_detail_id
                    };
                    $scope.ingredients.push(obj);
                    $scope.more_ingredient.ingredient = null;
                    $scope.more_ingredient.amount = '';
                    $scope.more_ingredient.unit = '';
                }     
            }
            console.log($scope.ingredients);
        } 

        $scope.removeIngredient = function(ingredient, index){
            ingredient.splice(index, 1);
        }

        $scope.mySplit = function(string, nb) {
            var array = string.split('<br>');
            return array[nb];
        }

        $scope.messageSplit = function(string, nb) {
            var array = string.split('<br>');
            return array[nb];
        }


        $scope.confirmed_meal_name = {};
        $scope.confirmed_meal_price = {};
        $scope.confirmed_meal_time = {};
        $scope.confirmed_meal_date = {};
        $scope.order_detail_comment = {};
        $scope.order_detail_precomment = {};
        $scope.updateMeal = [];
        $scope.updateOrderDetail = [];
        $scope.request_params = [];

        var request_params = {};
        $scope.request_min_servings = {};
        $scope.request_max_servings = {};
        $scope.request_from = {};
        $scope.request_to = {};
        $scope.free_serving = {};
        $scope.request_deadline = {};
        vm.getOrederDetailLength = {};
        vm.orderReadOnly = {};



        $scope.reConfirmMealName = function(meal_id, order_detail_id, status, requestId){
            angular.element('.orderdetail_'+order_detail_id).removeClass("strikethrough");
            vm.orderReadOnly[order_detail_id] = false;
        }

        $scope.confirmMealName = function(meal_id, order_detail_id, status, requestId){
            var request_min_servings = $scope.request_min_servings[order_detail_id];
            var request_max_servings = $scope.request_max_servings [order_detail_id];
            var from = $scope.request_from[order_detail_id];
            var request_from = ((from)) ? $filter('date')(new Date(from), 'HH:mm:ss') : '';
            var to = $scope.request_to[order_detail_id];
            var request_to = ((to)) ? $filter('date')(new Date(to), 'HH:mm:ss') : '';
            var request_free_every = $scope.free_serving[order_detail_id];
            var deadline = $scope.request_deadline[order_detail_id];
            var request_deadline = ((deadline)) ? $filter('date')(new Date(deadline), 'yyyy-MM-dd')+' '+$filter('date')(new Date(deadline), 'HH:mm:ss') : '';
            
            if ( status == 3 ) {
                angular.element('.orderdetail_'+order_detail_id).addClass("strikethrough");
                vm.orderReadOnly[order_detail_id] = true;
            }
            else{
                angular.element('.orderdetail_'+order_detail_id).removeClass("strikethrough");
                vm.orderReadOnly[order_detail_id] = false;
            }

            var currentIdExist = 0;
            if ( $scope.updateOrderDetail ) {
                for(var i=0;i<$scope.updateOrderDetail.length;i++){
                    if($scope.updateOrderDetail[i].requestId===requestId){
                       currentIdExist = 1;
                    }
                }
            }

            if ( currentIdExist == 0 ) {
                $scope.updateOrderDetail = [];
            }

            request_params = {
                ID_orders_detail: order_detail_id,
                request_from: request_from,
                request_to: request_to,
                request_min_servings: request_min_servings,
                request_max_servings: request_max_servings,
                request_deadline: request_deadline,
                request_free_every: request_free_every
            };

            for(var i=0;i<$scope.request_params.length;i++){
                if($scope.request_params[i].ID_orders_detail===order_detail_id){
                    $scope.request_params.splice(i, 1);
                }
            }
            $scope.request_params.push(request_params);

            var serve_date = $scope.confirmed_meal_date[order_detail_id];
            var serve_time = $scope.confirmed_meal_time[order_detail_id];
            var serve_at = $filter('date')(new Date(serve_date), 'yyyy-MM-dd')+' '+$filter('date')(new Date(serve_time), 'HH:mm:ss');
        
            var meal_name = $scope.confirmed_meal_name[meal_id];
            var meal_price = $scope.confirmed_meal_price[order_detail_id];
            var order_detail_precomment = $scope.order_detail_precomment[order_detail_id];
            var order_detail_comment = $scope.order_detail_comment[order_detail_id];
            order_detail_comment = order_detail_comment+'<br>'+order_detail_precomment;
            

            for(var i=0;i<$scope.updateMeal.length;i++){
                if($scope.updateMeal[i].ID===meal_id){
                    $scope.updateMeal.splice(i, 1);
                }
            }
            for(var i=0;i<$scope.updateOrderDetail.length;i++){
                if($scope.updateOrderDetail[i].ID===order_detail_id){
                    $scope.updateOrderDetail.splice(i, 1);
                }
            }

            var mealArray = {ID: meal_id, name: meal_name};
            var orderDetailArray = {ID: order_detail_id, price: meal_price, serve_at: serve_at, comment: order_detail_comment, status: status, requestId: requestId};
            $scope.updateMeal.push(mealArray);
            $scope.updateOrderDetail.push(orderDetailArray);

            if ($scope.isCollapsed[order_detail_id]) {
                $scope.isCollapsed.length = 0;
                $scope.checkOpen[order_detail_id] = 0;
            }
            $scope.more_ingredient.ingredient = null;
            $scope.more_ingredient.amount = '';
            $scope.more_ingredient.unit = '';

            var count = 0
            var countChecked = 0;
            var countcancel = 0;
            for(var i=0;i<$scope.updateOrderDetail.length;i++){
                countChecked++;
                if($scope.updateOrderDetail[i].status != 3){
                    count++;
                }
                else{
                    countcancel++;
                }
            }

            if ( (countcancel != vm.allgetOrederDetailLength[requestId] && vm.allgetOrederDetailLength[requestId] == countChecked) || (count > 0 && vm.getOrederDetailLength[requestId] == countChecked) ) {
                vm.updateRequest[requestId] = true; 
            }
            else{
                vm.updateRequest[requestId] = false; 
            }
        }

        $scope.requestOrderDetailStatusFilter = function (request) { 
            if (request.status != 3 ) {
              return request;
            }
        };

        $scope.serving = {};
        vm.saveLoading = [];
        vm.confirmRequest_comment = [];
        $scope.saveChanges = function(index, request_id){
            var orderDetailObj = $scope.updateOrderDetail;
            
            var count = 0
            var countChecked = 0;
            for(var i=0;i<orderDetailObj.length;i++){
                countChecked++;
                if(orderDetailObj[i].status != 3){
                    count++;
                }
            }

            if ( count <= 0 && vm.getOrederDetailLength[request_id] != countChecked) {
                return false; 
            }

            var currentLanguage = localStorage.getItem('current_language_code');
            vm.saveLoading[index] = true;
            var newIngredientsObj = $scope.ingredients;
            var updateIngredientsObj = $scope.updateIngredientDetail;
            var requestParamsObj = $scope.request_params;
            var mealObj = $scope.updateMeal;
            var obj = {
                request_id: request_id,
                lang: currentLanguage,
                comment: vm.confirmRequest_comment[request_id],
                request_params: requestParamsObj, 
                meal: mealObj, 
                orders_detail: orderDetailObj,
                new_ingredients: newIngredientsObj,
                update_ingredients: updateIngredientsObj
            };
            var updateRequestDetails = obj;
            $scope.requestParamsObj = [];
            $scope.updateMeal = [];
            $scope.updateOrderDetail = [];
            $scope.ingredients = [];
            $scope.updateIngredientDetail = [];
            obj = {};
            if (updateRequestDetails){ var updateRequestDetails = angular.toJson(updateRequestDetails); }
            else{ var updateRequestDetails = []; }

            return ProfileService.saveChanges(updateRequestDetails).then(function(response){
                vm.saveLoading[index] = false;
                angular.element('#requestDetail'+request_id).modal('hide');
                angular.element('.modal-backdrop').remove();
                if (response.message == 'status changed') {
                    getRestaurantRequest();
                    getPendingRestaurantRequest();
                    getConfirmRestaurantRequest();
                    getCancelRestaurantRequest();
                    restaurantCountUnreadRequest();
                    $scope.requestTab = response.openTab;
                }
                else if (response.message == 'success') {
                    getRestaurantRequest();
                    getPendingRestaurantRequest();
                    getConfirmRestaurantRequest();
                    getCancelRestaurantRequest();
                    restaurantCountUnreadRequest();
                    $scope.requestTab = response.openTab;
                }
                else{
                    var responseMsg = 'failed';
                    vm.showMsg = true;
                    vm.responseMsg = responseMsg;
                    $timeout(function (){ vm.showMsg = false; }, 5000);
                }
                vm.updateRequest[request_id] = false;
            });
        }


        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };


        vm.checkUnread = [];
        function changeStatusAsRead(requestId, status){
            ProfileService.changeStatusAsRead(requestId).then(function(response){
                if (status == 'N' && vm.checkUnread[requestId] == 'confirm_name' && vm.new_unread > 0) {
                    vm.new_unread = parseInt(vm.new_unread) - 1;
                    vm.checkUnread[requestId] = '';
                }
                else if (status == 'C' && vm.checkUnread[requestId] == 'confirm_name' && vm.confirm_unread > 0) {
                    vm.confirm_unread = parseInt(vm.confirm_unread) - 1;
                    vm.checkUnread[requestId] = '';
                }
                else if (status == 'CA' && vm.checkUnread[requestId] == 'confirm_name' && vm.cancel_unread > 0) { 
                    vm.cancel_unread = parseInt(vm.cancel_unread) - 1;
                    vm.checkUnread[requestId] = '';
                }
            },function(error){

            });
        }
    }
})();
