define([
    'underscore',
    'libs/string.format-1.0.packed'
],
function (
    _
) {
    return {
        titleNew:   'Заведение нового автомобиля',
        name:       function(el){
                        var carType = el.get('carType');
                        return '{0} <small>({1})</small>'.format(el.get('plateNumber'), carType ? carType.name : '');
                    },
        fields: {
            plateNumber: {
                type:       'text',
                title:      'Гос. номер',
                widget:     'labeled left icon input',
                icon:       'keyboard',
                requried:   true
            },
            carType: {
                type:       'text',
                title:      'Марка автомобиля',
                widget:     'labeled left icon input',
                icon:       'truck',
                requried:   false,
                disabled:   true,
                value:      function(el){
                    try {
                        return el.get('carType').name
                    } catch(e) {
                        return '';
                    }
                    
                }
            },
            user: {
                type:       'text',
                title:      'Владелец',
                widget:     'labeled left icon input',
                icon:       'user',
                requried:   false,
                disabled:   true,
                value:      function(el){
                    try {
                        return el.get('user').fullName
                    } catch(e) {
                        return '';
                    }
                    
                }
            }
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
            plateNumber: {
                type:   'text',
                title:  'Гос. номер',
                icon:   'truck'
            }
        }
    }
})