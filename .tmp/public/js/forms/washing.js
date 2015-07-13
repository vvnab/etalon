define([
    'underscore',
    'libs/string.format-1.0.packed'
],
function (
    _
) {
    return {
        titleNew:   'Заведение новой мойки',
        name:       'name',
        fields: {
            name: {
                type:       'text',
                title:      'Название',
                widget:     'labeled left icon input',
                icon:       'comment',
                requried:   true
            },
            addr: {
                type:       'text',
                title:      'Адрес',
                widget:     'labeled left icon input',
                icon:       'home',
                requried:   true
            },
            phone: {
                type:       'text',
                title:      'Телефон',
                widget:     'labeled left icon input',
                icon:       'phone',
                requried:   true
            },
            schedule: {
                type:       'textArea',
                title:      'Расписание',
                widget:     'labeled left icon input',
                icon:       'list',
                requried:   true
            },
        },
        postprocessing: function(form){
                            // form - $('#form')
                            form.find('[name="phone"]').mask('+7 (999) 999-99-99');
                            form.form({
                                name: {
                                    identifier: 'name',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите название мойки'
                                        }
                                    ]
                                },
                                addr: {
                                    identifier: 'addr',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите адрес мойки'
                                        }
                                    ]
                                },
                                phone: {
                                    identifier: 'phone',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите телефон мойки'
                                        }
                                    ]
                                }
                            }, {
                                inline:     true,
                                on:         'blur',
                                onSuccess:  _.bind(app.view.modelSave, app.view)
                            });
                        },
            
        filters: {
            name: {
                title:  'Название',
                type:   'text',
                icon:   'chat'
            },
            addr: {
                title:  'Адрес',
                type:   'text',
                icon:   'home'
            }
        }
    }
})