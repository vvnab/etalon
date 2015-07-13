define([
    'underscore',
    'libs/string.format-1.0.packed'
],
function (
    _
) {
    return {
        titleNew:   'Заведение нового бокса',
        name:       function(el){
                        return '{0} <small>({1})</small>'.format(el.get('name'), app.washing.get(el.get('washing')) ? app.washing.get(el.get('washing')).get('name') : '');
                    },
        fields: {
            name: {
                type:       'text',
                title:      'Наименование',
                widget:     'labeled left icon input',
                icon:       'stop',
                requried:   true
            },
            washing: {
                type:       'select',
                title:      'Мойка',
                widget:     'radio checkbox',
                source:     {
                                model:  'washing',
                                name:   'name',
                                filter: null
                            },
            },
            fastMode: {
                type:       'bool',
                title:      'Быстрый режим',
                widget:     'toggle checkbox',
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
                                washing: {
                                    identifier: 'washing',
                                    rules: [
                                        {
                                            type:  'checked',
                                            prompt: 'Выберите мойку'
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
                icon:   'chat'
            },
            washing: {
                type: 'choice',
                title: 'Мойка',
                source: {
                    model:  'washing',
                    name:   'name',
                    filter: null
                }
            }
        }
    }
})