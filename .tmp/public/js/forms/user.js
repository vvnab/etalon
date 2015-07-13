define([
    'underscore',
    'libs/string.format-1.0.packed'
],
function (
    _
) {
    return {
        titleNew:   'Создание нового пользователя',
        name:       'fullName',
        fields: {
            fullName: {
                type:       'text',
                title:      'Ф.И.О',
                widget:     'labeled left icon input',
                icon:       'user',
                requried:   true
            },
            email: {
                type:       'text',
                title:      'E-Mail',
                widget:     'labeled left icon input',
                icon:       'mail',
                requried:   true
            },
            phone: {
                type:       'text',
                title:      'Телефон',
                widget:     'labeled left icon input',
                icon:       'phone',
                requried:   false
            },
            groups: {
                type:       'multiselect',
                title:      'Роли',
                widget:     'checkbox',
                source:     [
                                {
                                    name:   'Администратор',
                                    value:  'admin'
                                },
                                {
                                    name:   'Оператор',
                                    value:  'operator'
                                }
                             ]
            },
            washings: {
                type:       'multiselect',
                title:      'Мойки',
                widget:     'toggle checkbox',
                source:     {
                                model:  'washing',
                                name:   'name'
                            },
                addClass:   function(el){
                                // el - user
                                return _.contains(el.get('groups'), 'operator') ? 'washing-it' : 'washing-it hidden';
                            }
            }
        },
        postprocessing: function(form){
                            // form - $('#form')
                            form.find('[name="phone"]').mask('+7 (999) 999-99-99');
                            form.find('[name="groups"][value="operator"]').on('change', function(){
                                if ($(this).is(':checked')) {
                                    form.find('.washing-it').removeClass('hidden');
                                } else {
                                    form.find('.washing-it').addClass('hidden');
                                }
                            });
                            form.form({
                                email: {
                                    identifier: 'email',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите адрес электронной почты'
                                        },
                                        {
                                            type:   'contains[@]',
                                            prompt: 'Введите адрес электронной почты'
                                        }
                                    ]
                                },
                                fullName: {
                                    identifier: 'fullName',
                                    rules: [
                                        {
                                            type:  'empty',
                                            prompt: 'Введите имя пользователя'
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
            fullName: {
                type:   'text',
                title:  'Ф.И.О.',
                icon:   'user'
            },
            phone: {
                type:   'text',
                title:  'телефон',
                icon:   'phone'
            },
            groups: {
                type: 'choice',
                title: 'Группа',
                source: [
                    {
                        name:   'Администраторы',
                        value:  'admin'
                    },
                    {
                        name:   'Операторы',
                        value:  'operator'
                    },
                ]
            }
        }
    }
})