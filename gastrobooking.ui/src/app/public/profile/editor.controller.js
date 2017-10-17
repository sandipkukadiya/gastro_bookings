/**
 * Created by yonatom on 8/31/16.
 */

(function () {
    'use strict';
    
    angular
        .module('app.restaurant')
        .controller('EditorController', EditorController);
    /*@ngNoInject*/

    function EditorController($rootScope,ProfileService) {

        var data = [
            
            {
                name: 'menutype',
                title:'MenuType',
                params: {
                    'background-color': '#b3282e',
                    'color': 'white',
                    'font-family':'Ubuntu,sans-serif',
                    'font-size':'14px'
                },
                type: 1
            },
            {
                name: 'menugroup',
                title:'MenuGroup',
                params: {
                    'background-color': 'white',
                    'color': '#888',
                    'font-family':'Ubuntu,sans-serif',
                    'font-size':'14px'
                },
                type: 1
            },
            {
                name: 'datepicker',
                title:'DatePicker',
                params: {
                    'background-color': 'white',
                    'color': '#555',
                    'font-family':'sans-serif',
                    'font-size':'14px'
                },
                type: 1
            },
            {
                name: 'menuofdaybutton',
                title:'DayButton',
                params: {
                    'background-color': '#b3282e',
                    'color': 'white',
                    'font-family':'sans-serif',
                    'font-size':'14px'
                },
                type: 1
            },
            {
                name: 'menusubgroup',
                title:'MenuSubGroup',
                params: {
                    'background-color': 'white',
                    'color': '#b3282e',
                    'font-family':'Ubuntu, sans-serif',
                    'font-size':'18px'
                },
                type: 1
            },
            {
                name: 'menutitle',
                title:'MenuTitle',
                params: {
                    'background-color': 'white',
                    'font-family':'Ubuntu, sans-serif',
                    'font-size':'14px'
                },
                type: 1
            },
            {
                name: 'menulist',
                title:'ListMenu',
                params: {
                    'background-color': 'white',
                    'color': '#b3282e',
                    'font-family':'Ubuntu, sans-serif',
                    'font-size':'18px'


                },
                type: 1
            },
            {
                name: 'menulistcomment',
                title:'Comment',
                params: {
                    'background-color': 'white',
                    'color': '#333',
                    'font-family':'Ubuntu,sans-serif',
                    'font-size':'14px'
                },
                type: 1
            },
            {
                name: 'bookbutton',
                title:'Book',
                params: {
                    'background-color': '#b6bf00',
                    'color': 'white',
                    'font-family':'sans-serif',
                    'font-size':'14px'
                },
                type: 1
            },
            {
                name: 'menulistorder',
                title:"ListOrder",
                params: {
                    'background-color': 'white',
                    'color': '#333',
                    'font-family':'Ubuntu,sans-serif',
                    'font-size':'14px'
                },
                type: 1
            },
            {
                name: 'headerchange',
                title:"ChangeHeader",
                params: {
                    'background-color': 'white',
                    'font-family':'Ubuntu,sans-serif',
                    'font-size':'14px'
                },
                type: 1
            },
            {
                name: 'headercolor',
                title:"ChangeHeaderColor",
                params: {
                    'color': '#777'
                },
                type: 2
            },
            {
                name: 'bgcolor',
                title:"BackgroundColor",
                params: {
                    'background-color': 'white'
                },
                type: 2
            },
            {
                name: 'showphoto',
                title:"Show photo on/off",
                params: {
                    'option': 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'photo_half_size',
                title:"Photo frame 1/2 size",
                params: {
                    'option': 'on'
                },
                type: 4,
                defaults: ['off', 'on']
            },
            {
                name: 'listdetail',
                title:"Menu list details on/off",
                params: {
                    'option': 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'menusubgroup_activation',
                title:"Subgroups on/off",
                params: {
                    'option': 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'menulist_prefix_one',
                title:"Menu list 1st prefix on/off",
                params: {
                    option: 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'menulist_prefix_two',
                title:"Menu list 2nd prefix on/off",
                params: {
                    option: 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'menulist_rectangle',
                title:"Menu list rectangles on/off",
                params: {
                    option: 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'show_order',
                title:"Right side confirmation area on/off",
                params: {
                    option: 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'menudirection',
                title:"Menu types/groups change position, groups roll up/down",
                params: {
                    option: 'left'
                },
                type: 3,
                defaults: ['left', 'up','right']
            },
            {
                name: 'showtype',
                title:"Display Menu Types",
                params: {
                    option: 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            }
        ];//-------array of datastore

        function params_generator() {
            $('#try').html(null);
            $.each(data, function (key_property, property) {
                $('#try').append(`
                    <div>
                    <div class="col-md-12" style="margin:10px 0px">
                        <h4 class="col-md-8"><b>${property.title}</b></h4>
                        <div class="col-md-4">
                      ${(property.type == 1?`<button class="btn btn-primary btn-md titleremover" data-title="${property.title}">Remove</button>`:"")}
                        </div>
                    </div>
                        ${fields_generator(property)}
                        
                    </div>
                `)
            });
            button();
            eventRemove();
        }//-------create full HTML block

        function fields_generator(property) {
            var strol = '';

            $.each(property.params, function (key_param, param) {
                switch (property.type) {
                    case 1:
                    case 2:
                        strol += `
                    <label style="font-weight: normal;">${key_param}</label>
                    <div class="col-md-12">
                    <div class="col-md-8">
                    <input
                      type="text"
                      class="form-control"
                      data-name="${property.name}"
                      data-property="${key_param}"
                      value="${param}"
                      name="${property.name}-${key_param}" />
                    </div>
                    <div class="col-md-4 ">
                      ${(property.type == 1?`<button class="btn btn-primary btn-md remover" data-name="${property.name}" data-property="${key_param}" data-value="${param}">Remove</button>`:"")}
                    </div>
                    </div>
                      <br>`;
                        break;
                    case 3:
                    case 4:
                        strol += `
                    <label style="font-weight: normal;">${key_param}</label>
                    <select data-name="${property.name}" 
                            data-property="${key_param}">
                        ${options_generator(property.defaults)}
                    </select>`;
                        break;
                }
            });

            return strol;
        }//-------generate all fields for one type

        function options_generator(options) {
            var options_string = '';

            $.each(options, function (key_option, option){
                options_string += `<option value="${option}">${option}</option>`;
            });

            return options_string;
        }//-------generate fields for option

        function button() {
            $('#generate_button,#open_window').on('click', function () {
                if (this.id == 'generate_button') {
                    var a = '1';
                }
                else if (this.id == 'open_window') {
                    var a ='2';
                }

                $('input[type=text],select').each(function () {
                    var _name = $(this).data('name');
                    var _propertys = $(this).data('property');
                    var _value = $(this).val();


                    $.each(data, function (key_property, property) {
                        if (property.name == _name) {
                            data[key_property].params[_propertys] = _value;
                        }
                    });
                });

                urlgen(a);

            });
        }//-------------create button and start script for changing array from old one to new one

        function urlgen(a) {
            var strurl = '';
            $.each(data, function (key_property, property) {
                $.each(property.params, function (key_param, param) {

                    switch (property.type) {
                        case 1:strurl += `${property.name}[${key_param}]=${param}`;
                            break;
                        case 2:strurl += `${property.name}=${param}`;
                            break;
                        case 3:strurl += `${property.name}=${param}`;
                            break;
                        case 4:strurl += `${property.name}=${param}&listdetail=off`;
                            break;

                    }
                    strurl += '&';
                });
                
                return strurl;
            });

            strurl = strurl.replace(/#/g, "%23");
            addhref(strurl,a);

        }//-------------generate values from fields to string variable

        function addhref(strurl,a){
            var a_href = $('#frame').attr('data-original');
            var res = a_href.split("#");
            var newhref=res[0]+"?"+strurl+"#"+res[1];

            check_button(newhref,a);

        };//-------add to url our values

        function check_button(newhref,a){
            if( a =='1'){

                var sourcecode=`<iframe id="frame" src="${newhref}" height="700px" width="100%"></iframe>`;

                $('#frame').attr('src', '').attr('src',newhref);
                $('#Copycode').attr('data-clipboard-text',sourcecode);
            }
            else {
                window.open(newhref)
            }
        };

        $('.adder').on('click',function(){

            var _name= $('#name').val();
            var _property = $('#property').val();
            var _param = $('#value').val();
            var check=true;

            $.each(data, function(key_property, property) {

                if(property.name == _name) {
                    property.params[_property] = _param;
                    check=false;
                }
            });

            if(check == true){
                data.unshift({name:_name,title:_name,params:{[_property]:_param},type:1})
            }

            params_generator();

        });//-------Add fields functioon

        function eventRemove() {
            $('.remover').on('click',function(){
                var _name= $(this).data('name');
                var _propertys = $(this).data('property');
                var _param = $(this).data('value');

                $.each(data, function(key_property, property) {

                    if (property.name == _name) {
                        delete data[key_property].params[_propertys];
                    }

                });

                params_generator();

            });//-------remove fields functioon
            $('.titleremover').on('click',function(){
                var _title = $(this).data('title');

                $.each(data, function(key_property, property) {

                    if (property.title == _title) {
                        data.splice(key_property, 1)
                        return false;
                    }

                });

                params_generator();

            });//-------remove title 
        }

        function change_frame_src(){
            $("#frame").attr("src","#/widget/restaurant/"+$rootScope.restaurants[0].id).attr("data-original","#/widget/restaurant/"+$rootScope.restaurants[0].id);
        }

        function CopyEvent() {
            $('#Copycode').click(function () {
                alert("The copy was successful!)");
            });
        }

        function getRestaurants(){
            return ProfileService.getRestaurants($rootScope.currentUser.id).then(function(response){
                $rootScope.restaurants = response.data;
            });
        }



        function init() {
            getRestaurants().then(function() {
                change_frame_src($rootScope.restaurants[0].id);
            });
            params_generator();
            CopyEvent();
        }//---------------initialise functions

        init();

    }

})();