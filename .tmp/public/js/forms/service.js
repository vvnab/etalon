define([
    'underscore',
    'libs/string.format-1.0.packed'
],
function (
    _
) {
    return {
        titleNew:   'Заведение новой услуги',
        name:       function(el){
                        return '{0} <small>({1})</small>'.format(el.get('name'), app.thesaurus_.get(el.get('class')).get('value'));
                    },
        fields: {
            name: {
                type:       'text',
                title:      'Наименование',
                widget:     'labeled left icon input',
                icon:       'chat',
                requried:   true
            },
            desctiption: {
                type:       'text',
                title:      'Описание',
                widget:     'labeled left icon input',
                icon:       'text file',
                requried:   false
            },
            cost: {
                type:       'text',
                title:      'Стоимость',
                widget:     'labeled left icon input',
                icon:       'money',
                requried:   true
            },
            duration: {
                type:       'text',
                title:      'Продолжительность',
                widget:     'labeled left icon input',
                icon:       'time',
                requried:   true
            },
            durationFast: {
                type:       'text',
                title:      'Продолжительность (2)',
                widget:     'labeled left icon input',
                icon:       'rocket',
                requried:   true
            },
            class: {
                type:       'select',
                title:      'Класс автомобиля',
                widget:     'radio checkbox',
                source:     {
                                model:  'thesaurus',
                                name:   'name',
                                filter: {type: 'carClass'}
                            },
            },
        },
        postprocessing: function(form){
                            // form - $('#form')
                            form.form({
                                name: {
                                    identifier: 'name',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите наименование'
                                        }
                                    ]
                                },
                                cost: {
                                    identifier: 'cost',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите стоимость'
                                        }
                                    ]
                                },
                                duration: {
                                    identifier: 'duration',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите продолжительность'
                                        }
                                    ]
                                },
                                durationFast: {
                                    identifier: 'durationFast',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите продолжительность'
                                        }
                                    ]
                                },
                                class: {
                                    identifier: 'class',
                                    rules: [
                                        {
                                            type:  'checked',
                                            prompt: 'Введите тип'
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
            class: {
                title:  'Класс',
                type:   'choice',
                source: {
                    model: 'thesaurus',
                    name:   'name',
                    filter: {type: 'carClass'}
                }
            },
        }
    }
})