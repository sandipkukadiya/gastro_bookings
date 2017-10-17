/**
 * Created by yonatom on 8/31/16.
 */

(function () {
    'use strict';

  angular
      .module('app.client')
      .config(function(tagsInputConfigProvider) {
        tagsInputConfigProvider.setActiveInterpolation('tagsInput', { placeholder: true });
      })
      .controller('ClientDashboardController', ClientDashboardController);
    /*@ngNoInject*/
  function ClientDashboardController($rootScope,$scope,$timeout,ClientService, $state, $stateParams, $translate, $interval, $filter, $geolocation, $sce, $location, appConstant) {
    var client_percentage = 0;
    var commision_split = 0;

    var vm = this;
    $rootScope.currentState = "dashboard";
    vm.currentTab = $rootScope.currentTab;
    vm.friendCircle = [];
    vm.quizSetting = [];
    vm.quizSettings = [];
    vm.quiz = [];
    vm.quizClientAll = [];
    vm.quizClient = [];
    vm.quizResult = [];
    vm.sum_price = [];
    vm.quiz_prize0 = [];
    vm.quiz_prize = [];
    vm.currency = "";
    vm.isNextQuiz = false;
    vm.isNextStep = false;
    vm.percentage_discount = 0;
    vm.selectedAnswer = "";
    vm.strDayQuestion = "";
    vm.strBonusQuestion = "";
    vm.realQuestion = [];
    vm.q_testStart = false;
    vm.quiztime = 0;
    vm.currentTime = "";
    vm.remainHours = 0;
    vm.nextTime = 0;
    vm.ordernumbers = 0;
    vm.otherCircles = [];
    vm.friendRequests = [];
    vm.loadingFriendRequests = false;
    vm.sentFriendRequests = [];
    vm.friends = [];
    vm.connectSuccess = "";
    vm.respondToFriendRequestStatus = "";
    vm.doFade = false;
    vm.orders = [];
    vm.currentLanguage = "";
    vm.ordersDetail = [];
    vm.loading = false;
    vm.loadingBookingHistory = false;
    vm.loadingSaveChanges = false;
    vm.isOrderEmpty = false;
    vm.isOrderDetailEmpty =false;
    vm.currentPage = 1;
    vm.itemsPerPage = 5;
    vm.totalItems = 0;
    vm.currency = 'Kč';
    vm.statusNames = ['CLIENT.ORDERED', 'CLIENT.SENT', 'CLIENT.CONFIRMED', 'CLIENT.CANCELED', 'CLIENT.FINALIZED', 'CLIENT.NEW'];
    vm.sortStatus = {
      "status": {
        "new": 0,
        "sent": 0,
        "confirmed": 0,
        "canceled": 1,
        "finalized": 0,
        "all": 0
      }
    };
    vm.isDayOrBonusTest = false;
    vm.isCanDayquestion = false;
    vm.isCanBonuseQuestion = false;
    vm.isBonusQuiz = false;
    vm.sendRequestLoading = false;

    vm.placeholder = 'CLIENT.ENTER FRIEND NAME';

    vm.language = {
      "ENG" : { "language" : "English", "short" : "ENG"},
      "CZE" : { "language" : "Česky", "short" : "CZE" }
    };
    vm.myDetailsSuccess = "";
    vm.myDetailsError = "";

    vm.getFriends = getFriends;
    vm.getFriendRequests = getFriendRequests;
    vm.getFriendCircle = getFriendCircle;
    vm.getSetting = getSetting;
    vm.startQuiz = startQuiz;
    vm.redirect = redirect;
    vm.getQuizClient = getQuizClient;
    vm.orders_sum_price_between_dates = orders_sum_price_between_dates;
    vm.changeDlg = changeDlg;
    vm.sendEmail = sendEmail;
    vm.nextQuestion = nextQuestion;

    vm.getOtherCircles = getOtherCircles;
    vm.respondToFriendRequest = respondToFriendRequest;
    vm.addFriends = addFriends;
    vm.getbBookings = getbBookings;
    vm.changeOrderDetailStatus = changeOrderDetailStatus;
    vm.changeOrderStatus = changeOrderStatus;
    vm.saveChanges = saveChanges;
    vm.respond = respond;
    vm.loading = false;
    vm.gotoRestaurantDetail = gotoRestaurantDetail;
    vm.printOrder = printOrder;
    vm.dbTest = dbTest;
    vm.getSumPrize = getSumPrize;
    vm.saveClient = saveClient;
    vm.closeAlert = closeAlert;
    vm.resize = resize;

    vm.bReceiveAllData = [];

    // patron
    vm.pat_patron_only = false;
    vm.pat_business = '0';
    vm.pat_distance = '0';
    vm.business_type = [];
    vm.business_type_all = [];
    vm.totalItemsHistory = 0;
    vm.totalItemsActive = 0;
    vm.totalItemsAvailable =0;
    vm.currentClientId =0;
    vm.clientLocation = "";
    vm.clientLang = "";
    vm.currentTab = $rootScope.currentTab;

    vm.patronages = patronage;
    vm.activePatronages = [];
    vm.historyPatronages = [];
    vm.bReceiveAllData = [];

    vm.getAllpatronage = getAllpatronage;
    vm.getActivePatronage = getActivePatronage;
    vm.getHistoryPatronage = getHistoryPatronage;
    vm.getBillingPatronage = getBillingPatronage;
    vm.getRestaurantType = getRestaurantType;
    vm.changeCurrentPage = changeCurrentPage;
    vm.sendAmount = sendAmount;
    vm.patronActivate = patronActivate;
    vm.removeActive = removeActive;

    getRestaurantType();
    // end patron

    //remuneration

    vm.commission = 0;
    vm.client_commission = 0;
    vm.member_commission = 0;
    vm.total_book = 0;
    vm.client_book = 0;
    vm.member_book = 0;
    vm.total_spending = 0;
    vm.client_spending = 0;
    vm.member_spending = 0;
    vm.total = 0;
    vm.client = 0;
    vm.member = 0;
    vm.getPaied_price = 0;
    vm.min_remuneration = 0;
    vm.friend_commission = 0;
    vm.friend_spending = 0;
    vm.friend_book = 0;
    vm.order_payment = [];
    vm.billing = [];
    vm.firstMembers = [];
    vm.pay_date = new Date();
    vm.status = true;
    vm.IamMember="CLIENT.I AM A MEMBER";
    vm.AccountNumber = "CLIENT.ACCOUNT NUMBER";
    vm.BankCode = "CLIENT.BANK CODE";
    vm.Remunerations = "CLIENT.REMUNERATIONS";
    vm.Bookings = "CLIENT.BOOKINGS";
    vm.Spendings = "CLIENT.SPENDINGS";
    vm.Billing = "CLIENT.BILLING";
    vm.Total = "CLIENT.TOTAL";
    vm.Your = "CLIENT.YOUR";
    vm.Getpaid = "CLIENT.GETPAID";
    vm.Unpaid = "CLIENT.UNPAID";
    vm.Members = "CLIENT.MEMBER_SMALL";
    vm.ConnectionString = "CLIENT.CONNECTIONsting";

    vm.getOrders = getOrders;
    vm.getPaied = getPaied;
    vm.get_paid_date = get_paid_date;
    vm.last_pay_date = "";

    vm.currency_short = ' Kč';

    get_paid_date();
    // end remuneration

    getQuizClient();
    getQuizPrize();
    getSumPrice();

    getbBookings();
    // getOrders();
    getFriendCircle();
    getOtherCircles();
    getFriendRequests();
    getSentFriendRequests();
    getCurrentClient();
    vm.updateNoDiet = updateNoDiet;

    // Request Meal
    vm.getRequests = getRequests;
    vm.getConfirmRequests = getConfirmRequests;
    vm.getCancelRequests = getCancelRequests;
    vm.cancelRequest = cancelRequest;
    vm.printRequest = printRequest;
    vm.changeStatusAsRead = changeStatusAsRead;
    vm.countMissingBooking = countMissingBooking;
    vm.currentUserCurrency = currentUserCurrency;
    vm.countUnreadRequest = countUnreadRequest;
    vm.saveClientPhone = saveClientPhone;
    vm.requestCurrentPage = 1;
    vm.totalrequests = 0;
    vm.requestPerPage = 5;
    vm.confirmrequestCurrentPage = 1;
    vm.confirmtotalrequests = 0;
    vm.confirmrequestPerPage = 5;
    vm.cancelrequestCurrentPage = 1;
    vm.canceltotalrequests = 0;
    vm.cancelrequestPerPage = 5;

    getMenuList();
    getIngredientList();
    getRestaurantList();
    getRequests();
    getConfirmRequests();
    getCancelRequests();
    countUnreadRequest();
    countMissingBooking();
    currentUserCurrency();
    // Request Meal


    // isDayandBonusQuestion();

    var requestDataBack = {
        "serveDate": ''
    };

    if ( localStorage.getItem('requestData') ) {
        var requestData = JSON.parse(localStorage.getItem('requestData'));
        var serveTimeBack = requestData.serveTime;
        var serveDateBack =   requestData.serveDate;
        var requestDataBack = {
            "serveDate": serveDateBack
        };

        $scope.submitRequest = [];
        $scope.request = [];
        var serve_at = new Date(requestData.serveDate);
        if (requestData.serveTime && requestData.serveTime != '00:00:00') {
            var stringTime = requestData.serveTime;
            var dateElements = stringTime.split(':');
            var getTime = new Date();
            getTime.setHours(dateElements[0]);
            getTime.setMinutes(dateElements[1]);
            $scope.request.request_time = new Date(getTime);             
        }
        else{
            $scope.request.request_time = serve_at;
        }

        if ( requestData.mealname && requestData.mealname != '' ) {
            $scope.request.request_mealname = requestData.mealname;
        }

        $scope.request.request_date = serve_at;
        $timeout(function() {
            angular.element(document.querySelector('#requestSection a')).click();
            $scope.requestTab = "addRequest";
        }, 500);

        var item = requestData.restaurantData;
        if ( requestData.restaurantData ) {
            if (item.street && item.city) { var restaurantAddress = item.street+', '+item.city; }
            else if (item.street) { var restaurantAddress = item.street; }
            else if (item.city) { var restaurantAddress = item.city; }
            else { var restaurantAddress = ''; }
            $scope.submitRequest.new_address = restaurantAddress;
            $scope.submitRequest.new_restaurant = item;
            $scope.isDisabled = false;
            if (restaurantAddress) {
                $scope.isDisabled = true;
            }
        }

        localStorage.removeItem("requestData");
    }

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        localStorage.setItem("requestDataBack", JSON.stringify(requestDataBack));
    });


    function saveClientPhone(isValid){
        if (isValid)
        {   
            vm.saveingPhoneNo = true;
            vm.myDetails.ID_diet = (vm.myDetails.ID_diet == '-1') ? null : vm.myDetails.ID_diet;
            ClientService.updateClient(vm.myDetails).then(function(response){
                angular.element('#phoneModal').modal('hide');
                vm.myDetails.password = "";
                vm.myDetails.confirm_password = "";
                vm.saveingPhoneNo = false;

                if (vm.myDetails.phone) {
                    vm.existPhoneNo = true;
                }
                else{
                    vm.existPhoneNo = true;
                }
            });
        }
    }



    $rootScope.$on('$translateChangeSuccess', function (a) {
      var currentLanguage = localStorage.getItem('current_language');

      getMenuList();
      getIngredientList();

      vm.quizSetting = vm.quizSettings[currentLanguage];
      vm.business_type = vm.business_type_all[currentLanguage];
      if (vm.quizSetting) {
        vm.quiztime = vm.quizSetting.quiz_delay_hrs;
        vm.currency = vm.quizSetting.currency_short;

        // vm.sum_price.sum_price = vm.sum_price[currentLanguage].sum_price;
        // vm.sum_price.sum_price_for_bonus = vm.sum_price[currentLanguage].sum_price_for_bonus;
        // vm.sum_price.total_bonus_quiz_count = Math.floor(vm.sum_price[currentLanguage].sum_price_for_bonus / vm.quizSetting.quiz_bonus_order);
        // vm.sum_price.bonus_quiz_count = vm.sum_price.total_bonus_quiz_count - vm.sum_price[currentLanguage].n_bonus_quiz_count;

        vm.quizClient = vm.quizClientAll[currentLanguage];

        vm.quiz_prize = vm.quiz_prize0[currentLanguage];

        vm.bReceiveAllData.quizQuiz = true;

        // isDayandBonusQuestion();
        orders_sum_price_between_dates();
      }
    });

    // Request Meal

    function currentUserCurrency() {
        ClientService.currentUserCurrency().then(function(response){
            vm.currentUserCurrency = response;
        },function(error){

        });
    }

    vm.refreshRequests = function(){
        countUnreadRequest();
        getConfirmRequests();
        getCancelRequests();
        getRequests();
        countMissingBooking();
    }

    /*...Custom Filters.......*/
    $scope.requestTab = "newRequests"
    $scope.show = function(arg) {
        $scope.requestTab = arg;
        if ( arg == 'addRequest' ) {
            if ( $('div').hasClass('has-error') ) {
                $('div').removeClass('has-error');
            }
        }
    }

    vm.openCalendar = function(){
        vm.date_picker.open = true;
    };

    vm.date_picker = {
        date: new Date(),
        datepickerOptions: {
            showWeeks: false,
            minDate: moment().add(-1, 'days').toDate(),
            startingDay: 1
        }
    };

    $scope.statusFilter = function (request) { 
        if (request.status == 'S' || request.status == 'N') {
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
        if (request.status == 'N' || request.status == 'S') {
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
            return
        }
        return dateOut;
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

    $scope.orderByDateFilter = function(getRequest) {
        var date = new Date(getRequest.orders.request_orders_detail.serve_at);
        return date;
    };

    function randomFixedInteger(length) {
        return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
    }

    $scope.ingredients = [];
    vm.ing_exist = false;
    function getIngredient(){
        vm.ing_exist = false;
        var ingredient_name = $scope.request_ingredient.ingredient.name;
        var ingredient_id = $scope.request_ingredient.ingredient.ID;
        var amount = $scope.request_ingredient.amount;
        if (amount) { var amount = amount; }else{ var amount = ''; }
        var unit = $scope.request_ingredient.unit;
        if (unit) { var unit = unit; }else{ var unit = ''; }
        if(ingredient_id) {
            for(var i=0;i<$scope.ingredients.length;i++){
                if($scope.ingredients[i].ID_ingredient === ingredient_id){
                    vm.ing_exist = true;
                    return false;
                }
            }
            var obj = { name: ingredient_name, ID_ingredient: ingredient_id, amount: amount, unit: unit };
            $scope.ingredients.push(obj);
            $scope.request_ingredient.ingredient = null;
            $scope.request_ingredient.amount = '';
            $scope.request_ingredient.unit = '';
        }
    }

    function getIngredientList(){
        var currentLanguage = localStorage.getItem('current_language_code');

        return ClientService.getIngredientList(currentLanguage).then(function(response){
            $scope.ingredientList = response.ingredients;
        });
    }

    $scope.addIngredient = function() {
        getIngredient();
    } 

    $scope.removeIngredient = function(ingredient, index){
        ingredient.splice(index, 1);
    }


    var req_number = randomFixedInteger(6);
    $scope.meals = [];
    $scope.mealIngredientss = [];
    $scope.addMeal = function() {
        if ( $scope.request.request_side_dish == true ) { var side_dish = 'Y'; }
        else { var side_dish = 'N'; }
        var currentLanguage = localStorage.getItem('current_language_code');
        $scope.requestNumber = req_number;
        var meal = $scope.request;
        $scope.mealIngredientss = $scope.ingredients;
        $scope.ingredients = [];
        var ingredientsDetails = $scope.mealIngredientss;
        var sereve_date = $scope.request.request_date;
        var sereve_time = $scope.request.request_time;
        var serve_at = $filter('date')(new Date(sereve_date), 'yyyy-MM-dd')+' '+$filter('date')(new Date(sereve_time), 'HH:mm:ss');
        if ($scope.request.request_friend_name) { var friend_id = $scope.request.request_friend_name; }
        else{ var friend_id = null; }

        if ( vm.currentUserCurrency != '' ) {
            var currency = vm.currentUserCurrency;
        }
        else{
            var currency = 'Kč';
        }

        if(meal) {
            var obj = {
               lang: currentLanguage,
               currency: currency,
               sereve_date: $filter('date')(new Date(sereve_date), 'yyyy-MM-dd'),
               serve_time: $filter('date')(new Date(sereve_time), 'HH:mm'),
               serve_at: serve_at,
               request_menu_name: $scope.request.request_mealname,
               x_number: $scope.request.request_meal_number,
               comment: $scope.request.request_description,
               friend_id: friend_id,
               price: $scope.request.request_price,
               side_dish: side_dish,
               ingredientsDetails: ingredientsDetails
            }
            $scope.meals.push(obj);
            $scope.request.request_mealname = null;
            
            $scope.request_ingredients_details = false;
            $scope.request.request_description = null;
            $scope.request.request_side_dish = false;
            $scope.request.request_price = null;
            $scope.request.request_friend_name = null;
            $scope.request_ingredient.ingredient = null;
            $scope.request_ingredient.amount = '';
            $scope.request_ingredient.unit = '';
        }
    }

    $scope.mealDetails= function(index){
        $scope.mealDetail = $scope.meals[index];
    }

    $scope.invoiceTotal = parseFloat('0.00');
    $scope.setTotals = function(meal){
        if (meal.price){
            $scope.total = parseFloat(meal.price);
        }
        else{
            $scope.total = parseFloat('0.00');
        }
        if (meal.x_number) {
            $scope.total = $scope.total * meal.x_number;
        }
        $scope.invoiceTotal += $scope.total;
        $scope.priceTotal = $scope.invoiceTotal.toFixed(2);
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

    function getMenuList(){
        var currentLanguage = localStorage.getItem('current_language_code');

        return ClientService.getMenuList(currentLanguage).then(function(response){
            $scope.menuList = response.menu_lists;
        });
    }

    $scope.getMealPrice = function($item, $model, $label) {
        var meal_price = $item.price;
    };

    $scope.checkMealName= function(){
        if ($scope.isPriceDisabled) {
            $scope.isPriceDisabled = false;
            $scope.request.request_price = null;
        }
    };

    $scope.removeMeal = function(meal, index){
        $scope.mealDetail = meal[index];

        var mealPrice = $scope.mealDetail.price;
        if (mealPrice){
            $scope.total = parseFloat($scope.invoiceTotal);
            if ($scope.mealDetail.x_number) {
                $scope.invoiceTotal = $scope.total - mealPrice * $scope.mealDetail.x_number;
            }
            else{
                $scope.invoiceTotal = $scope.total - mealPrice;
            }
        }
        meal.splice(index, 1);
        if ($scope.meals.length == 0) {
            $scope.request.request_side_dish = null;
        }
    }

    function getRestaurantList(){
        return ClientService.getRestaurantList().then(function(response){
            console.log(response);
            $scope.restaurantList = response.restaurants;
        });
    }

    $scope.openingHours = [];
    vm.checkOpeningHoursValid = false;
    vm.checkHoursSendValid = true;
    vm.isRestaurant = false;
    $scope.isRequired = true;
    $scope.getRestaurantAddress = function($item, $model, $label) {
        vm.checkHoursSendValid = false;
        if ($item.street && $item.city) { var restaurantAddress = $item.street+', '+$item.city; }
        else if ($item.street) { var restaurantAddress = $item.street; }
        else if ($item.city) { var restaurantAddress = $item.city; }
        else { var restaurantAddress = ''; }
        $scope.submitRequest.new_address = restaurantAddress;
        $scope.isDisabled = false;
        // $scope.isRequired = false;
        if (restaurantAddress) {
            $scope.isDisabled = true;
        }

        if ( $item.id != '' ) {
            return ClientService.getRestaurantOpeningHours($item.id).then(function(response){
                $scope.openingHours = response;
                vm.isRestaurant = true;
            
                var now = new Date();
                var weekday = new Array(7);
                weekday[0] = "sunday";
                weekday[1] = "monday";
                weekday[2] = "tuesday";
                weekday[3] = "wednesday";
                weekday[4] = "thursday";
                weekday[5] = "friday";
                weekday[6] = "saturday";
                weekday[7] = "sunday";
                    
                vm.openingHours = response;
                var sereve_time = $filter('date')(new Date(sereve_time), 'Hmm'); 
                var nowDay = weekday[now.getDay()];

                var m_starting_time = $scope.openingHours[nowDay].m_starting_time; 
                var m_ending_time = $scope.openingHours[nowDay].m_ending_time; 
                if ( m_starting_time == '' || m_ending_time == '' ) {
                    vm.r_open = false;
                    vm.m_time = false;
                    vm.m_starting_time = 'Closed';
                    vm.m_ending_time = 'Closed';
                }
                else{ 
                    vm.r_open = true;
                    vm.m_time = true;

                    vm.m_starting_time = m_starting_time;
                    vm.m_ending_time = m_ending_time;
                }

                var a_starting_time = $scope.openingHours[nowDay].a_starting_time;
                var a_ending_time = $scope.openingHours[nowDay].a_ending_time; 
                if ( a_starting_time == '' || a_starting_time == '' ) {
                    vm.a_time = false;
                    vm.a_starting_time = 'Closed';
                    vm.a_ending_time = 'Closed';
                }
                else{ 
                    vm.a_time = true;
                    vm.a_starting_time = a_starting_time;
                    vm.a_ending_time = a_ending_time;
                }


                var tDay = weekday[now.getDay()+1];
                var t_m_starting_time = $scope.openingHours[tDay].m_starting_time; 
                var t_m_ending_time = $scope.openingHours[tDay].m_ending_time; 
                if ( m_starting_time == '' || m_ending_time == '' ) {
                    vm.t_m_time = false;
                    vm.t_m_starting_time = 'Closed';
                    vm.t_m_ending_time = 'Closed';
                }
                else{ 
                    vm.t_m_time = true;
                    vm.t_m_starting_time = t_m_starting_time;
                    vm.t_m_ending_time = t_m_ending_time;
                }

                var t_a_starting_time = $scope.openingHours[tDay].a_starting_time;
                var t_a_ending_time = $scope.openingHours[tDay].a_ending_time; 
                if ( a_starting_time == '' || a_starting_time == '' ) {
                    vm.t_a_time = false;
                    vm.t_a_starting_time = 'Closed';
                    vm.t_a_ending_time = 'Closed';
                }
                else{ 
                    vm.t_a_time = true;
                    vm.t_a_starting_time = t_a_starting_time;
                    vm.t_a_ending_time = t_a_ending_time;
                }

                vm.checkHoursSendValid = true;
                if ( $scope.openingHours.length != 0 && $scope.meals ) {
                    angular.forEach($scope.meals, function(value, key){
                        var sereve_date = $scope.request.request_date;
                        var sereve_time = value.serve_time;

                        var d = new Date(sereve_date);
                        var n = weekday[d.getDay()];
                        sereve_time = sereve_time.split(":"); 
                        sereve_time = sereve_time.join(""); 
                        if ( $scope.openingHours[n] ) {
                            var m_starting_time = $scope.openingHours[n].m_starting_time; 
                            if ( m_starting_time ) {
                                m_starting_time = m_starting_time.split(":");
                                m_starting_time = m_starting_time.join("");
                            }

                            var m_ending_time = $scope.openingHours[n].m_ending_time; 
                            if ( m_ending_time ) {
                                m_ending_time = m_ending_time.split(":");
                                m_ending_time = m_ending_time.join("");
                            }

                            var a_starting_time = $scope.openingHours[n].a_starting_time;
                            if ( a_starting_time ) {
                                a_starting_time = a_starting_time.split(":");
                                a_starting_time = a_starting_time.join("");
                            }

                            var a_ending_time = $scope.openingHours[n].a_ending_time; 
                            if ( a_ending_time ) {
                                a_ending_time = a_ending_time.split(":");
                                a_ending_time = a_ending_time.join("");
                            }

                            
                            if ( ( parseInt(sereve_time) >= parseInt(m_starting_time) && parseInt(sereve_time) <= parseInt(m_ending_time) ) || ( parseInt(sereve_time) >= parseInt(a_starting_time) && parseInt(sereve_time) <= parseInt(a_ending_time) ) ) {
                                angular.element('.custom_meal_background_'+key).css('background-color', '#c1f475');
                            }
                            else {
                                if ( value.side_dish == 'N' ) {
                                    angular.element('.custom_meal_background_'+key).css('background-color', '#b3282e');
                                    vm.checkHoursSendValid = false;
                                }
                            }
                        }
                        
                    });
            
                }
            });
        }
    };

    $scope.checkRestaurantName = function(){
       if ($scope.isDisabled) {
           $scope.isDisabled = false;
           $scope.submitRequest.new_address = null;
       }
       $scope.isRequired = true;
       $scope.openingHours = [];
       vm.checkOpeningHoursValid = true;
       vm.checkHoursSendValid = true;
       angular.element('.custom_meal_background').css('background-color', '#c1f475');
    }

    $scope.checkOpeningHoursValidation = function(){
        if ( $scope.openingHours.length != 0) {
            var sereve_date = $scope.request.request_date;
            var sereve_time = $scope.request.request_time;

            var d = new Date(sereve_date);
            var weekday = new Array(7);
            weekday[0] = "sunday";
            weekday[1] = "monday";
            weekday[2] = "tuesday";
            weekday[3] = "wednesday";
            weekday[4] = "thursday";
            weekday[5] = "friday";
            weekday[6] = "saturday";
            var n = weekday[d.getDay()];
            var sereve_time = $filter('date')(new Date(sereve_time), 'Hmm'); 
            if ( $scope.openingHours[n] ) {
                var m_starting_time = $scope.openingHours[n].m_starting_time; 
                if ( m_starting_time ) {
                    m_starting_time = m_starting_time.split(":");
                    m_starting_time = m_starting_time.join("");
                }

                var m_ending_time = $scope.openingHours[n].m_ending_time; 
                if ( m_ending_time ) {
                    m_ending_time = m_ending_time.split(":");
                    m_ending_time = m_ending_time.join("");
                }

                var a_starting_time = $scope.openingHours[n].a_starting_time;
                if ( a_starting_time ) {
                    a_starting_time = a_starting_time.split(":");
                    a_starting_time = a_starting_time.join("");
                }

                var a_ending_time = $scope.openingHours[n].a_ending_time; 
                if ( a_ending_time ) {
                    a_ending_time = a_ending_time.split(":");
                    a_ending_time = a_ending_time.join("");
                }

                if ( ( parseInt(sereve_time) >= parseInt(m_starting_time) && parseInt(sereve_time) <= parseInt(m_ending_time) ) || ( parseInt(sereve_time) >= parseInt(a_starting_time) && parseInt(sereve_time) <= parseInt(a_ending_time) ) ) {
                    vm.checkOpeningHoursValid = true;
                }
                else {
                    vm.checkOpeningHoursValid = false;
                }
            }
        
            vm.checkHoursSendValid = true;
            if ( $scope.openingHours.length != 0 && $scope.meals ) {
                angular.forEach($scope.meals, function(value, key){
                    var sereve_date = $scope.request.request_date;
                    var sereve_time = value.serve_time;

                    var d = new Date(sereve_date);
                    var n = weekday[d.getDay()];
                    sereve_time = sereve_time.split(":"); 
                    sereve_time = sereve_time.join(""); 
                    if ( $scope.openingHours[n] ) {
                        var m_starting_time = $scope.openingHours[n].m_starting_time; 
                        if ( m_starting_time ) {
                            m_starting_time = m_starting_time.split(":");
                            m_starting_time = m_starting_time.join("");
                        }

                        var m_ending_time = $scope.openingHours[n].m_ending_time; 
                        if ( m_ending_time ) {
                            m_ending_time = m_ending_time.split(":");
                            m_ending_time = m_ending_time.join("");
                        }

                        var a_starting_time = $scope.openingHours[n].a_starting_time;
                        if ( a_starting_time ) {
                            a_starting_time = a_starting_time.split(":");
                            a_starting_time = a_starting_time.join("");
                        }

                        var a_ending_time = $scope.openingHours[n].a_ending_time; 
                        if ( a_ending_time ) {
                            a_ending_time = a_ending_time.split(":");
                            a_ending_time = a_ending_time.join("");
                        }

                        
                        if ( ( parseInt(sereve_time) >= parseInt(m_starting_time) && parseInt(sereve_time) <= parseInt(m_ending_time) ) || ( parseInt(sereve_time) >= parseInt(a_starting_time) && parseInt(sereve_time) <= parseInt(a_ending_time) ) ) {
                            angular.element('.custom_meal_background_'+key).css('background-color', '#c1f475');
                        }
                        else {
                            if ( value.side_dish == 'N' ) {
                                angular.element('.custom_meal_background_'+key).css('background-color', '#b3282e');
                                vm.checkHoursSendValid = false;
                            }
                        }
                    }
                });
            }
        }
    }


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


    vm.mealNameIsRequired = true;
    vm.mealNumberIsRequired = true;
    vm.resturantNameRequired = true;
    vm.isRequiredPerson = true;

    vm.clientNewRequestStatue = true;
    $scope.mealslist = [];
    $scope.sendRequest = function(){

        if ( vm.myDetails.phone == null || vm.myDetails.phone == '' ) {
            angular.element('#phoneModal').modal('show');
            return false;
        }

        vm.sendRequestLoading = true;
        $scope.mealslist = $scope.meals;
        $scope.meals = [];
        $scope.mealsDetail = [];
        var mealslist = $scope.mealslist;

        if ($scope.submitRequest.new_restaurant.id) {
            var restaurant_id = $scope.submitRequest.new_restaurant.id;
            var restaurant_name = $scope.submitRequest.new_restaurant.name;
        }
        else{
            var restaurant_id = null;
            var restaurant_name = $scope.submitRequest.new_restaurant;
        }

        var lang = localStorage.getItem('current_language_code');
        var obj = {
           lang: lang,
           req_number: req_number,
           new_restaurant_id: restaurant_id,
           new_restaurant_name: restaurant_name,
           new_address: $scope.submitRequest.new_address,
           comment: $scope.submitRequest.comment,
           persons: $scope.submitRequest.persons,
           mealslist: mealslist
        }
        var sendRequestDetails = obj;
        obj = {};
        vm.isSendREQUESTError = false;
        if (sendRequestDetails){ var sendRequestDetails = angular.toJson(sendRequestDetails) }else{ var sendRequestDetails = [] }
        return ClientService.sendRequest(sendRequestDetails).then(function(response){
            if (response.message == 'Request send') {
                $scope.invoiceTotal = parseFloat('0.00');
                vm.isRequestEmpty = false;
                getRequests();
                countMissingBooking();
                getConfirmRequests();
                getCancelRequests();
                countUnreadRequest();
                $scope.requestTab = "newRequests"
                vm.clientNewRequestStatue = true;
                $scope.request_ingredients_details = false;

                $scope.request.request_mealname = null;
                $scope.request.request_meal_number = null;
                $scope.request.request_friend_name = null;
                $scope.request.request_price = null;
                $scope.request.request_side_dish = null;
                $scope.request.request_description = null;
                $scope.submitRequest.new_restaurant = null;
                $scope.submitRequest.new_address = null;
                $scope.isDisabled = false;
                $scope.submitRequest.comment = null;
                $scope.submitRequest.persons = null;
                $scope.priceTotal = '';
            }
            else{
                vm.isSendREQUESTError = true;
            }
            vm.sendRequestLoading = false;
        });
    }


    
    function countMissingBooking() {
        ClientService.countMissingBooking().then(function(response){
            vm.countMissingBookingDetails = response;
        },function(error){

        });
    }

    $scope.pageChangeHandler = function() {
      getRequests();
    };

    function getRequests(){
        vm.reqLoading = true;
        vm.isRequestEmpty = false;
        ClientService.getRequests(vm.requestCurrentPage).then(function(response){
            if (response == 'Meal Request Not Found') {
                vm.isRequestEmpty = true;
            }
            vm.getRequests = response.data;
            vm.totalrequests = response.total;
            vm.requestPerPage = response.per_page;
            vm.requestCurrentPage = response.current_page;
            vm.reqLoading = false;
        },function(error){
            vm.reqLoading = false;
        });
    }

    $scope.confirmPageChangeHandler = function() {
      getConfirmRequests();
    };

    function getConfirmRequests(){
        vm.reqconfLoading = true;
        vm.isConfirmRequestEmpty = false;
        ClientService.getConfirmRequests(vm.confirmrequestCurrentPage).then(function(response){
            if (response == 'Meal Request Not Found') {
                vm.isConfirmRequestEmpty = true;
            }
            vm.getConfirmRequests = response.data;
            vm.confirmtotalrequests = response.total;
            vm.confirmrequestPerPage = response.per_page;
            vm.confirmrequestCurrentPage = response.current_page;
            vm.reqconfLoading = false;
        },function(error){
            vm.reqconfLoading = false;
        });
    }

    $scope.cancelPageChangeHandler = function() {
      getCancelRequests();
    };

    function getCancelRequests(){
        vm.reqCancelLoading = true;
        vm.isCancelRequestEmpty = false;
        ClientService.getCancelRequests(vm.cancelrequestCurrentPage).then(function(response){
            if (response == 'Meal Request Not Found') {
                vm.isCancelRequestEmpty = true;
            }
            vm.getCancelRequests = response.data;
            vm.canceltotalrequests = response.total;
            vm.cancelrequestPerPage = response.per_page;
            vm.cancelrequestCurrentPage = response.current_page;
            vm.reqCancelLoading = false;
        },function(error){
            vm.reqCancelLoading = false;
        });
    }

    function countUnreadRequest(){
        vm.reqCountLoading = true;
        ClientService.countUnreadRequest().then(function(response){
            vm.cancel_unread = response.cancel_unread;
            vm.confirm_unread = response.confirm_unread;
            vm.new_unread = response.new_unread;
            vm.reqCountLoading = false;
        },function(error){
            vm.reqCountLoading = false;
        });
    }

    vm.confirmRequest_comment = [];
    function cancelRequest(requestId){
        $scope.cancelId = requestId;
        var comment = vm.confirmRequest_comment[requestId];
        var lang = localStorage.getItem('current_language_code');
        var cancelRequest = {'ID': requestId, 'comment': comment, 'lang': lang};
        return ClientService.cancelRequest(cancelRequest).then(function(response){
            if (response.message == 'success') { 
                angular.element('#requestDetail'+requestId).modal('hide');
                angular.element('.modal-backdrop').remove();
                getRequests(); 
                getConfirmRequests(); 
                getCancelRequests(); 
                countUnreadRequest(); 
                countMissingBooking();
                vm.confirmRequest_comment[requestId] = null; 
                $scope.requestTab = "cancelledRequests";
            }
            else{  }
        });
    }

    function printRequest(getRequest) {
        ClientService.printRequest(getRequest, $translate.use()).then(function (response) {
            var printWindow = window.open('', 'PRINT', 'height=600,width=800');
            printWindow.document.write(response);
            printWindow.document.close(); // necessary for IE >= 10
            printWindow.focus(); // necessary for IE >= 10*/

            $timeout(function(){ printWindow.print() }, 100);
        }, function (error) {
            alert('Print error!');
        });
    }

    $scope.requestOrderDetailStatusFilter = function (request) { 
        if (request.status != 3 ) {
          return request;
        }
    };

    $scope.checkCurrentRequest = [];
    $scope.ordersDetailID = [];
    vm.checkMealCancelOrNot = [];
    vm.checkOrederDetailLength = {};
    vm.confirmStatus = {};
    vm.getOrederDetailLength = {};
    vm.cancelOrederDetail = {};
    $scope.cancelMeal = function(order_detail_id, getRequest_ID){
        for(var i=0;i<$scope.checkCurrentRequest.length;i++){
            if($scope.checkCurrentRequest[i]!=getRequest_ID){
                $scope.checkCurrentRequest = [];
                $scope.ordersDetailID = [];
            }
        }

        for(var i=0;i<$scope.ordersDetailID.length;i++){
            if($scope.ordersDetailID[i]===order_detail_id){
                $scope.ordersDetailID.splice(i, 1);
            }
        }


        $scope.checkCurrentRequest.push(getRequest_ID);
        $scope.ordersDetailID.push(order_detail_id);
        vm.checkMealCancelOrNot[getRequest_ID] = true;

        if (vm.getOrederDetailLength[getRequest_ID] == $scope.ordersDetailID.length) {
            vm.checkOrederDetailLength[getRequest_ID] = false; 
            vm.confirmClass[getRequest_ID] = 'btn-primary';
            vm.confirmStatus[getRequest_ID] = false;
        }
        else{
            vm.checkOrederDetailLength[getRequest_ID] = true; 
        }

        angular.element('.orderdetail_'+order_detail_id).addClass("strikethrough");
        vm.cancelOrederDetail[order_detail_id] = true;
        console.log($scope.ordersDetailID);
    }

    vm.confirmStatus = [];
    vm.cancelOrderDetail = [];
    $scope.orders_details = [];
    var orderDetailObj = [];
    var requestObj = [];
    vm.confirmRequest_comment = [];
    $scope.requestSaveChanges = function(index, requestId, orderId){
        var lang = localStorage.getItem('current_language_code');
        var confirmStatus = vm.confirmStatus[requestId];
        var cancelOrderDetailId = $scope.ordersDetailID;

        if (vm.getOrederDetailLength[requestId] == cancelOrderDetailId.length) {
            return false;
        }
        

        if (confirmStatus == true) {
            confirmStatus = 'A';
        }
        else{
            confirmStatus = 'S';
        }
        var requestConfirm = {
            request_id: requestId,
            lang: lang,
            comment: vm.confirmRequest_comment[requestId],
            request_status: confirmStatus,
            order_detail_staus: cancelOrderDetailId
        }
        console.log(orderDetailObj);
        console.log(requestConfirm);
        orderDetailObj = [];
        if (requestConfirm){ var requestConfirm = angular.toJson(requestConfirm) }else{ var requestConfirm = [] }
        return ClientService.confirmRequest(requestConfirm).then(function(response){
            if (response.message == 'status changed') {
                angular.element('#requestDetail'+requestId).modal('hide');
                angular.element('.modal-backdrop').remove();
                getRequests();
                getConfirmRequests();
                getCancelRequests();
                countUnreadRequest();
                countMissingBooking();
                $scope.requestTab = response.openTab;
                vm.confirmRequest_comment[requestId] = null;
            }
            else if (response.message == 'success') {
                angular.element('#requestDetail'+requestId).modal('hide');
                angular.element('.modal-backdrop').remove();
                getRequests();
                getConfirmRequests();
                getCancelRequests();
                countUnreadRequest();
                countMissingBooking();
                $scope.requestTab = "confirmedRequests";
                vm.confirmRequest_comment[requestId] = null;
            }
            else if (response.message == 'client success'){
                angular.element('#requestDetail'+requestId).modal('hide');
                angular.element('.modal-backdrop').remove();
                getRequests();
                getConfirmRequests();
                getCancelRequests();
                countUnreadRequest();
                countMissingBooking();
                $scope.requestTab = "newRequests";
                vm.confirmRequest_comment[requestId] = null;
            }
            else{
                vm.isSendREQUESTError = true;
            }
            vm.confirm = '';
            vm.clientNewRequestStatue = true;
            vm.sendRequestLoading = false;
        });
    }

    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    $scope.mySplit = function(string, nb) {
        var array = string.split('<br>');
        return array[nb];
    }

    $scope.messageSplit = function(string, nb) {
        var array = string.split('<br>');
        return array[nb];
    }


    $scope.isCollapsed = [];
    $scope.collapseToggleMore = function(orderdetail_id) {
      if ( $scope.isCollapsed[orderdetail_id] == true ) {
        $scope.isCollapsed.length = 0;
        return;
      }
      $scope.isCollapsed.length = 0;
      $scope.isCollapsed[orderdetail_id] = true;
    }

    vm.checkUnread = [];
    function changeStatusAsRead(requestId, status){
        ClientService.changeStatusAsRead(requestId).then(function(response){
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

    // Request Meal End

    //remuneration
    function getPaiedEmail(accountNumber, bankCode, phone, total, lang){
        var user = JSON.parse(localStorage.getItem('user'));
        var result = {
            "name": "Client name: " + user.name,
            "phone": "Client phone: " + phone,
            "email": "Client email: " + user.email,
            "total": "Total: " + total + " Kč",
            "accountNumber": "Account number: " + accountNumber + " / " + bankCode,
            "from": user.email,
            "lang": lang + " - Client payment request"
        }
        console.log(result);

        ClientService.getPaiedEmail(result).then(function(response){
            alert(response);
            console.log(response);
        }, function(error){

        });
    }

    function get_paid_date() {
        ClientService.getClient_payment().then(function (response) {
            var order_payment = response.client_payments;
            if(order_payment == undefined){
                var len = 0;
                vm.last_pay_date = new Date(1900, 1, 15, 12, 12);
            }
            else{
                var len = order_payment.length;
                var last_pay_date = order_payment[0].created_at;
                for (var i = 0; i < len; i++) {
                    if (order_payment[i].created_at > last_pay_date) {
                        last_pay_date = order_payment[i].created_at;
                    }
                }
                var yr1   = parseInt(last_pay_date.substring(0,4));
                var mon1  = parseInt(last_pay_date.substring(5,7));
                var dt1   = parseInt(last_pay_date.substring(8,10));
                var hour  = parseInt(last_pay_date.substring(11,13));
                var minute  = parseInt(last_pay_date.substring(14,16));
                var date1 = new Date(yr1, mon1-1, dt1, hour, minute);
                vm.last_pay_date = date1;
            }
            console.log(vm.last_pay_date);
        }, function (error) {
            console.log("error");
        });
    }

    function getPaied() {


        ClientService.getClient().then(function(response){
            var created_at = new Date();
            var data = {
                "own_turnover": vm.client_spending,
                "member_turnover": vm.member_spending,
                "own_remuneration": vm.client_commission,
                "member_remuneration": vm.member_commission,
                "created_at": created_at,
            };
            vm.min_remuneration = response.data.setting[0].min_remuneration;
            var accountNumber = response.data.client[0].account_number;
            var bankCode = response.data.client[0].bank_code;
            var phone = response.data.client[0].phone;
            var lang = response.data.client[0].lang;

            if (vm.commission<vm.min_remuneration) {
                var contentText = $translate.instant("PATRONAGE.MINIMAL AMOUNT IS MESSAGE") + vm.min_remuneration + vm.currency;
                alert(contentText);
            }
            else{
                if(accountNumber){
                    ClientService.getPaied(data).then(function(response){
                        debugger;
                    },function(error){
                        console.log(error);
                    });
                    var total = vm.commission;
                    getPaiedEmail(accountNumber, bankCode, phone, total, lang);
                    vm.total = (vm.total + vm.commission)*100;
                    vm.total = Math.floor(vm.total)/100;
                    vm.member = (vm.member + vm.member_commission)*100;
                    vm.member = Math.floor(vm.member)/100;
                    vm.client = (vm.client + vm.client_commission)*100;
                    vm.client = Math.floor(vm.client)/100;
                    vm.getPaied_price = vm.commission;
                    vm.commission = 0;
                    vm.client_commission = 0;
                    vm.member_commission = 0;
                    vm.total_spending = 0;
                    vm.client_spending = 0;
                    vm.member_spending = 0;
                    vm.status = false;
                    get_paid_date();
                }
                else{
                    alert("Please register your Account Number in the My Details section!");
                }
            }
        },function(error){
            console.log(error);
        });
    }
    function getOrders() {
        var total_spending = 0;
        var client_spending = 0;
        var member_spending = 0;
        var commission = 0;
        var client_commission = 0;
        var member_commission = 0;
        var total_book = 0;
        var client_book = 0;
        var member_book = 0;
        var a = 0;
        vm.loading = true;
        if(vm.status){
            ClientService.getFirstMembers().then(function (response) {
                var firstMembers = response.data;
                vm.firstMembers = firstMembers;
                for (var i = 0; i < firstMembers.length; i++) {
                    ClientService.getAllOrdersWithDetail(firstMembers[i]).then(function (response) {
                        var order_detail = response.data;
                        var price_sum = 0;
                        var len = order_detail.length;
                        ClientService.getClient(firstMembers[i]).then(function(response){
                            var commision_split = parseFloat(response.data.setting[0].commission_split);
                            var client_currency = response.data.setting[0].currency_short;
                            for (var i = 0; i < len; i++) {
                                var order = order_detail[i].orders_detail;
                                for (var j = 0; j < order.length; j++) {
                                    var client_percentage = parseFloat(order[j].menu_list.client_percentage ? order[j].menu_list.client_percentage : 0);
                                    var price = parseInt(order[j].price);
                                    price_sum = price_sum + price;
                                    var yr1   = parseInt(order[j].serve_at.substring(0,4));
                                    var mon1  = parseInt(order[j].serve_at.substring(5,7));
                                    var dt1   = parseInt(order[j].serve_at.substring(8,10));
                                    var hour  = parseInt(order[j].serve_at.substring(11,13));
                                    var minute  = parseInt(order[j].serve_at.substring(14,16));
                                    var date1 = new Date(yr1, mon1-1, dt1, hour, minute);
                                    var currentTime = new Date();
                                    if (parseFloat(order[j].status) == 2 || parseFloat(order[j].status) == 4) {
                                        if (date1 < currentTime) {
                                            if (date1 > vm.last_pay_date) {
                                                if (order[j].currency == client_currency) {
                                                    member_spending = member_spending + price;
                                                    var mm_comm = price*(1-commision_split/100)*client_percentage/100;
                                                    member_commission = member_commission + mm_comm;
                                                }
                                            }
                                        }
                                    }
                                    if (parseFloat(order[j].status) == 0 || parseFloat(order[j].status) == 1 || parseFloat(order[j].status) == 2 || parseFloat(order[j].status) == 4) {
                                        if (date1 > currentTime) {
                                            if (order[j].currency == client_currency) {
                                                member_book = member_book + price;
                                            }
                                        }
                                    }
                                }
                            }
                            vm.member_commission = member_commission*100;
                            vm.member_commission = Math.floor(vm.member_commission)/100;
                            vm.member_spending = member_spending*100;
                            vm.member_spending = Math.floor(vm.member_spending)/100;
                            vm.member_book = member_book*100;
                            vm.member_book = Math.floor(vm.member_book)/100;
                            vm.commission = vm.client_commission + vm.member_commission;
                            vm.total_spending = vm.client_spending + vm.member_spending;
                            vm.total_book = vm.client_book + vm.member_book;
                        }, function(error){
                            console.log("error");
                        });
                    }, function (error) {
                        console.log("error");
                    });
                }
            }, function (error){
                console.log("error");
            });

            ClientService.getAllOrdersWithDetail(a).then(function (response) {
                var order_detail = response.data;
                var price_sum = 0;
                var len = order_detail.length;
                ClientService.getClient(a).then(function(response){
                    var commision_split = parseFloat(response.data.setting[0].commission_split) || 0;
                    var client_currency = response.data.setting[0].currency_short;
                    vm.currency = client_currency;
                    for (var i = 0; i < len; i++) {
                        var order = order_detail[i].orders_detail;
                        for (var j = 0; j < order.length; j++) {
                            var client_percentage = parseFloat(order[j].menu_list.client_percentage ? order[j].menu_list.client_percentage : 0);
                            var price = parseInt(order[j].price) || 0;
                            price_sum = price_sum + price;
                            // console.log(client_percentage);
                            var yr1   = parseInt(order[j].serve_at.substring(0,4));
                            var mon1  = parseInt(order[j].serve_at.substring(5,7));
                            var dt1   = parseInt(order[j].serve_at.substring(8,10));
                            var hour  = parseInt(order[j].serve_at.substring(11,13));
                            var minute  = parseInt(order[j].serve_at.substring(14,16));
                            var date1 = new Date(yr1, mon1-1, dt1, hour, minute);
                            var currentTime = new Date();
                            if (parseFloat(order[j].status) == 2 || parseFloat(order[j].status) == 4) {
                                if (date1 < currentTime) {
                                    if (date1 > vm.last_pay_date) {
                                        if (order[j].currency == client_currency) {
                                            client_spending = client_spending + price;
                                            var cl_comm = price*commision_split/100*client_percentage/100;
                                            client_commission = client_commission + cl_comm;
                                        }
                                    }
                                }
                            }
                            if (parseFloat(order[j].status) == 0 || parseFloat(order[j].status) == 1 || parseFloat(order[j].status) == 2 || parseFloat(order[j].status) == 4) {
                                if (date1 > currentTime) {
                                    if (order[j].currency == client_currency) {
                                        client_book = client_book + price;
                                    }
                                }
                            }
                        }
                    }
                    vm.client_commission = client_commission*100;
                    vm.client_commission = Math.floor(vm.client_commission)/100;
                    vm.client_spending = client_spending*100;
                    vm.client_spending = Math.floor(vm.client_spending)/100;
                    vm.client_book = client_book*100;
                    vm.client_book = Math.floor(vm.client_book)/100;
                    vm.commission = vm.client_commission + vm.member_commission;
                    vm.total_spending = vm.client_spending + vm.member_spending;
                    vm.total_book = vm.client_book + vm.member_book;
                }, function(error){
                    console.log("error");
                });
            }, function (error) {
                console.log("error");
            });

            vm.commission = vm.client_commission + vm.member_commission;
            vm.total_spending = vm.client_spending + vm.member_spending;
            vm.total_book = vm.client_book + vm.member_book;
            ClientService.getClient_payment().then(function (response) {
                vm.order_payment = response.client_payments;
                vm.total = 0;
                vm.client = 0;
                vm.member = 0;
                if(vm.order_payment == undefined){var len = 0;}
                else{
                    var len = vm.order_payment.length;}
                for (var i = 0; i < len; i++) {

                    vm.client = vm.client + parseFloat(vm.order_payment[i].own_remuneration);
                    vm.member = vm.member + parseFloat(vm.order_payment[i].member_remuneration);
                    vm.order_payment[i].own_remuneration = parseFloat(vm.order_payment[i].own_remuneration) + parseFloat(vm.order_payment[i].member_remuneration);
                    vm.order_payment[i].own_remuneration = vm.order_payment[i].own_remuneration*100;
                    vm.order_payment[i].own_remuneration = Math.floor(vm.order_payment[i].own_remuneration)/100;
                }
                vm.total = (vm.member + vm.client)*100;
                vm.total = Math.floor(vm.total)/100;
                vm.client = vm.client*100;
                vm.client = Math.floor(vm.client)/100;
                vm.member = vm.member*100;
                vm.member = Math.floor(vm.member)/100;
            }, function (error) {
                console.log("error");
            });
        }
        $timeout(function(){
            vm.loading = false;
        }, 2500);
    }

    // end remuneration

    function getFriends(query){
      //debugger;
      return ClientService.getFriends(query).then(function(response){
        //debugger;
        return response.data
      });
    }

    function getFriendCircle(){
        vm.loading = true;
        ClientService.getFriendCircle().then(function(response){
            var total_spending = 0;
            var client_spending = 0;
            var member_spending = 0;
            var commission = 0;
            var client_commission = 0;
            var member_commission = 0;
            var total_book = 0;
            var client_book = 0;
            var member_book = 0;
            vm.friendCircle = response.error ? [] : response.data;
            var arr = [];
            for (var k = 0; k < vm.friendCircle.length; k++) {
                vm.friendCircle[k]['commission'] = 0;
                vm.friendCircle[k]['spending'] = 0;
                vm.friendCircle[k]['book'] = 0;
                vm.friendCircle[k]['flag'] = 0;
                arr[k] = parseInt(vm.friendCircle[k].ID_grouped_client);
                if(vm.friendCircle[k].precedings == "0"){
                    vm.friendCircle[k]['flag'] = 1;
                }
                // for (var i = 0; i < vm.firstMembers.length; i++) {
                //    console.log(vm.firstMembers);
                // if(vm.firstMembers[i] == arr[k]){
                //    vm.friendCircle[k]['flag'] = 1;
                // }
                // }
            }
            console.log(arr);
            ClientService.getAllOrdersArray(arr).then(function (response) {
                var data = response.data;
                for (var k = 0; k < data.length; k++) {
                    if (vm.friendCircle[k] && vm.friendCircle[k]['flag'] == 1){
                        var friend = data[k];
                        var order_detail = friend.orderDetail;
                        var len = order_detail.length;
                        var commision_split = parseFloat(friend.setting[0].commission_split);
                        var client_currency = friend.setting[0].currency_short;
                        for (var i = 0; i < len; i++) {
                            var order = order_detail[i].orders_detail;
                            for (var j = 0; j < order.length; j++) {
                                var client_percentage = parseFloat(order[j].menu_list.client_percentage ? order[j].menu_list.client_percentage : 0);
                                var price = parseInt(order[j].price);
                                var yr1   = parseInt(order[j].serve_at.substring(0,4));
                                var mon1  = parseInt(order[j].serve_at.substring(5,7));
                                var dt1   = parseInt(order[j].serve_at.substring(8,10));
                                var hour  = parseInt(order[j].serve_at.substring(11,13));
                                var minute  = parseInt(order[j].serve_at.substring(14,16));
                                var date1 = new Date(yr1, mon1-1, dt1, hour, minute);
                                var currentTime = new Date();
                                if (parseFloat(order[j].status) == 2 || parseFloat(order[j].status) == 4) {
                                    if (date1 < currentTime) {
                                        if (date1 > vm.last_pay_date) {
                                            if (order[j].currency == client_currency) {
                                                member_spending = member_spending + price;
                                                var mm_comm = price*(1-commision_split/100)*client_percentage/100;
                                                member_commission = member_commission + mm_comm;
                                            }
                                        }
                                    }
                                }
                                if (parseFloat(order[j].status) == 0 || parseFloat(order[j].status) == 1 || parseFloat(order[j].status) == 2 || parseFloat(order[j].status) == 4) {
                                    if (date1 > currentTime) {
                                        if (order[j].currency == client_currency) {
                                            member_book = member_book + price;
                                            // console.log(member_book);
                                        }
                                    }
                                }
                            }
                        }
                        member_commission = member_commission*100;
                        vm.friendCircle[k].commission = Math.floor(member_commission)/100;
                        member_book = member_book*100;
                        vm.friendCircle[k].book = Math.floor(member_book)/100;
                        member_spending = member_spending*100;
                        vm.friendCircle[k].spending = Math.floor(member_spending)/100;
                        console.log(member_book);
                        console.log(member_spending);
                        member_commission = 0;
                        member_spending = 0;
                        member_book = 0;
                    }
                }
            }, function (error) {
                console.log("error");
            });
            console.log(vm.friendCircle);
        },function(error){
            console.log("error");
        });
        $timeout(function(){
            vm.loading = false;
        }, 2500);
    }

    function getQuizClient() {
      ClientService.getQuizClient().then(function(response){
        getSetting();
        //debugger;
        vm.quizClientAll = response;

        var currentLanguage = localStorage.getItem('current_language');
        vm.quizClient = vm.quizClientAll[currentLanguage];

        // $scope.percentage = vm.quizClient.percentage_discount;

        vm.bReceiveAllData.quizClient = true;
      },function(error){

      });
    }

    function orders_sum_price_between_dates() {
      var isDelay = false;
      vm.percentage = 0;
      // vm.breakPoint = false;

      // real delay hrs
      var date1 = new Date(vm.quizClient.lastanswered);   // Last Answered Time
      // console.log('vm.quizClient', vm.quizClient);
      var date2 = new Date();                         // Current Time
      //var timezoneDelay = - date2.getTimezoneOffset() / 60;
      date1.setHours(date1.getHours());
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var delayQuiz = Math.ceil(timeDiff/ (1000 * 3600));
      if(!delayQuiz){
        delayQuiz = vm.quizSetting.quiz_delay_hrs + 1;
      }
      vm.quiztime = vm.quizSetting.quiz_delay_hrs;

      isDelay = (delayQuiz > vm.quizSetting.quiz_delay_hrs) ? true : false;

      vm.percentage = +vm.getSumPrize().percentage_discount;

      var currentLanguage = localStorage.getItem('current_language_code');
      ClientService.orders_sum_price_between_dates({'step': vm.percentage, 'lang': currentLanguage, 'now': $filter('date')(date2, 'yyyy-MM-dd HH:mm:ss')}).then(function(response){
        var lang = localStorage.getItem('current_language');
        vm.sum_price.sum_price_obligatory= response[lang]['sum_price'];
        vm.sum_price.sum_price_for_bonus = vm.sum_price[lang].sum_price_for_bonus;
        vm.sum_price.total_bonus_quiz_count = Math.floor(vm.sum_price.sum_price_for_bonus / vm.quizSetting.quiz_bonus_order);
        vm.sum_price.bonus_quiz_count = vm.sum_price.total_bonus_quiz_count - vm.sum_price[lang].n_bonus_quiz_count;

        // Daily Quiz
        var i = 0;
        do {
          i += +vm.quizSetting.quiz_order_percent;
          if(i === vm.percentage){
            // vm.breakPoint = true;
            vm.isNextStep = false;
            if(vm.sum_price.sum_price_obligatory >= +vm.quizSetting.quiz_min_order) {
              vm.isNextStep = true;
              //updateLastCrossingTime();
            }
            break;
          }
        } while (i < 100);

        if(vm.percentage % vm.quizSetting.quiz_order_percent > 0 || vm.percentage === 0)
            vm.isNextStep = true;
        // if(vm.percentage > vm.quizSetting.quiz_order_percent)
        //   if(vm.sum_price.sum_price_obligatory >= +vm.quizSetting.quiz_min_order)
        //     vm.isNextStep = true;

        // console.log('isNextStep', vm.isNextStep);
        // console.log('breakPoint', vm.breakPoint);

        vm.isCanDayquestion = (isDelay && vm.isNextStep) ? true : false;
        if(vm.isCanDayquestion) {       // isDelay = true, isNextStep = true.
          vm.strDayQuestion = "CLIENT.AVAILABLE";
          vm.strDayQuestion2 = "";
          vm.nextTime = "";
          vm.remainHours = "";
        } else if(!vm.isNextStep){         // isDelay = true || false, isNextStep = false.
          vm.strDayQuestion = "CLIENT.MAKE AN ORDER";
          vm.strDayQuestion2 = "";
          vm.nextTime = "";
          vm.remainHours = "";
        } else {                                // isDelay = false, isNextStep = true.
          vm.remainHours = vm.quizSetting.quiz_delay_hrs - delayQuiz;
          vm.nextTime = new Date(date1);
          vm.nextTime.setHours(date1.getHours() + parseInt(vm.quizSetting.quiz_delay_hrs));
          vm.nextTime = $filter('date')(vm.nextTime, 'medium');
          vm.strDayQuestion = "CLIENT.AVAILABLE IN "; // + vm.remainHours + " CLIENT.HOURS, " + vm.nextTime;
          vm.strDayQuestion2 = "CLIENT.HOURS";
        }

        // Bonus Quiz
        vm.isCanBonuseQuestion = (vm.sum_price.bonus_quiz_count > 0) ? true : false;
        if(vm.isCanDayquestion) vm.isDayOrBonusTest = true;
        else if(vm.isCanBonuseQuestion) vm.isDayOrBonusTest = false;
        else vm.isDayOrBonusTest = true;

        if (vm.isCanBonuseQuestion)
          vm.isNextStep = true;

        vm.strBonusQuestion = "CLIENT.AVAILABLE SYMBOL";

        if(vm.isCanDayquestion && vm.isCanBonuseQuestion){
          vm.isNextQuiz = true;
        }
        else if(vm.isCanDayquestion && !vm.isCanBonuseQuestion){
          vm.isNextQuiz = false;
        }
        else if(!vm.isCanDayquestion && vm.isCanBonuseQuestion){
          vm.isNextQuiz = (vm.sum_price.bonus_quiz_count > 1) ? true : false;
        }
        else if(!vm.isCanDayquestion && !vm.isCanBonuseQuestion){
          vm.isNextQuiz = false;
        }

      },function(error){

      });
    }

    $scope.getBonusQuizCount = function () {
      return vm.sum_price.bonus_quiz_count > 0 ? vm.sum_price.bonus_quiz_count : 0;
    };

    // function isDayandBonusQuestion() {
    //     /*
    //      *   Delay, Percent, SumPrice
    //      *   vm.quizClient
    //      *   vm.quizSetting
    //      *   vm.order
    //      **/
    //
    //
    //   console.log('bonus');
    //   return true;
    // }

    function getSetting(){
      ClientService.getSetting().then(function(response){
        if(response.error) return;
        vm.quizSettings = response;

        var currentLanguage = localStorage.getItem('current_language');
        vm.quizSetting = vm.quizSettings[currentLanguage];
        vm.quiztime = vm.quizSetting.quiz_delay_hrs;
        vm.currency = vm.quizSetting.currency_short;

        // if (vm.sum_price.cs) {
        //   vm.sum_price.sum_price = vm.sum_price[currentLanguage].sum_price;
        //   vm.sum_price.sum_price_for_bonus = vm.sum_price[currentLanguage].sum_price_for_bonus;
        //   vm.sum_price.total_bonus_quiz_count = Math.floor(vm.sum_price[currentLanguage].sum_price_for_bonus / vm.quizSetting.quiz_bonus_order);
        //   vm.sum_price.bonus_quiz_count = vm.sum_price.total_bonus_quiz_count - vm.sum_price[currentLanguage].n_bonus_quiz_count;
        // }

        vm.bReceiveAllData.quizQuiz = true;

        // isDayandBonusQuestion();
        orders_sum_price_between_dates();
      },function(error){

      });
    }

    function redirect(route) {
      $location.path('/app/' + route);
    }

    function startQuiz() {
      if(!(vm.isCanDayquestion || vm.isCanBonuseQuestion))
        return;

      $("#start_quiz_btn").attr("data-target", "#restt_location");
      ClientService.startQuiz(localStorage.getItem('current_language_code')).then(function(response){
        //debugger;
        vm.quiz = response.data;
        if(!vm.quiz.q_photo){
          vm.quiz.q_photo = "logo.png"
        }

        vm.quizResult.percentage = vm.quiz.percentage;
        vm.q_testStart = true;
        // Init Variable
        vm.quiztime = vm.quizSetting.quiz_delay_hrs;
        vm.quizResult.isRight = false;
        vm.quizResult.rate_quality = 0;
        vm.quizResult.rate_difficulty = 0;
        vm.quizResult.answer = 'x';
        vm.currentTime = $filter('date')(new Date(), 'medium');
        vm.isBonusQuiz = $('input[name="quiz"]:checked').val() == "false" ? 1 : 0;

        // Init Quiz
        vm.realQuestion = {
          "question": vm.quiz.question,
          "answer_a": vm.quiz.a,
          "answer_b": vm.quiz.b,
          "answer_c": vm.quiz.c,
          "answer_d": vm.quiz.d,
          "q_note": vm.quiz.note,
          "q_rightans": "",
          "result_a": 3,
          "result_b": 3,
          "result_c": 3,
          "result_d": 3
        };

        vm.quizResult.ID_quiz = vm.quiz.ID;

        switch(vm.quiz.q_right){
          case 'A':
            vm.realQuestion.result_a = 2;
            vm.realQuestion.q_rightans = vm.realQuestion.answer_a;
            break;
          case 'B':
            vm.realQuestion.result_b = 2;
            vm.realQuestion.q_rightans = vm.realQuestion.answer_b;
            break;
          case 'C':
            vm.realQuestion.result_c = 2;
            vm.realQuestion.q_rightans = vm.realQuestion.answer_c;
            break;
          case 'D':
            vm.realQuestion.result_d = 2;
            vm.realQuestion.q_rightans = vm.realQuestion.answer_d;
            break;
          default:
            break;
        }
        console.log(vm.realQuestion);
      }, function(error){
        console.log('Did not get question data');
      });
    }

    $interval(function(){
      if(vm.quiz && vm.q_testStart){
        vm.quiztime -= 1;
        if(vm.quiztime <= 0 && vm.q_testStart == true){
          $("#restt_location").modal('hide');
          vm.quiztime = vm.quizSetting.quiz_delay_hrs;

          sendQuizResult();
          vm.q_testStart = false;
        }


        var percent = 100 * vm.quiztime / vm.quizSetting.quiz_delay_hrs;
        // console.log(percent + " " + vm.q_testStart);
        $(".progress-bar").css("width", percent + "%");
        if(percent >= 75){
          $(".progress-bar").removeClass("progress-bar-danger");
          $(".progress-bar").removeClass("progress-bar-warning");
          $(".progress-bar").removeClass("progress-bar-info");
          $(".progress-bar").addClass("progress-bar-success");
        }
        if(percent < 75 && percent >= 45) {
          $(".progress-bar").removeClass("progress-bar-success");
          $(".progress-bar").addClass("progress-bar-info");
        } else if(percent < 45 && percent >= 20){
          $(".progress-bar").removeClass("progress-bar-info");
          $(".progress-bar").addClass("progress-bar-warning");
        } else if(percent < 20){
          $(".progress-bar").removeClass("progress-bar-warning");
          $(".progress-bar").addClass("progress-bar-danger");
        }
      }

      if(vm.bReceiveAllData.sumPrice == true && vm.bReceiveAllData.quizPrize == true
          && vm.bReceiveAllData.quizClient == true && vm.bReceiveAllData.quizQuiz == true){
        vm.bReceiveAllData.sumPrice = false;
        vm.bReceiveAllData.quizPrize = false;
        vm.bReceiveAllData.quizClient = false;
        vm.bReceiveAllData.quizQuiz = false;
        // isDayandBonusQuestion();


      }
    }, 1000);

    $interval(function(){
      if(vm.currentLanguage != localStorage.getItem('NG_TRANSLATE_LANG_KEY') ? localStorage.getItem('NG_TRANSLATE_LANG_KEY') : $rootScope.language){
        vm.currentLanguage = localStorage.getItem('NG_TRANSLATE_LANG_KEY') ? localStorage.getItem('NG_TRANSLATE_LANG_KEY') : $rootScope.language;
      }
    }, 100);

    function changeDlg(){
      //debugger;
      $("#restt_location").modal('hide');
      vm.quiztime = vm.quizSetting.quiz_delay_hrs;
      sendQuizResult();
      vm.q_testStart = false;

      var percent = 100 * vm.quiztime / vm.quizSetting.quiz_delay_hrs;
      console.log(percent + " " + vm.q_testStart);
      $(".progress-bar").css("width", percent + "%");
      if(percent >= 75){
        $(".progress-bar").removeClass("progress-bar-danger");
        $(".progress-bar").removeClass("progress-bar-warning");
        $(".progress-bar").removeClass("progress-bar-info");
        $(".progress-bar").addClass("progress-bar-success");
      }
      if(percent < 75 && percent >= 45) {
        $(".progress-bar").removeClass("progress-bar-success");
        $(".progress-bar").addClass("progress-bar-info");
      } else if(percent < 45 && percent >= 20){
        $(".progress-bar").removeClass("progress-bar-info");
        $(".progress-bar").addClass("progress-bar-warning");
      } else if(percent < 20){
        $(".progress-bar").removeClass("progress-bar-warning");
        $(".progress-bar").addClass("progress-bar-danger");
      }

      $(".quiz-content2 > div").removeClass("in active");
      $("#quiz-step1").addClass("in active");
      $("input[name='credit-card']").prop("checked",false);
      $("input[name='credit-card1']").prop("checked",false);
      $("input[name='credit-card']").removeClass("glyphicon-star");
      $("input[name='credit-card1']").removeClass("glyphicon-star");

      $("span[name='quality']").removeClass('glyphicon-star').addClass('glyphicon-star-empty');
      $("#start_quiz_btn").attr("data-target", "");
      vm.q_testStart = false;
    }

        function getSumPrize() {
            var total_discount = 0;
            var percentage_discount = 0;
            var total_percentage_discount = 0;
            if (vm.quiz_prize) {
                for (var i = 0, length1 = vm.quiz_prize.length; i < length1; i++) {
                    total_discount += parseInt(vm.quiz_prize[i].prize);
                    percentage_discount -= parseInt(vm.quiz_prize[i].percentage);
                    total_percentage_discount += parseInt(vm.quiz_prize[i].percentage);
                }
            }
            percentage_discount += vm.quizClient ? vm.quizClient.percentage_discount : 0;
            return {
                "total_discount": total_discount,
                "percentage_discount": percentage_discount,
                "total_percentage_discount": total_percentage_discount
            };
        }
        function dbTest() {
            //getSetting();

      console.log("Update");
    }

      function nextQuestion() {
          if (vm.isNextQuiz) {
              sendQuizResult();
              ClientService.startQuiz(localStorage.getItem('current_language_code'))
                  .then(function (response) {
                      //debugger;
                      vm.quiz = response.data;
                      if (!vm.quiz.q_photo) {
                          vm.quiz.q_photo = "logo.png"
                      }
                      vm.quizResult.percentage = vm.quiz.percentage;
                      // Init Variable
                      vm.quiztime = vm.quizSetting.quiz_delay_hrs;
                      vm.quizResult.isRight = false;
                      vm.quizResult.rate_quality = 0;
                      vm.quizResult.rate_difficulty = 0;
                      vm.quizResult.answer = 'x';
                      vm.currentTime = $filter('date')(new Date(), 'medium');
                      // Init Quiz
                      vm.realQuestion = {
                          "question": vm.quiz.question,
                          "answer_a": vm.quiz.a,
                          "answer_b": vm.quiz.b,
                          "answer_c": vm.quiz.c,
                          "answer_d": vm.quiz.d,
                          "q_note": vm.quiz.note,
                          "q_rightans": "",
                          "result_a": 3,
                          "result_b": 3,
                          "result_c": 3,
                          "result_d": 3
                      };

                      vm.quizResult.ID_quiz = vm.quiz.ID;

                      switch (vm.quiz.q_right) {
                          case 'A':
                              vm.realQuestion.result_a = 2;
                              vm.realQuestion.q_rightans = vm.realQuestion.answer_a;
                              break;
                          case 'B':
                              vm.realQuestion.result_b = 2;
                              vm.realQuestion.q_rightans = vm.realQuestion.answer_b;
                              break;
                          case 'C':
                              vm.realQuestion.result_c = 2;
                              vm.realQuestion.q_rightans = vm.realQuestion.answer_c;
                              break;
                          case 'D':
                              vm.realQuestion.result_d = 2;
                              vm.realQuestion.q_rightans = vm.realQuestion.answer_d;
                              break;
                          default:
                              break;
                      }

                      $("#next-question-r").attr("ng-href", "#quiz-step1");
                      $("#next-question-w").attr("ng-href", "#quiz-step1");
                      var percent = 100 * vm.quiztime / vm.quizSetting.quiz_delay_hrs;
                      $(".progress-bar").css("width", percent + "%");
                      if (percent >= 75) {
                          $(".progress-bar").removeClass("progress-bar-danger");
                          $(".progress-bar").removeClass("progress-bar-warning");
                          $(".progress-bar").removeClass("progress-bar-info");
                          $(".progress-bar").addClass("progress-bar-success");
                      }
                      if (percent < 75 && percent >= 45) {
                          $(".progress-bar").removeClass("progress-bar-success");
                          $(".progress-bar").addClass("progress-bar-info");
                      } else if (percent < 45 && percent >= 20) {
                          $(".progress-bar").removeClass("progress-bar-info");
                          $(".progress-bar").addClass("progress-bar-warning");
                      } else if (percent < 20) {
                          $(".progress-bar").removeClass("progress-bar-warning");
                          $(".progress-bar").addClass("progress-bar-danger");
                      }

                      $(".quiz-content2 > div").removeClass("in active");
                      $("#quiz-step1").addClass("in active");
                      $("input[name='credit-card']").prop("checked", false);
                      $("input[name='credit-card1']").prop("checked", false);
                      $("input[name='credit-card']").removeClass("glyphicon-star");
                      $("input[name='credit-card1']").removeClass("glyphicon-star");

                      $("span[name='quality']").removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                      $("#start_quiz_btn").attr("data-target", "");
                      vm.q_testStart = true;
                      vm.isNextQuiz = false;
                  }, function (error) {
                      console.log('Did not get question data');
                  });
          }
          else {
              $("#next-question-r").attr("ng-href", "");
              $("#next-question-w").attr("ng-href", "");
              alert("Sorry, you can not quiz.");
          }
      }

    function sendEmail(selected){
      var text = "";
      if(selected == "right"){
        text = $('#email-right').val();
      }
      else if(selected == "wrong"){
        text = $('#email-wrong').val();
      }
      else {
        text = "None Content.";
      }
      
      if (text == "") {
          alert("Sorry, you can not send email. Please enter content.");
          return;
      }

      var user = JSON.parse(localStorage.getItem('user'));
      var content = "id: " + vm.quiz.ID + "<br>" +
          "question: " + vm.quiz.question + "<br>" +
          "answer_a: " + vm.quiz.a + "<br>" +
          "answer_b: " + vm.quiz.b + "<br>" +
          "answer_c: " + vm.quiz.c + "<br>" +
          "answer_d: " + vm.quiz.d + "<br>" +
          "note: " + vm.quiz.note + "<br>" +
          "client name: " + user.name + "<br>" +
          "client email: " + user.email + "<br><br>" +
          text;

      var result = {
        "content": content,
        "from": user.email
      }

      ClientService.sendEmail(result).then(function(response){
        alert(response);
      }, function(error){

      });
    }

    function sendQuizResult() {     // Send Quiz Result
      var deferred = $.Deferred();

      vm.quizResult.isRight = (vm.selectedAnswer == vm.realQuestion.q_rightans) ? true : false;
      console.log($('#count1').attr("value"));
      console.log($('#count2').attr("value"));
      if($('#count1').attr("value") != 0) {
        vm.quizResult.rate_quality = $('#count1').attr("value");
      }
      else if($('#count2').attr("value") != 0){
        vm.quizResult.rate_quality = $('#count2').attr("value");
      }
      console.log(vm.quizResult.rate_quality);
      $('#count1').attr("value", 0);
      $('#count2').attr("value", 0);

      var isBonusQuiz = vm.isBonusQuiz;
      var quizClient = {
        "ID_quiz": vm.quizResult.ID_quiz,
        "bonus": isBonusQuiz,
        "answer": vm.quizResult.answer,
        "answered": $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        "rate_difficulty": vm.quizResult.rate_difficulty,
        "rate_quality": vm.quizResult.rate_quality,
        "isRight": vm.quizResult.isRight,
        "percentage": vm.quizResult.percentage,
        "lang": localStorage.getItem('current_language_code')
      };

      ClientService.addQuizClient(quizClient).then(function(response){
        getQuizClient();
        getQuizPrize();
        getSumPrice();
        // getSetting();
        deferred.resolve(response);
      },function(error) {
        deferred.reject(error);
      });

      return deferred.promise();
    }
    function getQuizPrize() {   // Get Percentage
      ClientService.getQuizPrize().then(function(response){
          debugger;
        vm.quiz_prize0 = response;

        var currentLanguage = localStorage.getItem('current_language');
        vm.quiz_prize = vm.quiz_prize0[currentLanguage];

        vm.bReceiveAllData.quizPrize = true;
      }, function(error){

      });
    }
    function getSumPrice() {    // Sum Price, Calculate Bonus Condition
        var now = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
        ClientService.getSumPrice({"now": now}).then(function(response){
          vm.sum_price = response;
          // if (vm.quizSetting.quiz_bonus_order) {
          //   var currentLanguage = localStorage.getItem('current_language');
          //   vm.sum_price.sum_price = vm.sum_price[currentLanguage].sum_price;
          //   vm.sum_price.sum_price_for_bonus = vm.sum_price[currentLanguage].sum_price_for_bonus;
          //   vm.sum_price.total_bonus_quiz_count = Math.floor(vm.sum_price[currentLanguage].sum_price_for_bonus / vm.quizSetting.quiz_bonus_order);
          //   vm.sum_price.bonus_quiz_count = vm.sum_price.total_bonus_quiz_count - vm.sum_price[currentLanguage].n_bonus_quiz_count;
          // }
          vm.bReceiveAllData.sumPrice = true;
          }, function(error){

        });
    }

    function updateLastCrossingTime() {
      ClientService.updateLastCrossingTime().then(function(response){

      }, function(error){

      });
    }

    function getOtherCircles(){
      //debugger;

      ClientService.getFriendRequests().then(function(response){
          vm.friendRequests = response.data;
          vm.friendRequestsCount = response.data.length;
          if (vm.friendRequestsCount==0) {
              $scope.friendRequestsCount = '';
          }
          else {
              $scope.friendRequestsCount = '('+vm.friendRequestsCount+')';
          }
          vm.loadingFriendRequests = false;
      },function(error){
          vm.loadingFriendRequests = false;
      });
      ClientService.getOtherCircles().then(function(response){
        //debugger;
        vm.otherCircles = response.data;
      },function(error){

      });
    }

    function respondToFriendRequest(response,friendId){
      //debugger;
      var response = {
        "response":{
          "response":response,
          "ID_grouped_client": friendId
        }

      };
      ClientService.respondToFriendRequest(response).then(function(respons){
        //debugger;
        var approved = response.response.response;
        vm.respondToFriendRequestStatus = approved == 'Y' ? "CLIENT.Accepted friend request!" : (approved == 'D') ? "CLIENT.Friend request declined!" : (approved == 'R') ? "CLIENT.User blocked successfully!" : "";
        vm.friends = [];
        $timeout(function(){
          vm.doFade = true;
          vm.respondToFriendRequestStatus = "";
        }, 2500);
        getFriendRequests();
        getFriendCircle();
        getOtherCircles();
      },function(error){
        //debugger;
      });
    }
    function respond(response, friendId){
      var response = {
        "response":{
          "response":response,
          "ID_grouped_client": friendId
        }

      };
      ClientService.respondToFriendRequest(response).then(function(response){
        //debugger;
        getFriendCircle();
        getOtherCircles();
      }, function(error){
        //debugger;
      });
    }

    function getFriendRequests(){
      vm.loadingFriendRequests = true;
      //debugger;
      ClientService.getFriendRequests().then(function(response){
        //debugger;
        vm.friendRequests = response.data;

        vm.friendRequestsCount = response.data.length;
        if (vm.friendRequestsCount==0) {
            $scope.friendRequestsCount = '';
        }
        else {
            $scope.friendRequestsCount = '('+vm.friendRequestsCount+')';
        }
        vm.loadingFriendRequests = false;
      },function(error){
        vm.loadingFriendRequests = false;
        //debugger;
      });
    }
    function addFriends(isValid){
      //debugger;
      if (isValid){
        var friends = {"friends":vm.friends};

        ClientService.addFriends(friends).then(function(response){
          //debugger;
          vm.connectSuccess = "CLIENT.Request sent successfully!";
          vm.friends = [];
          $timeout(function(){
            vm.doFade = true;
            vm.connectSuccess = "";
          }, 2500);
          getSentFriendRequests();
        },function(error) {
          //debugger;
        });
      }

    }
    function getSentFriendRequests(){
      //debugger;
      ClientService.getSentFriendRequests().then(function(response){
        //debugger;
        vm.sentFriendRequests = response.data;
      },function(error){
        //debugger;
      });
    }

    function getbBookings() {
      //debugger;
      vm.loading = true;
      ClientService.getOrders(vm.currentPage).then(function (response) {
        //debugger;
        vm.orders = response.data;
        vm.totalItems = response.meta.pagination.total;
        vm.itemsPerPage = response.meta.pagination.per_page;

        if (vm.orders.length == 0) {
          vm.isOrderEmpty = true;
        }
        vm.ordernumbers = 0;
        for(var i = 0; i < vm.orders.length ; i++) {
          vm.ordernumbers += vm.orders[i].order_number;
        }
        // alert(vm.ordernumbers);
        vm.loading = false;
        // arrangeOrdersDetail();
        //debugger;
      }, function (error) {
        //debugger;
        vm.loading = false;
      })
    }

    function printOrder(order) {
      ClientService.printOrder(order.ID_orders, $translate.use()).then(function (response) {
        var printWindow = window.open('', 'PRINT', 'height=600,width=800');
        printWindow.document.write(response);
        printWindow.document.close(); // necessary for IE >= 10
        printWindow.focus(); // necessary for IE >= 10*/

        $timeout(function(){ printWindow.print() }, 100);
        // printWindow.close();
      }, function (error) {
        alert('Print error!');
      });
    }

    function changeOrderDetailStatus(newStatus, order, index) {
      //debugger;
      if (newStatus == 6)
        $rootScope.$broadcast('orders-detail-changed');
      order.orders_detail.data[index].status = newStatus;
      //debugger;
    }

    function changeOrderStatus(newStatus, order) {
      //debugger;
      vm.loading = true;
      order.status = newStatus;
      var n_order = {
        "order": order,
        'lang': localStorage.getItem('NG_TRANSLATE_LANG_KEY') ? localStorage.getItem('NG_TRANSLATE_LANG_KEY') : $rootScope.language

      };
      ClientService.updateOrder(n_order).then(function (response) {
        //debugger;
        $rootScope.$broadcast('orders-detail-changed');
        vm.getOrders();
        vm.loading = false;
      }, function (error) {
        //debugger;
        vm.loading = false;
      })
    }
    function saveChanges(order, index) {
      //debugger;
      vm.loadingSaveChanges = true;
      angular.forEach(order.orders_detail.data, function(value, key) {
         value.t_price = value.price;
      });
      var n_order_detail = {
        "orders_detail": order.orders_detail.data,
        "save" : true,
        "lang": localStorage.getItem('NG_TRANSLATE_LANG_KEY') ? localStorage.getItem('NG_TRANSLATE_LANG_KEY') : $rootScope.language
      };
      ClientService.updateOrderDetails(n_order_detail, true).then(function (response) {
        //debugger;
        vm.loadingSaveChanges = false;
        $('#orderDetail' + index).modal('hide');
        $rootScope.$broadcast('orders-detail-changed');
        getOrders();
        vm.getbBookings();
      }, function (error) {
        //debugger;
        vm.loadingSaveChanges = false;
        $('#orderDetail' + index).modal('hide');
      })
    }

    function gotoRestaurantDetail(order, index) {
      //debugger;
      var id = '#orderDetail'+ index;
      $(id).modal('hide');
      //debugger;
      $state.go('main.restaurant_detail', {'restaurantId': order.ID_restaurant});
    }


    //Pop over functions
    var trigger = $('button');

    function showTip() {
      if (! $('#tip').is(':visible')) {
        trigger.click();
      }
    }

    function hideTip() {
      if ($('#tip').is(':visible')) {
        trigger.click();
      }
    }

    // trigger.mouseenter(showTip);

    $(document).on('mouseleave', '#tip', hideTip);
    //End pop over functions

    function resize(){
      $timeout(function(){
        $('#map_holder').locationpicker('autosize');
      }, 200);
    }

    function getLocation() {
      if ( vm.myDetails.latitude === null || vm.myDetails.longitude === null) {
        $geolocation.getCurrentPosition({
          timeout: 600
        }).then(function(position) {
          $timeout(function() {
            vm.myDetails.latitude = position.coords.latitude;
            vm.myDetails.longitude = position.coords.longitude;
            locale();
          }, 10);
        }, function(error){
          $timeout(function() {
            vm.location_error = "We couldn't locate your location! Please enter your location in the following box";
            vm.myDetails.latitude = 49.8209226;
            vm.myDetails.longitude = 18.262524299999995;
            locale();
          }, 10);
        });
      } else {
        locale();
      }
    }

    function locale(){
      var locationpicker = $('#map_holder');
      //locationpicker.locationpicker('autosize');
      locationpicker.locationpicker({
        location: {latitude: vm.myDetails.latitude, longitude: vm.myDetails.longitude },
        radius: 300,
        zoom: 15,
        inputBinding: {
          locationNameInput: $('#address_input')
        },
        onchanged: function(currentLocation) {
          vm.myDetails.latitude = currentLocation.latitude;
          vm.myDetails.longitude = currentLocation.longitude;
        },
        enableAutocomplete: true
      });
    }

    function getDiets() {
      ClientService.getDiets().then(function(response){
        vm.diets = {};

        angular.forEach(vm.language, function (value, key) {
          vm.diets[key] = { 'null': { 'id' : '-1', 'name' : "No diet", 'cust_order' : 0, 'lang' : "none"} };
        });

        angular.forEach(response.data, function (value, key) {
          vm.diets[value.lang]["+" + value.id] = value;
        });
        console.log(vm.diets);
      }, function(error){
        //debugger;
      });
    }

    function updateNoDiet() {
      vm.myDetails.ID_diet = '-1';
    }

    function getCurrentClient() {
      ClientService.getCurrentClient().then(function(response){
        vm.myDetails = response.data;
        getDiets();
        vm.myDetails.ID_diet = (vm.myDetails.ID_diet == null) ? "-1" : vm.myDetails.ID_diet;
        if (!vm.myDetails.lang) {
          var code = ClientService.getLanguageCode();
          vm.myDetails.lang = code;
        }
        getLocation();
      }, function(error){
        //debugger;
      });
    }

    function saveClient(isValid){
      if (isValid)
      {
        vm.myDetails.ID_diet = (vm.myDetails.ID_diet == '-1') ? null : vm.myDetails.ID_diet;
        ClientService.updateClient(vm.myDetails).then(function(response){
          if (vm.myDetails.ID_diet == null) {
              vm.myDetails.ID_diet = -1;
          }
          var msg = $translate.instant("PATRONAGE.DIFFERENT COUNTRY MESSAGE");
          vm.myDetailsSuccess = $translate.instant("CLIENT.CHANGE SUCCESS"); "Changes have been successfully saved!";
          vm.myDetails.password = "";
          vm.myDetails.confirm_password = "";
          window.scrollTo(0, 0);
        });
      }
    }

    function closeAlert() {
      vm.myDetailsSuccess = "";
      vm.location_error = "";
    }

    function changeCurrentPage() {
        vm.currentPage = 1;
    }

    function getRestaurantType() {
        var currentLanguage = localStorage.getItem('current_language');
        ClientService.getRestaurantType().then(function (response) {
            vm.business_type_all = response.data;
            vm.business_type = vm.business_type_all[currentLanguage];
        }, function (error) {

        });

    }

    function getAllpatronage() {
        // debugger;
        vm.loading = true;

        var now = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
        ClientService.getAllpatronage(vm.currentPage, vm.pat_distance, vm.pat_business, vm.pat_patron_only, now).then(function (response) {
            vm.totalItemsAvailable = response.count;
            vm.patronages = response.data;
            //vm.currentClientId = response.clientId;
            vm.itemsPerPage = 5;
            vm.clientLocation = response.location;
            vm.clientLang = response.lang;

            if (response.count == 0) {
                vm.isPatronagesEmpty = true;
            }else{
                vm.isPatronagesEmpty = false;
            }
            angular.forEach(vm.patronages, function(restaurant) {
                if (restaurant.photo){
                    restaurant.photo = appConstant.imagePath + restaurant.photo;
                } else {
                    restaurant.photo = "assets/images/placeholder.jpg";
                }
            });
        }, function (error) {
            debugger;
            vm.loading = false;
        })
    }

    function patronActivate(restaurantID, restaurantLang) {
        // var currentLanguage = localStorage.getItem('current_language') == 'cs' ? 'CZE' : 'ENG';
        if (vm.clientLang != restaurantLang) {
            var msg = $translate.instant("PATRONAGE.DIFFERENT COUNTRY MESSAGE");
            alert(msg);
            return;
        }
        var now = $filter('date')(new Date(), 'yyyy-MM-dd');
        ClientService.patronActivate(restaurantID, now).then(function(response) {
            if (response.success == 1)
                getAllpatronage();
        });
    }
    function max(list) {
        var max = 0;
        if (Array.isArray(list)) {
            for (var i = 0; i < list.length; i ++) {
                if (list[i] && max < Number(list[i])) max = Number(list[i]);
            }
        }
        return max;
    }
    function toNumber(patronage) {
        for (var key in patronage) {
            // skip loop if the property is from prototype
            if (!patronage.hasOwnProperty(key)) continue;

            var obj = patronage[key];
            if (!isNaN(obj)) patronage[key] = Number(obj);
        }
        return patronage;
    }
    function formatCurrency(patronage) {
        for (var key in patronage) {
            // skip loop if the property is from prototype
            if (!patronage.hasOwnProperty(key)) continue;
            if (key == 'id') continue;

            var obj = patronage[key];
            if (!isNaN(obj) && obj != "") {
                patronage[key] = changeBlankToComma($filter('number')(obj, 0)) + patronage.currency;
            }
        }
        return patronage;
    }
    function getActivePatronage() {
        vm.loading = true;
        var now = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

        var noStr = "PATRONAGE.NO";
        var yourStr = "PATRONAGE.YOUR";
        var naStr = "PATRONAGE.N/A";

        ClientService.getActivePatronage(vm.currentPage, now).then(function (response) {
            vm.totalItemsActive = response.count;
            vm.activePatronages = response.data;
            vm.currentClientId = response.clientId;
            //vm.itemsPerPage = response.meta.pagination.per_page;

            if (response.count == 0) {
                vm.activePatronagesEmpty = true;
            }else{
                vm.activePatronagesEmpty = false;
            }
            angular.forEach(vm.activePatronages, function(patronage) {
                var fromDate = new Date(patronage.from_date);
                var toDate = new Date(patronage.to_date);
                toDate.setDate(toDate.getDate() - 1);
                patronage.period = $filter('date')(fromDate, 'd.M') + ' - ' + $filter('date')(toDate, 'd.M.y');

                patronage = toNumber(patronage);
                if (patronage.status == "") patronage.status = 0;


                if (patronage.patron_finished_booking < patronage.minimal && patronage.win_booking < patronage.overtake) {
                    patronage.overtake = naStr;
                    patronage.overtake_css = "grey_td";
                }

                patronage.missing_booking = Number(patronage.win_booking) - Number(patronage.client_all_booking);

                if (patronage.missing_booking < 0) patronage.missing_booking = 0;

                // period and name
                if (patronage.client_status == 1) {
                    patronage.period_css = "";
                    if (patronage.missing_book > 0) {
                        patronage.name_css = "yellow_td";
                    } else {
                        patronage.name_css = "green_td";
                    }
                } else {
                    patronage.period_css = "yellow_td";
                    if (patronage.status == 1) {
                        patronage.name_css = "dark_td";
                    } else {
                        patronage.name_css = "";
                    }
                }

                // Patron's bookings
                if (patronage.status == 1) {
                    if (patronage.patron_finished_booking == 0)
                        patronage.patron_finished_booking = noStr;
                    else if(patronage.client_status == 1)
                        patronage.patron_finished_booking = yourStr;
                } else {
                    patronage.patron_finished_booking = naStr;
                    patronage.patron_booking_css = "grey_td";
                }

                // All your bookins
                if (patronage.client_all_booking == 0) {
                    patronage.client_all_booking = noStr;
                } else if (patronage.missing_booking == 0  && patronage.win_clientId != vm.currentClientId && patronage.highest_finished_booking == patronage.win_booking && patronage.highest_finished_booking == patronage.client_all_booking) {
                    patronage.all_css = "yellow_td";
                } else if (patronage.client_all_booking >= patronage.win_booking) {
                    patronage.all_css = "green_td";
                } else {
                    patronage.all_css = "yellow_td";
                }

                // Your finished bookings
                if (patronage.client_finished_booking == 0) {
                    patronage.client_finished_booking = noStr;
                } else if (patronage.missing_booking == 0  && patronage.win_clientId != vm.currentClientId && patronage.highest_finished_booking == patronage.win_booking && patronage.highest_finished_booking == patronage.client_finished_booking) {
                    patronage.finished_css = "yellow_td";
                } else if (patronage.client_finished_booking >= patronage.win_booking) {
                    patronage.finished_css = "green_td";
                } else {
                    patronage.finished_css = "yellow_td";
                }

                // highest finished bookings
                if (patronage.highest_finished_booking == 0) {
                    patronage.highest_finished_booking = noStr;
                    // } else if (patronage.client_finished_booking >= patronage.highest_finished_booking && patronage.client_finished_booking >= patronage.win_booking) {
                    //     patronage.highest_finished_booking = yourStr;
                } else if (patronage.client_finished_booking == patronage.highest_finished_booking && patronage.win_clientId == vm.currentClientId) {
                    patronage.highest_finished_booking = yourStr;
                } else if (patronage.client_finished_booking == patronage.highest_finished_booking && patronage.win_clientId != vm.currentClientId && patronage.highest_finished_booking != patronage.win_booking) {
                    patronage.highest_finished_booking = yourStr;
                }

                // missing bookings
                if (patronage.missing_booking == 0  && patronage.win_clientId != vm.currentClientId && patronage.highest_finished_booking == patronage.win_booking && patronage.highest_finished_booking == patronage.client_all_booking) {
                    patronage.highest_css = "red_td";
                } else if (patronage.missing_booking == 0) {
                    patronage.missing_booking = naStr;
                    patronage.missing_css = "grey_td";
                } else if (patronage.missing_booking > 0) {
                    if (patronage.minimal == patronage.win_booking) {
                        patronage.minimal_css = "red_td";
                    } else if (patronage.overtake == patronage.win_booking) {
                        patronage.overtake_css = "red_td";
                    } else if (patronage.highest_finished_booking == patronage.win_booking) {
                        patronage.highest_css = "red_td";
                    }
                }

                if (!isNaN(patronage.minimal)) {
                    patronage.minimal = $filter('number')(patronage.minimal, 0) + " " + patronage.currency;
                    patronage.minimal_css += " text-right";
                }
                if (!isNaN(patronage.overtake)) {
                    patronage.overtake = $filter('number')(patronage.overtake, 0) + " " + patronage.currency;
                    patronage.overtake_css += " text-right";
                }
                if (!isNaN(patronage.patron_finished_booking)) {
                    patronage.patron_finished_booking = $filter('number')(patronage.patron_finished_booking, 0) + " " + patronage.currency;
                    patronage.patron_booking_css += " text-right";
                }
                if (!isNaN(patronage.client_all_booking)) {
                    patronage.client_all_booking = $filter('number')(patronage.client_all_booking, 0) + " " + patronage.currency;
                    patronage.all_css += " text-right";
                }
                if (!isNaN(patronage.client_finished_booking)) {
                    patronage.client_finished_booking = $filter('number')(patronage.client_finished_booking, 0) + " " + patronage.currency;
                    patronage.finished_css += " text-right";
                }
                if (!isNaN(patronage.highest_finished_booking)) {
                    patronage.highest_finished_booking = $filter('number')(patronage.highest_finished_booking, 0) + " " + patronage.currency;
                    patronage.highest_css += " text-right";
                }
                if (!isNaN(patronage.missing_booking)) {
                    patronage.missing_booking = $filter('number')(patronage.missing_booking, 0) + " " + patronage.currency;
                    patronage.missing_css += " text-right";
                }
            });
            // vm.loading = false;
        }, function (error) {
            vm.loading = false;
        })
    }

    function removeActive(id) {
        ClientService.removeActive(id).then(function(response) {
            if (response.success == 1)
                getActivePatronage();
        });
    }
    function getHistoryPatronage() {
        vm.loading = true;

        var noStr = "PATRONAGE.NO";
        var yourStr = "PATRONAGE.YOUR";
        var naStr = "PATRONAGE.N/A";

        var now = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
        ClientService.getHistoryPatronage(vm.currentPage, now).then(function (response) {
            vm.totalItemsHistory = response.count;
            vm.historyPatronages = response.data;
            vm.currentClientId = response.clientId;
            //vm.itemsPerPage = response.meta.pagination.per_page;

            if (response.count == 0) {
                vm.historyPatronagesEmpty = true;
            }else{
                vm.historyPatronagesEmpty = false;
            }
            angular.forEach(vm.historyPatronages, function(patronage) {
                var fromDate = new Date(patronage.from_date);
                var toDate = new Date(patronage.to_date);
                toDate.setDate(toDate.getDate() - 1);
                patronage.period = $filter('date')(fromDate, 'd.M') + ' - ' + $filter('date')(toDate, 'd.M.y');

                patronage = toNumber(patronage);
                if (patronage.status == "") patronage.status = 0;
                if (patronage.patron_exist == "") patronage.patron_exist = 0;

                patronage.win_booking = 0;
                patronage.win_booking = Number(patronage.missing) + Number(patronage.finished);

                if (patronage.patron < patronage.minimal && patronage.status == 0) {
                    patronage.overtake = naStr;
                    patronage.overtake_css = "grey_td";
                }

                if (patronage.missing == 0) {
                    if (patronage.status == 1) patronage.name_css = "green_td";
                    else if (patronage.status == 0 && patronage.patron_exist == 1) patronage.name_css = "dark_td";
                    else patronage.name_css = "";
                } else {
                    if (patronage.status == 1) patronage.name_css = "red_td";
                    else patronage.name_css = "yellow_td";
                }
                // overtake
                if (patronage.overtake == 0) {
                    patronage.overtake = naStr;
                    patronage.overtake_css = "grey_td";
                }
                // patron's booking
                if (patronage.status == 1) {
                    patronage.patron = yourStr;
                } else if (patronage.patron == 0) {
                    patronage.patron = naStr;
                    patronage.patron_css = "grey_td";
                }

                // finished bookings
                if (patronage.missing == 0 && patronage.winner == 1) {
                    patronage.finished_css = "green_td";
                } else {
                    patronage.finished_css = "yellow_td";
                }

                // highest finished booking

                if (patronage.finished == patronage.highest && patronage.winner == 1) {
                    patronage.highest = yourStr;
                } else if (patronage.finished == patronage.highest && patronage.winner == 0 && patronage.missing > 0) {
                    patronage.highest = yourStr;
                }
                // missing booking
                if (patronage.missing == 0 && patronage.winner == 1) {
                    patronage.missing = naStr;
                    patronage.missing_css = "grey_td";
                }

                if (patronage.missing > 0) {
                    if (patronage.minimal == patronage.win_booking) {
                        patronage.minimal_css += " red_td";
                    } else if (patronage.highest >= patronage.win_booking) {
                        patronage.highest_css += " red_td";
                    } else if (patronage.overtake == patronage.win_booking) {
                        patronage.overtake_css += " red_td";
                    }
                } else if (patronage.missing == 0 && patronage.winner == 0) {
                    patronage.highest_css += " red_td";
                }

                if (!isNaN(patronage.minimal)) {
                    patronage.minimal = $filter('number')(patronage.minimal, 0) + " " + patronage.currency;
                    patronage.minimal_css += " text-right";
                }
                if (!isNaN(patronage.overtake)) {
                    patronage.overtake = $filter('number')(patronage.overtake, 0) + " " + patronage.currency;
                    patronage.overtake_css += " text-right";
                }
                if (!isNaN(patronage.patron)) {
                    patronage.patron = $filter('number')(patronage.patron, 0) + " " + patronage.currency;
                    patronage.patron_css += " text-right";
                }
                if (!isNaN(patronage.finished)) {
                    patronage.finished = $filter('number')(patronage.finished, 0) + " " + patronage.currency;
                    patronage.finished_css += " text-right";
                }
                if (!isNaN(patronage.highest)) {
                    patronage.highest = $filter('number')(patronage.highest, 0) + " " + patronage.currency;
                    patronage.highest_css += " text-right";
                }
                if (!isNaN(patronage.missing)) {
                    patronage.missing = $filter('number')(patronage.missing, 0) + " " + patronage.currency;
                    patronage.missing_css += " text-right";
                }
            });
        }, function (error) {
            vm.loading = false;
        })
    }

    function getBillingPatronage() {
        vm.loading = true;

        var noStr = "PATRONAGE.NO";
        var yourStr = "PATRONAGE.YOUR";
        var naStr = "PATRONAGE.N/A";

        var now = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
        ClientService.getBillingPatronage(vm.currentPage, now).then(function (response) {
            vm.totalItemsBilling = response.count;
            vm.billingPatronages = response.data;
            vm.currentClientId = response.clientId;

            vm.running = response.running;
            vm.finished = response.finished;
            vm.paid= response.paid;

            vm.paid.remain = (vm.finished.profit ? vm.finished.profit : 0) - (vm.paid.unpaid ? vm.paid.unpaid : 0)- (vm.paid.paid ? vm.paid.paid : 0);
            vm.paid.send = $filter('number')(vm.paid.remain, 2);

            if(vm.paid.send < 0) vm.paid.send = 0;

            angular.forEach(vm.billingPatronages, function(patronage) {
                var fromDate = new Date(patronage.from_date);
                var toDate = new Date(patronage.to_date);
                toDate.setDate(toDate.getDate() - 1);
                patronage.period = $filter('date')(fromDate, 'd.M') + ' - ' + $filter('date')(toDate, 'd.M.y');

                patronage = toNumber(patronage);

                if (patronage.history == 0) {
                    patronage.missing_booking = patronage.win_booking - patronage.client_all_booking;
                } else {
                    patronage.missing_booking = patronage.missing;
                }

                if (patronage.missing_booking == "") patronage.missing_booking = 0;

                if (patronage.missing_booking <= 0 && patronage.history == 0) {
                    patronage.name_css = "green_td";
                    if (patronage.highest_finished_booking > patronage.minimal) {
                        patronage.missing_css = "yellow_td text-right";
                    } else {
                        patronage.missing_css = "green_td text-right";
                    }
                } else if (patronage.missing_booking == 0) {
                    if (patronage.history == 0 && patronage.win_clientId != vm.currentClientId) {
                        patronage.missing_css = "red_td text-right";
                    } else {
                        patronage.missing_booking = naStr;
                        patronage.missing_css = "grey_td text-center";
                    }
                } else {
                    if (patronage.history == 0)
                        patronage.name_css = "yellow_td";
                    patronage.missing_css = "red_td text-right";
                }
                if (patronage.history == 1) {
                    patronage.all_booking = naStr;
                    patronage.all_css = "grey_td text-center";
                    patronage.profit_css = "green_td font-bold";
                } else {
                    patronage.all_cs = "text-right";
                }
                patronage.profit = patronage.finished_booking * patronage.promillage / 1000;
                if (!isNaN(patronage.all_booking)) {
                    patronage.all_booking = $filter('number')(patronage.all_booking, 0) + " " + patronage.currency;
                }
                if (!isNaN(patronage.finished_booking)) {
                    patronage.finished_booking = $filter('number')(patronage.finished_booking, 0) + " " + patronage.currency;
                }
                if (!isNaN(patronage.profit)) {
                    patronage.profit = $filter('number')(patronage.profit, 0) + " " + patronage.currency;
                }
                if (!isNaN(patronage.missing_booking)) {
                    patronage.missing_booking = $filter('number')(patronage.missing_booking, 0) + " " + patronage.currency;
                }
            });
        });
    }

    function sendAmount() {
        var accountNumber = $('#accountNumber').val();
        //var sendAmount = $('#sendAmount').val();
        var sendAmount = Number.parseFloat($('#sendAmount').val());
        if (accountNumber == "") {
            var msg = $translate.instant("PATRONAGE.ACCOUNT REQUIRE MESSAGE");
            alert(msg);
            return;
        }
        if (sendAmount < 0) {
            var msg = $translate.instant("PATRONAGE.NEGATIVE AMOUNT MESSAGE");
            alert(msg);
            return;
        }
        if (sendAmount > vm.paid.remain) {
            var msg = $translate.instant("PATRONAGE.SMALLER AMOUNT MESSAGE");
            alert(msg);
            return;
        }
        var min_value = vm.quizSetting['min_remuneration'];
        if (sendAmount < min_value) {
            var msg = $translate.instant("PATRONAGE.MINIMAL AMOUNT MESSAGE") + " " + min_value + vm.currency;
            alert(msg);
            return;
        }
        var user = JSON.parse(localStorage.getItem('user'));
        var content = "amount: " + sendAmount + " Kč <br>" +
            "account number: " + accountNumber + "<br>" +
            "client name: " + user.name + "<br>" +
            "client email: " + user.email + "<br><br>";

        var result = {
            "content": content,
            "from": user.email
        }

        ClientService.sendAmount(result).then(function (response) {
            alert(response);
        }, function (error) {
            alert(error);
        });
    }
  }

})();
