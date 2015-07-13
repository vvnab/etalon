define([
    'underscore',
    'libs/string.format-1.0.packed'
],
function (
    _
) {
    return {
        titleNew:   'Создание новой записи',
        name:       'name',
        fields: {
            type: {
                type:       'text',
                title:      'Тип',
                widget:     'labeled left icon input',
                icon:       'info',
                requried:   true
            },
            name: {
                type:       'text',
                title:      'Имя',
                widget:     'labeled left icon input',
                icon:       'chat',
                requried:   true
            },
            value: {
                type:       'json',
                title:      'Значение',
                widget:     'labeled left icon input',
                icon:       'edit',
                requried:   true
            },
        },
        postprocessing: function(form){
                            // form - $('#form')
                            form.form({
                                type: {
                                    identifier: 'type',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите тип'
                                        }
                                    ]
                                },
                                name: {
                                    identifier: 'name',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите имя'
                                        }
                                    ]
                                },
                                value: {
                                    identifier: 'value',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите значение'
                                        }
                                    ]
                                },
                            }, {
                                inline:     true,
                                on:         'blur',
                                onSuccess:  _.bind(app.view.modelSave, app.view)
                            });
                        },
            
        filters: {
            name: {
                type:   'text',
                title:  'Наименование',
                icon:   'chat'
            },
            type: {
                type: 'choice',
                title: 'Тип',
                source: [
                    {
                        name:   'Набор услуг',
                        value:  'serviceType'
                    },
                    {
                        name:   'Статус заказа',
                        value:  'orderState'
                    },
                    {
                        name:   'Класс автомобиля',
                        value:  'carClass'
                    },
                    {
                        name:   'Общие настройки',
                        value:  'settings'
                    },
                ]
            }
        }
    }
})