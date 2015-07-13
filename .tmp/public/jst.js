this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/admin/collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'ui page grid\' id=\'collection-page\'>\r\n    <div class=\'row\' id=\'filter\'>\r\n    </div>\r\n    <div class=\'row\'>\r\n        <div class=\'six wide column\' id=\'list\'>\r\n        </div>\r\n        <div class=\'ten wide column ui segment\' id=\'form\'>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\'footer collection\'>\r\n    <br/>\r\n    <div class=\'ui page grid bottom\'>\r\n        <div class=\'column center aligned\'>\r\n            &copy; ' +
((__t = ( new Date().getFullYear() )) == null ? '' : __t) +
' <div id=\'psilobora\'></div> Psilobora&trade;\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["assets/templates/admin/filter.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'ui menu\'>\r\n    <div class=\'item\'>\r\n        <i class=\'' +
((__t = ( _.isEmpty(filters) ? "blue" : "red" )) == null ? '' : __t) +
' filter large icon\'></i>\r\n    </div>\r\n    ';
 _.each(form.filters, function(i, k) {
        switch(i.type) { 
            case 'text': ;
__p += '\r\n            <div class=\'item filter-item\'>\r\n                <div class=\'ui icon input\'>\r\n                    <input value=\'' +
((__t = ( filters[k] ? filters[k].contains : "" )) == null ? '' : __t) +
'\' type=\'text\' data-filter-type=\'contains\' placeholder=\'' +
((__t = ( i.title )) == null ? '' : __t) +
'\' name=\'' +
((__t = ( k )) == null ? '' : __t) +
'\' autocomplete=\'off\'/>\r\n                    <i class=\'' +
((__t = ( i.icon )) == null ? '' : __t) +
' icon\'></i>\r\n                </div>\r\n            </div>\r\n                ';
 break;
            case 'choice': ;
__p += '\r\n            <div class=\'ui dropdown item\'>\r\n                <input type=\'hidden\' name=\'' +
((__t = ( k )) == null ? '' : __t) +
'\' data-filter-type=\'equal\' value=\'' +
((__t = ( filters[k] )) == null ? '' : __t) +
'\'/>\r\n                <div class=\'default text\'>\r\n                    ' +
((__t = ( i.title )) == null ? '' : __t) +
'\r\n                </div>\r\n                <i class=\'dropdown icon\'></i>\r\n                <div class=\'menu\'>\r\n                    ';
 if (_.isArray(i.source)) {
                        _.each(i.source, function(item){ ;
__p += '\r\n                            <div class=\'item\' data-value=\'' +
((__t = ( item.value )) == null ? '' : __t) +
'\'>\r\n                                ' +
((__t = ( item.name )) == null ? '' : __t) +
'\r\n                            </div>\r\n                    ';
 })} else if (_.isObject(i.source)) {
                        var collection = app[i.source.model];
                        if (collection.fetched) {
                            collection = i.source.filter ? collection.where(i.source.filter) : collection.toArray();
                            _.each(collection, function(item){
                            ;
__p += '\r\n                            <div class=\'item\' data-value=\'' +
((__t = ( item.id )) == null ? '' : __t) +
'\'>\r\n                                ' +
((__t = ( item.get(i.source.name) )) == null ? '' : __t) +
'\r\n                            </div>\r\n                            ';
 });
                        } else {
                            collection.fetch({
                                success: function(){
                                    collection.fetched = true;
                                    app.view.render();
                                }
                            })
                        }
                    } ;
__p += '\r\n                </div>\r\n            </div>\r\n                ';
 break;
        }
    }) ;
__p += '\r\n        \r\n    <div class=\'right menu\'>\r\n        <div class=\'item\'>\r\n            <div class=\'ui icon button basic ' +
((__t = ( _.isEmpty(filters) ? "disabled" : "" )) == null ? '' : __t) +
'\' id=\'filter-clear\'>\r\n                Сбросить\r\n                <i class=\'icon off\'></i>\r\n            </div>\r\n            <!--div class=\'ui icon button basic\' id=\'filter-set\'>\r\n                Применить\r\n                <i class=\'icon filter\'></i>\r\n            </div-->\r\n        </div>\r\n    </div>\r\n    \r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/admin/itemForm.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h5 class=\'ui header ' +
((__t = ( el.id ? "green" : "blue" )) == null ? '' : __t) +
'\'>\r\n';
 if (el.id) { ;
__p += '\r\n    Редактирование:\r\n    <div class="sub header">\r\n        <!-- ' +
((__t = ( el.get(model.name) )) == null ? '' : __t) +
' -->\r\n    </div>\r\n';
 } else { ;
__p += '\r\n    ' +
((__t = ( form.titleNew )) == null ? '' : __t) +
'\r\n    <div class="sub header">\r\n    </div>\r\n';
 } ;
