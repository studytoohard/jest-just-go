const dessert = require("./dessert");

const dessertFactory = function () {
}

dessertFactory.produce = function (type) {
    switch (type) {
        case 'Red bean burning':
            return new dessert('Red bean burning'); // 红豆烧
        case 'Tiramisu':
            return new dessert('Tiramisu'); // 提拉米苏
        default:
            throw new Error("please choose a dessert type");
    }
}

module.exports = dessertFactory;