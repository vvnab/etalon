var app = {};

require.config({
  baseUrl: '/js',
  paths: {
    'jquery':     '/js/libs/jquery-2.1.1.min',
    'backbone':   '/js/libs/backbone-min',
    'semantic':   '/js/libs/semantic.min',
    'underscore': '/js/libs/underscore-min'
  },
  'shim': {
    /*'semantic': {
        'deps': ['jquery']
    },*/
    'socket.io': {
      'exports': 'io'
    },
    'sails.io': {
      'deps':     ['socket.io'],
      'exports':  'io'
    }
  }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'text!/api/v1/thesaurus/',
    'forms/thesaurus',
    'forms/user',
    'forms/washing',
    'forms/box',
    'forms/carType',
    'forms/car',
    'forms/service',
    'libs/string.format-1.0.packed',
    'libs/jquery.mask.min',
    'libs/jquery.growl',
    'semantic',
], function (
    $,
    _,
    Backbone,
    thesaurus,
    thesaurusForm,
    userForm,
    washingForm,
    boxForm,
    carTypeForm,
    carForm,
    serviceForm
) {
    app.thesaurus_ = new Backbone.Collection(JSON.parse(thesaurus));
    var collections = [
        'thesaurus',
        'box',
        'carType',
        'car',
        'client',
        'order',
        'service',
        'user',
        'washing'
    ]
    
    /*
     * 
     */
    var forms = {
        'thesaurus':    thesaurusForm,
        'user':         userForm,
        'carType':      carTypeForm,
        'car':          carForm,
        'washing':      washingForm,
        'box':          boxForm,
        'service':      serviceForm,
    }
    
    var Model = Backbone.Model.extend();
    
    app.model = new Model({
        state: ''
    });
    
    var Collection = Backbone.Collection.extend({
        initialize: function() {
            this.pagination = {
                limit:  16,
                skip:   0
            };
            this.filters = {};
        },
        fetchAll:   false,
        fetched:    false,
        model:      Model,
        comparator: 'name'
    });
    
    
    _.each(collections, function(collection){
        if (!app[collection]) {
            app[collection] = new Collection();
            app[collection].name = collection;
            app[collection].url = '/api/v1/' + collection;
        }
    })
    
    app.thesaurus.fetchAll = true;
    app.washing.fetchAll = true;

    var Router = Backbone.Router.extend({
        routes: {
            '':                 'main',
            '!/:model':         'modelAdd',
            '!/:model/add':     'modelAdd',
            '!/:model/:id':     'modelEdit',
        },
        errorProcess: function(response){
            console.error(response);
        },
        setState: function(collection, state){
            var self = this;
            if (collection && !collection.fetched) {
                collection.fetch({
                    data: _.extend(collection.pagination, {where: collection.filters}),
                    success: function(collection, response){
                        collection.fetched = true;
                        app.model.set(state);
                    },
                    error: function(collection, response){
                        self.errorProcess(response);
                    }
                });
            } else {
                app.model.set(state);
            }
        },
        main: function(){
            this.setState(null, {
                state: {
                    name:   'main',
                    model:  null,
                    action: null,
                    id:     null
                }
            });
        },
        modelAdd: function(model){
            this.setState(app[model], {
                state: {
                    model:  model,
                    action: 'add',
                    id:     null
                }
            });
        },
        modelEdit: function(model, id){
            this.setState(app[model], {
                state: {
                    model:  model,
                    action: 'edit',
                    id:     id
                }
            });
        }
    });
    
    app.router = new Router();
    
    var View = Backbone.View.extend({
        el: $('#main-page'),
        events: {
            //'click #model-save':  'modelSave'
            'click #model-remove':  'modelRemove',
            'click #filter-set':    'filterSet',
            'change #filter input': 'filterSet',
            'click #filter-clear':  'filterClear',
            'click #page-next':     'pageNext',
            'click #page-previous': 'pagePrevious'
        },
        templates: {
            admin:      JST['assets/templates/admin/main.html'],
            message:    JST['assets/templates/admin/message.html'],
            collection: JST['assets/templates/admin/collection.html'],
            filter:     JST['assets/templates/admin/filter.html'],
            itemList:   JST['assets/templates/admin/itemList.html'],
            itemForm:   JST['assets/templates/admin/itemForm.html']
        },
        initialize: function(){
            this.model.on('change', this.render, this);
            Backbone.history.start();
        },
        render: function(){
            var self = this;
            var state = self.model.get('state') || {};
            var form = forms[state.model];
            var collection = app[state.model];
            var el = collection && state.id ? collection.get(state.id) : new Model();
            console.info('STATE:', state, el);
            if (state.name == 'main') {
                $('#main-page').html(self.templates.admin());
            } else {
                $('#main-page').html(self.templates.collection());
                $('#filter').html(self.templates.filter({form: form, model: state.model, filters: collection.filters}));
            }
            switch (state.action) {
                case 'add':
                    $('#form').html(self.templates.itemForm({el: el, form: form, model: state.model}));
                    break;
                case 'edit':
                    try {
                        $('#form').html(self.templates.itemForm({el: el, form: form, model: state.model}));
                    } catch(e) {
                        console.error(e);
                        app.router.navigate('#!/{0}'.format(state.model), {trigger: true});
                    }
                default: break;
            }
            if (form && form.postprocessing) {
                form.postprocessing($('#form'));
            }
            if (state.model) {
                $('#list').html(self.templates.itemList({collection: collection, id: state.id, title: form.name}));
            }
            $('.ui.checkbox').checkbox();
            $('.ui.dropdown').dropdown();
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
        modelSave: function() {
            if ($('#model-save').hasClass('loading')) return;
            var self = this;
            var state = self.model.get('state');
            var modelForm = forms[state.model];
            var collection = app[state.model];
            var el = collection.get(state.id) || null;
            var form = $('#form');
            var values = {};
            _.each(modelForm.fields, function(i, k){
                var input = form.find('[name="{0}"]'.format(k));
                if (i.type == 'multiselect' && input.is('[type="checkbox"]')) {
                    values[k] = [];
                    input.each(function(){
                        if ($(this).is(':checked')) {
                            values[k].push($(this).val());
                        }
                    });
                } else if (i.type == 'bool' && input.is('[type="checkbox"]')) {
                    values[k] = input.is(':checked');
                } else if (input.is('[type="radio"]')) {
                    input.each(function(){
                        if ($(this).is(':checked')) {
                            values[k]= $(this).val();
                        }
                    });
                } else {
                    values[k] = input.val();
                }
            });
            $('#model-save').addClass('loading');
            if (el) {
                el.save(values, {
                    wait: true,
                    success: function(model, response){
                        self.render();
                        $.growl({title: 'ОК', message: 'Успешно сохранено'});
                    },
                    error: self.errorProcess
                });
            } else {
                collection.create(values, {
                    wait: true,
                    success: function(model, response){
                        app.router.navigate('#!/{0}/{1}'.format(state.model, model.id), {trigger: true});
                        $.growl({title: 'ОК', message: 'Успешно сохранено'});
                    },
                    error: self.errorProcess
                });
            }
        },
        modelRemove: function() {
            if ($('#model-remove').hasClass('loading')) return;
            var self = this;
            var state = self.model.get('state');
            var modelForm = forms[state.model];
            var collection = app[state.model];
            var el = collection.get(state.id) || null;
            $('#model-remove').addClass('loading');
            el.destroy({
                wait: true,
                success: function(model, response) {
                    app.router.navigate('#!/{0}/add'.format(state.model), {trigger: true});
                    $.growl({title: 'ОК', message: 'Успешно удалено'});
                },
                error: self.errorProcess
            })
        },
        filterSet: function(){
            var self = this;
            var state = self.model.get('state');
            var collection = app[state.model];
            $('#filter input').each(function(){
                var name = $(this).attr('name');
                var value = $(this).val();
                var filterType = $(this).data('filter-type');
                if (value) {
                    switch (filterType) {
                        case 'contains':
                            collection.filters[name] = {
                                contains: value
                            };
                            break;
                        case 'equal':
                            collection.filters[name] = value;
                            break;
                    }
                }
            })
            collection.fetch({
                data: _.extend(collection.pagination, {where: collection.filters}),
                success: function(model, response){
                    self.render();
                }
            });
        },
        filterClear: function(){
            var self = this;
            var state = self.model.get('state');
            var collection = app[state.model];
            collection.filters = {};
            collection.fetch({
                data: _.extend(collection.pagination, {where: collection.filters}),
                success: function(model, response){
                    self.render();
                }
            });
        },
        pageNext: function(){
            var self = this;
            var state = self.model.get('state');
            var collection = app[state.model];
            collection.pagination.skip += collection.pagination.limit;
            collection.fetch({
                data: _.extend(collection.pagination, {where: collection.filters}),
                success: function(model, response){
                    self.render();
                }
            });
        },
        pagePrevious: function(){
            var self = this;
            var state = self.model.get('state');
            var collection = app[state.model];
            collection.pagination.skip -= collection.pagination.limit;
            collection.fetch({
                data: _.extend(collection.pagination, {where: collection.filters}),
                success: function(model, response){
                    self.render();
                }
            });
        }
    });
    
    app.view = new View({model: app.model});
});