__p += '\r\n</h5>\r\n\r\n<div class=\'ui horizontal icon divider\'>\r\n    <i class=\'asterisk icon\'></i>\r\n</div>\r\n    \r\n<div class=\'ui form\'>\r\n    ';
 _.each(form.fields, function(i, k){ 
        switch(i.type) {
            case 'text': ;
__p += '\r\n                <div class=\'field\'>\r\n                    <div class=\'ui ' +
((__t = ( i.widget )) == null ? '' : __t) +
'\'>\r\n                        <input type=\'text\' autocomplete=\'off\' name=\'' +
((__t = ( k )) == null ? '' : __t) +
'\' placeholder=\'' +
((__t = ( i.title )) == null ? '' : __t) +
'\' value=\'' +
((__t = ( i.value ? i.value(el) : el.get(k) )) == null ? '' : __t) +
'\' ' +
((__t = ( i.disabled ? "disabled" : "" )) == null ? '' : __t) +
'/>\r\n                        <i class=\'icon ' +
((__t = ( i.icon )) == null ? '' : __t) +
'\'></i>\r\n                        ';
 if(i.requried) { ;
__p += '\r\n                        <div class=\'ui corner label\'>\r\n                            <i class=\'icon asterisk\'></i>\r\n                        </div>\r\n                        ';
 } ;
__p += '\r\n                    </div>\r\n                </div>\r\n                ';
 break;
            case 'img': ;
__p += '\r\n                <div class=\'field\'>\r\n                    ';
 if (el.url) { ;
__p += '\r\n                        <a class=\'ui ' +
((__t = ( i.widget )) == null ? '' : __t) +
'\' href=\'' +
((__t = ( el.get("url") )) == null ? '' : __t) +
'\' target=\'_blank\'>\r\n                            <img style=\'height: 150px\' src=\'' +
((__t = ( el.get("img") || "http://cars.mail.ru/img/default/nofoto__catalog-model_sedan-240.png" )) == null ? '' : __t) +
'\'/>\r\n                        </a>\r\n                    ';
 } else { ;
__p += '\r\n                        <img class=\'ui ' +
((__t = ( i.widget )) == null ? '' : __t) +
'\' src=\'' +
((__t = ( el.get("img") )) == null ? '' : __t) +
'\'/>\r\n                    ';
 } ;
__p += '\r\n                </div>\r\n                ';
 break;
            case 'json': ;
__p += '\r\n                <div class=\'field\'>\r\n                    <div class=\'ui ' +
((__t = ( i.widget )) == null ? '' : __t) +
'\'>\r\n                        <input type=\'text\' autocomplete=\'off\' name=\'' +
((__t = ( k )) == null ? '' : __t) +
'\' placeholder=\'' +
((__t = ( i.title )) == null ? '' : __t) +
'\' value=\'' +
((__t = ( JSON.stringify(el.get(k)) )) == null ? '' : __t) +
'\'/>\r\n                        <i class=\'icon ' +
((__t = ( i.icon )) == null ? '' : __t) +
'\'></i>\r\n                        ';
 if(i.requried) { ;
__p += '\r\n                        <div class=\'ui corner label\'>\r\n                            <i class=\'icon asterisk\'></i>\r\n                        </div>\r\n                        ';
 } ;
__p += '\r\n                    </div>\r\n                </div>\r\n                ';
 break;
            case 'textArea': ;
__p += '\r\n                <div class=\'field\'>\r\n                    <div class=\'ui ' +
((__t = ( i.widget )) == null ? '' : __t) +
'\'>\r\n                        <textarea name=\'' +
((__t = ( k )) == null ? '' : __t) +
'\'>' +
((__t = ( JSON.stringify(el.get(k), space = 2))) == null ? '' : __t) +
'</textarea>\r\n                        ';
 if(i.requried) { ;
__p += '\r\n                        <div class=\'ui corner label\'>\r\n                            <i class=\'icon asterisk\'></i>\r\n                        </div>\r\n                        ';
 } ;
__p += '\r\n                    </div>\r\n                </div>\r\n                ';
 break;
            case 'bool': ;
__p += '\r\n                <div class=\'ui form segment ' +
((__t = ( i.addClass ? i.addClass(el) : "" )) == null ? '' : __t) +
'\'>\r\n                    <div class=\'inline field\'>\r\n                        <div class=\'ui ' +
((__t = ( i.widget )) == null ? '' : __t) +
'\'>\r\n                            <input type=\'checkbox\' name=\'' +
((__t = ( k )) == null ? '' : __t) +
'\' ' +
((__t = ( el.get(k) ? 'checked' : '' )) == null ? '' : __t) +
'/> \r\n                            <label>' +
((__t = ( i.title )) == null ? '' : __t) +
'</label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                ';
 break;
            case 'multiselect': ;
__p += '\r\n                <div class=\'ui form segment ' +
((__t = ( i.addClass ? i.addClass(el) : "" )) == null ? '' : __t) +
'\'>\r\n                    <div class=\'field\'>\r\n                        <label><b>' +
((__t = ( i.title )) == null ? '' : __t) +
':</b></label>\r\n                    </div>\r\n                    ';
 if (_.isArray(i.source)) { 
                        _.each(i.source, function(item){ ;
__p += '\r\n                        <div class=\'inline field\'>\r\n                            <div class=\'ui ' +
((__t = ( i.widget )) == null ? '' : __t) +
'\'>\r\n                                <input type=\'checkbox\' name=\'' +
((__t = ( k )) == null ? '' : __t) +
'\' value=\'' +
((__t = ( item.value )) == null ? '' : __t) +
'\' ' +
((__t = ( _.contains(el.get(k), item.value) ? 'checked' : '' )) == null ? '' : __t) +
'/> \r\n                                <label>' +
((__t = ( item.name )) == null ? '' : __t) +
'</label>\r\n                            </div>\r\n                        </div>\r\n                        ';
 });
                    } else if (_.isObject(i.source)) {
                        var collection = app[i.source.model];
                        if (collection.fetched) {
                            collection.each(function(item){
                            ;
__p += '\r\n                                <div class=\'inline field\'>\r\n                                    <div class=\'ui ' +
((__t = ( i.widget )) == null ? '' : __t) +
'\'>\r\n                                        <input type=\'checkbox\' name=\'' +
((__t = ( k )) == null ? '' : __t) +
'\' value=\'' +
((__t = ( item.id )) == null ? '' : __t) +
'\' ' +
((__t = ( _.contains(el.get(k), item.id) ? 'checked' : '' )) == null ? '' : __t) +
'/> \r\n                                        <label>' +
((__t = ( item.get(i.source.name) )) == null ? '' : __t) +
'</label>\r\n                                    </div>\r\n                                </div>\r\n                            ';

                            });
                        } else {
                            collection.fetch({
                                success: function(){
                                    collection.fetched = true;
                                    app.view.render();
                                }
                            })
                        }
                    } ;
__p += '\r\n                </div>\r\n                ';
 break;
            case 'select': ;
__p += '\r\n                <div class=\'ui form segment ' +
((__t = ( i.addClass ? i.addClass(el) : "" )) == null ? '' : __t) +
'\'>\r\n                    <div class=\'field\'>\r\n                        <label><b>' +
((__t = ( i.title )) == null ? '' : __t) +
':</b></label>\r\n                    </div>\r\n                    ';
 if (_.isArray(i.source)) { 
                        _.each(i.source, function(item){ ;
__p += '\r\n                        <div class=\'inline field\'>\r\n                            <div class=\'ui ' +
((__t = ( i.widget )) == null ? '' : __t) +
'\'>\r\n                                <input type=\'checkbox\' name=\'' +
((__t = ( k )) == null ? '' : __t) +
'\' value=\'' +
((__t = ( item.value )) == null ? '' : __t) +
'\' ' +
((__t = ( el.get(k) == item.value ? 'checked' : '' )) == null ? '' : __t) +
'/> \r\n                                <label>' +
((__t = ( item.name )) == null ? '' : __t) +
'</label>\r\n                            </div>\r\n                        </div>\r\n                        ';
 });
                    } else if (_.isObject(i.source)) {
                        var collection = app[i.source.model];
                        if (collection.fetched) {
                            collection = i.source.filter ? collection.where(i.source.filter) : collection.toArray();
                            _.each(collection, function(item){
                            ;
__p += '\r\n                                <div class=\'inline field\'>\r\n                                    <div class=\'ui ' +
((__t = ( i.widget )) == null ? '' : __t) +
'\'>\r\n                                        <input type=\'radio\' name=\'' +
((__t = ( k )) == null ? '' : __t) +
'\' value=\'' +
((__t = ( item.id )) == null ? '' : __t) +
'\' ' +
((__t = ( (_.isObject(el.get(k)) ?  el.get(k).id : el.get(k)) == item.id ? 'checked' : '' )) == null ? '' : __t) +
'/> \r\n                                        <label>' +
((__t = ( item.get(i.source.name) )) == null ? '' : __t) +
'</label>\r\n                                    </div>\r\n                                </div>\r\n                            ';

                            });
                        } else {
                            collection.fetch({
                                success: function(){
                                    collection.fetched = true;
                                    app.view.render();
                                }
                            })
                        }
                    } ;
__p += '\r\n                </div>\r\n                ';
 break;
        }
    }) ;
