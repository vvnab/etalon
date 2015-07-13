var classes = [
    {
        // class A
        id: '539f15d16ee884700afc628c',
        carcaseTypes: [
            "Кабриолет",
            "Кабриолет (компактный)",
            "Кабриолет (среднеразмерный)",
            "Купе",
            "Купе (компактный)",
            "Купе (среднеразмерный)",
            "Седан",
            "Седан (компактный)",
            "Седан (среднеразмерный)",
            "Универсал",
            "Универсал (компактный)",
            "Универсал (среднеразмерный)",
            "Хэтчбек",
            "Хэтчбек (компактный)",
            "Хэтчбек (среднеразмерный)"
        ]
    },
    {
        // class B
        id: '539f15d56ee884700afc628d',
        carcaseTypes: [
            "Внедорожник (компактный)",
            "Внедорожник (среднеразмерный)",
            "Кроссовер",
            "Кроссовер (компактный)",
            "Кроссовер (среднеразмерный)",
            "Минивэн (компактный)",
            "Седан (полноразмерный)",
            "Универсал (полноразмерный)"
        ]
    },
    {
        // class C
        id: '539f15d86ee884700afc628e',
        carcaseTypes: [
            "Внедорожник",
            "Внедорожник (полноразмерный)",
            "Кроссовер (полноразмерный)",
            "Лимузин",
            "Микроавтобус",
            "Минивэн",
            "Минивэн (полноразмерный)",
            "Минивэн (среднеразмерный)",
            "Пикап",
            "Пикап (компактный)",
            "Пикап (полноразмерный)",
            "Пикап (среднеразмерный)",
            "Фургон (компактный)"
        ]
    },
    {
        // class D
        id: '539f15da6ee884700afc628f',
        carcaseTypes: [
            "Бортовой грузовик",
            "Грузовик",
            "Фургон",
            "Фургон (полноразмерный)",
            "Фургон (среднеразмерный)"
        ]
    }
]



db.cartype.drop();
var cars = db.cars.find();

var classesByCarcaseTypes = classes.reduce(function(s, i){
    i.carcaseTypes.forEach(function(t){
        s[t] = i.id;
    });
    return s;
}, {});

//print(JSON.stringify(classesByCarcaseTypes));

cars.forEach(function(item){
    var carcaseType = item.carcaseType;
    var cartype = {
        name:       item.brand + (item.name ? ' ' + item.name : '') + ' ' + item.model + ' ' + carcaseType.replace(/ \(.*/, ''),
        class:      classesByCarcaseTypes[item.carcaseType],
        img:        item.img,
        url:        item.url,
        year:       item.year.replace(/\D+.*/, ''),
        createdAt:  new Date(),
        updatedAt:  new Date()
    }
    db.cartype.insert(cartype);
});
