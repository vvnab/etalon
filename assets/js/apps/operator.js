var app = {
    timeout:        null,
    TIMEOUT:        30 * 60,
    orderTimeout:   null,
    ORDER_TIMEOUT:  5
};

require.config({
  baseUrl: '/js',
  waitSeconds: 60,
  paths: {
    'socket.io':        '/js/dependencies/sails.io',
    'jquery':           '/js/libs/jquery-2.1.1.min',
    'backbone':         '/js/libs/backbone-min',
    'semantic':         '/js/libs/semantic.min',
    'underscore':       '/js/libs/underscore-min',
    'typeahead':        '/js/libs/typeahead.bundle.min',
    'backbone.socket':  '/js/libs/sails.io.backbone',
    'growl':            '/js/libs/jquery.growl'
  },
  'shim': {
    'semantic': {
        'deps': ['jquery']
    },
    'typeahead': {
        'deps': ['jquery']
    },
    'growl': {
        'deps': ['jquery']
    },
    /*
    'socket.io': {
      'exports': 'io'
    },
    'sails.io': {
      'deps':     ['socket.io'],
      'exports':  's'
    }
    */
  }
});

require([
    'jquery',
    'underscore',
    //'socket.io',
    'text!/api/v1/thesaurus',
    'text!/api/v1/washing?sort=name',
    'text!/api/v1/box?sort=name',
    'text!/api/v1/service?sort=name',
    'text!/api/v1/carType?sort=name&limit=0',
    'text!/api/v1/user?sort=fullName&limit=0',
    //'text!/api/v1/car?limit=0',
    'backbone',
    //'backbone.socket',
    'semantic',
    'typeahead',
    'libs/moment-with-langs',
    'libs/string.format-1.0.packed',
    'libs/jquery.mask.min',
    'growl'
], function (
    $,
    _,
    //socket,
    thesaurus,
    washing,
    box,
    service,
    carType,
    user
    //car
) {
    moment.lang('ru');
    
    var PersistentCollection = Backbone.Collection.extend({
        initialize: function(models, options) {
            if (options.url) {
                this.url = options.url;
            }
            /*
             * попытка загрузить из localStorage
             */
            var data = window.localStorage.getItem(options.className);
            if (data) {
                this.reset(JSON.parse(data), {silent: true});
                console.log('Справочник "{0}" загружен!'.format(options.className));
               
                /*
                 * обновить справочники
                 */
                this.fetch({reset: true});
            } else {
                /*
                 * загрузка из сети
                 */
                this.reset([], {silent: true});
                window.localStorage.removeItem(options.className);
                if (this.url) {
                    this.fetch({reset: true});
                }
            }
            
            this.on('reset', function(){
                /*
                 * событие по окончании загрузки справочника
                 */
                console.log('Справочник "{0}" обновлён!'.format(options.className));
                /*
                 * сохраняем справочник в localStorage
                 */
                try {
                    window.localStorage.setItem(options.className, JSON.stringify(this));
                    console.log('Справочник "{0}" сохранён!'.format(options.className));
                } catch (e) {
                    console.log('localStorage set ERROR ' + e);
                }
            }, this);
            return this;
        }
    });

    app.thesaurus = new Backbone.Collection(JSON.parse(thesaurus));
    app.washing = new Backbone.Collection(JSON.parse(washing));
    app.box = new Backbone.Collection(JSON.parse(box));
    app.service = new Backbone.Collection(JSON.parse(service));
    app.carType = new Backbone.Collection(JSON.parse(carType));
    app.user = new Backbone.Collection(JSON.parse(user));
    app.user.url = '/api/v1/user/';
    app.car = new PersistentCollection([], {
        className:  'car',
        url:        '/api/v1/car/?limit=0'
    });
   
    
    app.daysPerPage = app.thesaurus.findWhere({type: 'settings', name: 'daysPerPage'}).get('value');
    app.dayScrollCount = app.thesaurus.findWhere({type: 'settings', name: 'dayScrollCount'}).get('value');
  
    $('#calendar-menu').html(JST['assets/templates/operator/calendarMenu.html']);
    
    var Model = Backbone.Model.extend();
    
    app.model = new Model({
        state: ''
    });
    
    var Order = Backbone.Model.extend({
        urlRoot: '/api/v1/order/',
        getCost: function(){
            var self = this;
            var carType = app.carType.get(self.get('carType'));
            if (carType) {
                var services = _.map(self.get('serviceSet'), function(el){
                    return app.service.findWhere({name: el, class: carType.get('class')});
                });
                self.set({
                    services: _.map(services, function(el){
                        return el ? el.id : null;
                    })
                });
                return _.reduce(services, function(s, el){
                    return s + (el ? el.get('cost') : 0);
                }, 0);
            } else {
                return '--';
            }
        },
        getDuration: function(){
            var self = this;
            var carType = app.carType.get(self.get('carType'));
            if (carType) {
                var services = _.map(self.get('serviceSet'), function(el){
                    return app.service.findWhere({name: el, class: carType.get('class')});
                });
                self.set({
                    services: _.map(services, function(el){
                        return el ? el.id : null;
                    })
                });
                return _.reduce(services, function(s, el){
                    return s + (el ? el.get('duration') : 0);
                }, 0);
            } else {
                return '--';
            }
        },
        getHourPart: function(){
            var self = this;
            return Math.round(moment(self.get('datetime')).minutes() + 1 / 60) ? 2 : 1;
        },
        getType: function(){
            var self = this;
            try {
                var type = _.first(self.get('serviceSet'))[0];
            } catch(error) {
                var type = '-';
            }
            return type;
        },
        getStateId: function(){
            var self = this;
            return app.thesaurus.get(self.get('state')).id;
        },
        getState: function(){
            var self = this;
            return app.thesaurus.get(self.get('state')).get('value');
        },
        setState: function(state){
            var self = this;
            var id = app.thesaurus.findWhere({type: 'orderState', value: state}).id;
            self.set({ state: id });
        },
        drawBox: function(){
            var self = this;
            $('#order-' + self.id).remove();
            if (self.getState() != 2) {
                var datetime = moment(self.get('datetime'));
                var id = '{0}-{1}-{2}'.format(self.get('box').id, datetime.minutes(0).seconds(0).milliseconds(0).unix(), self.getHourPart());
                $('#' + id).append(JST['assets/templates/operator/orderBox.html']({order: self}));
            }
        }
    });
    
    app.orders = new Backbone.Collection();
    app.orders.model = Order;
    app.orders.comparator = function(el){
        return el.get('datetime');
    };
    app.orders.url = '/api/v1/order/date';

    
    var cartypes = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 12,
        local: app.carType.map(function(el) {
            return {
                id: el.id,
                name: el.get('name')
            };
        })
    });
 
    cartypes.initialize();
    
    var users = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('fullName'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 12,
        local: app.user.map(function(el) {
            return {
                id: el.id,
                fullName: el.get('fullName')
            };
        })
    });
    
    app.usersB = users;
 
    users.initialize();

    var Router = Backbone.Router.extend({
        routes: {
            '':                             'main',
            '!/date/:date':                 'main',
            '!/order/edit/:id':             'orderEdit',
            '!/order/add/:box/:datetime':   'orderAdd'
        },
        errorProcess: function(response){
            console.error(response);
        },
        setState: function(collection, state){
            var self = this;
            app.model.set(state);
        },
        main: function(date){
            var self = this;
            date = date ? date : app.date.toJSON();
            app.orders.fetch({
                data: {
                    bgn: date,
                    end: moment(date).add(app.daysPerPage, 'days').toJSON()
                },
                success: function(collection, response) {
                    self.setState(null, {
                        state: {
                            name:   'main',
                            action: 'dateChange',
                            id:     null,
                            data: {
                                date: date ? moment(date) : moment().startOf('day')
                            }
                        }
                    });
                    // таймаут загрузки заказов
                    clearInterval(app.orderTimeout);
                    app.orderTimeout = setInterval(function(){
                        app.orders.fetch({
                            data: {
                                bgn: date,
                                end: moment(date).add(app.daysPerPage, 'days').toJSON()
                            }
                        });
                    }, app.ORDER_TIMEOUT * 1000);
                },
                error: function(collection, response) {
                    $.growl.error({title: 'Ошибка', message: 'Не удалось загрузить список заказов!'});
                }
            });
        },
        orderAdd: function(box, datetime){
            delete app.order;
            app.order = new Order({
                box: app.box.get(box)
            });
            this.setState(null, {
                state: {
                    name:   'main',
                    action: 'orderAdd',
                    id:     null,
                    data: {
                        box: app.box.get(box),
                        datetime: moment(datetime)
                    }
                }
            });
        },
        orderEdit: function(id){
            app.order = app.orders.get(id);
            if (!app.order) {
                app.router.navigate('#', {trigger: true});
                return true;
            }
            this.setState(null, {
                state: {
                    name:   'main',
                    action: 'orderEdit',
                    id:     null,
                    data: {
                        box: app.order.get('box'),
                        datetime: moment(app.order.get('datetime'))
                    }
                }
            });
            return false;
        }
    });
    
    app.router = new Router();
    
    var View = Backbone.View.extend({
        el: $(document),
        events: {
            'click':                                                'timeoutReset',
            'click .date-change':                                   'dateChange',
            'click .box-td .order-container div':                   'orderAdd',
            'click .order-box':                                     'orderEdit',
            'input #order-form [name="datetime"]':                  'orderDatetimeChange',
            'change #order-form [name="service"]':                  'orderServiceChange',
            'typeahead:selected #order-form [name="carType"]':      'carTypeSelected',
            'typeahead:autocompleted #order-form [name="carType"]': 'carTypeSelected',
            'typeahead:selected #order-form [name="user"]':         'userSelected',
            'typeahead:autocompleted #order-form [name="user"]':    'userSelected',
            'mouseover .order-box':                                 'orderInfoBoxShow',
            'mouseout .order-box':                                  'orderInfoBoxHide',
        },
        templates: {
            main:           JST['assets/templates/operator/main.html'],
            message:        JST['assets/templates/admin/message.html'],
            orderForm:      JST['assets/templates/operator/orderForm.html'],
            alert:          JST['assets/templates/operator/alert.html'],
            orderInfoBox:   JST['assets/templates/operator/orderInfoBox.html'],
        },
        initialize: function(){
            app.date = moment().startOf('day');
            this.model.on('change', this.render, this);
            Backbone.history.start();
            this.timeoutReset();
            app.orders.on('add remove change', function(){
                app.orders.each(function(el){el.drawBox()});
            })
        },
        timeoutReset: function(){
            clearTimeout(app.timeout);
            app.timeout = setTimeout(function(){
                location.reload(false);
            }, 1000 * app.TIMEOUT);
        },
        render: function(){
            var self = this;
            var state = self.model.get('state') || {};
            var collection = app[state.model];
            var el = collection && state.id ? collection.get(state.id) : new Model();
            console.info('STATE:', state);
            $('*').popup('remove');
            if (state.name == 'main' && state.action == 'dateChange') {
                if ($('#data-sheet').length) {
                    $('#data-sheet').transition({
                        animation: 'scale',
                        duration: '0.2s',
                        complete: function(){
                            $('td.box-td').popup('remove');
                            $('#main-page').html(self.templates.main({dateChange: true, washing: app.washing, box: app.box, date: state.data.date || app.date}));
                            $('td.box-td').popup();
                            $('#data-sheet').transition({
                                animation: 'scale',
                                duration: '0.2s'
                            });
                            app.orders.each(function(el){el.drawBox()});
                        }
                    });
                } else {
                    $('#main-page').html(self.templates.main({dateChange: false, washing: app.washing, box: app.box, date: state.data.date}));
                    app.orders.each(function(el){el.drawBox()});
                }
            } else if (state.name == 'main' && state.action == 'refresh') {
                $('#main-page').html(self.templates.main({dateChange: false, washing: app.washing, box: app.box, date: state.data.date}));
                app.orders.each(function(el){el.drawBox()});
            }
            
            switch (state.action) {
                case 'orderEdit':
                case 'orderAdd':
                    if (!$('#data-sheet').length) {
                        $('#main-page').html(self.templates.main({dateChange: false, washing: app.washing, box: app.box, date: app.date}));
                    }
                    $('.ui.modal').remove();
                    $('#main-page').append(self.templates.orderForm({
                        washing: app.washing.get(state.data.washing),
                        box: app.box.get(state.data.box),
                        datetime: state.data.datetime,
                    }));
                    $('.ui.modal').modal('setting', {
                        closable: false,
                        transition: 'vertical flip',
                        onDeny: function(){
                            app.router.navigate('!/date/{0}'.format(app.date.toJSON()), {trigger: false});
                        },
                        onApprove: function(){
                            return self.orderSave();
                        },
                    }).modal('show');
                    $('#order-form [name="carType"]').typeahead({
                        minLength: 2,
                        highlight: true,
                        strong: true,
                        hint: true
                    },{
                        displayKey: 'name',
                        source: cartypes.ttAdapter()
                    });
                    $('#order-form [name="user"]').typeahead({
                        minLength: 2,
                        highlight: true,
                        strong: true,
                        hint: true
                    },{
                        displayKey: 'fullName',
                        source: users.ttAdapter()
                    });
                    
                    $('#order-form [name="number"]').mask('S 000 SS', {
                        translation: {
                            'S': {pattern: /[А,В,С,Е,Н,К,М,О,Р,Т,Х,У,а,в,с,е,н,к,м,о,р,т,х,у]/, optional: true},
                            //'9': {pattern: /[0-9]/, optional: false},
                            //'0': {pattern: /[0-9]/, optional: true}
                        },
                        onChange: function(){
                            var self = $('#order-form [name="number"]');
                            var num = self.val().replace(/ /g, '');
                            var region = $('#order-form [name="region"]').val();
                            var plateNumber = region + ' ' + num;
                            console.log('plateNumber', plateNumber);
                            var car = app.car.findWhere({plateNumber: plateNumber});
                            if (car) {
                                app.order.set({
                                    car: car.toJSON(),
                                    carType: car.get('carType'),
                                    user: car.get('user')
                                });
                                $('#order-form [name="carType"]').val(car.get('carType').name);
                                $('#order-form [name="user"]').val(car.get('user').fullName);
                                $('#order-form [name="phone"]').val(car.get('user').phone);
                            } else {
                                app.order.unset('car');
                                $('#order-form [name="carType"]').val("");
                                $('#order-form [name="user"]').val("");
                                $('#order-form [name="phone"]').val("");
                            }
                        }
                    });
                    $('#order-form [name="phone"]').mask('+7 (999) 999-99-99');
                    break;
                case 'alert':
                    $('.ui.modal').remove();
                    $('#main-page').append(self.templates.alert({
                        order: app.order,
                    }));
                    $('.ui.modal').modal('setting', {
                        closable: true,
                        transition: 'vertical flip',
                        onApprove: function(){
                            self.model.set({
                                state: {
                                    name:   'main',
                                    action: 'refresh',
                                    id:     null,
                                    data: {
                                        date: app.date
                                    }
                                }
                            })
                        },
                    }).modal('show');
                    break;
                default: break;
            }
            $('.ui.checkbox').checkbox();
            $('.ui.dropdown').dropdown();
            $('td.box-td').popup();
        },
        errorProcess: function(model, response) {
            $('#model-save').removeClass('loading');
            var self = app.view;
            var errors = response.responseJSON;
            var errMsgList = _.reduce(errors, function(s, i, k){
                return s + '<li>{0}</li>'.format(i.err);
            }, '')
            var html = self.templates.message({
                type: 'error',
                title: 'Ошибка сохранения',
                message: '<ul>{0}</ul>'.format(errMsgList)
            });
            $('#form .message').remove();
            $('#form .header').first().after(html);
            console.error(error);
        },
        dateChange: function(e) {
            var el = $(e.currentTarget);
            var self = this;
            var direction = parseInt(el.data('direction'));
            if (direction == 0) {
                app.date = moment().startOf('day');
            } else {
                app.date = app.date.add(direction, 'days');
            }
            app.router.navigate('!/date/{0}'.format(app.date.toJSON()), {trigger: true});
        },
        orderAdd: function(e) {
            var el = $(e.currentTarget);
            var self = this;
            var box = app.box.get(el.parents('.box-td').data('box'));
            var day = el.parents('.box-td').data('day');
            var hour = el.parents('.box-td').data('hour');
            var minutes = el.data('offset');
            var datetime = moment(day).add(hour, 'hours').add(minutes, 'minutes');
            app.router.navigate('!/order/add/{0}/{1}'.format(box.id, datetime.toJSON()), {trigger: true});
        },
        orderEdit: function(e){
            var el = $(e.currentTarget);
            var self = this;
            var order = el.data('order');
            app.router.navigate('!/order/edit/{0}'.format(order), {trigger: true});
            return false;
        },
        orderDatetimeChange: function(e){
            var el = $(e.currentTarget);
            var self = this;
            var datetime = el.val();
            $('#order-datetime').text(datetime);
        },
        orderServiceChange: function(e){
            var el = $(e.currentTarget);
            var self = this;
            var service = el.val();
            $('#order-service').text(app.thesaurus.get(service).get('name'));
            var services = app.thesaurus.get(service).get('value');
            app.order.set({
                serviceSet: services
            })
            $('#order-cost').text(app.order.getCost());
            $('#order-duration').text(app.order.getDuration());
        },
        carTypeSelected: function(el, item){
            app.order.set({carType: app.carType.get(item.id).toJSON()});
            $('#order-cost').text(app.order.getCost());
            $('#order-duration').text(app.order.getDuration());
        },
        userSelected: function(el, item){
            app.order.set({user: app.user.get(item.id).toJSON()});
            $('#order-form [name="phone"]').val(app.user.get(item.id).get('phone'));
        },
        orderSave: function() {
            var self = this;
            var datetime = moment($('#order-form [name="datetime"]').val(), 'DD.MM.YYYY HH:mm');
            var services = app.order.get('serviceSet');
            var carType = app.order.get('carType');
            var car = app.order.get('car');
            var user = app.order.get('user');
            var fullName = $('#order-form [name="user"]').val();
            var phone = $('#order-form [name="phone"]').val();
            var plateNumber = $('#order-form [name="region"]').val() + ' ' + $('#order-form [name="number"]').val().replace(/ /g, '');
            var orderState = $('#order-form [name="state"]').val() || app.thesaurus.findWhere({type: 'orderState', value: 1}).id;
            
            function orderCreate() {
                app.order.save({
                    datetime:   datetime,
                    operator:   'null',
                    user:       app.order.get('user').id,
                    car:        app.order.get('car').id,
                    box:        app.order.get('box').id,
                    state:      orderState,
                    services:   services
                }, {
                    wait: true,
                    success: function(model, response){
                        if (!_.isObject(model.get('user'))) {
                            model.set({
                                user: app.user.get(model.get('user')).toJSON()
                            })
                        }
                        if (!_.isObject(model.get('car'))) {
                            model.set({
                                car: app.car.get(model.get('car')).toJSON()
                            })
                        }
                        if (!_.isObject(model.get('box'))) {
                            model.set({
                                box: app.box.get(model.get('box')).toJSON()
                            })
                        }
                        app.orders.add(model, {merge: true});
                        //$('.ui.modal').modal('hide');
                        app.router.navigate('!/date/{0}'.format(app.date.toJSON()), {trigger: false});
                        if (model.get('state') == '539f15766ee884700afc6287') {
                            self.model.set({
                                state: {
                                    name:   'main',
                                    action: 'alert',
                                    id:     null,
                                    data: {
                                        date: app.date
                                    }
                                }
                            })
                        } else {
                            $('.ui.modal').modal('hide');
                            $('.ui.modal').remove();
                            self.model.set({
                                state: {
                                    name:   'main',
                                    action: 'refresh',
                                    id:     null,
                                    data: {
                                        date: app.date
                                    }
                                }
                            })
                        }
                    }
                });
            }
            if (!carType || !(user || fullName) || !plateNumber || !services || !phone) {
                $.growl.error({title: 'Ошибка', message: 'Недостаточно данных для заведения заказа!'});
                return false;
            }
            /*
             * - если нет пользователя - создаём пользователя,
             *   после проверяем есть ли машина, если нет, то создаём машину,
             *   если да, то привязываем машину к пользователю
             */
            
            if (!user) {
                //заводим пользователя
                app.user.create({
                    email: '{0}@etalon.ru'.format(_.shuffle('0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWZYX').join('')),
                    fullName: fullName,
                    phone: phone,
                    enb: true
                }, {
                    wait: true,
                    success: function(user, response){
                        app.order.set({user: user.toJSON()});
                        app.user.add(user);
                        users.add([{
                            id: user.id,
                            fullName: user.get('fullName')
                        }])
                        if (!car) {
                            app.car.create({
                                plateNumber: plateNumber,
                                carType: carType.id,
                                user: user.id
                            }, {
                                wait: true,
                                success: function(car, response){
                                    car.set({
                                        user: user.toJSON(),
                                        carType: carType
                                    })
                                    app.car.add(car);
                                    app.order.set({car: car.toJSON()});
                                    orderCreate();
                                },
                                error: function(){
                                    $.growl.error({title: 'Ошибка', message: 'Не удалось создать новоый автомобиль!'});
                                }
                            })
                        }
                        
                    },
                    error: function(){
                        $.growl.error({title: 'Ошибка', message: 'Не удалось создать нового пользователя!'});
                    }
                });
            } else if (!car) {
                // заводим автомобиль
                app.car.create({
                    plateNumber: plateNumber,
                    carType: carType.id,
                    user: user.id
                }, {
                    wait: true,
                    success: function(car, response){
                        car.set({
                            user: user,
                            carType: carType
                        })
                        app.car.add(car);
                        app.order.set({car: car.toJSON()});
                        orderCreate();
                    },
                    error: function(){
                        $.growl.error({title: 'Ошибка', message: 'Не удалось создать новоый автомобиль!'});
                    }
                })
            }
            else {
                orderCreate();
            }
            return false;
        },
        orderInfoBoxShow: function(e) {
            var el = $(e.currentTarget);
            var self = this;
            var order = app.orders.get(el.data('order'));
            app.currentOrderInfoBox = order.id;
            $('#order-info-box').html(self.templates.orderInfoBox({order: order}));
        },
        orderInfoBoxHide: function(e) {
            $('#order-info-box').empty();
            /*
            var el = $(e.currentTarget);
            var self = this;
            var order = app.orders.get(el.data('order'));
            */
        }
    });
    
    app.view = new View({model: app.model});
    
});