__p += '\r\n    \r\n    <div class=\'ui horizontal icon divider\'>\r\n        <i class=\'save icon\'></i>\r\n    </div>\r\n\r\n    <div class=\'ui small buttons\'>\r\n        <div class=\'ui submit green button\' id=\'model-save\'>\r\n            Сохранить\r\n        </div>\r\n        ';
 if (el.id) { ;
__p += '\r\n        <div class=\'or\'></div>\r\n        <a href=\'#!/' +
((__t = ( model )) == null ? '' : __t) +
'/add\' class=\'ui blue button\'>\r\n            Создать\r\n        </a>\r\n        <div class=\'or\'></div>\r\n        <div class=\'ui red button\' id=\'model-remove\'>\r\n            Удалить\r\n        </div>\r\n        ';
 } ;
__p += '\r\n    </div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["assets/templates/admin/itemList.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'ui vertical pointing menu\' style=\'width: 100%\'>\r\n    ';
 collection.each(function(el){ ;
__p += '\r\n        <a href=\'#!/' +
((__t = ( collection.name )) == null ? '' : __t) +
'/' +
((__t = ( el.id )) == null ? '' : __t) +
'\' class=\'item ';
 if (id == el.id) print("active") ;
__p += '\'>\r\n            <!--i class=\'edit icon\'></i-->\r\n            ' +
((__t = ( _.isFunction(title) ? title(el) : el.get(title) )) == null ? '' : __t) +
'\r\n        </a>\r\n    ';
 }) ;
