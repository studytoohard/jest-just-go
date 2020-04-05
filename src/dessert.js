const dessert = function (name) {
    this.name = name;
}

dessert.prototype = {
    enjoy: function () {
        return "Enjoy the " + this.name;
    }
}

module.exports = dessert;