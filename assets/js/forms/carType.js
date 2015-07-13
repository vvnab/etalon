define([
    'underscore',
    'libs/string.format-1.0.packed'
],
function (
    _
) {
    return {
        titleNew:   'Заведение нового типа автомобиля',
        name:       function(el){
                        return '{0} <small>({1})</small>'.format(el.get('name'), app.thesaurus_.get(el.get('class')).get('value'));
                    },
        fields: {
            name: {
                type:       'text',
                title:      'Наименование',
                widget:     'labeled left icon input',
                icon:       'truck',
                requried:   true
            },
            year: {
                type:       'text',
                title:      'Год выпуска',
                widget:     'labeled left icon input',
                icon:       'calendar',
                requried:   false
            },
            img: {
                type:       'img',
                title:      'Изображение',
                widget:     'circular image',
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
                type:   'text',
                title:  'Наименование',
                icon:   'truck'
            },
            class: {
                type: 'choice',
                title: 'Класс',
                source: {
                    model:  'thesaurus',
                    name:   'name',
                    filter: {type: 'carClass'}
                }
            }
        }
    }
})