__p += '\r\n</div>\r\n\r\n';
 if (collection.pagination.skip != 0 || collection.length == collection.pagination.limit) { ;
__p += '\r\n<center>\r\n    <div class=\'ui pagination menu\'>\r\n        <a class=\'item ' +
((__t = ( collection.pagination.skip == 0 ? "disabled" : "" )) == null ? '' : __t) +
'\' id=\'page-previous\'>\r\n            <i class=\'left arrow icon\'></i> Назад\r\n        </a>\r\n        <div class=\'item\'>\r\n            <i class=\'file outline icon\'></i>' +
((__t = ( collection.pagination.skip / collection.pagination.limit + 1 )) == null ? '' : __t) +
'\r\n        </div>\r\n        <a class=\'item ' +
((__t = ( collection.length < collection.pagination.limit ? "disabled" : "" )) == null ? '' : __t) +
'\' id=\'page-next\'>\r\n            Вперёд <i class=\'right arrow icon\'></i>\r\n        </a>\r\n    </div>\r\n</center>\r\n';
 } ;


}
return __p
};

this["JST"]["assets/templates/admin/main.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'container\'>\r\n    <div class=\'ui basic center aligned segment\'>\r\n        <br/>\r\n        <img src=\'/images/big-logo.png\'>\r\n        \r\n    </div>\r\n</div>\r\n\r\n<div class=\'footer main\'>\r\n    <div id=\'footer-menu\'>\r\n        <br/><br/>\r\n        <div class=\'ui four column page grid\'>\r\n            <div class=\'column center aligned\'>\r\n                <a href=\'#!/user\' class=\'ui icon header\'>\r\n                    <i class=\'circular users icon\'></i>\r\n                    Пользователи\r\n                    <div class=\'sub header\'>Заведение и редактирование пользователей системы (администраторы / операторы / клиенты)</div>\r\n                </a>            \r\n            </div>\r\n            <div class=\'column center aligned\'>\r\n                <a href=\'#!/washing\' class=\'ui icon header\'>\r\n                    <i class=\'circular home icon\'></i>\r\n                    Мойки\r\n                    <div class=\'sub header\'>Заведение и редактирование моек, боксов и расписаний их работы</div>\r\n                </a>            \r\n            </div>\r\n            <div class=\'column center aligned\'>\r\n                <a href=\'#!/carType\' class=\'ui icon header\'>\r\n                    <i class=\'circular truck icon\'></i>\r\n                    Автомобили\r\n                    <div class=\'sub header\'>Заведение и редактирование классов и типов автомобилей</div>\r\n                </a>            \r\n            </div>\r\n            <div class=\'column center aligned\'>\r\n                <a href=\'#!/service\' class=\'ui icon header\'>\r\n                    <i class=\'circular cart icon\'></i>\r\n                    Услуги\r\n                    <div class=\'sub header\'>Заведение и редактирование видов и стоимости услуг</div>\r\n                </a>            \r\n            </div>\r\n        </div>\r\n        <br/>\r\n        <div class=\'ui inverted divider clearing\'></div>\r\n        <br/>\r\n    </div>\r\n    <div class=\'ui page grid bottom\'>\r\n        <div class=\'column center aligned\'>\r\n            &copy; ' +
((__t = ( new Date().getFullYear() )) == null ? '' : __t) +
' <div id=\'psilobora\'></div> Psilobora&trade;\r\n        </div>\r\n    </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/admin/message.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'ui small ' +
((__t = ( type )) == null ? '' : __t) +
' message\'>\r\n    <i class=\'close icon\'></i>\r\n    <div class=\'header\'>\r\n        ' +
((__t = ( title )) == null ? '' : __t) +
'\r\n    </div>\r\n    <p>\r\n        ' +
((__t = ( message )) == null ? '' : __t) +
'\r\n    </p>\r\n</div>';

}
return __p
};

this["JST"]["assets/templates/admin/userForm.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h4 class=\'ui header ' +
((__t = ( el.id ? "teal" : "green" )) == null ? '' : __t) +
'\'>\r\n';
 if (el.id) { ;
__p += '\r\n    Редактирование:\r\n    <div class="sub header">\r\n        ' +
((__t = ( el.get('fullName') )) == null ? '' : __t) +
'\r\n    </div>\r\n';
 } else { ;
__p += '\r\n    Создание нового пользователя\r\n    <div class="sub header">\r\n        \r\n    </div>\r\n';
 } ;
__p += '\r\n</h4>\r\n\r\n<div class=\'ui divider\'></div>\r\n    \r\n<div class=\'ui form\'>\r\n    <div class=\'field\'>\r\n        <!--label>E-Mail:</label-->\r\n        <div class=\'ui labeled left icon input\'>\r\n            <input type=\'text\' name=\'fullName\' placeholder=\'Ф.И.О.\' value=\'' +
((__t = ( el.get("fullName") )) == null ? '' : __t) +
'\'/>\r\n            <i class=\'user icon\'></i>\r\n            <div class=\'ui corner label\'>\r\n                <i class=\'icon asterisk\'></i>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\'field\'>\r\n        <!--label>Телефон:</label-->\r\n        <div class=\'ui labeled left icon input\'>\r\n            <input type=\'text\' name=\'phone\' placeholder=\'Телефон\' value=\'' +
((__t = ( el.get("phone") )) == null ? '' : __t) +
'\'/>\r\n            <i class=\'phone icon\'></i>\r\n            <div class=\'ui corner label\'>\r\n                <i class=\'icon asterisk\'></i>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\'field\'>\r\n        <!--label>E-Mail:</label-->\r\n        <div class=\'ui labeled left icon input\'>\r\n            <input type=\'text\' name=\'email\' placeholder=\'E-Mail\' value=\'' +
((__t = ( el.get("email") )) == null ? '' : __t) +
'\'/>\r\n            <i class=\'mail icon\'></i>\r\n            <div class=\'ui corner label\'>\r\n                <i class=\'icon asterisk\'></i>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\'field\'>\r\n        <label> <b>Роли:</b></label>\r\n    </div>\r\n    <div class=\'ui form segment\'>\r\n        <div class=\'inline field\'>\r\n            <div class=\'ui checkbox\'>\r\n                <input type=\'checkbox\' name=\'group\' value=\'admin\' ' +
((__t = ( _.contains(el.get('groups'), 'admin') ? 'checked' : '' )) == null ? '' : __t) +
'/>\r\n                <label>Администратор</label>\r\n            </div>\r\n        </div>\r\n        <div class=\'inline field\'>\r\n            <div class=\'ui checkbox\'>\r\n                <input type=\'checkbox\' name=\'group\' value=\'operator\' ' +
((__t = ( _.contains(el.get('groups'), 'operator') ? 'checked' : '' )) == null ? '' : __t) +
'/>\r\n                <label> Оператор</label>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    \r\n    <div id=\'washings-field\' class=\'' +
((__t = ( !_.contains(el.get("groups"), "operator") ? "hidden" : "")) == null ? '' : __t) +
'\'>\r\n        <div class=\'field\'>\r\n            <label><b>Мойки:</b></label>\r\n        </div>\r\n        <div class=\'ui form segment\'>\r\n            ';
 app.washing.each(function(washing){ ;
__p += '\r\n            <div class=\'inline field\'>\r\n                <div class=\'ui toggle checkbox\'>\r\n                    <input type=\'checkbox\' name=\'washing\' value=\'' +
((__t = ( washing.id )) == null ? '' : __t) +
'\' ' +
((__t = ( _.contains(el.get('washings'), washing.id) ? 'checked' : '' )) == null ? '' : __t) +
'/> \r\n                    <label>' +
((__t = ( washing.get('name') )) == null ? '' : __t) +
' <small>(' +
((__t = ( washing.get('addr') )) == null ? '' : __t) +
')</small> </label>\r\n                </div>\r\n            </div>\r\n            ';
 }) ;
__p += '\r\n        </div>\r\n    </div>\r\n    \r\n    <div class=\'ui divider\'></div>\r\n        <div class=\'ui small buttons\'>\r\n            <div class=\'ui green button\'>\r\n                Сохранить\r\n            </div>\r\n            <div class=\'or\'></div>\r\n            <a href=\'#!/user/add\' class=\'ui blue button\'>\r\n                Создать нового\r\n            </a>\r\n        </div>\r\n</div>';

}
return __p
};

this["JST"]["assets/templates/operator/alert.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'ui large modal\' id=\'alert-form\'>\r\n    <div class=\'header\'>\r\n        Вы успешно записались на мойку!\r\n    </div>\r\n    <div class=\'content\'>\r\n        <div class=\'ui inverted segment\'>\r\n            <p>\r\n                Вы успешно записались на мойку "' +
((__t = ( app.washing.get(order.get('box').washing).get('name') )) == null ? '' : __t) +
'"\r\n                <br/>\r\n                на ' +
((__t = ( moment(order.get('datetime')).format('dddd DD MMMM в HH:mm') )) == null ? '' : __t) +
'\r\n            </p>\r\n        </div>\r\n    </div>\r\n    <div class=\'actions\'>\r\n        <div class=\'ui negative left labeled icon button\'>\r\n            <i class=\'checkmark icon\'></i>\r\n            Ok\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["assets/templates/operator/calendarMenu.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a class=\'item date-change\' data-direction=\'' +
((__t = ( -app.dayScrollCount )) == null ? '' : __t) +
'\'>\r\n    <i class=\'icon left arrow\'></i>\r\n</a>\r\n<a class=\'item date-change\' data-direction=\'0\'>\r\n    <i class=\'icon calendar\'></i>\r\n</a>\r\n<a class=\'item date-change\' data-direction=\'' +
((__t = ( app.dayScrollCount )) == null ? '' : __t) +
'\'>\r\n    <i class=\'icon right arrow\'></i>\r\n</a>\r\n';

}
return __p
};

this["JST"]["assets/templates/operator/main.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'ui page grid ' +
((__t = ( dateChange ? "transition hidden" : "" )) == null ? '' : __t) +
'\' style=\'padding-bottom: 80px\' id=\'data-sheet\'>\r\n    <div class=\'column\'>\r\n        <table class=\'washing-table\'>\r\n            <thead>\r\n                <tr>\r\n                    ';
 washing.each(function(washing){ ;
__p += '\r\n                    <th colspan=\'' +
((__t = ( box.filter(function(el){ return el.get("washing").id == washing.id}).length )) == null ? '' : __t) +
'\'>\r\n                        ' +
((__t = ( washing.get('name') )) == null ? '' : __t) +
'\r\n                    </th>\r\n                    ';
 }) ;
__p += '\r\n                </tr>\r\n                <tr>\r\n                ';
 washing.each(function(washing, k){ ;
__p += '\r\n                    ';
 _.each(box.filter(function(el){return el.get("washing").id == washing.id}), function(box){ ;
__p += '\r\n                    <td class=\'box-th box-color-' +
((__t = ( k )) == null ? '' : __t) +
'\'>\r\n                        ' +
((__t = ( box.get('name') )) == null ? '' : __t) +
'\r\n                    </td>\r\n                    ';
 }) ;
__p += '\r\n                ';
 }) ;
__p += '\r\n                </tr>\r\n            </thead>\r\n        </table>\r\n        <table class=\'washing-table\'>\r\n            <tbody>\r\n                ';

                    var schedules = washing.map(function(el){
                        return el.get('schedule');
                    });
                ;
__p += '\r\n                ';
 for(var i = 0; i < (app.daysPerPage || 2); i++){
                    var weekday = date.day() - 1 + i;
                    if (weekday > 6) {
                        weekday = 7 - weekday;
                    } else if (weekday < 0) {
                        weekday = 7 + weekday;
                    }
                    var minHour = _.reduce(schedules, function(res, item, k){
                        return item[weekday].bgn < res || !res ? item[weekday].bgn : res;
                    }, null);
                    var maxHour = _.reduce(schedules, function(res, item, k){
                        return item[weekday].end > res || !res ? item[weekday].end : res;
                    }, null); ;
__p += '\r\n                    <tr>\r\n                        <td colspan=\'' +
((__t = ( box.length )) == null ? '' : __t) +
'\'>\r\n                            <div class=\'date-title\'>\r\n                                ' +
((__t = ( moment(date).add(i, 'days').format('dddd DD MMMM YYYY') )) == null ? '' : __t) +
' г.\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    ';
 for(var k = minHour; k <= maxHour; k++){ ;
__p += '\r\n                    <tr class=\'hour-tr\'>\r\n                    ';
 washing.each(function(washing, j){ ;
__p += '\r\n                        ';
 _.each(box.filter(function(el){ return el.get('washing').id == washing.id}), function(box, l){ ;
__p += '\r\n                        ';
 if (washing.get("schedule")[weekday].end >= k && washing.get("schedule")[weekday].bgn <= k && moment(date).add(i, "days").add(k + 0.5, "hours") >= moment() ){ ;
__p += '\r\n                            <td data-box=\'' +
((__t = ( box.id )) == null ? '' : __t) +
'\' data-day=\'' +
((__t = ( moment(date).add(i, "days").toJSON() )) == null ? '' : __t) +
'\' data-hour=\'' +
((__t = ( k )) == null ? '' : __t) +
'\' data-content=\'' +
((__t = ( moment(date).add(i, "days").format("dd DD.MM.YY") + " " + k + ":00" )) == null ? '' : __t) +
'\' class=\'box-td box-color-' +
((__t = ( j )) == null ? '' : __t) +
'\'>\r\n                        ';
 } else { ;
__p += '\r\n                            <td class=\'noop\'>\r\n                        ';
 } ;
__p += '\r\n                            ';
 if (j == 0 && l == 0) { ;
__p += '\r\n                            <div class=\'hour-title\'>\r\n                                ' +
((__t = ( k + ':00' )) == null ? '' : __t) +
'\r\n                            </div>\r\n                            ';
 } ;
__p += '\r\n                            <div class=\'order-container\'>\r\n                                ';
 _([1,2]).each(function(part){ ;
__p += '\r\n                                <div class=\'order-container-2\' data-offset=\'' +
((__t = ( 60 - 60 / part )) == null ? '' : __t) +
'\'  id=\'' +
((__t = ( "{0}-{1}-{2}".format(box.id, moment(date).add(i, "days").add(k, "hours").unix(), part) )) == null ? '' : __t) +
'\'>\r\n                                </div>\r\n                                ';
 }) ;
__p += '\r\n                            </div>\r\n                        </td>\r\n                        ';
 }) ;
__p += '\r\n                    ';
 }) ;
__p += '\r\n                    </tr>\r\n                    ';
 } ;
__p += '\r\n                ';
 } ;
__p += '\r\n            </tbody>\r\n        </table>\r\n        <div class=\'ui segment inverted\' style=\'float: left\'>\r\n            <ul>\r\n                <li>\r\n                    <span class=\'order-box-hint order-class-1\'></span> - запись\r\n                </li>\r\n                <li>\r\n                    <span class=\'order-box-hint order-class-3\'></span> - клиент не явился\r\n                </li>\r\n                <li>\r\n                    <span class=\'order-box-hint order-class-4\'></span> - выполняется\r\n                </li>\r\n                <li>\r\n                    <span class=\'order-box-hint order-class-5\'></span> - выполнен\r\n                </li>\r\n            </ul>\r\n        </div>\r\n\r\n        <div style=\'float: left; margin-left: 10px; margin-top: 10px;\' id=\'order-info-box\'>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n<div class=\'footer collection\'>\r\n    <br/>\r\n    <div class=\'ui page grid bottom\'>\r\n        <div class=\'column center aligned\'>\r\n            &copy; ' +
((__t = ( new Date().getFullYear() )) == null ? '' : __t) +
' <div id=\'psilobora\'></div> Psilobora&trade;\r\n        </div>\r\n    </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/operator/orderBox.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'order-box order-class-' +
((__t = ( order.getState() )) == null ? '' : __t) +
'\' data-order=\'' +
((__t = ( order.id )) == null ? '' : __t) +
'\' id=\'' +
((__t = ( "order-" + order.id )) == null ? '' : __t) +
'\'>\r\n' +
((__t = ( order.getType() )) == null ? '' : __t) +
'\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/operator/orderForm.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'ui large modal\' id=\'order-form\'>\r\n    <div class=\'header\'>\r\n        ' +
((__t = ( app.order.id ? "Редактирование заказа" : "Заведение заказа" )) == null ? '' : __t) +
'\r\n    </div>\r\n    <div class=\'content\'>\r\n        <div class=\'ui form\'>\r\n            <div class=\'two fields\'>\r\n                <div class=\'field\'>\r\n                    <div class=\'ui left labeled icon input\'>\r\n                        <input name=\'washing\' type=\'text\' autocomplete=\'off\' placeholder=\'Место\' disabled value=\'' +
((__t = ( box.get("washing").name + ", бокс: " + box.get("name") )) == null ? '' : __t) +
'\'/>\r\n                        <i class=\'icon home\'></i>\r\n                    </div>\r\n                </div>\r\n                <div class=\'field\'>\r\n                    <div class=\'ui left labeled icon input\'>\r\n                        <input name=\'datetime\' type=\'text\' autocomplete=\'off\' placeholder=\'Время\' value=\'' +
((__t = ( datetime.format("DD.MM.YYYY HH:mm") )) == null ? '' : __t) +
'\'/>\r\n                        <i class=\'icon time\'></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\'fields\'>\r\n                <div class=\'eleven wide field\'>\r\n                    <div class=\'ui left labeled icon input\'>\r\n                        <input ' +
((__t = ( app.order.id ? "disabled" : "" )) == null ? '' : __t) +
' class=\'typeahead\' name=\'user\' type=\'text\' value=\'' +
((__t = ( app.order.id ? app.order.get("user").fullName : "" )) == null ? '' : __t) +
'\' autocomplete=\'off\' placeholder=\'Ф.И.О. клиента\'/>\r\n                        <i class=\'icon user\'></i>\r\n                    </div>\r\n                </div>\r\n                <div class=\'five wide field\'>\r\n                    <div class=\'ui left labeled icon input\'>\r\n                        <input ' +
((__t = ( app.order.id ? "disabled" : "" )) == null ? '' : __t) +
' class=\'typeahead\' name=\'phone\' type=\'text\' value=\'' +
((__t = ( app.order.id ? app.order.get("user").phone : "" )) == null ? '' : __t) +
'\' autocomplete=\'off\' placeholder=\'телефон\'/>\r\n                        <i class=\'icon phone\'></i>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\'fields\'>\r\n                <div class=\'seven wide field\'>\r\n                    <div class=\'ui left labeled icon input\'>\r\n                        <input ' +
((__t = ( app.order.id ? "disabled" : "" )) == null ? '' : __t) +
' class=\'typeahead\' name=\'carType\' type=\'text\' value=\'' +
((__t = ( app.order.id ? app.carType.get(app.order.get("car").carType).get("name") : "" )) == null ? '' : __t) +
'\' autocomplete=\'off\' placeholder=\'Модель автомобиля\'/>\r\n                        <i class=\'icon truck\'></i>\r\n                    </div>\r\n                </div>\r\n                <div class=\'three wide field\'>\r\n                    <div class=\'ui left labeled icon input\'>\r\n                        <input ' +
((__t = ( app.order.id ? "disabled" : "" )) == null ? '' : __t) +
' name=\'number\' type=\'text\' value=\'' +
((__t = ( app.order.id ? app.order.get("car").plateNumber.replace(/^\d+ /, '') : "" )) == null ? '' : __t) +
'\' autocomplete=\'off\' placeholder=\'Гос. номер\' autofocus/>\r\n                        <i class=\'icon keyboard\'></i>\r\n                    </div>\r\n                </div>\r\n                <div class=\'two wide field\'>\r\n                    <div class=\'ui right input\'>\r\n                        <input ' +
((__t = ( app.order.id ? "disabled" : "" )) == null ? '' : __t) +
' name=\'region\' type=\'text\' value=\'11\' autocomplete=\'off\'/>\r\n                        \r\n                    </div>\r\n                </div>\r\n                <div class=\'four wide field\'>\r\n                    <div class=\'ui selection dropdown\'>\r\n                        <input type=\'hidden\' name=\'service\' value=\'' +
((__t = ( app.order.id ? app.thesaurus.find(function(el){return _.isEqual(el.get("value"), app.order.get("serviceSet"))}).get("name") : "" )) == null ? '' : __t) +
'\'/>\r\n                        <div class=\'default text\'>Тип мойки</div>\r\n                        <i class=\'dropdown icon\'></i>\r\n                        <div class=\'menu\'>\r\n                            ';
 _.each(app.thesaurus.where({type: 'serviceType'}), function(el){ ;
__p += '\r\n                            <div class=\'item\' data-value=\'' +
((__t = ( el.id )) == null ? '' : __t) +
'\'>' +
((__t = ( el.get("name") )) == null ? '' : __t) +
'</div>\r\n                            ';
 }); ;
__p += '\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\'ui inverted segment\'>\r\n            ';
 if (app.order.id){ ;
__p += '\r\n            <div class=\'fields\' style=\'float:right\'>\r\n                <div class=\'field\'>\r\n                    <div class=\'ui selection dropdown\'>\r\n                        <input type=\'hidden\' name=\'state\' value=\'' +
((__t = ( app.order.getStateId() )) == null ? '' : __t) +
'\'/>\r\n                        <div class=\'default text\'>Статус заказа</div>\r\n                        <i class=\'dropdown icon\'></i>\r\n                        <div class=\'menu\'>\r\n                            ';
 _.each(app.thesaurus.where({type: 'orderState'}), function(el){ ;
__p += '\r\n                            <div class=\'item\' data-value=\'' +
((__t = ( el.id )) == null ? '' : __t) +
'\'>' +
((__t = ( el.get("name") )) == null ? '' : __t) +
'</div>\r\n                            ';
 }); ;
__p += '\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            ';
 } ;
__p += '\r\n            <dl>\r\n                <dt>Место</dt>\r\n                <dd>\r\n                    <span id=\'order-washing\'>\r\n                        ' +
((__t = ( box.get('washing').addr )) == null ? '' : __t) +
'\r\n                    </span>\r\n                </dd>\r\n                <dt>Время</dt>\r\n                <dd>\r\n                    <span id=\'order-datetime\'>\r\n                        ' +
((__t = ( datetime.format("DD.MM.YYYY HH:mm") )) == null ? '' : __t) +
'\r\n                    </span>\r\n                </dd>\r\n                <dt>Услуга</dt>\r\n                <dd>\r\n                    <span id=\'order-service\'> ' +
((__t = ( app.order.id ? app.thesaurus.find(function(el){return _.isEqual(el.get("value"), app.order.get("serviceSet"))}).get("name") : "--" )) == null ? '' : __t) +
' </span>\r\n                </dd>\r\n                <dt>Стоимость</dt>\r\n                <dd>\r\n                    <span id=\'order-cost\'> ' +
((__t = ( app.order.id ? app.order.getCost() : "--" )) == null ? '' : __t) +
' </span> руб.\r\n                </dd>\r\n                <dt>Время выполнения</dt>\r\n                <dd>\r\n                    <span id=\'order-duration\'> ' +
((__t = ( app.order.id ? app.order.getDuration() : "--" )) == null ? '' : __t) +
'  </span> мин.\r\n                </dd>\r\n            </dl>\r\n        </div>\r\n    </div>\r\n    <div class=\'actions\'>\r\n        <div class=\'two fluid ui buttons\'>\r\n            <div class=\'ui negative left labeled icon button\'>\r\n                <i class=\'remove icon\'></i>\r\n                ' +
((__t = ( app.order.id ? 'Выйти' : 'Отмена' )) == null ? '' : __t) +
' \r\n            </div>\r\n            <div class=\'ui positive right labeled icon button\'>\r\n                Сохранить\r\n                <i class=\'checkmark icon\'></i>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["assets/templates/operator/orderInfoBox.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'ui segment\'>\r\n    <small class=\'ui label\'>\r\n        ' +
((__t = ( moment(order.get('datetime')).format('DD.MM.YYYY HH:mm') )) == null ? '' : __t) +
'\r\n    </small>\r\n    <p>\r\n        <span class=\'ui label black\'>' +
((__t = ( order.get('car') ? order.get('car').plateNumber : '' )) == null ? '' : __t) +
'</span> ' +
((__t = ( order.get('carType') ? order.get('carType').name : '' )) == null ? '' : __t) +
'\r\n    </p>\r\n    <p>\r\n        ' +
((__t = ( order.get('user') ? order.get('user').fullName : '' )) == null ? '' : __t) +
' ' +
((__t = ( order.get('user') ? order.get('user').phone : '' )) == null ? '' : __t) +
'\r\n    </p>\r\n</div>';

}
return __p
};